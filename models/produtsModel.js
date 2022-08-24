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

// Requisito 10
async function updateProduct(id, name) {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  return { id, name };
}

// Requisito 12
async function deleteProduct(id) {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
}

// Requisito 18
async function searchProduct(name) {
  const query = `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`;
  const [result] = await connection.execute(query);
  console.log('olá');
  console.log(result);
  return result;
}

module.exports = {
  getAll,
  getById,
  newProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};