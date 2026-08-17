export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(n: number) {
  return n.toString().padStart(2, "0");
}

// Shared glyphs for the social links — used by Contact and Footer so the
// mapping lives in exactly one place.
export const socialIcons: Record<string, string> = {
  github: "GH",
  linkedin: "IN",
  twitter: "X",
};