const fs = require('fs');

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    //TODO Controlar que se cree el archivo si no existe previamente
    fs.readdirSync(__dirname, (error, nombres) => {
      if (error) {
        console.log(error);
      } else {
        if (nombres.indexOf(nombreArchivo) == -1) {
          fs.writeFileSync(nombreArchivo, '');
        }
      }
    });
  }

  async save(objeto) {
    let id;
    let contenido = await this.getAll();
    if (contenido.length > 0) {
      let ids = contenido.map((c) => c.id);
      id = Math.max(...ids) + 1;
    } else {
      id = 1;
      contenido = [];
    }
    objeto.id = id;
    contenido.push(objeto);
    const json = JSON.stringify(contenido, null, 4);
    try {
      await fs.promises.writeFile(this.nombreArchivo, json, 'utf-8');
    } catch (err) {
      console.log(err);
    }
    return id;
  }

  async getById(id) {
    let objeto;
    let contenido = await this.getAll();
    try {
      objeto = contenido.find((c) => c.id == id);
    } catch (err) {
      console.log(err);
    }

    return objeto ? objeto : [];
  }

  async getAll() {
    let contenido;
    try {
      contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    } catch (err) {}
    if (contenido) {
      return JSON.parse(contenido);
    } else {
      return [];
    }
  }

  async deleteById(id) {
    let contenido = await this.getAll();
    contenido = contenido.filter((c) => c.id !== id);
    const json = JSON.stringify(contenido, null, 4);
    try {
      await fs.promises.writeFile(this.nombreArchivo, json, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.nombreArchivo, '', 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Contenedor;
