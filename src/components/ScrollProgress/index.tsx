"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

// Tiny editorial page-progress marker, pinned to the bottom-right corner.
// Progress is written straight to the DOM via refs on every frame — no
// React state/render involved, so scrolling never triggers a re-render.
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!fill || !dot) return;

    const update = () => {
      tickingRef.current = false;

      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;

      fill.style.transform = `scaleY(${progress})`;
      dot.style.top = `${progress * 100}%`;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        <div ref={fillRef} className={styles.fill} />
        <div ref={dotRef} className={styles.dot} />
      </div>
    </div>
  );
}
