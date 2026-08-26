// 2026-08-26 K3 brief §S5: 價格速查表 6 行
// 来源: deliverable-A-rush-page.html S5 + 现有 6 SKU 网格价格数据
// 标注: 包装盒/信封 不适用隔夜达,常规 2-5 天
// 埋点: 表尾 CTA 接 data-event=whatsapp_click

import Link from 'next/link';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import type { Locale } from '@/lib/seo';

type Props = {
  locale: Locale;
};

const t = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      title: '急件價目速查',
      subtitle: '以下價格為 100 張 / 100 個起印基準,實際以 WhatsApp 30 秒報價為準',
      header: { sku: '品類', moq: '起印量', price: '急件價', sla: '通宵交期' },
      rows: [
        ['傳單 A4 雙面 CMYK', '100 張', 'HK$0.25 / 張', '✅ 支援'],
        ['海報 A1 單面 CMYK', '10 張', 'HK$15 / 張', '✅ 支援'],
        ['貼紙 防水 Vinyl', '100 張', 'HK$0.22 / 張', '✅ 支援'],
        ['畫冊 騎馬釘 16P', '10 本', 'HK$8 / 本', '✅ 支援'],
        ['易拉寶 80×200cm', '1 個', 'HK$35 / 個', '✅ 支援'],
        ['紙袋 通用款', '100 個', '視乎後工 WhatsApp 確認', '視乎後工'],
        ['包裝盒 通用款', '100 個', '常規 2-5 天', '❌ 不適用'],
        ['信封 通用款', '100 個', '常規 2-5 天', '❌ 不適用'],
      ],
      note: '包裝盒 / 信封不適用隔夜達,常規 2-5 天出貨。急件請以 WhatsApp 確認後再下單。',
      cta: '💬 WhatsApp 確認急單',
    },
    en: {
      title: 'Rush Price Quick Reference',
      subtitle: 'Below: 100+ MOQ baseline pricing. Final price via 30-second WhatsApp quote.',
      header: { sku: 'Product', moq: 'MOQ', price: 'Rush Price', sla: 'Overnight' },
      rows: [
        ['Flyer A4 duplex CMYK', '100 sheets', 'US$0.04 / sheet', '✅ Yes'],
        ['Poster A1 simplex CMYK', '10 sheets', 'US$1.95 / sheet', '✅ Yes'],
        ['Sticker waterproof vinyl', '100 sheets', 'US$0.06 / sheet', '✅ Yes'],
        ['Booklet saddle-stitch 16P', '10 copies', 'US$1.05 / copy', '✅ Yes'],
        ['Roll-up banner 80×200cm', '1 pc', 'US$12.00 / pc', '✅ Yes'],
        ['Paper bag standard', '100 pcs', 'Finishing-dependent, WhatsApp', 'Finishing-dependent'],
        ['Packaging box standard', '100 pcs', 'Standard 2-5 days', '❌ Not available'],
        ['Envelope standard', '100 pcs', 'Standard 2-5 days', '❌ Not available'],
      ],
      note: 'Packaging boxes / envelopes do not support overnight. Standard 2-5 day production. Confirm via WhatsApp before ordering rush.',
      cta: '💬 WhatsApp Confirm Rush',
    },
    ja: {
      title: '特急価格一覧',
      subtitle: '下記は 100 枚 / 100 個からの基準価格。最終価格は WhatsApp 30 秒見積もりでご確認ください。',
      header: { sku: '商品', moq: '最小ロット', price: '特急価格', sla: '徹夜対応' },
      rows: [
        ['チラシ A4 両面 CMYK', '100 枚', '¥4 / 枚', '✅ 対応'],
        ['ポスター A1 片面 CMYK', '10 枚', '¥195 / 枚', '✅ 対応'],
        ['ステッカー 防水 Vinyl', '100 枚', '¥6 / 枚', '✅ 対応'],
        ['冊子 中綴じ 16P', '10 冊', '¥840 / 冊', '✅ 対応'],
        ['ロールアップバナー 80×200cm', '1 個', '¥1,260 / 個', '✅ 対応'],
        ['紙袋 標準', '100 個', '後加工による, WhatsApp 確認', '後加工による'],
        ['包装箱 標準', '100 個', '通常 2-5 日', '❌ 対応外'],
        ['封筒 標準', '100 個', '通常 2-5 日', '❌ 対応外'],
      ],
      note: '包装箱 / 封筒は徹夜対応外、通常 2-5 日。特急注文は WhatsApp でご確認の上お申し込みください。',
      cta: '💬 WhatsApp で急行確認',
    },
  } as const;
  return dict[locale];
};

export default function RushPriceTable({ locale }: Props) {
  const d = t(locale);
  return (
    <section className="mb-8 md:mb-12" data-section="rush-price-table">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{d.title}</h2>
      <p className="text-sm md:text-base text-gray-600 mb-4">{d.subtitle}</p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-gray-900">{d.header.sku}</th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">{d.header.moq}</th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">{d.header.price}</th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">{d.header.sla}</th>
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r, i) => (
              <tr
                key={i}
                className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">{r[0]}</td>
                <td className="px-4 py-3 text-gray-700">{r[1]}</td>
                <td className="px-4 py-3 text-[#F87314] font-bold">{r[2]}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    r[3].startsWith('✅')
                      ? 'bg-orange-50 text-orange-700'
                      : r[3].startsWith('❌')
                      ? 'text-gray-500'
                      : 'text-amber-700'
                  }`}
                >
                  {r[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs md:text-sm text-gray-500">{d.note}</p>

      <div className="mt-5 flex justify-center">
        <a
          href={generateWhatsAppLink(locale as 'zh-hk' | 'en' | 'ja', {
            productName: locale === 'zh-hk' ? '急單確認' : locale === 'ja' ? '急ぎの注文' : 'Rush Order Confirm',
            source: 'rush-printing-delivery-pricetable',
            extra: locale === 'zh-hk'
              ? '請填寫：\n• 產品：\n• 數量：\n• 期望交付時間：'
              : locale === 'en'
              ? 'Please fill in:\n• Product:\n• Quantity:\n• Expected delivery time:'
              : 'ご記入ください：\n• 製品：\n• 数量：\n• ご期望納期：',
          })}
          target="_blank"
          rel="noopener noreferrer"
          data-event="whatsapp_click"
          data-source="rush-printing"
          data-locale={locale}
          className="bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          {d.cta}
        </a>
      </div>
    </section>
  );
}
