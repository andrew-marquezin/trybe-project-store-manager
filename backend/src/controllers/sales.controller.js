const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const requestAll = async (_req, res) => {
  const { status, data } = await salesService.getAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const requestById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);
  console.log(id, status, data);

  return res.status(mapStatusHTTP(status)).json(data);
};

const requestInsert = async (req, res) => {
  const { body } = req;
  const { status, data } = await salesService.getInsert(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  requestAll,
  requestById,
  requestInsert,
};