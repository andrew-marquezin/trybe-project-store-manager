const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.requestAll);
route.get('/:id', salesController.requestById);

module.exports = route;