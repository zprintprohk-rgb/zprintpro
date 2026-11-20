const { equiv, band } = require('../scripts/guards/title-equiv.js');
const vs = [
  ['spot-uv-ja', '部分UVグリーティングカード｜光沢加工｜10枚〜¥27〜｜ZprintPro'],
  ['spot-uv-ja', '部分UVグリーティングカード｜光沢｜10枚〜¥27〜｜ZprintPro'],
  ['matte-en', 'Matte Greeting Cards | 10 MOQ $0.14 | New Year | ZprintPro'],
  ['matte-en', 'Matte Greeting Cards | 10 MOQ $0.14 | Thank-You | ZprintPro'],
];
for (const [k, v] of vs) console.log(`${equiv(v)} ${band(v)}  ${k}  ${v}`);
