const salesService = require('../services/salesServices');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

const getByID = async (req, res) => {
  const sale = await salesService.getByID(req.params);

  res.status(200).json(sale);
};

module.exports = {
  getAll,
  getByID,
};