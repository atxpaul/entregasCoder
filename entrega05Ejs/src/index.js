const express = require('express');
const routerProductos = require('./router/routerProductos');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form', {});
});
app.get('/productos', async (req, res) => {
  const productos = await axios.get('http://localhost:8080/api/productos');
  res.render('products', { productos: productos.data });
});

app.use('/api/productos', routerProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
