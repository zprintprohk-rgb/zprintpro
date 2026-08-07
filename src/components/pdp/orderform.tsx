"use client";

import { useState } from "react";

interface OrderFormProps {
  locale: string;
  productName: string;
  configSnapshot: string;
  qty: number;
  batchPrice: number;
  currencySymbol: string;
}

const T: Record<string, Record<string, string>> = {
  "zh-hk": {
    title: "立即下單", configLabel: "配置快照", name: "姓名", namePlaceholder: "請輸入姓名",
    phone: "電話 / WhatsApp", phonePlaceholder: "+852 XXXX XXXX", email: "電郵", emailPlaceholder: "your@email.com",
    address: "收貨地址", addressPlaceholder: "請輸入收貨地址", note: "備註（可選）", notePlaceholder: "特殊需求、文件說明…",
    submit: "提交訂單", submitting: "提交中…", successTitle: "訂單已提交",
    successOrderId: "訂單號", successMsg: "我們 2 小時內 WhatsApp 確認文件與收款",
    sendFileTo: "請將印刷文件發送至 WhatsApp 並註明訂單號",
    paymentInfo: "確認後發收款碼／空中雲匯賬戶",
    backToProduct: "返回產品頁", errorTitle: "提交失敗", errorMsg: "請稍後重試或直接 WhatsApp 聯繫我們",
    orderSummary: "訂單摘要", referencePrice: "整批參考價",
  },
  en: {
    title: "Place Order", configLabel: "Config Snapshot", name: "Name", namePlaceholder: "Your name",
    phone: "Phone / WhatsApp", phonePlaceholder: "+1 555 XXXX", email: "Email", emailPlaceholder: "your@email.com",
    address: "Shipping Address", addressPlaceholder: "Enter shipping address",
    note: "Notes (optional)", notePlaceholder: "Special requests, file notes…",
    submit: "Submit Order", submitting: "Submitting…", successTitle: "Order Submitted",
    successOrderId: "Order #", successMsg: "We'll WhatsApp you within 2 hours to confirm files and payment",
    sendFileTo: "Send your print files via WhatsApp with your order number",
    paymentInfo: "Payment details will be sent upon confirmation",
    backToProduct: "Back to product", errorTitle: "Submission Failed",
    errorMsg: "Please try again or contact us via WhatsApp",
    orderSummary: "Order Summary", referencePrice: "Reference Batch Price",
  },
  ja: {
    title: "ご注文", configLabel: "構成スナップショット", name: "お名前", namePlaceholder: "名前を入力",
    phone: "電話 / WhatsApp", phonePlaceholder: "+81 90 XXXX XXXX", email: "メール", emailPlaceholder: "your@email.com",
    address: "配送先住所", addressPlaceholder: "配送先住所を入力",
    note: "備考（任意）", notePlaceholder: "特別なご要望、ファイル説明…",
    submit: "注文を送信", submitting: "送信中…", successTitle: "ご注文を受付ました",
    successOrderId: "注文番号", successMsg: "2 時間以内に WhatsApp でファイル確認とお支払いについてご連絡します",
    sendFileTo: "印刷データを WhatsApp で送信し、注文番号をお知らせください",
    paymentInfo: "確認後、お支払い方法をご案内します",
    backToProduct: "製品ページに戻る", errorTitle: "送信エラー",
    errorMsg: "もう一度お試しいただくか、WhatsApp でお問い合わせください",
    orderSummary: "注文サマリー", referencePrice: "ロット参考価格",
  },
};

function generateOrderId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `ZP-${y}${m}${d}-${rand}`;
}

