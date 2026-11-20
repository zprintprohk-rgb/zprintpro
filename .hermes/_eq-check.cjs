const { equiv, band } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');
const cands = [
  ['saddle-stitch-booklets|zh-hk|new', '騎馬釘書刊 小冊子印刷 覆膜 10本起印 HK$6起 | 智印港'],
  ['saddle-stitch-booklets|zh-hk|old', '騎馬釘小冊子印刷 | 覆膜 騎馬釘 | 10本起印 HK$6起 | 智印港'],
  ['food-boxes|zh-hk|new', '食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 | 智印港'],
  ['food-boxes|zh-hk|old', '食品包裝盒印刷 | 100個起 HK$2.5起 | 防油紙卡 | 智印港'],
  ['double-sided-flyers|ja|new', '両面チラシ印刷 フルカラー 安い 10枚〜 ¥85〜 | ZprintPro'],
  ['double-sided-flyers|ja|old', '両面チラシ印刷 | フルカラー 10枚〜 | ¥85〜 | ZprintPro'],
  ['food-boxes|ja|new', '食品包装箱印刷 小ロット 防油 100個〜 ¥101〜 | ZprintPro'],
  ['food-boxes|ja|old', '食品包装箱 印刷 | 100個〜 小ロット | ¥101〜 | ZprintPro'],
];
for (const [k, t] of cands) console.log(k, '=>', equiv(t), band(t), '|', t);
