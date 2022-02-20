import FileContainer from '../../persistence/FileContainer.js';

class ProductFileDao extends FileContainer {
  constructor() {
    super('.products');
  }
}

export default ProductFileDao;
