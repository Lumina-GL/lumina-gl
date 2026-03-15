'use client'
import * as THREE from "three";
import { extend, ThreeElement, useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'
import { useMemo, useRef } from 'react'
import { shaderMaterial, useTexture} from "@react-three/drei";

import vertexShader from "../liquid-art-wave/shaders/vertex.glsl"
import fragmentShader from "../liquid-art-wave/shaders/fragment.glsl"

const LiquidArtMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader
);

extend({ LiquidArtMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    liquidArtMaterial: ThreeElement<typeof LiquidArtMaterial>;
  }
}


type LiquidArtMaterialType = THREE.ShaderMaterial & { uTime: number; uTexture: THREE.Texture; uMouse: THREE.Vector2;
};


export default function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, LiquidArtMaterialType>>(null!);
  
  const {viewport} = useThree();
  const isMobile = viewport.width < 6;

  const mouse = useRef(new Vector2(0.5, 0.5))
  const target = useRef(new Vector2(0.5, 0.5))
  const texture = useTexture('/shader-img/liquid-art-wave.jpeg')

  const scale = useMemo<[number, number, number]>(() => 
       isMobile ? [2.6, 3.6, 1] : [3.5, 4.5, 1], 
      [isMobile]);

  useFrame((state) => {
    if(!meshRef.current) 
      return
    const mat = meshRef.current.material;
    mouse.current.lerp(target.current, 0.05)
    mat.uTime = state.clock.elapsedTime
    mat.uMouse.copy(mouse.current)

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (mouse.current.x - 0.5) * 0.3, 0.1)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -(mouse.current.y - 0.5) * 0.3, 0.1)
  })

  return (
    <mesh 
      ref={meshRef}
      scale={scale}
      onPointerMove={(e) => {
        if (e.uv) target.current.set(e.uv.x, e.uv.y)
      }}
    >
      <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64 ]} />
      <liquidArtMaterial
        uTexture={texture}
        transparent={true}
      />
    </mesh>
  )
}