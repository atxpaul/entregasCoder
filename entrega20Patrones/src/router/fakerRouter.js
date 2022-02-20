import express from 'express';
import FakerController from '../controller/FakerController.js';

const { Router } = express;
const router = new Router();

const fakerController = new FakerController();

router.get('/', fakerController.getFakeProductsController);

export default router;
