import express from 'express';
import Productos from './persistence/ProductosDbConnection.js';
import Mensajes from './persistence/FileContainer.js';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import faker from 'faker';
faker.locale = 'es';
const { commerce, image } = faker;

import normalizr from 'normalizr';
import util from 'util';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const products = new Productos();
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

let messages = new Mensajes('.messages');

// Definimos esquemas
const user = new schema.Entity('author');

const message = new schema.Entity('messages', {
  author: user,
});

const messageArray = [message];

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

//Se borra BD primero para pruebas
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

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');
  let data = await messages.getAll();
  //console.log(data);
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
    //console.log(await messages.getAll());
  });
});

app.get('/api/productos-test', (req, res) => {
  let productos = [];
  for (let i = 0; i < 5; i++) {
    let obj = {};
    obj.title = commerce.productName();
    obj.price = commerce.price();
    obj.thumbnail = image.imageUrl();
    productos.push(obj);
  }
  res.json(productos);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);

async function normalization(dataArray) {
  // let normalizedDataArray = [];
  // for (let index in dataArray) {
  //   const normalizedData = normalize(dataArray[index], message);
  //   print(normalizedData);
  //   normalizedDataArray.push(normalizedData);
  // }

  const normalizedData = normalize(dataArray, messageArray);
  print(normalizedData);

  // const denormalizedData = denormalize(
  //   normalizedData.result,
  //   messageArray,
  //   normalizedData.entities
  // );
  // print(denormalizedData);

  return normalizedData;
}
