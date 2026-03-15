"use client"
import React from 'react'
import Canvas from "@/app/projects/elegance/scene"
import Overlay from "@/app/projects/elegance/overlay"
import Loader from "@/app/components/Loader" 

export default function Elegance() {
  return (
    <main className="bg-[#050505] h-screen w-full">
      <Loader>
        <Canvas/>
        <Overlay/>
      </Loader>
    </main>
  )
}