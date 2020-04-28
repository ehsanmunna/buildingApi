const Sequelize = require('sequelize');
const sequelize = new Sequelize('buildings', 'sa', '123', {
    host: 'localhost',
    dialect: 'mssql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  });

  // sequelize.sync()

  module.exports = sequelize;