#!/usr/bin/env node
/* 批次验收 (2026-09-13): 单品牌化 / 月曆 en+ja Pillar / 指纹清毒 / blog hero 去色块
 * 只读断言脚本 — 不写盘。per §0.26.9 用 Node utf8 判定 CJK。
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const rd = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

let fail = 0;
const ok = (name, val, expect) => {
  const pass = val === expect;
  if (!pass) fail++;
  console.log(`${pass ? 'PASS' : 'FAIL'} | ${name} = ${val} (expect ${expect})`);
};
const count = (s, needle) => s.split(needle).length - 1;

// 1. CSV 双品牌 (基准: 表头 TSV 制表符分隔; 59 regen 前 ZprintPro=628, 单品牌化后 559 = 差 69 处 zh-hk 尾缀)
const csv = rd('zprintpro-sku-seo-data.csv');
const csvLines = csv.split(/\r?\n/).filter(l => l.trim());
const csvHdr = csvLines[0].split('\t');
ok('CSV 表头列数', csvHdr.length > 20, true);
ok('CSV 数据行数', csvLines.length - 1, 75);
ok('CSV 同行/同格双品牌', /智印港\s*ZprintPro/.test(csv) ? 1 : 0, 0);
// ZH 列不得含 ZprintPro; EN/JA 列不得含 智印港
let zhLeak = 0, enjaLeak = 0, dualCell = 0;
csvLines.slice(1).forEach(l => {
  const cells = l.split('\t');
  cells.forEach((c, i) => {
    const h = csvHdr[i] || '';
    const hasZ = /ZprintPro/.test(c), hasC = /智印港/.test(c);
    if (hasZ && hasC) dualCell++;
    if (/\(ZH\)/.test(h) && hasZ) zhLeak++;
    if (/\((EN|JA)\)/.test(h) && hasC) enjaLeak++;
  });
});
ok('CSV ZH 列含 ZprintPro', zhLeak, 0);
ok('CSV EN/JA 列含 智印港', enjaLeak, 0);
ok('CSV 同格双品牌', dualCell, 0);
ok('CSV 智印港 出现数', count(csv, '智印港') >= 69, true);
ok('CSV ZprintPro 出现数', count(csv, 'ZprintPro'), 559);

// 2. TS 派生文件
const ts = rd('src/data/sku-seo-data.ts');
ok('TS "智印港 ZprintPro"', count(ts, '智印港 ZprintPro'), 0);
ok('TS 双竖线 "| |"', count(ts, '| |'), 0);
const t1 = /"400g 超厚名片印刷 \| 厚卡・燙金・壓紋 \| 智印港"/.test(ts);
const t2 = /"燙金名片印刷 \| 金・銀・玫瑰金 \| 智印港"/.test(ts);
ok('TS 名片 title#1 尾缀=智印港', t1, true);
ok('TS 名片 title#2 尾缀=智印港', t2, true);

// 3. blog-data 指纹清毒
for (const loc of ['zh-hk', 'en', 'ja']) {
  const b = rd(`src/data/blog-data/${loc}.json`);
  ok(`${loc} "18,500"`, count(b, '18,500'), 0);
  ok(`${loc} "linkedin"`, (b.match(/linkedin/gi) || []).length, 0);
  const fake = ['張志明', '陳志明', 'Alex Zhang', 'Andy Cheung']
    .reduce((a, n) => a + count(b, n), 0);
  ok(`${loc} 假作者`, fake, 0);
}

// 4. blog 详情页 hero 去色块
const hero = rd('src/app/[locale]/blog/[slug]/page.tsx');
ok('blog hero royal-navy-grad', count(hero, 'royal-navy-grad'), 0);
ok('blog hero min-h-[380px]', count(hero, 'min-h-[380px]'), 0);

// 5. AGENTS.md 两条新规则 + 截断警告基线
const ag = rd('AGENTS.md');
ok('AGENTS 禁 pwsh 内联 node', /禁.*pwsh.*内联|内联 `node -e`/.test(ag) ? 1 : 0, 1);
ok('AGENTS 写入三件套', /三件套/.test(ag) ? 1 : 0, 1);

console.log(fail === 0 ? '\n=== ALL PASS ===' : `\n=== ${fail} FAIL ===`);
process.exit(fail === 0 ? 0 : 1);
