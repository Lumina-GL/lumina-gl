import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Analytics } from "@vercel/analytics/react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lumina-gl.sujitkoji.com'), 
  title: {
    default: "Lumina-GL - Digital Shader",
    template: "%s | Lumina-GL"
  },
  description: "A high-end technical exhibition of GLSL shaders, fluid simulations, and interactive motion design. Crafted for the modern web.",
  keywords: ["WebGL", "GLSL", "Three.js", "React Three Fiber", "Creative Coding", "Shader Art", "Frontend Developer"],
  authors: [{ name: "Sujit Koji", url: "https://github.com/sujitkoji" }],
  creator: "Sujit Koji",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumina-gl.sujitkoji.com",
    title: "Lumina-GL - Digital Shader Atelier",
    description: "Immersive WebGL experiences and fluid motion simulations.",
    siteName: "Lumina-GL",
    images: [
      {
        url: "https://lumina-gl.sujitkoji.com/lumina-gl.png", 
        width: 1200,
        height: 630,
        alt: "Lumina-GL Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lumina-GL - Digital Shader Atelier",
    description: "Interactive WebGL Gallery & Shader Experiments.",
    creator: "@sujitkoji",
    images: ["https://lumina-gl.sujitkoji.com/lumina-gl.png"], 
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#040406] text-white selection:bg-white selection:text-black">
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}