import express from 'express';
import fakerRouter from '../router/fakerRouter.js';
import userRouter from '../router/userRouter.js';
import infoRouter from '../router/infoRouter.js';
import randomRouter from '../router/randomRouter.js';

// Arrancamos express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/randoms', randomRouter);
app.use('/info', infoRouter);
app.use('/api/productos-test', fakerRouter);
app.use('/', userRouter);
app.use(express.static('public'));

//Default route
app.use((req, res) => {
  const { url, method } = req;
  //Añado un caso especial que me hace saltar un log molesto
  if (url != '/favicon.ico') {
    logger.warn(`Ruta ${method}-${url} no implementada`);
  }
  res.json({
    error: -2,
    description: `Route ${req.url} not implemented`,
  });
});

export default app;
