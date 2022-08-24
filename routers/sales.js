const express = require('express');
const controllerSales = require('../controllers/salesControllers');
const productValidation = require('../middlewares/productValidation/productValidation');
const productQuantityValidation = require('../middlewares/productValidation/quantityValidation');

const sales = express.Router();

sales.get('/', controllerSales.getAll);
sales.get('/:id', controllerSales.getById);
sales.delete('/:id', controllerSales.deleteSale);

sales.use(
  productValidation.productValidation,
  productValidation.productValidationIfExist,
  productQuantityValidation.quantityValidation,
  productQuantityValidation.quantityValueValidation,
);

sales.post('/', controllerSales.createSale);
sales.put('/:id', controllerSales.updatesale);

module.exports = sales;
