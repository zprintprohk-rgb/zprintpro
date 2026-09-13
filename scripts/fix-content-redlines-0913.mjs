#!/usr/bin/env node
/**
 * scripts/fix-content-redlines-0913.mjs — 内容红线两处 (2026-09-13, 门禁补扫发现)
 *
 * ① src/app/[locale]/contact/error.tsx: 联络页错误页 tel 链接数字错误
 *      现状 href="tel:+86198108851334" (13 位) ≠ 真实号码 +86 198 8085 1334
 *      → 纯技术止损 (用户可见按钮拨错号), 修正为该文件内已存在的正确号码
 * ② src/data/blog-posts.ts: 3 处假证号 FSC-C123456 (zh-hk/en/ja 同一篇 blog 摘要)
 *      → SOP-10 第 4 款 (K3 8/24 18:42+19:03 拍板): certNo 撤为空/不留具体证号
 *      修法: 「FSC-C123456 認證/certified/認証」→「FSC 認證/certified/認証」(保留 FSC 描述, 去掉伪造号)
 *
 * §12 三件套: 计数断言 + 结果形状断言 + 备份; 断言未过不写盘。
 * 用法: node scripts/fix-content-redlines-0913.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const cnt = (s, n) => s.split(n).length - 1;
const errs = [], edits = [];

/* ① 电话 */
{
  const rel = 'src/app/[locale]/contact/error.tsx';
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const BAD = 'tel:+86198108851334', GOOD = 'tel:+8619880851334';
  if (cnt(raw, BAD) !== 1) errs.push(`${rel} 计数断言失败: 错号出现 ${cnt(raw, BAD)} 次 (期望 1)`);
  if (cnt(raw, '19880851334') < 1) errs.push(`${rel} 前置断言失败: 文件内未见正确号码 19880851334 (期望 >=1, 作为展示文本)`);
  const next = raw.split(BAD).join(GOOD);
  if (cnt(next, BAD) !== 0) errs.push(`${rel} 形状断言失败: 错号仍存在`);
  if (cnt(next, GOOD) !== 1) errs.push(`${rel} 形状断言失败: 正确 tel: 链接数 != 1`);
  if (next.length !== raw.length + (GOOD.length - BAD.length)) errs.push(`${rel} 长度差断言失败`);
  edits.push({ rel, content: next, note: `① 电话 ${BAD} → ${GOOD}` });
}

/* ② 假证号 */
{
  const rel = 'src/data/blog-posts.ts';
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const BAD = 'FSC-C123456';
  const n = cnt(raw, BAD);
  if (n !== 3) errs.push(`${rel} 计数断言失败: ${BAD} 出现 ${n} 次 (期望 3)`);
  const next = raw.split(BAD).join('FSC');
  if (cnt(next, BAD) !== 0) errs.push(`${rel} 形状断言失败: 假证号仍存在`);
  if (cnt(next, 'FSC') !== cnt(raw, 'FSC')) errs.push(`${rel} 形状断言失败: FSC 计数应保持不变 (${cnt(raw, 'FSC')} → ${cnt(next, 'FSC')})`);
  // 形状: 不得出现 "FSC  FSC" / "FSCFSC" / 双空格
  if (/FSC\s{2,}FSC|FSCFSC/.test(next)) errs.push(`${rel} 形状断言失败: FSC 拼接畸形`);
  // 结构守恒
  ['"', '{', '}', '[', ']'].forEach(ch => {
    if (cnt(next, ch) !== cnt(raw, ch)) errs.push(`${rel} 结构断言失败: 「${ch}」数变化`);
  });
  edits.push({ rel, content: next, note: `② 假证号 ${BAD} ×${n} → FSC (SOP-10 #4)` });
}

if (errs.length) { console.error('[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
console.log('[断言通过]');
edits.forEach(e => console.log(`  ${e.rel}: ${e.note}`));
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-content-redlines-${ts}`;
for (const e of edits) { const dst = join(ROOT, BK, e.rel); mkdirSync(dirname(dst), { recursive: true }); copyFileSync(join(ROOT, e.rel), dst); }
console.log(`[备份] → ${BK}`);
for (const e of edits) writeFileSync(join(ROOT, e.rel), e.content, 'utf8');
let bad = 0;
for (const e of edits) {
  const t = readFileSync(join(ROOT, e.rel), 'utf8');
  if (e.rel.includes('blog-posts')) { if (cnt(t, 'FSC-C123456') !== 0) { console.error('[FAIL] 复验 假证号残留'); bad++; } }
  else if (cnt(t, 'tel:+86198108851334') !== 0) { console.error('[FAIL] 复验 错号残留'); bad++; }
}
console.log(bad ? `[FAIL] 复验 ${bad} 项` : '[复验] 全部一致');
process.exit(bad ? 1 : 0);
