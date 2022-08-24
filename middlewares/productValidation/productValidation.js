const productModel = require('../../models/produtsModel');

function productValidation(req, res, next) {
  // const { productId } = req.body;
  const productsId = req.body.every(({ productId }) => productId);

  if (!productsId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
}

async function productValidationIfExist(req, res, next) {
  let productValid = true;

  await Promise.all(req.body.map(async ({ productId }) => {
    const product = await productModel.getById(productId);
    if (!product) {
      productValid = false;
    }
  }));

  if (!productValid) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
}

module.exports = {
  productValidation,
  productValidationIfExist,
};
