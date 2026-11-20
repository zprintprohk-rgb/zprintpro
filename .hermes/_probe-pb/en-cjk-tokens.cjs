'use strict';
/** §5 附: en 值內 CJK 命中 逐行彙總 (按行去重, 避免逐字重複計數) + 中文 token 頻次 (按行計) */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const csv = fs.readFileSync(path.join(ROOT, '.hermes', 'logs', 'i18n-en-cjk-inventory-2026-09-19.csv'), 'utf8').split('\n').slice(1);

const perLine = new Map();   // file -> line -> {n, text}
for (const row of csv) {
  if (!row.trim()) continue;
  const m = row.match(/^"([^"]+)",(\d+),"(.|[\s\S])","([\s\S]*)"$/);
  if (!m) continue;
  const [, f, ln, , text] = m;
  const key = f + ':' + ln;
  if (!perLine.has(key)) perLine.set(key, { f, ln: Number(ln), n: 0, text });
  perLine.get(key).n++;
}

const rows = [...perLine.values()].sort((a, b) => b.n - a.n);
console.log('去重行數: ' + rows.length + ' / 字符級總命中: ' + rows.reduce((s, r) => s + r.n, 0));
console.log('\n--- 按行命中數 Top 15 (高 = 整段中文串入 en 值, 非專有名詞) ---');
rows.slice(0, 15).forEach(r => console.log(`${String(r.n).padStart(4)}  ${r.f}:${r.ln}\n      ${r.text.slice(0, 130)}`));

// token 頻次 = 出現該 token 的**行數** (非逐字重複)
const tokLines = new Map();
for (const r of rows) {
  for (const t of new Set(r.text.match(/[\u3400-\u9FFF]{2,}/g) || [])) tokLines.set(t, (tokLines.get(t) || 0) + 1);
}
const tok = [...tokLines.entries()].sort((a, b) => b[1] - a[1]);
console.log('\n--- 中文 token (按「出現行數」排序, Top 40) ---');
tok.slice(0, 40).forEach(([t, n]) => console.log(`${String(n).padStart(3)}  ${t}`));
fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'i18n-en-cjk-tokens-2026-09-19.csv'),
  ['token,lines'].concat(tok.map(([t, n]) => `"${t}",${n}`)).join('\n') + '\n', 'utf8');
console.log('\n已寫 .hermes/logs/i18n-en-cjk-tokens-2026-09-19.csv (token 頻次 = 出現行數)');
