const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.STRING,
  inventory: Sequelize.STRING
})

module.exports = Product