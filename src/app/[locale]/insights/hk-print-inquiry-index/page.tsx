// K3 v3.15 ① G1 《HK Print Inquiry Index》Vol.1 页面
// 路由: /[locale]/insights/hk-print-inquiry-index
// en 首发 (AI 引擎引用 en 概率最高), zh/ja 摘要版随后
import { Metadata } from 'next';
import Script from 'next/script';
import { INDEX_VOL1, STAT_GRID } from '@/lib/insights/index-vol1';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn
      ? 'HK Print Inquiry Index — Vol.1 (Q3 2026) | ZprintPro'
      : '香港印刷詢盤指數 Vol.1 (Q3 2026) | ZprintPro',
    description: isEn
      ? 'Hong Kong print industry first public quarterly index based on real inquiry data. n=31 baseline (Aug 2026), channel split, CTA position efficiency, language distribution, top landing pages, category interest.'
      : '香港印刷業首個基於真實詢盤數據的季度公開指數. n=31 baseline (2026年8月), 渠道結構, CTA 位置效率, 語言分佈, 熱門著陸頁, 品類興趣.',
    alternates: {
      canonical: `https://zprintpro.com/${params.locale}/insights/hk-print-inquiry-index`,
    },
  };
}

export default async function HkPrintInquiryIndexPage({ params }: { params: { locale: string } }) {
  const idx = INDEX_VOL1;
  const isEn = params.locale === 'en';
  const publishISO = `${idx.publishedAt}T00:00:00+08:00`;

  // Schema.org JSON-LD: Report + Dataset + FAQPage 三合一
  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: idx.title,
    description: idx.subtitle,
    datePublished: publishISO,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'ZprintPro',
      address: { '@type': 'PostalAddress', addressRegion: 'Hong Kong' },
    },
    measurementTechnique: 'aggregated first-party inquiry analytics',
    sampleSize: idx.totalInquiries,
    isBasedOn: {
      '@type': 'Dataset',
      name: 'ZprintPro 008 Inquiry Tracking Layer',
      description: 'Real-time first-party inquiry analytics from quote_requests and whatsapp_inquiries tables',
      variableMeasured: [
        'channel_split',
        'cta_position',
        'locale_split',
        'top_landing',
        'category_interest',
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: idx.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* 直接回答块 (GEO 靶心) */}
      <section className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-10">
        <p className="text-lg text-gray-800 leading-relaxed font-medium">
          {isEn
            ? `In Q3 2026, ZprintPro recorded 31 real inquiries (n=31 baseline) — 96.8% came through WhatsApp CTA, with header-top the highest-converting position. [Stat] The top-3 landing pages (packaging / paper-bags / posters) account for 50% of all inquiry traffic.`
            : `2026 Q3 期間, ZprintPro 記錄 31 條真實詢盤 (n=31 baseline) — 96.8% 來自 WhatsApp CTA, header-top 為最高轉化位置. [Stat] Top 3 著陸頁 (包裝盒 / 紙袋 / 海報) 佔全部詢盤流量 50%.`}
        </p>
      </section>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {isEn ? idx.title : '香港印刷詢盤指數 — Vol.1 (Q3 2026)'}
        </h1>
        <p className="text-xl text-gray-600 mb-2">{idx.subtitle}</p>
        <p className="text-sm text-gray-500">
          {idx.volume} · {idx.windowStart} ~ {idx.windowEnd} · n = {idx.totalInquiries} (baseline)
        </p>
      </header>

      {/* Stat Grid (6 块, 全部 SQL 实算) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 {isEn ? 'Key Statistics' : '關鍵統計'}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAT_GRID.map(({ stat, position }) => (
            <div key={stat.id} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs text-gray-500 mb-1">#{position}</div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{stat.context}</p>
              <p className="text-xs text-gray-400 mt-2">n = {stat.n_basis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Findings (3 条, 人工撰写) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 {isEn ? 'Key Findings' : '核心發現'}</h2>
        <div className="space-y-4">
          {idx.keyFindings.map((f, i) => (
            <article key={i} className="bg-white border-l-4 border-blue-500 p-5 rounded-r">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {i + 1}. {f.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Methodology (可信度核心) */}
      <section className="mb-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 {isEn ? 'Methodology' : '方法論'}</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>{isEn ? 'Data source' : '數據來源'}:</strong> ZprintPro 自有 Supabase 008 度量層 (quote_requests + whatsapp_inquiries 表)</li>
          <li><strong>{isEn ? 'Sample window' : '樣本時間窗'}:</strong> {idx.windowStart} ~ {idx.windowEnd}</li>
          <li><strong>{isEn ? 'Sample size' : '樣本量'}:</strong> n = {idx.totalInquiries} (baseline issue, 計數透明發布, 百分比僅 n &gt;= 30 時按 1 位小數發布)</li>
          <li><strong>{isEn ? 'PII policy' : 'PII 政策'}:</strong> {isEn ? 'Zero PII: no phone / email / name' : '零 PII: 不含電話 / 電郵 / 姓名'}</li>
          <li><strong>{isEn ? 'Test data exclusion' : '測試數據排除'}:</strong> name LIKE 'E2E-TEST-%' {isEn ? 'hard filter' : '硬過濾'}</li>
          <li><strong>{isEn ? 'Update cadence' : '更新節奏'}:</strong> {idx.updateCadence}</li>
          <li><strong>{isEn ? 'Volume numbering' : 'Vol 編號'}:</strong> {isEn ? 'Increment only — modifications release as new Vol' : '只增不改 — 改版發新 Vol'}</li>
        </ul>
      </section>

      {/* Cite This (一键复制引用行) */}
      <section className="mb-12 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">📌 {isEn ? 'Cite This Report' : '引用格式'}</h2>
        <code className="block bg-white px-4 py-3 rounded text-sm text-gray-800 border border-yellow-200">
          {idx.citeThis}
        </code>
      </section>

      {/* FAQ (5 条扇出子问题 + FAQPage schema) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ {isEn ? 'FAQ' : '常見問題'}</h2>
        <div className="space-y-4">
          {idx.faq.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
              <p className="text-gray-700 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Update Log */}
      <section className="text-sm text-gray-500 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📅 {isEn ? 'Update Log' : '更新日誌'}</h2>
        <ul className="space-y-1">
          <li>Vol.1 (Q3 2026) — 2026-08-28 — {isEn ? 'Baseline issue, n=31' : '基準版本, n=31'}</li>
          <li>Vol.2 (Q4 2026) — {isEn ? 'Scheduled 2026-11-30' : '預定 2026-11-30'}</li>
        </ul>
      </section>

      {/* Schema.org JSON-LD */}
      <Script
        id="ld-report"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
