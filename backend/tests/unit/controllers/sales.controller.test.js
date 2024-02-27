const chai = require('chai');
const sinonChai = require('sinon-chai');
const { stub, restore } = require('sinon');
const { postSaleResponse, postSaleRequest } = require('../mocks/sales.mock');
const { salesService } = require('../../../src/services');
const inputValidation = require('../../../src/middlewares/inputValidation');
const { salesController } = require('../../../src/controllers');

chai.use(sinonChai);

const { expect } = chai;

describe('Realizando testes - SALES CONTROLLER: ', function () {
  it('Cria com sucesso uma nova venda com o metodo POST', async function () {
    const servicePost = { status: 'CREATED', data: postSaleResponse };
    stub(salesService, 'getInsert').resolves(servicePost);
    const next = stub().returns();
    const req = { body: postSaleRequest };
    const res = { status: stub().returnsThis(), json: stub() };

    inputValidation.validateProdId(req, res, next);
    inputValidation.validateProdQuantity(req, res, next);

    await salesController.requestInsert(req, res);

    expect(next).to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(postSaleResponse);
  });

  it('Retorna o status 400 quando não informado o productId no metodo POST', async function () {
    const next = stub().returns();
    const req = { body: [{ quantity: 1 }] };
    const res = { status: stub().returnsThis(), json: stub() };

    inputValidation.validateProdId(req, res, next);
    inputValidation.validateProdQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Retorna o status 400 quando não informado o quantity no metodo POST', async function () {
    const next = stub().returns();
    const req = { body: [{ productId: 1 }] };
    const res = { status: stub().returnsThis(), json: stub() };

    inputValidation.validateProdId(req, res, next);
    inputValidation.validateProdQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Retorna o status 404 quando o productId não existe no metodo POST', async function () {
    const serviceFail = { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    stub(salesService, 'getInsert').resolves(serviceFail);

    const req = { body: [{ productId: 99, quantity: 1 }] };
    const res = { status: stub().returnsThis(), json: stub() };

    await salesController.requestInsert(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Retorna o status 422 quando o quantity tiver um valor inválido no metodo POST', async function () {
    const next = stub().returns();
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = { status: stub().returnsThis(), json: stub() };

    inputValidation.validateProdId(req, res, next);
    inputValidation.validateProdQuantity(req, res, next);

    expect(next).to.have.been.calledWith();
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  afterEach(function () {
    restore();
  });
});