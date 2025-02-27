import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Collection from './pages/Collection'
import Navbar from './Components/Navbar'


function App() {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products/:category/:productid' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place_order' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
    </div>
  )
}

export default App;