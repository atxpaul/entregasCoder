import logger from '../config/logger.js';
import FakeProducts from '../business/FakeProducts.js';

class FakerController {
  constructor() {
    this.fakeProducts = new FakeProducts();
  }

  getFakeProductsController = async (req, res) => {
    const { originalUrl, method } = req;
    logger.info(`${method}-${originalUrl} Recibiendo petición`);

    let productos = await this.fakeProducts.getFakeProducts();
    res.json(productos);
  };
}

export default FakerController;
