"use client";
import * as THREE from "three";
import React, { useRef, useState, useMemo } from "react";
import { useFrame, extend, ThreeElement, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";

import vertexShader from "../rgb-displacement/shaders/vertex.glsl";
import fragmentShader from "../rgb-displacement/shaders/fragment.glsl";


const RGBDisplacementMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uMouse: new THREE.Vector2(),
    uVelocity: 0,
  },
  vertexShader,
  fragmentShader
);

extend({ RGBDisplacementMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    rgbdisplacementMaterial: ThreeElement<typeof RGBDisplacementMaterial>;
  }
}

type RGBDisplacementMaterialType = THREE.ShaderMaterial & {
  uTime: number; uTexture: THREE.Texture; uHover: number; uMouse: THREE.Vector2; uVelocity: number;
};

export default function Scene() {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, RGBDisplacementMaterialType>>(null!);

  const [hovered, setHover] = useState(false);

  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const mouse = useRef(new THREE.Vector2());
  const lastMouse = useRef(new THREE.Vector2());
  const velocity = useRef(0);

  const texture = useTexture(
    "/shader-img/rgb-displacement.jpeg"
  );


  const scale = useMemo<[number, number, number]>(() =>
    isMobile ? [2.4, 3.2, 1] : [3.5, 4.5, 1],
    [isMobile]);


  useFrame(({ clock, mouse: webglMouse }) => {
    mouse.current.lerp(webglMouse, 0.1);

    const dist = lastMouse.current.distanceTo(mouse.current);
    velocity.current = THREE.MathUtils.lerp(
      velocity.current,
      Math.min(dist * 40, 1.5), 0.1);
    lastMouse.current.copy(mouse.current);

    if (!meshRef.current)
      return;
    const mat = meshRef.current.material;
    mat.uTime = clock.getElapsedTime();
    mat.uHover = THREE.MathUtils.lerp(mat.uHover, hovered ? 1 : 0, 0.08);
    mat.uMouse = mouse.current;
    mat.uVelocity = velocity.current;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.current.x * (isMobile ? 0.15 : 0.3),
      0.1
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouse.current.y * (isMobile ? 0.15 : 0.3), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <rgbdisplacementMaterial uTexture={texture} transparent />
    </mesh>
  );
}
