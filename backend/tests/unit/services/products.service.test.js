const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsFromDB, productByIdFromDB } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS SERVICE: ', function () {
  it('Busca todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromDB);

    const response = await productsService.getAll();
    expect(response).to.be.an('object');
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(productsFromDB);
  });

  it('Busca um produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productByIdFromDB);

    const response = await productsService.getById(1);
    expect(response).to.be.an('object');
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(productByIdFromDB);
  });

  it('Falha ao não encontrar nenhum produto', async function () {
    sinon.stub(productsModel, 'findAll').resolves(null);

    const response = await productsService.getAll();
    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data.message).to.equal('No product found');
  });

  it('Falha ao não encontrar um produto pelo id', async function () {
    sinon.stub(productsModel, 'findById').resolves(null);

    const response = await productsService.getById(99);
    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data.message).to.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});