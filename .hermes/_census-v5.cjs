// C-1 全槽 title 五段式结构普查 (只读, 2026-09-23) — 交付物3
// 依据: deepseek-exec-prompt-render-trio-and-title-v5.md 交付物3 T-1 (§7.3 #2 钩子位空缺)
// 五段式: [主词] + [长尾1-2] + [工艺/尺寸] + [数字钩子] + [品牌末尾一次] (v5 SSoT docs/zprintpro-sku-title-rule-v5-2026-09-23.md)
// 只读: 不改任何文案; 输出 .hermes/logs/2026-09-23-title-v5-census.md (untracked)
const fs = require('node:fs');
const path = require('node:path');
const { equiv } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');

const ROOT = 'F:/zprintpro-nextjs';
const LOCALES = ['zh-hk', 'en', 'ja'];
const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };

// parse sku-seo-data
const raw = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
const start = raw.indexOf('export const skuSeoData');
const braceStart = raw.indexOf('{', start);
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();

const NUM_HOOK = /(?:HK\$|US\$|\$|¥|￥|円|起印|起|MOQ|枚〜|個〜|張〜|本〜|冊〜|箱〜|巻〜|セット〜|セットから|枚から|個から|張から|から|from \$|From \$|pcs|sheets)/;
const HOOK_NUM = /[\d.]+/;
// 工艺/尺寸 常见词 (不含价格/数量/品牌/通用连接词)
const PROCESS_WORDS = /覆膜|啞膜|光膜|啞光|UV|燙金|燙銀|壓紋|擊凸|模切|圓角|防水|防油|防偽|耐候|環保|再生紙|銅版紙|啞粉紙|卡紙|書紙|PVC|BOPP|PET|157g|128g|300g|200g|250g|80g|100g|500g|350g|A4|A5|A3|A6|A2|A1|A0|單面|雙面|四色|彩色|膠裝|騎馬釘|精裝|線圈|印刷|貼紙|傳單|海報|噴繪|白墨|異形|不乾膠|光油|啞膠|局部|雷射|金箔|銀箔|全彩|CMYK|專色|Laminate|Foil|Matte|Gloss|Water|Resist|Recycled|Archival|Peel|Kraft|Ribbon|Eco|Tamper|Residue|Shape|Die|ラミネート|箔押し|再剥離|型抜き|両面|三つ折り|エコ|防水|多サイズ|耐水|マット|グロス|シール|コート|アート|Giclée|Art|Card|Paper|Box|Bag|Menus|Calendars|Holo|Fluorescent|Security|Transparent|Removable|Displa/;
// 主词: title 首段 (按 | 或空格切第一语义块)
function segments(t) {
  const s = t.split(/\s*[|｜]\s*/).map((x) => x.trim()).filter(Boolean);
  return s;
}
function mainWord(t) { const s = segments(t); return s[0] || t; }
function brandAtEnd(t, loc) {
  const b = BRAND[loc];
  return t.endsWith(b) || t.includes(`| ${b}`) || t.includes(`｜${b}`);
}

const rows = [];
for (const slug of Object.keys(data)) {
  const seo = data[slug].seo || {};
  for (const loc of LOCALES) {
    const t = seo[loc]?.title;
    if (!t) { rows.push({ slug, loc, missing: '整槽缺 title' }); continue; }
    const segs = segments(t);
    const main = segs[0] || '';
    const tail = segs.slice(1).join(' '); // 长尾+工艺+钩子+品牌
    const e = equiv(t);
    const hasNumHook = NUM_HOOK.test(t) && HOOK_NUM.test(t);
    const hasProcess = PROCESS_WORDS.test(t);
    const hasBrand = brandAtEnd(t, loc);
    // 长尾: 除主词/工艺/数字/品牌外是否有额外语义词
    const stripped = t
      .replace(BRAND[loc], '')
      .replace(/HK\$[\d.]+\+?/g, '').replace(/\$[\d.]+\+?/g, '').replace(/¥[\d.]+〜?/g, '')
      .replace(/[\d.]+(?:張|個|本|枚|起印|張起|個起|本起|〜|起|MOQ|pcs|枚)/g, '')
      .replace(/[\d.]+/g, '')
      .replace(/\|/g, '').replace(/｜/g, '').replace(/\s+/g, '');
    const hasLongTail = stripped.length > 4; // 工艺词之外仍有实质词
    const mainIsMeaningful = main.length >= 2 && !/^[|\s]*$/.test(main);

    rows.push({
      slug, loc, e, band: e < 50 ? 'FILL' : e > 57 ? 'TRIM' : 'OK',
      main: mainIsMeaningful, longtail: hasLongTail, process: hasProcess,
      hook: hasNumHook, brand: hasBrand, title: t,
    });
  }
}

// 汇总
const gaps = [];
for (const r of rows) {
  if (r.missing) { gaps.push(`- [${r.slug}/${r.loc}] ${r.missing}`); continue; }
  const miss = [];
  if (r.band !== 'OK') miss.push(`当量${r.e}(${r.band})`);
  if (!r.hook) miss.push('缺数字钩子');
  if (!r.brand) miss.push('缺品牌末尾');
  if (!r.process) miss.push('缺工艺/尺寸');
  if (!r.longtail) miss.push('缺长尾(仅主词+钩子+品牌)');
  if (miss.length) gaps.push(`- [${r.slug}/${r.loc}] 当量${r.e}: ${miss.join('、')} | ${r.title}`);
}

const total = rows.length;
const okAll = rows.filter((r) => !r.missing && r.band === 'OK' && r.hook && r.brand && r.process && r.longtail).length;
const noHook = rows.filter((r) => !r.missing && !r.hook).length;
const fill = rows.filter((r) => !r.missing && r.band === 'FILL').length;
const trim = rows.filter((r) => !r.missing && r.band === 'TRIM').length;

const out = `# C-1 全槽 title 五段式普查 (只读) · 2026-09-23

> 依据: deepseek-exec-prompt-render-trio-and-title-v5.md 交付物3 T-1 (§7.3 #2 钩子位空缺 → 入窗批)
> 只读清单, 不改任何文案; title 文案改动属窗批/C-8 后续任务。
> 五段式: [主词]+[长尾1-2]+[工艺/尺寸]+[数字钩子]+[品牌末尾一次] (v5 SSoT)

## 总览
- 全槽: ${total} (SKU×locale)
- 五段齐全且在带 (50-57): ${okAll}
- 缺口槽: ${gaps.length}
- 缺数字钩子: ${noHook}
- 当量 <50 (FILL): ${fill} · >57 (TRIM): ${trim}
- 冻结槽 (certificates/foil-stickers) 未参与本次修复, 只列档

## 缺口清单
${gaps.length ? gaps.join('\n') : '(无 — 全槽五段齐全)'}
`;
fs.writeFileSync(path.join(ROOT, '.hermes/logs/2026-09-23-title-v5-census.md'), out, 'utf8');
console.log(`C-1 普查完成: ${total} 槽, 五段齐全 ${okAll}, 缺口 ${gaps.length} (缺钩子 ${noHook}, FILL ${fill}, TRIM ${trim})`);
console.log('→ .hermes/logs/2026-09-23-title-v5-census.md');
