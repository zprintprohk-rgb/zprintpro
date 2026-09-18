/**
 * K3 2026-09-18 裁定落地: BK-002 (saddle-stitch-booklets) 价格/MOQ 口径统一
 *   裁定 = 结构化区 / PDP title / minQuantity 口径: **100 本起印 + HK$6-32/本**
 *   作废 = 自由文本旧值: MOQ 50 本 / HK$14-57/pc (= US$1.84-7.36)
 *
 * 作用域:
 *   - src/data/products.ts 的 BK-002 段落
 *     (name / nameEn / nameJa / title_zh / description / descriptionEn / descriptionJa / description_zh / features)
 *   - src/data/blog-data/{zh-hk,en,ja}.json 的 saddle-stitch-booklet-printing-guide 窗口
 * 不改:
 *   - catalog-printing-china-supplier-guide 的 HK$14-57/本 (屬「目錄/畫冊」另一產品線, 已登記)
 *   - basePrice_en:1.84 / basePrice_ja:258 (en/ja 各自結構化基準價)
 *
 * §12 三件套: 计数断言 + 结果形状断言(含行级 diff) + 备份
 * ⚠️ 教训: TS 文件改动后必须跑 tsc 并确认错误数 == 基线 54 (下降 = 语法破坏信号)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BAK = path.join(ROOT, '.hermes', '_bak-bk002-price-20260918');
const SLUG = 'saddle-stitch-booklet-printing-guide';
const DRY = process.argv.includes('--dry');

// ---------- 通用: slug 窗口 (blog-data JSON) ----------
function slugWindow(raw, slug) {
  const i = raw.indexOf('"slug": "' + slug + '"');
  if (i === -1) return null;
  const j = raw.indexOf('"slug":', i + 10);
  return { start: i, end: j === -1 ? raw.length : j };
}
const cnt = (h, n) => h.split(n).length - 1;

// ================= 1) blog-data 三语 =================
const PLAN = {
  'src/data/blog-data/zh-hk.json': [
    ['HK$14-57/本', 'HK$6-32/本', 3],
    ['騎馬釘小冊子印刷 50 本起，', '騎馬釘小冊子印刷 100 本起，', 2],
    ['騎馬釘小冊子 50 本起印，', '騎馬釘小冊子 100 本起印，', 1],
    ['無開版費、無最低起印量。', '無開版費、100 本起印。', 1],
  ],
  'src/data/blog-data/en.json': [
    ['50-copy', '100-copy', 3],
    ['50 copies', '100 copies', 7],
  ],
  'src/data/blog-data/ja.json': [
    ['50冊', '100冊', 1],
    ['中綴じ冊子印刷 50 冊から', '中綴じ冊子印刷 100 冊から', 2],
  ],
};

console.log('===== 阶段 1: blog-data 计数断言 (slug 窗口内) =====');
let fail = 0;
const originals = {};
if (DRY) console.log('*** DRY RUN — 只探测不写盘 ***');
for (const [f, rules] of Object.entries(PLAN)) {
  const raw = fs.readFileSync(path.join(ROOT, f), 'utf8');
  originals[f] = raw;
  const w = slugWindow(raw, SLUG);
  if (!w) { console.log('FAIL ' + f + ' slug 未找到'); fail++; continue; }
  const seg = raw.slice(w.start, w.end);
  for (const [from, , n] of rules) {
    const got = cnt(seg, from);
    const whole = cnt(raw, from);
    const ok = got === n;
    if (!ok) fail++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${f} :: "${from}" 窗口 ${got} (期望 ${n}) / 全文 ${whole}`);
    if (DRY) {
      let k = -1, c = 0;
      while ((k = seg.indexOf(from, k + 1)) !== -1 && c < 9) {
        c++;
        console.log('       ctx#' + c + ': …' + seg.slice(Math.max(0, k - 90), k + from.length + 60).replace(/\n/g, ' ') + '…');
      }
    }
  }
}

// ================= 2) products.ts BK-002 =================
const PROD = 'src/data/products.ts';
const prodRaw = fs.readFileSync(path.join(ROOT, PROD), 'utf8');
originals[PROD] = prodRaw;
const slugIdx = prodRaw.indexOf("slug: 'saddle-stitch-booklets'");
if (slugIdx === -1) { console.log('FAIL products.ts 未找到 BK-002'); fail++; }
// BK-002 段落边界: 上一个 `id: 'BK-00` 到下一个对象开始
const segStart = prodRaw.lastIndexOf("sku_code: 'BK-002'", slugIdx);
let segEnd = prodRaw.indexOf("sku_code: 'BK-00", slugIdx + 10);
if (segEnd === -1) segEnd = prodRaw.length;
const prodSeg = prodRaw.slice(segStart, segEnd);

const PROD_RULES = [
  ['目錄/雜誌/練習冊 50 本起', '目錄/雜誌/練習冊 100 本起', 2],   // name + title_zh
  ['Custom Catalogs 50 Copies MOQ', 'Custom Catalogs 100 Copies MOQ', 1],
  ['カタログ・雑誌・ドリル 50冊から', 'カタログ・雑誌・ドリル 100冊から', 1],
  ['MOQ 50 本（vs Alibaba 黃頁 500+）', 'MOQ 100 本（vs Alibaba 黃頁 500+）', 1],
  ['US$1.84-7.36/pc，HK$14-57/pc。', 'HK$6-32/pc。', 1],
  ['MOQ 50 本、30 秒 AI 即時報價、DHL 全球 2-4 天。HK$14-57/pc。', 'MOQ 100 本、30 秒 AI 即時報價、DHL 全球 2-4 天。HK$6-32/pc。', 1],
  ['50-copy MOQ', '100-copy MOQ', 1],
  ['50冊 MOQ', '100冊 MOQ', 1],
  ['【50本起訂】', '【100本起訂】', 1],
];
console.log('\n===== 阶段 1b: products.ts BK-002 计数断言 =====');
// ★ 额外前置断言: en 文章若无 100 数量档, 则把 50→100 不会造成重复档位; 若有则中止
{
  const enRaw = fs.readFileSync(path.join(ROOT, 'src/data/blog-data/en.json'), 'utf8');
  const w = slugWindow(enRaw, SLUG);
  const seg = enRaw.slice(w.start, w.end);
  const tier100 = cnt(seg, '<td class="border p-3">100 copies</td>');
  const tier50 = cnt(seg, '<td class="border p-3">50 copies</td>');
  const okTier = tier100 === 0;
  if (!okTier) fail++;
  console.log(`${okTier ? 'OK  ' : 'FAIL'} en 数量档表: 现有 50 档 ${tier50} / 100 档 ${tier100} (期望 100 档 = 0, 否则 50→100 会造重复档)`);
}
for (const [from, , n] of PROD_RULES) {
  const got = cnt(prodSeg, from);
  const ok = got === n;
  if (!ok) fail++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} BK-002 段 :: "${from}" ${got} (期望 ${n})`);
}

if (fail) { console.error(`\n❌ 计数断言未过 (${fail}), 拒绝写盘`); process.exit(1); }
if (DRY) { console.log('\n(dry run 结束)'); process.exit(0); }

// ================= 3) 备份 + 写盘 =================
console.log('\n===== 阶段 2: 备份 + 写盘 =====');
fs.mkdirSync(BAK, { recursive: true });
for (const [f, raw] of Object.entries(originals)) {
  fs.writeFileSync(path.join(BAK, path.basename(f)), raw, 'utf8');
  console.log('BAK ' + path.basename(f) + ' (' + raw.length + ' B)');
}

for (const [f, rules] of Object.entries(PLAN)) {
  let out = originals[f];
  const w = slugWindow(out, SLUG);
  let seg = out.slice(w.start, w.end);
  for (const [from, to] of rules) seg = seg.split(from).join(to);
  out = out.slice(0, w.start) + seg + out.slice(w.end);
  fs.writeFileSync(path.join(ROOT, f), out, 'utf8');
  console.log('WROTE ' + f);
}
{
  let seg = prodSeg;
  for (const [from, to] of PROD_RULES) seg = seg.split(from).join(to);
  const out = prodRaw.slice(0, segStart) + seg + prodRaw.slice(segEnd);
  fs.writeFileSync(path.join(ROOT, PROD), out, 'utf8');
  console.log('WROTE ' + PROD);
}

// ================= 4) 结果形状断言 =================
console.log('\n===== 阶段 3: 结果形状断言 =====');
let fail2 = 0;
for (const [f, rules] of Object.entries(PLAN)) {
  const now = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const raw0 = originals[f];
  const w = slugWindow(now, SLUG);
  const w0 = slugWindow(raw0, SLUG);
  const seg = now.slice(w.start, w.end);
  for (const [from, to, n] of rules) {
    const residual = cnt(seg, from);
    const delta = cnt(raw0, from) - cnt(now, from);
    const added = cnt(seg, to) - cnt(raw0.slice(w0.start, w0.end), to);
    const ok = residual === 0 && delta === n && added === n;
    if (!ok) fail2++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${f} :: "${from}" 残留 ${residual} 净减 ${delta}/${n} 新串增 ${added}/${n}`);
  }
  const o = JSON.parse(now);
  const okJ = Object.keys(o).length === Object.keys(JSON.parse(raw0)).length;
  if (!okJ) fail2++;
  console.log(`${okJ ? 'OK  ' : 'FAIL'} ${f} :: JSON 合法, 条目数不变 (${Object.keys(o).length})`);
  const okB = fs.readFileSync(path.join(ROOT, f))[0] !== 0xff && !now.includes('\uFFFD');
  if (!okB) fail2++;
  console.log(`${okB ? 'OK  ' : 'FAIL'} ${f} :: no BOM / no mojibake`);
}
{
  const now = fs.readFileSync(path.join(ROOT, PROD), 'utf8');
  const s2 = now.slice(now.lastIndexOf("sku_code: 'BK-002'", now.indexOf("slug: 'saddle-stitch-booklets'")), now.indexOf("sku_code: 'BK-00", now.indexOf("slug: 'saddle-stitch-booklets'") + 10));
  for (const [from, , n] of PROD_RULES) {
    const residual = cnt(s2, from);
    const ok = residual === 0;
    if (!ok) fail2++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} products.ts BK-002 :: "${from}" 残留 ${residual}`);
  }
  const okKeep = s2.includes("price_range: 'HK$6-32/本'") && s2.includes('minQuantity: 100') && s2.includes('basePrice_en: 1.84') && s2.includes('basePrice_ja: 258');
  if (!okKeep) fail2++;
  console.log(`${okKeep ? 'OK  ' : 'FAIL'} products.ts BK-002 :: 结构化字段未被误改 (price_range/minQuantity/basePrice_en/ja)`);
  const L0 = originals[PROD].split('\n'), L1 = now.split('\n');
  const okL = L0.length === L1.length;
  if (!okL) fail2++;
  console.log(`${okL ? 'OK  ' : 'FAIL'} products.ts 行数不变 ${L0.length} == ${L1.length}`);
}
if (fail2) {
  console.error(`\n❌ 形状断言未过 (${fail2}) —— 回滚`);
  for (const [f, raw] of Object.entries(originals)) fs.writeFileSync(path.join(ROOT, f), raw, 'utf8');
  process.exit(1);
}
console.log('\n✅ BK-002 口径统一完成 (备份: ' + BAK + ')');
