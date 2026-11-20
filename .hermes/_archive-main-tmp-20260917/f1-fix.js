/* F1 修复: ① books 5 SKU '**交稿規範**' → '交稿規範：' ② red-packets 6 SKU 交期句逐SKU改写 */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';

// ① books 前缀
const booksFix = (b) => b.replace(/\*\*交稿規範\*\*\s*/, '交稿規範：');

// ② red-packets 交期句 (old -> new, 保持事实: AI預檢/打樣確認/3-5天/港九新界免費速遞)
const RP = {
  'foil-red-packets': {
    old: '客戶只需提供清晰設計稿，廠方會先進行免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '廠方收到清晰設計稿後會先免費 AI 預檢，再出數碼打樣供確認；標準交期約 3-5 個工作天，港九新界速遞免運費。'
  },
  'embossed-red-packets': {
    old: '提交設計檔案後，廠方提供免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '交稿後廠方即進行免費 AI 預檢與打樣確認，確認無誤才投產；標準訂單約 3-5 個工作天完成，港九新界免費送貨上門。'
  },
  'custom-red-packets': {
    old: '客戶只需提供設計檔案，廠方提供免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '提供設計檔案後，廠方安排免費 AI 預檢，打樣確認後開始生產；標準訂單約 3-5 個工作天，港九新界免運費送達。'
  },
  'cartoon-red-packets': {
    old: '下單前只需提供插畫或設計檔案，廠方提供免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '下單時附上插畫或設計檔案，廠方免費 AI 預檢並確認打樣；正常交期約 3-5 個工作天，港九新界免費速遞。'
  },
  'eco-red-packets': {
    old: '下單前只需提供設計檔案，廠方提供免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '落單前交出設計檔案，廠方免費 AI 預檢並與您確認打樣；約 3-5 個工作天完成生產，港九新界免運費直送。'
  },
  'large-red-packets': {
    old: '提交設計檔案後，廠方提供免費 AI 預檢與打樣確認，標準訂單約 3-5 個工作天完成，港九新界免費速遞。',
    new: '設計稿提交後廠方提供免費 AI 預檢與打樣確認，隨即排期生產；標準交期 3-5 個工作天，港九新界免費速遞送抵。'
  },
};
const BOOKS = ['catalog-printing', 'hardcover-books', 'spiral-notebooks', 'saddle-stitch-booklets', 'perfect-bound-books'];

let n1 = 0, n2 = 0;
for (const s of [...Object.keys(RP), ...BOOKS]) {
  const fp = `${OUT}/${s}.json`;
  const o = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let b = o.body;
  if (BOOKS.includes(s)) { const before = b; b = booksFix(b); if (b !== before) n1++; }
  if (RP[s]) { const before = b; b = b.replace(RP[s].old, RP[s].new); if (b === before) { console.log(`!! ${s} 交期句未命中替换`); } else n2++; }
  o.body = b;
  fs.writeFileSync(fp, JSON.stringify(o), 'utf8');
}
console.log(`books 前缀修复: ${n1}/5 | red-packets 交期句改写: ${n2}/6`);
