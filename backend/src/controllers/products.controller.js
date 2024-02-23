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
  const { body } = req;
  const { status, data } = await productsService.getInsert(body.name);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  requestAll,
  requestById,
  requestInsert,
};