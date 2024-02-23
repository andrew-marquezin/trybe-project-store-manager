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

module.exports = {
  requestAll,
  requestById,
};