import express from 'express';
import session from 'express-session';
import Productos from './persistence/ProductosDbConnection.js';
import Mensajes from './persistence/FileContainer.js';
import MongoStore from 'connect-mongo';
import mongoConfig from './config/mongoConfig.js';
import fakerRouter from './router/fakerRouter.js';
import userRouter from './router/userRouter.js';

import mongoose from 'mongoose';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

// Arrancamos express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Carga inicial de productos

products.deleteAll();

products.save({
  title: 'Lápiz',
  price: 1.75,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png',
});

products.save({
  title: 'Regla',
  price: 2.35,
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
});

async function normalization(dataArray) {
  const normalizedData = normalize(dataArray, messageArray);
  return normalizedData;
}

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');
  let data = await messages.getAll();
  let normalizedMessages = await normalization(data);

  socket.emit('products', await products.getAll());
  socket.emit('messages', normalizedMessages);

  socket.on('update', async (product) => {
    console.log('Se va a insertar un producto');
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

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: mongoConfig.url,
//       mongoOptions: mongoConfig.advancedOptions,
//     }),
//     secret: 'secreto',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       expires: 10 * 60 * 1000,
//     },
//   })
// );

app.use('/api/productos-test', fakerRouter);
app.use('/', userRouter);

app.use(express.static('public'));

app.use((req, res) => {
  res.json({
    error: -2,
    description: `Route ${req.url} not implemented`,
  });
});

const PORT = 8080;
async function connectDb() {
  mongoose.connect(mongoConfig.url, mongoConfig.options);
}

const connectedServer = httpServer.listen(PORT, async () => {
  await connectDb();
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);
