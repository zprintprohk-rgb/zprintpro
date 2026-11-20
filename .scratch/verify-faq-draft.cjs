const fs = require('fs');
// 0. 內建 precheck（與 .hermes/_probe-pb/precheck-faq-format.mjs 同源正則）
const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
const cases = [
  { name: '① 標準 Q1:/A: + <br/>', html: '<p><strong>Q1: 燙金最少印幾多個?</strong><br/>A: 100 個起印, 金箔 HK$0.30-0.50/個。</p>', expect: 1 },
  { name: '② 带 class 的 p', html: '<p class="mb-3"><strong>Q1: 100 個起印嗎?</strong><br/>A: 是, 100 個起印。</p>', expect: 1 },
  { name: '③ 无 <br/>', html: '<p><strong>Q2: 交期幾耐?</strong>A: 5-7 個工作天, 急件 3 天。</p>', expect: 1 },
  { name: '④ 全角冒号 + 全角序号', html: '<p><strong>Q3：可否打樣？</strong><br/>A：可以, 免費打樣。</p>', expect: 1 },
  { name: '⑤ 无序号', html: '<p><strong>Q: 出口歐美要什麼認證?</strong><br/>A: EU REACH + US Lacey Act。</p>', expect: 1 },
  { name: '⑥ 反例 <li> 列表形态', html: '<ol><li><strong>100 個起印嗎?</strong> 是, 100 個起印。</li></ol>', expect: 0 },
  { name: '⑦ 反例 无 A 标记', html: '<p><strong>交期幾耐?</strong> 5-7 個工作天。</p>', expect: 0 },
  { name: '⑧ 反例 跨段', html: '<p><strong>Q1: 交期?</strong></p><p>A: 5-7 天。</p>', expect: 0 },
];
let pass = 0, fail = 0;
for (const c of cases) {
  const got = (c.html.match(PROD_RE) || []).length;
  if (got === c.expect) pass++; else { fail++; console.log('🔴', c.name, got); }
}
console.log(`內建用例: PASS ${pass} / FAIL ${fail}`);

// 1. 對草案三語 FAQ 塊實解析
const draft = fs.readFileSync('docs/2026-09-20-cost-baseline-faq-draft.md', 'utf8');
const blocks = [...draft.matchAll(/```html\n([\s\S]*?)```/g)].map(m => m[1]);
console.log('草案 html 塊數:', blocks.length);
blocks.forEach((b, i) => {
  const hits = [...b.matchAll(PROD_RE)];
  console.log(`--- 語言塊 ${i + 1}: 解析命中 ${hits.length} 組 (期望 6)`);
  hits.forEach((h, j) => {
    const q = h[1].replace(/<[^>]*>/g, '').trim();
    const aText = h[2].replace(/<[^>]*>/g, '').trim();
    const cjk = (aText.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length;
    const words = aText.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
    console.log(`  Q${j + 1}: ${q.slice(0, 38)}… | 答案 CJK字數=${cjk} en詞數=${words}`);
  });
  // answer-first 檢查：首句長度
  hits.forEach((h, j) => {
    const aText = h[2].replace(/<[^>]*>/g, '').trim();
    const first = aText.split(/[。！？.!?]/)[0];
    const fc = (first.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length;
    const fw = first.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
    if (i === 1 && (fw < 8 || fw > 12)) console.log(`  ⚠️ en Q${j + 1} 首句 ${fw} 詞 (期望 8-12): ${first}`);
    if (i !== 1 && (fc < 8 || fc > 18)) console.log(`  ⚠️ 塊${i + 1} Q${j + 1} 首句 ${fc} CJK字 (參考 8-18): ${first}`);
  });
});
process.exit(fail ? 1 : 0);
