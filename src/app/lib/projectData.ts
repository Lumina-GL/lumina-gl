import slugify from "slugify";
import type { ComponentType } from "react";
import Liquid_Art_Wave from "../projects/liquid-art-wave/page";
import Rgb_Displacement from "../projects/rgb-displacement/page";
import Spectral_Echo from "../projects/spectral-echo/page";
import Organic_Morphism from "../projects/organic-morphism/page";
import Elegance from "../projects/elegance/page";
import Image_Alchemy from "../projects/image-alchemy/page";


export interface Lab {
  slug: string;
  title: string;
  description: string;
  preview: string;
  tags: string[];
  component?: ComponentType;
}

export const projects: Lab[] = [
  {
    slug: slugify("Liquid Art Wave", { lower: true }),
    title: "Liquid Art Wave",
    description: "Interactive fluid dynamics where mouse proximity triggers procedural vertex waves on texture coordinates.",
    preview: `/previews/liquid-art-wave.png`,
    tags: ["Vertex Shader", "Fluid Simulation", "Interactive Texture", "Wave Distortion", "GLSL"],
    component: Liquid_Art_Wave,
  },
  {
    slug: slugify("RGB Displacement", { lower: true }),
    title: "RGB Displacement",
    description: "High-velocity RGB ghosting effect. Shifting color channels based on mouse movement speed and texture displacement.",
    preview: `/previews/rgb-displacement.png`,
    tags: ["Chromatic Aberration", "RGB Ghosting", "Fragment Shader", "Displacement Map", "Mouse Interaction"],
    component: Rgb_Displacement,
  },
  {
    slug: slugify("Spectral Echo", { lower: true }),
    title: "Spectral Echo",
    description: "A rhythmic chromatic wave distortion that creates a ghostly, interactive trail across the image surface.",
    preview: `/previews/spectral-echo.png`,
    tags: ["Spectral Rendering", "Interactive Trail", "Time-based Wave", "Custom Shaders", "Visual Persistence"],
    component: Spectral_Echo,
  },
   {
    slug: slugify("Organic Morphism", { lower: true }),
    title: "Organic Morphism",
    description: "A touch or mouse move creates ripples, noise, or distortion, making the screen feel like a physical surface.",
    preview: '/shader-img/organic-morphism.avif',
    tags: ["Image Refraction", "Glassmorphism", "Texture Mapping", "Liquid Art", "Interactive Shader"],
    component: Organic_Morphism,
  },
  {
    slug: slugify("Elegance", { lower: true }),
    title: "Elegance",
    description: "Organic GLSL wave simulation. Focused on buttery-smooth, minimalist vertex displacements for a high-end feel.",
    preview: `/previews/elegance.png`,
    tags: ["Organic Wave", "Minimalist Shader", "Vertex Displacement", "Premium Aesthetic", "Smooth Motion"],
    component: Elegance,
  },
  {
    slug: slugify("Image Alchemy", { lower: true }),
    title: "Image Alchemy",
    description: "Converting static pixels into liquid poetry. Advanced refraction shaders reacting to mouse hover with glass-like distortion.",
    preview: `/previews/image-alchemy.png`,
    tags: ["Image Refraction", "Glassmorphism", "Texture Mapping", "Liquid Art", "Interactive Shader"],
    component: Image_Alchemy,
  },
 
];