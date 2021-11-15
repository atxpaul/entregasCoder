import express from 'express';
import Productos from './persistence/ProductosDbConnection.js';
import Mensajes from './persistence/Mensaje.js';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

const products = new Productos();
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

let messages = new Mensajes('messages.txt');

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

  socket.emit('products', await products.getAll());
  socket.emit('messages', await messages.getAll());

  socket.on('update', async (product) => {
    console.log('Se va a insertar un producto');
    await products.save(product);
    io.sockets.emit('products', await products.getAll());
  });

  socket.on('new-message', async (data) => {
    await messages.save(data);
    io.sockets.emit('messages', await messages.getAll());
  });
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
