'use client';

import { useState } from 'react';

const faqData: Record<string, { q: string; a: string }[]> = {
  'zh-hk': [
    {
      q: '今天幾點前下單才能明天中午12點前收到？',
      a: '每日18:00（週一至週五）前完成付款並確認稿件，即可安排通宵印刷。宣傳單張、海報、貼紙、名片、畫冊與易拉寶均於翌日中午12點前送達。支持港鐵站交收及辦公室地址配送。',
    },
    {
      q: '週五晚上下單，週一中午能收到嗎？',
      a: '週五18:00前下單，可安排週六中午前送達；週五18:00後下單則順延至週一中午處理。建議臨急訂單盡量於週五下班前提交。',
    },
    {
      q: '送貨範圍覆蓋哪些地區？',
      a: '全港覆蓋：九龍（旺角、觀塘、尖沙咀）、港島（中環、銅鑼灣、灣仔）及新界（荃灣、沙田、屯門）。可選港鐵站交收（免運費）或上門速遞。',
    },
    {
      q: '如果明天中午沒收到怎麼辦？',
      a: '我們承諾準時交付率達95%以上。如因我方原因導致延誤，全額退款或免費加急補印。',
    },
    {
      q: '隔夜達的價格會更貴嗎？',
      a: '印刷單價與常規訂單一致，不加收「加急費」。僅收取正常速遞費用：港鐵站交收免費，上門速遞九龍/港島HK$50起、新界HK$80起。',
    },
    {
      q: '哪些產品不支持明天中午前收貨？',
      a: '需後工處理的產品不支持隔夜達：包裝盒（糊盒/組裝）、紙袋（穿繩/糊底）、精裝書籍、大量騎馬釘畫冊（>500本）。這些產品常規交期為2-5天。',
    },
  ],
  'en': [
    {
      q: 'What is the order cutoff time for next-day delivery by 12PM?',
      a: 'Complete payment and artwork confirmation by 6PM (Mon-Fri) for overnight printing. All 6 rush SKUs arrive by 12PM next day.',
    },
    {
      q: 'Do you deliver on weekends?',
      a: 'Orders placed before 6PM Friday can be delivered by Saturday noon. Orders after 6PM Friday are processed Monday.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'All of Hong Kong: Kowloon, Hong Kong Island, and New Territories. Free MTR pickup or HK$50-80 door-to-door.',
    },
    {
      q: 'What if my order arrives late?',
      a: '95%+ on-time rate. If delay is caused by us, full refund or free rush reprint.',
    },
    {
      q: 'Is next-day delivery more expensive?',
      a: 'Print pricing is the same as standard orders. Only normal courier fees apply.',
    },
    {
      q: 'Which products are NOT available for next-day delivery?',
      a: 'Products requiring post-press finishing: packaging boxes, paper bags, hardcover books. Standard lead time: 2-5 days.',
    },
  ],
  'ja': [
    {
      q: '翌日12時までの配送の受付締切は何時ですか？',
      a: '平日18時までに入金・データ確認が完了したご注文を対象とします。全6商品とも翌日12時までに配達いたします。',
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
      a: '印刷単価は通常注文と同額です。配送料のみ別途発生いたします。',
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {locale === 'zh-hk'
          ? '印刷即日速递送货常见问题'
          : locale === 'en'
          ? 'Same-Day Delivery FAQ'
          : '即日配送・よくある質問'}
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
