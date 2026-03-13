import slugify from "slugify";
import type { ComponentType } from "react";
import Liquid_Art_Wave from "../projects/liquid-art-wave/page";
import Rgb_Displacement from "../projects/rgb-displacement/page";
import Spectral_Echo from "../projects/spectral-echo/page";



export interface Lab {
  title: string;
  slug: string;
  preview: string;
  component?: ComponentType;
}


export const projects: Lab[] = [

  {
    title: "Liquid Art Wave",
    slug: slugify("Liquid Art Wave", { lower: true }),
    preview: `/previews/liquid-art-wave.png`,
    component: Liquid_Art_Wave,
  },
 
  {
    title: "RGB Displacement",
    slug: slugify("RGB Displacement", { lower: true }),
    preview: `/previews/rgb-displacement.png`,
    component: Rgb_Displacement,
  },

  {
    title: "Spectral Echo",
    slug: slugify("Spectral Echo", { lower: true }),
    preview: `/shader-img/spectral-echo.jpeg`,
    component: Spectral_Echo,
  },

];
