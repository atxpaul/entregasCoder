import FakerController from '../controller/FakerController.js';
import logger from '../config/logger.js';

class FakerRouter {
  constructor(express) {
    this.express = express;
    this.router = this.express.Router();
    this.fakerController = new FakerController();
  }

  start() {
    logger.info(`Starting Faker Router`);
    this.router.get('/', this.fakerController.getFakeProductsController);
    return this.router;
  }
}

export default FakerRouter;
