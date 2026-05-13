const fs = require('fs');
let data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function extractString(block, label) {
  const idx = block.indexOf(label);
  if (idx === -1) return null;
  let pos = idx + label.length;
  while (pos < block.length && /\s/.test(block[pos])) pos++;
  if (block[pos] !== "'") return null;
  pos++;
  let result = '';
  while (pos < block.length) {
    if (block[pos] === '\\' && pos + 1 < block.length) { result += block[pos + 1]; pos += 2; }
    else if (block[pos] === "'") return result;
    else { result += block[pos]; pos++; }
  }
  return null;
}

function getContentBlock(block) {
  const contentIdx = block.indexOf('content:');
  if (contentIdx === -1) return null;
  const braceOpen = block.indexOf('{', contentIdx);
  let depth = 1;
  let pos = braceOpen + 1;
  while (depth > 0 && pos < block.length) {
    if (block[pos] === "'") {
      pos++;
      while (pos < block.length) {
        if (block[pos] === '\\' && pos + 1 < block.length) pos += 2;
        else if (block[pos] === "'") { pos++; break; }
        else pos++;
      }
      continue;
    }
    if (block[pos] === '{') depth++;
    else if (block[pos] === '}') depth--;
    pos++;
  }
  return block.slice(contentIdx, pos);
}

function expandBlock(startLabel, nextLabel, zhAdd, enAdd) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  let block = data.slice(start, end > 0 ? end : data.length);
  const contentBlock = getContentBlock(block);
  if (!contentBlock) return;
  let newContentBlock = contentBlock;
  const zh = extractString(contentBlock, "'zh-hk':");
  const en = extractString(contentBlock, "'en':");
  if (zh && zhAdd) {
    const old = "'zh-hk': '" + zh.replace(/'/g, "\\'") + "',";
    const nzh = zh.slice(0, zh.lastIndexOf('</p>') + 4) + zhAdd;
    newContentBlock = newContentBlock.replace(old, "'zh-hk': '" + nzh.replace(/'/g, "\\'") + "',");
  }
  if (en && enAdd) {
    const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
    const nen = en.slice(0, en.lastIndexOf('</p>') + 4) + enAdd;
    newContentBlock = newContentBlock.replace(old, "'en': '" + nen.replace(/'/g, "\\'") + "',");
  }
  block = block.replace(contentBlock, newContentBlock);
  data = data.slice(0, start) + block + data.slice(end > 0 ? end : data.length);
}

const zhAdd = '<h2>傳單效果測量與優化方法</h2><p>傳單投放後的效果測量是提升 ROI 的關鍵環節。建議在傳單上印製專屬的 QR Code 或優惠碼，通過掃描次數與兌換率來量化傳單的實際轉化效果。A/B 測試是優化傳單設計的有效手段：準備兩種不同設計或不同尺寸的傳單，分別投放於相同或相似的地點，比較兩者的回收率與轉化率。定期分析數據並調整設計、尺寸與派發策略，能讓傳單的投資回報率持續提升。</p>';
const enAdd = '<h2>Measuring and Optimizing Flyer Performance</h2><p>Post-distribution performance measurement is essential for improving flyer ROI. We recommend printing unique QR codes or promotional codes on flyers to quantify actual conversion through scan counts and redemption rates. A/B testing is an effective method for optimizing flyer design: prepare two different designs or sizes and distribute them in identical or similar locations, then compare recovery and conversion rates. Regular data analysis and adjustments to design, size, and distribution strategy ensure continuous improvement in return on investment.</p>';

expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", zhAdd, enAdd);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v8 complete.');