export default function OrderForm({ locale, productName, configSnapshot, qty, batchPrice, currencySymbol }: OrderFormProps) {
  const t = T[locale] || T["zh-hk"];
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const oid = generateOrderId();
    setOrderId(oid);

    const subject = locale === "en" ? `New Order - ${productName} - ${oid}` : locale === "ja" ? `新規注文 - ${productName} - ${oid}` : `新訂單 - ${productName} - ${oid}`;

    const message = [
      `Order #: ${oid}`, `Product: ${productName}`, `Config: ${configSnapshot}`,
      `Qty: ${qty}`, `Ref Price: ${currencySymbol}${batchPrice.toLocaleString()}`,
      `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`,
      `Address: ${address}`, `Note: ${note}`,
      `Source: ${typeof window !== "undefined" ? window.location.href : ""}`,
      `Locale: ${locale}`,
    ].join("\n");

    try {
      const formBody = new FormData();
      formBody.append("_subject", subject);
      formBody.append("name", name);
      formBody.append("phone", phone);
      formBody.append("email", email);
      formBody.append("address", address);
      formBody.append("note", note);
      formBody.append("orderId", oid);
      formBody.append("productName", productName);
      formBody.append("configSnapshot", configSnapshot);
      formBody.append("qty", String(qty));
      formBody.append("batchPrice", String(batchPrice));
      formBody.append("locale", locale);
      formBody.append("source", typeof window !== "undefined" ? window.location.href : "");

      await fetch("https://formsubmit.co/zprintpro@outlook.com", { method: "POST", body: formBody });

      try {
        await fetch("/api/order-notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: oid, productName, configSnapshot, qty, batchPrice, name, phone, email, address, note, locale, source: typeof window !== "undefined" ? window.location.href : "" }),
        });
      } catch {}

      setSubmitted(true);
    } catch {
      setError(t.errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const waText = locale === "en" ? `Order ${orderId}: ${productName}, Qty ${qty}` : locale === "ja" ? `注文 ${orderId}: ${productName}、${qty} 個` : `訂單 ${orderId}: ${productName}, ${qty} 個`;
    return (
      <div className="p-6 border border-green-200 rounded-lg bg-green-50 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-green-800 mb-1">{t.successTitle}</h3>
        <p className="text-base font-mono text-green-700 mb-2">{t.successOrderId}: {orderId}</p>
        <p className="text-sm text-gray-600 mb-3">{t.successMsg}</p>
        <p className="text-sm text-gray-500 mb-3">{t.sendFileTo}:{" "}
          <a href={`https://wa.me/8619880851334?text=${encodeURIComponent(waText)}`} className="text-green-600 underline font-medium" target="_blank" rel="noopener noreferrer">WhatsApp +86 198 8085 1334</a>
        </p>
        <p className="text-xs text-gray-400">{t.paymentInfo}</p>
        <button onClick={() => { setShowForm(false); setSubmitted(false); }} className="mt-4 px-5 py-2 bg-gray-200 rounded-lg text-sm hover:bg-gray-300">{t.backToProduct}</button>
      </div>
    );
  }

  return (
    <div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="w-full py-3 rounded-lg text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors">
          {t.title}
        </button>
      ) : (
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="px-5 py-3 bg-gray-50/50 border-b border-gray-100 rounded-t-lg">
            <h3 className="text-base font-semibold text-gray-900">{t.orderSummary}</h3>
            <div className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">{locale === "en" ? "Product" : locale === "ja" ? "製品" : "產品"}</span><span className="font-medium text-gray-900">{productName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t.configLabel}</span><span className="font-medium text-gray-900 text-xs max-w-[60%] text-right truncate">{configSnapshot}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{locale === "en" ? "Qty" : locale === "ja" ? "数量" : "數量"}</span><span className="font-medium text-gray-900">{qty.toLocaleString()}</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-gray-500">{t.referencePrice}</span><span className="font-bold text-[#F87314]">{currencySymbol}{batchPrice.toLocaleString()}</span></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3">
            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} *</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t.namePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone} *</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t.phonePlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t.emailPlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.address} *</label>
              <input required value={address} onChange={e => setAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t.addressPlaceholder} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.note}</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t.notePlaceholder} />
            </div>
            <button type="submit" disabled={submitting} className="w-full py-2.5 rounded-lg text-base font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50">
              {submitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
