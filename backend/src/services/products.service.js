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

const getInsert = async (productName) => {
  const returnId = await productsModel.insert(productName);

  if (returnId) return { status: 'CREATED', data: { id: returnId, name: productName } };
  return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Failed to create product' } };
};

module.exports = {
  getAll,
  getById,
  getInsert,
};