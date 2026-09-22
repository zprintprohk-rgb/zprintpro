#!/usr/bin/env node
/**
 * 门童 #27 title-v5-guard — SKU 标题 v5 规则全面审查 (生成好的标题必须过门童)
 * scripts/guards/title-v5-guard.js — 门童 #27: SKU 标题 v5 规则全面审查 (K3 2026-09-23 指令「生成好的标题一定要有门童去审查机制」)
 *
 * 规则 SSoT: docs/zprintpro-sku-title-rule-v5-2026-09-23.md (五段式 + 当量 50-57 + 长尾来源阶梯 L0>L1>L2>L3 + 记录义务)
 * 当量口径 : scripts/guards/title-equiv.js (SSoT, 禁另写阈值; 58 = 阻断线)
 * 素材库    : scripts/guards/title-hooks.json (approved 钩子 / conditional_forbidden_until_k3 / gscClusters)
 * 冻结豁免  : src/data/title-window-freeze.ts (冻结槽只读 → 全部降为 WARN, 不拦)
 *
 * 机检维度 (HARD = 硬拦 / WARN = 复核建议, 不拦):
 *   [HARD] 当量 >57 (TRIM)                        —— 防 SERP 截断 + Google 重写
 *   [HARD] 品牌规则 (zh-hk 智印港×1 无 ZprintPro; en/ja ZprintPro×1 无 智印港; ジープリント不与 ZprintPro 同现; 双品牌)
 *   [HARD] 空洞词禁令 (zh 品質保證/專業印刷/超值…; en Free US Ship/Free Shipping $99+…; ja 安い/最安/激安/高品質/高画質…)
 *   [HARD] 翻译层铁律 (zh-hk 无简体(scan-simplified 表)/无 kana(除「・」); en 无 CJK; ja 无简体/禁「份」)
 *   [HARD] 无数字钩子 (三语各带; 主词/长尾/工艺齐但无 MOQ/价格/急件钩 = v5 违规)
 *   [HARD] 价格真值 (title 内 HK$/$/¥ 必须 == products.ts basePrice(locale); 数字钩子从 products.ts 现取, SSoT title-hooks.json;
 *           允许整包倍数: 价格 == basePrice × MOQ; Free Ship/Shipping 阈值短语先剔除)
 *   [HARD] MOQ 失实 (title 内数量 N+单位 < products.ts minQuantity = 承诺低于起订量 = 失实; 合成语境 N件齊全/N Pcs Set/N枚組 剔除)
 *   [WARN] MOQ 漂移 (title MOQ ≠ minQuantity 且 ≥, 需确认 bulk tier) / 价格无 basePrice 可对照 / 当量<50 / 长尾无 GSC/词库实证 / 冻结槽违规
 *
 * 判据铁律 (§0.35.4): --commit 只拦 **staged diff 中新增/修改** 的 title; 存量 issue 落审计 JSON 不拦 (批次工单消费);
 *   --strict 则全量存量也拦 (供批次验收 / 手动普查用)。
 *
 * 用法:
 *   node scripts/guards/title-v5-guard.js                # 全量只读审计 (写 .hermes/logs/sku-title-v5-audit-<date>.json)
 *   node scripts/guards/title-v5-guard.js --commit       # pre-commit 调用: 只审 staged 新增/修改 title
 *   node scripts/guards/title-v5-guard.js --strict       # 存量也拦
 */
'use strict';
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./title-equiv.js');

const ROOT = path.resolve(__dirname, '..', '..');
const LOCALES = ['zh-hk', 'en', 'ja'];
const COMMIT_MODE = process.argv.includes('--commit');
const STRICT_MODE = process.argv.includes('--strict');
const TODAY = new Date().toISOString().slice(0, 10);

/* ================= 数据源加载 ================= */

function parseTitles(src) {
  const out = [];
  const starts = [...src.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: src.length });
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = src.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of LOCALES) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (m) out.push({ slug: starts[i].slug, locale: loc, title: m[1].replace(/\\"/g, '"') });
    }
  }
  return out;
}

