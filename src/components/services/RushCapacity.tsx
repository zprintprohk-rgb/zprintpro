"use client";
import styles from "./rush-page.module.css";
import { RUSH, ALT } from "./rush-data";

export default function RushCapacity({ locale }: { locale?: string } = {}) {
  return (
    <section className={styles.capacity} aria-label="自有工廠產能">
      <div className={`${styles.rushInner} ${styles.capWrap}`}>
        <div>
          <p className={styles.eyebrow} style={{ color: "#7EA6FF" }}>自有產能</p>
          <h2 className={styles.capTitle}>自營工廠直印，不經中介，交期自己話事</h2>
          <p className={styles.capLead}>印刷、後工、分揀、出貨全部喺自己廠房完成。自營通宵班次・每日 18:00 截單・順豐翌日 12:00 前到，唔使等外判，產能與交期自己話事。</p>
          <div className={styles.capMetrics}>
            {RUSH.metrics.map((m) => (
              <div className={styles.capMetric} key={m.label}>
                <b>{m.num}</b><span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.capImgs}>
          <figure className={styles.capImg}>
            <img src="/images/factory/factory-heidelberg.webp" alt={ALT.heidelberg} loading="lazy" />
            <figcaption>智印港自營工廠・Heidelberg 印刷機實拍</figcaption>
          </figure>
          <figure className={styles.capImg}>
            <img src="/images/factory/factory-hpindigo.webp" alt={ALT.hpindigo} loading="lazy" />
            <figcaption>智印港自營工廠・HP Indigo 15K 數碼印刷機實拍</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
