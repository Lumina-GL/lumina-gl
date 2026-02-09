import { notFound } from "next/navigation";
import { projects } from "@/app/lib/projectData";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import ClientProject from "@/app/projects/ClientProject";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // 🧩 If project not found
  if (!project) {
    return {
      title: "Project Not Found | SujitKoji",
      description:
        "The requested project could not be found. Explore premium 3D web experiences using React Three Fiber, WebGL, and GLSL shader projects on SujitKoji.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // 🧠 Dynamic SEO values
  const siteUrl = `https://sujitkoji.vercel.app/projects/${project.slug}`;
  const siteImage = project.preview || "https://sujitkoji.vercel.app/og/default-og.jpg";
  const siteTitle = `${project.title} | SujitKoji`;

  // 🚀 SEO-optimized metadata (fixed kebab-case keys)
  return {
    title: siteTitle,
    alternates: {
      canonical: siteUrl,
    },
    metadataBase: new URL("https://sujitkoji.vercel.app"),
    openGraph: {
      title: siteTitle,
      url: siteUrl,
      siteName: "sujitkoji",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: `${project.title} | sujitkoji`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      images: [siteImage],
      creator: "@sujitkoji",
    },
    keywords: [
      "Three.js",
      "GLSL shader",
      "WebGL",
      "React Three Fiber",
      "3D shaders",
      "procedural graphics",
      "KojiLab",
      "ShaderToy style",
      "visual effects",
      "real-time rendering",
      "3D portfolio",
      "creative coding",
      "JavaScript shaders",
      "custom GLSL",
    ],
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    authors: [{ name: "sujitkoji", url: "https://sujitkoji.vercel.app" }],
    category: "3D Web Development",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const Component = project.component as ComponentType;
  return <ClientProject project={project} Component={Component} />;
}
