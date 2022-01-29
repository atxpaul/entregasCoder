import express from 'express';
import path from 'path';
import { fork } from 'child_process';
import logger from '../config/logger.js';

const { Router } = express;
const router = new Router();

router.get('/', (req, res) => {
  const { originalUrl, method } = req;
  logger.info(`${method}-${originalUrl} Recibiendo petición`);
  logger.info(
    `Procesando petición en ${process.pid} con cantidad ${req.query.cant}`
  );
  const cantidad = req.query.cant ? req.query.cant : 100_000_000;
  const computo = fork(path.resolve(process.cwd(), `random.js`));
  computo.send('start');
  computo.on('message', (resultado) => {
    // console.log(resultado);
    if (resultado == 'listo') {
      logger.info('Enviamos señal al proceso hijo');
      computo.send(cantidad);
    } else {
      logger.info(`Mensaje del hijo: ${resultado}`);
      res.json({ resultado });
    }
  });
});

export default router;
