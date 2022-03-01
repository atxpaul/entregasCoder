import { httpServer } from './loader/app.js';
import Mongo from './loader/Mongo.js';

import logger from './config/logger.js';

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, async () => {
  const mongo = new Mongo();
  await mongo.connectDb();
  logger.info(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  logger.error(`Error en servidor ${error}`)
);
