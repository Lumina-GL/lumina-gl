"use client";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./shaderMesh";

export default function ScenePage() {
    return (
        <>

            <Canvas
                camera={{ position: [0, 4, 2], far: 60 }}
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
                }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </>
    );
}


