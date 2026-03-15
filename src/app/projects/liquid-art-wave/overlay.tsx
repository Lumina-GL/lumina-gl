"use client";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react"; 

const containerVars: Variants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
};

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
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
      variants={containerVars} initial="initial" animate="animate"
      className="absolute inset-0 z-10 pointer-events-none text-white p-6 md:p-14 flex flex-col justify-between"
    >
      <motion.nav variants={fadeUp} className="flex justify-between items-start font-mono text-[10px] tracking-[0.3em]">
        <div className="font-bold">AETHER.STUDIO</div>
        <div className="opacity-50 md:block hidden">PROJECTS / 2026 - VOL. 1</div>
      </motion.nav>

      <div className="relative">
        <motion.h1 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="font-serif italic leading-[0.8] text-[clamp(4rem,11vw,10rem)]"
        >
          LIQUID<br /><span className="ml-[10vw]">ART</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 md:mt-10 ml-2 text-[9px] md:text-[11px] font-mono tracking-[0.2em] opacity-40 max-w-[200px] uppercase">
          A technical study on fluid dynamics and refractive shaders.
        </motion.p>
      </div>

      <motion.footer variants={fadeUp} className="flex justify-between items-end border-t border-white/10 pt-6">
        <div className="text-[8px] md:text-[9px] font-mono opacity-30 space-y-1 tracking-widest uppercase">
          <p>Local Time: {time || "Loading..."}</p>
          <p>Status: Interactive / WebGL</p>
        </div>
        <div className="flex gap-6 text-[10px] font-bold tracking-tighter italic">
          <span>001 - 26</span>
          <span className="opacity-20">/</span>
          <span>AWARDS NOMINEE</span>
        </div>
      </motion.footer>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </motion.div>
  );
}