import ProductFileDao from './products/ProductFileDao.js';
import ProductMemoryDao from './products/ProductMemoryDao.js';
import ProductMongoDao from './products/ProductMongoDao.js';

const option = process.argv[2] || 'FILE';

let productDao;

switch (option) {
  case 'MONGO':
    productDao = new ProductMongoDao();
    break;
  case 'MEM':
    productDao = new ProductMemoryDao();
    break;
  default:
    productDao = new ProductFileDao();
    break;
}

export { productDao };
