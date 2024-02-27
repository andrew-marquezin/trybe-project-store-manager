const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const requestAll = async (_req, res) => {
  const { status, data } = await productsService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const requestById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const requestInsert = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.getInsert(name);

  return res.status(mapStatusHTTP(status)).json(data);
};

const requestUpdate = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { status, data } = await productsService.getUpdate(name, id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const requestDelete = async (req, res) => {
  const { id } = req.params;
  const { status } = await productsService.getDelete(id);

  if (status !== 'NOT_FOUND') return res.status(mapStatusHTTP(status)).end();
  return res.status(mapStatusHTTP(status)).json({ message: 'Product not found' });
};

module.exports = {
  requestAll,
  requestById,
  requestInsert,
  requestUpdate,
  requestDelete,
};