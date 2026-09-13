#!/usr/bin/env node
/**
 * scripts/fix-single-brand-data-layer.mjs — 单品牌分层 数据层 ①②③ (K3 2026-09-13 批准)
 *
 * ① CSV `zprintpro-sku-seo-data.csv` (regen 源头, 列感知)
 *     图片Alt标签(ZH): 「| ZprintPro智印港」×69 / 「| ZprintPro」×6 → 「| 智印港」
 *     SEO标题(ZH) 尾缀 「| ZprintPro」×6 → 「| 智印港」
 *     SEO描述(ZH)/正文内容优化(ZH) 首字 「ZprintPro 」×6 → 「智印港 」
 *     EN/JA 列一字不动 (单品牌分层: en/ja = ZprintPro)
 * ② products.ts alt 兜底模板 `| ZprintPro智印港` → `| 智印港` (1 处, L8491)
 * ③ sku-seo-data.ts: 「ZprintPro 15+ 年自有品牌」×9 → 「智印港 15+ 年自有品牌」;
 *     zh-hk imageAlt 尾缀 「| ZprintPro」×4 → 「| 智印港」 (① 的 TS 镜像)
 *    ※ ③ 的源头 CSV 无此字串 (实测 0) → TS 目前是该字段唯一载体; CSV↔TS 同步列为下一窗口任务
 *
 * §12 危险写入「三件套」: ① 计数断言 ② 结果形状断言 ③ 备份; 断言未过不写盘。
 * 用法: node scripts/fix-single-brand-data-layer.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = 'src/data/sku-seo-data.ts';
const PR = 'src/data/products.ts';
const CSV = 'zprintpro-sku-seo-data.csv';

const cnt = (s, n) => s.split(n).length - 1;
const errs = [];
const edits = [];   // { file, content }

/* ---------- TS: ③ ---------- */
{
  const raw = readFileSync(join(ROOT, TS), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const before = { t1: cnt(raw, 'ZprintPro 15+ 年自有品牌'), t2: cnt(raw, '"zh-hk": "') /*placeholder*/ , z: cnt(raw, 'ZprintPro') };
  const lines = raw.split(/\r?\n/);
  // 尾随逗号必须保留 (v1 漏了 → 丢逗号 → tsc TS1005 ×4; 已加断言)
  const ALT_RE = /("zh-hk":\s*".*)\| ZprintPro(")(,?)\s*$/;
  let n1 = 0, n2 = 0;
  const out = lines.map((line, idx) => {
    let fixed = line;
    const c1 = cnt(fixed, 'ZprintPro 15+ 年自有品牌');
    if (c1) { fixed = fixed.split('ZprintPro 15+ 年自有品牌').join('智印港 15+ 年自有品牌'); n1 += c1; }
    if (ALT_RE.test(fixed)) {
      const m = fixed.match(ALT_RE);
      fixed = fixed.replace(ALT_RE, '$1| 智印港$2$3');
      const hadComma = /,\s*$/.test(line), hasComma = /,\s*$/.test(fixed);
      if (hadComma !== hasComma) errs.push(`${TS}:${idx + 1} 形状断言失败: 尾随逗号丢失 (原 ${hadComma} → ${hasComma})`);
      if (!m) errs.push(`${TS}:${idx + 1} 形状断言失败: alt 行匹配异常`);
      n2++;
    }
    if (fixed !== line) {
      if (cnt(fixed, '智印港 15+ 年自有品牌') < cnt(line, '智印港 15+ 年自有品牌') + cnt(line, 'ZprintPro 15+ 年自有品牌')) {
        errs.push(`${TS}:${idx + 1} 形状断言失败: 15+ 品牌替换不完整`);
      }
      if (/\|\s*\|/.test(fixed)) errs.push(`${TS}:${idx + 1} 形状断言失败: 出现「| |」`);
      // 结构性字符守恒 (引号/括号不得增减)
      ['"', '{', '}', '[', ']'].forEach(ch => {
        const a = cnt(line, ch), b = cnt(fixed, ch);
        if (a !== b) errs.push(`${TS}:${idx + 1} 结构断言失败: 「${ch}」数 ${a} → ${b}`);
      });
    }
    return fixed;
  });
  if (before.t1 !== 9) errs.push(`${TS} 计数断言失败: 「ZprintPro 15+ 年自有品牌」= ${before.t1} (期望 9)`);
  if (n1 !== 9) errs.push(`${TS} 替换数断言失败: 15+ 品牌改 ${n1} (期望 9)`);
  if (n2 !== 4) errs.push(`${TS} 替换数断言失败: zh-hk alt 尾缀改 ${n2} (期望 4)`);
  const next = out.join(eol);
  if (cnt(next, 'ZprintPro 15+ 年自有品牌') !== 0) errs.push(`${TS} 形状断言失败: 仍有「ZprintPro 15+」`);
  if (cnt(next, '智印港 15+ 年自有品牌') !== 9) errs.push(`${TS} 形状断言失败: 智印港 15+ 计数 != 9`);
  if (cnt(next, 'ZprintPro') !== before.z - 13) errs.push(`${TS} 文件级断言失败: ZprintPro ${before.z} → ${cnt(next, 'ZprintPro')} (期望 −13)`);
  edits.push({ file: TS, content: next, note: `③ T1=${n1} T2=${n2}` });
}

/* ---------- products.ts: ② ---------- */
{
  const raw = readFileSync(join(ROOT, PR), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const b = { dual: cnt(raw, 'ZprintPro智印港'), titleDual: cnt(raw, '智印港 ZprintPro'), z: cnt(raw, 'ZprintPro') };
  if (b.dual !== 1) errs.push(`${PR} 计数断言失败: 「ZprintPro智印港」= ${b.dual} (期望 1)`);
  const next = raw.split('ZprintPro智印港').join('智印港');
  const a = { dual: cnt(next, 'ZprintPro智印港'), titleDual: cnt(next, '智印港 ZprintPro'), z: cnt(next, 'ZprintPro') };
  if (a.dual !== 0) errs.push(`${PR} 形状断言失败: 仍残留「ZprintPro智印港」`);
  if (a.titleDual !== b.titleDual) errs.push(`${PR} 越界断言失败: title 面「智印港 ZprintPro」被改动 (${b.titleDual} → ${a.titleDual})`);
  if (a.z !== b.z - 1) errs.push(`${PR} 文件级断言失败: ZprintPro ${b.z} → ${a.z} (期望 −1)`);
  edits.push({ file: PR, content: next, note: `② alt 模板 1 处` });
}

/* ---------- CSV: ① ---------- */
{
  const raw = readFileSync(join(ROOT, CSV), 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.split(/\r?\n/);
  const hdr = lines[0].split('\t');
  const iA = hdr.indexOf('图片Alt标签(ZH)'), iT = hdr.indexOf('SEO标题(ZH)'), iD = hdr.indexOf('SEO描述(ZH)'), iB = hdr.indexOf('正文内容优化(ZH)');
  if ([iA, iT, iD, iB].some(x => x < 0)) errs.push(`${CSV} 列定位失败: ${[iA, iT, iD, iB].join(',')}`);
  const zhCols = hdr.map((h, i) => (i)).filter(i => /\(ZH\)/.test(hdr[i]));
  const enjaCols = hdr.map((h, i) => i).filter(i => /\((EN|JA)\)/.test(hdr[i]));
  const beforeEnJa = { z: 0, c: 0 };
  const stat = { altDual: 0, altPlain: 0, titleTail: 0, descHead: 0, bodyHead: 0 };
  const body = lines.slice(1).map((line, idx) => {
    if (!line.trim()) return line;
    const cells = line.split('\t');
    if (cells.length !== hdr.length) { errs.push(`${CSV} row${idx + 2} 列数 ${cells.length} != ${hdr.length}`); return line; }
    enjaCols.forEach(i => { beforeEnJa.z += cnt(cells[i] || '', 'ZprintPro'); beforeEnJa.c += cnt(cells[i] || '', '智印港'); });
    let a = cells[iA] || '';
    const d1 = cnt(a, '| ZprintPro智印港'); if (d1) { a = a.split('| ZprintPro智印港').join('| 智印港'); stat.altDual += d1; }
    const d2 = cnt(a, '| ZprintPro'); if (d2) { a = a.split('| ZprintPro').join('| 智印港'); stat.altPlain += d2; }
    cells[iA] = a;
    let t = cells[iT] || '';
    const t1 = cnt(t, '| ZprintPro'); if (t1) { t = t.split('| ZprintPro').join('| 智印港'); stat.titleTail += t1; }
    cells[iT] = t;
    let d = cells[iD] || '';
    const d3 = /^ZprintPro /.test(d) ? 1 : 0; if (d3) { d = d.replace(/^ZprintPro /, '智印港 '); stat.descHead += 1; }
    cells[iD] = d;
    let b2 = cells[iB] || '';
    const b3 = /^ZprintPro /.test(b2) ? 1 : 0; if (b3) { b2 = b2.replace(/^ZprintPro /, '智印港 '); stat.bodyHead += 1; }
    cells[iB] = b2;
    return cells.join('\t');
  });
  if (stat.altDual !== 69) errs.push(`${CSV} 计数断言失败: alt「| ZprintPro智印港」= ${stat.altDual} (期望 69)`);
  if (stat.altPlain !== 6) errs.push(`${CSV} 计数断言失败: alt「| ZprintPro」= ${stat.altPlain} (期望 6)`);
  if (stat.titleTail !== 6) errs.push(`${CSV} 计数断言失败: title 尾缀 = ${stat.titleTail} (期望 6)`);
  if (stat.descHead !== 6) errs.push(`${CSV} 计数断言失败: desc 首字 = ${stat.descHead} (期望 6)`);
  if (stat.bodyHead !== 6) errs.push(`${CSV} 计数断言失败: body 首字 = ${stat.bodyHead} (期望 6)`);
  const nextRaw = [lines[0], ...body].join(eol);
  // 形状断言: ZH 列 ZprintPro = 0, EN/JA 列不变
  const chk = nextRaw.split(/\r?\n/).slice(1).filter(l => l.trim()).map(l => l.split('\t'));
  let zhLeft = 0; const afterEnJa = { z: 0, c: 0 };
  chk.forEach(cells => {
    if (cells.length !== hdr.length) { errs.push(`${CSV} 写后列数异常`); return; }
    zhCols.forEach(i => { zhLeft += cnt(cells[i] || '', 'ZprintPro'); });
    enjaCols.forEach(i => { afterEnJa.z += cnt(cells[i] || '', 'ZprintPro'); afterEnJa.c += cnt(cells[i] || '', '智印港'); });
  });
  if (zhLeft !== 0) errs.push(`${CSV} 形状断言失败: ZH 列仍残留 ZprintPro ${zhLeft} 处`);
  if (afterEnJa.z !== beforeEnJa.z) errs.push(`${CSV} 越界断言失败: EN/JA 列 ZprintPro ${beforeEnJa.z} → ${afterEnJa.z}`);
  if (afterEnJa.c !== beforeEnJa.c) errs.push(`${CSV} 越界断言失败: EN/JA 列 智印港 ${beforeEnJa.c} → ${afterEnJa.c}`);
  if (chk.length !== 75) errs.push(`${CSV} 行数断言失败: ${chk.length} (期望 75)`);
  edits.push({ file: CSV, content: nextRaw, note: `① alt ${stat.altDual}+${stat.altPlain} / title ${stat.titleTail} / desc ${stat.descHead} / body ${stat.bodyHead}` });
}

if (errs.length) {
  console.error('[FAIL] 断言未过, 未写盘:');
  errs.slice(0, 20).forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('[断言通过]');
edits.forEach(e => console.log(`  ${e.file}: ${e.note}`));
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-single-brand-data-${ts}`;
for (const e of edits) {
  const dst = join(ROOT, BK, e.file);
  mkdirSync(dirname(dst), { recursive: true });
  copyFileSync(join(ROOT, e.file), dst);
}
console.log(`[备份] ${edits.length} 文件 → ${BK}`);
for (const e of edits) writeFileSync(join(ROOT, e.file), e.content, 'utf8');
console.log('[写入] 完成');
