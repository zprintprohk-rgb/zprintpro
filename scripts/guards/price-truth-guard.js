#!/usr/bin/env node
/**
 * scripts/guards/price-truth-guard.js — 价格/MOQ 真值断言 (SOP-5 常态机检, 2026-10-20)
 *
 * 权威真值: src/data/products.ts — minQuantity / basePrice / price_range
 * 检查对象: src/data/sku-seo-data.ts 每个 SKU 块的 zh-hk / en / ja 三语文本
 *
 * 检查项:
 *  A. MOQ 断言 (HARD): 文本中 "N 個/張/枚/本/冊起印|起" / "N MOQ|MOQ N|from N (pcs|pieces)" /
 *     "N 枚|個|本から" 断言值必须 == products.ts minQuantity;
 *     豁免: 拼版/量產档位 (500/1000/2000/5000/10000) 视为合法 tier, 不计 mismatch。
 *  B. 价格带 (WARN): HK$/US$/¥ 数字若落在 price_range 区间外 → 提示复核 (抓标题级价格内战)。
 *
 * 用法: node scripts/guards/price-truth-guard.js [--strict]   (--strict: WARN 也 exit 1)
 */
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const P_PROD = path.join(REPO, 'src', 'data', 'products.ts');
const P_SEO = path.join(REPO, 'src', 'data', 'sku-seo-data.ts');
const STRICT = process.argv.includes('--strict');

const prod = fs.readFileSync(P_PROD, 'utf8');
const seo = fs.readFileSync(P_SEO, 'utf8');

// --- 真值表 ---
const slugMarks = [];
const reSlug = /^    slug: '([a-z0-9-]+)',$/gm;
let m;
while ((m = reSlug.exec(prod)) !== null) slugMarks.push({ slug: m[1], off: m.index });
const truth = {};
for (let i = 0; i < slugMarks.length; i++) {
  const seg = prod.slice(slugMarks[i].off, i + 1 < slugMarks.length ? slugMarks[i + 1].off : prod.length);
  const mq = seg.match(/minQuantity: (\d+)/);
  const bp = seg.match(/basePrice: ([\d.]+)/);
  const pr = seg.match(/price_range: '([^']+)'/);
  if (!mq) continue;
  truth[slugMarks[i].slug] = {
    minQ: +mq[1],
    base: bp ? +bp[1] : null,
    range: pr ? pr[1] : null,
  };
}

