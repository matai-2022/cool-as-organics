import React from 'react'
import{Link}from 'react-router-dom'

function Nav() {
  return (
  <>
  {/* <nav className="lg:inline-flex lg:flex-row lg:ml-auto flex-row justify-right py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 duration-300 md:ml-8 "> */}
  <nav className="flex justify-end mt-4 px-3 pr-10 space-x-4 underline">
    <Link to="/">Home</Link>
    <Link to="/products/add">Add Product</Link>
    <Link to="/products/view">View Products</Link>
  </nav>
 
  </>)
}

export default Nav
