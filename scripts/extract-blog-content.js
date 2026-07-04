const fs = require('fs');

// Read the original blog page with full content
const c = fs.readFileSync('F:/zprintpro-nextjs/blog-original.tsx', 'utf8');
console.log('Source size:', c.length);

// Find the posts object
const postsIdx = c.indexOf('const posts:');

// Extract all blog entries with full content
// Structure: 'slug': { title: '...', description: '...', date: '...', category: '...', content: `HTML` },

const extractLocale = (localeName, searchStart) => {
  const localeIdx = c.indexOf(`'${localeName}': {`, searchStart);
  if (localeIdx < 0) { console.log(`${localeName}: NOT FOUND`); return {}; }
  
  // Find the end of this locale section (next locale or end of posts)
  const nextLocales = ['en', 'ja'].filter(l => l !== localeName);
  let endIdx = c.length;
  for (const nl of nextLocales) {
    const ni = c.indexOf(`'${nl}': {`, localeIdx + 10);
    if (ni > 0 && ni < endIdx) endIdx = ni;
  }
  // Also check for }; (end of posts)
  const postsEnd = c.indexOf('};', localeIdx + 10);
  if (postsEnd < endIdx) endIdx = postsEnd;
  
  const section = c.substring(localeIdx, endIdx);
  console.log(`\n${localeName}: section length=${section.length}`);
  
  // Find all blog entries in this section
  const entries = {};
  const slugRe = /'([a-z0-9-]+)':\s*\{/g;
  let match;
  const slugs = [];
  while ((match = slugRe.exec(section)) !== null) {
    slugs.push({ slug: match[1], pos: match.index });
  }
  
  for (let i = 0; i < slugs.length; i++) {
    const { slug, pos } = slugs[i];
    const entryStart = localeIdx + pos;
    const entryEnd = i + 1 < slugs.length ? localeIdx + slugs[i + 1].pos : localeIdx + section.length;
    
    const entry = c.substring(entryStart, entryEnd);
    
    // Extract content (the full HTML between content: ` and `)
    const contentMatch = entry.match(/content:\s*`([\s\S]*?)`\s*,?\s*$/m);
    if (contentMatch) {
      entries[slug] = contentMatch[1].trim();
      console.log(`  ${slug}: content ${contentMatch[1].length} chars`);
    } else {
      // Try single-quoted content
      const sqMatch = entry.match(/content:\s*'([^']*)'/);
      if (sqMatch) {
        entries[slug] = sqMatch[1];
        console.log(`  ${slug}: content ${sqMatch[1].length} chars (single-quoted)`);
      } else {
        console.log(`  ${slug}: NO CONTENT FOUND`);
        entries[slug] = '';
      }
    }
  }
  
  return entries;
};

// Extract all 3 locales
const zhHK = extractLocale('zh-hk', postsIdx);
const en = extractLocale('en', postsIdx);
const ja = extractLocale('ja', postsIdx);

// Create output directory
const outDir = 'F:/zprintpro-nextjs/src/data/blog-contents';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Write JSON files
const writeJSON = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

writeJSON(`${outDir}/zh-hk.json`, zhHK);
writeJSON(`${outDir}/en.json`, en); 
writeJSON(`${outDir}/ja.json`, ja);

console.log(`\n--- Summary ---`);
console.log(`zh-hk: ${Object.keys(zhHK).length} articles`);
console.log(`en: ${Object.keys(en).length} articles`);
console.log(`ja: ${Object.keys(ja).length} articles`);

// Verify sizes
for (const l of ['zh-hk', 'en', 'ja']) {
  const size = fs.statSync(`${outDir}/${l}.json`).size;
  console.log(`${l}.json: ${(size/1024).toFixed(1)} KB`);
}
