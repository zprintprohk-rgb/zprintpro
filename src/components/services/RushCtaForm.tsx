"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import styles from "./rush-page.module.css";
import { RUSH, track } from "./rush-data";

export default function RushCtaForm({ locale }: { locale?: string } = {}) {
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const product = String(fd.get("product") || "").trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !product) { alert("請填寫姓名、電郵、電話同產品類型"); return; }
    if (!re.test(email)) { alert("請填寫有效嘅電郵地址"); return; }
    track("form_submit", "rush-printing");
    setSending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, product,
          qty: String(fd.get("qty") || "").trim(),
          time: String(fd.get("time") || "").trim(),
          note: String(fd.get("note") || "").trim(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setOk(true); f.reset();
      setTimeout(() => setOk(false), 6000);
    } catch {
      alert("提交失敗，請直接 WhatsApp 我哋（回覆以電郵發出）。");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={styles.ctaForm} id="quote" aria-label="即日印刷詢價">
      <div className={styles.rushInner}>
        <h2 className={styles.ctaTitle}>立即獲取急件報價</h2>
        <p className={styles.ctaSub}>唔使等，而家就攞報價。</p>
        <div className={styles.ctaBtns}>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href={RUSH.whatsapp}
            onClick={() => track("whatsapp_click", "rush-printing")}
            data-event="whatsapp_click" data-source="rush-printing" data-locale="zh-hk">
            <MessageCircle size={18} /> WhatsApp 詢價
          </Link>
          <a className={`${styles.btn} ${styles.btnGhost}`} href={RUSH.tel}
            onClick={() => track("tel_click", "rush-printing")}
            data-event="tel_click" data-source="rush-printing" data-locale="zh-hk">
            <Phone size={18} /> 致電查詢
          </a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#quote-form"
            onClick={() => track("form_open", "rush-printing")}
            data-event="form_open" data-source="rush-printing" data-locale="zh-hk">
            填寫詢價表
          </a>
        </div>
        <form className={styles.formCard} id="quote-form" onSubmit={onSubmit} data-event="form_submit" data-source="rush-printing" data-locale="zh-hk">
          <div className={styles.formGrid}>
            <div className={styles.formField}><label htmlFor="f-name">姓名 *</label><input id="f-name" name="name" type="text" required placeholder="點稱呼你" /></div>
            <div className={styles.formField}><label htmlFor="f-company">公司（可選）</label><input id="f-company" name="company" type="text" placeholder="公司名" /></div>
            <div className={styles.formField}><label htmlFor="f-email">電郵 *</label><input id="f-email" name="email" type="email" required placeholder="example@email.com（回覆會發到呢度）" /></div>
            <div className={styles.formField}><label htmlFor="f-phone">電話或 WhatsApp *</label><input id="f-phone" name="phone" type="tel" required placeholder="+852 / +86..." /></div>
            <div className={styles.formField}>
              <label htmlFor="f-type">產品類型 *</label>
              <select id="f-type" name="product" required defaultValue="">
                <option value="" disabled>揀產品</option>
                {["傳單", "海報", "貼紙", "紙袋", "畫冊", "易拉寶", "其他"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className={styles.formField}><label htmlFor="f-qty">數量 *</label><input id="f-qty" name="qty" type="text" required placeholder="例如 500 張" /></div>
            <div className={`${styles.formField} ${styles.formFull}`}><label htmlFor="f-time">期望交付時間</label><input id="f-time" name="time" type="text" placeholder="例如 聽日中午前" /></div>
            <div className={`${styles.formField} ${styles.formFull}`}><label htmlFor="f-msg">備註</label><textarea id="f-msg" name="note" placeholder="尺寸、材質、其他要求" /></div>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.formSubmit}`} type="submit" disabled={sending}>
            {sending ? "提交中…" : "提交詢價"}
          </button>
          <p className={styles.formNote}>提交後 15 分鐘內專人以電郵回覆</p>
          <div className={`${styles.formOk} ${ok ? styles.formOkShow : ""}`} role="status">
            多謝你嘅詢價！我哋會喺 15 分鐘內透過電郵回覆你（發送至你填寫嘅郵箱）。如需加急，可直接 WhatsApp 我哋。
          </div>
        </form>
      </div>
    </section>
  );
}
