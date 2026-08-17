import styles from "./styles.module.scss";

const statement =
  "I design and build digital experiences where technology and visual design meet — engineered to feel fast, precise and alive.";

export function Intro() {
  return (
    <section className={styles.intro} aria-label="Introduction">
      <p className={styles.statement} data-reveal-words>
        {statement}
      </p>
      <p className={styles.caption} data-reveal="fade" data-delay="0.15">
        Frontend · Creative Development · Interaction Design
      </p>
    </section>
  );
}