import React from 'react'
import{Link}from 'react-router-dom'

function Nav() {
  return (
  <>
  <nav className="tailwind">
    <Link to="/">Home</Link>
    <Link to="/products/add">Add Product</Link>
    <Link to="/products/view">View Products</Link>
  </nav>
 
  </>)
}

export default Nav
