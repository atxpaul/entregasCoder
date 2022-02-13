import express from 'express';
import faker from 'faker';
import logger from '../config/logger.js';

const { Router } = express;
const router = new Router();

// Arrancamos faker

faker.locale = 'es';
const { commerce, image } = faker;

router.get('/', (req, res) => {
  const { originalUrl, method } = req;
  logger.info(`${method}-${originalUrl} Recibiendo petición`);
  let productos = [];
  for (let i = 0; i < 5; i++) {
    let obj = {};
    obj.title = commerce.productName();
    obj.price = commerce.price();
    obj.thumbnail = image.imageUrl();
    productos.push(obj);
  }
  res.json(productos);
});

export default router;
