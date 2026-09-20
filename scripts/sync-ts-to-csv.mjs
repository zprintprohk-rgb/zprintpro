/**
 * sync-ts-to-csv.mjs — 一次性回灌: src/data/sku-seo-data.ts → zprintpro-sku-seo-data.csv
 * (K3 2026-09-21 00:03 批准方案 C 的组成部分; 见 docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md §四)
 *
 * 回灌字段（均为实测无换行/无引号/无制表符的单行字段）:
 *   产品名称×3 / SEO标题×3 / SEO描述×3 / H1标题×3 / 图片Alt标签×3 / SEO关键词×3(逗号连接)
 * 不回灌（ts 侧为权威, 记录在案）:
 *   正文内容优化×3 (291 处含换行 + 86 处含双引号, 不适合行式 CSV)
 *   FAQ 问题/答案×3对  (全 src 无 getSkuSeo().faqs 消费点 = 疑死数据; 且 CSV 仅中文)
 *
 * 排除: gift-boxes (2026-07-22 K3 拍板已合并进 rigid-boxes, middleware 301; CSV 死行不回流)
 *
 * 用法: node scripts/sync-ts-to-csv.mjs            # dry-run (默认)
 *       node scripts/sync-ts-to-csv.mjs --apply    # 备份 + 写入 + 后断言
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'zprintpro-sku-seo-data.csv');
const TS_PATH = path.join(ROOT, 'src', 'data', 'sku-seo-data.ts');
const APPLY = process.argv.includes('--apply');
const EXCLUDE = new Set(['gift-boxes']);

/* ---- ts 加载（剥壳真求值: import/interface/类型标注/函数剥除, 注释在对象字面量内合法） ---- */
function loadTs() {
  let txt = fs.readFileSync(TS_PATH, 'utf8');
  txt = txt.replace(/^import[^\n]*\n/m, '');
  txt = txt.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
  txt = txt.replace('export const skuSeoData: Record<string, SkuSeoEntry> =', 'const skuSeoData =');
  txt = txt.split('export function getSkuSeo')[0].replace(/;\s*$/, '');
  const mod = { exports: {} };
  new Function('module', 'exports', txt + '\nmodule.exports = skuSeoData;')(mod, mod.exports);
  return mod.exports;
}

const data = loadTs();
const raw = fs.readFileSync(CSV_PATH, 'utf8');
const CRLF = raw.includes('\r\n');
const lines = raw.split(/\r?\n/).filter((l) => l.trim());
const header = lines[0].split('\t');
const col = (name) => {
  const i = header.indexOf(name);
  if (i < 0) { console.error(`[sync] 缺列: ${name}`); process.exit(2); }
  return i;
};
const C = {
  nameZh: col('产品名称(ZH)'), nameEn: col('产品名称(EN)'), nameJa: col('产品名称(JA)'),
  slug: col('Slug'),
  titleZh: col('SEO标题(ZH)'), titleEn: col('SEO标题(EN)'), titleJa: col('SEO标题(JA)'),
  descZh: col('SEO描述(ZH)'), descEn: col('SEO描述(EN)'), descJa: col('SEO描述(JA)'),
  h1Zh: col('H1标题(ZH)'), h1En: col('H1标题(EN)'), h1Ja: col('H1标题(JA)'),
  kwZh: col('SEO关键词(ZH)'), kwEn: col('SEO关键词(EN)'), kwJa: col('SEO关键词(JA)'),
  altZh: col('图片Alt标签(ZH)'), altEn: col('图片Alt标签(EN)'), altJa: col('图片Alt标签(JA)'),
};

