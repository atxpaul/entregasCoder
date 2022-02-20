import FileContainer from '../../persistence/FileContainer.js';

class ProductFileDao extends FileContainer {
  constructor() {
    super('.products');
    if (typeof ProductFileDao.instance === 'object') {
      return ProductFileDao.instance;
    }
    ProductFileDao.instance = this;
    return this;
  }
}

export default ProductFileDao;
