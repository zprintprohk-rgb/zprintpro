/* 2026-11-25 blog 详情页补充探针 — JSON-LD 类型 + hreflang（含 raw 出现位置上下文） */
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

(async () => {
  const url = 'https://zprintpro.com/zh-hk/blog/corporate-calendar-customization-2027/';
  const res = await fetch(url, { headers: { 'user-agent': UA, 'accept': '*/*' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  const body = await res.text();
  const out = { url, status: res.status, bodyLength: body.length, utf8Bytes: Buffer.byteLength(body, 'utf8'), probeTs: new Date().toISOString() };
  const m = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i); out.title = m ? m[1].replace(/\s+/g, ' ').trim() : null;
  const h = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i); out.h1 = h ? h[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const blocks = []; let mm;
  while ((mm = re.exec(body))) blocks.push(mm[1].trim());
  function collectTypes(x, acc) {
    if (Array.isArray(x)) { x.forEach(v => collectTypes(v, acc)); return; }
    if (x && typeof x === 'object') {
      if (x['@type'] !== undefined) { if (Array.isArray(x['@type'])) x['@type'].forEach(t => acc.push(String(t))); else acc.push(String(x['@type'])); }
      for (const k of Object.keys(x)) collectTypes(x[k], acc);
    }
  }
  const parseTypes = []; let ok = 0, fail = 0;
  for (const b of blocks) { try { const j = JSON.parse(b); ok++; collectTypes(j, parseTypes); } catch (e) { fail++; } }
  out.ld = { blockCount: blocks.length, parseOk: ok, parseFail: fail, parseTypes };
  const tags = []; const re2 = /<link[^>]*>/gi;
  while ((mm = re2.exec(body))) {
    const t = mm[0];
    if (/rel\s*=\s*["']?alternate/i.test(t) && /hreflang\s*=/i.test(t)) {
      const hh = t.match(/hreflang\s*=\s*["']([^"']+)["']/i);
      const hr = t.match(/href\s*=\s*["']([^"']+)["']/i);
      tags.push({ hreflang: hh ? hh[1] : null, href: hr ? hr[1] : null });
    }
  }
  out.hreflang = { count: tags.length, list: tags };
  const raws = []; const re3 = /hreflang/gi;
  while ((mm = re3.exec(body))) raws.push(body.slice(Math.max(0, mm.index - 90), mm.index + 140).replace(/\s+/g, ' '));
  out.rawHreflangCount = raws.length; out.rawContexts = raws;
  fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'tmp-blogprobe-result-20261125.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log(JSON.stringify(out, null, 2));
})().catch(e => { console.error('FATAL', e); process.exit(1); });
