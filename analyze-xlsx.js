const XLSX = require('xlsx');
const wb = XLSX.readFile('z-printpro.com-Performance-on-Search-2026-04-26.xlsx');
const ws = wb.Sheets['查询数'];
const data = XLSX.utils.sheet_to_json(ws, {header:1});
console.log('=== 查询数（关键词）完整列表 ===');
console.log('Total keywords:', data.length - 1);

const rows = data.slice(1).map(r => ({
  keyword: r[0],
  clicks: r[1] || 0,
  impressions: r[2] || 0,
  ctr: r[3] || 0,
  position: r[4] || 0
})).sort((a, b) => b.impressions - a.impressions);

console.log('\n--- Top 50 by Impressions ---');
rows.slice(0, 50).forEach((r, i) => {
  const status = r.position <= 10 ? 'PAGE1' : r.position <= 20 ? 'PAGE2' : 'PAGE3+';
  console.log((i+1) + '. ' + r.keyword + ' | 展示:' + r.impressions + ' | 点击:' + r.clicks + ' | 排名:' + r.position.toFixed(1) + ' | ' + status);
});

console.log('\n--- Keywords with clicks but position > 20 (quick wins) ---');
rows.filter(r => r.clicks > 0 && r.position > 20).forEach(r => {
  console.log(r.keyword + ' | 点击:' + r.clicks + ' | 排名:' + r.position.toFixed(1));
});

console.log('\n--- High impressions but 0 clicks (major opportunities) ---');
rows.filter(r => r.impressions >= 100 && r.clicks === 0).forEach(r => {
  console.log(r.keyword + ' | 展示:' + r.impressions + ' | 排名:' + r.position.toFixed(1));
});
