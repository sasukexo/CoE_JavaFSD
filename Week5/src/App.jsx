import React from "react";
import Navbar from "./Components/Navbar"
import { Routes, Route } from "react-router-dom"
import Homepage from './Pages/Homepage'
import Cart from './Pages/Cart'
import Footer from './Components/Footer'
import ProductDetails from './Pages/ProductDetails'
const App = () =>
{
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>

        <Route path='/product/:id' element={<ProductDetails/>}/>

        <Route path='/cart' element={<Cart/>}/>

      </Routes> 

      <Footer/>
    </div>

  )
 
}
export default App