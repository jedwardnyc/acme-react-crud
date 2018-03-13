const conn = require('./conn');
const { Sequelize } = conn;
const faker = require('faker');
const Product = require('./Product')

const seedAndSync = () =>{
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Product.create({name: faker.commerce.productName(), price: faker.commerce.price(1,10), inventory: (Math.floor(Math.random()*10)+1).toString()}),
      Product.create({name: faker.commerce.productName(), price: faker.commerce.price(1,10), inventory: (Math.floor(Math.random()*10)+1).toString()}),
      Product.create({name: faker.commerce.productName(), price: faker.commerce.price(1,10), inventory: (Math.floor(Math.random()*10)+1).toString()}),
    ])
  })
}

module.exports = {
  Product,
  seedAndSync
}

