/**
 * v9.3 H 批:
 *  S2 — 清理 category-seo-content.ts 里 7 个已下线 blog slug 的 links 条目 (19 处)
 *  S1 — 量测 category-conversion-blocks.ts 的 quickAnswers 答案字数 (全角当量), 列出超标项
 */
import fs from 'fs';
import path from 'path';

const ROOT = 'F:\\zprintpro-nextjs';
const SEO = path.join(ROOT, 'src/data/category-seo-content.ts');
const CONV = path.join(ROOT, 'src/data/category-conversion-blocks.ts');

const DEAD = ['3d-pop-up-card-guide', 'holiday-card-printing-guide', 'wedding-place-card-guide', 'pvc-card-printing-guide', 'wedding-table-card-printing-guide', 'wedding-invitation-pricing-guide', 'corporate-gift-calendar-q4-guide'];

// ── S2: 逐行移除死链条目 ──
const lines = fs.readFileSync(SEO, 'utf8').split('\n');
const kept = [];
const removed = [];
for (const line of lines) {
  if (DEAD.some((d) => line.includes(`/blog/${d}/`))) { removed.push(line.trim()); continue; }
  kept.push(line);
}
fs.writeFileSync(SEO, kept.join('\n'), 'utf8');
console.log(`S2: 移除死链条目 ${removed.length} 条`);
for (const r of removed) console.log('   - ' + r.slice(0, 120));
const after = fs.readFileSync(SEO, 'utf8');
for (const d of DEAD) {
  const n = (after.match(new RegExp(d, 'g')) || []).length;
  if (n > 0) console.log(`   ⚠️ 仍有残留 ${d}: ${n}`);
}

// ── S1: 量测 quickAnswers ──
const convText = fs.readFileSync(CONV, 'utf8');
const width = (s) => [...s].reduce((n, ch) => n + (/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\u3040-\u30ff]/.test(ch) ? 1 : 1), 0);
// 粗粒度: 按 locale 归属块切分 → 用 "q": 与 "a": 配对扫描并追踪最近出现的 locale 键
const localeAt = [];
const re = /"(zh-hk|en|ja)"\s*:/g;
let m;
while ((m = re.exec(convText))) localeAt.push({ loc: m[1], idx: m.index });

const qa = [];
const qaRe = /"q":\s*"((?:[^"\\]|\\.)*)"[\s\S]{0,40}?"a":\s*"((?:[^"\\]|\\.)*)"/g;
let q2;
while ((q2 = qaRe.exec(convText))) {
  const before = localeAt.filter((l) => l.idx < q2.index).pop();
  const a = q2[2];
  const w = [...a].length;
  const cjk = [...a].filter((c) => /[\u4e00-\u9fff\u3040-\u30ff\uff00-\uffef\u3000-\u303f]/.test(c)).length;
  qa.push({ loc: before ? before.loc : '?', q: q2[1].slice(0, 30), len: w, cjk, over: w > 60 });
}
console.log(`\nS1: quickAnswers 共 ${qa.length} 条答案`);
const over = qa.filter((x) => x.over).sort((a, b) => b.len - a.len);
console.log(`超 60 字: ${over.length} 条`);
for (const o of over) console.log(`   [${o.loc}] ${o.len}字(cjk ${o.cjk})  Q: ${o.q}`);
const byLoc = {};
for (const x of qa) byLoc[x.loc] = (byLoc[x.loc] || 0) + 1;
console.log('按 locale 分布:', JSON.stringify(byLoc));
