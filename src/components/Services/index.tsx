"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { services } from "@/data/services";
import { cx, formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

// A horizontal editorial gallery, not a card grid. On desktop/tablet the
// whole stage pins to the viewport (gsap.matchMedia, so it never engages
// below 768px) and the panel row translates horizontally as the user
// scrolls vertically — one continuous canvas divided by hairlines, not
// reusable card components. Below 768px, and under reduced motion at any
// width, it's a plain vertically stacked list; no pin, no JS transform.
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLLIElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Panel-by-panel entrance — each panel fades/rises in as it crosses the
  // same threshold every other section's rows use. On desktop the panels
  // sit side by side (same trigger point, hence the small index delay for
  // a gentle stagger); on mobile they're stacked, so each fires on its
  // own as it naturally scrolls into view. Either way this is a one-time
  // reveal, entirely separate from the horizontal pin/scrub below.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.from(panel, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // The pin + horizontal scrub, gated to >=768px via matchMedia so it
  // never touches mobile and cleanly tears itself down (and reverts the
  // track's transform) if the viewport crosses that breakpoint live.
  // Reduced motion skips this entirely — the CSS stacked fallback below
  // stands in on every width in that case.
  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progressFill = progressFillRef.current;
    if (!stage || !viewport || !track) return;
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Continuous value, every scrub frame — a direct style write,
            // not React state, so this never triggers a re-render.
            if (progressFill) {
              progressFill.style.transform = `scaleX(${self.progress})`;
            }

            // Discrete value, evenly distributed across progress 0..1 —
            // only actually changes ~5 times across the whole scroll, and
            // setState no-ops when the index repeats. Deliberately not
            // "whichever panel sits at the viewport's visual centre":
            // with several panels visible at once the first and last
            // panel can never actually reach that centre point (there's
            // nothing before/after them to scroll further), which is
            // exactly what left the last panel permanently inactive.
            const idx = Math.round(self.progress * (services.length - 1));
            setActiveIndex(idx);
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className={styles.services}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.head}>
          <span className={styles.label} data-reveal="fade">
            {`Services / ${formatNumber(services.length)}`}
          </span>
        </div>

        <div ref={viewportRef} className={styles.viewport}>
          <ul ref={trackRef} className={styles.track} role="list">
            {services.map((service, i) => (
              <li
                key={service.index}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={cx(styles.panel, i === activeIndex && styles.panelActive)}
              >
                <span className={styles.panelNumber} aria-hidden="true">
                  {service.index}
                </span>

                <h3 className={styles.panelTitle}>
                  {service.title.map((line) => (
                    <span key={line} className={styles.titleLine}>
                      {line}
                    </span>
                  ))}
                </h3>

                <span className={styles.accentLine} aria-hidden="true" />

                <p className={styles.panelDesc}>{service.description}</p>

                <ul
                  className={styles.tech}
                  aria-label={`${service.title.join(" ")} — technologies`}
                >
                  {service.technologies.map((t) => (
                    <li key={t} className={styles.techItem}>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressIndex}>{formatNumber(activeIndex + 1)}</span>
          <div className={styles.progressTrack}>
            <div ref={progressFillRef} className={styles.progressFill} />
          </div>
          <span className={styles.progressTotal}>{formatNumber(services.length)}</span>
        </div>
      </div>
    </section>
  );
}
