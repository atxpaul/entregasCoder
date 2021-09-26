class ApellidoNombre {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor,
    });
  }

  getBookNames() {
    let nombreLibros = [];
    this.libros.forEach((libro) => nombreLibros.push(libro.nombre));
    return nombreLibros;
  }
}

johnsmith = new ApellidoNombre(
  'John',
  'Smith',
  [{ nombre: 'La Isla del Tesoro', autor: 'Robert Louis Stevenson' }],
  ['perro', 'gato', 'pez']
);

johnsmith.getFullName();
johnsmith.addMascota('tortuga');
johnsmith.countMascotas();
johnsmith.addBook('La Guía del autoestopista galáctico', 'Douglas Adams');
johnsmith.getBookNames();

//Descomentar para ver resultados
//console.log(johnsmith.getFullName());
//console.log(johnsmith.countMascotas());
//console.log(johnsmith.getBookNames());
