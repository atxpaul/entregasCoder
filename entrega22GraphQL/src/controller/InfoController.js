import logger from '../config/logger.js';
import Info from '../business/Info.js';

class InfoController {
  constructor() {
    this.info = new Info();
  }

  getInfoController = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);
    res.send(await this.info.getHostInfo());
  };
}

export default InfoController;
