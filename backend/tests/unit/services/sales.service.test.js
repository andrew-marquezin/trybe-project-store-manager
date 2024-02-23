const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromDB, saleByIdFromDB } = require('../mocks/sales.mock');

describe('Realizando testes - SALES SERVICE: ', function () {
  it('Busca todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromDB);

    const response = await salesService.getAll();

    expect(response).to.be.an('object');
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(salesFromDB);
  });

  it('Busca uma venda pelo id com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleByIdFromDB);

    const response = await salesService.getById(1);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(saleByIdFromDB);
  });

  it('Falha ao não encontrar nenhuma venda', async function () {
    sinon.stub(salesModel, 'findAll').resolves(null);

    const response = await salesService.getAll();

    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data.message).to.equal('No sale found');
  });

  it('Falha ao não encontrar uma venda pelo id', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const response = await salesService.getById(99);

    expect(response).to.be.an('object');
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data.message).to.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});