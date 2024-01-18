import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/home_components/Hero';
import BestSeller from '../components/home_components/BestSeller';
import MoreProducts from '../components/home_components/MoreProducts';
import Perks from '../components/home_components/Perks';
import NewsLetter from '../components/home_components/NewsLetter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <BestSeller></BestSeller>
      <Perks></Perks>
      <NewsLetter></NewsLetter>
      <Footer></Footer>  
    </>

  )
}
