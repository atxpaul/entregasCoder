import express from 'express';
import compression from 'compression';
import InfoController from '../controller/InfoController.js';

const { Router } = express;
const router = new Router();

const infoController = new InfoController();

router.use(compression());

router.get('/', infoController.getInfoController);

export default router;
