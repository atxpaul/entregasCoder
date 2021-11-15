import { options } from '../options/SQLite3.js';
import knexLib from 'knex';

class MensajeDbConnection {
  constructor() {
    this.knex = knexLib(options);
  }

  async save(objeto) {
    let mensaje;
    try {
      mensaje = await this.knex.raw(
        `INSERT INTO MENSAJES (AUTOR, MENSAJE, FECHA) VALUES ( ? , ? , ? )`,
        [objeto.author, objeto.text, objeto.date]
      );
    } catch (err) {
      console.log(err);
    }

    return mensaje.rowid;
  }

  async getById(id) {
    let mensaje;
    try {
      mensaje = await this.knex.raw(
        `SELECT rowid, AUTOR, MENSAJE, FECHA FROM MENSAJES WHERE rowid=?`,
        [id]
      );

      if (mensaje.length > 0) {
        objectsFromDb = mensaje.map((msj) => {
          let obj = {};
          obj.id = msj.rowid;
          obj.author = msj.AUTOR;
          obj.text = msj.MENSAJE;
          obj.date = msj.FECHA;
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
    let mensaje;
    let objectsFromDb = [];
    try {
      mensaje = await this.knex.raw(
        `SELECT rowid, AUTOR, MENSAJE, FECHA FROM MENSAJES`
      );

      if (mensaje.length > 0) {
        objectsFromDb = mensaje.map((msj) => {
          let obj = {};
          obj.id = msj.rowid;
          obj.author = msj.AUTOR;
          obj.text = msj.MENSAJE;
          obj.date = msj.FECHA;
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
      await this.knex.raw(`DELETE FROM MENSAJES WHERE rowid=?`, [id]);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await this.knex.raw(`DELETE FROM MENSAJES`);
    } catch (err) {
      console.log(err);
    }
  }
  async close() {
    await this.knex.destroy();
  }
}

export default MensajeDbConnection;
