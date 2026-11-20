/**
 * fingerprint-scan.cjs — 博客编造指纹验证清单 (只读, 2026-09-13 K3 批准执行)
 *
 * 目的: 审计子报告 B 声称 blog-data 内存在「18,500 / 張志明 / Alex Zhang / Andy Cheung /
 *       陳志明 / linkedin.com/in/zprintpro / 15 年」等编造指纹, 但当时未独立验证。
 *       本脚本用 Node 以 utf8 读取 (禁用 PowerShell 做 CJK 判定, 见 tool-lessons-2026-09-13.md),
 *       输出逐指纹 × 逐 locale 的精确计数与首个上下文样本, 供 K3 一次性拍板处置。
 *
 * 用法: node .hermes/fingerprint-scan.cjs
 */
const fs = require('fs');
const path = require('path');

const DIR = 'src/data/blog-data';
const FILES = ['zh-hk.json', 'en.json', 'ja.json'];
const FINGERPRINTS = [
  '18,500',
  '張志明',
  '陳志明',
  'Alex Zhang',
  'Andy Cheung',
  'linkedin.com/in/zprintpro',
  '15 年',
  '15年',
  'Daniel T.',
  'Maya L.',
  'Founded 2024',
];

console.log('=== 博客编造指纹验证清单 (Node utf8 口径) ===');
for (const f of FILES) {
  const p = path.join(DIR, f);
  if (!fs.existsSync(p)) { console.log(`\n[skip] ${f} 不存在`); continue; }
  const txt = fs.readFileSync(p, 'utf8');
  console.log(`\n--- ${f}  (${(txt.length / 1024).toFixed(0)} KB)`);
  for (const fp of FINGERPRINTS) {
    let n = 0;
    let first = -1;
    let i = txt.indexOf(fp);
    while (i >= 0) { n++; if (first < 0) first = i; i = txt.indexOf(fp, i + fp.length); }
    if (!n) continue;
    const seg = txt.slice(Math.max(0, first - 60), first + fp.length + 30).replace(/\s+/g, ' ');
    console.log(`  [${n} 处] ${fp}`);
    console.log(`        样本: ...${seg}...`);
  }
}
console.log('\n下一步: 按此清单出处置建议 (撤值/替换/保字段) 交 K3 一次批。');
