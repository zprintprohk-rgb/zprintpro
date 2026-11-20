const path = require('path');
const { equiv, band } = require(path.join(__dirname, '..', 'scripts', 'guards', 'title-equiv.js'));
const C = {
  'zh-hk': [
    '小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起 HK$6 起 | 智印港',
    '小誌 Zine 印刷: 騎馬釘 8-64 頁 100 本起印 HK$6 起 | 智印港',
    '小誌 Zine 印刷指南: 騎馬釘 8-64 頁 100 本起 | 智印港',
    '小誌 Zine 印刷: 騎馬釘 100 本起 HK$6 起 8-64 頁 | 智印港',
  ],
  en: [
    'Zine Printing Guide: 8-64pp, 100 MOQ, HK$6/pc | ZprintPro',
    'Zine Printing Guide 2026: 8-64pp, 100 MOQ, HK$6/pc | ZprintPro',
    'Zine Printing: Saddle Stitch 8-64pp, 100 MOQ | ZprintPro',
    'Small Batch Zine Printing: 8-64pp, 100 MOQ | ZprintPro',
  ],
  ja: [
    'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
    'ジン印刷ガイド: 中綴じ 8〜64 ページ 100 部から|ZprintPro',
    'ジン(Zine)印刷: 中綴じ 8〜64 ページ 100 部から | ZprintPro',
    'ジン印刷ガイド 2026: 中綴じ 100 部から HK$6 から | ZprintPro',
  ],
};
for (const [loc, list] of Object.entries(C)) {
  console.log('\n### ' + loc);
  for (const t of list) console.log(`  equiv=${String(equiv(t)).padStart(3)} ${band(t).padEnd(5)} 「${t}」`);
}
