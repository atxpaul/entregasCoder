import Productos from '../dao/products/ProductMongoDao.js';
import logger from '../config/logger.js';

class Product {
  constructor() {
    this.products = new Productos();
  }

  createProduct = async (product) => {
    try {
      await this.products.save(product);
      logger.info(`New product has been created`);
    } catch (err) {
      logger.error(error);
    }
  };

  getAllProducts = async () => {
    let products = [];
    try {
      products = await this.products.getAll();
    } catch (err) {
      logger.error(err);
    }
    return products;
  };
}

export default Product;
