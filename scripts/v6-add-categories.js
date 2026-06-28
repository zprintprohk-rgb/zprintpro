const fs = require('fs');
let c = fs.readFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', 'utf8');

// 1. Add titles to business-cards categorySeoData
// Find: 'business-cards': {\n    keywords:
const bcIdx = c.indexOf("'business-cards': {");
if (bcIdx > 0) {
  const bcTitles = `  titles: {
      'zh-hk': '咭片印刷 香港 | 智印雲 ZprintPro — 燙金咭片 / UV咭片 / 圓角咭片 高檔定制',
      en: 'Custom Business Card Printing | ZprintPro — Foil Stamped / UV / Rounded Corner / Premium',
      ja: '名刺印刷 おすすめ | ZprintPro — 箔押し / UV / 丸角 / プレミアム名刺',
    },
`;
  c = c.substring(0, bcIdx + "'business-cards': {".length) + '\n' + bcTitles + c.substring(bcIdx + "'business-cards': {".length);
}

// 2. Add calendars categorySeoData before japan-doujin or at the end
const jdIdx = c.indexOf("'japan-doujin': {");
const calData = `
  'calendars': {
    titles: {
      'zh-hk': '年曆印刷 香港 | 智印雲 ZprintPro — 座枱月曆 / 掛牆 / 月曆 / 2027年曆 定制',
      en: 'Custom Calendar Printing | ZprintPro — Desk / Wall / Monthly / 2027 Calendars',
      ja: 'カレンダー印刷 おすすめ | ZprintPro — デスク / 壁掛け / 月別 / 2027年カレンダー',
    },
    keywords: {
      'zh-hk': '年曆印刷,月曆印刷,座枱月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,日曆',
      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar',
      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー',
    },
    descriptions: {
      'zh-hk': '香港年曆印刷服務，智印雲提供座枱月曆、掛牆月曆、2027年曆定制，支持企業LOGO，免費設計，加急出貨。Q4 旺季建議提前 60 天下單。',
      en: 'Custom calendar printing 2027 — desk, wall, monthly calendars with corporate branding. Premium paper, foil stamping, spiral/hardcover binding. Free design, rush available. Order 60 days before Q4 peak season.',
      ja: 'プロのカレンダー印刷サービス 2027年。デスク・壁掛け・月別、企業ブランディング対応。高級紙、箔押し、スパイラル/ハードカバー製本。無料デザイン、急ぎ対応可能。繁忙期の60日前までのご注文を推奨。',
    },
  },
`;
if (jdIdx > 0) {
  c = c.substring(0, jdIdx) + calData + c.substring(jdIdx);
}

fs.writeFileSync('F:/zprintpro-nextjs/src/lib/seo.ts', c, 'utf8');
console.log('seo.ts updated. New size:', c.length);
console.log('Has business-cards titles:', c.includes("'zh-hk': '咭片印刷 香港"));
console.log('Has calendars:', c.includes("'calendars': {"));
