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

function expandBlock(startLabel, nextLabel, enAdd) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  let block = data.slice(start, end > 0 ? end : data.length);
  const contentBlock = getContentBlock(block);
  if (!contentBlock) return;
  let newContentBlock = contentBlock;
  const en = extractString(contentBlock, "'en':");
  if (en && enAdd) {
    const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
    const nen = en.slice(0, en.lastIndexOf('</p>') + 4) + enAdd;
    newContentBlock = newContentBlock.replace(old, "'en': '" + nen.replace(/'/g, "\\'") + "',");
  }
  block = block.replace(contentBlock, newContentBlock);
  data = data.slice(0, start) + block + data.slice(end > 0 ? end : data.length);
}

const enAdd = '<h2>Getting Started with Your Order</h2><p>Initiating your printing project with ZPrintPro is straightforward and efficient. Simply browse our product pages to explore available options and pricing, then submit your design files through our secure upload portal or email them directly to our team. For complex projects requiring design assistance, schedule a free consultation with our specialists who will guide you through material selection, finishing options, and budget optimization. Once your artwork is approved, we provide detailed production schedules with clear milestones. Our commitment to transparency means you will never encounter unexpected costs or delays. Whether you need a small batch of stickers for a product launch or thousands of packaging boxes for a retail rollout, we have the capacity, expertise, and dedication to bring your vision to life with exceptional quality and reliability.</p>';

expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar", enAdd);
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar", enAdd);
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster", enAdd);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v7 complete.');
