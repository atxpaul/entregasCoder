import RandomController from '../controller/RandomController.js';
import logger from '../config/logger.js';

class RandomRouter {
  constructor(express) {
    this.express = express;
    this.router = this.express.Router();
    this.randomController = new RandomController();
  }

  start() {
    logger.info(`Starting Random Router`);
    this.router.get('/', this.randomController.getRandomController);

    return this.router;
  }
}

export default RandomRouter;
