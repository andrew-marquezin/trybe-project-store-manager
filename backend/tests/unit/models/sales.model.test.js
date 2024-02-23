const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, saleByIdFromDB } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL: ', function () {
  it('Buscando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromDB); 
  });

  it('Buscando uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdFromDB]);

    const sale = await salesModel.findById(1);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleByIdFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});