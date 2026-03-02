"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import {projects} from "@/app/constants/projects";


export default function Homepage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    if (!isMobile) window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY, isMobile]);

  return (
    <main className="w-full bg-[#040406] text-[#ffffff] flex flex-col justify-between px-6 pt-16 pb-0 md:px-24 md:pt-28 md:pb-0  overflow-hidden select-none cursor-none relative">
      
      {!isMobile && (
        <>
          <motion.div 
            className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
            style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: hoveredIndex !== null ? 6 : 1 }}
          >
            {hoveredIndex !== null && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[2px] font-black text-black uppercase tracking-tighter">
                View
              </motion.span>
            )}
          </motion.div>
        </>
      )}
      

      <nav className="flex flex-col w-full my-auto py-10 md:py-0">
        {projects.map((project, index) => (
          <div key={project.id} className="group relative py-6 md:py-10 border-b border-white/5 last:border-0">
            <Link 
              href={project.path}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4 md:gap-8">
                <span className="font-mono text-[10px] md:text-xs opacity-60 mt-2 md:mt-4 group-hover:opacity-100 transition-opacity">
                  [{project.id}]
                </span>

                <div className="relative overflow-visible">
                  <motion.h2 
                    className={`text-[8vw] md:text-[6vw] font-black uppercase leading-[0.85] tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-20 blur-[2px]' : 'opacity-80'}
                    `}
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>              
            </Link>
          </div>
        ))}
      </nav>      

    </main>
  );
}