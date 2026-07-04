const fs = require('fs');
const c = fs.readFileSync('F:/zprintpro-nextjs/blog-original.tsx', 'utf8');

// Extract ALL blog entries with content across all 3 locales
// Structure: each locale section has 'slug': { ... content: `HTML` ... },

// Find all content blocks: content: `<html>...</html>`
const contentRegex = /content:\s*`([\s\S]*?)`\s*(?:,|\})/g;
// Find the preceding slug: /\n\s*'([a-z0-9-]+)':\s*\{/ before each content
// But we need to match slug→content pairs within the right locale context

// Strategy: split file by locale markers and extract each section
const zhIdx1 = c.indexOf("'zh-hk': {", 1000); // skip translations 'zh-hk'
const enIdx = c.indexOf("'en': {", zhIdx1 + 100);
const jaIdx = c.indexOf("'ja': {", enIdx + 100);
const endIdx = c.indexOf('const articleSlugs', jaIdx);

if (zhIdx1 < 0 || enIdx < 0 || jaIdx < 0) {
  console.log('Locales not found!');
  process.exit(1);
}

console.log('zh-hk at:', zhIdx1, 'en at:', enIdx, 'ja at:', jaIdx, 'end at:', endIdx);

// Extract each locale section
const extractSection = (start, end, localeName) => {
  const section = c.substring(start, end);
  const articles = {};
  
  // Find all slug→content pairs
  const slugRe = /'([a-z0-9-]+)':\s*\{/g;
  let slugMatch;
  const slugs = [];
  while ((slugMatch = slugRe.exec(section)) !== null) {
    slugs.push({ slug: slugMatch[1], pos: slugMatch.index });
  }
  
  for (let i = 0; i < slugs.length; i++) {
    const { slug, pos } = slugs[i];
    const entryStart = pos;
    const entryEnd = i + 1 < slugs.length ? slugs[i + 1].pos - 1 : section.length;
    
    const entry = section.substring(entryStart, entryEnd);
    const contentMatch = entry.match(/content:\s*`([\s\S]*?)`/);
    if (contentMatch) {
      articles[slug] = contentMatch[1].trim();
    }
  }
  
  return articles;
};

const zhHK = extractSection(zhIdx1, enIdx - 10, 'zh-hk');
const en = extractSection(enIdx, jaIdx - 10, 'en');
const ja = extractSection(jaIdx, endIdx > 0 ? endIdx : c.length, 'ja');

// Write JSON files
const outDir = 'F:/zprintpro-nextjs/src/data/blog-contents';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(`${outDir}/zh-hk.json`, JSON.stringify(zhHK, null, 2), 'utf8');
fs.writeFileSync(`${outDir}/en.json`, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(`${outDir}/ja.json`, JSON.stringify(ja, null, 2), 'utf8');

console.log(`\nzh-hk: ${Object.keys(zhHK).length} articles, ${(fs.statSync(`${outDir}/zh-hk.json`).size/1024).toFixed(1)}KB`);
console.log(`en: ${Object.keys(en).length} articles, ${(fs.statSync(`${outDir}/en.json`).size/1024).toFixed(1)}KB`);
console.log(`ja: ${Object.keys(ja).length} articles, ${(fs.statSync(`${outDir}/ja.json`).size/1024).toFixed(1)}KB`);

// Quality check: count content chars per article
for (const [loc, data] of [['zh-hk', zhHK], ['en', en], ['ja', ja]]) {
  let shortCount = 0;
  for (const [slug, html] of Object.entries(data)) {
    const textLen = html.replace(/<[^>]+>/g, '').length;
    if (textLen < 200) {
      console.log(`  ⚠️ ${loc}/${slug}: ${textLen} chars (thin)`);
      shortCount++;
    }
  }
  if (shortCount === 0) console.log(`  ✅ ${loc}: all articles have substantial content`);
}
