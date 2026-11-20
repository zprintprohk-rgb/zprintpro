const fs = require('fs');
const p = 'scripts/generate-sitemap.js';
let t = fs.readFileSync(p, 'utf8');
if (t.includes("'comiket-c109/'")) {
  console.log('already registered');
  process.exit(0);
}
const anchor = "'nengajo-2027/',";
if (!t.includes(anchor)) { console.log('ANCHOR MISSING'); process.exit(1); }
t = t.replace(anchor, anchor + "'comiket-c109/',");
fs.writeFileSync(p, t, 'utf8');
console.log('added comiket-c109 to staticPages');
