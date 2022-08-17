const productsService = require('../services/productsServices');

async function getAll(_req, res) {
  const product = await productsService.getAll();

  return res.status(200).json(product);
}

async function getById(req, res) {
  const { id } = req.params;
  const product = await productsService.getById(id);
  console.log(product);
  if (!product) {
    return res.status(product.code).json(product.message);
  }
  return res.status(product.code).json(product.data);
}

async function newProducts(req, res) {
  const { name } = req.body;

  const newProduct = await productsService.newProducts(name);
  return res.status(newProduct.code).json({
    id: newProduct.id,
    name: newProduct.name,
  });
}
module.exports = {
  getAll,
  getById,
  newProducts,
};