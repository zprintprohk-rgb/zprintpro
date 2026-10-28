#!/usr/bin/env node
/**
 * scripts/rebuild-gsc-index.mjs — GSC数据/index.json 重建器 (C6/A15 修复, 2026-10-29)
 *
 * 背景 (A15 持续 19 天):
 *   GSC数据/index.json lastBuild 停在 2026-10-10 / latestFreshData 2026-10-09,
 *   但 GSC数据/ 目录实际已含 10/15..10/29 共 5 批新档 (10/29 批 = K3 01:16-01:23 导出 4 档)。
 *   index.json 不重建 → 门童 #9 (gsc-source-guard, 72h 新鲜度闸门) 读到的 freshnessStatus
 *   永远停在旧值, 引用"旧文件当新证据"的 GSC_STALE 检查失明。
 *
 * 对齐先例: 9/10 校准轮 846edfd4 在同一流程里更新 index.json (latestFreshData→2026-09-10, FRESH);
 *   10/29 校准轮 (9ff9a55e) 只做了矩阵回灌 + 校准报告, 未重建 index → 本脚本补上收尾。
 *
 * SOP-5 合规: index.json 是派生文件, 禁手搓 — 本脚本 = 生成器, 从 GSC数据/ 目录扫描
 *   重算 filesByDate / totalFiles / latestFreshData / stalenessDays / freshnessStatus,
 *   保留 files 数组 (parseable 制品登记) 与 schema 骨架, 幂等可复跑。
 *
 * 用法:
 *   node scripts/rebuild-gsc-index.mjs [--write]     # 默认 dry-run 打印将写入内容
 *   node scripts/rebuild-gsc-index.mjs --write       # 实际写回 GSC数据/index.json
 */
'use strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GSC_DIR = path.join(ROOT, 'GSC数据');
const INDEX_PATH = path.join(GSC_DIR, 'index.json');
const GATE_HOURS = 72;
const WRITE = process.argv.includes('--write');

// ---- 扫描目录: 返回 { total, filesByDate, latestFreshData } ----
function scanDir() {
  let total = 0;
  const filesByDate = {};
  const dateRe = /(20\d{2}-\d{2}-\d{2})/;
  const entries = fs.readdirSync(GSC_DIR, { withFileTypes: true });

  function walk(dir, rel) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      const relPath = rel ? `${rel}/${ent.name}` : ent.name;
      if (ent.isDirectory()) {
        walk(full, relPath);
      } else {
        if (ent.name === 'index.json') continue; // 本文件自身不计数
        total++;
        const m = relPath.match(dateRe);
        const key = m ? m[1] : (rel.split('/')[0] && !dateRe.test(rel.split('/')[0]) ? rel.split('/')[0] : 'undated');
        filesByDate[key] = (filesByDate[key] || 0) + 1;
      }
    }
  }
  walk(GSC_DIR, '');
  const datedKeys = Object.keys(filesByDate).filter((k) => dateRe.test(k)).sort();
  const latestFreshData = datedKeys.length ? datedKeys[datedKeys.length - 1] : null;
  return { total, filesByDate, latestFreshData };
}

// ---- 新鲜度计算 ----
function computeFreshness(latestFreshData) {
  if (!latestFreshData) {
    return { stalenessDays: -1, freshnessStatus: 'NO_DATA' };
  }
  const [y, m, d] = latestFreshData.split('-').map(Number);
  const dataDay = new Date(Date.UTC(y, m - 1, d));
  const now = new Date();
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const stalenessDays = Math.max(0, Math.floor((nowUtc - dataDay.getTime()) / 86400000));
  const freshnessStatus = stalenessDays * 24 <= GATE_HOURS ? 'FRESH' : 'STALE';
  return { stalenessDays, freshnessStatus };
}

