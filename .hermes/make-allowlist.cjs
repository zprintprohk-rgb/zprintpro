#!/usr/bin/env node
/* 只读: 计算本批「正文面」允许清单 (排除 title 面与多行 locale-map 页 title)
 * 产出 .hermes/dual-brand-allowlist.json + 计数表
 */
const fs = require('fs');
const M = JSON.parse(fs.readFileSync('F:\\zprintpro-nextjs\\.hermes\\dual-brand-nontitle.json', 'utf8'));
const ROOT = 'F:\\zprintpro-main-tmp';
const OUT = 'F:\\zprintpro-nextjs\\.hermes\\dual-brand-allowlist.json';

const cache = {};
const linesOf = (rel) => {
  if (!cache[rel]) cache[rel] = fs.readFileSync(ROOT + '\\' + rel.replace(/\//g, '\\'), 'utf8').split(/\r?\n/);
  return cache[rel];
};
const LOCALE_KEY = /^['"]?(zh-hk|en|ja)['"]?\s*:/;
const TITLE_KEYWORDS = /(^|\s)(title|ogTitle|twitterTitle|h1|headline|seoTitle|metaTitle|indexTitle|pageTitle)\s*:/;

const allow = [], hold = [];
for (const item of M.items.filter(x => x.face === 'body')) {
  const line = linesOf(item.file)[item.line - 1] || '';
  const trimmed = line.trim();
  let reason = 'body-copy';
  if (LOCALE_KEY.test(trimmed)) reason = 'hold:locale-map-page-title';
  else if (TITLE_KEYWORDS.test(line)) reason = 'hold:own-line-title-key';
  (reason.startsWith('hold') ? hold : allow).push({ ...item, reason });
}
const table = {};
for (const a of allow) {
  table[a.file] = table[a.file] || { total: 0, forms: {} };
  table[a.file].total++;
  table[a.file].forms[a.form] = (table[a.file].forms[a.form] || 0) + 1;
}
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), allowCount: allow.length, holdCount: hold.length, allow, hold }, null, 1), 'utf8');
console.log(`允许清单 ${allow.length} 处 / 暂缓 ${hold.length} 处 -> ${OUT}\n`);
console.log('--- 允许清单 按文件 ---');
Object.entries(table).sort((a, b) => b[1].total - a[1].total).forEach(([f, v]) => console.log(`  ${String(v.total).padStart(4)}  ${f}  ${JSON.stringify(v.forms)}`));
console.log('\n--- 暂缓 (title 面, 留待 K3 指定窗口) ---');
const holdTable = {};
hold.forEach(h => { holdTable[h.file] = (holdTable[h.file] || 0) + 1; });
Object.entries(holdTable).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
