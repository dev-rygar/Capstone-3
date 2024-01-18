import React from 'react'
import Navbar from '../components/Navbar';
import ProductCatalog from '../components/ProductCatalog';
import Footer from '../components/Footer'


export default function ProductPage() {
  return (
    <>
        <Navbar></Navbar>
        <ProductCatalog></ProductCatalog>
        <Footer></Footer>
    </>
  )
}
