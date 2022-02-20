import ProductFileDao from './products/ProductFileDao.js';
import ProductMemoryDao from './products/ProductMemoryDao.js';
import ProductMongoDao from './products/ProductMongoDao.js';

const option = process.argv[2] || 'MONGO';

let productDao;

switch (option) {
  case 'MEM':
    productDao = new ProductMemoryDao();
    break;
  case 'FILE':
    productDao = new ProductFileDao();
    break;
  default:
    productDao = new ProductMongoDao();
    break;
}

export { productDao };
