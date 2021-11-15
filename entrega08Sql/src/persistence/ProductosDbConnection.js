import { options } from '../options/mariaDb.js';
import knexLib from 'knex';

class ProductosDbConnection {
  constructor() {
    this.knex = knexLib(options);
  }

  async save(objeto) {
    let producto;
    try {
      producto = await this.knex.raw(
        `INSERT INTO PRODUCTOS (TITULO, PRECIO, IMAGEN) VALUES ( ? , ? , ? )`,
        [objeto.title, Number(objeto.price), objeto.thumbnail]
      );
    } catch (err) {
      console.log(err);
    }

    return producto[0].insertId;
  }

  async updateById(id, nuevoObjeto) {
    let producto;
    try {
      producto = await this.knex.raw(
        `UPDATE PRODUCTOS SET TITULO=?,PRECIO=?, IMAGEN=? WHERE ID_PRODUCTO=?'`,
        [
          nuevoObjeto.title,
          Number(nuevoObjeto.price),
          nuevoObjeto.thumbnail,
          id,
        ]
      );
    } catch (err) {
      console.log(err);
    }

    console.log(producto[0]);

    return objeto ? objeto : [];
  }

  async getById(id) {
    let producto;
    try {
      producto = await this.knex.raw(
        `SELECT ID_PRODUCTO, TITULO, PRECIO, IMAGEN FROM PRODUCTOS WHERE ID_PRODUCTO=?`,
        [id]
      );

      if (producto[0].length > 0) {
        objectsFromDb = producto[0].map((prod) => {
          let obj = {};
          obj.id = prod.ID_PRODUCTO;
          obj.title = prod.TITULO;
          obj.price = prod.PRECIO;
          obj.thumbnail = prod.IMAGEN;
          return obj;
        });
      }
    } catch (err) {
      console.log(err);
    }
    console.log();

    return objectsFromDb;
  }

  async getAll() {
    let producto;
    let objectsFromDb = [];
    try {
      producto = await this.knex.raw(
        `SELECT ID_PRODUCTO, TITULO, PRECIO, IMAGEN FROM PRODUCTOS `
      );

      if (producto[0].length > 0) {
        objectsFromDb = producto[0].map((prod) => {
          let obj = {};
          obj.id = prod.ID_PRODUCTO;
          obj.title = prod.TITULO;
          obj.price = prod.PRECIO;
          obj.thumbnail = prod.IMAGEN;
          return obj;
        });
      }
    } catch (err) {
      console.log(err);
    }

    return objectsFromDb;
  }

  async deleteById(id) {
    try {
      await this.knex.raw(`DELETE FROM PRODUCTOS WHERE ID_PRODUCTO=?`, [id]);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await this.knex.raw(`DELETE FROM PRODUCTOS`);
    } catch (err) {
      console.log(err);
    }
  }

  async close() {
    await this.knex.destroy();
  }
}

export default ProductosDbConnection;
