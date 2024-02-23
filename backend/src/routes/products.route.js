const route = require('express').Router();
const { productsController } = require('../controllers');
const { checkInput, validateInput } = require('../middlewares/inputValidation');

route.get('/', productsController.requestAll);
route.get('/:id', productsController.requestById);
route.post('/', checkInput, validateInput, productsController.requestInsert);
// route.put('/:id', productsController.requestUpdate);
// route.delete('/:id', productsController.requestDelete);

module.exports = route;