import logger from '../config/logger.js';
import { productDao } from '../dao/ProductDaoFactory.js';
import Product from '../business/Product.js';

class ProductController {
  constructor() {
    //this.product = new Product();
  }

  createProductController = async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = new Product(title, price, thumbnail);
    const id = await productDao.save(product);
    if (id) {
      const producto = await productDao.getById(id);
      res.json(producto);
    } else {
      res.json({ error: 'error al guardar producto' });
    }
  };

  getAllProductsController = async (req, res) => {
    logger.info(`Attempting get all products`);
    const productos = await productDao.getAll();
    res.json(productos);
  };

  getProductByIdController = async (req, res) => {
    const id = req.params.id;
    const producto = await productDao.getById(id);
    if (producto && producto.length != 0) {
      res.json(producto);
    } else {
      res.json({ error: 'producto no encontrado' });
    }
  };

  updateProductByIdController = async (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;
    if (id) {
      const productoActualizado = await productDao.updateById(id, product);
      res.json(productoActualizado);
    } else {
      res.json({ error: 'error al guardar producto' });
    }
  };

  deleteProductByIdController = async (req, res) => {
    const id = Number(req.params.id);
    const productoEliminado = await productDao.getById(id);
    if (productoEliminado.length != 0) {
      await productDao.deleteById(id);
      res.json(productoEliminado);
    } else {
      res.json({ error: 'error al eliminar producto' });
    }
  };
}

export default ProductController;
