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
  expanded: string;
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
    expanded:
      "I treat the DOM as the interface contract, not an afterthought — semantic markup, keyboard paths and screen-reader support are built in from the first commit, not bolted on before launch. Component boundaries follow data, not convenience, so state stays predictable as a codebase grows past the demo stage. Every interface ships with typed props, tested edge cases and a build that fails loudly rather than degrading quietly in production.",
    keywords: ["React", "TypeScript", "Next.js"],
    icon: "code",
    handle: "@frontenddev",
  },
  {
    index: "02",
    title: "Creative Development",
    detail:
      "Award-calibre interactive work. Editorial layouts, art direction and expressive engineering delivered with a studio's attention to detail.",
    expanded:
      "This is where design and engineering stop being separate handoffs. I start from art direction — grid, type, rhythm — and build the interaction layer to match, instead of decorating a template afterward. The goal is a site that reads like it came out of a studio, not a component library: layouts that break the grid on purpose, transitions that carry meaning, and enough restraint to know when a page needs to sit still.",
    keywords: ["GSAP", "ScrollTrigger", "Three.js"],
    icon: "sparkles",
    handle: "@creativedev",
  },
  {
    index: "03",
    title: "Interactive UI",
    detail:
      "Interfaces that feel alive without being fussy. Scroll choreography, micro-interactions and cursor systems that reward attention.",
    expanded:
      "Most interactivity should be felt, not noticed — a hover state that answers before you finish moving, a scroll that stays glued to the wheel instead of lagging behind it. I build custom cursor systems, magnetic buttons and scroll-linked staging as their own layer on top of the layout, tuned in real browsers on real trackpads until the timing stops feeling like an animation and starts feeling like physics.",
    keywords: ["Motion", "Micro-interactions"],
    icon: "cursor",
    handle: "@interactiveui",
  },
  {
    index: "04",
    title: "Animation",
    detail:
      "Timing, easing and staging treated as a design system in their own right. Every transition has a reason to exist.",
    expanded:
      "Easing curves and stagger delays get the same scrutiny as color and type — documented, reused, and tied to a reason rather than picked by feel each time. A page's motion should tell you what happened and what to look at next: what enters first, what leads the eye, what holds still so something else can move. Lenis handles the physical feel of scroll; GSAP choreographs everything riding on top of it.",
    keywords: ["GSAP", "Lenis", "WebGL"],
    icon: "zap",
    handle: "@motiondev",
  },
  {
    index: "05",
    title: "CMS Integration",
    detail:
      "Headless content that lets non-developers edit the site without breaking the design. Structured content, previews, instant deploys.",
    expanded:
      "A CMS setup succeeds or fails on the schema, long before anyone opens the editor. I model content so a client can't accidentally break a layout — structured fields instead of a giant rich-text box, live previews so what they see is what ships, and a deploy pipeline that turns a saved edit into a live page in seconds. The measure of a good integration is that the developer never gets a Slack message about it again.",
    keywords: ["Sanity", "Contentful", "Payload"],
    icon: "database",
    handle: "@headlesscms",
  },
  {
    index: "06",
    title: "Performance",
    detail:
      "Core Web Vitals engineered, not hoped for. Image pipelines, code splitting and animation budgets that keep 90+ Lighthouse scores honest.",
    expanded:
      "A heavy animation budget and a fast site aren't actually in conflict — they just have to be earned in the same pass, not traded off. That means image pipelines tuned per breakpoint, code split along real usage boundaries instead of route defaults, and every scroll-triggered effect profiled against a mid-tier device before it ships. A 90+ Lighthouse score that only holds up in a fresh incognito tab isn't a real score; the target is one that survives a slow connection and a loaded cache both.",
    keywords: ["Lighthouse", "Core Web Vitals"],
    icon: "gauge",
    handle: "@perfdev",
  },
];
