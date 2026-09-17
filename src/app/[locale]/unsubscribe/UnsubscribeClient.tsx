"use client";

import { useEffect, useState } from "react";

type Locale = "zh-hk" | "en" | "ja";

interface Copy {
  h1: string;
  h1Sending: string;
  sending: string;
  done: string;
  lead: string;
  refLabel: string;
  note: string;
  emailBtn: string;
  waBtn: string;
  subject: string;
}

const COPY: Record<Locale, Copy> = {
  "zh-hk": {
    h1: "已為您取消訂閱",
    h1Sending: "正在處理您的退訂請求…",
    sending: "正在提交退訂請求…",
    done: "已完成，我們不會再向您發送推廣郵件。",
    lead: "您的電郵地址將從智印港的推廣郵件列表中移除。",
    refLabel: "參考編號",
    note: "如非本人操作，或需要任何協助，歡迎隨時聯絡我們：",
    emailBtn: "發送郵件",
    waBtn: "WhatsApp 聯絡",
    subject: "Unsubscribe request",
  },
  en: {
    h1: "You’re unsubscribed",
    h1Sending: "Processing your request…",
    sending: "Submitting your request…",
    done: "Done — we will not send you further marketing emails.",
    lead: "Your email address will be removed from ZprintPro marketing lists.",
    refLabel: "Reference",
    note: "If this wasn’t you, or you need any help, contact us anytime:",
    emailBtn: "Email us",
    waBtn: "WhatsApp",
    subject: "Unsubscribe request",
  },
  ja: {
    h1: "配信停止を受け付けました",
    h1Sending: "リクエストを処理しています…",
    sending: "リクエストを送信中…",
    done: "完了しました。今後、宣伝メールはお送りしません。",
    lead: "お客様のメールアドレスをジープリントの配信リストから削除いたします。",
    refLabel: "受付番号",
    note: "身に覚えのない場合やご不明な点は、お気軽にお問い合わせください：",
    emailBtn: "メールで連絡",
    waBtn: "WhatsApp",
    subject: "Unsubscribe request",
  },
};

const WA_URL = "https://wa.me/8619880851334";
const CONTACT_EMAIL = "zprintpro@outlook.com";

interface Props {
  locale: string;
  refId?: string;
  email?: string;
}

export default function UnsubscribeClient({ locale, refId, email }: Props) {
  const L: Locale = (["zh-hk", "en", "ja"].includes(locale) ? locale : "zh-hk") as Locale;
  const t = COPY[L];
  const [state, setState] = useState<"sending" | "done">(refId || email ? "sending" : "done");

  useEffect(() => {
    if (!refId && !email) return;
    let alive = true;
    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref: refId || "", email: email || "" }),
    })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setState("done");
      });
    return () => {
      alive = false;
    };
  }, [refId, email]);

  const mailtoBody = refId ? "&body=" + encodeURIComponent("Ref: " + refId) : "";
  const mailto = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(t.subject) + mailtoBody;

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(40 115 245 / 0.1)" }}>
            <svg className="h-7 w-7" style={{ color: "#2873F5" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#333333" }}>{state === "sending" ? t.h1Sending : t.h1}</h1>
          <p className={state === "sending" ? "leading-relaxed text-gray-400" : "leading-relaxed text-gray-700"}>{state === "sending" ? t.sending : t.done}</p>
          <p className="leading-relaxed text-gray-500 mt-2">{t.lead}</p>
          {refId ? (
            <p className="mt-4 text-xs text-gray-400">
              {t.refLabel}: <span className="font-mono">{refId}</span>
            </p>
          ) : null}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500 mb-4">{t.note}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={mailto} className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50" style={{ color: "#333333" }}>
                {t.emailBtn} · {CONTACT_EMAIL}
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#2873F5" }}>
                {t.waBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
