const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productByIdFromDB = { id: 1, name: 'Martelo de Thor' };

const updateProdMock = { id: 1, name: 'Martelo do Batman' };

module.exports = {
  productsFromDB,
  productByIdFromDB,
  updateProdMock,
};