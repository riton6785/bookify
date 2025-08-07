import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './components/Header/Topbar'
import AddProduct from './components/Products/AddProduct'
import HomePage from './components/HomePage/HomePage'
import GetAllBooks from './components/Products/GetAllBooks'
import Cart from './components/Cart/Cart'
import ProductDetailsPage from './components/Products/ProductDetailsPage'
import NotFound from './components/Miscellanious/NotFound'
import GetAllUSers from './components/User/GetAllUSers'
import Dashboard from './components/AdminDashboard/Dashboard'
import EditProducts from './components/Products/EditProducts'
import AdminProtectedValidator from './components/AdminDashboard/AdminProtectedValidator'
import Unauthorized from './components/Miscellanious/Unauthorized'
import SearchedProducts from './components/SearchProduct/SearchedProducts'
import PaymentSuccess from './components/Miscellanious/PaymentSuccess'
import UsersPurchase from './components/AdminDashboard/UsersPurchase'
import MyPurchase from './components/User/MyPurchases'

const App = () => {
  return (
    <BrowserRouter>
        <TopBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchedProducts/>}/>
        {/* Protected dashboard section */}
        <Route
      path="/dashboard"
      element={
        <AdminProtectedValidator allowedRoles={['admin']}>
          <Dashboard />
        </AdminProtectedValidator>
      }
    />
      <Route path="/dashboard/addproducts" element = {
        <AdminProtectedValidator allowedRoles={['admin']}>
          <AddProduct/>
        </AdminProtectedValidator>
      }/>
      <Route path="/editproduct/:id" element = {
        <AdminProtectedValidator allowedRoles={['admin']}>
          <EditProducts/>
        </AdminProtectedValidator>
      }/>
      <Route path="/editproduct/:id" element = {
        <AdminProtectedValidator allowedRoles={['admin']}>
          <EditProducts/>
        </AdminProtectedValidator>
      }/>
      <Route path="/dashboard/allproducts" element = {
        <AdminProtectedValidator allowedRoles={['admin']}>
          <GetAllBooks/>
        </AdminProtectedValidator>
      }/>
      <Route path="/dashboard/alluser" element = {
        <AdminProtectedValidator allowedRoles={['admin']}>
          <GetAllUSers/>
        </AdminProtectedValidator>
      }/>
        <Route path="/mycart" element={<Cart/>}/>
        <Route path="book/:id" element={<ProductDetailsPage/>}/>
        <Route path="/payment_success" element={<PaymentSuccess/>}/>
        <Route path="/purchase" element={<MyPurchase/>}/>
        <Route path="/:id/purchase" element={<UsersPurchase/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App