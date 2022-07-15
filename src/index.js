import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, setQuery } from 'react';
import './index.css';
import App from './App';
import Search from './search';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: 0
    }
  }

  render() {
    return(
      <div class="header">
        <h1>Header</h1>
        <div class="cart">{this.state.cart}</div>
      </div>
    )
  }
}

function Product(props){
    return(
      <div className="item">
        <img src={props.imgUrl} />
        <p>
          <span class="item-brand">{props.brand}</span>
          {props.model}
          <span class="item-price">${props.price}</span>
        </p>
      </div>
    );
}

function LoadProducts(props) {
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState('');

  function handleChange(evt) {
    setBrandName(evt.target.value);
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch(`https://front-test-api.herokuapp.com/api/product/${brandName}`);
        const data = await res.json();
        setProducts(data.map(product => {
          return {brand: product.brand, price: product.price, imgUrl: product.imgUrl, model: product.model, id: product.id}
        }));
      } catch(e) {
        // TODO: indicate username doesn't exist 
      }
    }
    getProducts();
  }, [brandName]);

  return (
    <>
    <div class="list-view">
      <input type="text" onChange={handleChange} />
      <div className="items">
        {products.map((product, i) => <Product brand={product.brand} price={product.price} model = {product.model} imgUrl={product.imgUrl} />)}
      </div>
    </div>
    </>
  )

}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>    
    <Header />
    <LoadProducts />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
