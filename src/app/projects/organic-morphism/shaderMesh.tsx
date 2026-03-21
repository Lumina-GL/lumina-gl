"use client"
import * as THREE from "three"
import { useRef, useState, useMemo } from "react"
import { useFrame, extend, ThreeElement, useThree } from "@react-three/fiber"
import { shaderMaterial, useTexture } from "@react-three/drei"

import vertexShader from "../organic-morphism/shaders/vertex.glsl";
import fragmentShader from "../organic-morphism/shaders/fragment.glsl";



const OrganicMorphismMaterial = shaderMaterial(
  { 
    uTime: 0, 
    uTexture: new THREE.Texture(), 
    uHover: 0, 
    uMouse: new THREE.Vector2(), 
    uVelocity: 0
  },
  vertexShader,
  fragmentShader
)

extend({OrganicMorphismMaterial})

declare module "@react-three/fiber" {
  interface ThreeElements {
    organicMorphismMaterial: ThreeElement<typeof OrganicMorphismMaterial>;
  }
}

type OrganicMorphismMaterialType = THREE.ShaderMaterial & {
uTime:number
uTexture:THREE.Texture
uHover:number
uMouse:THREE.Vector2
uVelocity:number
}

export default function ShaderMesh(){

  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry,OrganicMorphismMaterialType>>(null!)

  const [hovered,setHover] = useState(false)

  const smoothMouse = useRef(new THREE.Vector2(0, 0))
  const lastMouse = useRef(new THREE.Vector2())
  const velocity = useRef(0)

  const {viewport} = useThree()

  const isMobile = viewport.width < 6

  const texture = useTexture("/shader-img/organic-morphism.avif")

  const scale = useMemo<[number,number,number]>(()=>{

      return isMobile
      ? [2.4,3.2,1]
      : [3.5,4.5,1]

  },[isMobile])

  useFrame((state) => {
    const { clock, mouse: webglMouse } = state
    
    smoothMouse.current.lerp(webglMouse, 0.1)
    
    const dist = lastMouse.current.distanceTo(smoothMouse.current)
    velocity.current = THREE.MathUtils.lerp(velocity.current, dist, 0.1)
    lastMouse.current.copy(smoothMouse.current)

    if (!meshRef.current) return
    const mat = meshRef.current.material

    mat.uTime = clock.getElapsedTime()
    mat.uHover = THREE.MathUtils.lerp(mat.uHover, hovered ? 1 : 0, 0.05)
    mat.uMouse.copy(smoothMouse.current)
    mat.uVelocity = velocity.current    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, smoothMouse.current.x * 0.2, 0.1)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -smoothMouse.current.y * 0.2, 0.1)
  })

  return(

    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={()=>setHover(true)}
      onPointerOut={()=>setHover(false)}
    >

      <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />

      <organicMorphismMaterial
        uTexture={texture}
        transparent
      />

    </mesh>

  )

}