#!/usr/bin/env node
/* 只读: blog-data JSON 顶层结构 + 月曆/指纹定位 */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\src\\data\\blog-data\\';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const raw = fs.readFileSync(ROOT + loc + '.json', 'utf8');
  const j = JSON.parse(raw);
  const keys = Object.keys(j);
  console.log(`\n=== ${loc} === top-level type=${Array.isArray(j) ? 'array' : typeof j}; keys=${keys.length}: ${keys.slice(0, 5).join(', ')}`);
  const first = j[keys[0]];
  console.log(`   first value type=${Array.isArray(first) ? 'array(' + first.length + ')' : typeof first}`);
  if (Array.isArray(first) && first.length) console.log(`   item keys: ${Object.keys(first[0]).join(', ')}`);
  // 全量计数
  let total = 0, fps = {};
  const walk = (v) => {
    if (typeof v === 'string') { total += v.length; return; }
    if (Array.isArray(v)) return v.forEach(walk);
    if (v && typeof v === 'object') return Object.values(v).forEach(walk);
  };
  walk(j);
  ['18,500', 'linkedin', 'LinkedIn', '張志明', 'Alex Zhang'].forEach(k => {
    const n = (raw.split(k).length - 1);
    if (n) fps[k] = n;
  });
  console.log(`   全文字符数=${total} 指纹残留=${JSON.stringify(fps)}`);
  // 月曆 slug 线索
  const m = [...raw.matchAll(/"slug":\s*"([^"]*(?:calendar|monthly-planner|year-planner)[^"]*)"/gi)].map(x => x[1]);
  console.log(`   月曆类 slug: ${[...new Set(m)].join(', ') || '(none)'}`);
}
