/**
 * 门童 #20: meta description 完整性 (K3 2026-09-18 批准 §8 选项 A)
 *
 * 批准范围: 「建 meta description 门童 + 只修机械缺陷」
 *   ① zh-hk/en/ja meta 语言错配   ② 首词重复/前缀重复   ③ 空 meta
 *
 * 事故依据 (2026-09-18 L1-1 诊断实测):
 *   - zh-hk/blog/food-packaging-printing-guide 的 meta 为**纯英文**:
 *     "Food-grade packaging essentials — from kraft boxes to food-safe lamination..."
 *     → Google 对中文查询展示英文摘要 → 0 点击 (该 query 位置 6.65 / 145 展示 / 0 点击)
 *   - PDP meta 普遍出现「名稱/前綴」重复, 线上实测: 防水貼紙/防水貼紙、公司信封/公司信封、
 *     大號信封/大號信封、定制年曆/定制年曆、畫冊印刷/畫冊印刷、騎馬釘小冊子/騎馬釘
 *     → 根因在**代码层** src/lib/seo.ts: `fullDesc = ${descPrefix}${priceText}${descSuffix}`,
 *       descPrefix = baseDesc.slice(0,100), 而 baseDesc 本身以「名稱/前綴」开头
 *   - 9 篇 zh-hk blog-data description 为空
 *
 * 为什么此前无人发现: 既有门童 #4 i18n 只查「zh-hk 简体字残留」,
 *   **查不到「zh-hk 字段写成英文」**; 也**没有任何门童做 meta 结构校验**。
 *   (与 ce 截断 / GSC 泄漏同源: 门童盲区 = 事故存活期)
 *
 * 严重度: red (客户可见 SERP 摘要直接受损)
 * 误报防线: 规则 B 只抓**精确重复**与**严格前缀重复**, 不抓正常的 `A/B` 並列 (如「包裝盒/紙盒」)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

/** 客户可见数据文件 (与门童 #16/#17 同源范围) */
const FILES = [
  'src/data/blog-data/zh-hk.json',
  'src/data/blog-data/en.json',
  'src/data/blog-data/ja.json',
  'src/data/blog-posts.ts',
  'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts',
  'src/data/products.ts',
  'src/data/category-seo-content.ts',
  'src/data/product-faqs.ts',
];

const CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const KANA = /[\u3040-\u30FF]/;
const LATIN = /[A-Za-z]/;

/** 规则 B: 精确重复 `A/A` 或 严格前缀重复 `AAA…/AA` (如 騎馬釘小冊子/騎馬釘) */
const DUP_EXACT = /([\u4e00-\u9fff]{2,12})[/／]\1/g;
const DUP_PREFIX = /([\u4e00-\u9fff]{3,12})[\u4e00-\u9fff]{0,4}[/／]\1/g;

/** 提取一行中所有字符串字面量的值 (TS 用) —— 简易: 抓 "..." 与 '...' */
function stringLiterals(line) {
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g;
  let m;
  while ((m = re.exec(line)) !== null) out.push(m[1] ?? m[2] ?? m[3] ?? '');
  return out;
}

/** 判断一个字符串是否是「meta 类」字段值: 长度 >= 40 且含句读, 视为描述文本 */
function looksLikeMeta(s) {
  if (typeof s !== 'string') return false;
  const t = s.trim();
  if (t.length < 40) return false;
  return /[。．.！!？?]/.test(t) || t.length >= 80;
}

function scanLocaleMismatch(raw, loc, file, hits) {
  const lines = raw.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const v of stringLiterals(line)) {
      if (!looksLikeMeta(v)) continue;
      const cjk = (v.match(/[\u3400-\u9FFF\uF900-\uFAFF]/g) || []).length;
      const kana = (v.match(/[\u3040-\u30FF]/g) || []).length;
      const latin = (v.match(/[A-Za-z]/g) || []).length;
      const total = v.replace(/\s/g, '').length || 1;
      let bad = null, why = '';
      if ((loc === 'zh-hk' || loc === 'ja') && cjk === 0 && kana === 0 && latin / total > 0.6) {
        bad = 'english-in-cjk-locale';
        why = '简体/繁体/日文 locale 的描述字段为纯英文';
      } else if (loc === 'en' && cjk > 3) {
        bad = 'cjk-in-en-locale';
        why = 'en locale 的描述字段含中日文字符';
      }
      if (bad) {
        hits.push({
          file, line: i + 1, severity: 'red', ruleId: 'META_DESCRIPTION_INTEGRITY',
          match: v.slice(0, 80),
          ruleName: `meta 语言错配 (${why})`,
          fix: `把该 ${loc} 描述改为对应语言; 若无可复用同语言来源 → 不得自造, 走 §8 升级 (禁区 2 零改文案)`,
        });
      }
    }
  }
}

