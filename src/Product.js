import React from 'react';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      name: '',
      price: '',
      inventory: '',
      id: ''
    };
    this.onChangeInventory = this.onChangeInventory.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.setProduct = this.setProduct.bind(this)
  }

  setProduct(products, id){
    const product = products.find( product => product.id === id)
    if (product) {
      this.setState({ name: product.name, price: product.price, inventory: product.inventory, id: product.id })
    }
  }

  componentWillReceiveProps(nextProps){
    this.setProduct(nextProps.products, nextProps.id*1)
  }

  componentDidMount(){
    this.setProduct(this.props.products, this.props.id*1)
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

  onUpdate(ev){
    ev.preventDefault()
    const { name, price, inventory, id} = this.state
    const product = { id, name, price, inventory }
    this.props.update(product)
  }


  render(){
    const {  onChangeName, onChangePrice, onChangeInventory, onUpdate } = this;
    const { name, price, inventory } = this.state;
    const { products, id } = this.props;
  return (
    <div>
      <h1> Edit Product: </h1>
      <div>
        <form onSubmit={onUpdate} className='form-control'>
          <div className='form-group'>
            <label> Name: </label>
            <br />
            <input type='text' name='name' onChange={onChangeName} value={name} placeholder="Product Name" />
          </div>
          <div className='form-group'>
          <label> Price: </label>
            <br />
            <input type='text' name='price' onChange={onChangePrice} value={price} placeholder="Price (0.00)" />
          </div>
          <div className='form-group'>
          <label> Number of Items: </label>
          <br />
            <input type='text' name='inventory' onChange={onChangeInventory} value={inventory} placeholder="Total Amount" />
          </div>
          <br />
          <button className="btn btn-success">Update Product</button>
          <button className="btn btn-danger"> <Link to='/' style={{ textDecoration: 'none', color: "white" }} > Cancel </Link> </button>
        </form> 
      </div>
    </div>
  )}
}
