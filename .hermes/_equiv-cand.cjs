const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const cands = [
  ['a4-flyers new', 'A4 傳單印刷 宣傳單張 覆膜 10起印 HK$0.35起 | 智印港'],
  ['a4-flyers alt1', 'A4 傳單印刷 宣傳單張 啞光覆膜 10起印 HK$0.35起 | 智印港'],
  ['a4-flyers alt2', 'A4 傳單印刷 單張印刷 覆膜 10起印 HK$0.35起 | 智印港'],
  ['eco new', '環保傳單印刷 | 再生紙 水性光油 | 10張起印 HK$0.38起 | 智印港'],
  ['eco alt1', '環保傳單印刷 | 再生紙 | 10張起印 HK$0.38起 | 智印港'],
  ['eco alt2', '環保傳單印刷 FSC再生紙 水性光油 10張起印 HK$0.38起 | 智印港'],
  // current (for reference)
  ['a4 current', 'A4 傳單印刷 宣傳單張 圓角覆膜 10起印 HK$0.35起 | 智印港'],
  ['eco current', '環保傳單印刷 | 圓角 覆膜 | 10張起印 HK$0.38起 | 智印港'],
];
for (const [n, t] of cands) console.log(`${n}: equiv=${equiv(t)} band=${band(equiv(t))} | ${t}`);
