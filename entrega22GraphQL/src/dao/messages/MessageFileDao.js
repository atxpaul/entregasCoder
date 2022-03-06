import FileContainer from '../../persistence/FileContainer.js';

class MessageFileDao extends FileContainer {
  constructor() {
    super('.messages');
    if (typeof MessageFileDao.instance === 'object') {
      return MessageFileDao.instance;
    }
    MessageFileDao.instance = this;
    return this;
  }
}

export default MessageFileDao;
