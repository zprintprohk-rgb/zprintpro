#!/usr/bin/env node
/* 只读: T1 探针清单逐点全探 (千问条件 ②) — 22 个受影响 blog URL × 品牌口径断言 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const files = fs.readdirSync(path.join(ROOT, '.hermes')).filter(f => /^probe-T1-.*\.json$/.test(f)).sort();
if (!files.length) { console.error('未找到探针清单'); process.exit(1); }
const target = files[files.length - 1];
const { targets } = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes', target), 'utf8'));
console.log(`探针清单: ${target} | 目标 ${targets.length} 个 URL\n`);
(async () => {
  let ok = 0, bad = 0, fail = [];
  for (const t of targets) {
    try {
      const r = await fetch(t.url + '?cb=' + Date.now(), { headers: { 'user-agent': 'zprintpro-probe/1.0', 'cache-control': 'no-cache' } });
      const h = await r.text();
      if (r.status !== 200 || h.length < 5000) { bad++; fail.push(`${t.url} HTTP ${r.status} len=${h.length}`); continue; }
      // 该 locale 页面不应含对方品牌 (zh-hk 页禁 ZprintPro/ジープリント; en/ja 页禁 智印港)
      const oppose = t.locale === 'zh-hk' ? ['ZprintPro', 'ジープリント'] : ['智印港'];
      const found = oppose.filter(s => h.split(s).length - 1 > 0).map(s => `${s}×${h.split(s).length - 1}`);
      if (found.length) { bad++; fail.push(`${t.url} 仍含 ${found.join(' ')}`); } else ok++;
    } catch (e) { bad++; fail.push(`${t.url} ERR ${e.message}`); }
  }
  console.log(`逐点全探: 通过 ${ok} / 失败 ${bad} (共 ${targets.length})`);
  fail.slice(0, 15).forEach(f => console.log('  ✗ ' + f));
  process.exit(bad ? 1 : 0);
})();
