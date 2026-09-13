#!/usr/bin/env node
/**
 * scripts/rollback-title-batch.mjs — T 批单批回滚 (千问要求 ①「附回滚映射」的配套工具)
 *
 * 用法:
 *   node scripts/rollback-title-batch.mjs .hermes/rollback-T1-<ts>.json [--dry]
 *
 * 机制: 用映射里的 before/after 片段做**反向替换** (after -> before), 并断言:
 *   - 每个 after 片段在当前文件中恰好存在 1 次
 *   - 回滚后品牌违规定量回到映射记录的旧态 (before 片段出现)
 * 断言未过不写盘; 先备份当前文件到 .hermes/backup-rollback-<ts>/
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const MAP = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!MAP || !existsSync(join(ROOT, MAP))) { console.error('用法: node scripts/rollback-title-batch.mjs <rollback-json> [--dry]'); process.exit(2); }
const map = JSON.parse(readFileSync(join(ROOT, MAP), 'utf8'));
const items = map.items || [];
if (!items.length) { console.error('[FAIL] 映射为空'); process.exit(1); }

const byFile = new Map();
for (const it of items) { if (!byFile.has(it.file)) byFile.set(it.file, []); byFile.get(it.file).push(it); }

const errs = [], writes = [];
for (const [rel, arr] of byFile) {
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  let next = raw, applied = 0, missing = 0;
  for (const it of arr) {
    const after = it.afterSnippet, before = it.beforeSnippet;
    if (!after || !before) continue;
    const n = next.split(after).length - 1;
    if (n !== 1) { missing++; errs.push(`${rel} 反向替换失败 (after 片段出现 ${n} 次): ${after.slice(0, 60)}…`); continue; }
    next = next.replace(after, before);
    if (!next.includes(before)) errs.push(`${rel} 回滚后未见旧片段: ${before.slice(0, 60)}…`);
    applied++;
  }
  if (next === raw) errs.push(`${rel} 未发生任何回滚`);
  console.log(`[${rel}] 计划回滚 ${arr.length} 点, 实际 ${applied}, 失败 ${missing}`);
  writes.push({ rel, content: next });
}
if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.slice(0, 10).forEach(e => console.error('  - ' + e)); process.exit(1); }
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-rollback-${ts}`;
for (const w of writes) { const dst = join(ROOT, BK, w.rel); mkdirSync(dirname(dst), { recursive: true }); copyFileSync(join(ROOT, w.rel), dst); }
for (const w of writes) writeFileSync(join(ROOT, w.rel), w.content, 'utf8');
console.log(`[备份] → ${BK}\n[回滚] 完成 ${writes.length} 文件`);
