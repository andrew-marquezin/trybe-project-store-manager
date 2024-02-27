const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return product;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const update = async (productName, productId) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [productName, productId],
  );
  if (affectedRows === 0) return 'productId não existe';
  return 'OK';
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};