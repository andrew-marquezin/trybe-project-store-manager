const { salesModel } = require('../models');

const getAll = async () => {
  const sales = await salesModel.findAll();
  
  if (sales && sales.length) return { status: 'SUCCESSFUL', data: sales };
  return { status: 'NOT_FOUND', data: { message: 'No sale found' } };
};

const getById = async (saleId) => {
  // console.log(saleId);
  const sale = await salesModel.findById(saleId);

  if (sale && sale.length) return { status: 'SUCCESSFUL', data: sale };
  return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
};

module.exports = {
  getAll,
  getById,
};