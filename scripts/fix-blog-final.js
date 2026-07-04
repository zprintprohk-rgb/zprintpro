const fs = require('fs');

// Restore and fix the blog page in one shot
let c = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/blog/[slug]/page.tsx', 'utf8');
console.log('Input size:', c.length);

// Strategy: 
// 1. Replace ALL content: `...` with content: '' (template literal fix)
// 2. Find any raw HTML after content: '' up to the next 'key': { pattern
// 3. Replace content: ''RAW_HTML'next-key': with content: '',\n    },\n  'next-key':

// Step 1: template literal replacement
let fixes1 = 0;
c = c.replace(/content: `[\s\S]*?`/g, (m) => { fixes1++; return "content: ''"; });
console.log('Template fixes:', fixes1);

// Step 2: Find and fix raw HTML after content: ''
// Pattern: content: '' followed by raw HTML until next blog entry key
let fixes2 = 0;
c = c.replace(/content: ''([\s\S]*?)(?='[a-z-]+':\s*\{)/g, (match, after) => {
  // Check if there's raw HTML between content: '' and the next entry
  if (match.length > 15 && (match.includes('<h') || match.includes('<p') || match.includes('<table'))) {
    fixes2++;
    // Keep only content: '' and the structural closing (},)
    // Figure out what indentation level we need
    const indentMatch = match.match(/\n(\s+)'[a-z-]+':/);
    const indent = indentMatch ? indentMatch[1].length : 4;
    const spaces = ' '.repeat(indent);
    return `content: '',\n${spaces}},`;
  }
  return match;
});
console.log('Raw HTML fixes:', fixes2);

console.log('Output size:', c.length);
fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/blog/[slug]/page.tsx', c, 'utf8');
