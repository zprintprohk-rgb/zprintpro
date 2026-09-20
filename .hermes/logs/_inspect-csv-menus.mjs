// .hermes/logs/_inspect-csv-menus.mjs — 檢視 CSV 第 5 欄（權重）與 menus 列的實際結構
import fs from 'node:fs';

const raw = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = raw.split(/\r?\n/);
const header = lines[0].split('\t');

console.log('=== CSV 表頭（31 欄）===');
header.forEach((h, i) => console.log(`  [${i}] ${h}`));

const MENUS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus'];
console.log('\n=== menus 列的關鍵欄位 ===');
for (const slug of MENUS) {
  const line = lines.find((l) => l.split('\t')[3] === slug);
  if (!line) {
    console.log(`  🔴 ${slug}: 找不到`);
    continue;
  }
  const cols = line.split('\t');
  console.log(`\n[${slug}] 共 ${cols.length} 欄`);
  console.log(`  [0] 名稱(ZH): ${cols[0]}`);
  console.log(`  [3] Slug: ${cols[3]}`);
  console.log(`  [4] 「${header[4]}」= ${JSON.stringify(cols[4])}`);
}

console.log('\n=== 全 CSV 第 5 欄的值分布（判斷該欄語義）===');
const dist = {};
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  const v = lines[i].split('\t')[4] ?? '(空)';
  dist[v] = (dist[v] ?? 0) + 1;
}
for (const [k, v] of Object.entries(dist).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${k}: ${v} 列`);
}
