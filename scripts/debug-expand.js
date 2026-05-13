const fs = require('fs');
const data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

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

const start = data.indexOf('export const stickerMaterialsCluster');
const end = data.indexOf('export const stickerPackagingDesignCluster');
const block = data.slice(start, end);

const en = extractString(block, "'en':");
const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
console.log('Found old in block:', block.includes(old));
console.log('Old length:', old.length);
console.log('Block has Cost-Benefit:', block.includes('Cost-Benefit Analysis'));

// Check if "Cost-Benefit" appears in zh or ja
const zh = extractString(block, "'zh-hk':");
const ja = extractString(block, "'ja':");
console.log('ZH has Cost-Benefit:', zh.includes('成本效益'));
console.log('JA has Cost-Benefit:', ja.includes('コスト效益'));
