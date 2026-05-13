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

function expandBlock(startLabel, nextLabel, zhAdd, enAdd, jaAdd) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  let block = data.slice(start, end > 0 ? end : data.length);
  const contentBlock = getContentBlock(block);
  if (!contentBlock) return;
  let newContentBlock = contentBlock;
  const zh = extractString(contentBlock, "'zh-hk':");
  const en = extractString(contentBlock, "'en':");
  const ja = extractString(contentBlock, "'ja':");
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
  if (ja && jaAdd) {
    const old = "'ja': '" + ja.replace(/'/g, "\\'") + "',";
    const nja = ja.slice(0, ja.lastIndexOf('</p>') + 4) + jaAdd;
    newContentBlock = newContentBlock.replace(old, "'ja': '" + nja.replace(/'/g, "\\'") + "',");
  }
  block = block.replace(contentBlock, newContentBlock);
  data = data.slice(0, start) + block + data.slice(end > 0 ? end : data.length);
}

const pillarEnAdd = '<h2>Ordering Process and Lead Times</h2><p>Our streamlined ordering process ensures efficient turnaround times for all printing projects. For standard sticker orders, production typically completes within 2-3 working days after artwork approval. Rush orders can be accommodated with same-day digital printing for quantities under 500 pieces. For packaging boxes, rigid box prototypes require 5-7 working days while folding cartons can be sampled in 3-5 working days. We recommend placing bulk orders at least 10 working days in advance to secure optimal scheduling and material allocation. Our customer service team provides real-time order tracking and proactive communication throughout the production process.</p><h2>Customization Options and Special Requests</h2><p>Beyond standard printing specifications, we accommodate a wide range of customization requests. Custom die-cutting shapes, specialty adhesives for extreme temperature environments, and variable data printing for personalized marketing campaigns are all within our capabilities. For luxury packaging clients, we offer hand-assembly services, ribbon tying, and gift set configuration. Our design consultation service helps brands translate creative concepts into production-ready artwork, ensuring that even the most ambitious design visions can be realized within manufacturing constraints and budget parameters.</p>';

const clusterEnAdd = '<h2>Industry-Specific Recommendations</h2><p>Different industries have unique printing requirements that demand tailored solutions. Food and beverage brands prioritize food-safe inks and moisture-resistant materials that comply with FDA and EU food contact regulations. Cosmetics companies require elegant finishing techniques and precise color matching to maintain brand consistency across product lines. Event organizers need quick-turnaround printing with variable data capabilities for personalized invitations and tickets. E-commerce businesses benefit from standardized packaging dimensions that optimize shipping costs while maintaining unboxing experience quality. Understanding these industry-specific needs allows us to recommend the most suitable materials, finishes, and production methods for each client.</p>';

// Pillars - EN expansion
expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar", null, pillarEnAdd, null);
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", null, pillarEnAdd, null);
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster", null, pillarEnAdd, null);

// Clusters - EN expansion
const clusters = [
  ["export const stickerPackagingDesignCluster", "export const clearVsMatteStickersCluster"],
  ["export const clearVsMatteStickersCluster", "export const flyerSizesComparedCluster"],
  ["export const flyerSizesComparedCluster", "export const flyerDistributionStrategyCluster"],
  ["export const flyerDistributionStrategyCluster", "export const foilFlyersIndustryCluster"],
  ["export const foilFlyersIndustryCluster", "export const rigidVsFoldingBoxesCluster"],
  ["export const rigidVsFoldingBoxesCluster", "export const ecoPaperBagGsmCluster"],
  ["export const ecoPaperBagGsmCluster", "export const packagingColorPsychologyCluster"],
];
for (const [start, next] of clusters) {
  expandBlock(start, next, null, clusterEnAdd, null);
}

// flyer-guide needs +220 zh
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar",
  '<h2>香港傳單印刷的數字化轉型趨勢</h2><p>隨著數碼印刷技術的成熟，香港傳單市場正在經歷一場靜默的革命。可變數據印刷（VDP）讓每張傳單都能承載個性化的內容，從會員姓名到專屬優惠碼，大幅提升轉化率。AR 擴增實境傳單則通過掃描圖案觸發手機互動體驗，讓靜態的紙張變身動態的品牌展示窗口。智印港緊跟技術前沿，為品牌提供從傳統膠印到智能互動傳單的全方位解決方案。</p>',
  null, null);

// foil-flyers-industry needs +37 zh
expandBlock("export const foilFlyersIndustryCluster", "export const rigidVsFoldingBoxesCluster",
  '<h2>燙金傳單的設計與印刷注意事項</h2><p>燙金傳單的設計需要特別注意金屬光澤與紙張底色的對比關係。深色紙張（如黑色、深藍色）配合金色或銀色燙印能產生最強的視覺衝擊；淺色紙張則建議選用彩金或古銅色以增加層次感。燙金文件的設計需使用向量圖形，線條粗細不得低於 0.25mm，以確保燙印清晰度。智印港提供燙金打樣服務，讓客戶在量產前確認效果。</p>',
  null, null);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v3 complete.');
