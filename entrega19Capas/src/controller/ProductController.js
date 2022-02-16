import logger from '../config/logger.js';
import Product from '../business/Product.js';

class ProductController {
  constructor() {
    this.product = new Product();
  }

  createProductController = async (newProduct) => {
    logger.info(`Attempting to create new product`);
    await this.product.createProduct(newProduct);
  };

  getAllProductsController = async () => {
    logger.info(`Attempting get all messages`);
    const products = await this.product.getAllProducts();
    return products;
  };
}

export default ProductController;
