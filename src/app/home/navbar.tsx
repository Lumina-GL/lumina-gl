"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <main className="fixed top-0 left-0 w-full z-50 backdrop-blur-md text-[#ffffff] flex flex-col justify-between px-6 md:px-24 pt-6 pb-3 cursor-none">

      <header className="grid grid-cols-2 md:grid-cols-3 items-start z-10 w-full font-mono">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="font-bold tracking-tighter text-[14px] md:text-xl leading-none opacity-90 uppercase">
             Lumina-GL
          </h1>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            
            <p className="text-[9px] uppercase tracking-[0.2em]">
              Lab 0.26 / Active
            </p>
          </div>
        </motion.div>

        <div className="hidden md:flex justify-center text-[9px] opacity-70 text-center tracking-widest uppercase">
          Digital Excellence <br /> Award Nominee
        </div>

        <div className="text-[9px] opacity-60  text-right space-y-1 ml-auto">
          <p>
            40.7128° N, 74.0060° W
          </p>

          <p className="hidden sm:block">
            LOCAL TIME: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>

        </div>
      </header>

    </main>
  )
}


