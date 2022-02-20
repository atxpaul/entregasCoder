import Mensajes from '../persistence/FileContainer.js';
import logger from '../config/logger.js';

class Message {
  constructor() {
    this.messages = new Mensajes('.messages');
  }

  createMessage = async (message) => {
    try {
      await this.messages.save(message);
      logger.info(`New message has been created`);
    } catch (err) {
      logger.error(error);
    }
  };

  getAllMessages = async () => {
    let messages = [];
    try {
      messages = await this.messages.getAll();
    } catch (err) {
      logger.error(err);
    }
    return messages;
  };
}

export default Message;
