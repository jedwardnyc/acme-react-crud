const express = require('express');
const app = express();
const path = require('path')
const db = require('./db');
const Product = db.Product

app.use(require('body-parser').json());
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/vendor', express.static('node_modules'))
app.use('/public', express.static('public'))

app.get('/', (req,res,next)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products', (req,res,next)=>{
  Product.findAll()
    .then( products => res.send(products))
})

app.post('/api/products', (req,res,next)=>{
  Product.create(req.body)
    .then( products => res.send(products))
})

app.put('/api/products/:id', (req,res,next)=>{
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
})

app.delete(`/api/products/:id`, (req,res,next)=>{
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then( () => res.sendStatus(204))
})

db.seedAndSync();

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

