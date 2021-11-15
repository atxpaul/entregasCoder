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
