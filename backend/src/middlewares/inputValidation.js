const { nameSchema } = require('./schemas/schema');

const checkInput = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const validateInput = (req, res, next) => {
  const { name } = req.body;
  const { error } = nameSchema.validate(name);

  if (error) { 
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' }); 
  }
  next();
};

const validateProdId = (req, res, next) => {
  const { body } = req;
  const checkProductId = body.every((product) => 'productId' in product);

  if (!checkProductId) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validateProdQuantity = (req, res, next) => {
  const { body } = req;
  const checkProductQuantity = body.every((product) => 'quantity' in product);
  const hasInvalidQuantity = body.some((product) => product.quantity < 1);
  
  if (!checkProductQuantity) return res.status(400).json({ message: '"quantity" is required' });

  if (hasInvalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  checkInput,
  validateInput,
  validateProdId,
  validateProdQuantity,
};