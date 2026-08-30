"use client";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import styles from "./rush-page.module.css";
import { RUSH, track } from "./rush-data";

export default function RushFloating({ locale }: { locale?: string } = {}) {
  return (
    <>
      <Link
        className={styles.waFloat}
        href={RUSH.whatsapp}
        aria-label="WhatsApp 即時查詢"
        onClick={() => track("whatsapp_click", "rush-printing")}
        data-event="whatsapp_click" data-source="rush-printing" data-locale="zh-hk"
      >
        <MessageCircle size={28} />
      </Link>
      <div className={styles.mobileBar}>
        <Link href={RUSH.whatsapp} style={{ background: "#F87314" }}
          onClick={() => track("whatsapp_click", "rush-printing")}
          data-event="whatsapp_click" data-source="rush-printing" data-locale="zh-hk">
          WhatsApp 詢價
        </Link>
        <a href={RUSH.tel} style={{ background: "#2873F5" }}
          onClick={() => track("tel_click", "rush-printing")}
          data-event="tel_click" data-source="rush-printing" data-locale="zh-hk">
          <Phone size={16} style={{ verticalAlign: "-2px" }} /> 致電
        </a>
      </div>
    </>
  );
}
