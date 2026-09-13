#!/usr/bin/env node
/**
 * scripts/fix-title-batch-T1c.mjs — T1 收尾: 三处真实红线修正 (2026-09-13)
 *
 * 起因: 修复守卫「500KB 静默盲区」后 (blog-data 单文件 650KB-1MB 原被跳过从未扫描),
 *       首次真扫 blog-data 暴露三类问题:
 *   (a) **我自己 T1 引入的畸形**: `ZprintPro (ZprintPro)` ×8 (en 1 / ja 7) —— 括注内品牌被同化
 *   (b) **伪造 FSC 证号**: `FSC C123456` / `FSC-C123456` / `FSC-C123456-ZP2024` ×27 (三语各 9)
 *       → SOP-10 第 4 款 (K3 8/24 拍板): certNo 撤空, 不留具体证号; 改为描述性 `FSC`
 *   (c) **zh-hk 简体字**: 「行业」×4 (应作「行業」)
 *
 * §12 三件套 + T 批配套 (回滚映射 + 备份); 断言未过不写盘。
 * 用法: node scripts/fix-title-batch-T1c.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = new Date().toISOString().replace(/[:.]/g, '-');
const cnt = (s, n) => s.split(n).length - 1;

// 规则: [文件 locale, 正则, 替换, 期望次数]
const FILES = {
  'zh-hk': [
    [/ZprintPro\s*\(ZprintPro\)/g, 'ZprintPro', 0],
    [/FSC[-\s]C123456-ZP2024/g, 'FSC', 2],
    [/FSC[-\s]C123456/g, 'FSC', 7],
    [/行业/g, '行業', 4],
  ],
  en: [
    [/ZprintPro\s*\(ZprintPro\)/g, 'ZprintPro', 1],
    [/FSC[-\s]C123456-ZP2024/g, 'FSC', 2],
    [/FSC[-\s]C123456/g, 'FSC', 7],
  ],
  ja: [
    [/ZprintPro\s*\(ZprintPro\)/g, 'ZprintPro', 7],
    [/FSC[-\s]C123456-ZP2024/g, 'FSC', 2],
    [/FSC[-\s]C123456/g, 'FSC', 7],
  ],
};

const errs = [], edits = [], rollback = [];
for (const [loc, rules] of Object.entries(FILES)) {
  const rel = `src/data/blog-data/${loc}.json`;
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  let json0; try { json0 = JSON.parse(raw); } catch (e) { errs.push(`${rel} 前置 JSON 非法: ${e.message}`); continue; }
  const keys0 = Object.keys(json0).length;
  let next = raw, fixed = 0;
  for (const [re, to, expect] of rules) {
    const n = (next.match(re) || []).length;
    if (expect && n !== expect) errs.push(`${rel} 计数断言失败: ${re.source} = ${n} (期望 ${expect})`);
    if (!n) continue;
    // 逐点记录回滚片段
    let m; const rx = new RegExp(re.source, re.flags);
    while ((m = rx.exec(next)) !== null) {
      rollback.push({ file: rel, token: m[0], before: m[0], after: to, offset: m.index });
    }
    next = next.replace(re, to);
    fixed += n;
  }
  // 后置形状
  for (const [re] of rules) if (re.test(next)) errs.push(`${rel} 形状断言失败: 仍残留 ${re.source}`);
  let json1; try { json1 = JSON.parse(next); } catch (e) { errs.push(`${rel} 后置 JSON 非法: ${e.message}`); continue; }
  if (Object.keys(json1).length !== keys0) errs.push(`${rel} 键数变化`);
  if (/ZprintPro\s*\(ZprintPro\)/.test(next)) errs.push(`${rel} 仍含重复品牌`);
  if (loc === 'zh-hk' && /[复电业为发这们个时来会说过对开现应学页]/.test(next)) errs.push(`${rel} 仍含简体字`);
  console.log(`[${rel}] 键=${keys0} 修 ${fixed} 处`);
  edits.push({ rel, content: next });
}

if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
console.log(`\n[断言通过] 回滚映射 ${rollback.length} 点`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const BK = `.hermes/backup-title-T1c-${TS}`;
mkdirSync(join(ROOT, BK), { recursive: true });
for (const e of edits) copyFileSync(join(ROOT, e.rel), join(ROOT, BK, e.rel.split('/').pop()));
writeFileSync(join(ROOT, `.hermes/rollback-T1c-${TS}.json`), JSON.stringify({ at: TS, note: 'T1c 回滚映射 (token 级)', items: rollback }, null, 1), 'utf8');
for (const e of edits) writeFileSync(join(ROOT, e.rel), e.content, 'utf8');
console.log(`[备份] → ${BK}\n[回滚] .hermes/rollback-T1c-${TS}.json (${rollback.length} 点)`);
