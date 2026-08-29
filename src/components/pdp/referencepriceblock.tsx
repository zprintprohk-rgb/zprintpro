"use client";

/**
 * ReferencePriceBlock — PDP 价格参考区块
 * v17 hotfix: 列语义重做 — 整批价/平均每件 (不再乘数量)
 */

import { useState } from "react";
import OrderForm from "./orderform";

interface PriceTier {
  qty: number;
  priceHKD: number;
  priceUSD: number;
  priceJPY: number;
  weightKg: number | null;
}

interface PriceConfig {
  label: Record<string, string>;
  tiers: PriceTier[];
}

interface PriceTableData {
  source: string;
  productName: Record<string, string>;
  defaultConfigIndex: number;
  configs: PriceConfig[];
}

interface Props {
  data: PriceTableData;
  locale: string;
  whatsappNumber?: string;
}

const CURRENCY_SYMBOL: Record<string, string> = { "zh-hk": "HK$", en: "$", ja: "¥" };
const CURRENCY_CODE: Record<string, string> = { "zh-hk": "HKD", en: "USD", ja: "JPY" };

const REFERENCE_LABEL: Record<string, string> = {
  "zh-hk": "參考價 · 最終以 WhatsApp 正式報價為準",
  en: "Reference pricing · Final quote via WhatsApp",
  ja: "参考価格 · 正式見積は WhatsApp にて",
};

function getShippingText(w: number | null, locale: string): string {
  return locale === "ja" ? "$500相当以上 送料無料" : locale === "en" ? "Free over $500" : "滿$500包郵 (順豐/物流)";
}

function buildWhatsAppMessage(
  locale: string, productName: string, configLabel: string, qty: number, batchPrice: number, currency: string,
): string {
  const symbol = currency === "USD" ? "$" : currency === "JPY" ? "¥" : "HK$";
  const msgs: Record<string, string> = {
    "zh-hk": `你好，我對「${productName}」有興趣。\n配置：${configLabel}\n數量：${qty} 個\n整批參考價：${symbol}${batchPrice.toLocaleString()}\n請提供正式報價，謝謝。`,
    en: `Hi, I'm interested in "${productName}".\nConfig: ${configLabel}\nQty: ${qty}\nReference batch price: ${symbol}${batchPrice.toLocaleString()}\nPlease provide a formal quote. Thanks.`,
    ja: `こんにちは、「${productName}」に興味があります。\n構成：${configLabel}\n数量：${qty} 個\nロット参考価格：${symbol}${batchPrice.toLocaleString()}\n正式見積もりをお願いします。`,
  };
  return msgs[locale] || msgs.en;
}

export default function ReferencePriceBlock({ data, locale, whatsappNumber }: Props) {
  const [configIndex, setConfigIndex] = useState(data.defaultConfigIndex);
  const [selectedQty, setSelectedQty] = useState<number | null>(null);

  const currentConfig = data.configs[configIndex];
  const symbol = CURRENCY_SYMBOL[locale] || "HK$";
  const referenceText = REFERENCE_LABEL[locale] || REFERENCE_LABEL["zh-hk"];

  const selectedTier = selectedQty !== null ? currentConfig.tiers.find((t) => t.qty === selectedQty) : null;
  const selectedBatchPrice = selectedTier
    ? (locale === "ja" ? selectedTier.priceJPY : locale === "en" ? selectedTier.priceUSD : selectedTier.priceHKD)
    : 0;

  const waMessage = selectedTier && selectedQty
    ? buildWhatsAppMessage(locale, data.productName[locale] || "", currentConfig.label[locale] || "", selectedQty, selectedBatchPrice, CURRENCY_CODE[locale] || "HKD")
    : "";
  const waUrl = `https://wa.me/${whatsappNumber || "+8619880851334"}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="mt-8 mb-10 border border-gray-200 rounded-lg bg-white">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900">
          {locale === "ja" ? "参考価格表" : locale === "en" ? "Reference Price Table" : "參考價格表"}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{referenceText}</p>
      </div>

      {data.configs.length > 1 && (
        <div className="px-6 py-4 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {locale === "ja" ? "仕様選択" : locale === "en" ? "Config" : "規格選擇"}
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={configIndex} onChange={(e) => { setConfigIndex(Number(e.target.value)); setSelectedQty(null); }}>
            {data.configs.map((cfg, i) => (<option key={i} value={i}>{cfg.label[locale] || `Config ${i+1}`}</option>))}
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium text-gray-700">{locale==="ja"?"数量":locale==="en"?"Qty":"數量"}</th>
              <th className="px-4 py-3 font-medium text-gray-700">{locale==="ja"?"ロット価格":locale==="en"?"Batch Price":"整批參考價"}</th>
              <th className="px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">{locale==="ja"?"単価目安":locale==="en"?"Avg/pc":"平均每件"}</th>
              
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentConfig.tiers.map((tier) => {
              const batchPrice = locale === "ja" ? tier.priceJPY : locale === "en" ? tier.priceUSD : tier.priceHKD;
              const avgPrice = tier.qty > 0 ? batchPrice / tier.qty : 0;
              const isSelected = selectedQty === tier.qty;
              return (
                <tr key={tier.qty}
                  className={`cursor-pointer hover:bg-blue-50/50 transition-colors ${isSelected?"bg-blue-50 ring-1 ring-blue-200":""}`}
                  onClick={() => setSelectedQty(isSelected ? null : tier.qty)}>
                  <td className="px-4 py-3 font-medium text-gray-900">{tier.qty.toLocaleString()}<span className="text-gray-400 ml-1">{locale==="ja"?"個":"個"}</span></td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{symbol}{batchPrice.toFixed(1)}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{symbol}{avgPrice.toFixed(1)}{locale==="ja"?"/個":locale==="en"?"/pc":"/個"}</td>
                  
                  <td className="px-3 py-3">
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSelected?"bg-green-600 text-white hover:bg-green-700":"bg-green-100 text-green-700 hover:bg-green-200"}`}
                      onClick={(e) => e.stopPropagation()}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>WhatsApp
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!selectedTier && (
        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <a href={waUrl || `https://wa.me/${whatsappNumber || "+8619880851334"}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {locale === "ja" ? "WhatsAppで見積もり" : locale === "en" ? "Get Quote via WhatsApp" : "WhatsApp 獲取報價"}
          </a>
        </div>
      )}

      {/* v17: 半自助下单 — 选中某档后可下单 */}
      {selectedTier && selectedQty !== null && (() => {
        const symbol2 = CURRENCY_SYMBOL[locale] || "HK$";
        return (
          <div className="px-6 py-4 border-t border-gray-100">
            <OrderForm
              locale={locale}
              productName={data.productName[locale] || ""}
              configSnapshot={currentConfig.label[locale] || ""}
              qty={selectedQty}
              batchPrice={selectedBatchPrice}
              currencySymbol={symbol2}
            />
          </div>
        );
      })()}
    </div>
  );
}
