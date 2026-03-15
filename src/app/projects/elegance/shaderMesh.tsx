"use client"
import { useFrame, extend, ThreeElement, useThree } from "@react-three/fiber"
import { shaderMaterial, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { useRef, useMemo } from "react"

import vertexShader from "../elegance/shaders/vertex.glsl"
import fragmentShader from "../elegance/shaders/fragments.glsl"

const EleganceMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
);

extend({ EleganceMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    eleganceMaterial: ThreeElement<typeof EleganceMaterial>;
  }
}

type EleganceMaterialType = THREE.ShaderMaterial & { uTime: number; uTexture: THREE.Texture; uMouse: THREE.Vector2; };

export default function ShaderMesh() {

  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, EleganceMaterialType>>(null!);

  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  const texture = useTexture(
    "/shader-img/elegance.jpeg"
  )

  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const lerpedMouse = useRef(new THREE.Vector2(0.5, 0.5))

  const scale = useMemo<[number, number, number]>(() =>
    isMobile ? [2.4, 3.2, 1] : [3.4, 4.2, 1]
    , [isMobile])


  useFrame((state) => {

    if (!meshRef.current)
      return;
    const mat = meshRef.current.material;

    const { clock, pointer } = state

    mat.uTime = clock.elapsedTime
    mouse.current.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5)

    lerpedMouse.current.lerp(mouse.current, 0.1)
    mat.uMouse.copy(lerpedMouse.current)
  })

  return (
    <mesh
      ref={meshRef}
      scale={scale}
    >
      <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <eleganceMaterial
        uTexture={texture}
        transparent={true}
      />
    </mesh>
  )
}