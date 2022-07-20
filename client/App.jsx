import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './subcomponents/Nav'
import Index from './views/Index'
import Recipes from './views/Recipes'
import ViewProducts from './views/ViewProducts'
import AddProduct from './views/AddProduct'
import PhotoCapture from './views/PhotoCapture'
import Stats from './views/Stats'

function App() {
  return (
  <>
  <Nav />
  <Routes>
    <Route path="*" element={<Index />} />
    <Route path="/" element={<Index />} />
    <Route path="/products/:ingredient/recipes" element={<Recipes />} />
    <Route path="/products/view" element={<ViewProducts />} />
    <Route path="/products/add" element={<AddProduct />} />
    <Route path="/products/add/photo" element={<PhotoCapture />} />
    <Route path="/products/stats" element={<Stats />} />
  </Routes>
  </>
  )
}

export default App
