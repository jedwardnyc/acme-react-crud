import React, {Component} from 'react';
import Products from './Products';
import Product from './Product';
import axios from 'axios';
import {HashRouter as Router, Route} from 'react-router-dom';


export default class App extends Component{
  constructor(){
    super();
    this.state = {
      products: [],
      numInventory: 0,
      gross: 0,
      name: '',
      price: '',
      inventory: '',
    };
    this.productCreate = this.productCreate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeInventory = this.onChangeInventory.bind(this);
    this.onDelete = this.onDelete.bind(this)
    this.updateProduct = this.updateProduct.bind(this)
  };

  componentDidMount(){
    axios.get('/api/products')
      .then( res => res.data)
      .then( products => {
        this.setState({ products })
        this.totalInventory()
        this.totalGross()
      })
  }

  onSubmit(ev){
    ev.preventDefault()
    this.productCreate({name: this.state.name, inventory: this.state.inventory, price: this.state.price})
    this.setState({name: '', price: '', inventory: ''})
  }

  updateProduct(product){
    axios.put(`/api/products/${product.id}`, product)
      .then( res => res.data )
      .then( product => {
        const products = this.state.products.map( _product => {
          if (_product.id === product.id*1){
            return product
          }
          return _product;
        });
        this.setState({ products })
        document.location.hash = '/';
      })
  }

  onDelete(id){
    console.log(id)
    axios.delete(`/api/products/${id}`)
      .then( res => res.data)
      .then( ()  => {
        const products = this.state.products.filter(_product => _product.id === id*1 ? false : true);
        this.setState({ products });
        document.location.hash = '/';
      })
  }

  onChangeName(ev){
    this.setState({name: ev.target.value})
  }

  onChangePrice(ev){
    this.setState({price: ev.target.value})
  }

  onChangeInventory(ev){
    this.setState({inventory: ev.target.value})
  }

  productCreate(product){
    axios.post('/api/products', product)
      .then(res => res.data)
      .then( product => this.setState({ products: [...this.state.products, product] }))
      .then( ()=> document.location.hash = '/')
  }

  totalInventory(){
    let numInventory = 0;
    this.state.products.map( product =>{
      numInventory += (product.inventory *1)
    })
    this.setState({ numInventory })
  }

  totalGross(){
    let gross = 0;
    this.state.products.map( product =>{
      gross += ((product.inventory*1) * (product.price * 1))
    })
    this.setState({ gross })
  }

  render(){
    const { products, numInventory, gross, name, price, inventory } = this.state;
    const { onSubmit, onChangeName, onChangeInventory, onChangePrice, onDelete, updateProduct } = this;

    return (
      <div>
        <Router>
          <div>
            <Route path='/' exact render = {() => <Products products={products} numInventory={numInventory} gross={gross} name={name} price={price} inventory={inventory} onDelete={onDelete} createProduct={onSubmit} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeInventory={onChangeInventory} /> } /> 
            <Route path='/products/:id' exact render = {( { match } )=> (
              <Product products={products} id={match.params.id} update={updateProduct} onChangeName={onChangeName} onChangePrice={onChangePrice} onChangeInventory={onChangeInventory}/> 
            )} />
          </div>
        </Router>
      </div>
    )
  };
};
