const axios = require('axios');

const producto1 = {
  title: 'Lápiz',
  price: '1.75',
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png',
};

const producto2 = {
  title: 'Regla',
  price: '2.35',
  thumbnail:
    'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
};

axios.post('http://localhost:8080/api/productos', producto1);
axios.post('http://localhost:8080/api/productos', producto2);
