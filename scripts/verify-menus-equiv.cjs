// 精确复算: 从文件读取实际 title 字节, 不靠手打
const fs = require('node:fs');
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const seo = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const b = [...seo.matchAll(/^(?: {2})"([a-z0-9-]+)": \{/gm)].map((m) => ({ s: m[1], i: m.index }));
b.push({ s: '__X__', i: seo.length });

const TARGETS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus', 'wedding-menu-cards'];

console.log(`band: ${TITLE_MIN}-${TITLE_MAX}`);
for (let k = 0; k < b.length - 1; k++) {
  if (!TARGETS.includes(b[k].s)) continue;
  const seg = seo.slice(b[k].i, b[k + 1].i);
  for (const l of ['zh-hk', 'en', 'ja']) {
    const m = seg.match(new RegExp(`"${l}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) continue;
    const t = m[1];
    const e = equiv(t);
    const codes = [...t].filter((c) => c.charCodeAt(0) > 126).map((c) => c.charCodeAt(0).toString(16));
    const nonAscii = [...t].filter((c) => c.charCodeAt(0) > 126).join('');
    console.log(
      `${b[k].s.padEnd(19)} ${l.padEnd(6)} e=${String(e).padStart(3)} len=${String(t.length).padStart(3)} ` +
        `${e < TITLE_MIN ? 'NEED+' + (TITLE_MIN - e) : e > TITLE_MAX ? 'OVER' : 'OK'} | CJK=[${nonAscii}] x${codes.length}`
    );
  }
}
