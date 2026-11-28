'use client';

import { useState } from 'react';

/**
 * 2026-11-14 (门童 #30 固化): 移除客户端组件内的 FAQPage schema script ——
 *   'use client' 组件渲染 `<script type="application/ld+json">` 会把整个 schema
 *   序列化进 RSC flight 载荷, 页面出现两份 schema → Google 解析器两份都吃 →
 *   GSC 商家信息「字段 brand 重复」(2026-11-02 查案: JsonLd.tsx 已去 'use client')。
 *   FAQPage schema 一律由服务端组件/页面输出 (本组件仅保留手风琴交互)。
 */

const faqData: Record<string, { q: string; a: string }[]> = {
  'zh-hk': [
    {
      q: '今天幾點前下單才能明天中午12點前收到？',
      a: '每日18:00（週一至週五）前完成付款並確認稿件，即可安排通宵印刷。急件適用：傳單 50–1000 張、小冊子 10–500 本、摺頁 50–500 份等，附加費另計；海報、貼紙、易拉寶等其他品類以 WhatsApp 報價確認。順豐送貨上門，全港配送。',
    },
    {
      q: '週五晚上下單，週一中午能收到嗎？',
      a: '週五18:00前下單，可安排週六中午前送達；週五18:00後下單則順延至週一中午處理。建議臨急訂單盡量於週五下班前提交。',
    },
    {
      q: '送貨範圍覆蓋哪些地區？',
      a: '全港覆蓋：九龍（旺角、觀塘、尖沙咀）、港島（中環、銅鑼灣、灣仔）及新界（荃灣、沙田、屯門），順豐送貨上門，無門市自取。',
    },
    {
      q: '如果明天中午沒收到怎麼辦？',
      a: '我們承諾準時交付率達95%以上。如因我方原因導致延誤，全額退款或免費加急補印。',
    },
    {
      q: '隔夜達的價格會更貴嗎？',
      a: '即日急件優先排產會有附加費，實際差價視乎品類與數量；WhatsApp 30 秒報價最準。速遞費用以報價確認為準。',
    },
    {
      q: '哪些產品不支持明天中午前收貨？',
      a: '需後工處理的產品不支持隔夜達：包裝盒（糊盒/組裝）、紙袋（穿繩/糊底）、精裝書籍、大量騎馬釘畫冊（>500本）。這些產品常規交期為2-5天。',
    },
  ],
  'en': [
    {
      q: 'What is the order cutoff time for next-day delivery by 12PM?',
      a: 'Complete payment and artwork confirmation by 6PM (Mon-Fri) for overnight printing. Rush-eligible items (flyers 50–1000 pcs, booklets 10–500, folded leaflets 50–500) arrive by 12PM next day; other items by WhatsApp quote.',
    },
    {
      q: 'Do you deliver on weekends?',
      a: 'Orders placed before 6PM Friday can be delivered by Saturday noon. Orders after 6PM Friday are processed Monday.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'All US addresses: DHL / FedEx 2-4 business day delivery from our Asia facility. Free shipping on orders over $99.',
    },
    {
      q: 'What if my order arrives late?',
      a: '95%+ on-time rate. If delay is caused by us, full refund or free rush reprint.',
    },
    {
      q: 'Is next-day delivery more expensive?',
      a: 'Rush priority production carries a surcharge, depending on item and quantity; a 30-second WhatsApp quote confirms it. Courier fees are separate.',
    },
    {
      q: 'Which products are NOT available for next-day delivery?',
      a: 'Products requiring post-press finishing: packaging boxes, paper bags, hardcover books. Standard lead time: 2-5 days.',
    },
  ],
  'ja': [
    {
      q: '翌日12時までの配送の受付締切は何時ですか？',
      a: '平日18時までに入金・データ確認が完了したご注文を対象とします。対象品類（チラシ 50–1000 枚・冊子 10–500 部・折りたたみリーフレット 50–500 部など）は翌日12時までにお届けします（割増料金）。',
    },
    {
      q: '土日も配送されますか？',
      a: '金曜日18時までのご注文は土曜日正午までに配達可能です。それ以降は月曜日正午の配達となります。',
    },
    {
      q: '配送エリアを教えてください。',
      a: '香港全地域対応。MTR駅受取（無料）または宅配便（HK$50-80）をご選択いただけます。',
    },
    {
      q: '遅延した場合の保証は？',
      a: '準時達成率95%以上。当社原因による遅延の場合、全額返金または無料で再印刷いたします。',
    },
    {
      q: '翌日配送は追加料金がかかりますか？',
      a: '特急は優先生産のため割増料金がかかります。差額は品目・数量により異なります。WhatsApp 30秒見積もりでご確認ください。配送料は別途です。',
    },
    {
      q: '翌日配送対象外の商品は？',
      a: '後加工が必要な商品は対象外です：包装盒、紙袋、ハードカバー本。標準納期：2-5日。',
    },
  ],
};

export default function RushDeliveryFAQ({ locale }: { locale: string }) {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const faqs = faqData[locale] || faqData['en'];

  return (
    <section className="mb-12">
      {/* 2026-11-14 (门童 #30): FAQPage schema 已移除 —— 由服务端组件输出, 客户端禁渲染 ld+json */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {locale === 'zh-hk'
          ? '即日速遞常見問題'
          : locale === 'en'
          ? 'Rush Printing Service FAQ'
          : '特急印刷・よくある質問'}
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div
            key={i}
            className={`border rounded-lg overflow-hidden ${
              openIdx === i
                ? 'border-blue-300 bg-blue-50/30'
                : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span className="pr-4">{f.q}</span>
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-sm ${
                  openIdx === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {openIdx === i ? '−' : '+'}
              </span>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4 text-gray-700 leading-relaxed">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
