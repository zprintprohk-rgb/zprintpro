const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const ts = [
  ['pp-price N3', 'A1 A2 海報印刷價格 HK$9起：單價・紙材・批量折扣 | 智印港'],
  ['pp-price N4', 'A1 A2 海報印刷價格 HK$9起：單價・紙材・工藝・折扣 | 智印港'],
  ['pp-price N5', 'A1 A2 海報印刷價格 HK$9起 單價紙材批量折扣 | 智印港'],
  ['pp-price N6', '海報印刷價格 HK$9起：A1 A2 單價・紙材・批量折扣 | 智印港'],
];
for (const [n, t] of ts) console.log(n, equiv(t), band(equiv(t)), '::', t);
