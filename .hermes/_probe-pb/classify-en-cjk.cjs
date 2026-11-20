'use strict';
/** ① 1138 筆 en 中文殘留「分類清單」(K3 要) ② aitoptools 部署失敗詳情 (K3 順手看) */
const fs = require('fs');
const https = require('https');
const P = 'F:\\zprintpro-nextjs\\';
const OUT = P + '.hermes/logs/i18n-en-cjk-classification-2026-09-19.md';

/* ---------- 找盤點檔 ---------- */
const files = fs.readdirSync(P + '.hermes/logs').filter(f => f.startsWith('i18n-en-cjk-inventory'));
console.log('盤點檔: ' + files.join(' | '));
const csvName = files.find(f => f.endsWith('.csv') && !f.includes('tokens'));
if (!csvName) { console.log('★ 找不到逐筆 csv'); process.exit(1); }
const raw = fs.readFileSync(P + '.hermes/logs/' + csvName, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split('\n').filter(l => l.trim());
console.log('\ncsv: ' + csvName + ' | 行數 ' + lines.length);
console.log('表頭: ' + lines[0]);
console.log('首行: ' + (lines[1] || '').slice(0, 160));

/* ---------- 簡易 CSV 解析 (支援引號內逗號) ---------- */
function parse(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur); return out;
}
const head = parse(lines[0]).map(s => s.trim().toLowerCase());
const idx = n => head.findIndex(h => h.includes(n));
const ci = { file: idx('file'), line: idx('line'), ch: idx('char'), ctx: (idx('linetext') >= 0 ? idx('linetext') : idx('context')) };
console.log('欄位索引: ' + JSON.stringify(ci) + ' | 表頭=' + JSON.stringify(head));

/* ---------- 分類 ---------- */
const WL = [
  { key: 'payment-methods/page.tsx', line: 697 },
  { key: 'payment-methods/page.tsx', line: 758 },
  { key: 'layout/Footer.tsx', line: 146 },
];
const buckets = {
  'A 白名單(專有名詞 4 行)': [],
  'B JSON-LD 殘留': [],
  'C FAQ 殘留(會渲染中文 FAQ)': [],
  'D category 欄位殘留': [],
  'E title/description 欄位殘留': [],
  'F content 正文內嵌繁中': [],
  'G 其他/待判': [],
};
const seen = new Set();
for (const l of lines.slice(1)) {
  const c = parse(l);
  const file = (c[ci.file] || '').replace(/\\/g, '/');
  const ln = Number(c[ci.line] || 0);
  const ctx = c[ci.ctx] || '';
  if (!file) continue;
  const id = file + ':' + ln + ':' + (c[ci.ch] || '');
  if (seen.has(id)) continue;
  seen.add(id);
  const rec = { file, line: ln, ctx };
  const isWL = WL.some(w => file.includes(w.key) && ln === w.line) || /彩龍印刷/.test(ctx);
  if (isWL) buckets['A 白名單(專有名詞 4 行)'].push(rec);
  else if (/ld\+json|"@type"|@context/.test(ctx)) buckets['B JSON-LD 殘留'].push(rec);
  else if (/\b(FAQ|faq)\b/.test(ctx) || /faq/i.test(file)) buckets['C FAQ 殘留(會渲染中文 FAQ)'].push(rec);
  else if (/"category"\s*:/.test(ctx)) buckets['D category 欄位殘留'].push(rec);
  else if (/"(title|description|seoTitle|metaTitle)"\s*:/.test(ctx)) buckets['E title/description 欄位殘留'].push(rec);
  else if (/"content"\s*:/.test(ctx)) buckets['F content 正文內嵌繁中'].push(rec);
  else buckets['G 其他/待判'].push(rec);
}

const tot = Object.values(buckets).reduce((a, b) => a + b.length, 0);
const L = ['# en 值內中文殘留 — 分類清單 (K3 一次審批用)', '',
  '> 口徑: 門童 #4 規則 `I18N_POLLUTION_EN`(en 值含 CJK) **全量掃描、未經基線豁免**',
  '> 資料來源: `.hermes/logs/' + csvName + '`(逐筆 ' + (lines.length - 1) + ' 行) + `i18n-en-cjk-inventory-2026-09-19.md`(80 行)',
  '> 生成時間: 2026-09-19 · 生成者: 執行層 (交付層獨立分類)', '',
  '## 一、分類匯總', '', '| 檔位 | 筆數 | 處置建議 |', '|---|---|---|'];
