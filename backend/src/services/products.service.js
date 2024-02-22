const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.findAll();

  if (products && products.length) return { status: 'SUCCESSFUL', data: products };
  return { status: 'NOT_FOUND', data: { message: 'No product found' } };
};

const getById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (product) return { status: 'SUCCESSFUL', data: product };
  return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
};

module.exports = {
  getAll,
  getById,
};