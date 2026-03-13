"use client"
import React from 'react'
import Canvas from "@/app/projects/spectral-echo/scene"
import Overlay from "@/app/projects/spectral-echo/overlay"
import Loader from "@/app/components/Loader" 

export default function SpectralEcho() {
  return (
    <main className="bg-[#050505] h-screen w-full">
      <Loader>
        <Canvas/>
        <Overlay/>
      </Loader>
    </main>
  )
}