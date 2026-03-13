import React from 'react'
import Navbar from "../app/home/navbar"
import Home from "./home/hero"
import Footer from "../app/home/footer"

export default function page() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar/>
      <Home/>
      <Footer/>
    </main>
  )
}



