import React from 'react';
import Footer from '../components/Footer';
import Error from '../components/Error';
import Navbar from '../components/Navbar';

export default function PageNotFound() {
  return (
    <>
      <Navbar></Navbar>
      <Error></Error>
      <Footer></Footer>
    </>
  )
}
