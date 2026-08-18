export type CapabilityIcon =
  | "code"
  | "sparkles"
  | "cursor"
  | "zap"
  | "database"
  | "gauge";

export interface Capability {
  index: string;
  title: string;
  detail: string;
  keywords: string[];
  icon: CapabilityIcon;
  handle: string;
}

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Frontend Development",
    detail:
      "Production-grade, accessible interfaces built with React and TypeScript. Semantics, performance and maintainability are non-negotiables.",
    keywords: ["React", "TypeScript", "Next.js"],
    icon: "code",
    handle: "@frontenddev",
  },
  {
    index: "02",
    title: "Creative Development",
    detail:
      "Award-calibre interactive work. Editorial layouts, art direction and expressive engineering delivered with a studio's attention to detail.",
    keywords: ["GSAP", "ScrollTrigger", "Three.js"],
    icon: "sparkles",
    handle: "@creativedev",
  },
  {
    index: "03",
    title: "Interactive UI",
    detail:
      "Interfaces that feel alive without being fussy. Scroll choreography, micro-interactions and cursor systems that reward attention.",
    keywords: ["Motion", "Micro-interactions"],
    icon: "cursor",
    handle: "@interactiveui",
  },
  {
    index: "04",
    title: "Animation",
    detail:
      "Timing, easing and staging treated as a design system in their own right. Every transition has a reason to exist.",
    keywords: ["GSAP", "Lenis", "WebGL"],
    icon: "zap",
    handle: "@motiondev",
  },
  {
    index: "05",
    title: "CMS Integration",
    detail:
      "Headless content that lets non-developers edit the site without breaking the design. Structured content, previews, instant deploys.",
    keywords: ["Sanity", "Contentful", "Payload"],
    icon: "database",
    handle: "@headlesscms",
  },
  {
    index: "06",
    title: "Performance",
    detail:
      "Core Web Vitals engineered, not hoped for. Image pipelines, code splitting and animation budgets that keep 90+ Lighthouse scores honest.",
    keywords: ["Lighthouse", "Core Web Vitals"],
    icon: "gauge",
    handle: "@perfdev",
  },
];