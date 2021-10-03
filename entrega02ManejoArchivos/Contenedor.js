const fs = require('fs');

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  async save(objeto) {
    let id;
    let contenido = await this.getAll();
    if (contenido) {
      let ids = contenido.map((c) => c.id);
      id = Math.max(...ids) + 1;
    } else {
      id = 1;
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
    let contenido = await this.getAll();
    let objeto = contenido.find((c) => c.id == id);
    return objeto ? objeto : null;
  }

  async getAll() {
    let contenido;
    try {
      contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
    } catch (err) {
      console.log(err);
    }
    return JSON.parse(contenido);
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

// console.log(
//   con.save({ title: 'Cosa3', price: 2.5, thumbnail: 'https://cosa.png' })
// );
// console.log(con.getAll());
