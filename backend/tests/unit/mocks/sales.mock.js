const salesFromDB = [
  {
    saleId: 1,
    date: '2024-02-22T22:49:31.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-22T22:49:31.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-02-22T22:49:31.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleByIdFromDB = [
  {
    saleId: 1,
    date: '2024-02-23T01:58:16.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-23T01:58:16.000Z',
    productId: 2,
    quantity: 10,
  },
];

const postSaleFromDB = [{ insertId: 3 }];

const postSaleRequest = [{ productId: 1, quantity: 1 }];

const postFailRequest = [{ productId: 99, quantity: 1 }];

const postSaleResponse = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

module.exports = {
  salesFromDB,
  saleByIdFromDB,
  postSaleFromDB,
  postSaleRequest,
  postSaleResponse,
  postFailRequest,
};