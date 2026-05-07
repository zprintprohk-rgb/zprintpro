const fs = require('fs');
const path = require('path');

const txtPath = path.join(__dirname, '..', 'seedream-prompts-all-skus.txt');
const content = fs.readFileSync(txtPath, 'utf-8');

const skuMap = {};

// Split by lines that start with ========== 
const lines = content.split('\n');
let current = null;

for (const rawLine of lines) {
  const line = rawLine.trimEnd();
  const headerMatch = line.match(/^==========\s+(\w+-\d+)\s*\|\s*(.+?)\s*={0,10}$/);
  if (headerMatch) {
    if (current) skuMap[current.slug] = current;
    current = {
      skuCode: headerMatch[1],
      slug: headerMatch[2].trim(),
      alt: {},
      filename: {}
    };
    continue;
  }
  if (!current) continue;
  
  if (line.startsWith('Alt ZH:')) current.alt['zh-hk'] = line.replace('Alt ZH:', '').trim();
  else if (line.startsWith('Alt EN:')) current.alt.en = line.replace('Alt EN:', '').trim();
  else if (line.startsWith('Alt JA:')) current.alt.ja = line.replace('Alt JA:', '').trim();
  else if (line.startsWith('SEO Filename ZH:')) current.filename['zh-hk'] = line.replace('SEO Filename ZH:', '').trim().replace('.jpg', '');
  else if (line.startsWith('SEO Filename EN:')) current.filename.en = line.replace('SEO Filename EN:', '').trim().replace('.jpg', '');
  else if (line.startsWith('SEO Filename JA:')) current.filename.ja = line.replace('SEO Filename JA:', '').trim().replace('.jpg', '');
}
if (current) skuMap[current.slug] = current;

const outPath = path.join(__dirname, '..', 'scripts', 'sku-map.json');
fs.writeFileSync(outPath, JSON.stringify(skuMap, null, 2), 'utf-8');

// Verify
let withAlt = 0, withFilename = 0;
for (const v of Object.values(skuMap)) {
  if (Object.keys(v.alt).length > 0) withAlt++;
  if (Object.keys(v.filename).length > 0) withFilename++;
}
console.log(`Parsed ${Object.keys(skuMap).length} SKUs`);
console.log(`With alt: ${withAlt}, With filename: ${withFilename}`);
