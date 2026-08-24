// K3 v3.17 B4 schema 增量 (8/24 17:20 派工, K3 14:25 拍板 C 排期 17:20-18:20)
// - sameAs: X + LinkedIn + 11 JP 印刷組合目錄 + Startup Base (per K3 §13.16.1 8/8 02:52)
// - knowsAbout: 10 词 (学园祭印刷 / POD / 卒業記念アルバム / ステッカー印刷 / チラシ印刷 / カタログ印刷 / 封筒印刷 / 同人誌印刷 / ポチ袋印刷 / カレンダー印刷)
// - areaServed: 4 国家 (JP / US / GB / HK)
// - contactPoint: customer service (zprintpro@outlook.com)
// 业务 0 改动: 增量新组件, 不动 G1 v1 内容 (L1-100 G1 page.tsx 已有 publisher Organization 但缺 sameAs/knowsAbout, 增量补全)

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZprintPro / ジープリント',
  alternateName: '智印港 ZprintPro / ジープリント ZprintPro',
  url: 'https://zprintpro.com',
  logo: 'https://zprintpro.com/logo.png',
  description:
    'Custom printing service for catalogs, packaging, stickers, calendars, paper bags, and educational materials. Serving Japan, USA, UK, and Hong Kong with Asia factory-direct pricing and DHL 2-4 day global delivery.',
  foundingDate: '2024-Q1',
  areaServed: [
    { '@type': 'Country', name: 'Japan' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Hong Kong' },
  ],
  knowsAbout: [
    '学园祭印刷',
    'POD (Print on Demand)',
    '卒業記念アルバム',
    'ステッカー印刷',
    'チラシ印刷',
    'カタログ印刷',
    '封筒印刷',
    '同人誌印刷',
    'ポチ袋印刷',
    'カレンダー印刷',
  ],
  sameAs: [
    'https://twitter.com/zprintpro',
    'https://linkedin.com/company/zprintpro',
    // 11 JP 印刷組合目錄 (per K3 §13.16.1 8/8 02:52 + G2 后续补 20)
    'https://www.printpac.or.jp/member/zprintpro',
    'https://www.japan-print.jp/directory/zprintpro',
    'https://www.digitalprint.jp/list/zprintpro',
    'https://www.print-on-demand.jp/zprintpro',
    'https://www.doujinshi-print.jp/zprintpro',
    'https://www.sticker-print.jp/zprintpro',
    'https://www.calendar-print.jp/zprintpro',
    'https://www.poster-print.jp/zprintpro',
    'https://www.flyer-print.jp/zprintpro',
    'https://www.bag-print.jp/zprintpro',
    'https://www.sticker-mule.jp/directory/zprintpro',
    // Startup Base
    'https://startupbase.jp/zprintpro',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'zprintpro@outlook.com',
    availableLanguage: ['English', 'Japanese', 'Chinese'],
  },
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
    />
  );
}
