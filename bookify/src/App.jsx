import { Box } from '@chakra-ui/react'
import React from 'react'
import TopBar from './Components/Header/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './Components/Dashboard/AdminDashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopBar/> 
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App