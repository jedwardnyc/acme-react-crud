import React from 'react';
import { Link } from 'react-router-dom';

const Products = (props) => {
  const { products, numInventory, gross, name, price, inventory, createProduct, onChangeName, onChangeInventory, onChangePrice, onDelete } = props;
  return(
    <div>
      <h1>Current Stock</h1>
      <h3>We currently have {numInventory} products totaling ${gross} worth of merchandise</h3>
      <br />
      <h3>Add a product: </h3>
      <form onSubmit={createProduct} className='form-row form-control'>
        <div className='col-auto'>
          <input onChange={onChangeName} value={name} placeholder="Product Name" />
        </div>
        <div className='col-auto'>
          <input onChange={onChangePrice} value={price} placeholder="Price (0.00)" />
        </div>
        <div className='col-auto'>
          <input onChange={onChangeInventory} value={inventory} placeholder="Total Amount" />
        </div>
          <button className="button">Add Product</button>
      </form>
      <ul className="list-group">
      {
        products.map(product => (
          <li id='productItem' className="list-group-item" key={product.id}> 
          <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: "black" }}>
            <form style={{display: 'flex', justifyContent:'space-between'}}>
              <div style={{flex: 9}} > 
                {product.name} <br /> 
                Price per Unit: ${product.price} <br /> 
                Total in Stock: {product.inventory} 
              </div>
              <button onClick={()=> onDelete(product.id)} style={{flex: 1}} className="btn btn-danger">DELETE</button>
            </form>
          </Link>
          </li>
        ))
      }
      </ul>
    </div>
  )
  
}

export default Products;