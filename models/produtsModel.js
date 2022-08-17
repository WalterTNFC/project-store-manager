const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);

  if (products.length === 0) {
    return null;
  }

  return products;
}

async function getById(id) {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [products] = await connection.execute(query, [id]);

  if (products.length === 0) {
    return null;
  }

  return products[0];
}
module.exports = {
  getAll,
  getById,
};