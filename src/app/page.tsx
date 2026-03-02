import React from 'react'
import Footer from "../app/home/footer"
import Navbar from "../app/home/navbar"
import Home from "./home/hero"


export default function page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar/>
      <Home/>
      <Footer/>
    </main>
  )
}



