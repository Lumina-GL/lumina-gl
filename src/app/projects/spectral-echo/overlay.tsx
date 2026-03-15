"use client";
import { motion } from "framer-motion";

export default function Overlay() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none text-white font-sans">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none">
        <h1 className="text-[16vw] font-black italic">
        SPECTRAL
        </h1>
      </div>

      <header className="absolute top-0 w-full p-8 flex justify-between text-[10px] tracking-[0.3em] uppercase">
        <p>
        Lab Experiment / 001
        </p>
        <p className="hidden md:block">
        Interactive Shader Study
        </p>
        <p>
        © 2026
        </p>
      </header>

      <div className="absolute bottom-12 left-8 md:left-16 pointer-events-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] italic tracking-tighter">
            Petal<br />Flow
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-white opacity-30"></span>
            <p className="text-[10px] uppercase tracking-widest opacity-70 max-w-xs">
              Fluid-dynamic distortion exploring botanical fragility.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block text-right opacity-90">
        <p className="text-[9px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
          Scroll to Explore - Flow 0.1
        </p>
      </div>
    </div>
  );
}