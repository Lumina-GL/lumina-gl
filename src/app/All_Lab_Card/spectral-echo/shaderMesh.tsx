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

  /* ---------------- Camera ---------------- */
  useEffect(() => {
    camera.position.set(0, 0, isMobile ? 11 : 7.5);
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile]);

  /* ---------------- Texture ---------------- */
  const texture = useTexture(
    "https://plus.unsplash.com/premium_photo-1677178660876-8578f4f6cbac?w=600&auto=format&fit=crop&q=60"
  );

  useEffect(() => {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const segments = useMemo(
    () => (isMobile ? 40 : 80),
    [isMobile]
  );

  /* ---------------- Animation Loop ---------------- */
  useFrame(({ clock, mouse: webglMouse }) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material;
    mat.uTime = clock.getElapsedTime();

    /* Mouse → UV (desktop only) */
    if (!isMobile) {
      const targetX = (webglMouse.x + 1) / 2;
      const targetY = (webglMouse.y + 1) / 2;

      mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.1);
      mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.1);
    } else {
      // Mobile fallback (center focus)
      mouse.current.set(0.5, 0.5);
    }

    mat.uMouse.copy(mouse.current);
    mat.uHover = THREE.MathUtils.lerp(mat.uHover, hovered ? 1 : 0, 0.06);

    /* Rotation (desktop only) */
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

  return (
    <mesh
      ref={meshRef}
      scale={isMobile ? [4.2, 6, 1] : [5, 7, 1]}
      onPointerOver={() => !isMobile && setHover(true)}
      onPointerOut={() => !isMobile && setHover(false)}
      onPointerDown={() => isMobile && setHover(true)}
      onPointerUp={() => isMobile && setHover(false)}
    >
      <planeGeometry args={[1.5, 1.5, segments, segments]} />
      <fluidMaterial uTexture={texture} transparent />
    </mesh>
  );
}
