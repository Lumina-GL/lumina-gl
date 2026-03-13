"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, extend, ThreeElement, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "../spectral-echo/shaders/vertex.glsl";
import fragmentShader from "../spectral-echo/shaders/fragment.glsl";

type FluidMaterialType = THREE.ShaderMaterial & {
  uTime: number;
  uTexture: THREE.Texture;
  uHover: number;
  uMouse: THREE.Vector2;
  uRes: THREE.Vector2;
};

const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uRes: new THREE.Vector2(1, 1),
  },
  vertexShader,
  fragmentShader
);

extend({ FluidMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    fluidMaterial: ThreeElement<typeof FluidMaterial>;
  }
}

export default function Scene() {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, FluidMaterialType>>(null!);
  const [hovered, setHover] = useState(false);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const { camera, viewport } = useThree();
  const isMobile = viewport.width < 6;

  useEffect(() => {
    camera.position.set(0, 0, isMobile ? 8 : 6.5);
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile]);

  const texture = useTexture(
    "/shader-img/spectral-echo.jpeg"
  );

  useEffect(() => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const segments = useMemo(
    () => (isMobile ? 30 : 90),
    [isMobile]
  );

  useFrame(({ clock, mouse: webglMouse }) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material;
    mat.uTime = clock.getElapsedTime();

    if (!isMobile) {
      const targetX = (webglMouse.x + 1) / 2;
      const targetY = (webglMouse.y + 1) / 2;

      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.1);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.1);
    } else {
      mouse.current.set(0.5, 0.5);
    }

    mat.uMouse.copy(mouse.current);
    mat.uHover = THREE.MathUtils.lerp(mat.uHover, hovered ? 1 : 0, 0.06);

    if (!isMobile) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        webglMouse.x * 0.4,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -webglMouse.y * 0.4,
        0.05
      );
    }
  });

  const scale = isMobile 
    ? [viewport.width * 0.8, viewport.width * 1.1, 3] 
    : [viewport.width * 0.4, viewport.width * 0.55, 3];

  return (
    <mesh
      ref={meshRef}
      scale={scale as [number, number, number]}      
     onPointerOver={() => !isMobile && setHover(true)}
      onPointerOut={() => !isMobile && setHover(false)}
      onPointerDown={() => isMobile && setHover(true)}
      onPointerUp={() => isMobile && setHover(false)}
    >
      <planeGeometry args={[1, 1, segments, segments]} />
      <fluidMaterial uTexture={texture} transparent />
    </mesh>
  );
}
