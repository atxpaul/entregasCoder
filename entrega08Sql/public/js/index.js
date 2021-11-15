const socket = io();

const form = document.getElementById('#form');

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
  render(data);
});

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
        <strong>${elem.author}</strong> [${elem.date}]
        <em>${elem.text}</em></div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  const date = new Date();
  const message = {
    author: document.getElementById('email').value,
    text: document.getElementById('message').value,
    date: date.toLocaleString(),
  };
  socket.emit('new-message', message);
  return false;
}
