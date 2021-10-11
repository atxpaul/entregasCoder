const express = require('express');
const Contenedor = require('./Contenedor');

const PORT = 8080;
const app = express();
const con = new Contenedor('productos.txt');

const server = app.listen(PORT, () => {
  console.log(
    `Servidor express escuchando en el puerto ${server.address().port}`
  );
});
server.on('error', (error) => console.log(`Error en el servidor ${error}`));

app.get('/productos', async (req, res) => {
  const productos = await getProducts();
  res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
  const productoRandom = await getRandomProduct();
  res.send(productoRandom);
});

async function getProducts() {
  return await con.getAll();
  //return productos.map((producto) => producto.title);
}

function getRandom(number) {
  return parseInt(Math.random() * number) + 1;
}

async function getRandomProduct() {
  const productos = await con.getAll();
  const ids = productos.map((producto) => producto.id);
  const randomId = getRandom(ids.length);
  return await con.getById(getRandom(randomId));
}
