// 分诊 3 (§0.23.2): brand-locale 审计工具的口径缺口量化 + ja imageAlt 28 可疑三级分类
// 只读, 不改任何文件。目的: 把「门童 188 / 我审 0」的差异定位到**字段族**, 并把 28 可疑逐条定性。
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
const LOCALES = ['zh-hk', 'en', 'ja'];
const KANA = /[\u3040-\u309F\u30A0-\u30FF]/;
const TRAD = /[學國說這裡來發藥體讀寫讓變轉邊關隨靜驗髮鬥黃點齊應對會為張訂製門間題風飯飲館馬高與服務專頁]/;
const HAN = /[\u4E00-\u9FFF]/;

// ── A. 审计工具口径缺口量化 (现有 audit-sku-locale.cjs 只覆盖 seo[loc].{title,description,h1} + imageAlt[loc]) ──
let gapFaqA = 0, gapFaqQ = 0, gapSkuNameText = 0, coveredBrand = 0;
for (const slug of Object.keys(data)) {
  const e = data[slug];
  for (const loc of LOCALES) {
    const s = e.seo?.[loc] || {};
    for (const f of ['title', 'description', 'h1', 'body', 'keywords']) {
      const v = s[f];
      if (typeof v === 'string' && loc !== 'zh-hk' && v.includes('智印港')) coveredBrand++;
    }
    if (e.imageAlt?.[loc] && loc !== 'zh-hk' && e.imageAlt[loc].includes('智印港')) coveredBrand++;
  }
  // faqs[]: 无 locale 结构 → 现有审计完全没看
  for (const q of (e.faqs || [])) {
    for (const k of ['q', 'a']) {
      const v = q[k];
      if (typeof v !== 'string') continue;
      if (v.includes('智印港')) { k === 'a' ? gapFaqA++ : gapFaqQ++; }
    }
  }
  for (const k of ['name', 'nameEn', 'nameJa']) {
    const v = e[k];
    if (typeof v === 'string' && !LOCALES.some((l) => v === (e.seo?.[l]?.title || '')) && v.includes('智印港')) gapSkuNameText++;
  }
}
console.log('═══ A. 现有审计工具 (audit-sku-locale.cjs) 口径缺口 ═══');
console.log(`  已覆盖字段族 (seo[loc].title/description/h1 + imageAlt[loc]) 命中「智印港」: ${coveredBrand}`);
console.log(`  ❌ 未覆盖: faqs[].a 含「智印港」= ${gapFaqA}  ← 门童报的 39 条就在这里`);
console.log(`  ❌ 未覆盖: faqs[].q 含「智印港」= ${gapFaqQ}`);
console.log(`  ❌ 未覆盖: 其余字符串字段(name 等) = ${gapSkuNameText}`);

// ── B. ja imageAlt 三级分类 ──
console.log('\n═══ B. ja imageAlt 三级分类 (🔴确证 / 🟡产品名短串 / 🟢假阳性) ═══');
const cls = { red: [], yellow: [], green: [] };
for (const slug of Object.keys(data)) {
  const alt = data[slug].imageAlt || {};
  const v = alt['ja'];
  if (!v) continue;
  const sameAsHk = v === alt['zh-hk'];
  const hasKana = KANA.test(v);
  const trad = TRAD.test(v);
  const hasHan = HAN.test(v);
  if (sameAsHk) cls.red.push({ slug, v, why: '与 zh-hk 段完全相同' });
  else if (!hasKana && trad) cls.red.push({ slug, v, why: '无假名 + 含繁体专用字 (确证折行)' });
  else if (!hasKana && hasHan) cls.yellow.push({ slug, v, why: '无假名但有汉字 (日文汉字可能合法, 需人读)' });
  else cls.green.push({ slug, v, why: '含假名 ⇒ 正常日文 (前次 🟠 判定的假阳性)' });
}
console.log(`  🔴 确证折行: ${cls.red.length}`);
cls.red.forEach((a) => console.log(`      [${a.slug}] ${JSON.stringify(a.v)}  — ${a.why}`));
console.log(`  🟡 需人读: ${cls.yellow.length}`);
cls.yellow.slice(0, 8).forEach((a) => console.log(`      [${a.slug}] ${JSON.stringify(a.v)}`));
console.log(`  🟢 假阳性(含假名, 前工具 🟠 误报): ${cls.green.length}`);
cls.green.slice(0, 5).forEach((a) => console.log(`      [${a.slug}] ${JSON.stringify(a.v)}`));

// ── C. disposable-menus 是否与 drink-menus 折行同句 ──
console.log('\n═══ C. menus 折行溯源 ═══');
for (const slug of Object.keys(data).filter((s) => /menu/i.test(s))) {
  const a = data[slug].imageAlt || {};
  console.log(`  [${slug}] zh-hk=${JSON.stringify((a['zh-hk'] || '').slice(0, 46))}  ja=${JSON.stringify((a['ja'] || '').slice(0, 46))}`);
}
