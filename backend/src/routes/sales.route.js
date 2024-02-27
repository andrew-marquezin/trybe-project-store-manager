const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateProdId, validateProdQuantity } = require('../middlewares/inputValidation');

route.get('/', salesController.requestAll);
route.get('/:id', salesController.requestById);
route.post('/', validateProdId, validateProdQuantity, salesController.requestInsert);

module.exports = route;