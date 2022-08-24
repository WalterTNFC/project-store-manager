const productsService = require('../services/productsServices');

const serverErrorMessage = { code: 500, message: 'Server error.' };

async function getAll(_req, res) {
  const product = await productsService.getAll();

  return res.status(200).json(product);
}

async function getById(req, res) {
  const { id } = req.params;
  const { error, code, data } = await productsService.getById(id);
  // console.log(product);
  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  return res.status(code).json(data);
}

async function newProducts(req, res) {
  const { name } = req.body;

  const newProduct = await productsService.newProducts(name);
  return res.status(newProduct.code).json({
    id: newProduct.id,
    name: newProduct.name,
  });
}

// Requisito 10
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const { error, code, data } = await productsService.updateProduct(id, name);

  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  // console.log('olá');

  return res.status(code).json(data);
}

// Requisito 12
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    const { error, code } = await productsService.deleteProduct(id);
    if (error) {
    // console.log(error.code);
    // console.log(error.message);
    return (res.status(error.code).json({ message: error.message }));
    }
    // console.log(code);
    return res.status(code).end();
  } catch (error) {
    next(serverErrorMessage);
  }
}

// Requisito 18
async function searchProduct(req, res) {
  console.log('testeSearcg');
  const { q } = req.query;
  const { code, data } = await productsService.searchProduct(q);
  console.log(data);
  return res.status(code).json(data);
}

module.exports = {
  getAll,
  getById,
  newProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};