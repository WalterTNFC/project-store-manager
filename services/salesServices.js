const salesModel = require('../models/salesModel');
// const productsService = require('./productsServices');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { code: 200, data: sales };
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);

  if (!sales.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  return { code: 200, data: sales };
};

async function createSale(sales) {
  const { id } = await salesModel.createSale();

  await Promise.all(sales.map(({ productId, quantity }) => (
    salesModel.createSaleProduct(id, productId, quantity)
  )));

  const result = {
    id,
    itemsSold: sales,
  };

  return { code: 201, data: result };
}

// Requisito 14
async function deleteSale(id) {
  const result = await salesModel.getById(id);
  console.log(result);

  if (!result.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  await salesModel.deleteSale(id);
  return { code: 204 };
}

// Requisito 16
async function updateSale(saleId, sales) {
  const result = await salesModel.getById(saleId);
  console.log(result);

  if (!result.length) {
    return { error: { code: 404, message: 'Sale not found' } };
  }

  await salesModel.deleteSaleToUpdate(saleId);

  await Promise.all(sales.map(({ productId, quantity }) => (
    salesModel.createSaleProduct(saleId, productId, quantity)
  )));

   const response = {
    saleId,
    itemsUpdated: sales,
  };

  return { code: 200, data: response };
}

module.exports = {
  getAll,
  getById,
  createSale,
  deleteSale,
  updateSale,
};

// async function create(saleItens) {
//   await Promise.all(saleItens.map(async ({ productId }) => {
//     await productsService.getById({ id: productId });
//   }));

//   const id = await salesModel.createSale(saleItens);

//   return {
//     id,
//     itemsSold: saleItens,
//   };
// }

// module.exports = {
//   create,
// };
