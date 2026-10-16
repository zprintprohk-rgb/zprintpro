#!/usr/bin/env node
/**
 * scripts/record-cred-baseline.mjs — CRED 存量基线录制器 (2026-10-16 簇9.5)
 * 背景: 守卫按「整文件」扫描 staged 文件 → 任何触碰大内容文件 (blog-data/products-content)
 *       都会撞上该文件存量 CRED 病灶 → 结构性无法 commit。BRAND 规则已有方案 C 存量基线
 *       (只许递减) 正解; 本脚本把同机制扩展到 CRED_* 规则。
 * 基线口径: HEAD (git show) 的逐文件逐规则计数 = 存量真值; 新状态只许 ≤ 基线 (递减),
 *           新增违规 (count > baseline) 照常硬拦。
 * 用法: node scripts/record-cred-baseline.mjs   (stage 文件后运行)
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { scan, RULES } = require('./guards/credibility-guard.js');

const REPO = process.cwd();
const TMP = path.join(REPO, '.hermes', '_cred-base-tmp');
const OUT = path.join(REPO, '.hermes', 'cred-baseline.json');

const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' })
  .trim().split('\n').filter(f => /\.(ts|tsx|json|csv)$/.test(f));
const credRuleIds = RULES.map(r => r.id);
const perFile = {};
const tmpFiles = [];

for (const f of staged) {
  let head;
  try {
    head = execSync(`git show HEAD:${JSON.stringify(f)}`, { encoding: 'utf8', maxBuffer: 1e8 });
  } catch (e) { continue; } // 新文件无 HEAD → 无基线
  const tmpPath = path.join(TMP, f);
  fs.mkdirSync(path.dirname(tmpPath), { recursive: true });
  fs.writeFileSync(tmpPath, head, 'utf-8');
  tmpFiles.push(tmpPath);
}

const hits = await scan(tmpFiles);
for (const h of hits) {
  const rel = path.relative(TMP, h.file).replace(/\\/g, '/');
  if (!credRuleIds.includes(h.ruleId)) continue;
  perFile[rel] = perFile[rel] || {};
  perFile[rel][h.ruleId] = (perFile[rel][h.ruleId] || 0) + 1;
}

const headSha = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim().slice(0, 8);
fs.writeFileSync(OUT, JSON.stringify({
  recordedAt: new Date().toISOString(),
  headSha,
  note: 'CRED 存量基线 (方案 C 同款, 只许递减) — 逐文件逐规则 HEAD 计数; 新增违规 (count > baseline) 照常硬拦',
  perFile,
}, null, 1), 'utf-8');
fs.rmSync(TMP, { recursive: true, force: true });

let total = 0;
for (const f of Object.keys(perFile)) for (const r of Object.keys(perFile[f])) total += perFile[f][r];
console.log(`[cred-baseline] recorded @ ${headSha}: files=${Object.keys(perFile).length} rules-hits=${total} -> .hermes/cred-baseline.json`);
