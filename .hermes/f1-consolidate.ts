/* F1 合并器: .hermes/f1-outputs/*.json → sku-seo-data.ts (仅替换 zh-hk body / 新 entry 注入)
   用法: npx tsx .hermes/f1-consolidate.ts
   验证: 可见左栏(去掉交稿規範段) ≥300 字; 输出合并报告 .hermes/f1-merge-report.json */
import * as fs from 'fs';
import { products } from '../src/data/products';

const FILE = 'src/data/sku-seo-data.ts';
const OUT_DIR = '.hermes/f1-outputs';
const cjk = (s: string) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;

function visibleLen(body: string): number {
  // 去掉交稿規範段 (模板抽到侧栏), 数剩余可见字数
  const paras = body.split('\n\n').map((p) => p.trim()).filter(Boolean);
  const visible = paras.filter((p) => !p.startsWith('交稿規範：')).join('');
  return cjk(visible);
}

let ts = fs.readFileSync(FILE, 'utf8');
const outputs: any[] = [];
for (const fn of fs.readdirSync(OUT_DIR)) {
  if (!fn.endsWith('.json')) continue;
  const o = JSON.parse(fs.readFileSync(`${OUT_DIR}/${fn}`, 'utf8'));
  outputs.push(o);
}
console.log('outputs:', outputs.length);

const report: any[] = [];
let replaced = 0, created = 0;
const slugSet = new Set(outputs.map((o) => o.slug));

// 1) 已有 entry → 替换 zh-hk body (每个 block 的第一个 "body")
for (const o of outputs) {
  const slug = o.slug;
  const body: string = o.body || '';
  const vis = visibleLen(body);
  const blockRe = new RegExp('"?' + slug + '"?\\s*:\\s*\\{');
  const m = blockRe.exec(ts);
  if (!m) { report.push({ slug, action: 'NEW', vis, bodyLen: cjk(body) }); continue; }
  let depth = 0, i = m.index, end = -1;
  for (; i < ts.length; i++) {
    if (ts[i] === '{') depth++;
    else if (ts[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const blockStart = m.index;
  const block = ts.slice(blockStart, end + 1);
  // block 内第一个 "body": "..." → 替换 (zh-hk)
  const bodyRe = /"body"\s*:\s*"((?:[^"\\]|\\.)*)"/;
  const bm = bodyRe.exec(block);
  if (!bm) { report.push({ slug, action: 'NO-BODY-FOUND', vis, bodyLen: cjk(body) }); continue; }
  const oldBody = bm[0];
  const newBody = `"body": ${JSON.stringify(body)}`;
  const absPos = blockStart + bm.index;
  if (ts.slice(absPos, absPos + oldBody.length) !== oldBody) { report.push({ slug, action: 'SLICE-MISMATCH' }); continue; }
  ts = ts.slice(0, absPos) + newBody + ts.slice(absPos + oldBody.length);
  replaced++;
  report.push({ slug, action: 'REPLACED', vis, bodyLen: cjk(body) });
}

// 2) 新 entry 注入 (在文件末尾 }; 前)
const closing = ts.lastIndexOf('};');
if (closing < 0) throw new Error('no closing');
const newEntries: string[] = [];
for (const r of report) {
  if (r.action !== 'NEW') continue;
  const slug = r.slug;
  const p = products.find((x) => x.slug === slug)!;
  const nameZh = (p as any).name ?? slug;
  const nameEn = (p as any).nameEn ?? '';
  const nameJa = (p as any).nameJa ?? '';
  const out = outputs.find((o) => o.slug === slug)!;
  const body = out.body || '';
  newEntries.push(`  "${slug}": {\n` +
    `    "name": { "zh-hk": ${JSON.stringify(nameZh)}, "en": ${JSON.stringify(nameEn)}, "ja": ${JSON.stringify(nameJa)} },\n` +
    `    "seo": {\n` +
    `      "zh-hk": { "title": "", "description": "", "h1": "", "keywords": [], "body": ${JSON.stringify(body)} },\n` +
    `      "en": { "title": "", "description": "", "h1": "", "keywords": [], "body": "" },\n` +
    `      "ja": { "title": "", "description": "", "h1": "", "keywords": [], "body": "" }\n` +
    `    },\n` +
    `    "faqs": [],\n` +
    `    "imageAlt": { "zh-hk": "", "en": "", "ja": "" }\n` +
    `  },`);
}
if (newEntries.length) {
  ts = ts.slice(0, closing) + newEntries.join('\n') + '\n' + ts.slice(closing);
  created = newEntries.length;
}

fs.writeFileSync(FILE, ts, 'utf8');
fs.writeFileSync('.hermes/f1-merge-report.json', JSON.stringify({ replaced, created, report }, null, 1), 'utf8');

// 3) 验证摘要
const fail = report.filter((r) => r.vis !== undefined && r.vis < 300);
console.log('replaced:', replaced, '| created:', created, '| 总处理:', report.length);
console.log('可见字数 <300 失败:', fail.length);
for (const f of fail) console.log('  FAIL', f.slug, f.vis);
// 全量唯一性粗查: 整段重复 (任意两 SKU body 含相同 20+ 字片段)
const bodies: Record<string, string> = {};
for (const r of report) if (r.action !== 'NO-BODY-FOUND' && r.action !== 'SLICE-MISMATCH') {
  const o = outputs.find((x) => x.slug === r.slug);
  if (o) bodies[r.slug] = (o.body || '').replace(/\s+/g, '');
}
let dupCount = 0;
const slugs = Object.keys(bodies);
for (let a = 0; a < slugs.length; a++) for (let b = a + 1; b < slugs.length; b++) {
  const A = bodies[slugs[a]], B = bodies[slugs[b]];
  // 找 15+ 字共同片段
  for (let k = 0; k + 15 <= A.length && k < 200; k += 15) {
    const frag = A.slice(k, k + 15);
    if (B.includes(frag)) { dupCount++; break; }
  }
}
console.log('疑似跨SKU重复对:', dupCount);
if (dupCount) {
  outer: for (let a = 0; a < slugs.length; a++) for (let b = a + 1; b < slugs.length; b++) {
    const A = bodies[slugs[a]], B = bodies[slugs[b]];
    for (let k = 0; k + 15 <= A.length && k < 200; k += 15) {
      const frag = A.slice(k, k + 15);
      if (B.includes(frag)) { console.log('  对:', slugs[a], '<->', slugs[b], '片段:', frag); break outer; }
    }
  }
}
