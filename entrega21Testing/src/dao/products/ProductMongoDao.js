import MongoContainer from '../../persistence/MongoContainer.js';

class ProductMongoDao extends MongoContainer {
  constructor() {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
    if (typeof ProductMongoDao.instance === 'object') {
      return ProductMongoDao.instance;
    }
    ProductMongoDao.instance = this;
    return this;
  }
}

export default ProductMongoDao;
