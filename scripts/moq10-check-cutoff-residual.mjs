// moq10-check-cutoff-residual.mjs — 檢查 3pm 截單殘留 (排除 FedEx 美國時效)
import fs from 'fs';
import path from 'path';

let n = 0;
const found = [];
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx|json)$/.test(f.name) && !/\.bak/.test(f.name)) {
      const s = fs.readFileSync(p, 'utf-8');
      s.split('\n').forEach((l, i) => {
        if (!/下午\s*3\s*時|3\s*時前落單/.test(l)) return;
        if (/FedEx|美國國內/.test(l)) return;          // 美國快遞時效, 豁免
        if (/^\s*(\/\/|\*)/.test(l)) return;           // 註釋行, 豁免
        found.push(`${p}:${i + 1}: ${l.trim().slice(0, 120)}`);
        n++;
      });
    }
  }
}
walk('src');
console.log(`非豁免殘留: ${n}`);
found.forEach((f) => console.log('  ' + f));
