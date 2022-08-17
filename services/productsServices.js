const productsModel = require('../models/produtsModel');

async function getAll() {
  const products = await productsModel.getAll();

  if (!products) {
    return { code: 404, message: 'Product not found' };
  }

  return products;
}

async function getById(id) {
  const products = await productsModel.getById(id);
  if (!products) {
    return { code: 404, message: 'Product not found' };
  }
  return { code: 200, data: products };
}

async function newProducts(productName) {
  const { id, name } = await productsModel.newProducts(productName);

  return { code: 201, id, name };
}

module.exports = {
  getAll,
  getById,
  newProducts,
};