const advice = {
  'A 白名單(專有名詞 4 行)': '**(A) 白名單**(K3 已批准; 唐运提 保留简体 per K3 裁決)',
  'B JSON-LD 殘留': '**清理** —— 結構化資料串入繁中, en 頁 schema 會漏中文',
  'C FAQ 殘留(會渲染中文 FAQ)': '**清理(最高優先)** —— en 頁面會渲染中文 FAQ (真缺陷)',
  'D category 欄位殘留': '**清理** —— en blog 分類顯示中文',
  'E title/description 欄位殘留': '**清理** —— 直接影響 SERP 摘要語言',
  'F content 正文內嵌繁中': '**清理** —— 正文段落/表格內繁中',
  'G 其他/待判': '待逐條判(多為段落陣列/變數賦值)',
};
for (const [k, v] of Object.entries(buckets)) L.push('| ' + k + ' | ' + v.length + ' | ' + advice[k] + ' |');
L.push('| **合計** | **' + tot + '** | |', '');
for (const [k, v] of Object.entries(buckets)) {
  L.push('## ' + k + ' — ' + v.length + ' 筆', '');
  const byFile = {};
  for (const r of v) byFile[r.file] = (byFile[r.file] || 0) + 1;
  L.push('檔案分布: ' + Object.entries(byFile).sort((a, b) => b[1] - a[1]).map(([f, n]) => '`' + f + '`(' + n + ')').join(' · '), '');
  if (v.length) {
    L.push('| # | file:line | 上下文(節錄) |', '|---|---|---|');
    v.slice(0, 40).forEach((r, i) => L.push('| ' + (i + 1) + ' | `' + r.file + ':' + r.line + '` | ' + String(r.ctx).replace(/\|/g, '\\|').slice(0, 110) + ' |'));
    if (v.length > 40) L.push('| … | (其餘 ' + (v.length - 40) + ' 筆見 csv 逐筆檔) | |');
  }
  L.push('');
}
fs.writeFileSync(OUT, L.join('\n'), 'utf8');
console.log('\n=== 分類結果 ===');
for (const [k, v] of Object.entries(buckets)) console.log('  ' + k + ': ' + v.length);
console.log('  合計: ' + tot);
console.log('已寫: .hermes/logs/i18n-en-cjk-classification-2026-09-19.md');

/* ---------- aitoptools ---------- */
const env = {};
for (const f of ['.env', '.env.local']) { const p = P + f; if (!fs.existsSync(p)) continue; for (const l of fs.readFileSync(p, 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\r\n]*)"?\s*$/); if (m) env[m[1]] = m[2]; } }
const T = env.CLOUDFLARE_PAGES_TOKEN || env.CLOUDFLARE_API_TOKEN;
const A = '32c174efaa22353f357c0fdff9d61b86';
const api = p => new Promise((res, rej) => { https.get({ hostname: 'api.cloudflare.com', path: '/client/v4' + p, headers: { Authorization: 'Bearer ' + T } }, r => { let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { res(null); } }); }).on('error', rej); });
(async () => {
  console.log('\n=== aitoptools 部署 (順手一看) ===');
  const j = await api('/accounts/' + A + '/pages/projects/aitoptools/deployments');
  const ds = (j && j.result) || [];
  console.log('部署數: ' + ds.length);
  for (const d of ds.slice(0, 4)) {
    const st = d.latest_stage || {};
    const meta = (d.deployment_trigger || {}).metadata || {};
    console.log(String(d.created_on) + ' | ' + String(meta.commit_hash).slice(0, 8) + ' | ' + st.name + '/' + st.status + ' | ' + String(meta.commit_message || '').slice(0, 36));
    if (st.step_description) console.log('   ★ ' + String(st.step_description).slice(0, 240));
    for (const g of (d.stages || [])) if (g.status !== 'success' && g.step_description) console.log('   ★[' + g.name + '/' + g.status + '] ' + String(g.step_description).slice(0, 240));
  }
})();
