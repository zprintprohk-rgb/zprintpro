const { equiv, band } = require('../scripts/guards/title-equiv.js');
const cands = {
  'spot-uv-greeting-cards|ja': [
    '部分UVグリーティングカード｜マット｜10枚〜¥27〜｜ZprintPro',
    '部分UVグリーティングカード｜マット光沢｜10枚〜¥27〜｜ZprintPro',
    '部分UVグリーティングカード｜光沢UV｜10枚〜¥27〜｜ZprintPro',
    '部分UVグリーティングカード｜マット｜10枚〜 ¥27〜｜ZprintPro',
    '部分UVグリーティングカード｜10枚〜¥27〜｜ZprintPro',
  ],
  'matte-greeting-cards|en': [
    'Matte Greeting Cards | 10 MOQ $0.14 | SoftTouch | ZprintPro',
    'Matte Greeting Cards | 10 MOQ $0.14 | Soft Touch | ZprintPro',
    'Matte Greeting Cards | 10 MOQ $0.14 | Fingerprint-Free | ZprintPro',
    'Matte Greeting Cards | 10 MOQ $0.14 | Soft-Touch | ZprintPro',
  ],
  'foil-wedding-invitations|en': [
    'Foil Wedding Invitations | 50 MOQ | Gold Silver | ZprintPro',
    'Foil Wedding Invites | 50 MOQ | Gold & Silver | ZprintPro',
    'Foil Wedding Invitations | 50 MOQ | Foil Print | ZprintPro',
    'Foil Wedding Invitations | 50 MOQ | Gold/Silver | ZprintPro',
  ],
};
for (const [k, vs] of Object.entries(cands)) {
  console.log('==', k);
  for (const v of vs) console.log(`  ${equiv(v)} ${band(v)}  ${v}`);
}
