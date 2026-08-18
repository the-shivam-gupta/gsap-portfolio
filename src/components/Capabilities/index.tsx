"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Code2,
  Sparkles,
  MousePointerClick,
  Zap,
  Database,
  Gauge,
  X,
} from "lucide-react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { capabilities, type CapabilityIcon } from "@/data/capabilities";
import { cx } from "@/lib/utils";
import styles from "./styles.module.scss";

const ICONS: Record<CapabilityIcon, typeof Code2> = {
  code: Code2,
  sparkles: Sparkles,
  cursor: MousePointerClick,
  zap: Zap,
  database: Database,
  gauge: Gauge,
};

const GOLDEN_RATIO = 0.6180339887;

// Deterministic pseudo-random horizontal placement (golden-ratio sequence)
// so the cards scatter across the section instead of locking to fixed
// left/right rails. Stable across server and client renders.
function cardPosition(i: number) {
  const t = (i * GOLDEN_RATIO) % 1;
  return 0.04 + 0.56 * t;
}

interface Point {
  x: number;
  y: number;
}

// Build a single continuous flight-path curve through the measured anchor
// points. Each segment is a cubic bezier whose tangents leave and enter
// the anchor points horizontally, so the curve weaves between the
// alternating cards in smooth, arcing sweeps rather than hugging a rail.
function buildArcPath(points: Point[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = curr.x - prev.x;
    d += ` C ${prev.x + dx * 0.34} ${prev.y}, ${curr.x - dx * 0.34} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const cardWrapRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [path, setPath] = useState<{ d: string; points: Point[] }>({ d: "", points: [] });
  const positions = useMemo(() => capabilities.map((_, i) => cardPosition(i)), []);

  // Measure each card's real position so the connector line and its dot
  // marker land exactly where the curve meets the card edge — instead of
  // guessing at fixed percentages that drift once row heights vary. Cards
  // are scattered pseudo-randomly, so the curve meets each one at the
  // centre of its top edge and the dot is centred exactly on the border.
  const measure = useCallback(() => {
    const journey = journeyRef.current;
    if (!journey) return;

    const jRect = journey.getBoundingClientRect();
    if (jRect.width === 0 || jRect.height === 0) return;

    const points: Point[] = [];
    capabilities.forEach((cap) => {
      const wrap = cardWrapRefs.current[cap.index];
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      points.push({
        x: ((r.left + r.width / 2 - jRect.left) / jRect.width) * 100,
        y: ((r.top - jRect.top) / jRect.height) * 100,
      });
    });

    setPath({ d: buildArcPath(points), points });
  }, []);

  useEffect(() => {
    // Deferred a frame: the initial measurement has to run after this
    // effect's own render has committed and the browser has laid the
    // cards out, not synchronously inside the effect body.
    const raf = requestAnimationFrame(measure);

    const journey = journeyRef.current;
    const ro = journey ? new ResizeObserver(() => measure()) : null;
    if (journey && ro) ro.observe(journey);

    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Scroll-driven draw. The path's length is normalised to 100 via
  // pathLength (the SVG is stretched non-uniformly, so raw getTotalLength
  // in user units doesn't match the rendered length), and CSS hides it by
  // default with an offset of 100. Scrolling then draws it from the start
  // point, like water flowing along the path — no line before the scroll.
  useEffect(() => {
    const root = rootRef.current;
    const draw = drawRef.current;
    if (!root || !draw || !path.d) return;

    const ctx = gsap.context(() => {
      const list = root.querySelector<HTMLElement>(`.${styles.list}`);
      if (!list) return;

      gsap.to(draw, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 90%",
          end: "bottom 50%",
          scrub: 0.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [path.d]);

  // Detail overlay open/close — a simple scale + opacity tween anchored
  // in place over the card, so nothing needs its height measured.
  useEffect(() => {
    const reduced = prefersReducedMotion();

    capabilities.forEach((cap) => {
      const panel = panelRefs.current[cap.index];
      if (!panel) return;
      const isOpen = openIndex === cap.index;

      if (reduced) {
        gsap.set(panel, { opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 });
        panel.style.pointerEvents = isOpen ? "auto" : "none";
        return;
      }

      gsap.to(panel, {
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0.95,
        duration: isOpen ? 0.45 : 0.3,
        ease: isOpen ? "power3.out" : "power2.inOut",
        overwrite: "auto",
        onStart: isOpen
          ? () => {
              panel.style.pointerEvents = "auto";
            }
          : undefined,
        onComplete: !isOpen
          ? () => {
              panel.style.pointerEvents = "none";
            }
          : undefined,
      });
    });
  }, [openIndex]);

  // Escape + click-outside to close whichever panel is open.
  useEffect(() => {
    if (!openIndex) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      const panel = panelRefs.current[openIndex];
      if (panel && !panel.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openIndex]);

  return (
    <section ref={rootRef} id="capabilities" className={styles.capabilities}>
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

      <div ref={journeyRef} className={styles.journey}>
        {path.d && (
          <svg
            className={styles.path}
            viewBox={`0 0 100 100`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={drawRef}
              d={path.d}
              pathLength={100}
              className={styles.pathDraw}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}

        <ul className={styles.list}>
          {capabilities.map((cap, i) => {
            const Icon = ICONS[cap.icon];
            const isOpen = openIndex === cap.index;
            const dimmed = openIndex !== null && !isOpen;
            const panelId = `capability-panel-${cap.index}`;
            const point = path.points[i];

            return (
              <li key={cap.index} className={styles.row}>
                {point && (
                  <span
                    className={styles.node}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-hidden="true"
                  />
                )}

                <div
                  ref={(el) => {
                    cardWrapRefs.current[cap.index] = el;
                  }}
                  className={styles.cardWrap}
                  style={{ marginLeft: `${positions[i] * 100}%` }}
                >
                  <div className={cx(styles.card, dimmed && styles.cardDimmed)} data-reveal>
                    <span className={styles.cardIndex}>{cap.index}</span>

                    <h3 className={styles.cardTitle}>{cap.title}</h3>
                    <p className={styles.cardText}>{cap.detail}</p>

                    <div className={styles.cardFoot}>
                      <span className={styles.handle}>{cap.handle}</span>

                      <button
                        type="button"
                        className={cx(styles.readMore, isOpen && styles.readMoreOpen)}
                        data-cursor="READ"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : cap.index)}
                      >
                        {isOpen ? "Close" : "Read more"}
                      </button>
                    </div>
                  </div>

                  <div
                    id={panelId}
                    ref={(el) => {
                      panelRefs.current[cap.index] = el;
                    }}
                    className={styles.detailPanel}
                  >
                    <button
                      type="button"
                      className={styles.detailClose}
                      onClick={() => setOpenIndex(null)}
                      aria-label={`Close ${cap.title} details`}
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>

                    <div className={styles.detailHead}>
                      <span className={styles.detailIndex}>{cap.index}</span>
                      <span className={styles.detailIcon} aria-hidden="true">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                    </div>

                    <h4 className={styles.detailTitle}>{cap.title}</h4>
                    <p className={styles.detailText}>{cap.detail}</p>

                    <ul className={styles.detailKeywords}>
                      {cap.keywords.map((k) => (
                        <li key={k} className={styles.detailKeyword}>
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
      </div>
    </section>
  );
}
