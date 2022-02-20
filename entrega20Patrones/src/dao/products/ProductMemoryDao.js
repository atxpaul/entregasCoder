import MemoryContainer from '../../persistence/MemoryContainer.js';

class ProductMemoryDao extends MemoryContainer {
  constructor() {
    super();
    if (typeof ProductMemoryDao.instance === 'object') {
      return ProductMemoryDao.instance;
    }
    ProductMemoryDao.instance = this;
    return this;
  }
}

export default ProductMemoryDao;
