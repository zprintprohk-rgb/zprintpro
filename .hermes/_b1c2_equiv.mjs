import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const f = m.equivalentChars || m.default || m.equiv || m;
import fs from 'fs';
const pt = fs.readFileSync('src/data/products.ts', 'utf8');
for (const slug of ['foil-red-packets', 'custom-red-packets']) {
  const i = pt.indexOf(`slug: '${slug}'`);
  const seg = pt.slice(i, i + 4000);
  const g = k => { const mm = seg.match(new RegExp(k + ": '([^']+)'")); return mm && mm[1]; };
  console.log(slug, '| base:', g('basePrice'), '| en:', g('basePrice_en'), '| ja:', g('basePrice_ja'), '| range:', g('price_range'));
}
const ts = [
  'Corporate Red Packets | Logo 100 MOQ $0.74 | ZprintPro',
  'Corporate Red Packets | Logo 100 MOQ from $0.74 | ZprintPro',
  'Foil Stamp Red Packets | 12 Colors 100 MOQ $0.46 | ZprintPro',
  'Foil Stamp Red Packets | 12 Colors from $0.46 | ZprintPro',
];
for (const t of ts) console.log(f(t), '|', t);
