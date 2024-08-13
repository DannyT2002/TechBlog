const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database user
  process.env.DB_PASSWORD,    // Database password
  {
    host: process.env.DB_HOST || 'localhost', // Database host (use default 'localhost' for local development)
    dialect: 'postgres',
    logging: false,           // Disable logging for production (set to `console.log` for debugging)
  }
);

module.exports = sequelize;
