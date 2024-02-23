const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.requestAll);
route.get('/:id', productsController.requestById);
route.post('/', productsController.requestInsert);

module.exports = route;