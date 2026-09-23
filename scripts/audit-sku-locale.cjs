// 品牌-语种错配全量审计 v3.1 —— 按 **JSON 结构** 解析 (不再用正则+缩进猜 locale)
// v3.1 (2026-09-23, C-0): 在 v3 (sku-seo-data 数据态) 基础上**扩检查渲染态 title 数据源**——
//   ① 博客 title 数据源: src/data/blog-posts.ts (title/excerpt per locale)
//   ② 博客渲染数据源: src/data/blog-data/{en,ja,zh-hk}.json (title/description/excerpt 字段)
//   ③ 渲染模板层断言: src/lib/seo.ts generateProductMetadata/generateCategoryMetadata 品牌后缀必须走 getBrandName()
//   依据: deepseek-exec-prompt-render-trio-and-title-v5.md 交付物3 (B-3 品牌·语种匹配门童铁律)
//   命中 > 0 即 exit 1 (可作门童红; 当前基线 0 命中)。
// * 门童 #28 品牌·语种全链路扫描 (B-3 铁律): PDP/类目/博客 title 数据源 + 渲染模板层; 命中 >0 exit 1
// 前三次同族错误: ① 缩进口径错(8空 vs 实6) ② 嵌套 inline 键未重置 locale ③ 文件名子串当命中
// 本次: 提取对象字面量 → JS 求值 → 遍历真实结构, locale 由 JSON 键决定, 零推断。
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const LOCALES = ['zh-hk', 'en', 'ja'];
const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
// ⚠️ 已人工逐字核对: 仅保留「繁体中文专用 **且** 非日本常用汉字」的字
const TRAD_ONLY = /[學國說這裡來發藥體讀寫讓變轉邊關隨靜驗髮鬥黃點齊應對會]/;

const findings = { brand: [], jaCjk: [], enCjk: [], dualBrand: [], templateLayer: [] };

// ── 通用品牌·语种判定 (B-3 铁律) ──
// 规则: en/ja 品牌位禁「智印港」(应 ZprintPro); zh-hk 禁 ZprintPro 字面 (单品牌)
function checkBrandLocale({ src, loc, field, value, path }) {
  if (typeof value !== 'string' || !value) return;
  if (loc !== 'zh-hk' && value.includes('智印港')) {
    findings.brand.push({ src, loc, field, path, v: value });
  }
  if (loc === 'zh-hk' && /ZprintPro/.test(value)) {
    findings.dualBrand.push({ src, loc, field, path, v: value });
  }
  if (loc === 'ja' && TRAD_ONLY.test(value)) {
    findings.jaCjk.push({ src, loc, field, path, v: value });
  }
  if (loc === 'en' && CJK.test(value)) {
    findings.enCjk.push({ src, loc, field, path, v: value });
  }
}

