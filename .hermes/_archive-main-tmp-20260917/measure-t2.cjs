#!/usr/bin/env node
/* 只读: TS 内 zh-hk imageAlt 尾缀 ZprintPro 行 (T2 目标计数) */
const fs = require('fs');
const t = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts', 'utf8');
const ls = t.split(/\r?\n/);
const re = /"zh-hk":\s*".*\| ZprintPro"\s*,?\s*$/;
const hits = ls.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l));
console.log('zh-hk imageAlt/类字段 尾缀 ZprintPro 行数 =', hits.length);
hits.forEach(([n, l]) => console.log(`  L${n}: ${l.trim().slice(0, 130)}`));
// 全 TS 内 "| ZprintPro"" 总计数 (含 en/ja)
const all = (t.match(/\| ZprintPro"/g) || []).length;
console.log('全 TS 「| ZprintPro"」总数 =', all);
