import slugify from "slugify";
import type { ComponentType } from "react";
import Rgb_Displacement from "../projects/rgb-displacement/page";

export interface Lab {
  title: string;
  slug: string;
  preview: string;
  component?: ComponentType;
}


export const projects: Lab[] = [

  {
    title: "RGB Displacement",
    slug: slugify("RGB Displacement", { lower: true }),
    preview: `/previews/rgb-displacement.png`,
    component: Rgb_Displacement,
  }

];
