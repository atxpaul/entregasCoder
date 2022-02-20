import express from 'express';
import RandomController from '../controller/RandomController.js';

const { Router } = express;
const router = new Router();
const randomController = new RandomController();

router.get('/', randomController.getRandomController);

export default router;
