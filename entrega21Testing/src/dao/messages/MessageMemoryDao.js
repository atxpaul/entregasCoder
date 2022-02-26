import MemoryContainer from '../../persistence/MemoryContainer.js';

class MessageMemoryDao extends MemoryContainer {
  constructor() {
    super();
    if (typeof MessageMemoryDao.instance === 'object') {
      return MessageMemoryDao.instance;
    }
    MessageMemoryDao.instance = this;
    return this;
  }
}

export default MessageMemoryDao;
