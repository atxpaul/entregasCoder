import mongoConfig from '../config/mongoConfig.js';
import logger from '../config/logger.js';
import mongoose from 'mongoose';

class Mongo {
  constructor() {}
  connectDb = async () => {
    try {
      mongoose.connect(mongoConfig.url, mongoConfig.options);
    } catch (err) {
      logger.error(err);
    }
  };
}

export default Mongo;
