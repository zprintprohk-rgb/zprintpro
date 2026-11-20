// P2 B/C: catalog zh-hk desc + ja desc MOQ alignment (row-scoped edits with assertions + backup)
const fs = require('fs');
const CSV = 'zprintpro-sku-seo-data.csv';
const BEFORE = fs.readFileSync(CSV, 'utf8');
const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
fs.copyFileSync(CSV, `.hermes/_bak-catalog-desc-${ts}.csv`);

const lines = BEFORE.split('\n');
const rowIdx = lines.findIndex((l) => l.includes('\tcatalog-printing\t'));
if (rowIdx < 0) { console.error('ABORT: no catalog row'); process.exit(1); }
const cols = lines[rowIdx].split('\t');
if (cols.length !== 31) { console.error('ABORT: cols != 31, got', cols.length); process.exit(1); }

// B: zh desc "畫冊印刷/畫冊印刷 100 起" -> "畫冊印刷 10 本起印" (dedupe + MOQ truth per K3-3 A; title says 10本起印)
const zhOld = '畫冊印刷/畫冊印刷 100 起。';
const zhNew = '畫冊印刷 10 本起印。';
if (!cols[11].includes(zhOld)) { console.error('ABORT: zh pattern not found in desc_zh'); process.exit(1); }
if ((BEFORE.match(/畫冊印刷\/畫冊印刷/g) || []).length !== 1) { console.error('ABORT: zh dup pattern count != 1 in whole CSV'); process.exit(1); }
cols[11] = cols[11].replace(zhOld, zhNew);

// C: ja desc "100〜" -> "10冊〜" (align title 10冊〜; same char count)
const jaOld = '100〜';
const jaNew = '10冊〜';
if (!cols[13].includes(jaOld)) { console.error('ABORT: ja pattern not found in desc_ja'); process.exit(1); }
// ensure "100〜" appears only once in this row's desc and scope the replacement to this cell
const jaCountInRow = cols[13].split(jaOld).length - 1;
if (jaCountInRow !== 1) { console.error('ABORT: ja 100〜 count in desc_ja != 1'); process.exit(1); }
cols[13] = cols[13].replace(jaOld, jaNew);

// shape assertions
const newLine = cols.join('\t');
if (newLine.split('\t').length !== 31) { console.error('ABORT: col count drift'); process.exit(1); }
if ((newLine.match(/100 起|100〜/g) || []).length !== 0) { console.error('ABORT: stale 100 patterns remain in catalog row'); process.exit(1); }
if (!newLine.includes('10 本起印') || !newLine.includes('10冊〜')) { console.error('ABORT: new MOQ strings missing'); process.exit(1); }

lines[rowIdx] = newLine;
fs.writeFileSync(CSV, lines.join('\n'), 'utf8');
console.log('B+C applied (row-scoped):');
console.log('  zh desc now:', cols[11].slice(0, 60) + '...');
console.log('  ja desc now:', cols[13].slice(0, 60) + '...');
console.log('next: generator dry-run -> apply -> gates');
