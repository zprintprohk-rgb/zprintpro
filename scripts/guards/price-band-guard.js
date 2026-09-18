/**
 * 门童 #19: 跨文价格口径一致性 — 月曆印刷基准区间 (K3 2026-09-18 裁定)
 *
 * 事故背景:
 *   三篇月曆文章 × 3 locale 的「基准价声明」互相矛盾 3-5 倍 —— 同一品类在同一站上
 *   给出三个互不相容的价格, 客户任何一次跨文对比都会立刻发现, 直接摧毁报价可信度:
 *
 *     calendar-printing-guide                  : HK$3-8/本   | $0.40/pc      | 1部50円から
 *     2027-calendar-printing-complete-guide    : HK$14-57/本 | US$1.80-7.30  | 1冊280〜1,140円
 *     2027-monthly-calendar-printing-timetable : HK$3-15     | $0.40-1.90/pc | $0.40-1.90/冊
 *
 *   K3 2026-09-18 裁定基准区间 = **HK$8-25/份**; 汇率口径沿用文章自身换算
 *   (en 7.8 / ja HK$1 = 20円) ⇒ US$1.00-3.20/pc、160〜500円/冊。
 *
 * 本门童职责:
 *   1. **必需**: 三篇文章各自必须出现本 locale 的基准区间字样 (防止被改回旧值/被清空)
 *   2. **禁止**: 三篇文章窗口内不得再出现任一旧值 (防止回归 + 防止新增第 4 个口径)
 *   3. **不越界**: 按 slug 窗口限定, 不改判他品类价格 ——
 *      已核实必须保留的同类字符串: 「HK$3-8/本」= 月曆燙金附加費(3 处)、
 *      「HK$14-57/本」= 騎馬釘小冊子/目錄價(4 处)
 *
 * 变更基准区间时必须同步改本文件 (SSoT: K3 拍板 > 本文件 > 文章内容)。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

/** 受约束的三个 locale 数据文件 */
const DATA_FILES = [
  'src/data/blog-data/zh-hk.json',
  'src/data/blog-data/en.json',
  'src/data/blog-data/ja.json',
];

/**
 * 基准区间表 —— 每个 slug 在每个 locale 必须含 required、不得含 forbidden
 * required 项在窗口内至少命中 1 次; forbidden 项在窗口内必须 0 命中
 */
const BANDS = [
  {
    id: 'CALENDAR_PRICE_BAND',
    locale: 'zh-hk',
    file: 'src/data/blog-data/zh-hk.json',
    canonical: 'HK$8-25/份',
    entries: [
      { slug: 'calendar-printing-guide', required: ['HK$8-25/本'], forbidden: ['HK$3-8/本'] },
      { slug: '2027-calendar-printing-complete-guide', required: ['HK$8-25/本 (500 本批量)'], forbidden: ['HK$14-57/本'] },
      { slug: '2027-monthly-calendar-printing-timetable', required: ['單本 HK$8-25'], forbidden: ['單本 HK$3-15'] },
    ],
  },
  {
    id: 'CALENDAR_PRICE_BAND',
    locale: 'en',
    file: 'src/data/blog-data/en.json',
    canonical: 'US$1.00-3.20/pc',
    entries: [
      { slug: 'calendar-printing-guide', required: ['US$1.00/pc'], forbidden: ['$0.40/pc'] },
      { slug: '2027-calendar-printing-complete-guide', required: ['US$1.00-3.20'], forbidden: ['US$1.80-7.30'] },
      { slug: '2027-monthly-calendar-printing-timetable', required: ['US$1.00-3.20/pc'], forbidden: ['$0.40/pc', '$0.40-1.90/pc'] },
    ],
  },
  {
    id: 'CALENDAR_PRICE_BAND',
    locale: 'ja',
    file: 'src/data/blog-data/ja.json',
    canonical: 'HK$8-25/份 (= 160〜500円)',
    entries: [
      { slug: 'calendar-printing-guide', required: ['1部160円から'], forbidden: ['1部50円から'] },
      { slug: '2027-calendar-printing-complete-guide', required: ['1冊160〜500円'], forbidden: ['1冊280〜1,140円'] },
      { slug: '2027-monthly-calendar-printing-timetable', required: ['HK$8-25/冊'], forbidden: ['$0.40-1.90/冊'] },
    ],
  },

  // ── BK-002 騎馬釘小冊子 (saddle-stitch-booklets) ──
  // K3 2026-09-18 裁定: 以「结构化区 / PDP title / minQuantity」为准
  //   = 100 本起印 + HK$6-32/本; 作废旧自由文本值 MOQ 50 本 / HK$14-57/pc
  // 边界: catalog-printing-china-supplier-guide 的 HK$14-57/本 属「目錄/畫冊」另一產品線, 不在本带内
  {
    id: 'BK002_PRICE_BAND',
    locale: 'zh-hk',
    file: 'src/data/blog-data/zh-hk.json',
    canonical: 'HK$6-32/本 (100 本起印)',
    entries: [
      {
        slug: 'saddle-stitch-booklet-printing-guide',
        required: ['HK$6-32/本', '100 本起'],
        forbidden: ['HK$14-57/本', '50 本起', '無最低起印量'],
      },
    ],
  },
  {
    id: 'BK002_PRICE_BAND',
    locale: 'en',
    file: 'src/data/blog-data/en.json',
    canonical: '100-copy MOQ (US$1.84-7.36/pc = en 结构化基准价, 不变)',
    entries: [
      {
        slug: 'saddle-stitch-booklet-printing-guide',
        required: ['100-copy MOQ', '100 copies'],
        forbidden: ['50-copy', '50 copies'],
      },
    ],
  },
  {
    id: 'BK002_PRICE_BAND',
    locale: 'ja',
    file: 'src/data/blog-data/ja.json',
    canonical: '100 冊から (¥258-1030/冊 = ja 结构化基准价, 不变)',
    entries: [
      {
        slug: 'saddle-stitch-booklet-printing-guide',
        required: ['100冊', '100 冊から'],
        forbidden: ['50冊', '50 冊から'],
      },
    ],
  },
];

