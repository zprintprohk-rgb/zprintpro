'use strict';
/**
 * 修復後全量線上探針 (驗收閘門)
 * 改進: 併發 3 + 請求間隔 + 503 重試 (首輪併發 6 觸發 96 個 503 限流)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const root = 'F:\\zprintpro-nextjs';
const ts = fs.readFileSync(path.join(root, 'src/data/blog-posts.ts'), 'utf8');
const slugs = [...new Set([...ts.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]))];
const locales = ['zh-hk', 'en', 'ja'];
const OUT = process.argv[2] || path.join(__dirname, 'postfix.txt');

const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; zprintpro-probe/1.0)' } }, r => {
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
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

async function fetchWithRetry(u) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await get(u);
      if (r.status === 503 || r.status === 429) { await sleep(1500 * attempt); continue; }
      return r;
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(1200 * attempt);
    }
  }
  return { status: 503, html: '' };
}

const tasks = [];
for (const loc of locales) for (const s of slugs) tasks.push([loc, s]);

(async () => {
  const results = [];
  let i = 0;
  async function worker(id) {
    while (i < tasks.length) {
      const [loc, s] = tasks[i++];
      const u = `https://zprintpro.com/${loc}/blog/${s}/`;
      try {
        const { status, html } = await fetchWithRetry(u);
        const md = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
                || html.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
        const og = /<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i.exec(html);
        results.push({
          loc, slug: s, status,
          desc: md ? md[1] : null,
          descLen: md ? md[1].length : 0,
          og: og ? og[1] : null,
        });
      } catch (e) {
        results.push({ loc, slug: s, status: 'ERR', err: e.message, desc: null, descLen: 0, og: null });
      }
      await sleep(120);
    }
  }
  await Promise.all([1, 2, 3].map(worker));

  const ok200 = results.filter(r => r.status === 200);
  const missing = ok200.filter(r => !r.desc || !r.desc.trim());
  const present = ok200.filter(r => r.desc && r.desc.trim());
  const other = results.filter(r => r.status !== 200);

  const L = [];
  L.push('=== 修復後線上探針 (commit c4146e7f) ===');
  L.push('總請求: ' + tasks.length + ' | HTTP200: ' + ok200.length + ' | 非200: ' + other.length);
  L.push('有 name="description": ' + present.length);
  L.push('★ 仍缺 name="description": ' + missing.length);
  L.push('');
  if (missing.length) {
    L.push('仍缺清單:');
    for (const m of missing) L.push('   ' + m.loc + '/' + m.slug);
    L.push('');
  }
  // og:description 覆蓋
  L.push('og:description 有值: ' + ok200.filter(r => r.og && r.og.trim()).length + ' / ' + ok200.length);
  const ogMissing = ok200.filter(r => !r.og || !r.og.trim());
  if (ogMissing.length) {
    L.push('★ 缺 og:description (' + ogMissing.length + '):');
    for (const m of ogMissing.slice(0, 40)) L.push('   ' + m.loc + '/' + m.slug);
  }
  L.push('');
  // 抽樣 20 條實際描述
  L.push('抽樣 (前 20 條實測描述):');
  for (const p of present.slice(0, 20)) L.push('   ' + p.loc + '/' + p.slug + ' [' + p.descLen + '] ' + p.desc.slice(0, 110));
  L.push('');
  if (other.length) {
    L.push('非 200 (' + other.length + '):');
    const byStatus = {};
    for (const o of other) byStatus[o.status] = (byStatus[o.status] || 0) + 1;
    L.push('   狀態分佈: ' + JSON.stringify(byStatus));
    for (const o of other.slice(0, 15)) L.push('   ' + o.loc + '/' + o.slug + ' -> ' + o.status + ' ' + (o.err || ''));
  }
  fs.writeFileSync(OUT, L.join('\n'), 'utf8');
  fs.writeFileSync(OUT.replace(/\.txt$/, '.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log(L.join('\n'));
})();
