import logger from '../config/logger.js';
import { productDao } from '../dao/ProductDaoFactory.js';
import Product from '../business/Product.js';

class ProductGraphQLController {
  constructor() {}

  createProductController = async (data) => {
    const rawProduct = JSON.parse(JSON.stringify(data));
    const { title, price, thumbnail } = rawProduct.data;
    const product = new Product(title, price, thumbnail);
    const id = await productDao.save(product);
    if (id) {
      const producto = await productDao.getById(id);
      return producto;
    } else {
      return { error: 'error al guardar producto' };
    }
  };

  getAllProductsController = async () => {
    logger.info(`Attempting get all products`);
    const productos = await productDao.getAll();
    return productos;
  };

  getProductByIdController = async ({ id }) => {
    const producto = await productDao.getById(id);
    if (producto && producto.length != 0) {
      return producto;
    } else {
      return { error: 'producto no encontrado' };
    }
  };

  updateProductByIdController = async ({ id, data }) => {
    const rawProduct = JSON.parse(JSON.stringify(data));
    console.log(rawProduct);
    const { title, price, thumbnail } = rawProduct;

    const product = new Product(title, price, thumbnail);
    if (id) {
      const productoActualizado = await productDao.updateById(id, product);
      return productoActualizado;
    } else {
      return { error: 'error al guardar producto' };
    }
  };

  deleteProductByIdController = async ({ id }) => {
    const productoEliminado = await productDao.getById(id);
    if (productoEliminado.length != 0) {
      logger.info(`Deleting product ${id}`);
      await productDao.deleteById(id);
      return productoEliminado;
    } else {
      return { error: 'error al eliminar producto' };
    }
  };
}

export default ProductGraphQLController;
