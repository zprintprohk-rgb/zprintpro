"use client";
import { ArrowRight } from "lucide-react";
import styles from "./rush-page.module.css";
import { RUSH } from "./rush-data";

export default function RushTimeline({ locale }: { locale?: string } = {}) {
  return (
    <section className={styles.timeline} aria-label="即日印刷時間軸">
      <div className={styles.rushInner}>
        <div className={styles.secHead}>
          <p className={styles.eyebrow}>即日時間軸</p>
          <h2 className={styles.secTitle}>今晚落單，<em>聽朝收貨</em></h2>
        </div>
        <div className={styles.tl}>
          {RUSH.timeline.map((s, i) => (
            <div className={styles.tlStep} key={s.step}>
              <span className={styles.tlDot} aria-hidden="true" />
              <div className={styles.tlTime}><small>{s.step}</small>{s.time}</div>
              <div className={styles.tlDesc}>{s.desc.split("\n").map((l) => <span key={l}>{l}<br /></span>)}</div>
              {i < RUSH.timeline.length - 1 && <ArrowRight className={styles.tlArrow} size={30} strokeWidth={3} />}
            </div>
          ))}
        </div>
        <p className={styles.tlNote}>
          每日 18:00 截單，過咗截單時間 WhatsApp 我哋，盡力幫你協調。
        </p>
      </div>
    </section>
  );
}
