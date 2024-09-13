import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TopBar from './Components/Header/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import AddProduct from './Components/Products/AddProduct'
import CreateUser from './Components/Users/CreateUser'
import {useDispatch, useSelector } from "react-redux"
import { setUser } from './Redux/slicer'
import ShowallProduct from './Components/Products/ShowallProduct'
import ShowAllUsers from './Components/Users/ShowAllUsers'
import Homepage from './Components/HomePage/Homepage'
import ProductDetailUser from './Components/Products/ProductDetailUser'

const App = () => {
  const dispatch = useDispatch();
  const [loggeduser, setLoggedUser] = useState();
  var user = useSelector((state) => state.userreducer.userInfo)
  useEffect(()=> {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo) {
      dispatch(setUser(userInfo))
    }
  },[])
  return (
    <>  
      <BrowserRouter>
        <TopBar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
          <Route path="/dashboard/addproducts" element={<AddProduct/>}/>
          <Route path="/dashboard/createuser" element={<CreateUser/>}/>
          <Route path="/dashboard/allproducts" element={<ShowallProduct/>}/>
          <Route path="/dashboard/alluser" element={<ShowAllUsers/>}/>
          <Route path="/products/:id" element={<ProductDetailUser/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App