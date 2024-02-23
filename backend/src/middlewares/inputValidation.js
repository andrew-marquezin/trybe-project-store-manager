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

module.exports = {
  checkInput,
  validateInput,
};