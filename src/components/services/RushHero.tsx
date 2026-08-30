"use client";
import Link from "next/link";
import { Check, Phone, MessageCircle } from "lucide-react";
import styles from "./rush-page.module.css";
import { RUSH, track } from "./rush-data";

export default function RushHero({ locale }: { locale?: string } = {}) {
  return (
    <section className={styles.hero} aria-label="即日印刷服務">
      <div className={styles.heroBg} role="img" aria-label="即日印刷-智印港印刷車間-智印港 ZprintPro" />
      <div className={styles.heroOverlay} />
      <div className={`${styles.heroInner} ${styles.rushInner}`}>
        <p className={styles.eyebrow}>通宵達旦・翌日送達</p>
        <h1 className={styles.heroTitle}>即日印刷・即日急件 — 今晚 <span className={styles.timeHi} style={{ color: "#F87314", fontSize: "1.18em", fontWeight: 800, whiteSpace: "nowrap" }}>6 點前</span>落單，聽日中午 <span className={styles.timeHi} style={{ color: "#F87314", fontSize: "1.18em", fontWeight: 800, whiteSpace: "nowrap" }}>12 點前</span>到</h1>
        <p className={styles.heroLead}>傳單 / 海報 / 貼紙 / 紙袋 100 張起印 · CMYK 全彩 · 全港配送（順豐送貨上門 / 港鐵站交收）</p>
        <ul className={styles.trustList}>
          {RUSH.trust.map((t) => (
            <li key={t}><Check size={16} strokeWidth={2.4} />{t}</li>
          ))}
        </ul>
        <div className={styles.heroCta}>
          <Link
            className={`${styles.btn} ${styles.btnPrimary}`}
            href={RUSH.whatsapp}
            onClick={() => track("whatsapp_click", "rush-printing")}
            data-event="whatsapp_click" data-source="rush-printing" data-locale="zh-hk"
          >
            <MessageCircle size={20} /> WhatsApp 即時報價
          </Link>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={RUSH.tel}
            onClick={() => track("tel_click", "rush-printing")}
            data-event="tel_click" data-source="rush-printing" data-locale="zh-hk"
          >
            <Phone size={19} /> 致電 {RUSH.telDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
