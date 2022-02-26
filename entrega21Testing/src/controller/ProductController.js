import logger from '../config/logger.js';
import { productDao } from '../dao/ProductDaoFactory.js';
import Product from '../business/Product.js';

class ProductController {
  constructor() {
    //this.product = new Product();
  }

  createProductController = async (newProduct) => {
    logger.info(`Attempting to create new product`);
    const { title, price, thumbnail } = newProduct;
    const product = new Product(title, price, thumbnail);
    if (product) {
      await productDao.save(product);
    }
  };

  getAllProductsController = async () => {
    logger.info(`Attempting get all messages`);
    const products = await productDao.getAll();
    return products;
  };
}

export default ProductController;
