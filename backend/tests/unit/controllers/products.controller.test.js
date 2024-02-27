const chai = require('chai');
const sinonChai = require('sinon-chai');
const { stub, restore } = require('sinon');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

const { expect } = chai;

describe('Realizando testes - SALES CONTROLLER: ', function () {
  it('Retorna o status 204 ao deletar um produto com sucesso', async function () {
    stub(productsService, 'getDelete').resolves({ status: 'OK_NO_CONTENT' });
    const req = { params: { id: 1 } };
    const res = { status: stub().returnsThis(), end: stub() };

    await productsController.requestDelete(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Retorna o status 404 ao tentar deletar um produto inexistente', async function () {
    stub(productsService, 'getDelete').resolves({ status: 'NOT_FOUND' });
    const req = { params: { id: 99 } };
    const res = { status: stub().returnsThis(), json: stub() };

    await productsController.requestDelete(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    restore();
  });
});