function scanDup(raw, file, hits) {
  const lines = raw.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    DUP_EXACT.lastIndex = 0; DUP_PREFIX.lastIndex = 0;
    const m1 = DUP_EXACT.exec(line);
    const m2 = DUP_PREFIX.exec(line);
    if (m1) {
      hits.push({
        file, line: i + 1, severity: 'red', ruleId: 'META_DESCRIPTION_INTEGRITY',
        match: m1[0].slice(0, 60),
        ruleName: 'meta/描述出现精确重复词 (A/A)',
        fix: '去掉重复的一半 (纯机械去重, 不改措辞)',
      });
    } else if (m2 && m2[0].length >= 5) {
      hits.push({
        file, line: i + 1, severity: 'red', ruleId: 'META_DESCRIPTION_INTEGRITY',
        match: m2[0].slice(0, 60),
        ruleName: 'meta/描述出现前缀重复 (名称/名称前缀, 如 騎馬釘小冊子/騎馬釘)',
        fix: '删掉 `/` 及其后重复前缀 (纯机械去重, 不改措辞); 根因见 src/lib/seo.ts fullDesc 拼接',
      });
    }
  }
}

/** 规则 C: 空 meta —— 仅针对 blog-data JSON 的 description 字段 (对象键精确匹配, 防误报) */
function scanEmptyDesc(file, hits) {
  let raw;
  try { raw = fs.readFileSync(path.join(ROOT, file), 'utf8'); } catch (e) { return; }
  if (!/blog-data[\\/]/.test(file)) return;
  let obj;
  try { obj = JSON.parse(raw); } catch (e) { return; }
  for (const [slug, entry] of Object.entries(obj)) {
    const d = entry && entry.description;
    if (typeof d !== 'string' || d.trim() === '') {
      hits.push({
        file, line: 0, severity: 'red', ruleId: 'META_DESCRIPTION_INTEGRITY',
        match: slug,
        ruleName: 'blog-data description 为空 (SERP 无摘要可展示)',
        fix: '补 description (属文案 → 走 §8 升级或引用既有同语言来源)',
      });
    }
  }
}

/**
 * 规则 D: 渲染路径 description 来源可解析性 (2026-09-18 线上探针事故固化)
 *
 * 事故 (2026-09-18 全量线上探针实测):
 *   - 线上 201 个 HTTP200 blog URL 中 **124 个没有 <meta name="description">** (也没有 og:description)
 *   - 根因: `page.tsx:820` 旧写法 `meta?.description?.[locale] || legacyPost?.description || ''`
 *     而 `BlogPostMeta` 接口的字段名是 **`excerpt`** (blog-posts.ts L53), **不存在 description**
 *     ⇒ 第一项恒 undefined, 实际只剩 legacyPost.description 一条来源
 *     ⇒ 凡「只在 blog-posts.ts 注册 + blog-data JSON 有内容、但不在 page.tsx 内联 legacyPosts 记录里」
 *       的文章 → 线上 meta 描述完全空白 (SERP 无摘要可展示)
 *   - 为什么此前 3 道防线全漏:
 *     ① `page.tsx` L1 有 `// @ts-nocheck` → tsc 门禁吞掉该类型错误
 *     ② 本门童规则 C 只查 **blog-data JSON 的 description 字段** (该字段一直是有的) → 0 命中
 *     ③ 规则 A/B 只查语言错配与重复词
 *     ⇒ 与 ce 截断 / GSC 泄漏同源: **门童 0 命中 ≠ 线上干净** (已在 §0.23.1 固化)
 *
 * 本规则把「字段名必须与数据模型一致」变成机审不变量:
 *   D1 (负向, hard): 渲染页不得读取 `meta?.description` / `meta.description`
 *       —— BlogPostMeta 无此字段, 恒 undefined = 静默失效
 *   D2 (正向, hard): 描述解析表达式必须至少引用一个真实来源
 *       (`legacyPost?.description` / `jsonEntry?.description` / `meta?.excerpt`)
 *       —— 防止有人「修好 D1」却把来源整体删掉, 变成恒空字符串
 */
const RENDER_PATH_FILE = 'src/app/[locale]/blog/[slug]/page.tsx';

function scanRenderPath(hits, rawOverride) {
  let raw = rawOverride;
  if (raw === undefined) {
    try { raw = fs.readFileSync(path.join(ROOT, RENDER_PATH_FILE), 'utf8'); } catch (e) { return; }
  }
  const lines = raw.split('\n');

  // D1: 禁用不存在字段 meta.description
  const BAD_FIELD = /\bmeta\s*\??\.\s*description\b/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue;         // 跳过注释行 (解释性文字)
    if (BAD_FIELD.test(line)) {
      hits.push({
        file: RENDER_PATH_FILE, line: i + 1, severity: 'red', ruleId: 'META_DESCRIPTION_RENDER_PATH',
        match: line.trim().slice(0, 90),
        ruleName: 'blog 渲染页读取 BlogPostMeta.description —— 该字段不存在, 恒 undefined (SERP 摘要静默消失)',
        fix: 'BlogPostMeta 的描述字段名是 excerpt (blog-posts.ts L53); 改用 meta?.excerpt?.[locale], '
           + '并保留 legacyPost?.description / jsonEntry?.description 作为前序来源',
      });
    }
  }

  // D2: 描述解析必须有真实来源
  const hasSource = /legacyPost\s*\??\.\s*description/.test(raw)
                 || /jsonEntry\s*\??\.\s*description/.test(raw)
                 || /meta\s*\??\.\s*excerpt/.test(raw);
  if (!hasSource) {
    hits.push({
      file: RENDER_PATH_FILE, line: 0, severity: 'red', ruleId: 'META_DESCRIPTION_RENDER_PATH',
      match: RENDER_PATH_FILE,
      ruleName: 'blog 渲染页没有任何可解析的描述来源 (描述将恒为空)',
      fix: '至少引用 legacyPost?.description / jsonEntry?.description / meta?.excerpt 之一',
    });
  }
}

