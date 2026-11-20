const fs = require('fs');
const F = '.hermes/title-quality-proposals-20260921-b131-213.json';
const j = JSON.parse(fs.readFileSync(F, 'utf8'));
const R = {
  'hardcover-books|zh-hk': '精裝書籍印刷 | 硬殼燙金 | 10本起印 HK$40起 | 智印港',
  'spot-uv-greeting-cards|en': 'Spot UV Greeting Cards | 10 MOQ $0.18 | Gift | ZprintPro',
  'spot-uv-greeting-cards|ja': '部分UVグリーティングカード｜マット｜10枚〜¥27〜｜ZprintPro',
  'matte-greeting-cards|en': 'Matte Greeting Cards | 10 MOQ $0.14 | SoftTouch |ZprintPro',
  'matte-greeting-cards|ja': 'マットグリーティングカード｜防指紋｜10枚〜 ¥21｜ZprintPro',
  'rounded-corner-greeting-cards|en': 'Rounded Corner Greeting Cards | 10 MOQ $0.13 | ZprintPro',
  'foil-wedding-invitations|en': 'Foil Wedding Invitations | 50 MOQ | Gold Silver | ZprintPro',
};
let n = 0;
for (const p of j.proposals) {
  const k = `${p.slug}|${p.locale}`;
  if (R[k] && p.title) { p.title = R[k]; n++; }
}
fs.writeFileSync(F, JSON.stringify(j, null, 2));
console.log('tuned', n);
