const express = require('express');
const controllerProducts = require('../controllers/productsControllers');
const { nameValidation } = require('../middlewares/productValidation/nameValidation');

const products = express.Router();

products.get('/', controllerProducts.getAll);
products.get('/search', controllerProducts.searchProduct);
products.get('/:id', controllerProducts.getById);
products.post('/', nameValidation, controllerProducts.newProducts);
products.put('/:id', nameValidation, controllerProducts.updateProduct);
products.delete('/:id', controllerProducts.deleteProduct);

module.exports = products;
