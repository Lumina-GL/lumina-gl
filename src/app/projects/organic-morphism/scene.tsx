"use client";
import * as THREE from "three";
import { Suspense } from "react";
import ShaderMesh from "../organic-morphism/shaderMesh";
import { Canvas } from "@react-three/fiber";


export default function Scene() {
    return (
        <>
            <Canvas
                camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5.5] }}
                style={{ width: "100vw", height: "100vh" }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: false,
                    stencil: false,
                    depth: true,
                }}
                onCreated={({ gl }) => {
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                }}
            >
                <Suspense fallback={null}>
                    <ShaderMesh />
                </Suspense>
            </Canvas>
        </>
    );
}
