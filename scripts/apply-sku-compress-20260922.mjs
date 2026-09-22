/**
 * apply-sku-compress-20260922.mjs — SKU 压缩: 7 条下架 (K3 2026-09-22 指令)
 *
 * 下架清单 (99 → 92):
 *   1. acrylic-keychain      (japan-doujin 5→4, title 含违禁「香港同人周邊印刷專家」)
 *   2. wedding-program-cards (wedding-invitations 6→4)
 *   3. wedding-menu-cards    (wedding-invitations 6→4)
 *   4. escort-cards          (place-cards 6→4)
 *   5. name-tags-badges      (place-cards 6→4)
 *   6. disposable-menus      (menus 5→4)
 *   7. mesh-banners          (banners 5→4, title 含违禁「香港印刷專家」)
 *
 * 落点:
 *   - src/data/products.ts   删 SKU 对象块 (2-space `{` ~ `  },` 行界)
 *   - src/data/sku-seo-data.ts 删 JSON5 条目块
 *   - next.config.js         追加 301 (SKU_CUT_301, 双斜杠变体, 仿 gift-boxes 先例)
 *   - 备份 .hermes/_bak-sku-compress-20260922/
 *
 * 301 目标 (全部实证存在的类目页或兄弟 SKU):
 *   acrylic-keychain→category/japan-doujin · wedding-program-cards→product/wedding-suite-bundle
 *   wedding-menu-cards→product/wedding-suite-bundle · escort-cards→product/wedding-place-cards
 *   name-tags-badges→category/place-cards · disposable-menus→product/laminated-menus
 *   mesh-banners→product/outdoor-vinyl-banners
 *
 * 用法: node scripts/apply-sku-compress-20260922.mjs --check | --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'F:/zprintpro-nextjs';
const APPLY = process.argv.includes('--check') ? false : process.argv.includes('--apply');
const CHECK_ONLY = !APPLY;
const BAK = path.join(ROOT, '.hermes/_bak-sku-compress-20260922');

const CUTS = [
  { slug: 'acrylic-keychain', target: 'category/japan-doujin/' },
  { slug: 'wedding-program-cards', target: 'product/wedding-suite-bundle/' },
  { slug: 'wedding-menu-cards', target: 'product/wedding-suite-bundle/' },
  { slug: 'escort-cards', target: 'product/wedding-place-cards/' },
  { slug: 'name-tags-badges', target: 'category/place-cards/' },
  { slug: 'disposable-menus', target: 'product/laminated-menus/' },
  { slug: 'mesh-banners', target: 'product/outdoor-vinyl-banners/' },
];
const SLUGS = CUTS.map(c => c.slug);

const errors = [];
const report = [];

// ── products.ts: 块删除 (边界 = 下一产品块起点; 闭合一律向下找, 兼容缩进/零缩进) ──
function cutProductsTs(src) {
  const lines = src.split('\n');
  const START_RE = /^\s*\{\s*$/;
  // 预定位所有 slug 行 (1-based)
  const slugLines = new Map();
  lines.forEach((l, idx) => {
    const m = l.match(/^\s*slug: '([a-z0-9-]+)',\s*$/);
    if (m && !slugLines.has(m[1])) slugLines.set(m[1], idx + 1);
  });
  const cutRanges = [];
  for (const s of SLUGS) {
    if (!slugLines.has(s)) { errors.push(`products.ts: slug line not found: ${s}`); continue; }
    const slugLine = slugLines.get(s); // 1-based
    // 前边界: slug 行向上最近的块起点行
    let start = -1;
    for (let k = slugLine - 1; k >= 1; k--) {
      if (START_RE.test(lines[k - 1])) { start = k; break; }
    }
    if (start < 0) { errors.push(`products.ts: block start not found for ${s}`); continue; }
    // 后边界: slug 行向下最近的块起点行 或 '];' (数组收尾); 取前一行, 再回删尾部空行
    let next = -1;
    for (let k = slugLine + 1; k <= lines.length; k++) {
      if (START_RE.test(lines[k - 1]) || /^\];/.test(lines[k - 1])) { next = k; break; }
    }
    if (next < 0) { errors.push(`products.ts: block end not found for ${s}`); continue; }
    let end = next - 1;
    // 回删尾部空行与跨块节注释 (节注释描述下一节, 必须留下, 如 "  // 噴繪廣告 (5 SKU)")
    while (end > start && (lines[end - 1].trim() === '' || lines[end - 1].trim().startsWith('//'))) end--;
    // 断言: 最后一行必须是非空闭合一员 (}, 或 } 形态)
    if (!/^\s*\},?\s*$/.test(lines[end - 1])) {
      errors.push(`products.ts: block close suspicious for ${s}: line ${end} = "${lines[end - 1]}"`);
      continue;
    }
    cutRanges.push([start, end, s]);
  }
  // 应用删除 (倒序, 行号不变)
  cutRanges.sort((a, b) => b[0] - a[0]);
  const out = [...lines];
  for (const [start, end, s] of cutRanges) {
    report.push(`products.ts CUT ${s} (lines ${start}-${end})`);
    out.splice(start - 1, end - start + 1);
  }
  const cut = cutRanges.length;
  if (cut !== SLUGS.length) errors.push(`products.ts: cut ${cut}, want ${SLUGS.length}`);
  return { text: out.join('\n'), cut };
}

// ── sku-seo-data.ts: JSON5 条目块删除 ────────────────────────────────────
function cutSkuSeo(src) {
  const lines = src.split('\n');
  const out = [];
  let i = 0;
  let cut = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(/^  "([a-z0-9-]+)": \{$/);
    if (m) {
      let j = i + 1;
      while (j < lines.length && lines[j] !== '  },') j++;
      if (j >= lines.length) { errors.push('sku-seo: block EOF mismatch at ' + m[1]); break; }
      if (SLUGS.includes(m[1])) {
        cut++;
        report.push(`sku-seo-data.ts CUT ${m[1]} (lines ${i + 1}-${j + 1})`);
        i = j + 1;
        continue;
      }
      out.push(...lines.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    out.push(line);
    i++;
  }
  if (cut !== SLUGS.length) errors.push(`sku-seo-data.ts: cut ${cut}, want ${SLUGS.length}`);
  return { text: out.join('\n'), cut };
}

// ── next.config.js: 追加 SKU_CUT_301 块 (插在 return rules 之前) ──────────
function addRedirects(src) {
  const marker = '  return rules;\n}';
  if (!src.includes(marker)) { errors.push('next.config.js: return marker not found'); return src; }
  const locales = ['zh-hk', 'en', 'ja'];
  let block = '\n  // 2026-09-22 SKU 压缩 (K3 指令, CF Workers CPU 治理 + 违禁词清理):\n';
  block += '  // 7 SKU 下架 99→92; 301 收拢权重到承接页 (类目页或最近兄弟 SKU, 全部线上实证存在)\n';
  block += '  const SKU_CUT_301 = [\n';
  for (const c of CUTS) block += `    ['${c.slug}', '/${c.target}'],\n`;
  block += '  ];\n';
  block += '  for (const locale of LOCALES) {\n';
  block += '    for (const [dead, target] of SKU_CUT_301) {\n';
  block += '      rules.push({ source: `/${locale}/product/${dead}`, destination: `/${locale}${target}`, permanent: true });\n';
  block += '      rules.push({ source: `/${locale}/product/${dead}/`, destination: `/${locale}${target}`, permanent: true });\n';
  block += '    }\n';
  block += '  }\n\n';
  return src.replace(marker, block + marker);
}

const pFile = path.join(ROOT, 'src/data/products.ts');
const sFile = path.join(ROOT, 'src/data/sku-seo-data.ts');
const nFile = path.join(ROOT, 'next.config.js');
const pOrig = fs.readFileSync(pFile, 'utf8');
const sOrig = fs.readFileSync(sFile, 'utf8');
const nOrig = fs.readFileSync(nFile, 'utf8');

const pNew = cutProductsTs(pOrig);
const sNew = cutSkuSeo(sOrig);
const nNew = addRedirects(nOrig);

console.log('══════ 报告 ══════');
report.forEach(r => console.log(r));
if (errors.length) {
  console.error('\n══════ 错误 (未写盘) ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}
// 残余引用自检: 被删 slug 不应再出现于 products.ts / sku-seo-data.ts
for (const s of SLUGS) {
  if (pNew.text.includes(`slug: '${s}'`)) errors.push(`residual slug in products.ts: ${s}`);
  if (sNew.text.includes(`"${s}": {`)) errors.push(`residual slug in sku-seo-data.ts: ${s}`);
}
// SKU 总数断言: 99 → 92
const countSlugs = (t) => (t.match(/^\s*slug: '/gm) || []).length;
const before = countSlugs(pOrig);
const after = countSlugs(pNew.text);
if (before !== 99 || after !== 92) errors.push(`SKU count ${before} → ${after}, want 99 → 92`);
else report.push(`SKU count: ${before} → ${after} ✓`);
if (errors.length) {
  console.error('\n══════ 残余引用错误 ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}

if (CHECK_ONLY) {
  console.log(`\n[dry-run] OK: products.ts -${pNew.cut} 块, sku-seo-data.ts -${sNew.cut} 块, next.config.js +${CUTS.length * 6} 条 301。--apply 写盘。`);
  process.exit(0);
}

fs.mkdirSync(BAK, { recursive: true });
fs.writeFileSync(path.join(BAK, 'products.ts.bak'), pOrig, 'utf8');
fs.writeFileSync(path.join(BAK, 'sku-seo-data.ts.bak'), sOrig, 'utf8');
fs.writeFileSync(path.join(BAK, 'next.config.js.bak'), nOrig, 'utf8');
fs.writeFileSync(pFile, pNew.text, 'utf8');
fs.writeFileSync(sFile, sNew.text, 'utf8');
fs.writeFileSync(nFile, nNew, 'utf8');
console.log(`\n[apply] 写盘完成 · 备份: ${BAK}`);
