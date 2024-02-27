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

  it('Atualizando um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await productsModel.update('Martelo do Batman', 1);

    expect(response).to.be.equal('OK');
  });

  it('Falha ao atualizar um produto sem sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const response = await productsModel.update('Martelo do Batman', 99);

    expect(response).to.be.equal('productId não existe');
  });

  it('Deleta um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await productsModel.deleteProduct(1);

    expect(response).to.be.equal('OK');
  });

  it('Falha ao deletar um produto sem sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const response = await productsModel.update(99);

    expect(response).to.be.equal('productId não existe');
  });

  afterEach(function () {
    sinon.restore();
  });
});