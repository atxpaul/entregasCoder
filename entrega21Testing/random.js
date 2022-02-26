let cantidad = 100_000_000;

function getRandom() {
  return parseInt(Math.random() * 1000) + 1;
}
const numeros = {};
const calculo = () => {
  console.log(`Arrancando cálculo`);
  for (let i = 0; i < cantidad; i++) {
    const numero = getRandom();
    if (!numeros[numero]) {
      numeros[numero] = 0;
    }
    numeros[numero]++;
  }
  return numeros;
};

process.on('exit', () => {
  console.log(`worker #${process.pid} cerrado`);
});

process.on('message', (msg) => {
  console.log(msg);
  cantidad = msg;
  console.log(`worker #${process.pid} iniciando su tarea`);
  const random = calculo();
  //console.log(random);
  process.send(random);
  console.log(`worker #${process.pid} finalizó su trabajo`);
  process.exit();
});

process.send('listo');
