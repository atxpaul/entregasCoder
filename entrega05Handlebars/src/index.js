const express = require('express');
const routerProductos = require('./router/routerProductos');
const handlebars = require('express-handlebars');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: process.cwd() + '/views/layouts',
    partialsDir: process.cwd() + '/views/partials/',
  })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form.hbs', {});
});
app.get('/productos', async (req, res) => {
  //const productos = await axios.get('http://localhost/api/productos');
  //console.log(productos);
  //res.render('products.hbs', await axios.get('/api/productos'));
  res.send([]);
});

app.use('/api/productos', routerProductos);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
