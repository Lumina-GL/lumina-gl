"use client"
import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <main className="w-full bg-[#040406] text-[#ffffff] flex flex-col justify-between px-6 p-4 md:px-8 md:py-7 lg:px-12 lg:py-8 overflow-hidden select-none cursor-none relative mt-auto">

    <footer className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/15 pt-8 z-10">
    
        <div className="w-full md:max-w-[400px] space-y-6">

          <p className="text-[10px] font-mono leading-relaxed opacity-70 uppercase tracking-[0.15em]">
            A technical exhibition exploring the intersection of <span className="text-white opacity-100">GLSL Shaders</span> and fluid motion design. Built for high-performance optical simulation.
          </p>

          <div className="flex justify-between md:justify-start md:gap-8 text-[9px] font-mono opacity-70 border-t border-white/5 md:border-none pt-4 md:pt-0">

             <div className="flex gap-4">
                <a href="https://github.com/sujitkoji" className="hover:text-white transition-colors"><Github size={14}/></a>
                <a href="https://linkedin.com/in/sujitkoji" className="hover:text-white transition-colors"><Linkedin size={14}/></a>
                <a href="https://x.com/sujitkoji" className="hover:text-white transition-colors"><Twitter size={14}/></a>
             </div>
             
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 ml-auto">
           <div className="flex items-center gap-3">

              <p className="text-[10px] font-mono opacity-70 tracking-[0.3em]">
                SCROLL
              </p>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="h-8 w-[1px] bg-gradient-to-b from-white to-transparent" 
              />
           </div>

           <p className="text-[8px] font-mono opacity-70 uppercase">
            © 2026 Lumina-GL. ALL RIGHTS RESERVED.
            </p>

        </div>
      </footer>
      </main>
  )
}

 
