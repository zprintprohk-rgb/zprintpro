// K3 v3.15 ① G1 《HK Print Inquiry Index》Vol.1 页面
// 路由: /[locale]/insights/hk-print-inquiry-index
// en 首发 (AI 引擎引用 en 概率最高), zh-hk 中文版同步, ja 走 jaSummary (K3 v3.17 B4 schema 增量 8/24 17:20 拍板)
// 2026-08-23 重上: 修复 3 处合规问题 —
//   1) NAP 真实实体: publisher 改 siteConfig 深圳地址 (§13.10 NAP 层必须真实)
//   2) hreflang 3 locale + x-default (§2 不可妥协)
//   3) 移除直接回答块 [Stat] 占位符, 全量英文化 (en 首发定位)
// 2026-08-24 v3.17 B4 增量: OrganizationSchema 集成 (sameAs + knowsAbout) + 区域 hreflang (en-US/GB/AU) + ja 摘要
import { Metadata } from 'next';
import { INDEX_VOL1, STAT_GRID } from '@/lib/insights/index-vol1';
import { siteConfig } from '@/lib/seo';
import { OrganizationSchema } from '@/components/insights/HKPrintInquiryIndex/OrganizationSchema';
import { jaSummary } from '@/data/insights/hk-print-inquiry-index-vol1';

// 静态参数 - 3 locale (与全站 [locale] 路由一致)
export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

