const express = require('express');
const controllerProducts = require('../controllers/productsControllers');

const products = express.Router();

products.get('/', controllerProducts.getAll);
products.get('/:id', controllerProducts.getById);

module.exports = products;
