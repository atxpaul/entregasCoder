import Message from '../business/Message.js';
import Author from '../business/Author.js';

function asModel(data) {
  const author = new Author(data.author);
  const message = new Message({ ...data, author });
  return message;
}

function asModels(data) {
  const messages = data.map((d) => asModel(d));
  return messages;
}

function asDto(message) {
  const dto = {
    author: {
      id: message.author.id,
      nombre: message.author.nombre,
      apellido: message.author.apellido,
      edad: message.author.edad,
      alias: message.author.alias,
      avatar: message.author.avatar,
    },
    text: message.text,
    date: message.date,
    id: message.id,
  };
  return dto;
}

function asDtos(messages) {
  const dtos = messages.map((d) => asDto(d));
  return dtos;
}

export { asModel, asModels, asDto, asDtos };