function parseProducts(src) {
  const out = {};
  const starts = [...src.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: src.length });
  for (let i = 0; i < starts.length - 1; i++) {
    const block = src.slice(starts[i].idx, starts[i + 1].idx);
    const g = (re) => { const m = block.match(re); return m ? m[1] : null; };
    const num = (v) => (v === null || v === undefined ? null : Number(v));
    const nameLoc = (loc) => {
      const flat = block.match(new RegExp(`name_${loc.replace('-', '_')}:\\s*['"]([^'"]*)['"]`));
      if (flat) return flat[1];
      const m = block.match(/name:\s*\{([\s\S]*?)\}/);
      if (m) {
        const lm = m[1].match(new RegExp(`['"]?${loc}['"]?\\s*:\\s*['"]([^'"]*)['"]`));
        if (lm) return lm[1];
      }
      return null;
    };
    out[starts[i].slug] = {
      minQuantity: num(g(/\bminQuantity:\s*(\d+)/)),
      basePrice: num(g(/\bbasePrice:\s*([\d.]+)/)),
      basePrice_en: num(g(/\bbasePrice_en:\s*([\d.]+)/)),
      basePrice_ja: num(g(/\bbasePrice_ja:\s*([\d.]+)/)),
      name: nameLoc('zh-hk'),
      name_en: nameLoc('en'),
      name_ja: nameLoc('ja'),
    };
  }
  return out;
}

