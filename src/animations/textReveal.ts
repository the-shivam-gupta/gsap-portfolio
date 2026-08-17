"use client";

import { gsap } from "./register";
import { prefersReducedMotion } from "./reducedMotion";

/**
 * Wraps each word of an element in masked spans so it can be animated
 * independently. Returns the inner word spans.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";

  const words = text.split(/(\s+)/);
  const inners: HTMLElement[] = [];

  for (const part of words) {
    if (part === "") continue;

    if (/^\s+$/.test(part)) {
      const space = document.createElement("span");
      space.innerHTML = "&nbsp;";
      space.className = "word-space";
      el.appendChild(space);
      continue;
    }

    const mask = document.createElement("span");
    mask.className = "word-mask";
    mask.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = "word-inner";
    inner.textContent = part;
    mask.appendChild(inner);
    el.appendChild(mask);
    inners.push(inner);
  }

  return inners;
}

/**
 * Animated word-by-word reveal for a paragraph, scrubbed to scroll.
 * The parent element should carry `data-reveal-words` and this utility
 * reads a direct text node (split in place).
 */
export function scrubWords(
  el: HTMLElement,
  vars: { start?: string; end?: string } = {},
) {
  if (prefersReducedMotion()) return;
  const inners = splitWords(el);
  gsap.set(inners, { opacity: 0.08 });

  gsap.to(inners, {
    opacity: 1,
    stagger: 0.08,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: vars.start ?? "top 80%",
      end: vars.end ?? "top 30%",
      scrub: true,
    },
  });
}

/**
 * Reveals masked lines inside a container. Markup must be:
 *   <div class="line-mask"><div class="line-mask-inner">Text</div></div>
 */
export function revealLines(
  container: HTMLElement,
  vars: {
    stagger?: number;
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    ease?: string;
    immediate?: boolean;
  } = {},
) {
  const reduced = prefersReducedMotion();
  const inners = Array.from(
    container.querySelectorAll<HTMLElement>(".line-mask-inner"),
  );

  if (reduced || inners.length === 0) {
    gsap.set(inners, { y: 0, opacity: 1 });
    return;
  }

  gsap.set(inners, { y: vars.y ?? "115%", rotate: 0.001 });

  const tween = gsap.to(inners, {
    y: 0,
    duration: vars.duration ?? 1.1,
    ease: vars.ease ?? "power4.out",
    stagger: vars.stagger ?? 0.09,
    delay: vars.delay ?? 0,
    scrollTrigger: vars.immediate
      ? undefined
      : {
          trigger: container,
          start: vars.start ?? "top 88%",
          toggleActions: "play none none none",
        },
  });

  return tween;
}

/**
 * Splits a heading into masked word spans (no line logic) and reveals them.
 */
export function revealWords(
  el: HTMLElement,
  vars: { duration?: number; stagger?: number; y?: number } = {},
) {
  if (prefersReducedMotion()) return;
  const inners = splitWords(el);
  gsap.fromTo(
    inners,
    { yPercent: 120, rotate: 0.001 },
    {
      yPercent: 0,
      duration: vars.duration ?? 1,
      ease: "power4.out",
      stagger: vars.stagger ?? 0.05,
      scrollTrigger: { trigger: el, start: "top 88%" },
    },
  );
}