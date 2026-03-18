"use client"
import React from 'react'
import Canvas from "@/app/projects/image-alchemy/scene"
import Overlay from "@/app/projects/image-alchemy/overlay"
import Loader from "@/app/components/Loader" 

export default function ImageAlchemy() {
  return (
    <main className="bg-[#050505] h-screen w-full">
      <Loader>
        <Canvas/>
        <Overlay/>
      </Loader>
    </main>
  )
}