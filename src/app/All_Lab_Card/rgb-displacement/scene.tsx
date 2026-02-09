"use client";
import * as THREE from "three";
import { Suspense } from "react";
import Scene from "./shaderMesh";
import { Html, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-white font-mono text-[25px] uppercase tracking-[0.8em]">
                {Math.round(progress)}%
            </div>
        </Html>
    );
}

export default function Page() {
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
                    }}
            >
                <Suspense fallback={<Loader />}>
                    <Scene />

                    <Html fullscreen>
                        <div className="relative h-screen w-full overflow-hidden pointer-events-none">

                            {/* 🌸 Background Typography */}
                            <div className="absolute inset-0 flex items-center justify-center select-none">
                                <h1
                                    className=" text-[20vw] sm:text-[18vw] lg:text-[18vw] font-black italic uppercase leading-none tracking-tighter text-white opacity-[0.07]"
                                >
                                   Floral
                                </h1>
                            </div>

                            {/* 🌿 Top Micro Copy */}
                            <div
                                className=" absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 text-white font-mono text-[9px] sm:text-[10px] tracking-[0.35em] uppercase opacity-50"
                            >
                                Interactive WebGL Experiment
                            </div>

                            {/* 🌺 Bottom Content */}
                            <div
                                className=" absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-20 text-white mix-blend-difference"
                            >
                                <p
                                    className=" text-[10px] sm:text-xs font-light tracking-[0.25em] uppercase opacity-50 "
                                >
                                    Procedural RGB Shader
                                </p>

                                <h2
                                    className=" mt-1 text-xl sm:text-2xl lg:text-3xl font-extrabold italic tracking-tight"
                                >
                                    Floral Distortion
                                </h2>
                            </div>

                            {/* 🌐 Bottom Right Meta */}
                            <div
                                className=" absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-20 text-white font-mono text-[9px] sm:text-[10px] tracking-widest uppercase opacity-40"
                            >
                                Hover / Touch
                            </div>

                        </div>
                    </Html>

                </Suspense>
            </Canvas>
        </>
    );
}
