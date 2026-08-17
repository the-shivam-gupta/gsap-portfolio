"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { capabilities } from "@/data/capabilities";
import { cx } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Capabilities() {
  const [active, setActive] = useState<string | null>("01");
  const detailRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Mobile accordion — same height-driven open/close the FAQ uses.
  // Runs only on touch devices where the compact accordion is visible;
  // desktop keeps its hover-reveal detail column.
  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isCoarse) return;

    const reduced = prefersReducedMotion();

    capabilities.forEach((cap) => {
      const content = detailRefs.current[cap.index];
      const isOpen = active === cap.index;
      if (!content) return;

      if (reduced) {
        content.style.height = isOpen ? "auto" : "0px";
        content.style.opacity = isOpen ? "1" : "0";
        return;
      }

      gsap.to(content, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: isOpen ? 0.55 : 0.4,
        ease: "power3.inOut",
        overwrite: "auto",
        onComplete: isOpen
          ? () => {
              content.style.height = "auto";
            }
          : undefined,
      });
    });
  }, [active]);

  return (
    <section id="capabilities" className={styles.capabilities}>
      <div className={styles.head}>
        <span className={styles.label}>Capabilities</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">WHAT I</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">DO WELL.</span>
          </span>
        </h2>
      </div>

      <ul className={styles.list}>
        {capabilities.map((cap) => {
          const isOpen = active === cap.index;
          return (
            <li
              key={cap.index}
              className={cx(styles.row, isOpen && styles.rowActive)}
              data-reveal
            >
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setActive(isOpen ? null : cap.index)}
                aria-expanded={isOpen}
                aria-controls={`capability-${cap.index}`}
                aria-label={`${cap.title} — toggle details`}
              >
                <span className={styles.index}>{cap.index}</span>
                <span className={styles.rowTitle}>{cap.title}</span>
                <span className={styles.toggleIcon} aria-hidden="true">
                  <span className={styles.toggleIconBar} />
                  <span className={styles.toggleIconBarV} />
                </span>
              </button>

              <div
                id={`capability-${cap.index}`}
                ref={(el) => {
                  detailRefs.current[cap.index] = el;
                }}
                className={cx(styles.detail, isOpen && styles.detailOpen)}
              >
                <div className={styles.detailInner}>
                  <p className={styles.detailText}>{cap.detail}</p>
                  <ul className={styles.keywords}>
                    {cap.keywords.map((k) => (
                      <li key={k} className={styles.keyword}>
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}