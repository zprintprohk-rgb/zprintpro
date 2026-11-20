// 量 W1 CTR 批目标类目 title 当量 + 校验 #27 是否覆盖类目槽
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const m = require('../scripts/guards/title-equiv.js');
const eq = m.equivalentChars || m.default || m.equiv || m;
const titles = {
  'paper-bags.zh': '牛皮紙袋訂製 100個起 + 牛皮/白卡 + 急單 18:00 截單 | HK$8起・免費設計 | 智印港',
  'paper-bags.en': 'Paper Bag Printing 100 MOQ + Kraft/White Card/Pearl + Rush 6PM Cut-off | from $1.84 + Free Design + Made for USA | ZprintPro',
  'paper-bags.ja': '紙袋印刷 100個〜 + クラフト/白カード/パール + 短納期 18:00 締切 | ¥240〜・無料デザイン・日本全国 | ZprintPro',
  'menus.zh': '餐牌印刷 10張起 過膠/PVC防水 膠片餐牌/酒水牌 快至3日 | 智印港',
  'menus.en': 'Menu Printing from $0.14 | Free Shipping $99+ | ZprintPro',
  'menus.ja': 'メニュー印刷｜¥20〜・小ロット・最短即日・無料デザイン｜ZprintPro',
  'packaging.zh': '包裝盒訂製 100個起・食品紙盒/紙袋/防油卡 3D打稿 | 智印港',
  'packaging.en': 'Custom Packaging Boxes from $0.85 | Food-Safe Paper Box/Bag Printing, Made for USA | ZprintPro',
  'packaging.ja': (function(){ try { const fs=require('fs'); const s=fs.readFileSync('src/lib/seo.ts','utf8'); const i=s.indexOf("'packaging': {"); const seg=s.slice(i,i+2500); const mm=seg.match(/ja: '([^']+)'/); return mm?mm[1]:'?'; } catch(e){ return '?'; } })(),
};
for (const [k, t] of Object.entries(titles)) {
  console.log(String(eq(t)).padStart(3), k, '|', t.slice(0, 60));
}
