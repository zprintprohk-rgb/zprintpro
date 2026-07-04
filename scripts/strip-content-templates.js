const fs = require('fs');
let c = fs.readFileSync('F:/zprintpro-nextjs/src/app/[locale]/blog/[slug]/page.tsx', 'utf8');

// Replace ALL content: `<HTML>...</HTML>` with content: ''
// This is safe because all backtick template literals in blog metadata are content fields
let count = 0;
c = c.replace(/content: `[\s\S]*?`/g, (match) => {
  count++;
  return "content: ''";
});

// Also fix any content: `<p>... that might span multiple lines without closing
c = c.replace(/content: `<p>[\s\S]*?<\/p>\n/g, (match) => {
  count++;
  return "content: ''\n";
});

console.log('Replaced', count, 'template literals');
console.log('Size:', c.length);

// Check for remaining backticks (there will be some in JSX syntax — those are fine)
const remaining = (c.match(/`/g) || []).length;
console.log('Remaining backticks:', remaining);

// Verify: check for any raw HTML after content: ''
const contentLines = c.split('\n').filter(l => l.includes("content: ''"));
console.log('Content lines:', contentLines.length);

// Check each content: '' is followed by proper syntax (}, or ,)
let errors = 0;
c.split('\n').forEach((line, i) => {
  if (line.includes("content: ''") && !line.includes(',')) {
    // Check if next non-empty line starts with } or '
    const nextLines = c.split('\n').slice(i + 1, i + 5);
    const next = nextLines.find(l => l.trim());
    if (next && !next.trim().startsWith('}') && !next.trim().startsWith("'")) {
      console.log('WARNING line', i + 1, ': content missing delimiter, next is:', next.trim().substring(0, 50));
      errors++;
    }
  }
});

console.log('Syntax errors:', errors);

fs.writeFileSync('F:/zprintpro-nextjs/src/app/[locale]/blog/[slug]/page.tsx', c, 'utf8');
