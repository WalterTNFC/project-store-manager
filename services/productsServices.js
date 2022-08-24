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
    return { error: { code: 404, message: 'Product not found' } };
  }
  return { code: 200, data: products };
}

async function newProducts(productName) {
  const { id, name } = await productsModel.newProducts(productName);

  return { code: 201, id, name };
}

// Requisito 10
async function updateProduct(id, name) {
  const product = await productsModel.getById(id);
  const update = await productsModel.updateProduct(id, name);
  
  if (!product) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  return { code: 200, data: update };
}

// Requisito 12
async function deleteProduct(id) {
  const product = await productsModel.getById(id);
  if (!product) {
    return { error: { code: 404, message: 'Product not found' } };
  }

  await productsModel.deleteProduct(id);
  return { code: 204 };
}

// Requisito 18
async function searchProduct(name) {
  console.log(name);
  if (!name) {
    console.log('sem name');
    const product = await productsModel.getAll();
    return { code: 200, data: product };
  }

  const result = await productsModel.searchProduct(name);
  console.log(result);
  return { code: 200, data: result };
}
module.exports = {
  getAll,
  getById,
  newProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};