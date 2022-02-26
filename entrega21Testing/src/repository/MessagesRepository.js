import { asDto, asModels, asDtos } from '../mapper/messageMapper.js';
import { messageDao } from '../dao/MessageDaoFactory.js';

class MessageRepo {
  #messageDao;

  constructor() {
    this.#messageDao = messageDao;
  }

  async getAllMessages() {
    let dtos = await this.#messageDao.getAll();
    const messages = asModels(dtos);
    dtos = asDtos(messages);
    return dtos;
  }

  async createMessage(message) {
    const dto = asDto(message);
    return await this.#messageDao.save(dto);
  }
}

export default MessageRepo;
