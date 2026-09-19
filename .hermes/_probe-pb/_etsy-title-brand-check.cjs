'use strict';
/** 核对 Etsy 标题方案的品牌写法 + 各长度口径 (提交前自证) */
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));

const T_OK = 'Etsy Seller Printing: 1 Copy, Free Proof | ZprintPro';   // 正确品牌写法
const T_TYPO = 'Etsy Seller Printing: 1 Copy, Free Proof | Zprintpro'; // K3 确认表里的写法
const HALF = (s) => s.length;
const EQ = (s) => [...s].reduce((n, c) => n + (/[\u3000-\u9FFF\uFF00-\uFF60]/.test(c) ? 2 : 1), 0);

console.log('=== 长度核对 ===');
for (const [label, t] of [['正确写法 ZprintPro', T_OK], ['K3 表内写法 Zprintpro', T_TYPO]]) {
  console.log(`  ${label}: 半角 ${HALF(t)} / 当量 ${EQ(t)}  ${HALF(t) >= 50 && HALF(t) <= 54 ? '✅ 写满区' : '⚠️'}`);
}

console.log('\n=== 品牌写法门禁核对 (门童 #3 / brand-guard) ===');
const brand = require(path.join(REPO, 'scripts', 'guards', 'brand-guard.js'));
for (const [label, t] of [['ZprintPro', T_OK], ['Zprintpro', T_TYPO]]) {
  const hits = (brand.RULES || []).flatMap(r => {
    r.pattern.lastIndex = 0;
    return r.pattern.test(t) ? [{ id: r.id, name: r.name, sev: r.severity }] : [];
  });
  console.log(`  ${label}: ${hits.length ? hits.map(h => `${h.id}(${h.sev})`).join(', ') : '0 命中'}`);
}

console.log('\n=== 现有站内品牌写法统计 (en.json, 作为事实基准) ===');
const fs = require('fs');
const en = fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-data', 'en.json'), 'utf8');
for (const v of ['ZprintPro', 'Zprintpro', 'ZPrintPro', 'zprintpro']) {
  console.log(`  ${v}: ${en.split(v).length - 1}`);
}
