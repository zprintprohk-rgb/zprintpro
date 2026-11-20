'use strict';
// 產生 guard-safe 結果表 (僅 loc/slug/狀態/長度, 不含描述文字 → 不觸發品牌/黑話掃描)
const fs = require('fs');
const path = require('path');
const D = __dirname;
const LOGS = path.join(D, '..', 'logs');

const results = JSON.parse(fs.readFileSync(path.join(LOGS, '2026-09-18-meta-description-postfix.json'), 'utf8'));
const retry = fs.readFileSync(path.join(D, 'retry503.txt'), 'utf8');

// 補探結果 -> map
const retryMap = {};
for (const raw of retry.split('\n')) {
  const line = raw.replace(/\r$/, '').trimEnd();
  const m = line.match(/^(OK|MISS|★MISS|FAIL)\s+([a-z-]+)\/([A-Za-z0-9-]+)(?:\s+\[(\d+)\])?$/);
  if (m) retryMap[m[2] + '/' + m[3]] = { state: m[1], len: m[4] ? Number(m[4]) : '' };
}
console.log('補探 map 解析: ' + Object.keys(retryMap).length + ' 筆');

// 溫和探針 (獨立驗證 2 個「邊緣節點陳舊構建」個案)
{
  const gp = fs.readFileSync(path.join(D, 'gentle-probe.txt'), 'utf8').split('\n');
  let cur = null;
  for (const raw of gp) {
    const line = raw.replace(/\r$/, '');
    const h = line.match(/^\[(\d+)\]\s+([a-z-]+)\/blog\/([^/]+)\/$/);
    if (h) { cur = h[2] + '/' + h[3]; continue; }
    if (!cur) continue;
    const d = line.match(/^\s+desc\s+:\s+(?:\[(\d+)\])?/);
    if (d) {
      if (d[1]) retryMap[cur] = { state: 'OK', len: Number(d[1]) };
      else if (/★\s*缺失/.test(line)) retryMap[cur] = { state: 'MISS', len: '' };
      cur = null;
    }
  }
  console.log('合併溫和探針後 map: ' + Object.keys(retryMap).length + ' 筆');
}

const rows = ['locale\tslug\tstatus_first_pass\thas_description_after\tfinal_state\tdesc_char_len'];
for (const r of results) {
  const key = r.loc + '/' + r.slug;
  const rt = retryMap[key];
  const finalState = rt
    ? (rt.len !== '' ? 'HAS_DESC' : 'MISSING')
    : (r.desc && r.desc.trim() ? 'HAS_DESC' : 'MISSING');
  const len = rt && rt.len !== '' ? rt.len : (r.desc ? r.descLen : '');
  rows.push([r.loc, r.slug, r.status, r.desc && r.desc.trim() ? 'YES' : 'NO', finalState, len].join('\t'));
}
const out = rows.join('\n') + '\n';
fs.writeFileSync(path.join(LOGS, '2026-09-18-meta-description-results.tsv'), out, 'utf8');

const body = rows.slice(1);
const has = body.filter(l => l.split('\t')[4] === 'HAS_DESC').length;
const miss = body.filter(l => l.split('\t')[4] === 'MISSING').length;
console.log('寫入 TSV: ' + body.length + ' 行');
console.log('HAS_DESC: ' + has + ' | MISSING: ' + miss);
console.log('MISSING 清單:');
body.filter(l => l.split('\t')[4] === 'MISSING').forEach(l => {
  const c = l.split('\t');
  console.log('   ' + c[0] + '/' + c[1]);
});
