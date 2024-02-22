const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.requestAll);
route.get('/:id', productsController.requestById);

module.exports = route;