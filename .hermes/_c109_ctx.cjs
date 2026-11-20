const fs = require('fs');
const t = fs.readFileSync('src/app/[locale]/comiket-c109/page.tsx', 'utf8');
const lines = t.split('\n');
lines.forEach((l, i) => {
  if (/份|GSC|\bimps\b|\bpos\s?\d|C107/i.test(l)) {
    console.log(`L${i + 1}: ${l.trim().slice(0, 160)}`);
  }
});
