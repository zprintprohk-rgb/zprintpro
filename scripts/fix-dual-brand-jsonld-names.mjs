#!/usr/bin/env node
/**
 * scripts/fix-dual-brand-jsonld-names.mjs — blog-data 内嵌 JSON-LD「name」单品牌化 (2026-09-13)
 *
 * 为什么单独一支脚本: blog-data 的 `content` 是「整篇文章一行」的字符串, 同一行里同时存在
 *   - `\"name\":\"智印港 ZprintPro\"`     -> JSON-LD Organization name  = **非 title 面, 本批在范围内**
 *   - `\"headline\":\"… 智印港 ZprintPro\"` -> 文章 headline = **title 面, 按 K3 裁决留待冻结窗**
 * 所以不能整行替换, 必须 pattern 精确替换; 并断言 headline 内含双品牌数**前后不变**。
 *
 * 规则 (K3 2026-09-13 拍板): zh-hk -> 智印港; ja -> ZprintPro
 * §12 三件套: 计数断言 + 结果形状断言 (含 JSON.parse 合法性 + headline 不变断言) + 备份
 * 用法: node scripts/fix-dual-brand-jsonld-names.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const DUAL = /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/g;
const HL = /\\"headline\\":\\"[^\\]*\\"/g;

// 每条规则: 期望次数 (2026-09-13 实测基准)
const RULES = [
  { file: 'src/data/blog-data/zh-hk.json', from: '\\"name\\":\\"智印港 ZprintPro\\"', to: '\\"name\\":\\"智印港\\"', expect: 0 },
  { file: 'src/data/blog-data/ja.json', from: '\\"name\\":\\"ZprintPro 智印港\\"', to: '\\"name\\":\\"ZprintPro\\"', expect: 0 },
  { file: 'src/data/blog-data/ja.json', from: 'ZprintPro ジープリント', to: 'ZprintPro', expect: 0 },
  // B2c 补漏 (2026-09-13, 已实测: 三条 pattern 在 headline/h1 语境出现次数均为 0)
  { file: 'src/data/blog-data/zh-hk.json', from: '智印港 ZprintPro 首頁', to: '智印港 首頁', expect: 12 },
  { file: 'src/data/blog-data/zh-hk.json', from: '智印港 ZprintPro 跨境印刷 SaaS', to: '智印港 跨境印刷 SaaS', expect: 5 },
  { file: 'src/data/blog-data/zh-hk.json', from: '智印港 ZprintPro 印刷規格指南', to: '智印港 印刷規格指南', expect: 1 },
];
const FILES = [...new Set(RULES.map(r => r.file))];

const errs = [], edits = [];
for (const rel of FILES) {
  const abs = join(ROOT, rel);
  const raw = readFileSync(abs, 'utf8');
  // 前置: JSON 合法 + 基准
  let json0; try { json0 = JSON.parse(raw); } catch (e) { errs.push(`${rel} 前置 JSON 解析失败: ${e.message}`); continue; }
  const keys0 = Object.keys(json0).length;
  const dual0 = (raw.match(DUAL) || []).length;
  const hl0 = (raw.match(HL) || []).filter(s => DUAL.test(s) && (DUAL.lastIndex = 0) === 0).length;

  let next = raw, delta = 0;
  for (const r of RULES.filter(x => x.file === rel)) {
    const n = next.split(r.from).length - 1;
    if (n !== r.expect) errs.push(`${rel} 计数断言失败: 「${r.from}」= ${n} (期望 ${r.expect})`);
    next = next.split(r.from).join(r.to);
    delta += n * (r.from.length - r.to.length);
  }
  // 后置: 规则形态归零
  for (const r of RULES.filter(x => x.file === rel)) {
    if (next.includes(r.from)) errs.push(`${rel} 形状断言失败: 仍残留「${r.from}」`);
  }
  // 后置: JSON 合法 + 键数不变 + 长度差符合预期
  let json1; try { json1 = JSON.parse(next); } catch (e) { errs.push(`${rel} 后置 JSON 解析失败: ${e.message}`); continue; }
  if (Object.keys(json1).length !== keys0) errs.push(`${rel} 键数变化: ${keys0} -> ${Object.keys(json1).length}`);
  if (raw.length - next.length !== delta) errs.push(`${rel} 长度差断言失败: ${raw.length - next.length} (期望 ${delta})`);
  // 后置: headline 内含双品牌数不变 (title 面必须原样)
  const hl1 = (next.match(HL) || []).filter(s => DUAL.test(s) && (DUAL.lastIndex = 0) === 0).length;
  if (hl1 !== hl0) errs.push(`${rel} headline 变动断言失败: ${hl0} -> ${hl1} (title 面不得改)`);
  const dual1 = (next.match(DUAL) || []).length;
  console.log(`[${rel}] JSON keys=${keys0} | 双品牌 ${dual0} -> ${dual1} | headline 含双品牌 ${hl0} (不变)`);
  edits.push({ rel, abs, content: next, dual0, dual1, removed: dual0 - dual1 });
}

if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
const total = edits.reduce((a, e) => a + e.removed, 0);
console.log(`\n[断言通过] 双品牌共清除 ${total} 处`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-jsonld-names-${ts}`;
for (const e of edits) { const dst = join(ROOT, BK, e.rel); mkdirSync(dirname(dst), { recursive: true }); copyFileSync(e.abs, dst); }
console.log(`[备份] → ${BK}`);
for (const e of edits) writeFileSync(e.abs, e.content, 'utf8');
// 复验: 独立读盘 + JSON.parse
let bad = 0;
for (const e of edits) {
  const t = readFileSync(e.abs, 'utf8');
  try { JSON.parse(t); } catch { console.error(`[FAIL] 复验 ${e.rel}: JSON 不合法`); bad++; }
  const n = (t.match(DUAL) || []).length;
  if (n !== e.dual1) { console.error(`[FAIL] 复验 ${e.rel}: 双品牌 ${n} != ${e.dual1}`); bad++; }
}
console.log(bad ? `[FAIL] 复验 ${bad} 项` : '[复验] JSON 合法 + 双品牌数一致');
process.exit(bad ? 1 : 0);
