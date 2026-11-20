/* 6 贺卡 SKU 深入优化 v4: 18 标题 (v4 50-54) + 18 meta description (150-160) */
const data = {
  'premium-greeting-cards': {
    zh_t: '高級賀卡印刷 燙金・局部UV 100張起 HK$100起 | 智印港',
    en_t: 'Premium Greeting Cards 100pcs Foil & UV | ZprintPro',
    ja_t: 'プレミアムカード印刷 100枚〜 箔押し・UV | ZprintPro',
    zh_d: '高級賀卡印刷：300g 銅版紙或啞粉藝術紙，啞膠／光膠覆膜、局部UV、燙金、圓角模切多種工藝任選，自訂尺寸與刀模均可。127×178mm 標準，100 張起印 HK$100 起。適用聖誕卡、新年卡、婚禮感謝卡及企業賀卡，可印 LOGO 與品牌配色，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Premium greeting cards: foil, spot UV & matte lamination, 300gsm. 127×178mm, from 100 pcs HK$100. Xmas, New Year, wedding & corporate. Free proof, quick quote.',
    ja_d: '高級グリーティングカード印刷：300gコート紙、マット／グロスラミネート、箔押し、部分UV、角丸加工に対応し、サイズ・型抜きもオーダー可能。127×178mm標準、100枚〜HK$100〜。クリスマスカード・年賀状・結婚式サンキューカード・法人カードに最適。無料デザイン校正、即日見積もり、納期にも柔軟に対応。',
  },
  'thick-greeting-cards-400g': {
    zh_t: '400g 超厚賀卡印刷 厚卡質感 100張起 HK$120起 | 智印港',
    en_t: 'Thick 400g Greeting Cards 100pcs Emboss | ZprintPro',
    ja_t: '厚口400gカード印刷 100枚〜 箔押し・特急 | ZprintPro',
    zh_d: '400g 超厚賀卡印刷：超厚實手感、挺度十足，配燙金、壓紋、啞膠／光膠覆膜工藝，高級質感盡現，另可選壓紋、燙金升級工藝。127×178mm 標準，100 張起印 HK$120 起。適用聖誕卡、新年卡、企業賀卡及紀念卡，可印 LOGO 與品牌配色，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Thick 400g greeting cards: foil, emboss & matte lamination, heavy stock. 127×178mm, from 100 pcs HK$120. Xmas, New Year & corporate. Free proof, quick quote.',
    ja_d: '厚口400gグリーティングカード印刷：重厚なプレミアム用紙、箔押し、エンボス、ラミネート加工に対応し、サイズ・型抜きもオーダー可能。127×178mm標準、100枚〜HK$120〜。クリスマス・年賀・法人記念カードに最適、特急対応可能。無料デザイン校正、即日見積もり、大量注文は割引対応、納期相談可。',
  },
  'foil-greeting-cards': {
    zh_t: '燙金賀卡印刷 金・銀・玫瑰金 100張起 HK$180起 | 智印港',
    en_t: 'Foil Greeting Cards 100pcs Gold & Silver | ZprintPro',
    ja_t: '箔押しグリーティングカード 100枚〜 金銀箔 | ZprintPro',
    zh_d: '燙金賀卡印刷：金、銀、玫瑰金三色箔燙印，金屬光澤立體質感，持久不退色。300g 銅版紙或棉質紙，127×178mm 標準，100 張起印 HK$180 起。適用婚禮卡、聖誕卡、企業賀卡及高級感謝卡，可印 LOGO 與品牌配色，亦可選燙銀或圓角模切，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Foil greeting cards: gold, silver & rose gold, 300gsm. 127×178mm, from 100 pcs HK$180. Wedding, Christmas & luxury corporate. Free proof, quick quote.',
    ja_d: '箔押しグリーティングカード印刷：ゴールド・シルバー・ローズゴールドの箔押し、300gコート紙またはコットン紙。127×178mm標準、100枚〜HK$180〜。結婚式・クリスマス・法人高級カードに最適、サイズ・型抜きもオーダー可能です。無料デザイン校正、即日見積もり、特急対応可能、大量注文は割引対応。',
  },
  'spot-uv-greeting-cards': {
    zh_t: '局部UV賀卡印刷 啞面・高光 100張起 HK$140起 | 智印港',
    en_t: 'Spot UV Greeting Cards 100pcs Matte+Gloss | ZprintPro',
    ja_t: '部分UVグリーティングカード 100枚〜 マット | ZprintPro',
    zh_d: '局部UV賀卡印刷：啞面底紙配高光 UV 圖案，強烈層次與立體對比，觸感細緻。300g 銅版紙或合成紙，127×178mm 標準，100 張起印 HK$140 起。適用生日卡、聖誕卡、產品宣傳卡及品牌賀卡，可印 LOGO 與品牌配色，亦可選燙金升級，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Spot UV greeting cards: glossy highlights on matte base, 300gsm. 127×178mm, from 100 pcs HK$140. Birthday, Christmas & brand. Free proof, quick quote.',
    ja_d: '部分UVグリーティングカード印刷：マット下地に光沢UVのコントラスト、300gコート紙または合成紙。127×178mm標準、100枚〜HK$140〜。誕生日・クリスマス・ブランドカードに最適、サイズ・型抜きもオーダー可能。無料デザイン校正、即日見積もり、特急対応可能、大量注文は割引対応、納期相談可。',
  },
  'matte-greeting-cards': {
    zh_t: '啞膜賀卡印刷 防指紋・柔順 100張起 HK$110起 | 智印港',
    en_t: 'Matte Greeting Cards 100pcs Soft-Touch | ZprintPro',
    ja_t: 'マットカード印刷 100枚〜 指紋防止・特急 | ZprintPro',
    zh_d: '啞膜賀卡印刷：柔順啞面、防指紋、低調高級質感，長久保存不易顯舊。300g 啞粉紙或環保紙，127×178mm 標準，100 張起印 HK$110 起。適用聖誕卡、新年卡、感謝卡及企業賀卡，可印 LOGO 與品牌配色，亦可選光膠或燙金升級，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Matte greeting cards: soft-touch, fingerprint-resistant, 300gsm art or eco. 127×178mm, from 100 pcs HK$110. Xmas, New Year & thank-you. Free proof, quick quote.',
    ja_d: 'マットグリーティングカード印刷：なめらかなマット加工、指紋防止仕上げ、300gマット紙またはエコ紙。127×178mm標準、100枚〜HK$110〜。クリスマス・年賀・感謝・誕生日カードに最適、サイズ・型抜きもオーダー可能です。無料デザイン校正、即日見積もり、特急対応も可能、大量注文は割引対応です。',
  },
  'rounded-corner-greeting-cards': {
    zh_t: '圓角賀卡印刷 R3mm模切 100張起 HK$100起 即日 | 智印港',
    en_t: 'Rounded Greeting Cards 100pcs R3mm Die-Cut | ZprintPro',
    ja_t: '角丸グリーティングカード印刷 100枚〜 R3mm | ZprintPro',
    zh_d: '圓角賀卡印刷：R3mm 圓角模切，柔和觸感不翹角，輕巧可愛。300g 銅版紙或藝術紙，127×178mm 標準，100 張起印 HK$100 起。適用生日卡、聖誕卡、感謝卡及品牌宣傳卡，可印 LOGO 與品牌配色，亦可選燙金或 UV 升級，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
    en_d: 'Rounded-corner greeting cards: soft R3mm die-cut, 300gsm. 127×178mm, from 100 pcs HK$100. Birthday, Christmas & thank-you cards. Free proof, quick quote.',
    ja_d: '角丸グリーティングカード印刷：R3mmのやさしい丸角型抜き、300gコート紙またはアート紙。127×178mm標準、100枚〜HK$100〜。誕生日・クリスマス・感謝・記念カードに最適、サイズ・型抜きもオーダー可能です、オリジナルデザイン対応。無料デザイン校正、即日見積もり、特急対応可能、大量注文は割引対応。',
  },
};

