#!/usr/bin/env node
/* 只读: 目标项最终态核验 (对 git HEAD 内容, 不看工作树改动)
 * ① CSV ZH 列 ZprintPro = 0  ② products.ts alt 模板 = 0  ③ TS 15+ / zh-hk alt 尾缀 = 0
 */
const { execSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
const show = (p) => execSync(`git show HEAD:${p}`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const cnt = (s, n) => s.split(n).length - 1;

const csv = show('zprintpro-sku-seo-data.csv');
const lines = csv.replace(/\r/g, '').split('\n').filter(l => l.trim());
const hdr = lines[0].split('\t');
const zh = hdr.map((h, i) => i).filter(i => /\(ZH\)/.test(hdr[i]));
const enja = hdr.map((h, i) => i).filter(i => /\((EN|JA)\)/.test(hdr[i]));
let zhZ = 0, enjaZ = 0;
lines.slice(1).forEach(l => { const c = l.split('\t'); zh.forEach(i => zhZ += cnt(c[i] || '', 'ZprintPro')); enja.forEach(i => enjaZ += cnt(c[i] || '', 'ZprintPro')); });
console.log(`① CSV (HEAD): 数据行=${lines.length - 1} | ZH 列 ZprintPro=${zhZ} (期望 0) | EN/JA 列 ZprintPro=${enjaZ} (应为 >0 且合法)`);

const pr = show('src/data/products.ts');
console.log(`② products.ts (HEAD): ZprintPro智印港=${cnt(pr, 'ZprintPro智印港')} (期望 0) | title 面 智印港 ZprintPro=${cnt(pr, '智印港 ZprintPro')} (应保持 ~13 = 未动)`);

const ts = show('src/data/sku-seo-data.ts');
console.log(`③ sku-seo-data.ts (HEAD): "ZprintPro 15+ 年自有品牌"=${cnt(ts, 'ZprintPro 15+ 年自有品牌')} (期望 0) | "智印港 15+ 年自有品牌"=${cnt(ts, '智印港 15+ 年自有品牌')} (期望 9)`);
const altZh = (ts.match(/"zh-hk":\s*"[^"]*\| ZprintPro"/g) || []).length;
console.log(`   zh-hk imageAlt 尾缀 ZprintPro=${altZh} (期望 0)`);
console.log(`   entries=${(ts.match(/^  "[a-z0-9-]+":\s*\{/gm) || []).length} keys=${cnt(ts, '": {')} titles=${cnt(ts, '"title":')}`);
