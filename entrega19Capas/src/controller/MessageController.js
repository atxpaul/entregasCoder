import logger from '../config/logger.js';
import Message from '../business/Message.js';

class MessageController {
  constructor() {
    this.message = new Message();
  }

  createMessageController = async (newMessage) => {
    logger.info(`Attempting to create new Message`);
    await this.message.createMessage(newMessage);
  };

  getAllMessagesController = async () => {
    logger.info(`Attempting get all messages`);
    const Messages = await this.message.getAllMessages();
    return Messages;
  };
}

export default MessageController;
