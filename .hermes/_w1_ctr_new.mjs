import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const eq = m.equivalentChars || m.default || m.equiv || m;
const C = {
  'paper-bags.zh': '紙袋印刷 100個起 HK$3-8/個 | 牛皮白卡環保袋 | 智印港',
  'paper-bags.en': 'Paper Bag Printing 100 MOQ $1.84 | Kraft/White Card | ZprintPro',
  'paper-bags.ja': '紙袋印刷 100個〜 ¥240〜 | クラフト/白カード | ZprintPro',
  'menus.zh': '餐牌印刷 10張起 HK$5起 | 過膠PVC防水 精裝餐牌 | 智印港',
  'menus.en': 'Menu Printing 10 MOQ $1.84 | PVC Waterproof Hardcover | ZprintPro',
  'menus.ja': 'メニュー印刷 10枚〜 ¥258〜 | PVC/ラミネート | ZprintPro',
  'packaging.en': 'Custom Packaging Boxes 100 MOQ $0.51 | Food-Safe | ZprintPro',
  'packaging.ja': 'パッケージ印刷 100個〜 ¥69〜 | 食品用紙箱/紙袋 | ZprintPro',
};
for (const [k, t] of Object.entries(C)) {
  const n = eq(t);
  console.log(String(n).padStart(3), n >= 50 && n <= 57 ? 'OK ' : 'ADJ', k, '|', t);
}
// desc 长度
const D = {
  'menus.zh': '餐牌印刷 10 張起，過膠餐牌 HK$5 起/張、PVC 防水 HK$8 起、精裝 HK$28 起/本。防水 PVC / 膠片 / 精裝 / 過膠 4 種材質，茶餐廳 / 咖啡店 / 酒吧適用。免費設計打稿 4 小時，標準 3-5 天交貨，趕單 WhatsApp 加急，ISO 9001 + FSC 認證。',
  'menus.en': 'Menu printing from $1.84, 10 MOQ. Waterproof PVC, laminated & hardcover menus for restaurants, cafes and bars. Free design proof in 4h, DHL 2-4 day USA delivery. 30-second AI quote.',
  'menus.ja': 'メニュー印刷 10 部から、¥258〜。防水 PVC・ラミネート・ハードカバー、レストラン・カフェ・バー向け。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり。',
  'paper-bags.zh': '紙袋印刷 / 印刷紙袋 / 訂做紙袋 HK$3-8/個，100 個起印。FSC 認証牛皮紙袋 + 白卡紙袋 + 精品禮品袋，免費設計打稿即日打樣。美妝護膚、餐廳外賣、服飾、婚慶、烘焙、珠寶品牌適用，港九新界滿 HK$500 免費順豐速遞，DHL 全球 2-4 天。WhatsApp 30 秒即時報價，ISO 9001。',
  'paper-bags.en': 'Custom paper bags from $1.84, 100 MOQ. FSC-certified kraft, white card & gift bags with free design. Free proof in 4h, free shipping $99+, DHL 2-4 day USA delivery.',
  'packaging.en': 'Custom packaging boxes from $0.51, 100 MOQ — food-safe paper boxes, bags & greaseproof cards (FDA + FSC). Free 3D proof in 6h, DHL 2-4 day global delivery.',
  'packaging.ja': 'パッケージ印刷 100 個から、¥69〜。食品用紙箱・紙袋・耐油紙カード（FDA 適合 + FSC 認証紙、ビニール袋は非対応）。無料 3D 校正 6 時間、日本全国 DHL 2-4 日配送、沖縄・北海道対応。',
  'packaging.zh': '食品包裝印刷 / 包裝盒訂製 100 個起印，HK$1.5 起/個。食品紙盒 / 食品紙袋 / 防油紙卡（FDA 食品級 + FSC 認証紙，唔做膠袋）；亦做化妝品 / 茶葉 / 電子產品包裝。免費 3D 打稿 6 小時，DHL 全球 2-4 天，滿 HK$500 順豐免運。WhatsApp 30 秒報價，ISO 9001。',
};
for (const [k, t] of Object.entries(D)) console.log('desc', String(t.length).padStart(3), k);
