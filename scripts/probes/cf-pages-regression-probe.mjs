// cf-pages-regression-probe.mjs — A2 CPU 治理批次线上回归探针 (2026-10-15)
// 用法: node scripts/probes/cf-pages-regression-probe.mjs [--base=https://zprintpro.com]
// 只读 GET/HEAD; 串行 + 间隔 (防限流假结果); 5xx/网络错误自动重试 1 次。
// 断言三类: 状态码/重定向目标/响应头特征 (A/B cookie 摘除 + 静态资产直出)。
// 结果写 .hermes/logs/<ts>-a2-probe.{json,md}; exit 1 = 有硬失败。
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith('--base='));
const BASE = (baseArg ? baseArg.split('=')[1] : 'https://zprintpro.com').replace(/\/$/, '');
const ROOT = process.cwd();
const ts = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-').slice(0, 13);
const outJson = path.join(ROOT, '.hermes', 'logs', `${ts}-a2-probe.json`);
const outMd = path.join(ROOT, '.hermes', 'logs', `${ts}-a2-probe.md`);

const B = (u) => BASE + u;

// 期望矩阵: { url, expect: 200|301|308|404, location?: 前缀或全等, notStatus?: [500,502,503], headers?: [{name, absent|contains}], bodyContains?: [] }
const MATRIX = [
  // —— 核心页 200 + 无 A/B cookie/header ——
  { url: '/zh-hk/', expect: 200, headers: [{ name: 'set-cookie', absent: 'zp_ab_bucket' }, { name: 'x-zp-ab-variant', absent: '' }], bodyContains: ['香港本地印刷'], maxTtfb: 2.5 },
  { url: '/en/', expect: 200, headers: [{ name: 'set-cookie', absent: 'zp_ab_bucket' }], maxTtfb: 2.5 },
  { url: '/ja/', expect: 200, headers: [{ name: 'set-cookie', absent: 'zp_ab_bucket' }], maxTtfb: 2.5 },
  { url: '/zh-hk/category/stickers/', expect: 200, maxTtfb: 2.5 },
  { url: '/zh-hk/product/roll-up-banners/', expect: 200, maxTtfb: 2.5 },
  { url: '/zh-hk/blog/', expect: 200, maxTtfb: 2.5 },
  { url: '/zh-hk/quote/', expect: 200, maxTtfb: 2.5 },
  { url: '/zh-hk/cart/', expect: 200 },
  { url: '/quote-desk/', expect: 200 },
  { url: '/zh-hk/help-center/', expect: 200 },
  // —— middleware 重定向行为 (必须原样保留) ——
  { url: '/', expect: 301, location: B('/zh-hk') },
  { url: '/about/', expect: 301, location: B('/zh-hk/about/') },
  { url: '/zh-HK/', expect: 301, location: B('/zh-hk') },
  { url: '/quote', expect: 301, location: B('/quote/') },
  { url: '/zh-hk/quote?product=foil-stickers', expect: 301, location: B('/zh-hk/product/foil-stickers/') },
  { url: '/zh-hk/product/drink-tokens/', expect: 301, location: B('/zh-hk/product/premium-greeting-cards/') },
  { url: '/zh-hk/product/premium-business-cards/', expect: 301, location: B('/zh-hk/product/premium-greeting-cards/') },
  { url: '/zh-hk/product/business-cards/', expect: 301, location: B('/zh-hk/category/greeting-cards/') },
  { url: '/zh-hk/category/business-cards/', expect: 301, location: B('/zh-hk/category/greeting-cards/') },
  { url: '/en/guide/packaging-guide/', expect: 301, location: B('/en/blog/packaging-box-custom-guide/') },
  { url: '/zh-hk/returns/', expect: 301, location: B('/zh-hk/help-center/') },
  { url: '/zh-hk/product/gift-boxes/', expect: 301, location: B('/zh-hk/product/rigid-boxes/') },
  { url: '/ja/services/same-day-printing-delivery/', expect: 301, location: B('/ja/services/rush-printing-delivery/') },
  { url: '/zh-hk/servis/rush-printing-delivery/', expect: 301, location: B('/zh-hk/services/rush-printing-delivery/') },
  { url: '/en/catalogs/', expect: 301, location: B('/en/category/books/') },
  { url: '/zh-hk/product/mesh-banners/', expect: 301, location: B('/zh-hk/product/outdoor-vinyl-banners/') },
  { url: '/zh-hk/product/fluorescent-stickers/', expect: 301, location: B('/zh-hk/product/roll-stickers/') },
  // —— 静态资产直出 ( Function 旁路: 无 x-matched-path + _headers 缓存头) ——
  { url: '/images/articles/brand-story.webp', expect: 200, headers: [{ name: 'x-matched-path', absent: '' }, { name: 'cache-control', contains: 'max-age=14400' }] },
  { url: '/robots.txt', expect: 200, headers: [{ name: 'x-matched-path', absent: '' }] },
  { url: '/sitemap.xml', expect: 200 },
  { url: '/sitemap-image.xml', expect: 200 },
  { url: '/manifest.zh-hk.json', expect: 200 },
  // —— API (edge, 必须仍工作) ——
  { url: '/api/search?q=sticker&locale=zh-hk', expect: 200 },
  // —— 扫描噪声: 不得 5xx ——
  { url: '/wp-login.php', expect: 404, notStatus: [500, 502, 503] },
  { url: '/.env', expect: 404, notStatus: [500, 502, 503] },
  { url: '/wp-admin/', notStatus: [500, 502, 503] },
  // —— 未知 slug: 404 (不再 500) ——
  { url: '/zh-hk/product/nonexistent-probe-a2/', expect: 404 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function fetchOnce(url) {
  const t0 = Date.now();
  const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'zp-a2-probe/1.0' } });
  const headers = {};
  res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
  const body = res.status < 300 || res.status === 404 ? await res.text() : '';
  return { status: res.status, headers, body, ttfb: (Date.now() - t0) / 1000, location: res.headers.get('location') };
}
async function probe(entry) {
  const url = entry.url.startsWith('http') ? entry.url : B(entry.url);
  let r;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try { r = await fetchOnce(url); break; }
    catch (e) { if (attempt === 2) return { ...entry, url, error: String(e), verdict: 'FAIL' }; await sleep(1500); }
  }
  const fails = [];
  if (entry.expect && r.status !== entry.expect) fails.push(`status ${r.status} != ${entry.expect}`);
  if (entry.notStatus && entry.notStatus.includes(r.status)) fails.push(`status ${r.status} in forbidden ${entry.notStatus}`);
  if (entry.location && !(r.location === entry.location)) fails.push(`location ${r.location} != ${entry.location}`);
  for (const h of entry.headers || []) {
    const v = r.headers[h.name];
    if (h.absent !== undefined && v !== undefined && v.toLowerCase().includes(h.absent.toLowerCase())) fails.push(`header ${h.name} should not contain "${h.absent}" (got "${v.slice(0, 60)}")`);
    if (h.absent !== undefined && h.absent === '' && v !== undefined) fails.push(`header ${h.name} should be absent (got value)`);
    if (h.contains && !(v || '').toLowerCase().includes(h.contains.toLowerCase())) fails.push(`header ${h.name} missing "${h.contains}" (got "${(v || '').slice(0, 60)}")`);
  }
  for (const s of entry.bodyContains || []) if (!r.body.includes(s)) fails.push(`body missing "${s}"`);
  if (entry.maxTtfb && r.ttfb > entry.maxTtfb) fails.push(`ttfb ${r.ttfb.toFixed(2)}s > ${entry.maxTtfb}s`);
  return { ...entry, url, status: r.status, location: r.location, ttfb: r.ttfb, verdict: fails.length ? 'FAIL' : 'PASS', fails };
}

const results = [];
for (const e of MATRIX) { results.push(await probe(e)); await sleep(1000); }
const failed = results.filter((r) => r.verdict === 'FAIL');
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(results, null, 2), 'utf8');
const md = [
  `# A2 线上回归探针 (${new Date().toISOString()}) base=${BASE}`,
  '', `PASS ${results.length - failed.length}/${results.length}; FAIL ${failed.length}`, '',
  '| url | status | ttfb | verdict | fails |', '|---|---|---|---|---|',
  ...results.map((r) => `| ${r.url} | ${r.status ?? r.error} | ${r.ttfb ? r.ttfb.toFixed(2) + 's' : '-'} | ${r.verdict} | ${(r.fails || []).join('; ') || ''} |`),
].join('\n');
fs.writeFileSync(outMd, md, 'utf8');
console.log(md);
console.log(`OUT: ${outJson}`);
process.exit(failed.length ? 1 : 0);
