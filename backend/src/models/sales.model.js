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
  // console.log(saleId);
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

module.exports = {
  findAll,
  findById,
};