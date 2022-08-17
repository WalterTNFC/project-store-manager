require('dotenv').config();

const configENV = {
  MySQL: {
    host: process.env.MYSQL_HOST,
    database: 'StoreManager',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  API: {
    port: process.env.PORT,
  },
};

module.exports = configENV;