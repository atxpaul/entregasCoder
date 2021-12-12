const socket = io();

const form = document.getElementById('#form');

const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

let nombreusuario;

// Definimos esquemas
const user = new schema.Entity('author');

const message = new schema.Entity('messages', {
  author: user,
});

const messageArray = [message];

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
        <em>${elem.text}</em><img class="img-fluid img-thumbnail" src="${elem.author.avatar}" style="width: 50px;"></div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = html;
}

function denormalization(normalizedData) {
  const denormalizedData = denormalize(
    normalizedData.result,
    [message],
    normalizedData.entities
  );
  console.log(denormalizedData);

  let compressed = Number(JSON.stringify(normalizedData).length);
  let deCompressed = Number(JSON.stringify(denormalizedData).length);
  updateCompression(compressed, deCompressed);

  return denormalizedData;
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

async function logout() {
  try {
    const login = await fetch('/logout', {
      method: 'GET',
    });

    const clean = document.getElementById('main');
    clean.innerHTML = '';
    document.getElementById('user').innerHTML = `Hasta otra, ${nombreusuario}`;
  } catch (error) {
    document.querySelector('body').innerHTML = error;
  }
  setTimeout(function () {
    window.location.href = '/login';
  }, 3000);
}

(async () => {
  try {
    const login = await fetch('/user', {
      method: 'GET',
    });

    nombreusuario = await login.json();
    document.getElementById('user').innerHTML = `Bienvenido, ${nombreusuario}`;
  } catch (error) {
    document.querySelector('body').innerHTML = error;
  }
})();
