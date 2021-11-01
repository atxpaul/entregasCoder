const express = require('express');
const Contenedor = require('./persistence/Contenedor');

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const products = new Contenedor();
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

let messages = [];

products.save({
  title: 'Lápiz',
  price: '1.75',
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png',
});

products.save({
  title: 'Regla',
  price: '2.35',
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
});

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  socket.emit('products', await products.getAll());
  socket.emit('messages', messages);

  socket.on('update', async (product) => {
    await products.save(product);
    io.sockets.emit('products', await products.getAll());
  });

  socket.on('new-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
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
