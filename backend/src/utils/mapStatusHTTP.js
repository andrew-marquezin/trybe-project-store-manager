const httpInterface = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  BAD_REQUEST: 405,
};

const mapStatusHTTP = (status) => httpInterface[status] || 500;

module.exports = mapStatusHTTP;