#!/usr/bin/env node
/**
 * scripts/fix-dual-brand-nontitle-b2.mjs — B 批补漏 (2026-09-13)
 *
 * 起因: B 批的允许清单由「行内字段名」启发式生成, 漏掉三类**非 title 面**残留:
 *   a) `intro:` / `content:` / `featuredSnippet:` / `seoImages.alt` 等正文/描述/图片 alt 值
 *   b) ja 逆序形态 `ZprintPro ジープリント` (首版清单正则未收录)
 *   c) 多行 locale-map 页 title 之下的次级字段
 * 本脚本用「所属键」判定 (同键或回看最多 6 行取最近键), 只清非 title 面:
 *   在范围键: intro / content / body / featuredSnippet / alt / description(非 meta title 语境) / a / q
 *   排除键:   title / ogTitle / twitterTitle / h1 / headline / seoTitle / metaTitle / alternateName / name
 *   排除:     注释行 (// 或 *) 与 locale-map 页 title ('zh-hk': '…')
 *
 * 形态映射 (K3 2026-09-13 拍板): zh-hk → 智印港; ja → ZprintPro
 * §12 三件套: 计数断言 + 结果形状断言 + 备份; 断言未过不写盘。
 * 用法: node scripts/fix-dual-brand-nontitle-b2.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const SCAN = ['src', 'messages'];
const EXT = /\.(ts|tsx|js|mjs|cjs|json|html)$/;
const DUAL = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港|ZprintPro\s*ジープリント|智印港\s*ジープリント/g;
const IN_KEYS = /^\s*"?(intro|outro|content|body|featuredSnippet|alt|a|q|summary|closing)"?\s*:/;
const OUT_KEYS = /^\s*"?(title|ogTitle|twitterTitle|h1|headline|seoTitle|metaTitle|alternateName|name|description|metaDesc|indexTitle|pageTitle|title_zh|title_en|title_ja)"?\s*:/;
const LOCALE_MAP = /^\s*['"]?(zh-hk|en|ja)['"]?\s*:/;
const COMMENT = /^\s*(\/\/|\*|\/\*)/;

const errs = [], edits = [];
const fsMod = { readFileSync, writeFileSync };
const listFiles = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) listFiles(p, out); }
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
};

const files = SCAN.flatMap(d => listFiles(join(ROOT, d)));
const chosen = {};   // rel -> Set(lines)
for (const f of files) {
  const rel = f.replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');
  if (rel.startsWith('.hermes/') || rel.startsWith('scripts/')) continue;
  // blog-data JSON 交另一脚本处理 (内含 headline = title 面, 需按 pattern 精确替换, 不能整行改; 见 fix-dual-brand-jsonld-names.mjs)
  if (rel.startsWith('src/data/blog-data/')) continue;
  const raw = fsMod.readFileSync(f, 'utf8');
  if (!DUAL.test(raw)) continue;
  DUAL.lastIndex = 0;
  const lines = raw.split(/\r?\n/);
  lines.forEach((line, idx) => {
    DUAL.lastIndex = 0;
    if (!DUAL.test(line)) return;
    if (COMMENT.test(line)) return;              // 历史注释
    let key = null, keyLine = '';
    for (let k = idx; k >= Math.max(0, idx - 8); k--) {
      const s = (lines[k] || '').trim();
      if (!s) continue;
      if (k !== idx && LOCALE_MAP.test(s)) continue;   // 跳过 locale 键行, 继续向上找所属对象键
      if (idx === k && LOCALE_MAP.test(s)) continue;   // 本行是 locale 值 -> 归属看上层
      if (OUT_KEYS.test(s)) { key = 'OUT'; keyLine = s.slice(0, 40); break; }
      if (IN_KEYS.test(s)) { key = 'IN'; keyLine = s.slice(0, 40); break; }
      if (/^\},?\s*$/.test(s)) break;
    }
    if (key !== 'IN') return;
    (chosen[rel] = chosen[rel] || new Map()).set(idx + 1, keyLine);
  });
}

// --list: 只打印目标清单 (人工过审用)
if (process.argv.includes('--list')) {
  for (const [rel, m] of Object.entries(chosen)) {
    const lines = readFileSync(join(ROOT, rel), 'utf8').split(/\r?\n/);
    console.log(`\n=== ${rel} (${m.size} 行) ===`);
    for (const [ln, keyLine] of [...m.entries()].sort((a, b) => a[0] - b[0])) {
      const i = lines[ln - 1].search(DUAL);
      console.log(`  L${ln} key=${keyLine} :: …${lines[ln - 1].slice(Math.max(0, i - 50), i + 45).replace(/\\n/g, ' ')}…`);
    }
  }
  process.exit(0);
}

// 断言: 目标数量与人工过审清单一致
const EXPECT = {
  'src/lib/seo-keywords.ts': 6,
  'src/data/products.ts': 3,
  'src/data/category-seo-content.ts': 6,
};
for (const [f, n] of Object.entries(EXPECT)) {
  const got = chosen[f] ? chosen[f].size : 0;
  if (got !== n) errs.push(`${f} 目标行数断言失败: ${got} (期望 ${n})`);
}
for (const f of Object.keys(chosen)) if (!EXPECT[f]) errs.push(`未预期文件进入清单: ${f} (${chosen[f].size})`);

for (const [rel, lineSet] of Object.entries(chosen)) {
  const abs = join(ROOT, rel);
  const raw = fsMod.readFileSync(abs, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const before = (raw.match(DUAL) || []).length;
  const lines = raw.split(/\r?\n/);
  let touched = 0, removed = 0;
  const out = lines.map((line, idx) => {
    if (!lineSet.has(idx + 1)) return line;
    const m0 = (line.match(DUAL) || []).length;
    const fixed = line
      .replace(/ジープリント\s*ZprintPro/g, 'ZprintPro')
      .replace(/ZprintPro\s*ジープリント/g, 'ZprintPro')
      .replace(/智印港\s*ジープリント/g, 'ZprintPro')
      .replace(/智印港\s*\|\s*ZprintPro/g, '智印港')
      .replace(/智印港\s*ZprintPro/g, '智印港')
      .replace(/ZprintPro\s*智印港/g, '智印港');
    if ((fixed.match(DUAL) || []).length !== 0) errs.push(`${rel}:${idx + 1} 形状断言失败: 改后仍有双品牌`);
    if (/\|\s*\|/.test(fixed) && !/\|\s*\|/.test(line)) errs.push(`${rel}:${idx + 1} 形状断言失败: 出现「| |」`);
    if (/智印港智印港|ZprintProZprintPro|ジープリントジープリント/.test(fixed)) errs.push(`${rel}:${idx + 1} 相邻重复品牌`);
    if (fixed.length > line.length) errs.push(`${rel}:${idx + 1} 行变长`);
    ['"', '{', '}', '[', ']'].forEach(ch => {
      const a = line.split(ch).length, b = fixed.split(ch).length;
      if (a !== b) errs.push(`${rel}:${idx + 1} 结构断言失败: 「${ch}」数变化`);
    });
    touched++;
    removed += m0 - (fixed.match(DUAL) || []).length;
    return fixed;
  });
  const content = out.join(eol);
  const after = (content.match(DUAL) || []).length;
  if (before - after !== removed) errs.push(`${rel} 文件级断言失败: ${before} → ${after} (实际清除 ${removed}, 改动行 ${touched})`);
  edits.push({ rel, abs, content, before, after, touched, removed });
}

if (errs.length) { console.error('[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
const tot = edits.reduce((a, e) => a + e.touched, 0);
console.log(`[断言通过] 文件 ${edits.length} | 改动行 ${tot}`);
edits.forEach(e => console.log(`  ${e.rel}: ${e.before} → ${e.after}`));
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-dual-brand-b2-${ts}`;
for (const e of edits) { const dst = join(ROOT, BK, e.rel); mkdirSync(dirname(dst), { recursive: true }); copyFileSync(e.abs, dst); }
console.log(`[备份] → ${BK}`);
for (const e of edits) writeFileSync(e.abs, e.content, 'utf8');
let bad = 0;
for (const e of edits) { const n = (fsMod.readFileSync(e.abs, 'utf8').match(DUAL) || []).length; if (n !== e.after) { console.error(`[FAIL] 复验 ${e.rel}: ${n} != ${e.after}`); bad++; } }
console.log(bad ? `[FAIL] 复验 ${bad} 文件不一致` : '[复验] 全部一致');
process.exit(bad ? 1 : 0);
