// 品牌-语种错配全量审计 v3 —— 按 **JSON 结构** 解析 (不再用正则+缩进猜 locale)
// 前三次同族错误: ① 缩进口径错(8空 vs 实6) ② 嵌套 inline 键未重置 locale ③ 文件名子串当命中
// 本次: 提取对象字面量 → JS 求值 → 遍历真实结构, locale 由 JSON 键决定, 零推断。
const fs = require('node:fs');

const file = 'src/data/sku-seo-data.ts';
const raw = fs.readFileSync(file, 'utf8');

// 提取 `export const skuSeoData ... = { ... };` 的对象字面量
const start = raw.indexOf('export const skuSeoData');
const braceStart = raw.indexOf('{', start);
// 配平花括号以找到对象结束 (正确处理字符串内的花括号)
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
if (end < 0) { console.error('🔴 无法配对对象边界'); process.exit(1); }
const literal = raw.slice(braceStart, end + 1);
console.log(`对象字面量: ${literal.length} 字符 (±校验: 花括号配平 ok)`);

let data;
try { data = new Function('return ' + literal)(); }
catch (e) { console.error('🔴 求值失败:', e.message); process.exit(1); }

const slugs = Object.keys(data);
console.log(`SKU 数: ${slugs.length}  ← 结构解析 (非正则)`);

// 真实样本校验 (闸门1: 先 dump 再判定)
const probe = data[slugs[0]];
console.log(`样本 ${slugs[0]} 的键: ${Object.keys(probe).join(', ')}`);
console.log(`  seo 键: ${Object.keys(probe.seo || {}).join(', ')}`);

const LOCALES = ['zh-hk', 'en', 'ja'];
const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
// ⚠️ 已人工逐字核对: 仅保留「繁体中文专用 **且** 非日本常用汉字」的字
//   (日文用 学/国/説/来/発/薬/体/読/写/譲/変/転/辺/関/随/静/験/髪/闘/黄/点/斉/応/対/会。
//    前版误收 業電門問間題風飯飲館馬高 等 —— 这些是**日本标准汉字**, 用作判定 = 必然误报)
//   ⚠️ 本清单仍属手工枚举, **不完整**; 正式落地 I18N_POLLUTION 扩集应改为
//      「非日本常用汉字表」驱动 (需引入字表), 不得以本清单直接上线。
const TRAD_ONLY = /[學國說這裡來發藥體讀寫讓變轉邊關隨靜驗髮鬥黃點齊應對會]/;

const findings = { brand: [], jaCjk: [], enCjk: [], dualBrand: [] };

for (const slug of slugs) {
  const e = data[slug];
  const seo = e.seo || {};
  for (const loc of LOCALES) {
    const s = seo[loc] || {};
    // 检查客户可见字段
    const fields = { title: s.title, description: s.description, h1: s.h1 };
    if (e.imageAlt && e.imageAlt[loc]) fields.imageAlt = e.imageAlt[loc];

    for (const [f, v] of Object.entries(fields)) {
      if (typeof v !== 'string' || !v) continue;
      // ja / en 段出现 zh-hk 品牌
      if (loc !== 'zh-hk' && v.includes('智印港')) {
        findings.brand.push({ slug, loc, f, v });
      }
      // zh-hk 段出现 ZprintPro (双品牌禁令)
      if (loc === 'zh-hk' && /ZprintPro/.test(v)) {
        findings.dualBrand.push({ slug, loc, f, v });
      }
      // ja 段出现繁体中文专用字
      if (loc === 'ja' && TRAD_ONLY.test(v)) {
        findings.jaCjk.push({ slug, loc, f, v });
      }
      // en 段出现任意 CJK
      if (loc === 'en' && CJK.test(v)) {
        findings.enCjk.push({ slug, loc, f, v });
      }
    }
  }
}

const show = (name, arr) => {
  console.log(`\n=== ${name}: ${arr.length} 处 ===`);
  for (const h of arr.slice(0, 8)) {
    console.log(`  [${h.slug}/${h.loc}] ${h.f}: ${h.v.slice(0, 120)}`);
  }
  if (arr.length > 8) console.log(`  ... 另 ${arr.length - 8} 处`);
};

console.log('\n──────────── 结果 ────────────');
show('ja/en 段出现「智印港」', findings.brand);
show('zh-hk 段出现 ZprintPro (双品牌)', findings.dualBrand);
show('ja 段出现繁体专用字', findings.jaCjk);
show('en 段出现 CJK', findings.enCjk);
