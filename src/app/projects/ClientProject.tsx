 "use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import type { Project } from "@/app/lib/projectData";
import type { ComponentType } from "react";

interface ClientProjectProps {
  project: Project;           
  Component: ComponentType;    
}

export default function ClientProject({ Component }: ClientProjectProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const lenis = new Lenis({ duration: 0.8, smooth: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

     const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen flex items-center justify-center bg-[#040406] overflow-hidden"
    >
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : Component ? (
        <Component />
      ) : (
        <div className="text-gray-400">🚫 Shader not available</div>
      )}

    </motion.main>
  );
}
