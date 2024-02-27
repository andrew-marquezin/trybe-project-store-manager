const { salesModel } = require('../models');

const getAll = async () => {
  const sales = await salesModel.findAll();
  
  if (sales && sales.length) return { status: 'SUCCESSFUL', data: sales };
  return { status: 'NOT_FOUND', data: { message: 'No sale found' } };
};

const getById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (sale && sale.length) return { status: 'SUCCESSFUL', data: sale };
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
};

const getInsert = async (body) => {
  const returnId = await salesModel.insertSale();

  if (await salesModel.promisesOk(body, returnId) === 'OK') {
    return { status: 'CREATED', data: { id: returnId, itemsSold: body } };
  }
  return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
};

module.exports = {
  getAll,
  getById,
  getInsert,
};