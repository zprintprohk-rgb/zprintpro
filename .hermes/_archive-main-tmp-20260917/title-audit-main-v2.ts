/* main 版标题审计 v2: tsx import products (与main title一致) + git show main sku-seo (batch2标题)
   用法: npx tsx .hermes/title-audit-main-v2.ts
   输出: .hermes/title-audit-main-v2.json */
import { products } from '../src/data/products';
import { execSync } from 'node:child_process';
import * as fs from 'fs';

const seoTs = execSync('git show main:src/data/sku-seo-data.ts', { cwd: 'F:/zprintpro-nextjs', maxBuffer: 64 * 1024 * 1024 }).toString('utf8');

const hw = (s: string) => [...(s || '')].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const cjkCount = (s: string) => (s || '').replace(/[^\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff]/g, '').length;

// 解析 main 版 sku-seo-data.ts 的 seo titles
function parseSeo(ts: string) {
  const out: Record<string, any> = {};
  const re = /"([a-z0-9-]+)"\s*:\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(ts))) {
    const slug = m[1];
    let depth = 0, i = m.index + m[0].length - 1;
    for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
    const block = ts.slice(m.index, i + 1);
    const titles = [...block.matchAll(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => JSON.parse('"' + x[1] + '"'));
    out[slug] = { 'zh-hk': titles[0] || '', en: titles[1] || '', ja: titles[2] || '' };
  }
  return out;
}
const seo = parseSeo(seoTs);

const FROZEN = new Set(['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']);

const rows: any[] = [];
for (const p of products) {
  const t = p as any;
  const row: any = { slug: p.slug, category_slug: p.category_slug, frozen: FROZEN.has(p.slug) };
  for (const loc of ['zh-hk', 'en', 'ja'] as const) {
    const pt = (loc === 'zh-hk' ? t.title_zh : loc === 'en' ? t.title_en : t.title_ja) ?? '';
    const st = seo[p.slug]?.[loc] ?? '';
    const effective = st || pt;
    row[loc] = { seo: st, product: pt, effective, hw: hw(effective), cjk: cjkCount(effective) };
  }
  rows.push(row);
}
fs.writeFileSync('.hermes/title-audit-main-v2.json', JSON.stringify(rows, null, 1), 'utf8');

const band = (n: number) => (n < 50 ? 'FILL<50' : n <= 54 ? 'OK50-54' : n <= 60 ? 'LEGACY55-60' : 'RED>60');
for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const st: any = {};
  for (const r of rows) { const b = band(r[loc].hw); st[b] = (st[b] || 0) + 1; }
  console.log(loc, JSON.stringify(st));
}
console.log('total:', rows.length);
console.log('\n--- zh-hk FILL 清单 (含冻结标记) ---');
for (const r of rows.filter((r) => r['zh-hk'].hw < 50)) {
  console.log(`  ${r['zh-hk'].hw}\t${r.slug}\t${r.frozen ? '[FROZEN]' : ''}\t${r['zh-hk'].effective.slice(0, 55)}`);
}
