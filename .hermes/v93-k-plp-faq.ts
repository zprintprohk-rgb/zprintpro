/** v9.3 任务 K: packaging PLP faq 插入「做唔做膠袋」(3 locale, 逆序按行插入 + 目标行断言) */
import fs from 'fs';
const P = 'F:\\zprintpro-nextjs\\src\\data\\category-seo-content.ts';
const lines = fs.readFileSync(P, 'utf8').split('\n');

const targets = [
  { line: 400, loc: 'ja', q: '食品用のビニール袋・真空パックは作れますか？', a: 'いいえ。当社は紙製の食品パッケージ（食品用紙箱・紙袋・耐油紙カード、FDA 適合 + FSC 認証紙）に特化しています。ビニール袋・真空パックは対応範囲外です。紙製の食品パッケージをご希望でしたら、100 個から、無料 2 時間校正、WhatsApp で即時お見積もり。' },
  { line: 297, loc: 'en', q: 'Do you make plastic bags or vacuum bags for food packaging?', a: 'No — we specialise in paper food packaging: food-safe paper boxes, paper bags and greaseproof paper cards (FDA food-grade + FSC certified paper). Plastic and vacuum bags are outside our scope. If you need a paper food packaging solution, the MOQ is 100 with a free 2-hour proof and an instant WhatsApp quote.' },
  { line: 194, loc: 'zh-hk', q: '你哋做唔做膠袋／真空袋？', a: '唔做。智印港專注紙質食品包裝——食品紙盒、食品紙袋、防油紙卡（FDA 食品級 + FSC 認證紙）。膠袋同真空袋唔喺我哋服務範圍；如你需要紙質食品包裝方案，100 個起印、免費 2 小時打稿、WhatsApp 即時報價。' },
];

for (const t of targets) {
  const idx = t.line - 1; // 0-based: 该行应为 '    ],'
  if (lines[idx].trim() !== '],') { console.log(`❌ 行 ${t.line} 不是 '],' (实际: ${lines[idx].trim().slice(0, 40)}) → 跳过`); continue; }
  if (lines.slice(idx - 30, idx).join('\n').includes(t.q)) { console.log(`跳过 ${t.loc} (已存在)`); continue; }
  const entry = `        { q: '${t.q}', a: '${t.a}' },`;
  lines.splice(idx, 0, entry);
  console.log(`✅ ${t.loc} 插入 @行 ${t.line}`);
}
fs.writeFileSync(P, lines.join('\n'), 'utf8');
console.log('完成');
