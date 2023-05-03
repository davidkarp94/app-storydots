const db = require('./db');
const helper = require('../helper');

async function getMultiple(page = 1){
  const rows = await db.query(
    `SELECT * FROM products ORDER BY id DESC`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getOne(id){
  const row = await db.query(
    `SELECT * FROM products WHERE id=${id}`
  );

  if(row.length > 0) return row;

  let message = 'Error in getting product';

  return {message};
}

async function create(data){

  let { name, description, image_url, price } = data;

  const result = await db.query(
    `INSERT INTO products (name, description, image_url, price) VALUES (?, ?, ?, ?)`,
    [name, description, image_url, price]
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM products WHERE id=${id}`
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return {message};
}

async function update(id, data){

  let { name, description, image_url, price } = data;

  const result = await db.query(
    'UPDATE products SET name = ?, description = ?, image_url = ?, price = ? WHERE id = ?',
    [name, description, image_url, price, id]
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'Product updated successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  remove,
  update,
  getOne
}