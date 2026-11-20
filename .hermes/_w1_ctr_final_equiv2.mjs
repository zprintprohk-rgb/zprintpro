import { createRequire } from 'module';
import { readFileSync } from 'fs';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const eq = m.equivalentChars || m.default || m.equiv || m;
const s = readFileSync('src/lib/seo.ts', 'utf8');
for (const cat of ['paper-bags', 'menus', 'packaging']) {
  const i = s.indexOf(`'${cat}': {`);
  const seg = s.slice(i, i + 6000);
  const ti = seg.indexOf('titles:');
  const di = seg.indexOf('descriptions:');
  for (const [loc, key] of [['zh-hk', `'zh-hk': '`], ['en', `en: '`], ['ja', `ja: '`]]) {
    const zone = seg.slice(ti, di);
    const ki = zone.indexOf(key);
    if (ki >= 0) {
      const rest = zone.slice(ki + key.length);
      const mt = rest.slice(0, rest.indexOf("'"));
      const n = eq(mt);
      console.log(String(n).padStart(3), n >= 50 && n <= 57 ? 'BAND-OK' : 'OUT', `${cat}.${loc}`, '|', mt.slice(0, 56));
    }
  }
}
