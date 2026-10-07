/**
 * csv-to-sku-seo.mjs — CSV → src/data/sku-seo-data.ts 【增量合并生成器】(K3 2026-09-21 00:03 批准方案 C)
 *
 * 背景与权威域划分 (docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md §四):
 *   - 本文件是「生成 + 手工」混合档: ts 100 key vs CSV 75 行。旧全量生成器会丢 25 SKU (已发生事故并还原)。
 *   - CSV 权威域 (CSV→regen 覆盖): name / seo.title / seo.description / seo.h1 / seo.keywords / imageAlt
 *     (已用 scripts/sync-ts-to-csv.mjs 一次性回灌, 两处现为镜像)
 *   - ts 权威例外域 (regen 保留 ts 现值, 不来自 CSV):
 *       seo.body — 291 处含换行 + 86 处含双引号, 不适合行式 CSV;
 *       faqs     — 全 src 无 getSkuSeo().faqs 消费点 (疑死数据, 见活书 §5 #11), 且 CSV 仅中文
 *   - ts-only 26 key (CSV 不存在): 逐字保留 (packaging×5 / wedding×11 / doujin/同人周邊×5 / 等)
 *   - gift-boxes: CSV 死行, 2026-07-22 K3 拍板已并入 rigid-boxes (middleware 301) → 排除, 不回流 ts
 *
 * 手法: 外科式块替换 — 只重写 CSV 覆盖 slug 的条目块, 块外字节逐字不动 (含块间注释/手工标注);
 *       行尾逗号风格与文件现状一致 (末条也带逗号, 合法 JS)。
 *
 * 断言 (任一失败 exit≠0, 不写文件):
 *   A. CSV 每个非排除 slug 在 ts 有块锚;  B. 合并后 key 数 == 原 key 数 (无丢失无新增);
 *   C. ts-only key 逐字保留;              D. 覆盖域 body/faqs 与 ts 现值深等;
 *   E. 全文件重解析后与「旧 ts + CSV 覆盖域」模型逐 key 深等。
 *
 * 用法: node scripts/csv-to-sku-seo.mjs           # dry-run (默认): 预览 + 全部断言, 不写 src
 *       node scripts/csv-to-sku-seo.mjs --apply   # 备份 + 写入 src
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'zprintpro-sku-seo-data.csv');
const TS_PATH = path.join(ROOT, 'src', 'data', 'sku-seo-data.ts');
const APPLY = process.argv.includes('--apply');
const EXCLUDE = new Set(['gift-boxes']); // K3 7/22 拍板并入 rigid-boxes, 死行不回流

/* ---------- CSV 解析 (行式 TAB; 回灌域已保证无引号/换行, 解析前再断言) ---------- */
function parseCsvLine(line) { return line.split('\t'); }
const rawCsv = fs.readFileSync(CSV_PATH, 'utf8');
const lines = rawCsv.split(/\r?\n/).filter((l) => l.trim());
const header = parseCsvLine(lines[0]);
const col = (name) => {
  const i = header.indexOf(name);
  if (i < 0) { console.error(`[gen] CSV 缺列: ${name}`); process.exit(2); }
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

const csvEntries = {};
for (let i = 1; i < lines.length; i++) {
  const row = parseCsvLine(lines[i]);
  const slug = row[C.slug];
  if (!slug) continue;
  if (EXCLUDE.has(slug)) continue;
  const pick = (lang) => ({
    title: row[lang === 'zh-hk' ? C.titleZh : lang === 'en' ? C.titleEn : C.titleJa] ?? '',
    description: row[lang === 'zh-hk' ? C.descZh : lang === 'en' ? C.descEn : C.descJa] ?? '',
    h1: row[lang === 'zh-hk' ? C.h1Zh : lang === 'en' ? C.h1En : C.h1Ja] ?? '',
    keywords: (row[lang === 'zh-hk' ? C.kwZh : lang === 'en' ? C.kwEn : C.kwJa] ?? '').split(/[,，]/).map((s) => s.trim()).filter(Boolean),
  });
  for (const [ci, v] of row.entries()) {
    if (v.includes('"') || v.includes('\n') || v.includes('\t')) {
      console.error(`[gen] CSV 单元格含引号/换行/制表 (行${i + 1} 列${ci}) — 行式解析会错位, 拒绝`); process.exit(2);
    }
  }
  csvEntries[slug] = {
    name: { 'zh-hk': row[C.nameZh] ?? '', en: row[C.nameEn] ?? '', ja: row[C.nameJa] ?? '' },
    seo: { 'zh-hk': pick('zh-hk'), en: pick('en'), ja: pick('ja') },
    imageAlt: { 'zh-hk': row[C.altZh] ?? '', en: row[C.altEn] ?? '', ja: row[C.altJa] ?? '' },
  };
}
for (const [slug, e] of Object.entries(csvEntries)) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    for (const kw of e.seo[loc].keywords) {
      if (/[,，]/.test(kw)) { console.error(`[gen] 关键词含分隔符, round-trip 会断: ${slug} [${loc}] "${kw}"`); process.exit(2); }
    }
  }
}
console.log(`[gen] CSV 有效条目: ${Object.keys(csvEntries).length} (排除 ${lines.length - 1 - Object.keys(csvEntries).length} 死行)`);

