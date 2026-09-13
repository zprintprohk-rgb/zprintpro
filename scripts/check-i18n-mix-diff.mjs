#!/usr/bin/env node
/**
 * scripts/check-i18n-mix-diff.mjs — 流程补偿工具 (2026-09-13, 千问复核要求)
 *
 * 用途: 凡触碰 src/data/** 的批次, commit 前跑一次, 输出 **staged diff 的语言混用命中**
 *       供人工判读 (report-only, 永不 exit 1 —— 门禁的 red 规则由 check-regression-guard 负责)。
 *
 * 为什么需要: 门禁的语言混用检查已升级为「locale 作用域」判定, 但判定是启发式
 *   (最近左侧 locale 键), 对三元表达式/模板串等代码写法可能判错; 数据文件改动因此加一道人工复核。
 *
 * 用法:
 *   node scripts/check-i18n-mix-diff.mjs            # 只看 staged
 *   node scripts/check-i18n-mix-diff.mjs HEAD~1     # 看某次提交与当前的差异
 */
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const common = require('./guards/common.js');

const RANGE = process.argv[2] ? `${process.argv[2]}` : '--cached';
let diff = '';
try {
  diff = execSync(`git diff ${RANGE} -U0 -- src/data`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
} catch (e) { console.log('(无 diff 或 git 报错:', e.message, ')'); process.exit(0); }

const SIMPLIFIED = /[复电业为发这们个时来会说过对开现应学页]/g;
const BRANDS = [
  { re: /ZprintPro/g, badIn: ['zh-hk'] },
  { re: /智印港/g, badIn: ['en', 'ja'] },
  { re: /ジープリント/g, badIn: ['zh-hk', 'en'] },
];
const CURRENCY = /US\$|USD|JPY|￥/g;

const files = diff.split(/^diff --git /m).slice(1);
let total = 0;
for (const chunk of files) {
  const fileRel = (chunk.match(/a\/(\S+) b\//) || [, '?'])[1];
  const added = chunk.split(/\r?\n/).filter(l => l.startsWith('+') && !l.startsWith('+++'));
  if (!added.length) continue;
  // 用「已存在文件内容 + 新增行」重建上下文, 以便 locale 判定 (简化: 直接对新增行文本判定, 判不出则标 '?')
  const ctx = (() => { try { return execSync(`git show :${fileRel}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch { return ''; } })();
  const rows = [];
  for (const l of added) {
    const text = l.slice(1);
    const loc = common.resolveLocale(ctx || text, (ctx || text).length, fileRel);
    let flag = null;
    if (loc === 'zh-hk' && SIMPLIFIED.test(text)) flag = '简体字 (zh-hk 字段)';
    SIMPLIFIED.lastIndex = 0;
    if (loc === 'zh-hk' && CURRENCY.test(text)) flag = flag || '币种非 HK$ (zh-hk 字段)';
    CURRENCY.lastIndex = 0;
    for (const b of BRANDS) {
      b.re.lastIndex = 0;
      if (b.re.test(text) && loc && b.badIn.includes(loc)) flag = `${b.re.source} 出现在 ${loc} 字段`;
      b.re.lastIndex = 0;
    }
    if (flag) { rows.push(`  [${loc || '?'}] ${flag} :: ${text.trim().slice(0, 110)}`); total++; }
  }
  if (rows.length) { console.log(`\n=== ${fileRel} (${rows.length}) ===`); rows.forEach(r => console.log(r)); }
}
console.log(`\n语言混用候选合计: ${total} 条 (report-only; 请人工确认是否为真混用)`);
process.exit(0);
