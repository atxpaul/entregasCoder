import logger from '../config/logger.js';

import ProductController from '../controller/ProductController.js';
//import Mensajes from '../persistence/FileContainer.js';
import MessageController from '../controller/MessageController.js';

import normalization from '../middleware/normalizr.js';

const productController = new ProductController();
const messageController = new MessageController();

class SocketRouter {
  constructor(io) {
    this.io = io;
  }

  startRouter = async () => {
    this.io.on('connection', async (socket) => {
      logger.info('Nuevo cliente conectado!');
      let data = await messageController.getAllMessagesController();
      let normalizedMessages = await normalization(data);

      socket.emit(
        'products',
        await productController.getAllProductsController()
      );
      socket.emit('messages', normalizedMessages);

      socket.on('update', async (product) => {
        logger.info('Se va a insertar un producto');
        await productController.createProductController(product);
        this.io.sockets.emit(
          'products',
          await productController.getAllProductsController()
        );
      });

      socket.on('new-message', async (data) => {
        logger.info(`Mensaje recibido ${data}`);
        await messageController.createMessageController(data);
        let dataStored = await messageController.getAllMessagesController();
        let normalizedMessages = await normalization(dataStored);
        this.io.sockets.emit('messages', normalizedMessages);
      });
    });
  };
}

export default SocketRouter;
