import React from 'react'
import {  Routes, Route } from "react-router-dom";

import Sidebar from './../components/Sidebar';
import { AddProduct } from './../components/AddProduct';
import ListProducts from './../components/ListProducts';
import ProductDetails from '../components/ProductDetails';

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/productsList" element={<ListProducts />} />
        <Route path="/productsList/:productId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default Admin