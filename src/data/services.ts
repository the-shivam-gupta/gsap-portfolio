export interface Service {
  index: string;
  /** Rendered as stacked lines, deliberately — not auto-wrapped. */
  title: string[];
  description: string;
  technologies: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: ["Web", "Development"],
    description:
      "Editorial websites and marketing sites built with performance, scalability and interaction in mind.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    index: "02",
    title: ["Web", "Applications"],
    description:
      "Complex product interfaces — dashboards, tools and platforms — engineered for state, speed and the people using them.",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    index: "03",
    title: ["UI / UX", "Engineering"],
    description:
      "Interfaces designed and built as one process, from Figma to production, with typography and spacing systemised.",
    technologies: ["Figma", "Design Systems", "Framer"],
  },
  {
    index: "04",
    title: ["Performance", "& Optimization"],
    description:
      "Audits, refactors and image pipelines that lift Core Web Vitals and keep motion-heavy sites smooth.",
    technologies: ["Lighthouse", "Core Web Vitals", "Bundle Size"],
  },
  {
    index: "05",
    title: ["API / Backend", "Integration"],
    description:
      "Third-party APIs, payments and headless CMS platforms wired up cleanly, with data modelled to last.",
    technologies: ["REST", "GraphQL", "Stripe", "Sanity"],
  },
  {
    index: "06",
    title: ["Interactive", "Experiences"],
    description:
      "Scroll choreography and motion systems that turn a brand's site into something worth staying on.",
    technologies: ["GSAP", "ScrollTrigger", "WebGL"],
  },
];
