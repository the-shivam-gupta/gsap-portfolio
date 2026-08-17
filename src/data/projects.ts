export interface Project {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  href: string;
  aspect: string;
}

export const projects: Project[] = [
  {
    index: "01",
    title: "ARIA",
    category: "Audio Visual Platform",
    year: "2026",
    description:
      "A realtime audio-visual platform that turns live sound into generative visuals. Streaming, spatial gestures and 60fps composition — all in the browser.",
    tech: ["Next.js", "Web Audio", "GSAP", "Supabase"],
    image: "/images/projects/aria.svg",
    imageAlt: "ARIA — realtime audio visual platform interface",
    href: "#",
    aspect: "16 / 10",
  },
  {
    index: "02",
    title: "KESTREL",
    category: "Headless Commerce",
    year: "2025",
    description:
      "A headless storefront rebuilt around editorial storytelling. Category pages read like magazine spreads while checkout stays invisible fast.",
    tech: ["Next.js", "Shopify", "React", "TypeScript"],
    image: "/images/projects/kestrel.svg",
    imageAlt: "KESTREL — headless commerce storefront",
    href: "#",
    aspect: "4 / 5",
  },
  {
    index: "03",
    title: "MONOCHROME",
    category: "Editorial Site",
    year: "2025",
    description:
      "A fashion journal designed on a strict black-and-white grid. Bold typography and confident whitespace carry every story.",
    tech: ["Astro", "GSAP", "Sanity", "SCSS"],
    image: "/images/projects/monochrome.svg",
    imageAlt: "MONOCHROME — editorial fashion journal",
    href: "#",
    aspect: "16 / 10",
  },
  {
    index: "04",
    title: "NORTHSTAR",
    category: "Design System",
    year: "2024",
    description:
      "A living design system and documentation platform for a product team of forty. Tokens, components and motion — versioned and documented.",
    tech: ["React", "TypeScript", "Storybook", "Figma"],
    image: "/images/projects/northstar.svg",
    imageAlt: "NORTHSTAR — design system documentation platform",
    href: "#",
    aspect: "3 / 4",
  },
];