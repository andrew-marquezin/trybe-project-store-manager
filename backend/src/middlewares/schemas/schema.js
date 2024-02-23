const joi = require('joi');

const nameSchema = joi.string().min(5);

module.exports = {
  nameSchema,
};