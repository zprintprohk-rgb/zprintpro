// E4 线上验收探针（push 部署完成后运行）— urllib 带 UA（方法1）
// 三锚渲染 + §9.1 基线无回归
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function fetch(url, cacheBuster = true) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    if (cacheBuster) u.searchParams.set('_e4', String(Date.now()));
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.get(u, { headers: { 'User-Agent': UA } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(new Error('timeout')); });
  });
}

const checks = [
  { url: 'https://zprintpro.com/en/blog/zine-small-batch-booklet-printing-guide/', needle: '<a href="/en/product/doujinshi-printing/">doujin circles</a>', label: 'E4-1 zine->PDP' },
  { url: 'https://zprintpro.com/en/product/doujinshi-printing/', needle: '<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>', label: 'E4-2 PDP->zine' },
  { url: 'https://zprintpro.com/en/product/doujinshi-printing/', needle: '<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>', label: 'E4-3 PDP->comiket' },
  { url: 'https://zprintpro.com/robots.txt', needle: 'User-agent: GPTBot', label: 'BASE robots 200+AI' },
  { url: 'https://zprintpro.com/en/blog/comiket-printing-prep-guide/', needle: '<h1', label: 'BASE comiket guide 200' },
  { url: 'https://zprintpro.com/ja/comiket-c109/', needle: 'C109', label: 'BASE ja C109 200' },
];

const results = [];
for (const c of checks) {
  try {
    const r = await fetch(c.url);
    const found = c.needle === '<h1' ? r.status === 200 : r.body.includes(c.needle);
    results.push({ label: c.label, status: r.status, found, len: r.body.length });
    console.log(`${c.label}: HTTP ${r.status} | needle=${found} | len=${r.body.length}`);
  } catch (e) {
    results.push({ label: c.label, error: String(e.message || e) });
    console.log(`${c.label}: ERROR ${e.message || e}`);
  }
}
fs.writeFileSync('.hermes/logs/2026-10-27-e4-online-verify.json', JSON.stringify(results, null, 2), 'utf8');
const pass = results.every((r) => !r.error && r.status === 200 && r.found);
console.log(pass ? '=== E4 ONLINE VERIFY PASS ===' : '=== E4 ONLINE VERIFY FAIL ===');
process.exit(pass ? 0 : 1);
