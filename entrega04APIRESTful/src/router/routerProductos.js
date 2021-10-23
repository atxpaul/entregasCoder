const express = require('express');

const Contenedor = require('../persistence/Contenedor');

const { Router } = express;
const router = new Router();
const con = new Contenedor('productos.txt');

router.get('/', async (req, res) => {
  const productos = await con.getAll();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const producto = await con.getById(id);
  if (producto && producto.length != 0) {
    res.json(producto);
  } else {
    res.json({ error: 'producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const producto = req.body;
  const id = await con.save(producto);
  if (id) {
    const producto = await con.getById(id);
    res.json(producto);
  } else {
    res.json({ error: 'error al guardar producto' });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const producto = req.body;
  if (id) {
    const productoActualizado = await con.updateById(id, producto);
    res.json(productoActualizado);
  } else {
    res.json({ error: 'error al guardar producto' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const productoEliminado = await con.getById(id);
  if (productoEliminado.length != 0) {
    await con.deleteById(id);
    res.json(productoEliminado);
  } else {
    res.json({ error: 'error al eliminar producto' });
  }
});

module.exports = router;
