// moq10-check-book-tables.mjs — 檢查書刊 SKU 是否有 price table (決定 quantities 是否為活資料)
import fs from 'fs';
const g = fs.readFileSync('src/lib/price-data.generated.ts', 'utf-8');
const mapI = g.indexOf('PRICE_TABLE_MAP');
const mapSeg = g.slice(mapI, g.indexOf('export function getPriceTableForSlug'));
for (const s of ['catalog-printing', 'exercise-books', 'saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks']) {
  const inTable = mapSeg.includes(`'${s}': {`);
  console.log(`${s.padEnd(24)} price-table = ${inTable}  → ${inTable ? 'quantities 為死資料 (由 ReferencePriceBlock 渲染)' : '走 QuoteCalculator (quantities 為活資料)'}`);
}
