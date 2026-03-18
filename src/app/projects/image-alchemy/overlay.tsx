"use client"
import { motion } from "framer-motion"

export default function Overlay() {
  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <nav className="fixed top-[50px] w-full px-[60px] flex justify-between text-[10px] tracking-[4px] z-40">
        <div>OBLIQUE / STUDIO</div>
        <div className="flex gap-6">
          <span>INDEX</span>
          <span>2026</span>
        </div>
      </nav>

      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
        <h1 className="text-[clamp(5rem,12vw,10rem)] leading-[0.85] tracking-[-5px] text-center">
          MIND <br />
          <span className="italic font-serif font-normal tracking-normal">
            SCAPE
          </span>
        </h1>
      </div>

      <div className="fixed bottom-[50px] w-full px-[60px] flex justify-between items-end z-40 text-xs">
        
        <div className="flex flex-col gap-2">
          <span className="text-[8px] opacity-40">VISUAL TYPE</span>
          <span className="text-[10px]">
            REFRACTION SHADER / 0.88
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 group cursor-pointer">
          <span className="text-[9px] tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180 opacity-50 group-hover:opacity-100 transition-opacity">
            Interact
          </span>

          <div className="relative h-16 w-[1px] bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </div>

      </div>
    </>
  )
}
