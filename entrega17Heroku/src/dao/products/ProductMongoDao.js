import MongoContainer from '../../persistence/MongoContainer.js';

class ProductMongoDao extends MongoContainer {
  constructor() {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}

export default ProductMongoDao;
