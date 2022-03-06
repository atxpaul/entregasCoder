import compression from 'compression';
import InfoController from '../controller/InfoController.js';
import logger from '../config/logger.js';

class InfoRouter {
  constructor(express) {
    this.express = express;
    this.router = this.express.Router();
    this.router.use(compression());
    this.infoController = new InfoController();
  }

  start() {
    logger.info(`Starting Info Router`);
    this.router.get('/', this.infoController.getInfoController);

    return this.router;
  }
}

export default InfoRouter;