/* ================= 源 1 · sku-seo-data.ts (数据态 PDP/类目/博客标题源, v3 保留) ================= */
{
  const file = 'src/data/sku-seo-data.ts';
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const start = raw.indexOf('export const skuSeoData');
  const braceStart = raw.indexOf('{', start);
  let depth = 0, end = -1, inStr = false, esc = false, quote = '';
  for (let i = braceStart; i < raw.length; i++) {
    const c = raw[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) { console.error('🔴 无法配对 sku-seo-data 对象边界'); process.exit(1); }
  let data;
  try { data = new Function('return ' + raw.slice(braceStart, end + 1))(); }
  catch (e) { console.error('🔴 sku-seo-data 求值失败:', e.message); process.exit(1); }
  const slugs = Object.keys(data);
  for (const slug of slugs) {
    const e = data[slug];
    const seo = e.seo || {};
    for (const loc of LOCALES) {
      const s = seo[loc] || {};
      const fields = { title: s.title, description: s.description, h1: s.h1 };
      if (e.imageAlt && e.imageAlt[loc]) fields.imageAlt = e.imageAlt[loc];
      for (const [f, v] of Object.entries(fields)) {
        if (typeof v !== 'string' || !v) continue;
        checkBrandLocale({ src: file, loc, field: f, value: v, path: `${slug}/seo/${loc}/${f}` });
      }
    }
  }
  console.log(`SKU 数: ${slugs.length}  ← 结构解析 (源1 sku-seo-data.ts)`);
}

/* ================= 源 2 · blog-posts.ts (博客 title/excerpt 数据源) ================= */
{
  const file = 'src/data/blog-posts.ts';
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  // title: { 'zh-hk': '…', en: '…', ja: '…' } 与 excerpt: { … } 块
  const blockRe = /\b(title|excerpt):\s*\{([\s\S]*?)\n\s*\}/g;
  let m, count = 0;
  while ((m = blockRe.exec(raw))) {
    const kind = m[1];
    const inner = m[2];
    for (const loc of LOCALES) {
      // 键可为 'zh-hk' 或 en/ja
      const lm = inner.match(new RegExp(`['"]?${loc}['"]?\\s*:\\s*['"]([^'"]*)['"]`));
      if (!lm) continue;
      checkBrandLocale({ src: file, loc, field: kind, value: lm[1], path: `blog-posts/${kind}/${loc}` });
      count++;
    }
  }
  console.log(`博客 title/excerpt 块: ${count} 条 (源2 blog-posts.ts)`);
}

/* ================= 源 3 · blog-data/{en,ja,zh-hk}.json (博客渲染数据源) ================= */
{
  const fileBase = 'src/data/blog-data';
  for (const loc of LOCALES) {
    const file = path.join(fileBase, `${loc}.json`);
    if (!fs.existsSync(path.join(ROOT, file))) continue;
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
    const titleFields = ['title', 'description', 'excerpt', 'h1'];
    (function walk(o, p) {
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o)) { o.forEach((x, i) => walk(x, `${p}[${i}]`)); return; }
      for (const [k, v] of Object.entries(o)) {
        if (titleFields.includes(k) && typeof v === 'string') {
          checkBrandLocale({ src: file, loc, field: k, value: v, path: `${p}.${k}` });
        } else if (typeof v === 'object' && v !== null) {
          walk(v, `${p}.${k}`);
        }
      }
    })(data, '$');
  }
  console.log(`blog-data JSON: ${LOCALES.filter((l) => fs.existsSync(path.join(ROOT, fileBase, `${l}.json`))).length} 语系文件 (源3)`);
}

/* ================= 源 4 · 渲染模板层断言 (seo.ts) ================= */
{
  const file = 'src/lib/seo.ts';
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  // generateProductMetadata / generateCategoryMetadata 的品牌后缀必须调用 getBrandName(locale)
  for (const fn of ['generateProductMetadata', 'generateCategoryMetadata']) {
    const fi = raw.indexOf(`export function ${fn}`);
    if (fi < 0) { findings.templateLayer.push({ fn, msg: `${fn} 未找到` }); continue; }
    const seg = raw.slice(fi, fi + 2500);
    // 剥离 // 行注释后只断言「代码字面」—— 历史修复说明里合法提及「智印港」不构成风险
    const code = seg.split('\n').filter((ln) => !/^\s*\/\//.test(ln) && !/^\s*\*/.test(ln)).join('\n');
    const usesGetBrand = /getBrandName\(locale\)/.test(code);
    const hardcodedZh = /智印港/.test(code);
    if (!usesGetBrand) findings.templateLayer.push({ fn, msg: `${fn} 品牌后缀未走 getBrandName(locale) (模板层错配风险)` });
    if (hardcodedZh) findings.templateLayer.push({ fn, msg: `${fn} 段内含硬编码「智印港」字面 (en/ja 兜底 title 风险)` });
  }
  console.log(`渲染模板层: generateProductMetadata/generateCategoryMetadata 断言完成 (源4 seo.ts)`);
}

const show = (name, arr) => {
  console.log(`\n=== ${name}: ${arr.length} 处 ===`);
  for (const h of arr.slice(0, 8)) {
    console.log(`  [${h.loc}] ${h.field} @ ${h.path || h.src || ''}: ${String(h.v || h.msg).slice(0, 120)}`);
  }
  if (arr.length > 8) console.log(`  ... 另 ${arr.length - 8} 处`);
};

console.log('\n──────────── 结果 (v3.1 品牌·语种全链路) ────────────');
show('en/ja 段出现「智印港」', findings.brand);
show('zh-hk 段出现 ZprintPro (双品牌)', findings.dualBrand);
show('ja 段出现繁体专用字', findings.jaCjk);
show('en 段出现 CJK', findings.enCjk);
show('渲染模板层断言', findings.templateLayer);

const total = findings.brand.length + findings.dualBrand.length + findings.jaCjk.length + findings.enCjk.length + findings.templateLayer.length;
console.log(`\n违规模板源总计: ${total} 处 (品牌·语种门童铁律 B-3)`);
process.exit(total > 0 ? 1 : 0);
