const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,  // Change this to an environment variable
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432  // Default to 5432 if DB_PORT is not set
  }
);

module.exports = sequelize;
