import logger from '../config/logger.js';
import MessageRepo from '../repository/MessagesRepository.js';

class MessageController {
  constructor() {
    this.messageRepo = new MessageRepo();
  }

  createMessageController = async (newMessage) => {
    logger.info(`Attempting to create new Message`);
    await this.messageRepo.createMessage(newMessage);
  };

  getAllMessagesController = async () => {
    logger.info(`Attempting get all messages`);
    const Messages = await this.messageRepo.getAllMessages();
    return Messages;
  };
}

export default MessageController;
