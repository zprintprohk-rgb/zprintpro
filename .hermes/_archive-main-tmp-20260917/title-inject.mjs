/* 注入 45 条标题到 sku-seo-data.ts (15 SKU × 3 locale)
   规则: 每个 entry 块内按顺序替换第 1/2/3 个 "title": "" 为 zh-hk/en/ja 提案值
   幂等: 目标非空则跳过 (不覆盖已优化标题) */
import fs from 'node:fs';

const proposals = JSON.parse(fs.readFileSync('.hermes/title-proposals-by-slug.json', 'utf8'));
const PATH = 'src/data/sku-seo-data.ts';
let ts = fs.readFileSync(PATH, 'utf8');

const hw = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);

let injected = 0, skipped = 0;
for (const [slug, locs] of Object.entries(proposals)) {
  // 定位 entry 块
  const keyRe = new RegExp('"?' + slug + '"?\\s*:\\s*\\{');
  const m = keyRe.exec(ts);
  if (!m) { console.log(`!! 未找到 ${slug}`); continue; }
  let depth = 0, i = m.index + m[0].length - 1;
  for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
  const block = ts.slice(m.index, i + 1);
  const newBlock = block.replace(/"title"\s*:\s*""/g, (() => {
    let n = 0;
    return (mm) => {
      const key = ['zh-hk', 'en', 'ja'][n];
      n++;
      const val = locs[key];
      if (!val) return mm;
      injected++;
      return `"title": "${val}"`;
    };
  })());
  if (newBlock !== block) {
    ts = ts.slice(0, m.index) + newBlock + ts.slice(i + 1);
  }
}
fs.writeFileSync(PATH, ts, 'utf8');
console.log(`注入 ${injected} 条 / 跳过 ${skipped}`);
// 验证: 15 SKU 三语 title 当量
for (const [slug, locs] of Object.entries(proposals)) {
  for (const [loc, val] of Object.entries(locs)) {
    const n = hw(val);
    if (!(n >= 50 && n <= 54)) console.log(`  ! ${slug} ${loc} 当量=${n} (应 50-54) | ${val}`);
  }
}
console.log('当量检查完成');
