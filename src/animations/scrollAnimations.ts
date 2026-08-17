"use client";

import { gsap, ScrollTrigger } from "./register";

/** A single source of truth for consistent animation timing. */
export const timing = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  ease: "power3.out",
  easeSoft: "power2.out",
};

export type EaseName =
  | "power1.out"
  | "power2.out"
  | "power3.out"
  | "power4.out"
  | "expo.out"
  | "none";

/** Generic fade-up on scroll. */
export function fadeUp(
  el: HTMLElement | HTMLElement[],
  vars: {
    y?: number;
    opacity?: number;
    stagger?: number;
    duration?: number;
    ease?: EaseName;
    start?: string;
  } = {},
) {
  gsap.from(el, {
    y: vars.y ?? 40,
    opacity: vars.opacity ?? 0,
    duration: vars.duration ?? timing.base,
    ease: vars.ease ?? timing.ease,
    stagger: vars.stagger ?? 0.08,
    scrollTrigger: { trigger: el as HTMLElement, start: vars.start ?? "top 88%" },
  });
}

/** Refresh ScrollTrigger once images/layout settle. */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function onEnterView(
  trigger: HTMLElement,
  callback: () => void,
  start = "top 75%",
) {
  return ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: callback,
  });
}