// --- 块切分 ---
const blocks = [];
const reB = /^  "([a-z0-9-]+)": \{/gm;
while ((m = reB.exec(seo)) !== null) blocks.push({ slug: m[1], off: m.index });
for (let i = 0; i < blocks.length; i++) {
  blocks[i].end = i + 1 < blocks.length ? blocks[i + 1].off : seo.length;
}

const TIERS = new Set([500, 1000, 2000, 5000, 10000, 30000, 50000]);
const MOQ_PATTERNS = [
  /(\d{1,6})\s*(?:個|张|張|枚|本|冊|册)\s*起印/g,
  /(\d{1,6})\s*(?:個|张|張|枚|本|冊|册)\s*起(?![印])/g,
  /(\d{1,6})\s*(?:pcs|pieces|units)?\s*MOQ\b/gi,
  /\bMOQ\s*(?:is\s*)?(\d{1,6})/gi,
  /from\s+(\d{1,6})\s*(?:pcs|pieces)\b/gi,
  /(\d{1,6})\s*(?:枚|個|本|冊|セット)から/g,
  /(\d{1,6})\s*枚〜/g,
];
// 单价形态才校验价格带 (总价/合计不算)
const PRICE_PATTERNS = [
  /HK\$\s*([\d,]+(?:\.\d+)?)\s*\/\s*(?:張|個|本|枚|冊|pcs|piece)/gi,
  /US\$\s*([\d,]+(?:\.\d+)?)\s*\/\s*(?:sheet|pc|pcs|piece|unit)/gi,
  /¥\s*([\d,]+(?:\.\d+)?)\s*\/\s*(?:枚|個|本|冊|pc)/g,
];

const hard = [];
const warn = [];
let checkedBlocks = 0;
let skippedNoTruth = [];

for (const b of blocks) {
  const t = truth[b.slug];
  const blk = seo.slice(b.off, b.end);
  if (!t) { skippedNoTruth.push(b.slug); continue; }
  checkedBlocks++;
  // 收集块内全部 MOQ 声称, 取最小值做主判定 (档位豁免)
  const claims = new Set();
  for (const re of MOQ_PATTERNS) {
    re.lastIndex = 0;
    let mm;
    while ((mm = re.exec(blk)) !== null) {
      const n = +mm[1];
      if (!n || TIERS.has(n)) continue;
      claims.add(n);
    }
  }
  if (claims.size) {
    const minClaim = Math.min(...claims);
    if (minClaim < t.minQ) {
      hard.push({ slug: b.slug, got: minClaim, want: t.minQ, all: [...claims].sort((a, b) => a - b).slice(0, 6).join('/') });
    } else if (minClaim > t.minQ) {
      warn.push({ slug: b.slug, got: minClaim, want: t.minQ, all: [...claims].sort((a, b) => a - b).slice(0, 6).join('/') });
    }
  }
  // 单价越界 (仅 unit-price 形态)
  if (t.range) {
    const rm = t.range.match(/HK\$([\d.]+)-([\d.]+)/);
    if (rm) {
      const lo = +rm[1], hi = +rm[2];
      for (const re of PRICE_PATTERNS) {
        re.lastIndex = 0;
        let pm;
        while ((pm = re.exec(blk)) !== null) {
          const v = parseFloat(pm[1].replace(/,/g, ''));
          if (!isFinite(v)) continue;
          if (v > 0 && (v < lo * 0.999 || v > hi * 1.001)) {
            warn.push({ slug: b.slug, got: pm[0], band: t.range, kind: 'price' });
          }
        }
      }
    }
  }
}

// 去重 warn
const seen = new Set();
const warnU = warn.filter(w => { const k = w.slug + '|' + w.got + '|' + (w.kind || 'moq'); if (seen.has(k)) return false; seen.add(k); return true; });

// ---- hub 标题价检查: featuredSnippet 每件价 < 包装类目每件地板价 → WARN ----
const HUB = path.join(REPO, 'src', 'data', 'category-seo-content.ts');
let hubWarn = [];
if (fs.existsSync(HUB)) {
  const hub = fs.readFileSync(HUB, 'utf8');
  const pc = hub.indexOf('packagingContent');
  const zh = hub.indexOf("'zh-hk': {", pc);
  const mEn = hub.slice(zh).match(/\n\s{2}(?:'en'|en):\s*\{/);
  const enB = mEn ? zh + mEn.index : hub.length;
  const mJa = hub.slice(enB).match(/\n\s{2}(?:'ja'|ja):\s*\{/);
  const jaB = mJa ? enB + mJa.index : hub.length;
  const blocks = [hub.slice(zh, enB), hub.slice(enB, jaB)];
  // 包装类目每件地板价 = min(所有 /個 结尾区间的下限)
  let floor = Infinity;
  Object.values(truth).forEach(t => {
    if (!t.range) return;
    const rm = t.range.match(/HK\$([\d.]+)-([\d.]+)\/(?:個|張)$/);
    if (rm) floor = Math.min(floor, +rm[1]);
  });
  if (isFinite(floor)) {
    blocks.forEach((b, bi) => {
      const fs_ = b.indexOf('featuredSnippet');
      if (fs_ < 0) return;
      const seg = b.slice(fs_, fs_ + 700);
      const re = /(HK\$|US\$)([\d.]+)\s*\/\s*(?:個|pc|piece|枚)(?:起)?/g;
      let mm;
      while ((mm = re.exec(seg)) !== null) {
        let v = parseFloat(mm[2]);
        if (mm[1] === 'US$') v = v * 7.8; // 粗换算仅用于地板比对
        if (v < floor) hubWarn.push({ loc: bi ? 'en' : 'zh-hk', got: mm[0], floor: 'HK$' + floor });
      }
    });
  }
}

// ---- products-content longDescription MOQ WARN (report-only, 2026-10-20) ----
const PC = path.join(REPO, 'src', 'data', 'products-content.ts');
let pcWarn = [];
if (fs.existsSync(PC) && process.argv.includes('--products-content')) {
  const pc = fs.readFileSync(PC, 'utf8');
  const pcBlocks = [...pc.matchAll(/^  '([a-z0-9-]+)': \{/gm)].map(mm => ({ slug: mm[1], off: mm.index }));
  for (let i = 0; i < pcBlocks.length; i++) {
    const seg = pc.slice(pcBlocks[i].off, i + 1 < pcBlocks.length ? pcBlocks[i + 1].off : pc.length);
    const nums = [...seg.matchAll(/(\d{1,6})\s*(?:個|張|枚|本|冊)\s*起(?:印)?/g)].map(x => +x[1]).filter(n => n >= 10);
    const tr = truth[pcBlocks[i].slug];
    if (!tr || !nums.length) continue;
    const min = Math.min(...nums);
    if (min !== tr.minQ) pcWarn.push({ slug: pcBlocks[i].slug, min, truth: tr.minQ });
  }
}

console.log(`[price-truth] blocks=${blocks.length} checked=${checkedBlocks} noTruth=${skippedNoTruth.length}${skippedNoTruth.length ? ' (' + skippedNoTruth.slice(0, 8).join(',') + ')' : ''}`);
console.log(`[price-truth] MOQ HARD(欠承诺)=${hard.length}  WARN(保守/单价)=${warnU.length}  HUB WARN=${hubWarn.length}  P-CONTENT WARN=${pcWarn.length}`);
pcWarn.slice(0, 15).forEach(w => console.log(`  PC ${w.slug}: 最小声称 ${w.min} vs 真值 ${w.truth}`));
hard.slice(0, 40).forEach(h => console.log(`  HARD ${h.slug}: 最小声称 ${h.got} < 真值 ${h.want}  声称集[${h.all}]`));
warnU.slice(0, 40).forEach(w => console.log(`  WARN ${w.slug}: ${w.got}${w.kind === 'price' ? ' 越出 ' + w.band : ' > 真值 ' + w.want + ' 声称集[' + w.all + ']'}`));
hubWarn.forEach(h => console.log(`  HUB ${h.loc}: ${h.got} < 类目地板 ${h.floor}`));

const fail = hard.length > 0 || (STRICT && (warnU.length > 0 || hubWarn.length > 0));
process.exit(fail ? 1 : 0);