const locOf = { Zh: 'zh-hk', En: 'en', Ja: 'ja' };
const plan = []; // {rowIdx, cells:[{ci, value}]}
let skipped = 0;
for (let li = 1; li < lines.length; li++) {
  const cells = lines[li].split('\t');
  const slug = cells[C.slug];
  if (EXCLUDE.has(slug)) { skipped++; continue; }
  const e = data[slug];
  if (!e) { console.error(`[sync] CSV 行 slug 不在 ts: ${slug} (先解决再回灌)`); process.exit(2); }
  const edits = [];
  const put = (ci, v) => { edits.push({ ci, value: v }); };
  const guard = (v, label) => {
    if (typeof v !== 'string' || v.includes('\n') || v.includes('\t') || v.includes('"') || v.includes('\r')) {
      console.error(`[sync] 字段含换行/制表/引号, 拒绝回灌: ${slug} ${label}`); process.exit(3);
    }
    return v;
  };
  put(C.nameZh, guard(e.name?.['zh-hk'] ?? '', 'name.zh')); put(C.nameEn, guard(e.name?.en ?? '', 'name.en')); put(C.nameJa, guard(e.name?.ja ?? '', 'name.ja'));
  for (const [sfx, loc] of Object.entries(locOf)) {
    put(C['title' + sfx], guard(e.seo?.[loc]?.title ?? '', 'title.' + loc));
    put(C['desc' + sfx], guard(e.seo?.[loc]?.description ?? '', 'desc.' + loc));
    put(C['h1' + sfx], guard(e.seo?.[loc]?.h1 ?? '', 'h1.' + loc));
    put(C['kw' + sfx], guard((e.seo?.[loc]?.keywords || []).join(','), 'kw.' + loc));
    put(C['alt' + sfx], guard(e.imageAlt?.[loc] ?? '', 'alt.' + loc));
  }
  plan.push({ li, cells, edits });
}

let changeCells = 0, changeRows = 0;
for (const p of plan) {
  let rowChanged = false;
  for (const ed of p.edits) {
    if (p.cells[ed.ci] !== ed.value) { p.cells[ed.ci] = ed.value; changeCells++; rowChanged = true; }
  }
  if (rowChanged) changeRows++;
}
console.log(`[sync] 计划回灌行 ${plan.length} (排除 ${skipped}); 变更单元格 ${changeCells} / 涉及行 ${changeRows}`);
console.log(`[sync] 模式: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
if (!APPLY) { console.log('[sync] dry-run 完成, 加 --apply 写入'); process.exit(0); }

const bak = path.join(ROOT, '.hermes', `_bak-csv-before-backsync-${Date.now()}.csv`);
fs.writeFileSync(bak, raw, 'utf8');
const NL = CRLF ? '\r\n' : '\n';
// 按原序重建: 计划行用编辑后 cells, EXCLUDE 行原样
const full = [lines[0]];
for (let li = 1; li < lines.length; li++) {
  const p = plan.find((x) => x.li === li);
  full.push(p ? p.cells.join('\t') : lines[li]);
}
fs.writeFileSync(CSV_PATH, full.join(NL) + NL, 'utf8');
console.log(`[sync] 已写入 (备份: ${path.relative(ROOT, bak)})`);

/* ---- 后断言: 重读 CSV, 回灌字段必须与 ts 逐字一致 ---- */
const raw2 = fs.readFileSync(CSV_PATH, 'utf8');
const lines2 = raw2.split(/\r?\n/).filter((l) => l.trim());
let bad = 0;
for (let li = 1; li < lines2.length; li++) {
  const cells = lines2[li].split('\t');
  const slug = cells[C.slug];
  if (EXCLUDE.has(slug)) continue;
  const e = data[slug];
  const chk = [
    [C.nameZh, e.name?.['zh-hk']], [C.nameEn, e.name?.en], [C.nameJa, e.name?.ja],
    [C.titleZh, e.seo?.['zh-hk']?.title], [C.titleEn, e.seo?.en?.title], [C.titleJa, e.seo?.ja?.title],
    [C.descZh, e.seo?.['zh-hk']?.description], [C.descEn, e.seo?.en?.description], [C.descJa, e.seo?.ja?.description],
    [C.h1Zh, e.seo?.['zh-hk']?.h1], [C.h1En, e.seo?.en?.h1], [C.h1Ja, e.seo?.ja?.h1],
    [C.kwZh, (e.seo?.['zh-hk']?.keywords || []).join(',')], [C.kwEn, (e.seo?.en?.keywords || []).join(',')], [C.kwJa, (e.seo?.ja?.keywords || []).join(',')],
    [C.altZh, e.imageAlt?.['zh-hk']], [C.altEn, e.imageAlt?.en], [C.altJa, e.imageAlt?.ja],
  ];
  for (const [ci, want] of chk) {
    if ((cells[ci] ?? '') !== (want ?? '')) { bad++; if (bad < 5) console.error(`[sync] 不一致 ${slug} col#${ci}`); }
  }
  if (cells.length !== header.length) { bad++; console.error(`[sync] 列数变化 ${slug}: ${cells.length}`); }
}
if (bad) { console.error(`[sync] 后断言 FAIL (${bad})`); process.exit(4); }
console.log(`[sync] 后断言 PASS: ${lines2.length - 1} 行 × 18 字段全部与 ts 逐字一致, 列数 ${header.length} 不变`);