const hw = (s) => [...s].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');

let tOk = 0, tBad = 0, dOk = 0, dBad = 0;
for (const [slug, d] of Object.entries(data)) {
  for (const loc of ['zh', 'en', 'ja']) {
    const t = d[`${loc}_t`];
    const n = hw(t);
    const brandOk = loc === 'zh' ? t.endsWith('智印港') && !t.includes('ZprintPro') : t.endsWith('ZprintPro');
    const simp = SIMP.filter((c) => t.includes(c));
    const tpass = n >= 50 && n <= 54 && brandOk && simp.length === 0;
    tpass ? tOk++ : tBad++;
    const desc = d[`${loc}_d`];
    const dpass = desc.length >= 150 && desc.length <= 160;
    dpass ? dOk++ : dBad++;
    if (!tpass || !dpass) console.log(`${tpass ? '✓' : '✗'} ${slug} ${loc} title=${n} desc=${desc.length}字 | ${tpass ? '' : 'TITLE!'} ${dpass ? '' : 'DESC!'}`);
  }
}
console.log(`\n标题: 通过 ${tOk}/${tOk + tBad} | desc: 通过 ${dOk}/${dOk + dBad}`);
import * as fs from 'node:fs';
fs.writeFileSync('.hermes/greeting-proposals.json', JSON.stringify(data, null, 1), 'utf8');
