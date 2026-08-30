"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import styles from "./rush-page.module.css";
import { RUSH, track } from "./rush-data";

export default function RushPriceTable({ locale }: { locale?: string } = {}) {
  return (
    <section className={styles.price} aria-label="即日印刷價格速查">
      <div className={styles.rushInner}>
        <p className={styles.eyebrow}>價格速查</p>
        <h2 className={styles.secTitle}>即日印刷價錢</h2>
        <p className={styles.priceSub}>100 張起印，參考價以文件複雜度為準。</p>
        <table className={styles.pTable}>
          <thead>
            <tr><th>品類</th><th>起訂量</th><th>標準交期</th><th>通宵交期</th><th>參考價</th></tr>
          </thead>
          <tbody>
            {RUSH.prices.map((p) => (
              <tr key={p.cat}>
                <td className={styles.pCat}>{p.cat}</td>
                <td>{p.min}</td><td>{p.std}</td>
                <td className={styles.pRush}>{p.rush}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.pNote} style={{ marginTop: 14 }}>
          包裝盒、信封屬常規 2-5 天交期，不適用隔夜達服務。紙袋視乎燙金 / 繩手等後工工序，落單前請 WhatsApp 確認。
        </p>
        <div className={styles.pFoot}>
          <p><b>參考價以文件複雜度為準</b> — WhatsApp 30 秒攞精準報價，直接報實數。</p>
          <Link
            className={`${styles.btn} ${styles.btnPrimary}`}
            href={RUSH.whatsapp}
            onClick={() => track("whatsapp_click", "rush-printing")}
            data-event="whatsapp_click" data-source="rush-printing" data-locale="zh-hk"
          >
            <MessageCircle size={18} /> WhatsApp 攞報價
          </Link>
        </div>
      </div>
    </section>
  );
}
