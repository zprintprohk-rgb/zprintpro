#!/usr/bin/env node
/**
 * K3 GSC KPI 监控面板生成器 (K3 2026-10-27 拍板口径)
 *
 * K3 拍板 (2026-10-27):
 *   - 转化数据接入 (GA4/008/订单) 全部线下处理, 执行层不接入、不再列入拍板项 (K3-8 关闭)。
 *   - 监控口径 = GSC 四指标 (点击次数 / 总曝光 / 平均点击率 / 平均排名)
 *     + 带钱词排名 + 首页词数 (pos<=10) + 关键词行数 (query 行数)。
 *   - "这些数据好，订单就不会差。"
 *
 * 用法:
 *   node scripts/k3-kpi-panel.mjs --pull=2026-10-26
 * 输入 (仓库内已落盘的 GSC 拉取产物):
 *   .hermes/logs/gsc-deep-analysis-<pull>.json            (full_locale / locale_opportunities)
 *   .hermes/logs/gsc-query-page-country-<pull>.csv         (当前 28d, query×page×country)
 *   .hermes/logs/gsc-query-page-country-previous-28d-<pull>.csv
 * 输出:
 *   .hermes/logs/k3-kpi-panel-<pull>.json  (机器可读)
 *   .hermes/logs/k3-kpi-panel-<pull>.md    (人读面板)
 *
 * 口径纪律 (双引擎策略 §2.1):
 *   - date×page 与 query×country / query×page×country 是不同聚合范围, 严禁相加或互证总数。
 *   - §1 四指标卡 = date×page 口径 (来自 analysis JSON full_locale)。
 *   - §2 带钱词 = locale_opportunities 词级口径 (en/ja 已按相关市场过滤)。
 *   - §3 关键词覆盖 = query×page×country 口径, locale 按落地页 URL 前缀归属;
 *     同一 query 落多 locale 会分别计入, 行数不与 §1 总数互证。
 */
'use strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)=(.*)$/);
  return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
}));
const PULL = String(args.pull || '2026-10-26');

const P = {
  analysis: path.join(ROOT, '.hermes/logs', `gsc-deep-analysis-${PULL}.json`),
  opp: path.join(ROOT, '.hermes/logs', `gsc-opportunities-${PULL}.csv`),
  qpcCur: path.join(ROOT, '.hermes/logs', `gsc-query-page-country-${PULL}.csv`),
  qpcPrev: path.join(ROOT, '.hermes/logs', `gsc-query-page-country-previous-28d-${PULL}.csv`),
  outJson: path.join(ROOT, '.hermes/logs', `k3-kpi-panel-${PULL}.json`),
  outMd: path.join(ROOT, '.hermes/logs', `k3-kpi-panel-${PULL}.md`),
};

// ---- K3 带钱词 SSoT 名单 (来源: docs/2026-10-26-dual-engine... §3.1/3.2/3.3) ----
const MONEY_WORDS = {
  'zh-hk': ['海報印刷', '印海報', '食品包裝印刷', '貼紙印刷', '月曆印刷', '小冊子印刷', '紙袋印刷', '騎馬釘印刷', '即日印刷'],
  en: ['small batch sticker printing', 'small batch stickers', 'doujinshi printing', 'saddle stitch booklet printing', 'china catalog printing', 'large envelopes', 'a2 poster', 'corporate holiday cards'],
  ja: ['コミケ 印刷', '卒アル販売', '教材 印刷製本', '教材 印刷 製本', 'pvc シール', '年賀状印刷'],
};

