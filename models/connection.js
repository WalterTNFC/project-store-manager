const mysql = require('mysql2/promise');
const { MySQL: { host, database, user, password } } = require('../configs/configs');

const connection = mysql.createPool({
  host,
  user,
  password,
  database,
});

module.exports = connection;
