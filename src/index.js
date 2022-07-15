import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, setQuery } from 'react';
import './index.css';
import App from './App';
import {Product, LoadProducts} from './List';
import Details from './Details'
import Search from './search';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


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



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>    
    <Header />
    <Router>
      <Routes>
        <Route exact path='/' element={<LoadProducts />} />
        <Route exact path='/product/:id' element={<Details />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
