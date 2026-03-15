"use client"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import ShaderMesh from "./shaderMesh"

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[1]">
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
        style={{ width: "100vw", height: "100vh" }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
         <ShaderMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
