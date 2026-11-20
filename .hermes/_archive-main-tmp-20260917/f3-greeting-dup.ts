/* 检查 greeting 6 SKU FAQ 答案重复范围 */
import * as fs from 'fs';
const slugs = ['premium-greeting-cards','thick-greeting-cards-400g','foil-greeting-cards','spot-uv-greeting-cards','matte-greeting-cards','rounded-corner-greeting-cards'];
const answers: Record<string, string[]> = {};
for (const s of slugs) {
  const j = JSON.parse(fs.readFileSync(`F:/zprintpro-nextjs/.hermes/f3-outputs/${s}.json`, 'utf8'));
  answers[s] = (j.body.match(/\*\*Q\d[^*]*\*\*[\s\S]*?(?=\n\n\*\*Q|\n\n\*\*FAQ|$)/g) || []).map((x) => x.trim());
}
// 找跨 SKU 相同答案
const byAnswer = new Map<string, string[]>();
for (const [s, ans] of Object.entries(answers)) {
  for (const a of ans) {
    const norm = a.replace(/\s+/g, ' ').trim();
    if (norm.length < 20) continue;
    (byAnswer.get(norm) || byAnswer.set(norm, []).get(norm)!).push(s);
  }
}
let dupCount = 0;
for (const [a, list] of byAnswer) {
  if (new Set(list).size >= 3) { dupCount++; console.log(`DUP(${list.join('/')}):`, a.slice(0, 90)); }
}
console.log('跨≥3 SKU 相同答案条数:', dupCount);