/* ---------- ts 加载 (剥壳真求值) ---------- */
function loadTsFromText(txt) {
  let t = txt.replace(/^import[^\n]*\n/m, '');
  t = t.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
  t = t.replace(/export const skuSeoData: Record<string, SkuSeoEntry> =/, 'const skuSeoData =');
  t = t.split('export function getSkuSeo')[0].replace(/;\s*$/, '');
  const mod = { exports: {} };
  new Function('module', 'exports', t + '\nmodule.exports = skuSeoData;')(mod, mod.exports);
  return mod.exports;
}
const tsText = fs.readFileSync(TS_PATH, 'utf8');
const tsData = loadTsFromText(tsText);
const tsKeys = Object.keys(tsData);
console.log(`[gen] ts 现 key 数: ${tsKeys.length}`);

/* ---------- 漂移闸 (B1.5 教训 2026-10-06): CSV title 列 vs ts 现值 强制同步检查 ----------
 * 事故苗头: CSV title 列 9/21 后未同步 ts 手改优质版, 直接 --apply 会把 71 块 title
 * 回退成劣质模板 (MOQ 篡改 / 品类错位). 门童 #27 拦截救场.
 * 规则: 每次运行强制检查; drift>0 时 --apply 拒绝 (exit 4) 除非显式 --allow-drift.
 */