/**
 * 扫描入口 —— 不依赖变更文件列表, 每次 commit 全量复核
 * (meta 完整性是数据文件级不变量, 否则改 .tsx 的那次 commit 会漏过)
 *
 * ★ 专用基线通道 (K3 2026-09-18 决策 3-B):
 *   本门童**自带**基线 `.hermes/meta-baseline.json`, 不共用 check-regression-guard.js 的
 *   全局 perFile 预算 —— 后者是「先到先扣」, 前面的门童 (#4/#16/#17) 会把预算扣完,
 *   导致本门童的存量命中拿不到豁免 (实测: 接入后 red 51 → 171, 会拦死全站 commit)。
 *   语义: 存量**只许递减**; 超出基线的部分才作为新增缺陷返回 (red 硬拦)。
 *   每次报告须附「剩余数」—— 已减到 0 时可直接把基线归零/删除。
 */
const BASELINE_FILE = path.join(ROOT, '.hermes', 'meta-baseline.json');

function loadMetaBaseline() {
  try {
    const b = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
    return { total: b.total || 0, perFile: b.perFile || {} };
  } catch (e) {
    return { total: 0, perFile: {} };
  }
}

/** 状态汇总 (供报告引用) */
function baselineStatus(hitsAll) {
  const b = loadMetaBaseline();
  const per = {};
  for (const h of hitsAll) per[h.file] = (per[h.file] || 0) + 1;
  const rows = [];
  let remaining = 0;
  for (const f of new Set([...Object.keys(b.perFile), ...Object.keys(per)])) {
    const allowed = b.perFile[f] || 0;
    const now = per[f] || 0;
    const left = Math.max(0, allowed - now);
    const excess = Math.max(0, now - allowed);
    remaining += left;
    rows.push({ file: f, allowed, now, left, excess });
  }
  return { baselineTotal: b.total, nowTotal: hitsAll.length, remaining, rows };
}

function scan(_files) {
  const hits = [];
  const cache = new Map();
  for (const rel of FILES) {
    let raw = cache.get(rel);
    if (raw === undefined) {
      try { raw = fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch (e) { raw = null; }
      cache.set(rel, raw);
    }
    if (raw === null) continue;
    const loc = /zh-hk/.test(rel) ? 'zh-hk' : /en\.json/.test(rel) ? 'en' : /ja\.json/.test(rel) ? 'ja' : 'multi';
    if (loc !== 'multi') scanLocaleMismatch(raw, loc, rel, hits);
    scanDup(raw, rel, hits);
    scanEmptyDesc(rel, hits);
  }

  // 规则 D: 渲染路径可解析性 (与文件级扫描无关, 每次全量复核)
  scanRenderPath(hits);

  // 专用基线豁免: 每个文件只豁免 baseline.perFile[file] 条, 其余 = 新增缺陷
  const b = loadMetaBaseline();
  if (b.total === 0) return hits; // 无基线 → 全量裸报
  const used = {};
  const fresh = [];
  for (const h of hits) {
    used[h.file] = used[h.file] || 0;
    const allowed = b.perFile[h.file] || 0;
    if (used[h.file] < allowed) { used[h.file]++; continue; }
    fresh.push(h);
  }
  const st = baselineStatus(hits);
  const fixed = Math.max(0, b.total - hits.length);           // 基线录制后已修的条数
  const todo = hits.length;                                   // 存量待修 (K3 要的「剩余数」)
  console.log(`ℹ️ 门童 #20 存量基线: 基线 ${b.total}, 现存 ${todo}, 已修 ${fixed}, 剩余待修 ${todo}${fresh.length ? `, ★本次新增 ${fresh.length}` : ''}`);
  return fresh;
}

module.exports = {
  scan,
  baselineStatus,
  loadMetaBaseline,
  RULES: [
    { id: 'META_DESCRIPTION_INTEGRITY', severity: 'red' },
    { id: 'META_DESCRIPTION_RENDER_PATH', severity: 'red' },
  ],
  FILES,
  RENDER_PATH_FILE,
  DUP_EXACT,
  DUP_PREFIX,
  scanRenderPath,
};
