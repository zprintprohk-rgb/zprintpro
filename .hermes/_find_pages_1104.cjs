// Locate owning pages for 卒アル販売 (ja) & saddle stitch booklet printing (en)
const fs = require('fs');
const path = require('path');
const hits = { sotsu: [], saddle: [] };
function walk(d, depth) {
  if (depth > 3) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (/node_modules|\.git|images/.test(e.name)) continue;
      walk(p, depth + 1);
    } else if (/\.(ts|tsx|json)$/.test(e.name)) {
      const s = fs.readFileSync(p, 'utf8');
      if (/卒業アルバム|卒アル/.test(s) && hits.sotsu.length < 8) {
        const slug = s.match(/slug['"]?\s*[:=]\s*['"]([a-z0-9-]+)['"]/);
        hits.sotsu.push(p.replace(/\\/g, '/') + ' :: ' + (slug ? slug[1] : '?'));
      }
      if (/saddle[\s-]?stitch/i.test(s) && hits.saddle.length < 8) {
        const slug = s.match(/slug['"]?\s*[:=]\s*['"]([a-z0-9-]+)['"]/);
        hits.saddle.push(p.replace(/\\/g, '/') + ' :: ' + (slug ? slug[1] : '?'));
      }
    }
  }
}
walk('src/data', 0);
console.log('== 卒アル ==\n  ' + (hits.sotsu.join('\n  ') || '0'));
console.log('== saddle ==\n  ' + (hits.saddle.join('\n  ') || '0'));
