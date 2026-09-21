/**
 * audit-sku-desc-moneyterm-20260921.mjs — SKU description/meta 层体检 × 钱词覆盖（只读）
 *
 * 三层输出:
 *   A. description 长度分布（SERP 显示约 155-160 半角 / ~78 全角；CJK 按 2 计显示宽度）
 *   B. 重复/模板化检测（完全相同的 description 组）
 *   C. 带钱词 head-term 在 title/description 的覆盖（词源: 重要文件/money-keyword-map-20260905.md + docs/2026-09-18-gsc-deep-analysis P1/P2）
 *
 * 数据来源 (§0.23):
 *   - src/data/sku-seo-data.ts 活 description/title 主源（机器生成，正则提取）
 *   - 词表: money-keyword-map-20260905.md（9/3 FRESH 28d GSC）、2026-09-18-gsc-deep-analysis（9/18 数据）
 * 性质: 只读审计，不改任何 src。
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const raw = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');

// 提取 skuSeoData 对象字面量（文件为机器生成的纯 JSON 块）
const start = raw.indexOf('export const skuSeoData');
const open = raw.indexOf('{', start);
// 找到匹配的外层右括号：从尾部向前找 "\n};"
const end = raw.lastIndexOf('};');
const literal = raw.slice(open, end + 1);
// 容忍尾逗号（文件为 JS 风格对象字面量）：仅在字符串外删除逗号+空白后的 ]/} 前的逗号
const stripTrailing = (s) => {
  let out = '', inStr = false, esc = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (esc) { out += c; esc = false; continue; }
    if (c === '\\' && inStr) { out += c; esc = true; continue; }
    if (c === '"') { inStr = !inStr; out += c; continue; }
    if (c === ',' && !inStr) {
      let j = i + 1;
      while (j < s.length && /\s/.test(s[j])) j++;
      if (s[j] === '}' || s[j] === ']') continue; // 丢尾逗号
    }
    out += c;
  }
  return out;
};
const data = JSON.parse(stripTrailing(literal));

const LOCALES = ['zh-hk', 'en', 'ja'];

// ---- 显示宽度：CJK/全角 = 2，其余 = 1 ----
const wide = (ch) => {
  const cp = ch.codePointAt(0);
  return (cp >= 0x2e80 && cp <= 0x9fff) || (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xff01 && cp <= 0xff60) || (cp >= 0x3000 && cp <= 0x303f) ? 2 : 1;
};
const dispWidth = (s) => [...s].reduce((a, c) => a + wide(c), 0);

// ---- A. 长度分布 ----
const buckets = { '<70': [], '70-120': [], '120-155': [], '>155显示截断': [] };
const rows = [];
for (const [slug, entry] of Object.entries(data)) {
  for (const loc of LOCALES) {
    const seo = entry?.seo?.[loc];
    if (!seo?.description) continue;
    const w = dispWidth(seo.description);
    const t = seo.title || '';
    rows.push({ slug, loc, descW: w, titleW: equiv(t) });
    (w < 70 ? buckets['<70'] : w < 120 ? buckets['70-120'] : w <= 155 ? buckets['120-155'] : buckets['>155显示截断']).push(`${slug} [${loc}] w=${w}`);
  }
}

// ---- B. 重复检测 ----
const byDesc = new Map();
for (const r of rows) {
  const key = data[r.slug].seo[r.loc].description;
  if (!byDesc.has(key)) byDesc.set(key, []);
  byDesc.get(key).push(`${r.slug} [${r.loc}]`);
}
const dupGroups = [...byDesc.entries()].filter(([, v]) => v.length > 1);

// ---- C. 钱词覆盖 ----
// [term, market, 源, 9/18 P 级]
const TERMS = [
  // zh-hk P1（位置好 0 点击，9/18 分析）
  ['食品包裝印刷', 'zh-hk', 'P1 145imp pos6.65'],
  ['a6 尺寸', 'zh-hk', 'P1 97imp pos8.86'],
  ['小冊子印刷', 'zh-hk', 'P1 48imp pos10.04'],
  ['大信封', 'zh-hk', 'P1 45imp pos4.42'],
  ['邊度有紙袋買', 'zh-hk', 'P1 36imp pos7.44'],
  // zh-hk P2（大词 20-36 位）
  ['月曆印刷', 'zh-hk', 'P2 126imp pos20.3'],
  ['海報印刷', 'zh-hk', 'P2 174imp pos22.6'],
  ['貼紙印刷', 'zh-hk', 'P2 165imp pos27.3'],
  ['印海報', 'zh-hk', 'P2 143imp pos23.7'],
  ['宣傳單張印刷', 'zh-hk', 'P2 127imp pos32.1'],
  ['包裝盒印刷', 'zh-hk', 'P2 69imp pos36.8'],
  ['紙袋印刷', 'zh-hk', 'map G3 67imp'],
  ['餐牌印刷', 'zh-hk', 'map G3 66imp'],
  ['騎馬釘印刷', 'zh-hk', 'map G4 64imp'],
  ['利是封印刷', 'zh-hk', 'map G4 57imp'],
  ['證書印刷', 'zh-hk', 'map G3 18imp'],
  ['畢業紀念冊', 'zh-hk', 'map G2 7imp'],
  ['即日印刷', 'zh-hk', 'map G2 35imp'],
  ['信封印刷', 'zh-hk', 'map G2 7imp'],
  // en P1
  ['small batch sticker printing', 'en', 'P1 69imp pos6.61'],
  ['small batch stickers', 'en', 'P1 40imp pos5.53'],
  // en P2/词图
  ['catalog printing', 'en', 'map 33imp G4'],
  ['exercise book', 'en', 'map 64imp G4'],
  ['saddle stitch booklet', 'en', 'map 50-63imp G5'],
  ['book printing hong kong', 'en', 'map 8imp G4'],
  ['flyer printing', 'en', 'map G2 2点击'],
  ['hardcover menu', 'en', 'map G5'],
  ['calendar', 'en', 'map AEO 22imp'],
  // ja 词图高优
  ['両面カラー印刷', 'ja', 'map 65imp G4'],
  ['クラフト紙', 'ja', 'map 63imp G4'],
  ['教科書', 'ja', 'map 27imp G5'],
  ['カタログ印刷', 'ja', 'map 20imp G5'],
  ['教材', 'ja', 'map 76imp G5'],
  ['小ロット', 'ja', 'map 小ロット词族'],
  ['同人', 'ja', 'map 同人词族'],
  ['卒業アルバム', 'ja', 'map 5imp G5'],
  ['紙袋', 'ja', 'map 6imp G5'],
  ['ポスター', 'ja', 'map a2 ポスター词族'],
];

const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const coverage = TERMS.map(([term, loc, src]) => {
  const nterm = norm(term);
  let inTitle = [], inDesc = [];
  for (const [slug, entry] of Object.entries(data)) {
    const seo = entry?.seo?.[loc];
    if (!seo) continue;
    const hayT = norm(seo.title || '');
    const hayD = norm(seo.description || '');
    // 空格可选匹配（应对 ja/en 插空、zh 无空格）
    const tCompact = nterm.replace(/ /g, '');
    if (hayT.replace(/ /g, '').includes(tCompact)) inTitle.push(slug);
    if (hayD.replace(/ /g, '').includes(tCompact)) inDesc.push(slug);
  }
  return { term, loc, src, titleHits: inTitle.length, descHits: inDesc.length, titleSlugs: inTitle.slice(0, 4), descSlugs: inDesc.slice(0, 4) };
});

// ---- 输出 ----
const out = {
  generatedFor: '2026-09-21',
  slots: rows.length,
  descWidth: {
    avg: Math.round(rows.reduce((a, r) => a + r.descW, 0) / rows.length),
    min: Math.min(...rows.map((r) => r.descW)),
    max: Math.max(...rows.map((r) => r.descW)),
    over155: rows.filter((r) => r.descW > 155).length,
    under70: rows.filter((r) => r.descW < 70).length,
  },
  buckets: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
  over155List: buckets['>155显示截断'].slice(0, 40),
  dupGroups: dupGroups.length,
  dupList: dupGroups.slice(0, 10).map(([d, v]) => ({ count: v.length, slots: v.slice(0, 6), descHead: d.slice(0, 60) })),
  coverageZero: coverage.filter((c) => c.titleHits === 0 && c.descHits === 0),
  coverageTitleOnly: coverage.filter((c) => c.titleHits > 0 && c.descHits === 0),
  coverageFull: coverage.filter((c) => c.titleHits > 0 && c.descHits > 0).length,
  coverageTotal: coverage.length,
  coverage,
};

console.log(JSON.stringify({
  ...out,
  coverage: undefined,
  coverageZero: out.coverageZero,
  coverageTitleOnly: out.coverageTitleOnly,
}, null, 2));

fs.writeFileSync(path.join(ROOT, '.hermes/reports/sku-desc-moneyterm-2026-09-21.json'), JSON.stringify(out, null, 2));
console.error('[report] .hermes/reports/sku-desc-moneyterm-2026-09-21.json');
