// Quick syntax check for next.config.js
const fs = require('fs');
const path = 'next.config.js';
const content = fs.readFileSync(path, 'utf-8');

// Try to require it as a module (Next.js loads it)
// But it has trailingSlash, i18n, etc. - mock those
try {
  // Just parse with Function constructor to check syntax
  // Strip the module.exports pattern
  const wrapped = 'const module = { exports: {} };\n' + content;
  new Function(wrapped);
  console.log('next.config.js syntax OK');
  // Count rules
  const matches = content.match(/rules\.push/g) || [];
  console.log('rules.push calls:', matches.length);
  // Count W6 others block
  const w6Match = content.match(/W6.*?others/g);
  console.log('W6 others block present:', !!w6Match);
  if (w6Match) {
    const w6Start = content.indexOf('2026-09-06 W6 v34');
    const w6End = content.indexOf('// /product/', w6Start);
    console.log('W6 block size:', w6End - w6Start, 'chars');
  }
} catch (e) {
  console.log('Syntax error:', e.message);
}
