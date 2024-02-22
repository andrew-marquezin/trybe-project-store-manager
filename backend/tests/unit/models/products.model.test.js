const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productByIdFromDB } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL: ', function () {
  it('Buscando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromDB);
  });

  it('Buscando um produto por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);

    const product = await productsModel.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productByIdFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});