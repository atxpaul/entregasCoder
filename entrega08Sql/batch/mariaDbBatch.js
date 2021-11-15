import { options } from '../src/options/mariaDb.js';
import knexLib from 'knex';

const knex = new knexLib(options);

try {
  await knex.raw(`CREATE TABLE PRODUCTOS (
        ID_PRODUCTO INT AUTO_INCREMENT,
        TITULO VARCHAR (50) NOT NULL,
        PRECIO DECIMAL (15, 2) NOT NULL,
        IMAGEN VARCHAR(255) NOT NULL,
        PRIMARY KEY (ID_PRODUCTO)
      )`);
} catch (err) {
  console.log(err);
}
knex.destroy();

// let objectsFromDb = [];
// try {
//   const producto = await knex.raw(
//     `SELECT ID_PRODUCTO, TITULO, PRECIO, IMAGEN FROM PRODUCTOS WHERE ID_PRODUCTO=?`,
//     [20]
//   );
//   if (producto[0].length > 0) {
//     console.log(producto[0][0].ID_PRODUCTO);
//     objectsFromDb = producto[0].map((prod) => {
//       let obj = {};
//       obj.id = prod.ID_PRODUCTO;
//       obj.title = prod.TITULO;
//       obj.price = prod.PRECIO;
//       obj.thumbnail = prod.IMAGEN;
//       return obj;
//     });
//   }
// } catch (err) {
//   console.log(err);
// }

// console.log(objectsFromDb);
// knex.destroy();

// let objectsFromDb = [];
// try {
//   const producto = await knex.raw(
//     `SELECT ID_PRODUCTO, TITULO, PRECIO, IMAGEN FROM PRODUCTOS `
//   );

//   objectsFromDb = producto[0].map((prod) => {
//     let obj = {};
//     obj.id = prod.ID_PRODUCTO;
//     obj.title = prod.TITULO;
//     obj.price = prod.PRECIO;
//     obj.thumbnail = prod.IMAGEN;
//     return obj;
//   });
// } catch (err) {
//   console.log(err);
// }
// console.log(objectsFromDb);
// knex.destroy();
