export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "What stood out wasn\u2019t the animation itself \u2014 it was the restraint. Every movement had a purpose, and the site shipped exactly as the design intended.",
    author: "Mara Lindqvist",
    role: "Creative Director",
    company: "Studio Fjord",
  },
  {
    quote:
      "Emil thinks in systems. We handed over a half-finished codebase and got back a platform our own developers actually enjoy maintaining.",
    author: "Jonas Berg",
    role: "Head of Product",
    company: "Northbeam",
  },
  {
    quote:
      "The first time we opened the site in a browser, it already felt finished. Emil\u2019s pace is what impressed me most \u2014 never rushed, never late.",
    author: "Sofia Moreau",
    role: "Founder",
    company: "Maison Kestrel",
  },
];