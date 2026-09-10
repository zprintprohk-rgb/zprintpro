/* 标题 v4 提案 v2: 45 条校准至写满区 50-54 */
const proposals = [
  // ---- packaging 3 ----
  { slug: 'corrugated-boxes', zh: '瓦楞紙盒印刷訂製 坑盒E/F坑 500個起 跨境抗壓 | 智印港' },
  { slug: 'corrugated-boxes', en: 'Corrugated Boxes E/F Flute 500pcs Custom | ZprintPro' },
  { slug: 'corrugated-boxes', ja: '段ボール箱印刷 E/Fフルート 500個〜 耐圧 | ZprintPro' },
  { slug: 'white-card-boxes', zh: '白卡彩盒印刷訂製 化妝品盒 500個起 免費送貨 | 智印港' },
  { slug: 'white-card-boxes', en: 'White Cardboard Boxes 500pcs Gift Boxes | ZprintPro' },
  { slug: 'white-card-boxes', ja: '白カードボックス印刷 500個〜 特注・化粧品 | ZprintPro' },
  { slug: 'tuck-end-boxes', zh: '插口盒印刷訂製 直插/飛機插 500個起 輕量彩盒 | 智印港' },
  { slug: 'tuck-end-boxes', en: 'Tuck End Boxes Straight/Airplane 500pcs | ZprintPro' },
  { slug: 'tuck-end-boxes', ja: '差し込み式ボックス印刷 直挿し 500個〜 軽量 | ZprintPro' },
  // ---- wedding 6 ----
  { slug: 'foil-wedding-invitations', zh: '燙金喜帖印刷 金銀玫瑰金 50套起印 即日報價 | 智印港' },
  { slug: 'foil-wedding-invitations', en: 'Foil Wedding Invites 50 Sets Foil Print | ZprintPro' },
  { slug: 'foil-wedding-invitations', ja: '箔押し結婚式招待状 金銀 50セット〜 特急 | ZprintPro' },
  { slug: 'save-the-date-cards', zh: '結婚通知卡印刷 A6 50套起 NT$18起 燙金UV 設計 | 智印港' },
  { slug: 'save-the-date-cards', en: 'Save the Date Cards 50 Sets Custom Wedding | ZprintPro' },
  { slug: 'save-the-date-cards', ja: 'Save the Date カード印刷 50セット〜 箔押し | ZprintPro' },
  { slug: 'wedding-thank-you-cards', zh: '婚禮感謝卡印刷 燙金UV 50套起印 A6 即日報價 | 智印港' },
  { slug: 'wedding-thank-you-cards', en: 'Wedding Thank You Cards 50 Sets Foil Print | ZprintPro' },
  { slug: 'wedding-thank-you-cards', ja: '結婚式サンキュカード 50セット〜 箔押しUV | ZprintPro' },
  { slug: 'wedding-program-cards', zh: '婚禮節目單印刷 A5對摺 50套起印 燙金UV 雙面 | 智印港' },
  { slug: 'wedding-program-cards', en: 'Wedding Program Cards A5 50 Sets Custom | ZprintPro' },
  { slug: 'wedding-program-cards', ja: '結婚式プログラム印刷 A5 50セット〜 箔押し | ZprintPro' },
  { slug: 'wedding-menu-cards', zh: '婚禮菜單卡印刷 燙金UV 50套起印 A5 即日報價 | 智印港' },
  { slug: 'wedding-menu-cards', en: 'Wedding Menu Cards A5 50 Sets Foil Print | ZprintPro' },
  { slug: 'wedding-menu-cards', ja: 'ウェディングメニュー印刷 50セット〜 箔押し | ZprintPro' },
  { slug: 'wedding-suite-bundle', zh: '婚慶套裝印刷 請帖+回禮卡 50套起印 6件齊全 | 智印港' },
  { slug: 'wedding-suite-bundle', en: 'Wedding Suite Bundle 6 Pcs 50 Sets Custom | ZprintPro' },
  { slug: 'wedding-suite-bundle', ja: '結婚式6枚セット印刷 50セット〜 箔押し特急 | ZprintPro' },
  // ---- place-cards 6 ----
  { slug: 'wedding-place-cards', zh: '婚宴枱卡印刷 燙金壓紋 50張起 NT$8起 站立式 | 智印港' },
  { slug: 'wedding-place-cards', en: 'Wedding Place Cards 50 Sets Foil Stand-Up | ZprintPro' },
  { slug: 'wedding-place-cards', ja: 'ウエディング席札印刷 50枚〜 箔押し・特急 | ZprintPro' },
  { slug: 'drink-tokens', zh: '酒水牌印刷 PVC防水 50張起 NT$6起 圓角模切 | 智印港' },
  { slug: 'drink-tokens', en: 'Drink Tokens PVC Waterproof 50pcs Custom | ZprintPro' },
  { slug: 'drink-tokens', ja: 'ドリンクトークン PVC防水 50枚〜 オリジナル | ZprintPro' },
  { slug: 'escort-cards', zh: '座位卡印刷 燙金UV 50張起 站立式 婚宴宴會 即日 | 智印港' },
  { slug: 'escort-cards', en: 'Escort Cards 50 Sets Gold Foil Stand-Up | ZprintPro' },
  { slug: 'escort-cards', ja: 'エスコートカード印刷 50枚〜 箔押し・特急 | ZprintPro' },
  { slug: 'name-tags-badges', zh: '會議名牌印刷 活動襟章 50張起 NT$10起 燙金 | 智印港' },
  { slug: 'name-tags-badges', en: 'Name Tags 50pcs Custom Conference Badges | ZprintPro' },
  { slug: 'name-tags-badges', ja: '名札印刷 会議用 50枚〜 箔押し・磁石・特急 | ZprintPro' },
  { slug: 'cafe-table-cards', zh: '餐廳枱卡印刷 PVC防水 50張起 NT$10起 站立式 | 智印港' },
  { slug: 'cafe-table-cards', en: 'Cafe Table Cards 50pcs Waterproof Stand-Up | ZprintPro' },
  { slug: 'cafe-table-cards', ja: 'カフェテーブルカード印刷 防水 50枚〜 特急 | ZprintPro' },
  { slug: 'wedding-seating-charts', zh: '婚宴席位圖印刷 A1/A2 50張起 燙金UV 即日報價 | 智印港' },
  { slug: 'wedding-seating-charts', en: 'Wedding Seating Charts A1/A2 50 Sets Foil | ZprintPro' },
  { slug: 'wedding-seating-charts', ja: '披露宴座席表印刷 A1/A2 50枚〜 箔押し・特急 | ZprintPro' },
];

const hw = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const cjk = (s) => (s.match(/[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff]/g) || []).length;
const band = (n) => (n < 50 ? '不足<50' : n <= 54 ? '✅写满50-54' : n <= 60 ? '⚠️遗留55-60' : '🔴超限>60');
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');

let ok = 0, bad = 0;
for (const p of proposals) {
  const loc = p.zh ? 'zh-hk' : p.en ? 'en' : 'ja';
  const t = p.zh || p.en || p.ja;
  const n = hw(t);
  const simp = SIMP.filter((c) => t.includes(c));
  const brandOk = (loc === 'zh-hk' ? t.endsWith('智印港') && !t.includes('ZprintPro') : t.endsWith('ZprintPro'));
  const c = loc === 'en' ? t.length : cjk(t);
  const mark = (n >= 50 && n <= 54) && brandOk && simp.length === 0 ? '✓' : '✗';
  if (mark === '✓') ok++; else bad++;
  console.log(`${mark} ${p.slug} ${loc}[${c}${loc === 'en' ? 'ch' : '全角'}] 当量=${n} ${band(n)} ${brandOk ? '' : '品牌✗'} ${simp.length ? '简体✗' : ''} | ${t}`);
}
console.log(`\n通过 ${ok} / 未过 ${bad}`);