// ---- 读取现有 index.json ----
function loadExisting() {
  if (!fs.existsSync(INDEX_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  } catch (e) {
    console.error(`[rebuild-gsc-index] 现有 index.json 解析失败: ${e.message}`);
    return null;
  }
}

const existing = loadExisting() || {};
const scan = scanDir();
const { stalenessDays, freshnessStatus } = computeFreshness(scan.latestFreshData);
const now = new Date();
const nowIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00+08:00`;

const stalenessNote =
  `10/29 重建轮 (C6/A15 收尾): K3 01:16-01:23 导出 4 新档 (24h/7d/28d/3mo 三站点汇总, 全国家口径) + ` +
  `目录现存 10/15/10/16/10/19/10/23 各批 (共 5 批新档), 由 scripts/rebuild-gsc-index.mjs 扫描重建。` +
  `28d KPI (09-29..10-26): clk 497 / imp 20,977 / CTR 2.37% / pos 13.52; 恢复系数 109.9% (全国家口径, 双方法)。` +
  `totalFiles = ${scan.total} (含 gitignored xlsx, 实际目录计数); 数据日约 10-26 (GSC 滞后 2-3 天属正常) ⇒ ${freshnessStatus}。` +
  `10/29 ZP-gsc-feedback lane 已消费并回灌 matrix (gsc_feedback_2026_10_29 block + priority_boost 食品包裝+1 / china catalog+1)。`;

const rebuilt = {
  schema: existing.schema || 'gsc-data-index-v1',
  lastBuild: nowIso,
  host: existing.host || 'zprintpro.com',
  freshnessGateHours: existing.freshnessGateHours || GATE_HOURS,
  totalFiles: scan.total,
  skippedFiles: existing.skippedFiles || 0,
  latestFreshData: scan.latestFreshData,
  stalenessDays,
  freshnessStatus,
  stalenessNote,
  filesByDate: scan.filesByDate,
  freshnessRule: existing.freshnessRule || '>72h = STALE, 禁止输出带数字结论, 触发刷新',
  dataDimensions: existing.dataDimensions || ['query (词级)', 'page+query (SKU URL 级)', 'country (3 市场 zh-hk/en/ja)', 'device', 'date'],
  files: existing.files || [],
  'gsc-api-fresh-data-format': existing['gsc-api-fresh-data-format'] || 'gsc-fresh-YYYY-MM-DD.json',
  actionRequired:
    `下一校准窗 (11-03 C4/C6 验证点): ① 老板导出 query×page×country 双档 (面板 §3 join 修复, 贴纸/月历词级已就位) ` +
    `② 11-01 教科書 churn 47.1 月复盘 ③ 11-04 年賀状/貼紙 14 天位次复测 ④ index.json 每次 GSC 新档落盘后由本重建器重跑 (SOP-5, 禁手搓)`,
  notes: {
    ...(existing.notes || {}),
    '2026-10-29': {
      files: 4,
      source: 'xlsx 真总量 (24h/7d/28d/3mo × 三站点汇总, 全国家口径, K3 01:16-01:23 导出)',
      consumed_by: '.hermes/logs/2026-10-29-ZP-gsc-feedback.md (恢复确认轮 RECOVERY 109.9%)',
      rebuilt_by: 'scripts/rebuild-gsc-index.mjs (C6/A15 收尾, 2026-10-29)',
    },
  },
};

const out = JSON.stringify(rebuilt, null, 2) + '\n';

if (WRITE) {
  fs.writeFileSync(INDEX_PATH, out, 'utf-8');
  console.log(`[rebuild-gsc-index] WROTE ${INDEX_PATH}`);
} else {
  console.log('[rebuild-gsc-index] DRY-RUN (加 --write 实际写回)');
}
console.log(`[rebuild-gsc-index] totalFiles=${scan.total} latestFreshData=${scan.latestFreshData} stalenessDays=${stalenessDays} freshnessStatus=${freshnessStatus}`);
console.log(`[rebuild-gsc-index] filesByDate: ${JSON.stringify(scan.filesByDate)}`);
console.log(`[rebuild-gsc-index] files array preserved: ${(existing.files || []).length} entries`);
