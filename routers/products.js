const express = require('express');
const controllerProducts = require('../controllers/productsControllers');
const { nameValidation } = require('../middlewares/productValidation/nameValidation');

const products = express.Router();

products.get('/', controllerProducts.getAll);
products.get('/:id', controllerProducts.getById);
products.post('/', nameValidation, controllerProducts.newProducts);

module.exports = products;