// ---- helpers ----
function parseTolerantJson(text) {
  return JSON.parse(text.replace(/\bNaN\b/g, 'null'));
}
function parseCsvLine(line) {
  const out = []; let cur = ''; let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
function readCsvRows(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  const idx = (name) => header.findIndex((h) => h === name);
  const iQ = idx('热门查询'), iPage = idx('页面'), iC = idx('点击次数'), iI = idx('展示'), iR = idx('排名');
  if (iQ < 0 || iC < 0 || iI < 0) throw new Error(`${file}: 表头缺列: ${header.join('|')}`);
  const rows = [];
  for (let k = 1; k < lines.length; k++) {
    const c = parseCsvLine(lines[k]);
    const num = (s) => { const v = parseFloat(s); return Number.isFinite(v) ? v : null; };
    rows.push({
      query: (c[iQ] || '').trim(),
      page: iPage >= 0 ? (c[iPage] || '').trim() : '',
      clicks: num(c[iC]) || 0,
      imps: num(c[iI]) || 0,
      pos: iR >= 0 ? num(c[iR]) : null,
    });
  }
  return rows;
}
function pageLocale(page) {
  if (/\/zh-hk\//.test(page)) return 'zh-hk';
  if (/\/en\//.test(page)) return 'en';
  if (/\/ja\//.test(page)) return 'ja';
  return 'root/其他';
}
/** 按 (locale, query) 聚合 → 词级行; pos = 展示加权 */
function aggregateByLocaleQpc(rows) {
  const byKey = new Map();
  for (const r of rows) {
    const loc = pageLocale(r.page);
    const key = loc + '\u0000' + r.query;
    let e = byKey.get(key);
    if (!e) { e = { locale: loc, query: r.query, clicks: 0, imps: 0, posW: 0, posImps: 0 }; byKey.set(key, e); }
    e.clicks += r.clicks; e.imps += r.imps;
    if (r.pos != null) { e.posW += r.pos * r.imps; e.posImps += r.imps; }
  }
  const out = [];
  for (const e of byKey.values()) {
    out.push({
      locale: e.locale, query: e.query, clicks: e.clicks, imps: e.imps,
      pos: e.posImps > 0 ? e.posW / e.posImps : null,
    });
  }
  return out;
}
function fmtPct(x) { return x == null ? '—' : (x * 100).toFixed(2) + '%'; }
function fmtPos(x) { return x == null ? '—' : x.toFixed(1); }
function d(n) { return n == null ? '—' : String(Math.round(n)); }
function band(pos) {
  if (pos == null) return { label: '无排名记录', tone: '—' };
  if (pos <= 10) return { label: `首页(${pos.toFixed(1)})`, tone: 'P1' };
  if (pos <= 20) return { label: `11-20(${pos.toFixed(1)})`, tone: 'P2' };
  return { label: `20+(${pos.toFixed(1)})`, tone: 'P3' };
}

// ---- 1) 四指标卡 (date×page 口径: full_total 全站 + full_locale 分站点) ----
const analysis = parseTolerantJson(fs.readFileSync(P.analysis, 'utf8'));
const kpiCard = [
  ...(analysis.full_total || []).map((r) => ({
    locale: '全站',
    imps_cur: r.imps_cur, imps_prev: r.imps_prev,
    clicks_cur: r.clicks_cur, clicks_prev: r.clicks_prev,
    ctr_cur: r.ctr_cur, ctr_prev: r.ctr_prev,
    pos_cur: r.pos_cur, pos_prev: r.pos_prev,
  })),
  ...(analysis.full_locale || []).map((r) => ({
    locale: r.locale === 'other' ? '其他(非三语落地页)' : r.locale,
    imps_cur: r.imps_cur, imps_prev: r.imps_prev,
    clicks_cur: r.clicks_cur, clicks_prev: r.clicks_prev,
    ctr_cur: r.ctr_cur, ctr_prev: r.ctr_prev,
    pos_cur: r.pos_cur, pos_prev: r.pos_prev,
  })),
];

// ---- 2) 带钱词 (精确匹配双源回退: locale_opportunities 词级 → opportunities CSV → 缺记) ----
const LO = analysis.locale_opportunities || [];
function readOppCsv(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  const idx = (n) => header.indexOf(n);
  const g = (c, n) => { const v = parseFloat(c[idx(n)]); return Number.isFinite(v) ? v : null; };
  const rows = [];
  for (let k = 1; k < lines.length; k++) {
    const c = parseCsvLine(lines[k]);
    rows.push({ query: (c[idx('query')] || '').trim(), clicks_cur: g(c, 'clicks_cur'), imps_cur: g(c, 'imps_cur'), pos_cur: g(c, 'pos_cur'), imps_prev: g(c, 'imps_prev'), pos_prev: g(c, 'pos_prev'), clicks_prev: g(c, 'clicks_prev') });
  }
  return rows;
}
const oppRows = readOppCsv(P.opp);
const oppExact = new Map(oppRows.map((r) => [r.query.toLowerCase(), r]));
function findWord(locale, query) {
  const norm = query.trim().toLowerCase();
  // 口径铁律 (与策略 §3 一致): zh-hk 带钱词 = opportunities CSV (query 口径, §3.3); en/ja = locale_opportunities (相关市场过滤, §3.1/3.2)
  const order = locale === 'zh-hk'
    ? [['opportunities_csv', () => oppExact.get(norm)], ['locale_opportunities', () => LO.find((r) => r.locale === locale && String(r.query || '').trim().toLowerCase() === norm)]]
    : [['locale_opportunities', () => LO.find((r) => r.locale === locale && String(r.query || '').trim().toLowerCase() === norm)], ['opportunities_csv', () => oppExact.get(norm)]];
  for (const [src, fn] of order) {
    const hit = fn();
    if (hit) return { src, row: hit };
  }
  return null;
}
const moneyWords = {};
for (const [loc, words] of Object.entries(MONEY_WORDS)) {
  moneyWords[loc] = words.map((w) => {
    const found = findWord(loc, w);
    if (!found) return { query: w, missing: true };
    const r = found.row;
    return {
      query: r.query || w, source: found.src,
      imps_cur: r.imps_cur, pos_cur: r.pos_cur, clicks_cur: r.clicks_cur,
      imps_prev: r.imps_prev, pos_prev: r.pos_prev, clicks_prev: r.clicks_prev,
      missing: false,
    };
  });
}

// ---- 3) 关键词覆盖 (query×page×country 口径) ----
function breadth(rows) {
  const agg = aggregateByLocaleQpc(rows);
  const res = {};
  for (const e of agg) {
    if (!res[e.locale]) res[e.locale] = { queries: 0, firstPage: 0, mid: 0, deep: 0, imps: 0, clicks: 0 };
    const b = res[e.locale];
    b.queries += 1; b.imps += e.imps; b.clicks += e.clicks;
    if (e.pos == null) { /* 无排名记录不计入分带 */ }
    else if (e.pos <= 10) b.firstPage += 1;
    else if (e.pos <= 20) b.mid += 1;
    else b.deep += 1;
  }
  return { agg, byLocale: res };
}
const curRows = readCsvRows(P.qpcCur);
const prevRows = readCsvRows(P.qpcPrev);
const curB = breadth(curRows);
const prevB = breadth(prevRows);

// ---- 输出 JSON ----
const panel = {
  meta: {
    pull: PULL,
    current_window: analysis.meta && analysis.meta.current_window,
    previous_window: analysis.meta && analysis.meta.previous_window,
    generated_at: new Date().toISOString(),
    ruling: 'K3 2026-10-27: K3-8 转化接入关闭(线下处理); 监控口径 = GSC 四指标 + 带钱词排名 + 首页词数 + 关键词行数',
    kpi_scope: 'date×page (analysis JSON full_locale)',
    money_scope: 'locale_opportunities 词级 (en/ja 相关市场过滤)',
    breadth_scope: 'query×page×country, locale 按落地页 URL 前缀归属, pos=展示加权',
  },
  kpi_card: kpiCard,
  money_words: moneyWords,
  breadth: {
    current: curB.byLocale,
    previous: prevB.byLocale,
  },
  money_word_sources_note: '带钱词源固定: zh-hk = opportunities CSV (query 口径, 与策略 §3.3 一致); en/ja = locale_opportunities (相关市场过滤, 与策略 §3.1/3.2 一致); 缺记 = 窗口内无词级记录(0 展示或被匿名化)',
};
fs.writeFileSync(P.outJson, JSON.stringify(panel, null, 2), 'utf8');

// ---- 输出 MD ----
const L = [];
L.push(`# K3 GSC KPI 监控面板 — 拉取批次 ${PULL}`);
L.push('');
L.push(`> 数据窗口: 当前 28d ${JSON.stringify(analysis.meta && analysis.meta.current_window)} vs 前 28d ${JSON.stringify(analysis.meta && analysis.meta.previous_window)}`);
L.push(`> 生成: ${new Date().toISOString()} · 生成器: \`node scripts/k3-kpi-panel.mjs --pull=${PULL}\``);
L.push(`> K3 拍板 (2026-10-27): 转化数据 (GA4/008/订单) 线下处理, 执行层不接入不拍板; 监控口径 = 四指标 + 带钱词排名 + 首页词数 + 关键词行数。"这些数据好，订单就不会差。"`);
L.push('');
L.push('## §1 四指标卡 (date×page 口径)');
L.push('');
L.push('| 站点 | 展示 cur→prev | 点击 cur→prev | CTR cur→prev | 平均排名 cur→prev | 展示Δ | 点击Δ | 排名Δ |');
L.push('|---|---|---|---|---|---|---|---|');
for (const r of kpiCard) {
  const name = /all|全站|total/i.test(String(r.locale)) ? '全站' : r.locale;
  L.push(`| ${name} | ${d(r.imps_cur)} → ${d(r.imps_prev)} | ${d(r.clicks_cur)} → ${d(r.clicks_prev)} | ${fmtPct(r.ctr_cur)} → ${fmtPct(r.ctr_prev)} | ${fmtPos(r.pos_cur)} → ${fmtPos(r.pos_prev)} | ${r.imps_cur - r.imps_prev >= 0 ? '+' : ''}${Math.round(r.imps_cur - r.imps_prev)} | ${r.clicks_cur - r.clicks_prev >= 0 ? '+' : ''}${Math.round(r.clicks_cur - r.clicks_prev)} | ${(r.pos_cur - r.pos_prev >= 0 ? '+' : '') + (r.pos_cur - r.pos_prev).toFixed(2)} |`);
}
L.push('');
L.push('## §2 带钱词排名监控 (zh=opportunities query 口径 / en・ja=locale_opportunities 相关市场过滤)');
L.push('');
for (const [loc, rows] of Object.entries(moneyWords)) {
  const p1 = rows.filter((r) => !r.missing && r.pos_cur != null && r.pos_cur <= 10).length;
  L.push(`### ${loc} — 首页词数 ${p1}/${rows.length}`);
  L.push('');
  L.push('| 词 | 展示 cur→prev | 排名 cur→prev | 点击 cur→prev | 位置带 | 来源 |');
  L.push('|---|---|---|---|---|---|');
  for (const r of rows) {
    if (r.missing) { L.push(`| ${r.query} | 0 / 无词级记录 | — | — | — | — |`); continue; }
    L.push(`| ${r.query} | ${d(r.imps_cur)} → ${d(r.imps_prev)} | ${fmtPos(r.pos_cur)} → ${fmtPos(r.pos_prev)} | ${d(r.clicks_cur)} → ${d(r.clicks_prev)} | ${band(r.pos_cur).label} | ${r.source === 'opportunities_csv' ? 'opp_csv' : 'lo_json'} |`);
  }
  L.push('');
}
L.push('## §3 关键词覆盖: 行数 + 首页词数 (query×page×country 口径)');
L.push('');
L.push('| 站点(落地页归属) | 关键词行数 cur→prev | 首页(≤10) cur→prev | 11-20 cur→prev | 20+ cur→prev | 词级展示 cur→prev | 词级点击 cur→prev |');
L.push('|---|---|---|---|---|---|---|');
const locs = Array.from(new Set([...Object.keys(curB.byLocale), ...Object.keys(prevB.byLocale)])).sort();
for (const loc of locs) {
  const c = curB.byLocale[loc] || { queries: 0, firstPage: 0, mid: 0, deep: 0, imps: 0, clicks: 0 };
  const p = prevB.byLocale[loc] || { queries: 0, firstPage: 0, mid: 0, deep: 0, imps: 0, clicks: 0 };
  L.push(`| ${loc} | ${c.queries} → ${p.queries} | ${c.firstPage} → ${p.firstPage} | ${c.mid} → ${p.mid} | ${c.deep} → ${p.deep} | ${d(c.imps)} → ${d(p.imps)} | ${d(c.clicks)} → ${d(p.clicks)} |`);
}
L.push('');
L.push('## 口径说明 (禁止混算)');
L.push('');
L.push('- §1 = date×page 聚合; §2 = locale_opportunities 词级 (en/ja 已按相关市场过滤); §3 = query×page×country 聚合, locale 按落地页 URL 前缀归属, 同一 query 落多 locale 分别计入。');
L.push('- 三个口径的展示/点击总数互不相等 (GSC 匿名化与聚合范围不同), 只看方向与词级排名, 不做跨口径相减。');
L.push('- GSC 展示 ≠ 市场搜索量; 低展示词排名/CTR 为高方差信号, 不作单日因果断言 (双引擎策略 §2.1)。');
L.push('');
L.push('## 数据来源');
L.push('');
L.push(`- ${path.relative(ROOT, P.analysis)} (full_total / full_locale / locale_opportunities)`);
L.push(`- ${path.relative(ROOT, P.opp)} (zh 带钱词 query 口径)`);
L.push(`- ${path.relative(ROOT, P.qpcCur)} / ${path.relative(ROOT, P.qpcPrev)} (query×page×country cur/prev)`);
L.push(`- 生成器: scripts/k3-kpi-panel.mjs --pull=${PULL} · 生成时间 ${new Date().toISOString()}`);
fs.writeFileSync(P.outMd, L.join('\n'), 'utf8');

// console 摘要
console.log(`[k3-kpi-panel] pull=${PULL}`);
console.log(`[k3-kpi-panel] KPI card locales: ${kpiCard.map((r) => r.locale).join(', ')}`);
console.log(`[k3-kpi-panel] breadth locales(cur): ${Object.entries(curB.byLocale).map(([k, v]) => `${k}:${v.queries}q/${v.firstPage}p1`).join(' · ')}`);
console.log(`[k3-kpi-panel] money words missing: ${Object.entries(moneyWords).flatMap(([k, rs]) => rs.filter((r) => r.missing).map((r) => `${k}/${r.query}`)).join(', ') || '(none)'}`);
console.log(`[k3-kpi-panel] written: ${path.relative(ROOT, P.outJson)} + ${path.relative(ROOT, P.outMd)}`);
