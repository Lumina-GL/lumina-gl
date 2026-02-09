import slugify from "slugify";
import type { ComponentType } from "react";
import Spectral_Echo from "../All_Lab_Card/spectral-echo/scene";
import Rgb_Displacement from "../All_Lab_Card/rgb-displacement/scene";

export interface Project {
  title: string;
  slug: string;
  preview: string;
  component?: ComponentType;
}


export const projects: Project[] = [

  {
    title: "RGB Displacement",
    slug: slugify("RGB Displacement", { lower: true }),
    preview: `/previews/rgb-displacement.png`,
    component: Rgb_Displacement,
  },

  {
    title: "Spectral Echo",
    slug: slugify("Spectral Echo", { lower: true }),
    preview: `/previews/spectral-echo.png`,
    component: Spectral_Echo,
  },


];
