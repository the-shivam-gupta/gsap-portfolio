"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { services } from "@/data/services";
import { cx, formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

// A large editorial service index — no cards, no split rail-and-panel
// stage. Every service is one full-width band (number, huge title,
// arrow); hovering or tapping it expands its description and tags
// directly beneath, in place, while every other band stays exactly
// where it is. Reused deliberately from the FAQ's height-driven
// open/close so this doesn't invent a second animation system.
export function Services() {
  const [active, setActive] = useState<string>(services[0]?.index ?? "");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const reduced = prefersReducedMotion();

    services.forEach((s) => {
      const content = contentRefs.current[s.index];
      if (!content) return;
      const isOpen = active === s.index;

      if (reduced) {
        content.style.height = isOpen ? "auto" : "0px";
        content.style.opacity = isOpen ? "1" : "0";
        return;
      }

      gsap.to(content, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: isOpen ? 0.6 : 0.45,
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

  // Hover drives the reveal on fine pointers (a high-end studio site
  // never waits for a click); touch and keyboard use a real click/tap
  // or focus, since there's no hover state to fall back on there.
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <section id="services" className={styles.services}>
      <div className={styles.head}>
        <div className={styles.headTop}>
          <span className={styles.eyebrow} data-reveal="fade">
            {formatNumber(services.length)} — Services
          </span>
          <p className={styles.statement} data-reveal="fade" data-delay="0.1">
            Five disciplines, one continuous practice — from the first line
            of markup to the motion that makes it feel considered.
          </p>
        </div>

        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">WHAT I</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">BUILD.</span>
          </span>
        </h2>
      </div>

      <ul className={styles.field} role="list">
        {services.map((s) => {
          const isActive = active === s.index;

          return (
            <li key={s.index} className={styles.row} data-reveal>
              <button
                type="button"
                className={cx(styles.rowButton, isActive && styles.rowButtonActive)}
                onClick={() => setActive(s.index)}
                onPointerEnter={() => {
                  if (canHover()) setActive(s.index);
                }}
                onFocus={() => setActive(s.index)}
                aria-expanded={isActive}
                aria-controls={`service-panel-${s.index}`}
                data-cursor="VIEW"
              >
                <span className={styles.rowIndex}>{s.index}</span>
                <span className={styles.rowTick} aria-hidden="true" />
                <span className={styles.rowTitle}>{s.title}</span>
                <span className={styles.rowArrow} aria-hidden="true">
                  →
                </span>
              </button>

              <div
                id={`service-panel-${s.index}`}
                ref={(el) => {
                  contentRefs.current[s.index] = el;
                }}
                className={styles.content}
                aria-hidden={!isActive}
              >
                <div className={styles.contentInner}>
                  <p className={styles.description}>{s.description}</p>
                  <ul className={styles.tags} aria-label={`${s.title} — capabilities`}>
                    {s.deliverables.map((d) => (
                      <li key={d} className={styles.tag}>
                        {d}
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
