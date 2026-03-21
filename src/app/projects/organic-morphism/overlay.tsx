"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const containerVars: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
  }
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Overlay() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="fixed inset-0 z-50 pointer-events-none text-white select-none overflow-hidden"
    >

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.09 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[25vw] md:text-[18vw] font-black italic uppercase leading-none tracking-tighter"
        >
          Morph
        </motion.h1>
      </div>

      <motion.div
        variants={fadeUp}
        className="absolute top-6 md:top-10 left-5 md:left-10"
      >
        <p className="text-[9px] md:text-[11px] font-black tracking-[0.3em] uppercase">
          Lumina GL / LAB
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="absolute top-6 md:top-10 right-5 md:right-10 text-right"
      >
        <p className="font-mono text-[8px] md:text-[10px] tracking-widest opacity-90">
          {time || "00:00:00"}
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="absolute bottom-8 md:bottom-10 left-5 md:left-10 mix-blend-difference max-w-[70%]"
      >
        <p className="text-[9px] md:text-xs font-light tracking-[0.25em] uppercase opacity-50">
          Procedural Image Distortion
        </p>

        <h2 className="mt-1 text-xl sm:text-3xl lg:text-4xl font-extrabold italic tracking-tight uppercase leading-tight">
          Organic Morphism
        </h2>

        <p className="mt-2 text-[10px] md:text-xs opacity-40 max-w-sm">
          An interactive shader experiment where texture surfaces bend,
          melt and refract around cursor energy.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="absolute bottom-8 md:bottom-10 right-5 md:right-10 flex flex-col items-end gap-1 md:gap-2"
      >
        <p className="hidden md:block font-mono text-[8px] md:text-[10px] tracking-widest uppercase opacity-80">
          Move Cursor / Touch Surface
        </p>

        <div className="hidden md:flex gap-3 text-[9px] md:text-[10px] font-bold italic opacity-90">
          <span>VOL. 26</span>
          <span className="opacity-20">|</span>
          <span>Lumina GL-LAB</span>
        </div>
      </motion.div>

      <div className="hidden xs:block">
        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20" />
        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20" />
        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20" />
      </div>

    </motion.div>
  );
}