const count = (hay, needle) => hay.split(needle).length - 1;

/**
 * 取某 slug 在原始文本中的窗口 [start, end)
 *
 * ★ 2026-09-18 修正: 窗口必须**从本 entry 的 "slug" 键开始**, 到下一个 "slug" 键为止。
 *   初版实现用了 `lastIndexOf('"slug":', i-1)` 作起点 —— 那会把**上一个 entry 的字段**
 *   一并圈进来 (blog-data JSON 的 "slug" 是每个 entry 的**首个键**), 导致
 *   门童读到邻篇文章的价格 → 误报 (en calendar-printing-guide 曾因此虚报 3 命中)。
 *
 * 结构前提: `src/data/blog-data/*.json` 为 `{ "<slug>": { "slug": "<slug>", ... }, ... }`,
 *   `"slug"` 是每个 entry 的首个键 —— 若日后 key 顺序改变, 本函数需同步改为括号配对扫描。
 */
function slugWindow(raw, slug) {
  const marker = '"slug": "' + slug + '"';
  const i = raw.indexOf(marker);
  if (i === -1) return null;
  const next = raw.indexOf('"slug":', i + marker.length);
  return { start: i, end: next === -1 ? raw.length : next, at: i };
}

const fileCache = new Map();
function readData(rel) {
  if (fileCache.has(rel)) return fileCache.get(rel);
  let txt = null;
  try {
    txt = fs.readFileSync(path.join(ROOT, rel), 'utf-8');
  } catch (err) {
    txt = null;
  }
  fileCache.set(rel, txt);
  return txt;
}

/**
 * 扫描入口。
 * 注意: 本门童**不依赖**传入的变更文件列表 —— 价格一致性是数据文件级不变量,
 * 必须每次 commit 全量复核 (否则改 .tsx 的那次 commit 就会漏过价格回归)。
 */
function scan(_files) {
  const hits = [];
  for (const band of BANDS) {
    const raw = readData(band.file);
    if (raw === null) continue; // 文件缺失 → 静默跳过, 不误阻全站 commit

    for (const e of band.entries) {
      const w = slugWindow(raw, e.slug);
      if (!w) {
        hits.push({
          file: band.file,
          line: 0,
          match: `(slug 未找到: ${e.slug})`,
          severity: 'red',
          ruleId: band.id,
          ruleName: `月曆基准价口径缺失文章 (${band.locale})`,
          fix: `确认 ${e.slug} 是否被改名/删除; 若确为有意改动, 同步更新 scripts/guards/price-band-guard.js`,
        });
        continue;
      }
      const seg = raw.slice(w.start, w.end);

      for (const req of e.required) {
        if (count(seg, req) === 0) {
          hits.push({
            file: band.file,
            line: lineOf(raw, w.at),
            match: `(缺 ${req})`,
            severity: 'red',
            ruleId: band.id,
            ruleName: `月曆基准价口径缺失 (${band.locale} / ${e.slug})`,
            fix: `补回基准区间 ${band.canonical} (K3 2026-09-18 裁定); 三篇文章必须口径一致`,
          });
        }
      }

      for (const forb of e.forbidden) {
        const n = count(seg, forb);
        if (n > 0) {
          hits.push({
            file: band.file,
            line: lineOf(raw, w.at),
            match: `${forb} ×${n}`,
            severity: 'red',
            ruleId: band.id,
            ruleName: `月曆旧价口径回归 (${band.locale} / ${e.slug})`,
            fix: `旧值「${forb}」已被 K3 2026-09-18 裁定作废, 统一改为 ${band.canonical}`,
          });
        }
      }
    }
  }
  return hits;
}

function lineOf(raw, idx) {
  return raw.slice(0, idx).split('\n').length;
}

module.exports = {
  scan,
  RULES: [{ id: 'CALENDAR_PRICE_BAND', severity: 'red' }],
  BANDS,
  DATA_FILES,
  slugWindow,
};