const PAGE_PATH = 'insights/hk-print-inquiry-index';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isZh = params.locale === 'zh-hk';
  const isJa = params.locale === 'ja';
  return {
    title: isZh
      ? `${INDEX_VOL1.title} | 智印港 ZprintPro`
      : isJa
      ? `${jaSummary.title} | ジープリント ZprintPro`
      : `${INDEX_VOL1.titleEn} | ZprintPro`,
    description: isZh
      ? '香港印刷業首個基於真實詢盤數據的季度公開指數. n=31 baseline (2026年8月), 渠道結構, CTA 位置效率, 語言分佈, 熱門著陸頁, 品類興趣.'
      : isJa
      ? jaSummary.excerpt
      : 'Hong Kong print industry first public quarterly index based on real inquiry data. n=31 baseline (Aug 2026), channel split, CTA position efficiency, language distribution, top landing pages, category interest.',
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/${PAGE_PATH}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/${PAGE_PATH}/`,
        'en': `${siteConfig.url}/en/${PAGE_PATH}/`,
        'en-US': `${siteConfig.url}/en/${PAGE_PATH}/`,
        'en-GB': `${siteConfig.url}/en/${PAGE_PATH}/`,
        'en-AU': `${siteConfig.url}/en/${PAGE_PATH}/`,
        'ja': `${siteConfig.url}/ja/${PAGE_PATH}/`,
        'x-default': `${siteConfig.url}/zh-hk/${PAGE_PATH}/`,
      },
    },
  };
}

export default async function HkPrintInquiryIndexPage({ params }: { params: { locale: string } }) {
  const idx = INDEX_VOL1;
  const isZh = params.locale === 'zh-hk';
  const publishISO = `${idx.publishedAt}T00:00:00+08:00`;

  // Schema.org JSON-LD: Report + Dataset + FAQPage 三合一
  // publisher 用 siteConfig 真实深圳实体 (§13.10 NAP 层必须真实, 与全站 Organization schema 一致)
  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: isZh ? idx.title : idx.titleEn,
    description: isZh ? idx.subtitle : idx.subtitleEn,
    datePublished: publishISO,
    publisher: {
      '@type': 'Organization',
      name: 'ZprintPro',
      url: siteConfig.url,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
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
      name: isZh ? f.q : f.qEn,
      acceptedAnswer: { '@type': 'Answer', text: isZh ? f.a : f.aEn },
    })),
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* 直接回答块 (GEO 靶心) */}
      <section className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-10">
        <p className="text-lg text-gray-800 leading-relaxed font-medium">
          {isZh
            ? `2026 Q3 期間, ZprintPro 記錄 31 條真實詢盤 (n=31 baseline) — 96.8% 來自 WhatsApp CTA, header-top 為最高轉化位置. Top 3 著陸頁 (包裝盒 / 紙袋 / 海報) 佔全部詢盤流量 50%.`
            : `In Q3 2026, ZprintPro recorded 31 real inquiries (n=31 baseline) — 96.8% came through the WhatsApp CTA, with header-top the highest-converting position. The top-3 landing pages (packaging / paper-bags / posters) account for roughly half of all inquiry traffic.`}
        </p>
      </section>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {isZh ? idx.title : idx.titleEn}
        </h1>
        <p className="text-xl text-gray-600 mb-2">{isZh ? idx.subtitle : idx.subtitleEn}</p>
        <p className="text-sm text-gray-500">
          {idx.volume} · {idx.windowStart} ~ {idx.windowEnd} · n = {idx.totalInquiries} (baseline)
        </p>
      </header>

      {/* Stat Grid (6 块, 全部 SQL 实算) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 {isZh ? '關鍵統計' : 'Key Statistics'}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAT_GRID.map(({ stat, position }) => (
            <div key={stat.id} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="text-xs text-gray-500 mb-1">#{position}</div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{isZh ? stat.label : (stat.labelEn || stat.label)}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{isZh ? stat.context : (stat.contextEn || stat.context)}</p>
              <p className="text-xs text-gray-400 mt-2">n = {stat.n_basis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Findings (3 条) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 {isZh ? '核心發現' : 'Key Findings'}</h2>
        <div className="space-y-4">
          {idx.keyFindings.map((f, i) => (
            <article key={i} className="bg-white border-l-4 border-blue-500 p-5 rounded-r">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {i + 1}. {isZh ? f.title : f.titleEn}
              </h3>
              <p className="text-gray-700 leading-relaxed">{isZh ? f.body : f.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Methodology (可信度核心) */}
      <section className="mb-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 {isZh ? '方法論' : 'Methodology'}</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>{isZh ? '數據來源' : 'Data source'}:</strong> {isZh ? 'ZprintPro 自有 Supabase 008 度量層 (quote_requests + whatsapp_inquiries 表)' : 'ZprintPro first-party Supabase 008 tracking layer (quote_requests + whatsapp_inquiries tables)'}</li>
          <li><strong>{isZh ? '樣本時間窗' : 'Sample window'}:</strong> {idx.windowStart} ~ {idx.windowEnd}</li>
          <li><strong>{isZh ? '樣本量' : 'Sample size'}:</strong> n = {idx.totalInquiries} (baseline issue, {isZh ? '計數透明發布, 百分比僅 n >= 30 時按 1 位小數發布' : 'counts published transparently; percentages reported to one decimal only when n >= 30'})</li>
          <li><strong>{isZh ? 'PII 政策' : 'PII policy'}:</strong> {isZh ? '零 PII: 不含電話 / 電郵 / 姓名' : 'Zero PII: no phone / email / name'}</li>
          <li><strong>{isZh ? '測試數據排除' : 'Test data exclusion'}:</strong> name LIKE &#39;E2E-TEST-%&#39; {isZh ? '硬過濾' : 'hard filter'}</li>
          <li><strong>{isZh ? '更新節奏' : 'Update cadence'}:</strong> {isZh ? idx.updateCadence : idx.updateCadenceEn}</li>
          <li><strong>{isZh ? 'Vol 編號' : 'Volume numbering'}:</strong> {isZh ? '只增不改 — 改版發新 Vol' : 'Increment only — modifications release as a new volume'}</li>
        </ul>
      </section>

      {/* Cite This (一键复制引用行) */}
      <section className="mb-12 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">📌 {isZh ? '引用格式' : 'Cite This Report'}</h2>
        <code className="block bg-white px-4 py-3 rounded text-sm text-gray-800 border border-yellow-200">
          {idx.citeThis}
        </code>
      </section>

      {/* FAQ (5 条扇出子问题 + FAQPage schema) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ {isZh ? '常見問題' : 'FAQ'}</h2>
        <div className="space-y-4">
          {idx.faq.map((f, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">{isZh ? f.q : f.qEn}</summary>
              <p className="text-gray-700 mt-2 leading-relaxed">{isZh ? f.a : f.aEn}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Update Log */}
      <section className="text-sm text-gray-500 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📅 {isZh ? '更新日誌' : 'Update Log'}</h2>
        <ul className="space-y-1">
          <li>Vol.1 (Q3 2026) — 2026-08-28 — {isZh ? '基準版本, n=31' : 'Baseline issue, n=31'}</li>
          <li>Vol.2 (Q4 2026) — {isZh ? '預定 2026-11-30 (補 ja 摘要版)' : 'Scheduled 2026-11-30 (adds ja summary edition)'}</li>
        </ul>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* K3 v3.17 B4 schema 增量: Organization sameAs + knowsAbout + areaServed (per K3 §13.16.1 8/8 02:52 + 8/24 daily §2.2 实测缺失项) */}
      <OrganizationSchema />
    </main>
  );
}
