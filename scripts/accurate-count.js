const fs = require('fs');
const data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function stripHtmlTagsOnly(str) {
  return str.replace(/<[^>]+>/g, ' ');
}
function countChineseChars(str) {
  return (stripHtmlTagsOnly(str).replace(/\s+/g, '').match(/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
}
function countEnglishWords(str) {
  return stripHtmlTagsOnly(str).split(/\s+/).filter(w => w.length > 0 && /[a-zA-Z]/.test(w)).length;
}
function countJapaneseChars(str) {
  return (stripHtmlTagsOnly(str).replace(/\s+/g, '').match(/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/g) || []).length;
}
function extractString(block, label) {
  const idx = block.indexOf(label);
  if (idx === -1) return null;
  let pos = idx + label.length;
  while (pos < block.length && /\s/.test(block[pos])) pos++;
  if (block[pos] !== "'") return null;
  pos++;
  let result = '';
  while (pos < block.length) {
    if (block[pos] === '\\' && pos + 1 < block.length) {
      result += block[pos + 1]; pos += 2;
    } else if (block[pos] === "'") {
      return result;
    } else {
      result += block[pos]; pos++;
    }
  }
  return null;
}

function getBlock(startLabel, nextLabel) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  return data.slice(start, end > 0 ? end : start + 15000);
}

function countBlock(block, name, isPillar) {
  const contentIdx = block.indexOf('content:');
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
  const contentBlock = block.slice(contentIdx, pos);
  const zh = extractString(contentBlock, "'zh-hk':");
  const en = extractString(contentBlock, "'en':");
  const ja = extractString(contentBlock, "'ja':");
  const zhC = countChineseChars(zh);
  const enC = countEnglishWords(en);
  const jaC = countJapaneseChars(ja);
  const zhR = isPillar ? 2000 : 800;
  const enR = isPillar ? 1500 : 500;
  const jaR = isPillar ? 2000 : 800;
  const ok = zhC >= zhR && enC >= enR && jaC >= jaR;
  return { name, zh: zhC, en: enC, ja: jaC, ok };
}

const items = [
  ['sticker-guide', "export const stickerGuidePillar", "export const flyerGuidePillar", true],
  ['flyer-guide', "export const flyerGuidePillar", "export const packagingGuidePillar", true],
  ['packaging-guide', "export const packagingGuidePillar", "export const stickerMaterialsCluster", true],
  ['sticker-materials', "export const stickerMaterialsCluster", "export const stickerPackagingDesignCluster", false],
  ['sticker-packaging-design', "export const stickerPackagingDesignCluster", "export const clearVsMatteStickersCluster", false],
  ['clear-vs-matte-stickers', "export const clearVsMatteStickersCluster", "// ==== CLUSTER 4-6", false],
  ['flyer-sizes-compared', "export const flyerSizesComparedCluster", "export const flyerDistributionStrategyCluster", false],
  ['flyer-distribution-strategy', "export const flyerDistributionStrategyCluster", "export const foilFlyersIndustryCluster", false],
  ['foil-flyers-industry', "export const foilFlyersIndustryCluster", "// ==== CLUSTER 7-9", false],
  ['rigid-vs-folding-boxes', "export const rigidVsFoldingBoxesCluster", "export const ecoPaperBagGsmCluster", false],
  ['eco-paper-bag-gsm', "export const ecoPaperBagGsmCluster", "export const packagingColorPsychologyCluster", false],
  ['packaging-color-psychology', "export const packagingColorPsychologyCluster", "// ==== 聚合導出", false],
];

console.log('=== Accurate Content Word Count ===\n');
console.log('Item                          | zh-hk chars | en words | ja chars | Status');
console.log('------------------------------|-------------|----------|----------|--------');

for (const [name, startLabel, nextLabel, isPillar] of items) {
  const block = getBlock(startLabel, nextLabel);
  const r = countBlock(block, name, isPillar);
  const status = r.ok ? 'OK' : 'NEED_FILL';
  console.log(`${r.name.padEnd(30)}| ${r.zh.toString().padStart(11)} | ${r.en.toString().padStart(8)} | ${r.ja.toString().padStart(8)} | ${status}`);
}
console.log('\nRequirements: Pillars zh>=2000 en>=1500 ja>=2000 | Clusters zh>=800 en>=500 ja>=800');
