const dotenv = require('dotenv');
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_SERVER } = process.env;

const sqlConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  server: DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000,
  },
  options: {
    trustServerCertificate: true
  }
};

module.exports = sqlConfig;