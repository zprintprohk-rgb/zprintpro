// 进攻面 title 拟改当量
const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const ts = [
  ['pp-guide 现', '香港海報印刷完全指南：尺寸、紙質、工藝與設計要點 | 智印港'],
  ['pp-guide N1', '香港海報印刷 HK$9起 完全指南：尺寸・紙質・工藝・設計要點 | 智印港'],
  ['pp-guide N2', '香港海報印刷 HK$9起：尺寸・紙質・工藝・設計要點 | 智印港'],
  ['pp-guide N3', '香港海報印刷完全指南 HK$9起 尺寸紙質工藝設計 | 智印港'],
  ['pp-price 现', 'A1 A2 海報印刷價格指南：單價・紙材・工藝・批量折扣全拆解 | 智印港'],
  ['pp-price N1', 'A1 A2 海報印刷價格指南：HK$9起 單價・紙材・批量折扣全拆解 | 智印港'],
  ['pp-price N2', 'A1 A2 海報印刷價格 HK$9起：單價・紙材・工藝・批量折扣 | 智印港'],
];
for (const [n, t] of ts) {
  console.log(n, equiv(t), band(equiv(t)), '::', t);
}
