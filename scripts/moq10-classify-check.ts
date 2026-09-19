// moq10-classify-check.ts — 價目同步波分類器測試 (K3 規劃第四步)
// 執行: npx tsx scripts/moq10-classify-check.ts
import { classifyMoqString, formatPriceTier } from '../src/data/print-method-policy';

let pass = 0, fail = 0;
const ok = (m: string) => { pass++; console.log('  ✓ ' + m); };
const bad = (m: string) => { fail++; console.log('  ✗ ' + m); };

console.log('A. 分類正確性');

const CASES: [string, string, string][] = [
  // [文本, 期望分類, 說明]
  ['我們的最低訂購量是 10 張起印', 'moq_display', '純門檻'],
  ['貼紙 10 張起印，小批量不加價', 'moq_display', '純門檻 + 無價格'],
  ['100 張起印，HK$0.22/張', 'price_tier', '★ 關鍵: 價目檔位綁定 100 張'],
  ['100 張起印 HK$0.45-0.80/張, 1000 張 HK$0.25-0.40/張', 'price_tier', '多檔位價目'],
  ['PVC 防水貼紙 100 張起印，每張低至 HK$0.22', 'price_tier', '每張低至'],
  ['Saddle stitch booklets start at 100 copies at US$1.20-1.80 per piece', 'price_tier', '英文 MOQ + 單價'],
  ['箔押しステッカーは 100 枚から、1 枚 HK$0.22〜', 'price_tier', '日文 MOQ + 單價'],
  ['傳統柯式印刷普遍 500 張起印、交期 1-3 個工作天', 'industry_fact', '行業慣例'],
  ['Alibaba 黃頁廠商多以 500-1000 本起印量吸引買家', 'industry_fact', '競品慣例'],
  ['同業常見 500-1,000 張起印', 'industry_fact', '同業慣例'],
  ['', 'other', '空字串'],
  ['這是一段無關文字', 'other', '無 MOQ 無價格'],
];

for (const [text, want, why] of CASES) {
  const got = classifyMoqString(text);
  if (got === want) ok(`${why}: 「${text.slice(0, 34)}」→ ${got}`);
  else bad(`${why}: 「${text.slice(0, 34)}」→ ${got} (期望 ${want})`);
}

console.log('\nB. price_tier 格式轉換 (數字必須完全不變)');
const FMT: [string, string][] = [
  ['100 張起印，HK$0.22/張', '100 張檔位：HK$0.22/張'],
  ['100 張起，HK$0.25/張起', '100 張檔位：HK$0.25/張起'],
  ['500 本起印，HK$6/本', '500 本檔位：HK$6/本'],
];
for (const [from, want] of FMT) {
  const got = formatPriceTier(from);
  if (got === want) ok(`「${from}」→「${got}」`);
  else bad(`「${from}」→「${got}」 (期望「${want}」)`);
  // 數字守恆斷言
  const numsFrom = from.match(/\d[\d,]*/g) ?? [];
  const numsTo = got.match(/\d[\d,]*/g) ?? [];
  if (numsFrom.join(',') === numsTo.join(',')) ok('   數字守恆 ✓');
  else bad(`   數字被改動! ${numsFrom.join(',')} → ${numsTo.join(',')}`);
}

console.log('\nC. 迴歸保護: moq_display 文本不得被判為 price_tier');
for (const t of ['10 張起印', '最低 10 張起印', '10 張起印，免費打稿', 'From 10 copies']) {
  const k = classifyMoqString(t);
  if (k !== 'price_tier') ok(`「${t}」→ ${k} (未誤判為 price_tier)`);
  else bad(`「${t}」→ 誤判為 price_tier`);
}

console.log(`\n結果: ${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
