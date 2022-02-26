import MessageFileDao from './Messages/MessageFileDao.js';
import MessageMemoryDao from './Messages/MessageMemoryDao.js';

const option = process.argv[2] || 'MONGO';

let messageDao;

switch (option) {
  case 'MEM':
    messageDao = new MessageMemoryDao();
    break;
  default:
    messageDao = new MessageFileDao();
    break;
}

export { messageDao };
