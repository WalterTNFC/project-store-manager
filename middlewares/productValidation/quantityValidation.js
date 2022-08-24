function quantityValidation(req, res, next) {
  const quantities = req.body.every(({ quantity }) => quantity || quantity >= 0);

  if (!quantities) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
}

function quantityValueValidation(req, res, next) {
  const quantityValue = req.body.every(({ quantity }) => quantity >= 1);

  if (!quantityValue) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
}

module.exports = {
  quantityValidation,
  quantityValueValidation,
};
