// 精确当量重算 (避免 shell 转义)
const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const ts = [
  ['cny-red NEW', '2027年 ポチ袋印刷：箔押し 100枚から ¥64 起 | ZprintPro'],
  ['saddle NEW', '中綴じ冊子印刷 10冊から ¥258/冊〜 低MOQ 完全ガイド'],
  ['yearbook NEW', '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案 | 智印港'],
  ['yearbook NEW2', '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案 智印港'],
  ['yearbook NEW3', '畢業紀念冊印刷指南 · 香港中學大學院校定制方案 HK$45起 | 智印港'],
  ['yearbook NEW4', '畢業紀念冊印刷 HK$45起 香港中學大學院校定制方案'],
];
for (const [n, t] of ts) {
  const e = equiv(t);
  console.log(n, e, band(e), '::', t);
}
