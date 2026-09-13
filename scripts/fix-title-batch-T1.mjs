#!/usr/bin/env node
/**
 * scripts/fix-title-batch-T1.mjs — T 批第一步: blog-data 品牌口收口 (K3 2026-09-13 批准 T1 先落)
 *
 * 范围: src/data/blog-data/{zh-hk,ja,en}.json 的品牌违规点
 * 规则:
 *   zh-hk.json: 「智印港 ZprintPro」/「ZprintPro 智印港」→「智印港」; 裸「ZprintPro」(作主语) →「智印港」
 *   ja.json   : 「智印港」→「ZprintPro」; 「ジープリント ZprintPro」→「ZprintPro」
 *   en.json   : 「智印港」→「ZprintPro」; 「ジープリント」→「ZprintPro」
 *
 * **不动 (T1b, 留待 K3 语义裁决)**: 一次性英文括注「智印港（ZprintPro）」与英文专有名词
 *   「ZprintPro Engineering Team」「ZprintPro 15-Year Offset Press Engineer」——
 *   前者是 2026-06-17 实体消歧工作刻意保留的英文别名用法, 是否算「双品牌同现」属品牌策略判断。
 *   这些点保持原样并留在品牌基线 (存量白名单) 里, 计数可见、可随时清。
 *
 * 附带产出:
 *   ① .hermes/rollback-T1-<ts>.json — 逐点 before/after (旧值), 供单批回滚
 *   ② .hermes/probe-T1-<ts>.json    — 受影响 blog slug → 线上 URL, 供部署后逐点探针
 * §12 三件套: 计数断言 + 结果形状断言 (JSON.parse + 键数 + 长度差) + 备份
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const TS = new Date().toISOString().replace(/[:.]/g, '-');
const FILES = {
  'src/data/blog-data/zh-hk.json': { locale: 'zh-hk' },
  'src/data/blog-data/ja.json': { locale: 'ja' },
  'src/data/blog-data/en.json': { locale: 'en' },
};
// T1b: 保留不动的形态 (语义待裁决)
const HOLD_PATTERNS = [
  /智印港\s*[（(]\s*ZprintPro\s*[）)]/,          // 一次性英文括注
  /ZprintPro\s+Engineering\s+Team/,             // 英文机构署名
  /ZprintPro\s+15-Year\s+Offset\s+Press\s+Engineer/, // 英文职位名 (JSON-LD jobTitle)
];

const errs = [], edits = [], rollback = [], probe = [];
for (const [rel, cfg] of Object.entries(FILES)) {
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  let json0; try { json0 = JSON.parse(raw); } catch (e) { errs.push(`${rel} 前置 JSON 解析失败: ${e.message}`); continue; }
  const keys0 = Object.keys(json0).length;
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const lines = raw.split(/\r?\n/);
  let fixed = 0, held = 0;

  const out = lines.map((line, idx) => {
    const hasBrand = /ZprintPro|智印港|ジープリント/.test(line);
    if (!hasBrand) return line;
    if (HOLD_PATTERNS.some(re => re.test(line))) { held++; return line; }   // T1b 保留
    const before = line;
    let next = line;
    if (cfg.locale === 'zh-hk') {
      next = next
        .replace(/智印港\s*ZprintPro/g, '智印港')
        .replace(/ZprintPro\s*智印港/g, '智印港')
        .replace(/ジープリント\s*ZprintPro/g, '智印港')
        .replace(/ZprintPro/g, '智印港');       // 裸 ZprintPro (作主语) → 智印港
    } else {
      next = next
        .replace(/ジープリント\s*ZprintPro/g, 'ZprintPro')
        .replace(/ZprintPro\s*ジープリント/g, 'ZprintPro')
        .replace(/智印港/g, 'ZprintPro')
        .replace(/ジープリント/g, 'ZprintPro');
    }
    if (next !== before) {
      fixed++;
      const i = before.search(/ZprintPro|智印港|ジープリント/);
      rollback.push({ file: rel, line: idx + 1, beforeSnippet: before.slice(Math.max(0, i - 60), i + 60), afterSnippet: next.slice(Math.max(0, i - 60), i + 60) });
      // 所属 slug -> 探针 URL
      let slug = null;
      for (let k = idx; k >= 0; k--) { const m = (lines[k] || '').match(/^\s{2}"([a-z0-9-]+)":\s*\{/); if (m) { slug = m[1]; break; } }
      if (slug && !probe.some(p => p.slug === slug && p.locale === cfg.locale)) {
        probe.push({ slug, locale: cfg.locale, url: `https://zprintpro.com/${cfg.locale}/blog/${slug}` });
      }
      // 结果形状: 目标 locale 不该再出现对方品牌
      const bad = cfg.locale === 'zh-hk' ? /ZprintPro|ジープリント/ : /智印港/;
      if (bad.test(next)) errs.push(`${rel}:${idx + 1} 形状断言失败: 仍含非本 locale 品牌`);
      // 长度合理性 (不强制缩短: ja/en 由 智印港(3) → ZprintPro(9) 必然变长)
      const brandTokens = (before.match(/ZprintPro|智印港|ジープリント/g) || []).length;
      if (Math.abs(next.length - before.length) > 6 * brandTokens + 12) {
        errs.push(`${rel}:${idx + 1} 长度断言失败: Δ=${next.length - before.length} (品牌 token ${brandTokens} 个, 超合理区间)`);
      }
    }
    return next;
  });

  const content = out.join(eol);
  let json1; try { json1 = JSON.parse(content); } catch (e) { errs.push(`${rel} 后置 JSON 解析失败: ${e.message}`); continue; }
  if (Object.keys(json1).length !== keys0) errs.push(`${rel} 键数变化 ${keys0} → ${Object.keys(json1).length}`);
  // 文件级: 只允许「品牌替换」带来的长度变化 (zh-hk 缩短 / ja·en 变长), 上限按品牌 token 总数估
  const brandTotal = (raw.match(/ZprintPro|智印港|ジープリント/g) || []).length;
  if (Math.abs(content.length - raw.length) > 6 * brandTotal + 24) errs.push(`${rel} 文件级长度断言失败: Δ=${content.length - raw.length}`);
  console.log(`[${rel}] locale=${cfg.locale} 键=${keys0} | 修 ${fixed} 行 | 保留(T1b) ${held} 行`);
  edits.push({ rel, content });
}

if (errs.length) { console.error('\n[FAIL] 断言未过, 未写盘:'); errs.forEach(e => console.error('  - ' + e)); process.exit(1); }
console.log(`\n[断言通过] 共修 ${rollback.length} 行, 保留 ${edits.length ? '' : ''}T1b; 探针目标 ${probe.length} 个 URL`);
if (DRY) { console.log('[dry] 未写盘'); process.exit(0); }

const BK = `.hermes/backup-title-T1-${TS}`;
mkdirSync(join(ROOT, BK), { recursive: true });
for (const e of edits) {
  const name = e.rel.split('/').pop();
  copyFileSync(join(ROOT, e.rel), join(ROOT, BK, name));
}
writeFileSync(join(ROOT, `.hermes/rollback-T1-${TS}.json`), JSON.stringify({ at: TS, note: 'T1 回滚映射 (before/after 片段) — 如需回滚, 用 scripts/rollback-title-batch.mjs', items: rollback }, null, 1), 'utf8');
writeFileSync(join(ROOT, `.hermes/probe-T1-${TS}.json`), JSON.stringify({ at: TS, targets: probe }, null, 1), 'utf8');
for (const e of edits) writeFileSync(join(ROOT, e.rel), e.content, 'utf8');
console.log(`[备份] → ${BK}`);
console.log(`[回滚] .hermes/rollback-T1-${TS}.json (${rollback.length} 点)`);
console.log(`[探针] .hermes/probe-T1-${TS}.json (${probe.length} URL)`);
