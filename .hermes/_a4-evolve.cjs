const { execSync } = require('child_process');
const revs = [
  ['2e46b1f1', 'R2 压缩前 (2026-09-22)'],
  ['b78a58be', 'R2 带钱词轮 (2026-09-21)'],
  ['d3f165fc', 'K3 v5 28槽 (2026-09-23)'],
  ['9d3bf5ec', 'batch2 12槽 (2026-09-23)'],
  ['0151726b', '门童 #27 (2026-09-23) 当前'],
];
const pat = /"title": "A4 傳單印刷[^"]*"/;
for (const [rev, label] of revs) {
  try {
    const txt = execSync(`git show ${rev}:src/data/sku-seo-data.ts`, { encoding: 'utf8', maxBuffer: 80 * 1024 * 1024 });
    const m = txt.match(pat);
    console.log(`[${rev}] ${label}:\n   ${m ? m[0] : '??'}`);
  } catch (e) { console.log(`[${rev}] ${label}: ERR ${e.message.slice(0, 50)}`); }
}
