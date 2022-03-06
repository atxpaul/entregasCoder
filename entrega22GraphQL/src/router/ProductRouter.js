import ProductController from '../controller/ProductController.js';
import logger from '../config/logger.js';

class ProductRouter {
  constructor(express) {
    this.express = express;
    this.router = this.express.Router();
    this.productController = new ProductController();
  }

  start = async () => {
    logger.info(`Starting Product Router`);
    this.router.post('/', this.productController.createProductController);
    this.router.get('/', this.productController.getAllProductsController);
    this.router.get('/:id', this.productController.getProductByIdController);
    this.router.put('/:id', this.productController.updateProductByIdController);
    this.router.delete(
      '/:id',
      this.productController.deleteProductByIdController
    );
    return this.router;
  };
}

export default ProductRouter;
