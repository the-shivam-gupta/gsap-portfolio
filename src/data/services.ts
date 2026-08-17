export interface Service {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    index: "01",
    title: "Websites",
    description:
      "Editorial websites and portfolios designed and built to feel like a product. Fast, accessible and impossible to confuse with a template.",
    deliverables: ["Marketing sites", "Portfolios", "Editorial platforms"],
  },
  {
    index: "02",
    title: "Web Applications",
    description:
      "Complex product interfaces — dashboards, tools, platforms — engineered with care for state, performance and the people using them.",
    deliverables: ["Product UI", "Dashboards", "Internal tools"],
  },
  {
    index: "03",
    title: "Creative Development",
    description:
      "The ambitious stuff: scroll choreography, immersive interactions and motion systems that make a brand unforgettable.",
    deliverables: ["Scroll experiences", "Interactive stories", "Motion systems"],
  },
  {
    index: "04",
    title: "CMS Development",
    description:
      "Headless content architecture that keeps editors empowered and developers happy — structured models, previews and zero design drift.",
    deliverables: ["Sanity / Payload", "Content models", "Editor workflows"],
  },
  {
    index: "05",
    title: "Performance Optimization",
    description:
      "Audits, refactors and image pipelines that lift Core Web Vitals and keep animation-heavy sites smooth on modest hardware.",
    deliverables: ["Core Web Vitals", "Bundle hygiene", "Image pipelines"],
  },
];