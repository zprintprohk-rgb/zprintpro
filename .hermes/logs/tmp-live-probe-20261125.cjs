/* 2026-11-25 live 探针 — 串行、间隔 2.2s、状态码+marker+长度三重校验；异常标 INVALID 不计 0 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BASE = 'https://zprintpro.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const INTERVAL_MS = 2200;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function httpGet(url) {
  const rec = { url };
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA, 'accept': '*/*', 'accept-language': 'zh-HK,zh;q=0.9,en;q=0.8,ja;q=0.7' },
      redirect: 'follow',
      signal: AbortSignal.timeout(30000)
    });
    const body = await res.text();
    rec.status = res.status;
    rec.finalUrl = res.url;
    rec.contentType = res.headers.get('content-type');
    rec.bodyLength = body.length;
    rec.elapsedMs = Date.now() - t0;
    rec.body = body;
  } catch (e) {
    rec.status = 'ERR';
    rec.error = String((e && e.message) || e);
    rec.elapsedMs = Date.now() - t0;
    rec.body = '';
  }
  return rec;
}

function isChallenge(rec) {
  if (rec.status === 403 || rec.status === 503) return true;
  const b = rec.body || '';
  return /Just a moment|cf-chl|cf-browser-verification|Attention Required/i.test(b);
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : null;
}
function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return null;
  return { text: m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(), raw: m[0].replace(/\s+/g, ' ').slice(0, 300) };
}
function extractLdBlocks(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = []; let m;
  while ((m = re.exec(html))) blocks.push(m[1].trim());
  return blocks;
}
function collectTypes(x, acc) {
  if (Array.isArray(x)) { x.forEach(v => collectTypes(v, acc)); return; }
  if (x && typeof x === 'object') {
    if (x['@type'] !== undefined) {
      if (Array.isArray(x['@type'])) x['@type'].forEach(t => acc.push(String(t)));
      else acc.push(String(x['@type']));
    }
    for (const k of Object.keys(x)) collectTypes(x[k], acc);
  }
}
function ldInfo(html) {
  const blocks = extractLdBlocks(html);
  const parseTypes = []; let parseOk = 0, parseFail = 0;
  for (const b of blocks) {
    try { const j = JSON.parse(b); parseOk++; collectTypes(j, parseTypes); } catch (e) { parseFail++; }
  }
  const regexTypes = [];
  let m2; const re2 = /"@type"\s*:\s*"([^"]+)"/g;
  while ((m2 = re2.exec(html))) regexTypes.push(m2[1]);
  return { blockCount: blocks.length, parseOk, parseFail, parseTypes, regexTypes };
}
function hreflangInfo(html) {
  const tags = [];
  let m; const re = /<link[^>]*>/gi;
  while ((m = re.exec(html))) {
    const t = m[0];
    if (/rel\s*=\s*["']?alternate/i.test(t) && /hreflang\s*=/i.test(t)) {
      const h = t.match(/hreflang\s*=\s*["']([^"']+)["']/i);
      const hr = t.match(/href\s*=\s*["']([^"']+)["']/i);
      tags.push({ hreflang: h ? h[1] : null, href: hr ? hr[1] : null });
    }
  }
  const rawCount = (html.match(/hreflang\s*=/gi) || []).length;
  return { count: tags.length, rawHreflangAttrCount: rawCount, list: tags };
}
function sitemapInfo(xml) {
  const lines = xml.split(/\r?\n/);
  const lastmods = []; let m; const re = /<lastmod>([^<]+)<\/lastmod>/g;
  while ((m = re.exec(xml))) lastmods.push(m[1]);
  const locs = []; const re2 = /<loc>([^<]+)<\/loc>/g;
  while ((m = re2.exec(xml))) locs.push(m[1]);
  let lastmodMax = null;
  for (const lm of lastmods) {
    const t = Date.parse(lm);
    if (!lastmodMax || (t && t > Date.parse(lastmodMax))) lastmodMax = lm;
  }
  return { first5Lines: lines.slice(0, 5), lastmodCount: lastmods.length, lastmodMin: lastmods.slice().sort()[0] || null, lastmodMax, locCount: locs.length, locs: locs.slice(0, 20) };
}

function finalize(rec) {
  rec.challengeSuspected = isChallenge(rec);
  rec.valid = (rec.status === 200 && !rec.challengeSuspected && (rec.bodyLength || 0) > 300) ? 'OK' : 'INVALID';
  if (rec.name === 'robots') {
    rec.robotsFull = rec.body || '';
    rec.markerUserAgent = /user-agent/i.test(rec.body || '');
  }
  if (rec.name === 'sitemap-index' || rec.name === 'sitemap-fallback-root') rec.sitemap = sitemapInfo(rec.body || '');
  if (rec.name === 'manifest') {
    try { const j = JSON.parse(rec.body || '{}'); rec.manifestName = j.name; rec.manifestShortName = j.short_name; }
    catch (e) { rec.manifestParseError = String(e); }
  }
  if (rec.name === 'llms-root') {
    const lines = (rec.body || '').split(/\r?\n/);
    rec.llmsFirstNonEmpty = lines.find(l => l.trim().length > 0) || '';
    rec.llmsBytes = Buffer.byteLength(rec.body || '', 'utf8');
  }
  if (/^(home|cat)-/.test(rec.name) || rec.name === 'pdp-food-boxes') {
    rec.title = extractTitle(rec.body || '');
    rec.h1 = extractH1(rec.body || '');
    rec.ld = ldInfo(rec.body || '');
    rec.hreflang = hreflangInfo(rec.body || '');
  }
  if (rec.name === 'pdp-food-boxes') {
    rec.hasProduct = /"@type"\s*:\s*"Product"/.test(rec.body || '');
    rec.hasOffer = /"@type"\s*:\s*"Offer"/.test(rec.body || '');
    rec.hasFAQPage = /"@type"\s*:\s*"FAQPage"/.test(rec.body || '');
  }
  if (rec.name === 'blog-listing' && rec.status === 200) {
    const m = (rec.body || '').match(/href=["'](?:https?:\/\/zprintpro\.com)?\/zh-hk\/blog\/([a-z0-9\-]+)\/?["']/i);
    rec.pickedBlogSlug = m ? m[1] : null;
  }
  rec.bodySlice = (rec.body || '').slice(0, 1200);
  delete rec.body;
  if (rec.name === 'robots') rec.robotsFull = undefined; // 已单独留在下方输出
  return rec;
}

(async () => {
  const results = [];
  const steps = [
    ['robots', '/robots.txt'],
    ['sitemap-index', '/sitemap-index.xml'],
    ['manifest', '/manifest.json'],
    ['llms-root', '/llms.txt'],
    ['home-zh-hk', '/zh-hk/'],
    ['home-en', '/en/'],
    ['home-ja', '/ja/'],
    ['cat-flyers-zh', '/zh-hk/category/flyers/'],
    ['cat-stickers-en', '/en/category/stickers/'],
    ['cat-stickers-ja', '/ja/category/stickers/'],
    ['pdp-food-boxes', '/zh-hk/product/food-boxes/'],
    ['blog-listing', '/zh-hk/blog/']
  ];
  let robotsFull = '';
  for (const [name, p] of steps) {
    const rec = await httpGet(BASE + p);
    rec.name = name;
    rec.probeTs = new Date().toISOString();
    if (name === 'robots') robotsFull = rec.body || '';
    finalize(rec);
    results.push(rec);
    await sleep(INTERVAL_MS);
  }

  /* sitemap-index 失败时兜底 /sitemap.xml */
  const si = results.find(r => r.name === 'sitemap-index');
  if (!si || si.status !== 200 || !/<sitemapindex/i.test(si.body || '')) {
    const rec2 = await httpGet(BASE + '/sitemap.xml');
    rec2.name = 'sitemap-fallback-root';
    rec2.probeTs = new Date().toISOString();
    finalize(rec2);
    results.push(rec2);
    await sleep(INTERVAL_MS);
  }

  /* blog 详情页：从 listing 取第一个 slug */
  const bl = results.find(r => r.name === 'blog-listing');
  const slug = bl && bl.pickedBlogSlug;
  if (slug) {
    const rec = await httpGet(BASE + '/zh-hk/blog/' + slug + '/');
    rec.name = 'blog-page';
    rec.blogSlug = slug;
    rec.probeTs = new Date().toISOString();
    finalize(rec);
    results.push(rec);
  } else {
    results.push({ name: 'blog-page', valid: 'INVALID', error: 'blog listing 未取到 slug', probeTs: new Date().toISOString() });
  }

  const out = {
    meta: {
      base: BASE, ua: UA, intervalMs: INTERVAL_MS, node: process.version,
      hasNativeFetch: typeof fetch === 'function',
      startedAt: null, finishedAt: new Date().toISOString(),
      probeCount: results.length
    },
    robotsFullFromLive: robotsFull,
    results
  };
  const json = JSON.stringify(out, null, 2);
  fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'tmp-live-probe-result-20261125.json'), json, 'utf8');
  console.log(json);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
