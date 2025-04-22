const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('asap', 'root', 'Goldi9010512346@', {
  host: 'localhost',
  dialect: 'mysql',
});

async function authenticateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection successful!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, authenticateDatabase };