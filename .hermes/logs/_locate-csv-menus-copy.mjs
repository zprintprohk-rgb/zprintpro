// .hermes/logs/_locate-csv-menus-copy.mjs — 在 CSV 中定位 menus 的 MOQ 文案位置
import fs from 'node:fs';

const raw = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = raw.split(/\r?\n/);
const header = lines[0].split('\t');
const MENUS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus'];

/** MOQ 樣式（與掃描器一致） */
const PATTERNS = [
  { re: /(\d+)\s*本\s*起(?:印|訂)?/g, label: 'N本起' },
  { re: /(\d+)\s*張\s*起(?:印|訂)?/g, label: 'N張起' },
  { re: /(\d+)\s*個\s*起(?:印|訂)?/g, label: 'N個起' },
  { re: /(\d+)\s*份\s*起(?:印|訂)?/g, label: 'N份起' },
  { re: /(\d+)\s*枚\s*(?:から|〜|~)/g, label: 'N枚から' },
  { re: /(\d+)\s*冊\s*(?:から|〜|~)/g, label: 'N冊から' },
  { re: /(\d+)[ \t]+(?:[A-Za-z]{3,12}[ \t]+)?(?:MOQ|Copies|copies)\b/g, label: 'en MOQ' },
];

console.log('=== CSV 中 menus 各欄位的 MOQ 命中 ===\n');
for (const slug of MENUS) {
  const line = lines.find((l) => l.split('\t')[3] === slug);
  if (!line) {
    console.log(`🔴 ${slug}: 找不到`);
    continue;
  }
  const cols = line.split('\t');
  console.log(`[${slug}] 行長 ${line.length}，${cols.length} 欄`);
  cols.forEach((c, i) => {
    const hits = [];
    for (const { re, label } of PATTERNS) {
      const r = new RegExp(re.source, 'g');
      let m;
      while ((m = r.exec(c))) hits.push(`${label}=${m[1]}`);
    }
    if (hits.length) {
      console.log(`   [${i}] ${header[i]}: ${hits.join(', ')}`);
      console.log(`        ${c.replace(/\s+/g, ' ').slice(0, 150)}`);
    }
  });
  console.log('');
}
