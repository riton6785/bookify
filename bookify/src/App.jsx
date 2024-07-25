import { Box } from '@chakra-ui/react'
import React from 'react'
import TopBar from './Components/Header/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './Components/Dashboard/AdminDashboard'
import AddProduct from './Components/Products/AddProduct'
import CreateUser from './Components/Users/CreateUser'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TopBar/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
          <Route path="/dashboard/addproducts" element={<AddProduct/>}/>
          <Route path="/dashboard/createuser" element={<CreateUser/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App