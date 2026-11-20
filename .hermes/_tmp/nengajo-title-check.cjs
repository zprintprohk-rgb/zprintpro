// title-equiv precheck for nengajo-2027 draft titles (run: node .hermes/_tmp/nengajo-title-check.cjs)
const { equiv, TITLE_MIN, TITLE_MAX } = require('../../scripts/guards/title-equiv.js');
const titles = [
  ['zh-hk', '賀年卡・年賀狀印刷 2027 早鳥 | 10 張起 HK$1 起 | 智印港'],
  ['en', 'Nengajo 2027 Early-Bird Printing | 10 MOQ | ZprintPro'],
  ['ja', '年賀状印刷 2027 早割受付中 | 10枚から ¥20〜 | ZprintPro'],
];
for (const [loc, t] of titles) {
  const e = equiv(t);
  console.log(loc, 'equiv=' + e, e >= TITLE_MIN && e <= TITLE_MAX ? 'BAND-OK' : 'OUT-OF-BAND', '|', t);
}
