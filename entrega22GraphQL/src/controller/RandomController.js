import logger from '../config/logger.js';
import path from 'path';
import { fork } from 'child_process';

class RandomController {
  constructor() {}

  getRandomController = async (req, res) => {
    const cantidad = req.query.cant ? req.query.cant : 100_000_000;
    const computo = fork(path.resolve(process.cwd(), `random.js`));
    computo.send('start');
    computo.on('message', (resultado) => {
      if (resultado == 'listo') {
        logger.info('Enviamos señal');
        computo.send(cantidad);
      } else {
        logger.info(`Mensaje del hijo: ${resultado}`);
        res.json({ resultado });
      }
    });
  };
}
export default RandomController;
