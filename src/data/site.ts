export const site = {
  name: "Emil Voss",
  shortName: "EMIL",
  role: "Creative Developer",
  location: "Berlin, Germany",
  email: "hello@emilvoss.com",
  availability: "Available for select projects",
  tagline: "Creative developer building digital experiences with intent.",

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "X / Twitter", href: "https://x.com", icon: "twitter" },
  ],

  metadata: {
    title: "Emil Voss — Creative Developer",
    description:
      "Emil Voss is a creative developer crafting fast, immersive websites and interactive interfaces — where typography, motion and code meet.",
    url: "https://emilvoss.com",
    siteName: "Emil Voss",
    locale: "en_US",
    twitterHandle: "@emilvoss",
    ogImage: "/images/general/og-cover.svg",
  },
} as const;

export type Site = typeof site;
