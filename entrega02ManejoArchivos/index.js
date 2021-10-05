//const con = require('./contenedor');
const container = require('./Contenedor');

(async () => {
  const con = new container('productos.txt');

  await con.getAll();
  await con.save({ title: 'Cosa1', price: 2.5, thumbnail: 'https://cosa.png' });
  await con.save({ title: 'Cosa2', price: 2.5, thumbnail: 'https://cosa.png' });
  await con.save({ title: 'Cosa3', price: 2.5, thumbnail: 'https://cosa.png' });
  await con.save({ title: 'Cosa4', price: 2.5, thumbnail: 'https://cosa.png' });
  await con.save({ title: 'Cosa5', price: 2.5, thumbnail: 'https://cosa.png' });
  await con.getById(2);
  await con.getAll();
  await con.deleteById(4);
  //con.deleteAll();
})();