const ALLOW_DRIFT = process.argv.includes('--allow-drift');
function tsBlockTitles(slug) {
  const i = tsText.indexOf(`"${slug}": {`);
  if (i < 0) return null;
  const j = tsText.indexOf('\n  "', i + 4);
  const seg = tsText.slice(i, j > 0 ? j : tsText.length);
  return [...seg.matchAll(/"title":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).slice(0, 3);
}
const drifts = [];
for (const slug of Object.keys(csvEntries)) {
  const t = tsBlockTitles(slug);
  if (!t || t.length !== 3) continue;
  const c = csvEntries[slug];
  const csvT = [c.seo['zh-hk'].title, c.seo.en.title, c.seo.ja.title];
  if (csvT[0] !== t[0] || csvT[1] !== t[1] || csvT[2] !== t[2]) {
    drifts.push({ slug, csv: csvT, ts: t });
  }
}
if (drifts.length) {
  console.error(`[gen] ⚠️ 漂移 WARN: ${drifts.length} 行 CSV title 列 ≠ ts 现值 (回退事故风险)`);
  for (const d of drifts.slice(0, 8)) console.error(`[gen]   - ${d.slug}: CSV="${d.csv[0].slice(0,40)}" ts="${d.ts[0].slice(0,40)}"`);
  console.error('[gen] 修法: python -X utf8 .hermes/b15-title-writeback.py 回写后重跑');
  if (APPLY && !ALLOW_DRIFT) { console.error('[gen] 断言 FAIL: --apply 遇 title 漂移, 拒绝 (或显式 --allow-drift 确认)'); process.exit(4); }
} else {
  console.log('[gen] 漂移检查: CSV title 与 ts 现值一致 (0 漂移)');
}
/* ---------- 漂移闸 end ---------- */

/* ---------- 合并模型: 覆盖域取 CSV, body/faqs 取 ts, ts-only 整体保留 ---------- */
const merged = {};
for (const slug of tsKeys) {
  const cur = tsData[slug];
  if (csvEntries[slug]) {
    const c = csvEntries[slug];
    merged[slug] = {
      name: c.name,
      seo: {
        'zh-hk': { ...c.seo['zh-hk'], body: cur.seo?.['zh-hk']?.body ?? '' },
        en: { ...c.seo.en, body: cur.seo?.en?.body ?? '' },
        ja: { ...c.seo.ja, body: cur.seo?.ja?.body ?? '' },
      },
      faqs: cur.faqs,
      imageAlt: c.imageAlt,
    };
  } else {
    merged[slug] = cur; // ts-only: 引用保留
  }
}

/* ---------- 外科式块替换 ---------- */
const keyRe = /^(?: {2})?"([a-z0-9-]+)": \{/gm;
const anchors = [...tsText.matchAll(keyRe)].map((m) => ({ slug: m[1], idx: m.index, indent: m[0].match(/^ */)[0].length }));
anchors.push({ slug: '__END__', idx: tsText.indexOf('\n};') });
let newText = tsText;
let replaced = 0, byteChanged = 0;
const spliceLog = [];
for (let i = anchors.length - 2; i >= 0; i--) { // 倒序替换, 索引不失效
  const a = anchors[i];
  const end = anchors[i + 1].idx;
  if (!(a.slug in csvEntries)) continue;
  const oldBlock = newText.slice(a.idx, end);
  const indent = ' '.repeat(a.indent);
  // keywords 数组折叠为单行 (与原文件风格一致, 保持 git diff 可读); 关键词经断言不含引号/分隔符
  const entryJson = JSON.stringify(merged[a.slug], null, 2)
    .replace(/"keywords": \[\n([\s\S]*?)\n(\s*)\]/g, (m, inner, pad) => {
      const items = inner.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.replace(/,$/, ''));
      return '"keywords": [' + items.join(',') + ']';
    })
    .split('\n').map((l, j) => (j === 0 ? l : indent + l)).join('\n');
  const newBlock = `${indent}"${a.slug}": ${entryJson},\n`;
  newText = newText.slice(0, a.idx) + newBlock + newText.slice(end);
  replaced++;
  if (newBlock !== oldBlock) { byteChanged++; spliceLog.push(a.slug); }
}
console.log(`[gen] 块替换: ${replaced} (字节级变化 ${byteChanged})`);

/* ---------- 断言 ---------- */
const FAIL = (msg) => { console.error('[gen] 断言 FAIL: ' + msg); process.exit(4); };
const newData = loadTsFromText(newText);
const newKeys = Object.keys(newData);
if (newKeys.length !== tsKeys.length) FAIL(`key 数 ${newKeys.length} != ${tsKeys.length}`);
const tsOnly = tsKeys.filter((k) => !csvEntries[k]);
for (const k of tsOnly) {
  if (JSON.stringify(newData[k]) !== JSON.stringify(tsData[k])) FAIL(`ts-only key 被改动: ${k}`);
}
const deq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
for (const slug of Object.keys(csvEntries)) {
  const n = newData[slug], want = merged[slug];
  if (!n) FAIL(`CSV slug 未落位: ${slug}`);
  for (const loc of ['zh-hk', 'en', 'ja']) {
    if (n.seo?.[loc]?.body !== tsData[slug]?.seo?.[loc]?.body) FAIL(`${slug} body 未保留 (ts 权威域被侵)`);
    if (!deq(n.faqs, tsData[slug]?.faqs)) FAIL(`${slug} faqs 未保留`);
  }
}
for (const k of newKeys) {
  if (!deq(newData[k], merged[k])) FAIL(`全文件重解析与合并模型不一致: ${k}`);
}
if ('gift-boxes' in newData) FAIL('gift-boxes 死行回流 ts');
console.log(`[gen] 断言 PASS: A 锚位 / B key 数守恒 / C ts-only 逐字 / D body+faqs 保留 / E 全量重解析一致`);

/* ---------- 头部注释更新 (authority 模型留痕) ---------- */
const newHeader = `/**
 * 【混合档 · 增量合并生成】CSV 权威域: name/seo.title/seo.description/seo.h1/seo.keywords/imageAlt
 * ts 权威例外域: seo.body(含换行不适合行式CSV) / faqs(无消费点疑死数据)
 * 100 key = CSV 74 + ts-only 26; gift-boxes 死行排除 (K3 7/22 并入 rigid-boxes)
 * 更新: 改 CSV → node scripts/csv-to-sku-seo.mjs --apply (dry-run 先行)
 * SOP-5 例外与事故: docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md
 */`;
newText = newText.replace(/^\/\*\*[\s\S]*?\*\//, newHeader);

const preview = path.join(ROOT, '.hermes', '_regen-merge-preview.ts');
fs.writeFileSync(preview, newText, 'utf8');
console.log(`[gen] 预览: ${path.relative(ROOT, preview)}`);
if (!APPLY) { console.log('[gen] DRY-RUN 完成 (不写 src), 加 --apply 生效'); process.exit(0); }

const bak = path.join(ROOT, '.hermes', `_bak-sku-seo-before-merge-${Date.now()}.ts`);
fs.writeFileSync(bak, tsText, 'utf8');
fs.writeFileSync(TS_PATH, newText, 'utf8');
console.log(`[gen] 已写入 ${path.relative(ROOT, TS_PATH)} (备份: ${path.relative(ROOT, bak)})`);
console.log(`[gen] 字节级变化块: ${spliceLog.length ? spliceLog.join(', ') : '(无 — 完全幂等)'}`);
