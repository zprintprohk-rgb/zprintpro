// moq10-verify-scoped.mjs — 驗證區塊級修正結果
import fs from 'fs';
const s = fs.readFileSync('src/data/sku-seo-data.ts', 'utf-8');
const lines = s.split('\n');

let n = 0;
const kinds = {};
lines.forEach((l) => {
  if (!/100\s*張起印|100張起印|100起印/.test(l)) return;
  n++;
  const k = l.includes('收費透明') ? '收費透明'
    : l.includes('"title"') ? 'title'
    : l.includes('"description"') ? 'desc' : 'body';
  kinds[k] = (kinds[k] || 0) + 1;
});
console.log(`sku-seo-data 剩餘 100起印: ${n}  → ${JSON.stringify(kinds)}`);

console.log('\n紙袋 body 抽查 (應維持 100 張起印):');
for (const needle of ['牛皮紙袋 專為', '白卡紙袋 專為', '禮品紙袋印刷訂製']) {
  const i = s.indexOf(needle);
  if (i >= 0) console.log('  ' + s.slice(i, i + 58).replace(/\s+/g, ' '));
}

console.log('\n傳單/貼紙抽查 (應為 10):');
for (const needle of ['A5 傳單印刷 圓角', '防水貼紙 專為', '異形模切貼紙 透明']) {
  const i = s.indexOf(needle);
  if (i >= 0) console.log('  ' + s.slice(i, i + 58).replace(/\s+/g, ' '));
}

console.log('\n海報抽查 (應為 1):');
for (const needle of ['A2海報印刷 專為', '戶外海報 專為']) {
  const i = s.indexOf(needle);
  if (i >= 0) console.log('  ' + s.slice(i, i + 58).replace(/\s+/g, ' '));
}
