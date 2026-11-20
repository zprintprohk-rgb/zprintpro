#!/usr/bin/env node
/* 只读: 线上探针 — 单品牌残留是否已上线 (zh-hk 页不应出现 ZprintPro) */
const fs = require('fs');
const ts = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts', 'utf8');
const lines = ts.split(/\r?\n/);

// 找 zh-hk description 含 ZprintPro 的 entry slug
const hits = [];
let slug = null, cur = null;
lines.forEach((l) => {
  const s = l.match(/^  "([a-z0-9-]+)":\s*\{/);
  if (s) slug = s[1];
  const m = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
  if (m) cur = m[1];
  if (cur === 'zh-hk' && /"description":/.test(l) && /ZprintPro/.test(l)) hits.push(slug);
});
console.log('zh-hk description 含 ZprintPro 的 SKU:', hits.length);
console.log(hits.join(', '));

const BASE = 'https://zprintpro.com';
(async () => {
  const targets = hits.slice(0, 3);
  for (const s of targets) {
    const url = `${BASE}/zh-hk/product/${s}`;
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'zprintpro-probe/1.0' } });
      const html = await r.text();
      const z = (html.match(/ZprintPro/g) || []).length;
      const c = (html.match(/智印港/g) || []).length;
      const dual = (html.match(/ZprintPro\s*智印港/g) || []).length;
      console.log(`${r.status} ${url} | ZprintPro=${z} 智印港=${c} 双品牌=${dual}`);
      const m = html.match(/.{0,60}ZprintPro.{0,60}/);
      if (m) console.log('   样本:', m[0].replace(/\s+/g, ' ').slice(0, 160));
    } catch (e) {
      console.log(`ERR ${url}: ${e.message}`);
    }
  }
})();
