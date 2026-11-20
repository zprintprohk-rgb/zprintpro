import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const eq = m.equivalentChars || m.default || m.equiv || m;
const C = {
  'paper-bags.en A': 'Paper Bags 100 MOQ $1.84 | Kraft & White Card | ZprintPro',
  'paper-bags.en B': 'Custom Paper Bags 100 MOQ $1.84 | Kraft/White | ZprintPro',
  'paper-bags.en C': 'Paper Bag Printing 100 MOQ $1.84 | Kraft & White | ZprintPro',
  'menus.en A': 'Menu Printing 10 MOQ $1.84 | PVC & Hardcover | ZprintPro',
  'menus.en B': 'Menu Printing 10 MOQ $1.84 | PVC Waterproof | ZprintPro',
  'menus.en C': 'Custom Menu Printing 10 MOQ $1.84 | PVC Hardcover | ZprintPro',
  'packaging.en A': 'Packaging Boxes 100 MOQ $0.51 | Food-Safe Paper | ZprintPro',
  'packaging.en B': 'Custom Packaging 100 MOQ $0.51 | Food-Safe Boxes | ZprintPro',
  'packaging.en C': 'Packaging Box Printing 100 MOQ $0.51 | Food-Safe | ZprintPro',
  'packaging.ja A': 'パッケージ印刷 100個〜 ¥69〜 | 食品紙箱/紙袋 | ZprintPro',
  'packaging.ja B': 'パッケージ印刷 100個〜 ¥69〜 | 食品用紙箱 | ZprintPro',
};
for (const [k, t] of Object.entries(C)) {
  const n = eq(t);
  console.log(String(n).padStart(3), n >= 50 && n <= 57 ? 'OK ' : 'ADJ', k, '|', t);
}
const D = {
  'menus.en v2': 'Menu printing from $1.84, 10 MOQ. Waterproof PVC, laminated & hardcover menus for restaurants, cafes, bars. Free proof in 4h, DHL 2-4 day USA delivery.',
  'paper-bags.en v2': 'Custom paper bags from $1.84, 100 MOQ. FSC-certified kraft, white card & gift bags. Free proof in 4h, free shipping $99+, DHL 2-4 day USA.',
};
for (const [k, t] of Object.entries(D)) console.log('desc', String(t.length).padStart(3), k);
