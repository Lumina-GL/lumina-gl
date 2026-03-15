"use client";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, extend, ThreeElement, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "../spectral-echo/shaders/vertex.glsl";
import fragmentShader from "../spectral-echo/shaders/fragment.glsl";

const SpectralEchoMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  vertexShader,
  fragmentShader
);

extend({ SpectralEchoMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    spectralEchoMaterial: ThreeElement<typeof SpectralEchoMaterial>;
  }
}

type SpectralEchoMaterialType = THREE.ShaderMaterial & {  uTime: number;  uTexture: THREE.Texture;  uHover: number;  uMouse: THREE.Vector2;};

export default function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, SpectralEchoMaterialType>>(null!);
  const [hovered, setHover] = useState(false);

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const texture = useTexture("/shader-img/spectral-echo.jpeg");

  const scale = useMemo<[number, number, number]>(() => 
     isMobile ? [2.4, 3.2, 1] : [3.5, 4.5, 1]
  ,[isMobile]);

  useFrame(({ clock, mouse: webglMouse }) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material;
    mat.uTime = clock.getElapsedTime();

    if (!isMobile) {
      const targetX = (webglMouse.x + 1) / 2;
      const targetY = (webglMouse.y + 1) / 2;
      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.1);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.1);
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, webglMouse.x * 0.4, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -webglMouse.y * 0.4, 0.05);
    } else {
      mouse.current.set(0.5, 0.5);
    }

    mat.uMouse.copy(mouse.current);
    mat.uHover = THREE.MathUtils.lerp(mat.uHover, hovered ? 1 : 0, 0.06);
  });


  return (
    <mesh
      ref={meshRef}
      scale={scale}      
      onPointerOver={() => !isMobile && setHover(true)}
      onPointerOut={() => !isMobile && setHover(false)}
    >
      <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <spectralEchoMaterial uTexture={texture} transparent />
    </mesh>
  );
}