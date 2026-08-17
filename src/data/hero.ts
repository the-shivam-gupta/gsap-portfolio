export interface HeroLine {
  text: string;
  accent?: boolean;
  outline?: boolean;
  offset?: "none" | "left" | "right";
}

export interface HeroData {
  kicker: string;
  lines: HeroLine[];
  meta: string;
  location: string;
  availability: string;
  supporting: string;
  scrollHint: string;
  visualLabel: string;
}

export const hero: HeroData = {
  kicker: "Portfolio — © 2026",
  lines: [
    { text: "I BUILD" },
    { text: "DIGITAL", accent: true, offset: "right" },
    { text: "EXPERIENCES", offset: "left" },
    { text: "WITH INTENT.", offset: "right" },
  ],
  meta: "Creative Developer",
  location: "Berlin — Germany",
  availability: "Open for select freelance & collaboration",
  supporting:
    "I design and build fast, immersive websites and interactive interfaces. Typography, motion and code — engineered to feel inevitable.",
  scrollHint: "Scroll to explore",
  visualLabel: "EST. 2019",
};
