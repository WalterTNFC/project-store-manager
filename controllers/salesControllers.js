const salesService = require('../services/salesServices');

const serverErrorMessage = { code: 500, message: 'Server error.' };
const getAll = async (_req, res, next) => {
  try {
    const { code, data } = await salesService.getAll();
    return res.status(code).json(data);
  } catch (error) {
    next(serverErrorMessage);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, code, data } = await salesService.getById(id);
    if (error) return res.status(error.code).json({ message: error.message });
    return res.status(code).json(data);
  } catch (error) {
    next(serverErrorMessage);
    //
  }
};

async function createSale(req, res) {
  const { code, data } = await salesService.createSale(req.body);
  return res.status(code).json(data);
}

// Requisito 14
async function deleteSale(req, res) {
  const { id } = req.params;
  const { error, code } = await salesService.deleteSale(id);

  if (error) {
    return res.status(error.code).json({ message: error.message });
  }
  return res.status(code).end();
}

// Rquisito 16
async function updatesale(req, res) {
  const { id } = req.params;

  const { error, code, data } = await salesService.updateSale(id, req.body);

  if (error) {
    return res.status(error.code).json({ message: error.message });
  }

  return res.status(code).json(data);
}

// async function create(req, res) {
//   const sale = await salesService.create(req.body);

//   res.status(201).json(sale);
// }

module.exports = {
  getAll,
  getById,
  createSale,
  deleteSale,
  updatesale,
};