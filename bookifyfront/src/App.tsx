import React from 'react'

import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './components/Header/Topbar'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import AddProduct from './components/Products/AddProduct'
import HomePage from './components/HomePage/HomePage'
import GetAllBooks from './components/Products/GetAllBooks'
import Cart from './components/Cart/Cart'

const App = () => {
  return (
    <BrowserRouter>
        <TopBar/>
      <Routes>
        <Route/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<AdminDashboard/>}/>
        <Route path="/dashboard/addproducts" element={<AddProduct/>}/>
        <Route path="/dashboard/allproducts" element={<GetAllBooks/>}/>
        <Route path="/mycart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App