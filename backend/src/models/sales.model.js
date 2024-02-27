const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`
    SELECT prod.sale_id,
      s.date,
      prod.product_id,
      prod.quantity
    FROM sales s
    INNER JOIN sales_products prod 
    ON s.id = prod.sale_id
    ORDER BY prod.sale_id ASC,
      prod.product_id ASC
    `);

  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(`
  SELECT s.date,
    prod.product_id,
    prod.quantity
  FROM sales s
  INNER JOIN sales_products prod 
  ON s.id = prod.sale_id
  WHERE s.id = ?
  `, [saleId]);

  return camelize(sale);
};

const insertSProduct = async (body, saleId) => {
  let insertPromises = [];

  if (body && body.length > 0) {
    insertPromises = body.map(({ productId, quantity }) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    ));

    await Promise.all(insertPromises);
  }
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO sales (date) VALUE (CURRENT_TIMESTAMP - INTERVAL 3 HOUR)
  `);

  return insertId;
};

const promisesOk = async (body, saleId) => {
  try {
    await insertSProduct(body, saleId);
    return 'OK';
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  findAll,
  findById,
  insertSale,
  insertSProduct,
  promisesOk,
};