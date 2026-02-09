"use client";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./shaderMesh";
import { Html, useProgress } from "@react-three/drei";

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
                                }}>
                <Suspense fallback={<Loader />}>
                    <Scene />

                    <Html fullscreen>
                        <main className="relative h-screen w-full flex items-center justify-center overflow-hidden">

                            {/* Background Typography */}
                            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] sm:text-[18vw] md:text-[14vw] font-extrabold tracking-tighter text-white/5 italic whitespace-nowrap leading-none">
                                    BLOOM
                                </div>
                            </div>

                            {/* Top Navigation */}
                            <nav
                                className="absolute top-6 sm:top-8 w-full px-6 sm:px-12 flex justify-between z-20 text-white font-mono text-[9px] sm:text-[10px] tracking-widest uppercase opacity-70"
                            >
                                <div>Floral Study / 2026</div>
                                <div className="hidden sm:block">Move to interact</div>
                            </nav>

                            {/* Bottom Text */}
                            <div
                                className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20 text-white leading-none max-w-[90%]"
                            >
                                <h2
                                    className=" text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight"
                                >
                                    PETAL FLOW
                                </h2>

                                <p
                                    className=" mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest opacity-50"
                                >
                                    Interactive Floral Image Distortion
                                </p>
                            </div>

                        </main>

                    </Html>
                </Suspense>
            </Canvas>
        </>
    );
}


