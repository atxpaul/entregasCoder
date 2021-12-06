const socket = io();

const form = document.getElementById('#form');

const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// Definimos un esquema de autores
const user = new schema.Entity('author');

// Definimos un esquema de textos
const msg = new schema.Entity('msg');

// Definimos un esquema de mensajes
const message = new schema.Entity('messages', {
  author: user,
  text: [msg],
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };

  socket.emit('update', product);

  form.reset();
});

socket.on('products', (products) => {
  addProducts(products);
});

async function addProducts(products) {
  const recursoRemoto = await fetch('plantillas/products-table.hbs');

  const textoPlantilla = await recursoRemoto.text();

  const functionTemplate = Handlebars.compile(textoPlantilla);

  const html = functionTemplate({ products });

  document.getElementById('products').innerHTML = html;
}

socket.on('messages', (data) => {
  console.log(data);
  const denormalizedData = denormalization(data);
  console.log(denormalizedData);
  render(denormalizedData);
});

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
        <strong>${elem.author.alias}</strong> [${elem.date}]
        <em>${elem.text}</em></div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = html;
}

function denormalization(normalizedData) {
  let denormalizedArray = [];
  for (let index in normalizedData) {
    const denormalizedData = denormalize(
      normalizedData[index].result,
      message,
      normalizedData[index].entities
    );
    console.log(denormalizedData);
    denormalizedArray.push(denormalizedData);
    let compressed = Number(JSON.stringify(normalizedData).length);
    let deCompressed = Number(JSON.stringify(denormalizedData).length);
    updateCompression(compressed, deCompressed);
  }

  return denormalizedArray;
}

function updateCompression(compressed, deCompressed) {
  const percentage = `Compresión del ${Math.round(
    (deCompressed / compressed) * 100
  )}%`;
  document.getElementById('compression').innerHTML = percentage;
}

function addMessage(e) {
  const date = new Date();
  const message = {
    author: {
      id: document.getElementById('email').value,
      nombre: document.getElementById('name').value,
      apellido: document.getElementById('surname').value,
      edad: document.getElementById('age').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value,
    },
    text: document.getElementById('message').value,
    date: date.toLocaleString(),
  };
  socket.emit('new-message', message);
  return false;
}
