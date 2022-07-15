import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, setQuery } from 'react';
import {BrowserRouter, Routes, Route, Link, NavLink, HashRouter} from "react-router-dom";



export function Product(props){
    return(
        <div className="item">
        <img src={props.imgUrl} />
        <p>
            <span class="item-brand">{props.brand}</span>
            {props.model}
            <span class="item-price">${props.price}</span>
            <Link to={`/product/${props.id}`}>View</Link>
        </p>
        </div>
    );
}

export function LoadProducts(props) {
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
        // TODO: indicate name doesn't exist 
        }
    }
    getProducts();
    }, [brandName]);

    return (
    <>
        <div class="list-view">   
            <input type="text" onChange={handleChange} />
            <div className="items">
            {products.map((product, i) => <Product id={product.id} brand={product.brand} price={product.price} model = {product.model} imgUrl={product.imgUrl} />)}
            </div>


        </div>
    </>
    )

}

