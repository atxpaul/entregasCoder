import express from 'express';
import path from 'path';
import { fork } from 'child_process';

const { Router } = express;
const router = new Router();

router.get('/', (req, res) => {
  console.log(
    `Procesando petición en ${process.pid} con cantidad ${req.query.cant}`
  );
  const cantidad = req.query.cant ? req.query.cant : 100_000_000;
  const computo = fork(path.resolve(process.cwd(), `random.js`));
  computo.send('start');
  computo.on('message', (resultado) => {
    // console.log(resultado);
    if (resultado == 'listo') {
      console.log('Enviamos señal');
      computo.send(cantidad);
    } else {
      console.log(`Mensaje del hijo: ${resultado}`);
      res.json({ resultado });
    }
  });
});

export default router;
