import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {},  

  webpack(config: Configuration) {
    config.module!.rules!.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });
    return config;
  },

  typedRoutes: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "kojilab.vercel.app", pathname: "/**" },
    ],
  },
};

export default nextConfig;
