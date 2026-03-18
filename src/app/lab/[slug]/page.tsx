import { notFound } from "next/navigation";
import { projects } from "@/app/lib/projectData";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import ClientLab from "@/app/lab/ClientProject";

interface LabPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LabPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = projects.find((p) => p.slug === slug);

  if (!lab) {
    return {
      title: "Experiment Not Found | Lumina-GL",
      description: "Explore the bleeding edge of WebGL and GLSL shaders at SujitKoji's technical laboratory.",
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = `https://lumina-gl.sujitkoji.com/lab/${lab.slug}`;
  const siteImage = lab.preview || "/og-image.png"; 
  const displayTitle = `${lab.title} - High-End WebGL Experiment`;
  const displayDesc = `${lab.description || `A premium ${lab.title} visual experiment built with R3F and Custom GLSL Shaders.`} Part of Lumina-GL by @sujitkoji.`;

  return {
    title: displayTitle,
    description: displayDesc,
    metadataBase: new URL("https://lumina-gl.sujitkoji.com"),
    alternates: {
      canonical: siteUrl,
    },
    keywords: [
      ...(lab.tags || []), 
      "Lumina-GL", "WebGL Shader Lab", "Creative Coding India", 
      "Next.js 15", "React Three Fiber", "Awwwards Style Web", "GSAP Motion"
    ],
    openGraph: {
      title: displayTitle,
      description: displayDesc,
      url: siteUrl,
      siteName: "Lumina-GL | SujitKoji",
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: ["Sujit Kumar"],
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: `Cinematic preview of ${lab.title} experiment`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDesc,
      images: [siteImage],
      creator: "@sujitkoji",
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "format-detection": "telephone=no",
    },
  };
}

export default async function LabPage({ params }: LabPageProps) {
  const { slug } = await params;
  const lab = projects.find((p) => p.slug === slug);

  if (!lab) return notFound();

  const Component = lab.component as ComponentType;
  return <ClientLab lab={lab} Component={Component} />;
}