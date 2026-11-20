// 取证: sku-seo-data.ts 的 faqs[] 结构 —— 39 条真错配所在族 (只读)
// 问题: faqs[] 是**无 locale 结构**的共享数组 (对比 seo = {zh-hk,en,ja,..}), 但里面的值是中文品牌/中文答案
// ⇒ 需确认渲染层如何取 faqs, 才能判定「客户可见影响」与正确修法。
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
const slugs = Object.keys(data);
const withFaqs = slugs.filter((s) => Array.isArray(data[s].faqs) && data[s].faqs.length);
console.log(`SKU 总数 ${slugs.length} · 有 faqs[] 的 ${withFaqs.length} 个`);
let n = 0, badA = 0, badQ = 0;
for (const s of withFaqs) {
  for (const q of data[s].faqs) {
    n++;
    if (typeof q.a === 'string' && q.a.includes('智印港')) badA++;
    if (typeof q.q === 'string' && q.q.includes('智印港')) badQ++;
  }
}
console.log(`faqs 条目总数 ${n} · a 含「智印港」${badA} · q 含「智印港」${badQ}`);
console.log('\n样本 (前 4 个 SKU 的完整 faqs):');
for (const s of withFaqs.slice(0, 4)) {
  console.log(`\n[${s}]  length=${data[s].faqs.length}`);
  for (const q of data[s].faqs) console.log('   q=' + JSON.stringify(q.q) + '\n   a=' + JSON.stringify(q.a));
}
