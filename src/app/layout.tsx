import type { Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


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


export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo/web-app-manifest-192x192-sm.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>

      <body className="antialiased">
       {children}
      </body>
    </html>
  );
}
