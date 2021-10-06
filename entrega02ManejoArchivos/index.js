//const con = require('./contenedor');
const container = require('./Contenedor');

(async () => {
  const con = new container('productos.txt');

  await con.save({
    title: 'Calculadora',
    price: 2.5,
    thumbnail: 'https://www.mitienda.com/images/Calculadora.png',
  });
  await con.save({
    title: 'Lápiz',
    price: 2.5,
    thumbnail: 'https://www.mitienda.com/images/Lapiz.png',
  });
  await con.save({
    title: 'Boligrafo',
    price: 2.5,
    thumbnail: 'https://www.mitienda.com/images/Boligrafo.png',
  });
  await con.save({
    title: 'Boligrafo2',
    price: 2.5,
    thumbnail: 'https://www.mitienda.com/images/Boligrafo2.png',
  });
  await con.save({
    title: 'Globo Terráqueo',
    price: 2.5,
    thumbnail: 'https://www.mitienda.com/images/globo.png',
  });
  await con.getById(2);
  await con.getAll();
  await con.deleteById(4);
  await con.deleteAll();
})();
