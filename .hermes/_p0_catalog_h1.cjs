// P0 catalog en H1 single-variable batch: CSV source edit with count/shape assertions + backup
// Precedent: 74ffa5a9 (A2 H1 100+→10+). K3-3 A approved (MOQ=10 public caliber).
const fs = require('fs');
const CSV = 'zprintpro-sku-seo-data.csv';
const OLD = 'Catalog Printing 100+ | ZprintPro';
const NEW = 'Catalog Printing 10+ | ZprintPro';

// 1) backup
const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const bakCsv = `.hermes/_bak-catalog-h1-${ts}.csv`;
fs.copyFileSync(CSV, bakCsv);
fs.copyFileSync('src/data/sku-seo-data.ts', `.hermes/_bak-catalog-h1-${ts}.ts`);
console.log('backup:', bakCsv);

// 2) count assertions BEFORE
const before = fs.readFileSync(CSV, 'utf8');
const occ = before.split(OLD).length - 1;
if (occ !== 1) { console.error('ABORT: expected exactly 1 occurrence of OLD in CSV, got', occ); process.exit(1); }
const tsOcc = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8').split(OLD).length - 1;
if (tsOcc !== 1) { console.error('ABORT: expected exactly 1 occurrence of OLD in ts, got', tsOcc); process.exit(1); }

// 3) shape assertion on the catalog row (31 cols before and after)
const lines = before.split('\n');
const rowIdx = lines.findIndex((l) => l.includes('\tcatalog-printing\t'));
if (rowIdx < 0) { console.error('ABORT: catalog row not found'); process.exit(1); }
const colsBefore = lines[rowIdx].split('\t').length;
const after = before.replace(OLD, NEW);
if ((after.split(OLD).length - 1) !== 0) { console.error('ABORT: OLD still present after replace'); process.exit(1); }
if ((after.split(NEW).length - 1) !== 1) { console.error('ABORT: NEW count != 1'); process.exit(1); }
const afterLines = after.split('\n');
const colsAfter = afterLines[rowIdx].split('\t').length;
if (colsAfter !== colsBefore) { console.error('ABORT: col count changed', colsBefore, '->', colsAfter); process.exit(1); }
if (afterLines[rowIdx].split('\t').filter((v) => v === NEW).length !== 1) { console.error('ABORT: NEW not in single col'); process.exit(1); }
// length check: NEW is exactly 1 char shorter than OLD (100+ -> 10+), and total length must differ by exactly 1
if (OLD.length - NEW.length !== 1) { console.error('ABORT: OLD/NEW length delta != 1'); process.exit(1); }
const strip = (x) => x.replace(/\r?\n/g, '');
if (strip(before).length - strip(after).length !== 1) { console.error('ABORT: unexpected byte length delta'); process.exit(1); }

// 4) write
fs.writeFileSync(CSV, after, 'utf8');
console.log('CSV updated: col15 h1_en 100+ -> 10+ (single occurrence, shape OK)');
console.log('Verify: node scripts/csv-to-sku-seo.mjs (dry-run) then --apply');
