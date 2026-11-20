/* 核实 F3 抽检: doujinshi-printing 价格数据来源 */
import * as fs from 'fs';
const pkt = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/f3-packets/doujinshi-printing.json', 'utf8'));
console.log('price_range:', pkt.product.price_range, '| minQuantity:', pkt.product.minQuantity);
const s = fs.readFileSync('F:/zprintpro-nextjs/src/lib/pricing.ts', 'utf8');
const i = s.indexOf('doujinshi-printing');
console.log('INDEPENDENT_PRICES 片段:', i >= 0 ? s.slice(i - 5, i + 160).replace(/\s+/g, ' ') : 'N/A');
// en body 价格先例
const d = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const j = d.indexOf('"doujinshi-printing"');
const seg = d.slice(j, j + 20000);
const enB = seg.match(/"en":\s*\{[\s\S]*?"body":\s*"((?:[^"\\]|\\.)*)"/);
if (enB) {
  const t = enB[1].replace(/\\n/g, ' ');
  const m = t.match(/[¥$€HK$][\d,.\s~/]+/g);
  console.log('en body 价格串:', m ? m.slice(0, 5) : '无');
}
