import express from 'express';
import logger from '../config/logger.js';
import FakerRouter from '../router/FakerRouter.js';
import UserRouter from '../router/UserRouter.js';
import InfoRouter from '../router/InfoRouter.js';
import RandomRouter from '../router/RandomRouter.js';
import SocketRouter from '../router/SocketRouter.js';
import passport from '../middleware/passport.js';
import session from 'express-session';
import config from '../config/config.js';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

const infoRouter = new InfoRouter(express);
const fakerRouter = new FakerRouter(express);
const randomRouter = new RandomRouter(express);
const userRouter = new UserRouter(express);

// Arrancamos express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/randoms', randomRouter.start());
app.use('/info', infoRouter.start());
app.use('/api/productos-test', fakerRouter.start());
app.use('/', userRouter.start());
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

const httpServer = new HttpServer(app);

const io = new Socket(httpServer);

const socketRouter = new SocketRouter(io);

socketRouter.startRouter();

export default httpServer;
