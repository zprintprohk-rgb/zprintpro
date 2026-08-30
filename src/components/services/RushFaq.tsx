"use client";
import { useState } from "react";
import styles from "./rush-page.module.css";
import { RUSH } from "./rush-data";

export default function RushFaq({ locale }: { locale?: string } = {}) {
  const [open, setOpen] = useState(0);
  return (
    <section className={styles.faq} aria-label="即日印刷常見問題">
      <div className={styles.rushInner}>
        <p className={styles.eyebrow}>常見問題</p>
        <h2 className={styles.faqTitle}>即日印刷 FAQ</h2>
        <div className={styles.faqList}>
          {RUSH.faqs.map((f, i) => (
            <div className={`${styles.faqItem} ${open === i ? styles.faqItemOpen : ""}`} key={f.q}>
              <button
                className={styles.faqQ}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {f.q}<span className={styles.faqPlus}>+</span>
              </button>
              <div className={styles.faqA} style={{ maxHeight: open === i ? 240 : 0 }}>
                <div className={styles.faqAInner}>{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
