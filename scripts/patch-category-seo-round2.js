#!/usr/bin/env node
/**
 * Round 2: Add titles for japan-doujin + envelopes, add DHL to 4 descriptions,
 * expand keywords <12 for flyers/posters/menus/red-packets.
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'lib', 'seo.ts');
let content = fs.readFileSync(FILE, 'utf-8');
const before = content.length;

const PATCHES = [
  // ========== 5. japan-doujin: add titles ==========
  {
    name: 'japan-doujin titles',
    find: `'japan-doujin': {
    keywords: {`,
    replace: `'japan-doujin': {
    titles: {
      'zh-hk': '同人周邊印刷 10本起 · 同人誌/亞克力/缶バッヂ/明信片 Comiket 24h特急 | 智印雲',
      en: 'Doujinshi Printing 10 MOQ · Acrylic/Can Badge/Postcard Comiket 24h Rush | ZprintPro',
      ja: '同人誌印刷 10部〜 · アクリル/缶バッジ/ポストカード コミケ24時間特急 | ZprintPro',
    },
    keywords: {`,
  },

  // ========== 6. Add envelopes entry entirely (currently missing → fallback) ==========
  // Insert AFTER japan-doujin block (before 'menus')
  {
    name: 'envelopes insert',
    find: `      ja: '同人誌・推し活特化の印刷サービス。A5/B5 同人誌 10 部から対応、アクリルキーホルダー・スタンド・缶バッジ・ポストカード・エコトートバッグ。コミケ前 24 時間特急対応可能。深圳自社工場から DHL Express で 2-4 営業日でお届け。FSC 認証紙、ISO 12647 色彩管理、ISO 9001 取得。日本語サポート完備。',
    },
  },
  'menus': {`,
    replace: `      ja: '同人誌・推し活特化の印刷サービス。A5/B5 同人誌 10 部から対応、アクリルキーホルダー・スタンド・缶バッジ・ポストカード・エコトートバッグ。コミケ前 24 時間特急対応可能。深圳自社工場から DHL Express で 2-4 営業日でお届け。FSC 認証紙、ISO 12647 色彩管理、ISO 9001 取得。日本語サポート完備。',
    },
  },
  'envelopes': {
    titles: {
      'zh-hk': '信封印刷 100個起 · 牛皮/開窗/彩色/企業LOGO ISO認證 DHL 2-4天 | 智印雲',
      en: 'Envelope Printing 100 MOQ · Kraft/Window/Colored/Corporate Branding ISO | ZprintPro',
      ja: '封筒印刷 100個〜 · クラフト/窓付き/カラー/企業ロゴ ISO認証 DHL | ZprintPro',
    },
    keywords: {
      'zh-hk': '信封印刷,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封',
      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes',
      ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,企業封筒,ロゴ封筒,長3封筒,洋形封筒,エアメール封筒,印刷封筒,社名入り封筒',
    },
    descriptions: {
      'zh-hk': '信封印刷 100 個起印. 牛皮/開窗/彩色/中式/西式 + 企業 LOGO 定制. ISO 9001 認證紙材 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5 + corporate branding. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global.',
      ja: '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },
  'menus': {`,
  },

  // ========== 7. stickers description: add DHL ==========
  {
    name: 'stickers DHL',
    find: `'zh-hk': '貼紙印刷 50 張起印. 防水 / 透明 / 異形 / 標籤貼紙, FDA 食品接觸級 + SGS 認證. 香港 + 跨境電商 + 日本市場. 30 秒 AI 即時報價, ISO 9001 認證, 4 色柯式印刷.',
      en: 'Custom sticker printing 50 MOQ. Waterproof, transparent, die-cut, product label stickers. FDA food-contact + SGS certified. Free design + DHL 2-4 day global delivery.',
      ja: 'ステッカー印刷 50 枚から対応. 防水・透明・ダイカット・商品ラベル. FDA 食品接触基準 + SGS 認証. 無料デザイン + DHL 国際配送 2-4 日.',`,
    replace: `'zh-hk': '貼紙印刷 50 張起印. 防水 / 透明 / 異形 / 標籤貼紙, FDA 食品接觸級 + SGS 認證. 30 秒 AI 即時報價 + DHL 全球 2-4 天配送 + ISO 9001 認證 + 4 色柯式印刷.',
      en: 'Custom sticker printing 50 MOQ. Waterproof, transparent, die-cut, product label stickers. FDA food-contact + SGS certified. 30-second AI quote + DHL 2-4 day global + ISO 9001.',
      ja: 'ステッカー印刷 50 枚から対応. 防水・透明・ダイカット・商品ラベル. FDA 食品接触基準 + SGS 認証. 30 秒 AI 即時見積 + DHL 国際配送 2-4 日 + ISO 9001.',`,
  },

  // ========== 8. posters description: add DHL ==========
  {
    name: 'posters DHL',
    find: `'zh-hk': '海報印刷 1 張起打, A1/A2/A3 戶外防水 + 展覽背板 + 餐廳海報. 香港 + 全球, 30 秒 AI 即時報價, 4 色柯式, 7 天交付.',
      en: 'Custom poster printing 1 MOQ. A1/A2/A3 outdoor waterproof + exhibition backdrops + restaurant posters. Free design + global DHL 2-4 day shipping.',
      ja: 'ポスター印刷 1 枚から対応. A1/A2/A3 屋外防水 + 展示背景 + 飲食店ポスター. 無料デザイン + DHL 国際配送 2-4 日.',`,
    replace: `'zh-hk': '海報印刷 1 張起打. A1/A2/A3 戶外防水 + 展覽背板 + 餐廳海報. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送 + 4 色柯式 + 7 天交付.',
      en: 'Custom poster printing 1 MOQ. A1/A2/A3 outdoor waterproof + exhibition backdrops + restaurant posters. ISO 9001 + 30-second AI quote + DHL 2-4 day global + 4C offset + 7-day delivery.',
      ja: 'ポスター印刷 1 枚から対応. A1/A2/A3 屋外防水 + 展示背景 + 飲食店ポスター. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日 + 4 色印刷 + 7 日納期.',`,
  },

  // ========== 9. menus description: add DHL ==========
  {
    name: 'menus DHL',
    find: `'zh-hk': '餐牌印刷 100 本起印. 防水 PVC / 紙質菜單 / 精裝 / 一次性, 餐廳茶餐廳酒吧適用. 香港本地 + DHL 全球, ISO 9001 認證. 即日打樣, 30 秒 AI 即時報價.',
      en: 'Custom menu printing 100 MOQ. Waterproof PVC, paper, hardcover, disposable menus for restaurants, cafes, bars. Free design + rush production. 30-second AI instant quote.',
      ja: 'メニュー印刷 100 部から対応. 防水 PVC・紙・ハードカバー・使い捨て, レストラン・カフェ・バー向け. 無料デザイン + 短納期対応.',`,
    replace: `'zh-hk': '餐牌印刷 100 本起印. 防水 PVC / 紙質菜單 / 精裝 / 一次性, 餐廳茶餐廳酒吧適用. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom menu printing 100 MOQ. Waterproof PVC / paper / hardcover / disposable menus for restaurants, cafes, bars. ISO 9001 + 30-second AI quote + DHL 2-4 day global.',
      ja: 'メニュー印刷 100 部から対応. 防水 PVC・紙・ハードカバー・使い捨て, レストラン・カフェ・バー向け. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',`,
  },

  // ========== 10. red-packets description: add DHL ==========
  {
    name: 'red-packets DHL',
    find: `'zh-hk': '利是封印刷 100 個起印. 燙金 / 局部 UV / 婚慶 / 賀年 / 企業 LOGO 定制. 香港茶餐廳銀行客戶喜愛. 30 秒 AI 即時報價, 4 色印刷, 7 天交付.',
      en: 'Custom red packet printing 100 MOQ. Foil stamping, spot UV, wedding & corporate Chinese New Year red envelopes. Free design + DHL global shipping.',
      ja: 'ポチ袋印刷 100 個から対応. 箔押し・スポット UV・婚礼・お正月・企業 LOGO. 無料デザイン + DHL 国際配送.',`,
    replace: `'zh-hk': '利是封印刷 100 個起印. 燙金 / 局部 UV / 婚慶 / 賀年 / 企業 LOGO 定制. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送 + 4 色印刷.',
      en: 'Custom red packet printing 100 MOQ. Foil / spot UV / wedding / CNY / corporate branding. ISO 9001 + 30-second AI quote + DHL 2-4 day global + 4C offset.',
      ja: 'ポチ袋印刷 100 個から対応. 箔押し・スポット UV・婚礼・お正月・企業 LOGO. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日 + 4 色印刷.',`,
  },

  // ========== 11. flyers keywords: expand zh-hk + ja (currently 10 each) ==========
  {
    name: 'flyers kw expand',
    find: `'zh-hk': '宣傳單張印刷,傳單印刷,傳單派發,A4單張,A5單張,摺頁傳單,開業傳單,餐廳傳單,活動傳單,電商傳單',
      en: 'flyer printing,leaflet printing,custom flyers,A4 flyers,A5 flyers,folded flyers,grand opening flyers,restaurant flyers,event flyers,real estate flyers,door hanger printing,direct mail flyers',
      ja: 'チラシ印刷,フライヤー印刷,パンフレット印刷,A4チラシ,A5チラシ,折りパンフレット,開業チラシ,飲食店チラシ,イベントチラシ,不動産チラシ',`,
    replace: `'zh-hk': '宣傳單張印刷,傳單印刷,傳單派發,A4單張,A5單張,摺頁傳單,開業傳單,餐廳傳單,活動傳單,電商傳單,補習社單張,地產傳單,婚禮傳單,急印傳單',
      en: 'flyer printing,leaflet printing,custom flyers,A4 flyers,A5 flyers,folded flyers,grand opening flyers,restaurant flyers,event flyers,real estate flyers,door hanger printing,direct mail flyers,tutoring flyers,same-day flyers',
      ja: 'チラシ印刷,フライヤー印刷,パンフレット印刷,A4チラシ,A5チラシ,折りパンフレット,開業チラシ,飲食店チラシ,イベントチラシ,不動産チラシ,塾チラシ,即納チラシ,ダイレクトメール',
    `,
  },

  // ========== 12. posters keywords: expand zh-hk + ja (currently 11 each) ==========
  {
    name: 'posters kw expand',
    find: `'zh-hk': '海報印刷,A1海報,A2海報,A0海報,戶外海報,展覽海報,餐廳海報,Backdrop背景板,PP海報裱貼,防水海報',
      en: 'poster printing,custom posters,A1 poster,A2 poster,A0 poster,outdoor posters,exhibition posters,event backdrops,PP laminated posters,waterproof posters,foam board printing,same day poster printing',
      ja: 'ポスター印刷,A1ポスター,A2ポスター,A0ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,PPラミネートポスター,防水ポスター,即日ポスター印刷',`,
    replace: `'zh-hk': '海報印刷,A1海報,A2海報,A0海報,戶外海報,展覽海報,餐廳海報,Backdrop背景板,PP海報裱貼,防水海報,易拉寶海報,燈箱片,婚禮海報',
      en: 'poster printing,custom posters,A1 poster,A2 poster,A0 poster,outdoor posters,exhibition posters,event backdrops,PP laminated posters,waterproof posters,foam board printing,same day poster printing,wedding posters,menu board',
      ja: 'ポスター印刷,A1ポスター,A2ポスター,A0ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,PPラミネートポスター,防水ポスター,即日ポスター印刷,結婚式ポスター,メニューボード',`,
  },

  // ========== 13. menus keywords: expand all 3 locales (currently 10 each) ==========
  {
    name: 'menus kw expand',
    find: `'zh-hk': '餐牌印刷,菜單印刷,酒水牌,PVC餐牌,過膠餐牌,皮革餐牌,餐廳餐牌,茶餐廳餐牌,酒吧餐牌,外賣餐牌',
      en: 'menu printing,custom menus,restaurant menus,bar menus,PVC menus,laminated menus,leather menu covers,takeaway menus,food menus,drink menus',
      ja: 'メニュー印刷,レストランメニュー,メニューブック,PVCメニュー,ラミネートメニュー,レザーメニュー,居酒屋メニュー,カフェメニュー',`,
    replace: `'zh-hk': '餐牌印刷,菜單印刷,酒水牌,PVC餐牌,過膠餐牌,皮革餐牌,餐廳餐牌,茶餐廳餐牌,酒吧餐牌,外賣餐牌,甜品餐牌,咖啡店餐牌,酒店菜單',
      en: 'menu printing,custom menus,restaurant menus,bar menus,PVC menus,laminated menus,leather menu covers,takeaway menus,food menus,drink menus,dessert menu,cafe menu,hotel menu',
      ja: 'メニュー印刷,レストランメニュー,メニューブック,PVCメニュー,ラミネートメニュー,レザーメニュー,居酒屋メニュー,カフェメニュー,デザートメニュー,ホテルメニュー',`,
  },

  // ========== 14. red-packets keywords: expand all 3 locales ==========
  {
    name: 'red-packets kw expand',
    find: `'zh-hk': '利是封印刷,企業利是封,婚慶利是封,賀年利是封,定制利是封,燙金利是封,紅包印刷,新年利是封,結婚利是封,LOGO利是封',
      en: 'red packet printing,custom red envelopes,Chinese New Year red packets,wedding red packets,corporate red packets,foil red packets,hong bao printing,new year red envelopes',
      ja: 'ポチ袋印刷,オリジナルポチ袋,お年玉袋,結婚式ポチ袋,企業ポチ袋,箔押しポチ袋,紅包印刷,新年ポチ袋',`,
    replace: `'zh-hk': '利是封印刷,企業利是封,婚慶利是封,賀年利是封,定制利是封,燙金利是封,紅包印刷,新年利是封,結婚利是封,LOGO利是封,生肖利是封,銀行利是封,卡通利是封',
      en: 'red packet printing,custom red envelopes,Chinese New Year red packets,wedding red packets,corporate red packets,foil red packets,hong bao printing,new year red envelopes,zodiac red packet,bank red packet,cartoon red packet',
      ja: 'ポチ袋印刷,オリジナルポチ袋,お年玉袋,結婚式ポチ袋,企業ポチ袋,箔押しポチ袋,紅包印刷,新年ポチ袋,干支ポチ袋,銀行ポチ袋,キャラクターポチ袋',`,
  },
];

let success = 0;
let failed = [];
for (const p of PATCHES) {
  if (content.includes(p.find)) {
    content = content.replace(p.find, p.replace);
    success++;
    console.log(`[OK]  ${p.name}`);
  } else {
    failed.push(p.name);
    console.log(`[FAIL] ${p.name}: find string not found`);
  }
}

fs.writeFileSync(FILE, content, { encoding: 'utf-8', flag: 'w' });
const after = fs.readFileSync(FILE, 'utf-8').length;
console.log(`\nFile size: ${before} → ${after} bytes (diff: ${after - before})`);
console.log(`Patches applied: ${success}/${PATCHES.length}`);
if (failed.length) {
  console.log(`Failed: ${failed.join(', ')}`);
  process.exit(1);
}