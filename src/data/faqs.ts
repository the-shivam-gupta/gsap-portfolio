export interface FaqItem {
  index: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    index: "01",
    question: "What do you specialize in?",
    answer:
      "Creative frontend development — award-calibre websites and applications where typography, motion and engineering meet. Think editorial layouts, scroll choreography and design systems.",
  },
  {
    index: "02",
    question: "What technologies do you use?",
    answer:
      "React and Next.js as a foundation, GSAP and ScrollTrigger for motion, and whatever fits the problem — Sanity or Payload for content, Three.js when it genuinely earns its place.",
  },
  {
    index: "03",
    question: "How does your process work?",
    answer:
      "Discovery, design collaboration, build, and launch. I work in tight feedback loops so you see living, moving work early — not a static mockup. Every milestone is demoable.",
  },
  {
    index: "04",
    question: "Do you work with teams?",
    answer:
      "Yes. I regularly embed with design and product teams, own the creative engineering layer, and hand off work that existing developers can confidently maintain.",
  },
  {
    index: "05",
    question: "Can you work on existing projects?",
    answer:
      "Absolutely. I've rescued, upgraded and extended plenty of codebases — performance passes, design-system builds and animation overhauls included.",
  },
];