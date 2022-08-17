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

// Requisito 3
async function newProducts(name) {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);

  if (!insertId) {
    return null;
  }
  return { id: insertId, name };
}
module.exports = {
  getAll,
  getById,
  newProducts,
};