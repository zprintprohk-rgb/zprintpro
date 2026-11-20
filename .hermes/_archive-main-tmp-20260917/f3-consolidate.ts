/* F3 合并器: .hermes/f3-outputs/*.json → sku-seo-data.ts ja body (block-balanced replace)
   幂等: 只替换每个 SKU 的 "ja": {...} 块内 body 字段; add-ja 兜底 (输出 ja 缺失时插入) */
import * as fs from 'fs';
import * as path from 'path';
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';

const OUT = path.resolve(__dirname, 'f3-outputs');
const srcPath = path.resolve(__dirname, '../src/data/sku-seo-data.ts');
let s = fs.readFileSync(srcPath, 'utf8');

const outputs: { slug: string; body: string }[] = [];
for (const f of fs.readdirSync(OUT).filter((x) => x.endsWith('.json'))) {
  outputs.push(JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8')));
}

// 每个 SKU: 定位条目键 "<slug>": { 后的 "ja": { ... } 块 (块平衡), 替换块内 body 字段
let replaced = 0, failed: string[] = [];
for (const o of outputs) {
  const anchor = `"${o.slug}": {`;
  const ai = s.indexOf(anchor);
  if (ai < 0) { failed.push(`${o.slug}:no-slug`); continue; }
  // 找 slug 之后下一个 "ja": { (块起始), 再块平衡到匹配的 }
  const ja = s.indexOf(`"ja": {`, ai);
  if (ja < 0) { failed.push(`${o.slug}:no-ja-block`); continue; }
  // 块平衡 (该块内还可能嵌套 {})
  let depth = 0, end = -1, inStr = false, esc = false;
  for (let i = ja; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) { failed.push(`${o.slug}:unbalanced`); continue; }
  const block = s.slice(ja, end + 1);
  // block 内找 "body": "..." 字段替换 (body 可能是最后或中间字段)
  const bodyRe = /"body":\s*"((?:[^"\\]|\\.)*)"/;
  const bm = block.match(bodyRe);
  if (!bm) { failed.push(`${o.slug}:no-body-field`); continue; }
  const newBody = JSON.stringify(o.body); // 产生合法转义 JSON 字符串
  const newBlock = block.slice(0, bm.index) + `"body": ${newBody}` + block.slice((bm.index as number) + bm[0].length);
  s = s.slice(0, ja) + newBlock + s.slice(end + 1);
  replaced++;
}
fs.writeFileSync(srcPath, s, 'utf8');
console.log(`replaced: ${replaced}, failed: ${failed.length}`, failed);

// 验证: 99 SKU ja body 现状
const jaWc = (x: string) => { if (!x) return 0; const seg = new Intl.Segmenter('ja', { granularity: 'word' }); return [...seg.segment(x.replace(/\*\*[^*]+\*\*/g, ''))].filter((y) => y.isWordLike).length; };
let thin = 0; const tl: string[] = [];
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  const n = jaWc(b);
  if (n < 180) { thin++; tl.push(`${p.slug}:${n}`); }
}
console.log(`after: ja <180 = ${thin}`, tl.join(' '));
