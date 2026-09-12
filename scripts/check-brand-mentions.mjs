/**
 * check-brand-mentions.mjs — §8「禁外部竞品名」+ 编造内容指纹 门禁 (2026-09-12 建, K3 裁决包 C 方案 P0)
 *
 * 背景: 生图时用品牌参照提质量, 但文案从未打算用任何品牌名; V18 批(8/14 自动生成)把生图提示词
 *   派生成了 SEO/GEO 字段 -> 第三方真实品牌名 (Tiffany/Rosewood/Cartier/Mohawk/Neenah/Crane & Co/
 *   Stora Enso/Sappi/Southworth/LUX Paper/Hallmark/Minted/Paper Source/Rifle Paper) 进入对外字段,
 *   并夹带假评审人 (Daniel T./Maya L.) 与编造口径 (Founded 2024 / 50,000+ brands / 2024-Q1)。
 *   已在 2026-09-12 按「留壳清值」全批清除 (696 行 / 87 SKU × 8 字段族) —— 本门禁负责守住零残留。
 *
 * 分级 (仅报告, 不改文件):
 *   A 类【阻断】= 对外 SEO/GEO 字段 (seoTitle/metaTitle/seoDescription/aiSearchSummary/knowledgePanelData)
 *                 或任何位置的编造指纹 -> --strict 时 exit 1
 *   B 类【告警】= relatedEntities.mentions 内的同行/奢侈品品牌 (纸厂可留作素材参照)
 *   C 类【豁免】= docs/ .hermes/ 归档/ GSC 数据/ *.bak* 历史快照 (非线上事实)
 *
 * 用法: node scripts/check-brand-mentions.mjs            # 报告 (exit 0)
 *       node scripts/check-brand-mentions.mjs --strict   # A 类 > 0 即 exit 1 (push 门禁)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname, basename, sep } from 'node:path';

const ROOT = process.cwd();
const STRICT = process.argv.includes('--strict');

// 第三方品牌 (纸厂 + 贺卡/文具同行 + 奢侈品/酒店)
const BRANDS = [
  'Tiffany', 'Rosewood', 'Crane & Co', 'Rifle Paper', 'Mohawk', 'Neenah',
  'Sappi', 'Stora Enso', 'Southworth', 'LUX Paper', 'Hallmark', 'Minted',
  'Paper Source', 'Cartier', 'Rolex',
];
// 同行/奢侈品 (B 类中不可保留者)
const PEER_BRANDS = ['Tiffany', 'Rosewood', 'Cartier', 'Rolex', 'Hallmark', 'Minted', 'Paper Source', 'Rifle Paper'];
// 编造内容指纹 (A 类, 任何位置命中即阻断)
//   2026-09-12 收窄: 原 bare '50,000+' 造成误报 (折扣档位 / 市场数据如 "Marriage Registry expects 50,000+")
//   -> 只保留无歧义的完整指纹短语
const FINGERPRINTS = ['Daniel T.', 'Maya L.', 'Founded 2024', "'2024-Q1'", '50,000+ brands', 'G7 Master certified'];
// 对外字段 (命中品牌名即 A 类)
const A_FIELDS = ['seoTitle', 'metaTitle', 'seoDescription', 'aiSearchSummary', 'knowledgePanelData'];
const SCAN_DIRS = ['src', 'public'];
const TEXT_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.xml', '.webmanifest']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.next', '.open-next', 'docs', '.hermes', 'archive', 'GSC数据', '重要文件', 'zprintpro-en-us-images', '.openclaw']);
const SELF = 'check-brand-mentions.mjs';

const aHits = [];
const bHits = [];
let scanned = 0;

const isExempt = (abs) => {
  const b = basename(abs);
  return b === SELF || /\.bak/i.test(b);
};

function scanFile(abs) {
  if (isExempt(abs)) return;
  if (!TEXT_EXTS.has(extname(abs).toLowerCase())) return;
  let text;
  try {
    text = readFileSync(abs, 'utf-8');
  } catch {
    return;
  }
  scanned += 1;
  const rel = relative(ROOT, abs);
  const lines = text.split(/\r?\n/);
  let curSku = '?';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // 注释行不渲染 -> 惰性, 跳过 (避免清毒说明注释自我指涉造成误报)
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue;
    const sm = line.match(/^\s*slug:\s*'([^']+)'/);
    if (sm) curSku = sm[1];
    const fp = FINGERPRINTS.filter((f) => line.includes(f));
    const brands = BRANDS.filter((b) => line.includes(b));
    if (!fp.length && !brands.length) continue;
    const rec = { rel, line: i + 1, sku: curSku, brands, fp, snippet: line.trim().slice(0, 130) };
    if (fp.length || A_FIELDS.some((f) => line.includes(`${f}:`))) aHits.push(rec);
    else if (line.includes('relatedEntities:')) bHits.push(rec);
  }
}

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const abs = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(abs);
    } else if (e.isFile()) scanFile(abs);
  }
}

console.log('=== §8 第三方品牌名 + 编造指纹 门禁 (check-brand-mentions.mjs) ===');
for (const d of SCAN_DIRS) {
  try {
    if (statSync(join(ROOT, d)).isDirectory()) walk(join(ROOT, d));
  } catch { /* 目录不存在 */ }
}
console.log(`扫描 ${scanned} 个文本文件 (范围: src/ + public/; 豁免: .bak / docs / .hermes / 归档 / GSC 数据)`);

if (aHits.length) {
  console.log(`\n[A 类 · 阻断] 对外字段品牌名 / 编造指纹 命中 ${aHits.length} 行:`);
  for (const h of aHits.slice(0, 30)) {
    console.log(`  ${h.rel}:${h.line}${h.sku !== '?' ? ` (${h.sku})` : ''} [${[...h.brands, ...h.fp].join(', ')}] ${h.snippet}`);
  }
  if (aHits.length > 30) console.log(`  ... 余 ${aHits.length - 30} 行`);
} else {
  console.log('\n[A 类] 0 命中 (2026-09-12 留壳清值后维持零残留)');
}

if (bHits.length) {
  const peers = bHits.filter((h) => h.brands.some((b) => PEER_BRANDS.includes(b)));
  console.log(`\n[B 类 · 告警] relatedEntities 命中 ${bHits.length} 行, 其中含同行/奢侈品 ${peers.length} 行 (纸厂可留作素材参照)`);
}

if (aHits.length && STRICT) {
  console.log('\n[BLOCK] exit 1 — 对外字段不得出现第三方品牌名/编造指纹, 先清再发。');
  process.exit(1);
}
console.log(aHits.length ? '\n[WARN] A 类未清 (报告模式, 不阻断)' : '\n[PASS] A 类 0 命中');
process.exit(0);
