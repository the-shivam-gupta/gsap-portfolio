import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { socialIcons } from "@/lib/utils";
import styles from "./styles.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <span className={styles.label}>Contact</span>

        <h2 className={styles.heading} data-reveal-lines>
          <span className="line-mask">
            <span className="line-mask-inner">HAVE A PROJECT</span>
          </span>
          <span className="line-mask">
            <span className="line-mask-inner">IN MIND?</span>
          </span>
        </h2>

        <a
          href={`mailto:${site.email}`}
          className={styles.cta}
          data-magnetic
          aria-label={`Email ${site.name}`}
        >
          <span className={styles.ctaText}>LET&apos;S TALK.</span>
          <ArrowUpRight
            className={styles.ctaArrow}
            size={64}
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </a>
      </div>

      <div className={styles.foot}>
        <div className={styles.footLeft}>
          <a href={`mailto:${site.email}`} className={styles.email}>
            {site.email}
          </a>
          <p className={styles.location}>{site.location}</p>
        </div>

        <ul className={styles.socials}>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label={s.label}
              >
                <span className={styles.socialIcon}>{socialIcons[s.icon]}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}