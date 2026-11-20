'use strict';
/**
 * 全量線上探針: 每篇 blog × 3 locale 檢查 name="description" 是否真的輸出
 * 目的 (per §0.23.1): 門童 0 命中 ≠ 線上乾淨 —— 必須 curl 線上實查
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const root = 'F:\\zprintpro-nextjs';
const ts = fs.readFileSync(path.join(root, 'src/data/blog-posts.ts'), 'utf8');
const slugs = [...new Set([...ts.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]))];
const locales = ['zh-hk', 'en', 'ja'];

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'zprintpro-probe/1.0' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) {
        r.resume();
        return get(r.headers.location, depth + 1).then(res, rej);
      }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej);
    req.setTimeout(30000, () => { req.destroy(new Error('timeout')); });
  });
}

const tasks = [];
for (const loc of locales) for (const s of slugs) tasks.push([loc, s]);

(async () => {
  const results = [];
  const CONC = 6;
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const [loc, s] = tasks[i++];
      const u = `https://zprintpro.com/${loc}/blog/${s}/`;
      try {
        const { status, html } = await get(u);
        const md = /<meta[^>]*name="description"[^>]*>/i.test(html);
        const og = /<meta[^>]*property="og:description"[^>]*>/i.test(html);
        results.push({ loc, slug: s, status, desc: md, og });
      } catch (e) {
        results.push({ loc, slug: s, status: 'ERR', err: e.message, desc: null, og: null });
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));

  const missing = results.filter(r => r.status === 200 && r.desc === false);
  const ok = results.filter(r => r.status === 200 && r.desc === true);
  const other = results.filter(r => r.status !== 200);

  const lines = [];
  lines.push('總請求: ' + tasks.length + ' | HTTP200: ' + (missing.length + ok.length) + ' | 非200: ' + other.length);
  lines.push('');
  lines.push('★ 缺 name="description" (SERP 無摘要): ' + missing.length);
  const bySlug = {};
  for (const m of missing) { (bySlug[m.slug] = bySlug[m.slug] || []).push(m.loc); }
  for (const [s, locs] of Object.entries(bySlug).sort((a, b) => b[1].length - a[1].length)) {
    lines.push('   ' + s + '  [' + locs.join(', ') + ']');
  }
  lines.push('');
  lines.push('✓ 有 name="description": ' + ok.length);
  const okSlugs = {};
  for (const m of ok) { (okSlugs[m.slug] = okSlugs[m.slug] || []).push(m.loc); }
  for (const [s, locs] of Object.entries(okSlugs).sort()) {
    lines.push('   ' + s + '  [' + locs.join(', ') + ']');
  }
  lines.push('');
  lines.push('非 200 / 錯誤:');
  for (const o of other) lines.push('   ' + o.loc + '/' + o.slug + ' -> ' + o.status + ' ' + (o.err || ''));

  const out = lines.join('\n');
  fs.writeFileSync(path.join(__dirname, 'fullscan.txt'), out, 'utf8');
  console.log(out);
})();
