class Author {
  #id;
  #nombre;
  #apellido;
  #edad;
  #alias;
  #avatar;

  constructor({ id, nombre, apellido, edad, alias, avatar }) {
    this.id = this.setId(id);
    this.nombre = this.setNombre(nombre);
    this.apellido = this.setApellido(apellido);
    this.edad = this.setEdad(edad);
    this.alias = this.setAlias(alias);
    this.avatar = this.setAvatar(avatar);
  }

  setId(id) {
    if (id) {
      this.id = id;
      return id;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
  setNombre(nombre) {
    if (nombre) {
      this.nombre = nombre;
      return nombre;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
  setApellido(apellido) {
    if (apellido) {
      this.apellido = apellido;
      return apellido;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
  setEdad(edad) {
    if (edad) {
      this.edad = edad;
      return edad;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
  setAlias(alias) {
    if (alias) {
      this.alias = alias;
      return alias;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
  setAvatar(avatar) {
    if (avatar) {
      this.avatar = avatar;
      return avatar;
    } else {
      throw Error(`Missing field for author creation`);
    }
  }
}

export default Author;
