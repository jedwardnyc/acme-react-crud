import React from 'react';

export default class Product extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      product: {}
    };
  }
  componentDidMount(){
    const product = this.props.products.find(product => product.id === this.props.id*1 )
    this.setState({ product })
  }

  render(){
    const { product } = this.state
    const { products, id, onUpdate, onChangeName, onChangePrice, onChangeInventory } = this.props;
  return (
    <div>
      <h1> Edit Product: </h1>
      <div>
        <form onSubmit={onUpdate} className='form-control'>
          <div className='form-group'>
            <label> Name: </label>
            <br />
            <input onChange={onChangeName} value={product.name} placeholder="Product Name" />
          </div>
          <div className='form-group'>
          <label> Price: </label>
            <br />
            <input onChange={onChangePrice} value={product.price} placeholder="Price (0.00)" />
          </div>
          <div className='form-group'>
          <label> Number of Items: </label>
          <br />
            <input onChange={onChangeInventory} value={product.inventory} placeholder="Total Amount" />
          </div>
          <br />
          <button className="button">Add Product</button>
        </form> 
      </div>
    </div>
  )}
}
