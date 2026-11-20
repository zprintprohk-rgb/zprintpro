import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const f = m.equivalentChars || m.default || m.equiv || m;
const ts = [
  'Folded Leaflet Printing | 10 MOQ $0.80 | ZprintPro',
  'Folded Leaflets | Tri-Fold 10 MOQ $0.80 | ZprintPro',
  'Folded Leaflets | Bi-Fold Z-Fold 10 MOQ $0.80 | ZprintPro',
  'リーフレット印刷 | 三つ折り 10枚から ¥110〜 | ZprintPro',
  'リーフレット印刷 | 10枚から ¥110〜 | ZprintPro',
  '折りたたみリーフレット | 10枚から ¥110〜 | ZprintPro',
];
for (const t of ts) console.log(f(t), '|', t);
