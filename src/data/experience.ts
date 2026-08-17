export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Senior Creative Developer",
    company: "Studio Fjord",
    location: "Berlin",
    description:
      "Leading interactive builds for global brands. Owning the creative engineering layer — from first motion tests to production polish.",
    tech: ["Next.js", "GSAP", "Three.js", "TypeScript"],
    achievements: [
      "Shipped a WebGL-driven campaign page that hit 95+ Lighthouse performance with full 3D scene.",
      "Built the studio's motion design system, now reused across every client project.",
    ],
  },
  {
    period: "2022 — 2024",
    role: "Frontend Developer",
    company: "Northbeam",
    location: "Remote",
    description:
      "Product engineering on a design-systems team. Built the component library powering a suite of B2B dashboards.",
    tech: ["React", "TypeScript", "Storybook", "Vite"],
    achievements: [
      "Cut dashboard bundle size by 40% through code-splitting and dependency audits.",
      "Introduced token-driven theming used by four product teams.",
    ],
  },
  {
    period: "2020 — 2022",
    role: "Web Developer",
    company: "Independent",
    location: "Berlin",
    description:
      "Freelance builds for agencies and startups. Full-stack breadth with a growing obsession for animation and type.",
    tech: ["Next.js", "Sanity", "GSAP", "Node.js"],
    achievements: [
      "Delivered 30+ client sites end to end, from discovery to deployment.",
      "Won a small FWA-style industry mention for an interactive editorial piece.",
    ],
  },
];