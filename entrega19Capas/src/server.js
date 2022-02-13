import app from './loader/express.js';
import Mongo from './loader/Mongo.js';
import Productos from './dao/products/ProductMongoDao.js';
import Mensajes from './persistence/FileContainer.js';

import logger from './config/logger.js';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = new Productos();

let messages = new Mensajes('.messages');

// Arrancamos normalizr
import normalizr from 'normalizr';

const normalize = normalizr.normalize;
const schema = normalizr.schema;

// Definimos esquemas
const user = new schema.Entity('author');

const message = new schema.Entity('messages', {
  author: user,
});

const messageArray = [message];

async function normalization(dataArray) {
  const normalizedData = normalize(dataArray, messageArray);
  return normalizedData;
}

io.on('connection', async (socket) => {
  logger.info('Nuevo cliente conectado!');
  let data = await messages.getAll();
  let normalizedMessages = await normalization(data);

  socket.emit('products', await products.getAll());
  socket.emit('messages', normalizedMessages);

  socket.on('update', async (product) => {
    logger.info('Se va a insertar un producto');
    await products.save(product);
    io.sockets.emit('products', await products.getAll());
  });

  socket.on('new-message', async (data) => {
    await messages.save(data);
    let dataStored = await messages.getAll();
    let normalizedMessages = await normalization(dataStored);
    io.sockets.emit('messages', normalizedMessages);
  });
});

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, async () => {
  const mongo = new Mongo();
  await mongo.connectDb();
  logger.info(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  logger.error(`Error en servidor ${error}`)
);
