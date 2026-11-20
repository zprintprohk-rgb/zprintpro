const path = require('path');
const { equiv } = require(path.join(__dirname, '..', 'scripts', 'guards', 'title-equiv.js'));
const C = {
  'zh-hk': [
    '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, 單價 HK$6-32/本, 5,000 本低至 HK$1.20/本, 5-7 個工作天, 1 小時免費打稿. 紙材/裝訂/頁數 4 的倍數, 30 秒 AI 即時報價.',
    '小誌 Zine 印刷 100 本起印, 8-64 頁騎馬釘, HK$6-32/本, 5,000 本低至 HK$1.20/本, 5-7 個工作天, 1 小時免費打稿. 頁數須為 4 的倍數, 30 秒 AI 即時報價.',
  ],
  en: [
    'Zine printing from 100 copies, saddle stitch 8-64pp, HK$6-32/copy and HK$1.20 at 5,000. 5-7 day turnaround, free proof. Instant quote.',
    'Zine printing from 100 copies, saddle stitch 8-64pp, HK$6-32 per copy down to HK$1.20 at 5,000. 5-7 day turnaround, 30-second quote.',
    'Zine printing from 100 copies, saddle stitch 8-64pp, HK$6-32/copy, HK$1.20 at 5,000. Free proof in 1 hour, 5-7 day turnaround. Instant quote.',
  ],
  ja: [
    'ジン（Zine）印刷は 100 部から。中綴じ 8〜64 ページ、1 部 HK$6〜32（5,000 部で HK$1.20）。標準納期 5〜7 営業日、1 時間以内に無料校正。30 秒 AI 見積もり。',
    'ジン（Zine）印刷は 100 部から。中綴じ 8〜64 ページ、1 部 HK$6〜32、5,000 部で HK$1.20。標準納期 5〜7 営業日、1 時間以内に無料校正、30 秒 AI 見積もり。',
  ],
};
for (const [loc, list] of Object.entries(C)) {
  console.log('\n### ' + loc);
  list.forEach((t, i) => console.log(`  #${i} equiv=${String(equiv(t)).padStart(3)} ${equiv(t) >= 150 && equiv(t) <= 160 ? 'OK  ' : 'OUT '} ${t}`));
}