function loadFrozen() {
  try {
    const txt = fs.readFileSync(path.join(ROOT, 'src/data/title-window-freeze.ts'), 'utf8');
    return new Set([...txt.matchAll(/['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]));
  } catch { return new Set(); }
}

function loadHooks() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/guards/title-hooks.json'), 'utf8'));
  } catch { return { hooks: {}, gscClusters: {} }; }
}

function loadGscCorpus() {
  const corpus = new Set();
  try {
    const g = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/gsc-2026-09-18/extract.json'), 'utf8'));
    const q28 = g.new && g.new.combo_28d && g.new.combo_28d['查询'];
    const arr = Array.isArray(q28) ? q28 : [];
    for (const r of arr) {
      const q = r && r['查询'];
      if (typeof q === 'string' && q.length >= 2) corpus.add(q.toLowerCase());
    }
  } catch {}
  return corpus;
}

/* ================= 规则常量 ================= */

const BRAND = { 'zh-hk': '智印港', en: 'ZprintPro', ja: 'ZprintPro' };
const OTHER_BRAND = { 'zh-hk': ['ZprintPro', 'ジープリント'], en: ['智印港', 'ジープリント'], ja: ['智印港', 'ジープリント'] };
// 空洞词/无源承诺 (v5 §禁令 + 本审计实证; 条件承诺钩 Free Ship/免費送貨 亦禁于标题, title-hooks usage)
const FILLER = {
  'zh-hk': ['品質保證', '專業印刷', '專業品質', '質素保證', '超值', '超抵', '最抵', '低至', '全城最', '免費送貨'],
  en: ['Free US Ship', 'Free Shipping $', 'Free Shipping over', 'Free Shipping on orders', 'Free Ship $', 'Best Price', 'Lowest Price'],
  ja: ['安い', '最安', '激安', '高品質', '高画質', '最高品質', '最適な', '最安値', '高級感'],
};
// 无数字钩子判定: 命中其一即有钩 (ja 含 セット; zh 含 即日/隔日/急件)
const HOOK = {
  'zh-hk': /(?:\d+\s*(?:個|張|本|份|件|枚|盒|冊|部|隻|粒|套|起))|(?:HK\$\s*\d)|(?:即日|隔日|急件)|(?:\d+\s*日)/,
  en: /(?:\d+\s*(?:pcs|pc|packs?|sheets|booklets|rolls?|boxes?|units?|pages?|sets?|moq|pack)\b)|(?:\$?\s*\d+(?:\.\d+)?)|(?:same-?day|24h\b|24 hours)/i,
  ja: /(?:\d+\s*(?:枚|冊|個|部|本|袋|組|箱|セット|セツト|〜))|(?:¥\s*\d)|\d+\s*日/,
};
// kana (排除 U+30FB「・」中黑点, zh-hk 常用分隔; 排除 U+30A0)
const KANA_RE = /[\u3040-\u309f\u30a1-\u30fa\u30fc-\u30ff]/;
// 简体字表: 与 scripts/scan-simplified.mjs 同源 (高频印刷/产品简体专字; 定/卓 等共享字不拦)
const SIMPLIFIED_CHARS = /[贴纸单样胶册开环烫订专质货运标号广龙极飞术复图书制厅际备养营获证读设计构团对创药饮饰农贸铁银钟学点话认长门间国时来动场带块条组编圆压头实写将觉见购销费预项须顺领顾验历里发台适]/;
// ja 专属简体表 = 上表剔除「日文合法汉字」(学/国/来/里/条/写/将/台/点/号/制 — 如 学校/点/台/条件/将来 为合法日文)
const SIMPLIFIED_CHARS_JA = /[贴纸样单开环烫订专质货运标号广龙极飞术复图书厅际备养营获证读设计构团对创药饮饰农贸铁银钟话认门间动场带块组编圆压头实觉见购销费预项须顺领顾验历发适长]/;
// 价格提取 / 数量(MOQ)提取
const PRICE_RE = { 'zh-hk': /HK\$\s*(\d+(?:\.\d+)?)/g, en: /\$\s*(\d+(?:\.\d+)?)/g, ja: /¥\s*(\d+(?:\.\d+)?)/g };
const MOQ_RE = {
  'zh-hk': /(\d+)\s*(個|張|本|份|件|枚|盒|冊|部|隻|粒|套)(?![件齊全])/g,
  en: /(\d+)\s*(pcs|pc|packs?|sheets|booklets|rolls?|boxes?|units?|pages?|sets?|moq)\b/gi,
  ja: /(\d+)\s*(枚|冊|個|部|本|袋|組|箱|セット|セツト)/g,
};
// 合成语境 (非 MOQ): N件齊全 / N Pcs Set / N枚組 / N枚セット 等
const COMPOSITION_AFTER = /^(?:齊全|Set\b|組|セット|セツト|ピース|點|項)/i;
// 判定某 MOQ 命中是否为「合成语境」而非真实 MOQ
const isComposition = (t, m) => COMPOSITION_AFTER.test(t.slice(m.index + m[0].length, m.index + m[0].length + 6).trim());

/* ================= 数据 ================= */

const curTxt = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
const slots = parseTitles(curTxt);
const products = parseProducts(fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf8'));
const frozen = loadFrozen();
const hooksLib = loadHooks();
const gscCorpus = loadGscCorpus();

/* ================= 判定 ================= */

function checkSlot(s) {
  const { slug, locale, title } = s;
  const H = [];
  const W = [];
  const isFrozen = frozen.has(slug);
  const truth = products[slug] || {};
  const t = title;

  // --- 当量 ---
  const e = equiv(t);
  const b = band(t);
  if (b === 'TRIM') H.push({ rule: 'BAND_TRIM', msg: `当量 ${e} > ${TITLE_MAX} (≥${TITLE_MAX + 1} 阻断线)` });
  else if (b === 'FILL') W.push({ rule: 'BAND_FILL', msg: `当量 ${e} < ${TITLE_MIN} (不足线)` });

  // --- 品牌 ---
  const brand = BRAND[locale];
  const other = OTHER_BRAND[locale];
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const count = (pat) => (t.match(new RegExp(esc(pat), 'g')) || []).length;
  const brandCount = count(brand);
  const bad = other.filter((o) => t.includes(o));
  if (brandCount > 1) H.push({ rule: 'BRAND_DOUBLE', msg: `品牌 ${brand} 出现 ${brandCount} 次 (品牌末尾一次)` });
  if (brandCount === 0) W.push({ rule: 'BRAND_MISSING', msg: `未见 ${locale} 品牌 ${brand}` });
  if (bad.length) H.push({ rule: 'BRAND_WRONG_LOCALE', msg: `含他语品牌 ${bad.join('/')} (${locale} 应用 ${brand})` });
  if (locale === 'ja' && t.includes('ジープリント') && t.includes('ZprintPro')) H.push({ rule: 'BRAND_JA_ALTERNATE', msg: 'ジープリント 与 ZprintPro 字面同现' });

  // --- 空洞词 ---
  for (const f of FILLER[locale]) {
    if (t.includes(f)) H.push({ rule: 'FILLER_WORD', msg: `空洞/无源/条件承诺词「${f}」 (v5 禁令, 禁用于标题)` });
  }

  // --- 翻译层 ---
  if (locale === 'zh-hk') {
    if (SIMPLIFIED_CHARS.test(t)) H.push({ rule: 'I18N_SIMP_IN_ZHHK', msg: 'zh-hk title 含简体残留' });
    if (KANA_RE.test(t)) H.push({ rule: 'I18N_KANA_IN_ZHHK', msg: 'zh-hk title 含日文假名 (跨语言污染)' });
  } else if (locale === 'en') {
    if (/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}/u.test(t)) H.push({ rule: 'I18N_CJK_IN_EN', msg: 'en title 含中日文 (跨语言污染)' });
  } else if (locale === 'ja') {
    if (t.includes('份')) H.push({ rule: 'JA_FORBIDDEN_FEN', msg: 'ja title 禁「份」 (应 枚/個/冊/部/本)' });
    if (SIMPLIFIED_CHARS_JA.test(t)) H.push({ rule: 'I18N_SIMP_IN_JA', msg: 'ja title 含简体残留' });
  }

  // --- 无数字钩子 ---
  if (!HOOK[locale].test(t)) H.push({ rule: 'NO_HOOK', msg: '无数字钩子 (MOQ/价格/急件), v5 五段式缺钩' });

  // --- 数字真值 (价格 / MOQ) ---
  const priceTruth = { 'zh-hk': truth.basePrice, en: truth.basePrice_en, ja: truth.basePrice_ja }[locale];
  // 剔除 Free Ship/Shipping 阈值短语后再取价 (阈值非产品价)
  const priceScanTxt = t.replace(/Free\s+US\s+Ship|Free\s+Shipping\s+\$?\d+(?:\.\d+)?|Free\s+Ship\s+\$?\d+(?:\.\d+)?|免費送貨|滿\$?\d+/gi, '');
  const prices = [...priceScanTxt.matchAll(PRICE_RE[locale])].map((m) => Number(m[1]));
  // 同 title 的 MOQ (供整包倍数判定)
  const moqNums = [...t.matchAll(MOQ_RE[locale])].filter((m) => !isComposition(t, m)).map((m) => Number(m[1]));
  for (const p of prices) {
    if (priceTruth === null || priceTruth === undefined || Number.isNaN(priceTruth)) {
      W.push({ rule: 'PRICE_UNVERIFIABLE', msg: `价格 ${p} 无 basePrice(${locale}) 可对照 (须注明来源: 阶梯/急件价)` });
    } else if (Math.abs(p - priceTruth) <= 0.011) {
      /* 匹配 basePrice ✓ */
    } else if (moqNums.some((q) => q > 0 && Math.abs(p - priceTruth * q) <= 0.011 * q)) {
      /* 整包倍数 ✓ (basePrice × MOQ) */
    } else {
      H.push({ rule: 'PRICE_MISMATCH', msg: `标题价 ${p} ≠ basePrice(${locale})=${priceTruth} (数字钩子须从 products.ts 现取, title-hooks SSoT)` });
    }
  }
  // MOQ
  const minQ = truth.minQuantity;
  const moqs = [...t.matchAll(MOQ_RE[locale])].filter((m) => !isComposition(t, m));
  for (const m of moqs) {
    const q = Number(m[1]);
    if (minQ === null || minQ === undefined) {
      W.push({ rule: 'MOQ_UNVERIFIABLE', msg: `MOQ ${q} 无 products.ts minQuantity 可对照` });
    } else if (q < minQ) {
      H.push({ rule: 'MOQ_BELOW_MIN', msg: `标题 MOQ ${q} < products.ts minQuantity=${minQ} (承诺低于起订量 = 失实)` });
    } else if (q !== minQ) {
      W.push({ rule: 'MOQ_DRIFT', msg: `标题 MOQ ${q} ≠ minQuantity=${minQ} (需确认 bulk tier / desc 口径)` });
    }
  }

  // --- 长尾来源 (WARN; 首段=主词跳过, 钩子段/品牌段跳过) ---
  {
    const mainWords = [truth.name, truth.name_en, truth.name_ja].filter(Boolean);
    const segs = t.split('|').map((x) => x.trim()).filter(Boolean);
    segs.slice(1).forEach((seg, i) => {
      const s = seg.replace(/\d+(?:\.\d+)?\s*(?:個|張|本|份|件|枚|盒|冊|部|隻|粒|套|pcs|pc|packs?|sheets|moq|枚|セット|〜)?/gi, '').trim();
      if (s.length < 2) return;
      if (s === brand || other.some((o) => s.includes(o))) return;
      if (isStopword(s)) return;
      if (mainWords.some((mw) => mw && (s.includes(mw) || mw.includes(s)))) return;
      const hitCorpus = gscCorpus.size > 0 && gscCorpus.has(s.toLowerCase());
      const hitCluster = Object.values(hooksLib.gscClusters || {}).some((c) =>
        Object.values(c).flat().some((w) => w && (s.includes(w) || w.includes(s))));
      if (!hitCorpus && !hitCluster) {
        W.push({ rule: 'LONGTAIL_SOURCE', msg: `长尾段「${s}」无 GSC 实证/DELIVERY 词库命中 → 须注明 L2 来源或撤 (v5 L0-L3 阶梯)` });
      }
    });
  }

  // --- 冻结槽: HARD 全部降级为 WARN (只读不可改) ---
  if (isFrozen) {
    for (const h of H) W.push({ ...h, rule: `FROZEN_${h.rule}`, msg: `[冻结槽只读] ${h.msg}` });
    return { slug, locale, title, equiv: e, frozen: true, hard: [], warn: W };
  }
  return { slug, locale, title, equiv: e, frozen: false, hard: H, warn: W };
}

function isStopword(s) {
  return /^(?:印刷|打印|printing|print|custom|定製|定制|製作|制作|批發|批发|訂製|サービス|service|オーダー|お見積|價格|价格|價錢|价钱|網上|网上|online|高級|premium)$/i.test(s);
}

/* ================= 执行 ================= */

let targets = slots;
if (COMMIT_MODE) {
  let headTxt = '';
  try { headTxt = execSync('git show HEAD:src/data/sku-seo-data.ts', { cwd: ROOT, encoding: 'utf8', maxBuffer: 40 * 1024 * 1024 }); } catch { headTxt = ''; }
  const headSlots = headTxt ? parseTitles(headTxt) : [];
  const headMap = new Map(headSlots.map((x) => [`${x.slug}|${x.locale}`, x.title]));
  targets = slots.filter((x) => headMap.get(`${x.slug}|${x.locale}`) !== x.title);
  if (!targets.length) console.log('[门童 #27] title-v5: staged 无 title 变更, 跳过 (全量审计仍落日志)');
}

const results = slots.map(checkSlot);
const targetSet = new Set(targets.map((t) => `${t.slug}|${t.locale}`));
const changedResults = COMMIT_MODE ? results.filter((r) => targetSet.has(`${r.slug}|${r.locale}`)) : [];

const logDir = path.join(ROOT, '.hermes/logs');
fs.mkdirSync(logDir, { recursive: true });
const audit = {
  date: TODAY,
  guard: '#27 title-v5-guard',
  mode: COMMIT_MODE ? 'commit' : STRICT_MODE ? 'strict' : 'audit',
  rule: 'v5 全规则机检 (SSoT docs/zprintpro-sku-title-rule-v5-2026-09-23.md)',
  slotCount: slots.length,
  frozen: [...frozen],
  hardCount: results.reduce((n, r) => n + r.hard.length, 0),
  warnCount: results.reduce((n, r) => n + r.warn.length, 0),
  hardByRule: {},
  warnByRule: {},
  findings: results.map((r) => ({ slug: r.slug, locale: r.locale, title: r.title, equiv: r.equiv, frozen: r.frozen, hard: r.hard, warn: r.warn })),
};
for (const r of results) {
  for (const h of r.hard) audit.hardByRule[h.rule] = (audit.hardByRule[h.rule] || 0) + 1;
  for (const w of r.warn) audit.warnByRule[w.rule] = (audit.warnByRule[w.rule] || 0) + 1;
}
fs.writeFileSync(path.join(logDir, `sku-title-v5-audit-${TODAY}.json`), JSON.stringify(audit, null, 2), 'utf8');

console.log(`[门童 #27] title-v5: ${slots.length} 槽审计 → .hermes/logs/sku-title-v5-audit-${TODAY}.json`);
console.log(`[门童 #27] HARD=${audit.hardCount} (${Object.keys(audit.hardByRule).map((k) => `${k}:${audit.hardByRule[k]}`).join(' ') || '无'}) | WARN=${audit.warnCount} | 冻结槽=${audit.frozen.length}`);
if (audit.warnCount) console.log(`[门童 #27] ⚠️ WARN 分布: ${Object.entries(audit.warnByRule).map(([k, v]) => `${k}:${v}`).join(' ')}`);

let blocking = [];
if (STRICT_MODE) blocking = results.filter((r) => r.hard.length);
else if (COMMIT_MODE) blocking = changedResults.filter((r) => r.hard.length);

if (blocking.length) {
  console.error(`[门童 #27] ❌ HARD 拦截 (${blocking.length} 槽, ${STRICT_MODE ? 'strict' : 'staged 变更'}):`);
  for (const r of blocking) {
    console.error(`  ${r.slug}|${r.locale} (当量 ${r.equiv}${r.frozen ? ', 冻结' : ''}):`);
    for (const h of r.hard) console.error(`    🔴 ${h.rule}: ${h.msg}`);
  }
  console.error('[门童 #27] 修法: 修 title 至 v5 合规后重试; 价格/MOQ 数字钩子须从 products.ts 真值现取; 空洞/条件承诺词禁用于标题');
  process.exit(1);
}
if (COMMIT_MODE) console.log(`[门童 #27] staged title 变更 ${changedResults.length} 槽: 0 HARD ✅`);
