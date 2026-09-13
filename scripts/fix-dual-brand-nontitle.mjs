#!/usr/bin/env node
/**
 * scripts/fix-dual-brand-nontitle.mjs — 单品牌分层 B 批 (K3 2026-09-13 批准: 非 title 面)
 *
 * 输入: .hermes/dual-brand-allowlist.json (人工审过的 (file,line,form) 清单, 292 处 / 26 文件)
 * 规则: zh-hk「智印港 ZprintPro」/「ZprintPro 智印港」→「智印港」
 *       ja  「ジープリント ZprintPro」→「ZprintPro」(K3 2026-09-13 拍板: 按 9/1 §2 字面统一)
 *
 * §12 危险写入「三件套」(K3 2026-09-13 批准):
 *   ① 计数断言: 每个目标行的双品牌命中数必须与本清单一致; 文件级总数必须一致
 *   ② 结果形状断言: 改后该行双品牌 = 0; 无「| |」/「智印港智印港」/「ZprintProZprintPro」等新畸形;
 *      文件级双品牌总数必须恰好减少 N
 *   ③ 备份: 全部写盘前先备份到 .hermes/backup-dual-brand-<ts>/
 *   断言未过 → 不写盘, exit 1 (只查计数的守卫是假守卫)
 *
 * 用法: node scripts/fix-dual-brand-nontitle.mjs [--dry]
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const MANIFEST = '.hermes/dual-brand-allowlist.json';
const DUAL = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;
const DRY = process.argv.includes('--dry');

const man = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const allow = man.allow || [];
if (!allow.length) { console.error('[FAIL] 清单为空'); process.exit(1); }

// 人工覆写 (注释/说明文字: 正则替换会留下畸形, 必须整段重写)
const MANUAL = [
  {
    file: 'src/lib/seo.ts', line: 23,
    from: '// 2026-08-10 §0.15 升级: ja locale ジープリント ZprintPro (双品牌, ja 公式 per §13.16.1)',
    to: '// ja 品牌名: 2026-09-01 K3 单品牌分层拍板 → ja = \'ZprintPro\' (原 2026-08-10 双品牌口径已废)',
  },
  {
    file: 'src/lib/seo.ts', line: 768,
    from: '避免 layout 模板的 \'| ZprintPro\' 再次叠加后形成 "...| 智印港 ZprintPro | ZprintPro"。',
    to: '避免 layout 模板的 \'| ZprintPro\' 再次叠加后形成重复品牌 (历史 bug)。',
  },
  {
    file: 'src/lib/seo.ts', line: 843,
    from: '避免 layout 模板的 \'| ZprintPro\' 再次叠加后形成 "...| 智印港 ZprintPro | ZprintPro"。',
    to: '避免 layout 模板的 \'| ZprintPro\' 再次叠加后形成重复品牌 (历史 bug)。',
  },
];

// 分组
const byFile = new Map();
for (const it of allow) {
  if (!byFile.has(it.file)) byFile.set(it.file, []);
  byFile.get(it.file).push(it);
}

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const BK = `.hermes/backup-dual-brand-${ts}`;
const errs = [];
const pending = [];

for (const [rel, items] of byFile) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) { errs.push(`缺文件 ${rel}`); continue; }
  const raw = readFileSync(abs, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.split(/\r?\n/);
  const dualBeforeFile = (raw.match(DUAL) || []).length;

  const perLine = new Map();
  for (const it of items) perLine.set(it.line, (perLine.get(it.line) || 0) + 1);

  let changed = 0, dualAfterFile = 0;
  const out = lines.map((line, idx) => {
    const ln = idx + 1;
    const expect = perLine.get(ln) || 0;
    const got = (line.match(DUAL) || []).length;
    if (expect && got !== expect) {
      errs.push(`${rel}:${ln} 计数断言失败: 清单 expect=${expect} 实际=${got}`);
      dualAfterFile += got;
      return line;
    }
    if (!expect) { dualAfterFile += got; return line; }
    const manual = MANUAL.find(m => m.file === rel && m.line === ln);
    if (manual) {
      const occ = line.split(manual.from).length - 1;
      if (occ !== 1) { errs.push(`${rel}:${ln} 人工覆写断言失败: 原文出现 ${occ} 次 (期望 1)`); dualAfterFile += got; return line; }
      const fixedM = line.replace(manual.from, manual.to);
      if ((fixedM.match(DUAL) || []).length !== 0) errs.push(`${rel}:${ln} 人工覆写后仍有双品牌`);
      if (fixedM === line) errs.push(`${rel}:${ln} 人工覆写无效`);
      dualAfterFile += (fixedM.match(DUAL) || []).length;
      changed++;
      return fixedM;
    }
    const fixed = line
      .replace(/ジープリント\s*ZprintPro/g, 'ZprintPro')      // ja → ZprintPro (K3 拍板)
      .replace(/智印港\s*\|\s*ZprintPro/g, '智印港')          // zh-hk 带分隔
      .replace(/智印港\s*ZprintPro/g, '智印港')               // zh-hk 正序
      .replace(/ZprintPro\s*智印港/g, '智印港');              // zh-hk 逆序
    // ② 形状断言 (结果形状, 非仅计数)
    if ((fixed.match(DUAL) || []).length !== 0) errs.push(`${rel}:${ln} 形状断言失败: 改后仍有双品牌`);
    if (/\|\s*\|/.test(fixed) && !/\|\s*\|/.test(line)) errs.push(`${rel}:${ln} 形状断言失败: 新出现空分隔「| |」`);
    if (/智印港智印港|ZprintProZprintPro|ジープリントジープリント/.test(fixed)) errs.push(`${rel}:${ln} 形状断言失败: 出现相邻重复品牌`);
    if (fixed.length > line.length) errs.push(`${rel}:${ln} 形状断言失败: 行变长 (替换应缩短)`);
    {
      const hadZh = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ZprintPro\s*智印港/.test(line);
      const hadJa = /ジープリント\s*ZprintPro/.test(line);
      if (hadZh && !/智印港/.test(fixed)) errs.push(`${rel}:${ln} 形状断言失败: zh-hk 行改后丢「智印港」`);
      if (hadJa && !/ZprintPro/.test(fixed)) errs.push(`${rel}:${ln} 形状断言失败: ja 行改后丢「ZprintPro」`);
      if (hadJa && !hadZh && /ジープリント/.test(fixed) && !/ジープリント/.test(line.replace(/ジープリント\s*ZprintPro/g, ''))) {
        errs.push(`${rel}:${ln} 形状断言失败: ja 行仍残留孤立「ジープリント」`);
      }
    }
    dualAfterFile += (fixed.match(DUAL) || []).length;
    changed++;
    return fixed;
  });

  if (dualBeforeFile - dualAfterFile !== items.length) {
    errs.push(`${rel} 文件级计数断言失败: 双品牌 ${dualBeforeFile} → ${dualAfterFile}, 期望减少 ${items.length}`);
  }
  if (!changed) continue;
  pending.push({ rel, abs, content: out.join(eol), before: dualBeforeFile, after: dualAfterFile, changed });
}

if (errs.length) {
  console.error('[FAIL] 断言未过, 未写盘:');
  errs.slice(0, 25).forEach(e => console.error('  - ' + e));
  console.error(`\n共 ${errs.length} 条断言失败`);
  process.exit(1);
}

const totalBefore = pending.reduce((a, p) => a + p.before, 0);
const totalAfter = pending.reduce((a, p) => a + p.after, 0);
const totalChanged = pending.reduce((a, p) => a + p.changed, 0);
console.log(`[断言通过] 文件 ${pending.length} | 改动行 ${totalChanged} | 双品牌 ${totalBefore} → ${totalAfter}`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

// ③ 备份 (写盘前)
mkdirSync(join(ROOT, BK), { recursive: true });
for (const p of pending) {
  const dst = join(ROOT, BK, p.rel);
  mkdirSync(dirname(dst), { recursive: true });
  copyFileSync(p.abs, dst);
}
console.log(`[备份] ${pending.length} 文件 → ${BK}`);

// 写盘
for (const p of pending) writeFileSync(p.abs, p.content, 'utf8');
console.log(`[写入] ${pending.length} 文件已更新`);

// 写后复验 (独立读盘)
let bad = 0;
for (const p of pending) {
  const now = (readFileSync(p.abs, 'utf8').match(DUAL) || []).length;
  if (now !== p.after) { console.error(`[FAIL] 复验 ${p.rel}: ${now} != ${p.after}`); bad++; }
}
console.log(bad ? `[FAIL] 复验 ${bad} 文件不一致` : '[复验] 全部一致 (双品牌 = 期望值)');
process.exit(bad ? 1 : 0);
