"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/register";
import { prefersReducedMotion } from "@/animations/reducedMotion";
import { services } from "@/data/services";
import { cx, formatNumber } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Services() {
  const [active, setActive] = useState("01");
  const activeRef = useRef("01");
  const hoverRef = useRef(false);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const renderPanel = useCallback((index: string) => {
    const service = services.find((s) => s.index === index);
    if (!service) return;

    if (indexRef.current) {
      indexRef.current.textContent = service.index;
    }
    if (titleRef.current) {
      titleRef.current.textContent = service.title;
    }
    if (countRef.current) {
      countRef.current.textContent = `${service.index} / ${formatNumber(services.length)}`;
    }

    if (bodyRef.current) {
      bodyRef.current.textContent = "";
      const desc = document.createElement("p");
      desc.className = styles.panelDesc;
      desc.textContent = service.description;
      bodyRef.current.appendChild(desc);

      const list = document.createElement("ul");
      list.className = styles.panelList;
      service.deliverables.forEach((d) => {
        const li = document.createElement("li");
        li.className = styles.panelItem;
        li.textContent = d;
        list.appendChild(li);
      });
      bodyRef.current.appendChild(list);
    }
  }, []);

  const setPanel = useCallback(
    (index: string) => {
      renderPanel(index);
      const pos = Math.max(0, services.findIndex((s) => s.index === index));
      const scaleX = (pos + 1) / services.length;
      if (fillRef.current) {
        gsap.set(fillRef.current, { scaleX });
      }
    },
    [renderPanel],
  );

  const positionIndicator = useCallback(() => {
    if (!listRef.current || !indicatorRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(
      `[data-index="${activeRef.current}"]`,
    );
    if (!row) return;

    const targetY =
      row.offsetTop + (row.offsetHeight - indicatorRef.current.offsetHeight) / 2;

    if (prefersReducedMotion()) {
      gsap.set(indicatorRef.current, { y: targetY });
      return;
    }
    gsap.to(indicatorRef.current, {
      y: targetY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    hoverRef.current = window.matchMedia("(hover: hover)").matches;
    setPanel(activeRef.current);
    positionIndicator();

    const reposition = () => positionIndicator();
    document.fonts.ready.then(reposition).catch(() => {});
    window.addEventListener("load", reposition);
    return () => window.removeEventListener("load", reposition);
  }, [setPanel, positionIndicator]);

  useEffect(() => {
    const onResize = () => positionIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionIndicator]);

  const animatePanel = (index: string, dir: 1 | -1) => {
    if (prefersReducedMotion()) {
      setPanel(index);
      return;
    }

    const incoming = () => {
      setPanel(index);
      gsap.fromTo(
        [indexRef.current, titleRef.current, bodyRef.current],
        { opacity: 0, y: 16 * dir },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "transform",
        },
      );

      const pos = Math.max(0, services.findIndex((s) => s.index === index));
      const scaleX = (pos + 1) / services.length;
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    };

    gsap.to(
      [indexRef.current, titleRef.current, bodyRef.current],
      {
        opacity: 0,
        y: -14 * dir,
        duration: 0.18,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: incoming,
      },
    );
  };

  // Shared by the desktop rail and the mobile accordion so the active
  // service is a single source of truth across both layouts.
  const selectActive = (index: string) => {
    activeRef.current = index;
    setActive(index);
  };

  const select = (index: string) => {
    if (index === activeRef.current) return;
    const oldPos = services.findIndex((s) => s.index === activeRef.current);
    const newPos = services.findIndex((s) => s.index === index);
    const dir = newPos >= oldPos ? 1 : -1;

    selectActive(index);
    animatePanel(index, dir);
    positionIndicator();
  };

  // Mobile accordion — same height-driven open/close the FAQ uses.
  // Runs only on touch devices where the inline accordion is visible.
  useEffect(() => {
    const isCoarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isCoarse) return;

    const reduced = prefersReducedMotion();

    services.forEach((s) => {
      const content = panelRefs.current[s.index];
      const isOpen = active === s.index;
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
    <section id="services" className={styles.services}>
      <div className={styles.head}>
        <span className={styles.label}>Services</span>
        <h2 className={styles.title} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">WHAT I</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">CAN DO.</span>
          </span>
        </h2>
      </div>

      <div className={styles.stage} data-reveal>
        <div className={styles.railWrap}>
          <span ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
          <ul ref={listRef} className={styles.list} role="list">
            {services.map((s) => {
              const isActive = active === s.index;
              return (
                <li key={s.index} className={styles.row} data-index={s.index}>
                  <button
                    type="button"
                    className={cx(
                      styles.rowButton,
                      isActive && styles.rowActive,
                      !isActive && styles.rowIdle,
                    )}
                    onClick={() => select(s.index)}
                    onPointerEnter={() => {
                      if (hoverRef.current) select(s.index);
                    }}
                    onFocus={() => select(s.index)}
                    aria-pressed={isActive}
                    aria-label={`Service — ${s.title}`}
                  >
                    <span className={styles.rowIndex}>{s.index}</span>
                    <span className={styles.rowTitle}>{s.title}</span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.panel} aria-live="polite" aria-label="Selected service">
          <div className={styles.panelTop}>
            <span className={cx(styles.panelTag, "mono")}>Selected service</span>
            <span ref={countRef} className={cx(styles.panelCount, "mono")}>
              01 / {formatNumber(services.length)}
            </span>
          </div>

          <span className={styles.panelDivider} aria-hidden="true" />

          <span ref={indexRef} className={cx(styles.panelIndex, "mono")}>
            01
          </span>
          <h3 ref={titleRef} className={styles.panelTitle}>
            Websites
          </h3>

          <div ref={bodyRef} className={styles.panelBody} />

          <div className={styles.panelFoot}>
            <div className={styles.panelTrack}>
              <span ref={fillRef} className={styles.panelFill} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileStage} data-reveal>
        {services.map((s) => {
          const isOpen = active === s.index;
          return (
            <div key={s.index} className={cx(styles.acc, isOpen && styles.accOpen)}>
              <button
                type="button"
                className={styles.accButton}
                onClick={() => selectActive(s.index)}
                aria-expanded={isOpen}
                aria-controls={`service-${s.index}`}
              >
                <span className={styles.accIndex}>{s.index}</span>
                <span className={styles.accTitle}>{s.title}</span>
                <span className={styles.accIcon} aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={`service-${s.index}`}
                ref={(el) => {
                  panelRefs.current[s.index] = el;
                }}
                className={styles.accPanel}
                aria-hidden={!isOpen}
              >
                <div className={styles.accPanelInner}>
                  <p className={styles.panelDesc}>{s.description}</p>
                  <ul className={styles.panelList}>
                    {s.deliverables.map((d) => (
                      <li key={d} className={styles.panelItem}>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}