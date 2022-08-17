const productsService = require('../services/productsServices');

async function getAll(_req, res) {
  const product = await productsService.getAll();

  return res.status(200).json(product);
}

async function getById(req, res) {
  const product = await productsService.getById(req.params);
  console.log(product);
  if (!product) {
    return { code: 404, message: 'Product not found' };
  }
  return res.status(200).json(product);
}

module.exports = {
  getAll,
  getById,
};