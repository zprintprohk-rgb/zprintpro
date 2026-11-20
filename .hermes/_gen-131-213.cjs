// 生成 T1 131-213 批提案库（83 槽，全部 imps=0 长尾）
// 原则：主詞=name 首段（禁 slug 推斷）/ MOQ=products.ts 真值 / 幣種本地化 / ja 全字段含假名
// 名片族（thick-greeting-400g ×3 + foil-greeting ja）保留名片語義只做質量修復，待 K3 (a)/(b)/(c) 裁決
const fs = require('fs');
const P = [];
const add = (slug, locale, fields) => P.push({ slug, locale, ...fields });

/* ===== A. ja 口水模板族（h1=高品質・短納期… / desc=の〜はZprintProに）===== */
add('adhesive-banners', 'ja', {
  title: '粘着バナー｜透明 PP 防水｜1枚〜 ¥300〜｜ZprintPro',
  h1: '粘着バナー | 透明・防水 ウィンドウ貼付',
  desc: '粘着バナーのオーダー印刷、透明・半透明 PP 合成紙、PVC 防水対応、80×200cm 各種サイズ。4色 CMYK 印刷、デザイン自由、1枚〜小ロット対応。無料デジタル校正1時間、1-3営業日で全国配送、DHL日本直送2-4日。30秒無料見積もり、自社工場直結。| ZprintPro',
});
add('vehicle-wraps', 'ja', {
  title: 'カーラッピング｜フルラップ 部分対応｜1台〜 ¥840〜｜ZprintPro',
  h1: 'カーラッピング | フルラップ 部分ラッピング',
  desc: 'カーラッピングのオーダー制作、車体フルラップ・部分ラッピング対応、PVC 高品質メディア、カスタムデザイン自由。4色 CMYK 印刷、1台〜対応。無料デザインサポート、3-5営業日で全国配送、DHL日本直送2-4日。30秒無料見積もり、複数回修正OK。| ZprintPro',
});
add('perfect-bound-books', 'ja', {
  title: '無線綴じ本｜中綴じ ラミネート｜10冊〜 ¥644〜｜ZprintPro',
  h1: '無線綴じ本 | 中綴じ ラミネート対応',
  desc: '無線綴じ本のオーダー印刷、本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタムサイズ対応。4色 CMYK 印刷、デザイン自由、10冊〜小ロット対応。無料デジタル校正1時間、5-10営業日納品、DHL日本直送2-4日。30秒無料見積もり、自社工場直結。| ZprintPro',
});
add('spiral-notebooks', 'ja', {
  title: 'リングノート｜YO綴じ スパイラル｜10冊〜 ¥386〜｜ZprintPro',
  h1: 'リングノート | スパイラル YO綴じ',
  desc: 'リングノートのオーダー印刷、本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタムサイズ対応。4色 CMYK 印刷、デザイン自由、10冊〜小ロット対応。無料デジタル校正1時間、5-10営業日納品、DHL日本直送2-4日。30秒無料見積もり、複数回修正OK。| ZprintPro',
});
add('exercise-books', 'ja', {
  title: 'ワークブック印刷｜中綴じ 無線綴じ｜10冊〜 ¥258〜｜ZprintPro',
  h1: 'ワークブック印刷 | 中綴じ 無線綴じ対応',
  desc: 'ワークブック印刷のオーダー、学校・塾・企業研修用ワークブック、本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタムサイズ。4色 CMYK 印刷、デザイン自由、10冊〜対応。無料デジタル校正1時間、5-10営業日納品、DHL日本直送2-4日。30秒無料見積もり。| ZprintPro',
});
add('school-flyers', 'ja', {
  title: '学校チラシ｜ラミネート 中綴じ｜10枚〜 ¥20〜｜ZprintPro',
  h1: '学校チラシ | ラミネート 中綴じ対応',
  desc: '学校チラシのオーダー印刷、157g-300g コート紙、A4/A5/A6/DL 各種サイズ対応。4色 CMYK 印刷、デザイン自由、10枚〜小ロット対応。無料デジタル校正1時間、翌日-2営業日で全国配送、DHL日本直送2-4日。30秒無料見積もり、自社工場直結。| ZprintPro',
});
add('electronics-packaging-box', 'ja', {
  title: '電子製品包装箱｜箔押し マグネット｜200個〜 ¥240〜｜ZprintPro',
  h1: '電子製品包装箱 | 静電気防止 オプション',
  desc: '電子製品包装箱のオーダー印刷、静電気防止加工オプション対応。EC・D2Cブランド・精密機器メーカー向け、200個〜対応、日本向けDHL短納期配送2-4日追跡番号付き。無料デザインサポート、安全素材採用で商品保護強化、複数回修正OK。| ZprintPro',
});

/* ===== B. 信封/证书/传单 en 模板族（desc 100-MOQ 矛盾 + 缺钩）===== */
add('mesh-banners', 'en', {
  title: 'Mesh Banners | 1 MOQ $3.68 | Free Ship | ZprintPro',
  desc: 'Custom mesh banners, wind-resistant perforated PVC for outdoor use. 4-color CMYK, 1 MOQ from $3.68, free US shipping over $99. Free design support and 1-hour digital proof. 3-5 day production plus DHL Express delivery. | ZprintPro',
});
add('hardcover-books', 'en', {
  title: 'Hardcover Books | 10 MOQ $13.80 | Free Ship | ZprintPro',
  h1: 'Hardcover Books | Case Bound 10+ | ZprintPro',
  desc: 'Custom hardcover books, case bound with durable rigid covers. 4-color CMYK, 10 MOQ from $13.80, free US shipping over $99. Free design support and 1-hour digital proof. 5-10 day production plus DHL Express delivery. | ZprintPro',
});
add('hardcover-books', 'ja', {
  title: '上製本｜箔押し 見返し付き｜10冊〜 ¥1932〜｜ZprintPro',
  h1: '上製本 | ハードカバー 高級装丁',
  desc: '上製本のオーダー印刷、ハードカバー高級装丁、本文 157g コート/表紙 250g 高品質用紙、A4/A5/カスタムサイズ。箔押し・見返し付き対応、4色 CMYK、デザイン自由、10冊〜。無料デジタル校正1時間、5-10営業日納品、DHL日本直送2-4日。| ZprintPro',
});
add('hardcover-books', 'zh-hk', {
  title: '精裝書籍印刷 | 硬殼燙金 | 10本起 HK$40起 | 智印港',
  h1: '精裝書籍印刷 | 硬殼精裝 燙金可選',
  desc: '精裝書籍印刷，硬殼精裝高檔耐用，內頁 157g 銅版紙/封面 250g 高品質材質，支援 A4/A5/訂製規格，燙金、局部 UV 可選。10 本起印 HK$40 起，4 色 CMYK 全彩，logo 自由設計。免費 1 小時打稿，5-10 個工作天交貨，港九新界免費速遞，30 秒 AI 報價。',
});
add('spiral-notebooks', 'en', {
  title: 'Spiral Notebooks | 10 MOQ $2.76 | Free Ship | ZprintPro',
  h1: 'Spiral Notebooks 10+ | Spiral Bound | ZprintPro',
  desc: 'Custom spiral notebooks, double-wire spiral bound for lay-flat use. 4-color CMYK, 10 MOQ from $2.76, free US shipping over $99. Free design support and 1-hour digital proof. 5-10 day production plus DHL Express delivery. | ZprintPro',
});
add('textbooks', 'zh-hk', {
  title: '教科書印刷 | 覆膜 騎馬釘 | 100本起 HK$24起 | 智印港',
  h1: '教科書印刷 | 專業排版 覆膜騎馬釘',
  desc: '教科書印刷，專業排版覆膜騎馬釘裝訂，內頁 157g 銅版紙/封面 250g 高品質材質，支援 A4/A5/訂製規格。100 本起印 HK$24 起，4 色 CMYK 全彩，logo 自由設計。免費 1 小時打稿，5-10 個工作天交貨，港九新界免費速遞，30 秒 AI 報價。',
});
add('certificates', 'en', {
  title: 'Certificates | 100 MOQ $2.76 | 4-Day | ZprintPro',
  desc: 'Custom certificates with embossed seal and premium paper stocks. 4-color CMYK, 100 MOQ from $2.76, free US shipping over $99. Free design support and 1-hour digital proof. 4-day production plus DHL Express delivery. | ZprintPro',
});
add('school-flyers', 'en', {
  title: 'School Flyers | 10 MOQ $0.14 | Same-Day | ZprintPro',
  h1: 'School Flyers 10+ | Same-Day Printing | ZprintPro',
  desc: 'Custom school flyers for events, admissions and announcements. 4-color CMYK, 10 MOQ from $0.14, same-day printing available, free US shipping over $99. Free design support and 1-hour digital proof. | ZprintPro',
});
add('colored-envelopes', 'en', {
  title: 'Colored Envelopes | 100 MOQ $0.18 | Free Ship | ZprintPro',
  desc: 'Custom colored envelopes in vivid stocks with foil-lined options. 4-color CMYK, 100 MOQ from $0.18, free US shipping over $99. Free design support and 1-hour digital proof. 3-5 day production plus DHL Express delivery. | ZprintPro',
});
add('colored-envelopes', 'ja', {
  title: 'カラー封筒｜両面印刷 DL-C4｜100枚〜 ¥25〜｜ZprintPro',
  h1: 'カラー封筒 | 両面印刷 マルチサイズ',
  desc: 'カラー封筒のオーダー印刷、100g 筆記用紙/白クラフト高品質用紙、DL/C5/C4 各種サイズ対応。4色 CMYK 印刷、デザイン自由、100枚〜。無料デジタル校正1時間、3-5営業日で全国配送、DHL日本直送2-4日。30秒無料見積もり。| ZprintPro',
});
add('large-envelopes', 'en', {
  title: 'Large Envelopes C4 | 100 MOQ $0.28 | Free Ship | ZprintPro',
  desc: 'Custom large envelopes, C4 size fits A4 flat without folding. 4-color CMYK, 100 MOQ from $0.28, free US shipping over $99. Free design support and 1-hour digital proof. 3-5 day production plus DHL Express delivery. | ZprintPro',
});
add('pearl-envelopes', 'en', {
  title: 'Pearl Envelopes | 100 MOQ $0.46 | Free Ship | ZprintPro',
  desc: 'Custom pearl envelopes with iridescent pearl paper finish. 4-color CMYK, 100 MOQ from $0.46, free US shipping over $99. Free design support and 1-hour digital proof. 3-5 day production plus DHL Express delivery. | ZprintPro',
});
add('pearl-envelopes', 'ja', {
  title: 'パール封筒｜両面印刷 パール紙｜100枚〜 ¥64〜｜ZprintPro',
  h1: 'パール封筒 | 両面印刷 凹凸紙対応',
  desc: 'パール封筒のオーダー印刷、100g 筆記用紙/白クラフト高品質用紙、DL/C5/C4 各種サイズ対応。4色 CMYK 印刷、デザイン自由、100枚〜。無料デジタル校正1時間、3-5営業日で全国配送、DHL日本直送2-4日。30秒無料見積もり。| ZprintPro',
});

/* ===== C. 食品标签 / 亚克力 / 磁铁盒 ===== */
add('fruit-food-label-stickers', 'en', {
  title: 'Fruit & Food Label Stickers | 500 MOQ $0.23 | Free Ship | ZprintPro',
  h1: 'Fruit & Food Label Stickers | FDA-Compliant Stock | ZprintPro',
  desc: 'Fruit & Food Label Stickers on FDA-compliant, waterproof and oil-resistant stock for produce and food brands. 4-color CMYK, 500 MOQ from $0.23, free US shipping over $99. Free design support and 1-hour digital proof. | ZprintPro',
});
add('fruit-food-label-stickers', 'ja', {
  title: 'フルーツ・食品ラベル印刷｜防水 耐油｜500枚〜｜ZprintPro',
  h1: 'フルーツ・食品ラベル印刷 | 防水・耐油 冷蔵対応',
  desc: 'フルーツ・食品ラベル印刷、食品FDA認証素材採用で果物・食品ブランドに最適。防水・耐油加工で冷蔵庫保管対応、剥がしやすく糊残なし特殊粘着、500枚〜対応、日本向けDHL配送2-4日追跡番号付き。無料デザインサポート、複数回修正OK。| ZprintPro',
});
add('acrylic-keychain', 'en', {
  title: 'Acrylic Keychain | 10 MOQ | Anime & VTuber | ZprintPro',
  h1: 'Acrylic Keychain | Anime & VTuber Character Goods',
  desc: 'Acrylic keychain, 2mm/3mm clear acrylic with fully custom shapes for anime, VTuber and creator brands. 10 MOQ, free design support and 1-hour digital proof. 3-5 day production, free US shipping over $99, safety pin option available. | ZprintPro',
});
add('acrylic-keychain', 'ja', {
  title: 'アクリルキーホルダー｜キャラクター型 推し活｜10個〜｜ZprintPro',
  h1: 'アクリルキーホルダー | キャラクター型 推し活',
  desc: 'アクリルキーホルダー印刷、高透明2mm/3mmアクリル採用で完全カスタム形状対応。日本同人・アニメ・VTuber・推し活ブランド向け、10個〜対応、日本向けDHL配送2-4日追跡番号付き。無料デザインサポート、複数回修正OK、安全ピンオプション。| ZprintPro',
});
add('magnetic-closure-gift-box', 'en', {
  title: 'Magnetic Closure Gift Box | 100 MOQ $3.45 | Free Ship | ZprintPro',
  desc: 'Magnetic Closure Gift Box with premium rigid board and magnetic snap shut. 100 MOQ from $3.45, free US shipping over $99. Free design support and 1-hour digital proof. 4-day production plus DHL Express delivery for premium brands. | ZprintPro',
});

/* ===== D. 盒族（缺 h1/desc + 标题补 MOQ 钩）===== */
add('gang-run-card-boxes', 'zh-hk', {
  desc: '拼版白卡彩盒印刷，固定刀模共用，免刀模費 + 免排版費，成本直降 40-60%。4 種紙材 (350g/400g 單粉卡、375g 銀卡、375g 鐳射銀卡)，3 種盒型，8 檔標準尺寸。500 個起印，8-15 天交貨，滿 HK$500 免費順豐，30 秒 AI 報價。',
});
add('gang-run-card-boxes', 'en', {
  title: 'Gang-Run White Card Boxes | 500 MOQ | No Die-Cut Fee | ZprintPro',
  desc: 'Gang-Run White Card Boxes with shared die-cut molds — no die-cut fee, no setup fee, 40-60% lower cost than custom. 4 paper stocks, 3 box styles, 8 standard sizes. 500 MOQ, 8-15 day turnaround, free US shipping over $99. | ZprintPro',
});
add('gang-run-card-boxes', 'ja', {
  title: '合版ホワイトカードボックス｜型代不要｜500個〜｜ZprintPro',
});
add('corrugated-boxes', 'en', {
  title: 'Corrugated Boxes E/F Flute | 500 MOQ | Custom | ZprintPro',
  h1: 'Corrugated Boxes (E/F Flute) | Custom Packaging & Shipping',
  desc: 'Corrugated Boxes in E-flute and F-flute for shipping and retail packaging. Custom sizes and 4-color CMYK print, 500 MOQ, 8-15 day turnaround, free US shipping over $99. Free dieline templates and 1-hour digital proof. | ZprintPro',
});
add('tuck-end-boxes', 'zh-hk', {
  title: '插口盒印刷訂製 | 直插 飛機插 | 500個起 8-15天 | 智印港',
  h1: '插口盒印刷訂製 | 直插・飛機插 輕量彩盒',
  desc: '插口盒印刷訂製，直插/飛機插兩種盒型，輕量彩盒適合化妝品、食品、電子周邊包裝。350g 單粉卡/400g 白卡，4 色 CMYK 全彩，logo 自由設計。500 個起印，8-15 天交貨，滿 HK$500 免費順豐，30 秒 AI 報價。',
});
add('tuck-end-boxes', 'en', {
  title: 'Tuck End Boxes | 500 MOQ | 8-15 Day | ZprintPro',
  h1: 'Tuck End Boxes | Straight & Airplane Tuck',
  desc: 'Tuck End Boxes in straight tuck and airplane tuck styles for lightweight retail packaging. 350g/400g card stocks, 4-color CMYK, 500 MOQ, 8-15 day turnaround, free US shipping over $99. Free dieline templates and design support. | ZprintPro',
});
add('tuck-end-boxes', 'ja', {
  title: '差し込み式ボックス｜直挿し 飛行機挿し｜500個〜｜ZprintPro',
  h1: '差し込み式ボックス | 直挿し・飛行機挿し',
  desc: '差し込み式ボックスのオーダー印刷、直挿し・飛行機挿しの2種箱型、化粧品・食品・電子周辺の軽量パッケージに。350g/400gカード紙、4色CMYK、デザイン自由、500個〜。無料デジタル校正、8-15日納品、DHL日本直送2-4日。| ZprintPro',
});
add('white-card-boxes', 'en', {
  title: 'White Cardboard Boxes | 500 MOQ | Gift Boxes | ZprintPro',
  h1: 'White Cardboard Boxes | Custom Packaging & Gift',
  desc: 'White Cardboard Boxes for gift and retail packaging, clean white card surface for full-color print. 4-color CMYK, 500 MOQ, 8-15 day turnaround, free US shipping over $99. Free design support and 1-hour digital proof. | ZprintPro',
});
add('white-card-boxes', 'ja', {
  title: '白カードボックス｜特注 化粧品対応｜500個〜｜ZprintPro',
  h1: '白カードボックス | パッケージ・ギフトボックス',
  desc: '白カードボックスのオーダー印刷、化粧品・ギフト・零售パッケージ向け、白いカード表面にフルカラー再現。4色CMYK、デザイン自由、500個〜。無料デジタル校正、8-15日納品、DHL日本直送2-4日。| ZprintPro',
});

/* ===== E.  pollution 修復（kana/currency/MOQ 對齊）===== */
add('postcard-set', 'zh-hk', {
  title: '明信片套裝 | 和紙風藝術紙 | 4套起 4小時打稿 | 智印港',
  h1: '明信片套裝 | 和紙風藝術紙 簽名會周邊',
  desc: '明信片套裝印刷，和紙風藝術紙 4-8 張入，動漫角色 / 插畫收藏 / 簽名會周邊適用。105×148mm 標準尺寸，雙面印刷，OPP 封套個別保護。4 套起印，免費 4 小時打稿，3-5 個工作天完成，DHL Express 直送日本 2-4 個工作天，30 秒 AI 報價。',
});
add('postcard-set', 'en', {
  title: 'Washi Postcard Sets | 4 MOQ | Free Ship | ZprintPro',
  desc: 'Washi-style postcard sets in 4-8 piece collections for character goods, illustration and signature events. 105×148mm, double-sided print with OPP sleeves. 4 MOQ, free design support, 3-5 day production, free US shipping over $99. | ZprintPro',
});
add('postcard-set', 'ja', {
  title: 'ポストカードセット｜和紙風 4-8枚｜4セット〜｜ZprintPro',
  desc: 'ポストカードセットのオーダー印刷、和紙風アート紙 4-8 枚入。推しキャラ・VTuber・イラストコレクション向け。105×148mm 標準、両面印刷、OPP スリーブ封入。4セット〜、無料デザインサポート、3-5 営業日納品、DHL Express 日本直送 2-4 日。| ZprintPro',
});
add('eco-tote-bag', 'zh-hk', {
  title: '環保托特袋 | 100%有機棉 | 10件起 ESG禮贈品 | 智印港',
  h1: '環保托特袋 | 100%有機棉 企業活動周邊',
  desc: '環保托特袋印刷，100% 有機棉布料，絲網 / DTG 印刷支援，企業活動、展會、ESG 禮贈品專用。FSC 認證布料，可收納 A4 尺寸。10 件起印，免費 1 小時打稿，5-7 個工作天交貨，滿 HK$500 免費順豐，30 秒 AI 報價。',
});
add('eco-tote-bag', 'en', {
  title: 'Organic Cotton Eco Tote Bag | 10 MOQ | Free Ship | ZprintPro',
  desc: 'Organic cotton eco tote bags with silk/DTG printing for corporate events, trade shows and ESG merchandise. FSC-certified fabric, fits A4. 10 MOQ, free design support, 5-7 day production, free US shipping over $99. | ZprintPro',
});

/* ===== F. 賀卡族（currency/MOQ 對齊真值 10）===== */
add('premium-greeting-cards', 'ja', {
  title: 'プレミアムグリーティングカード｜箔押し UV｜10枚〜 ¥20〜｜ZprintPro',
  desc: 'プレミアムグリーティングカード印刷：300gコート紙、マット／グロスラミネート、箔押し、部分UV、角丸加工に対応し、サイズ・型抜きもオーダー可能。127×178mm標準、10枚〜 ¥20〜。クリスマスカード・年賀状・結婚式サンキューカード・法人カードに最適。無料デザイン校正、即日見積もり、納期相談可。| ZprintPro',
});
add('spot-uv-greeting-cards', 'zh-hk', {
  title: '局部UV賀卡印刷 | 啞面高光對比 | 10張起 HK$1.4起 | 智印港',
  desc: '局部UV賀卡印刷：啞面底紙配高光 UV 圖案，強烈層次與立體對比，觸感細緻。300g 銅版紙或合成紙，127×178mm 標準，10 張起印 HK$1.4 起。適用生日卡、聖誕卡、產品宣傳卡及品牌賀卡，可印 LOGO 與品牌配色，亦可選燙金升級，免費設計打稿，即日報價，量大優惠歡迎 WhatsApp 查詢。',
});
add('spot-uv-greeting-cards', 'en', {
  title: 'Spot UV Greeting Cards | 10 MOQ $0.18 | Matte+Gloss | ZprintPro',
  desc: 'Spot UV greeting cards: glossy highlights on matte base, 300gsm. 127×178mm, 10 MOQ from $0.18. Birthday, Christmas & brand cards with logo and brand colors, foil upgrade available. Free proof, quick quote. | ZprintPro',
});
add('spot-uv-greeting-cards', 'ja', {
  title: '部分UVグリーティングカード｜マット 光沢対比｜10枚〜 ¥27〜｜ZprintPro',
  desc: '部分UVグリーティングカード印刷：マット下地に光沢UVのコントラスト、300gコート紙または合成紙。127×178mm標準、10枚〜 ¥27〜。誕生日・クリスマス・ブランドカードに最適、サイズ・型抜きもオーダー可能。無料デザイン校正、即日見積もり、特急対応可能、大量注文は割引対応、納期相談可。',
});
add('matte-greeting-cards', 'en', {
  title: 'Matte Greeting Cards | 10 MOQ $0.14 | Soft-Touch | ZprintPro',
  desc: 'Matte greeting cards: soft-touch, fingerprint-resistant, 300gsm art or eco paper. 127×178mm, 10 MOQ from $0.14. Xmas, New Year & thank-you cards. Free proof, quick quote, bulk discount available. | ZprintPro',
});
add('matte-greeting-cards', 'ja', {
  title: 'マットグリーティングカード｜指紋防止 ソフトタッチ｜10枚〜 ¥21〜｜ZprintPro',
  desc: 'マットグリーティングカード印刷：なめらかなマット加工、指紋防止仕上げ、300gマット紙またはエコ紙。127×178mm標準、10枚〜 ¥21〜。クリスマス・年賀・感謝・誕生日カードに最適、サイズ・型抜きもオーダー可能です。無料デザイン校正、即日見積もり、特急対応も可能、大量注文は割引対応です。',
});
add('rounded-corner-greeting-cards', 'en', {
  title: 'Rounded Corner Greeting Cards | 10 MOQ $0.13 | R3mm | ZprintPro',
  desc: 'Rounded-corner greeting cards: soft R3mm die-cut corners, 300gsm. 127×178mm, 10 MOQ from $0.13. Birthday, Christmas & thank-you cards, custom shapes available. Free proof, quick quote. | ZprintPro',
});
add('rounded-corner-greeting-cards', 'ja', {
  title: '角丸グリーティングカード｜R3mm 丸角型抜き｜10枚〜 ¥20〜｜ZprintPro',
  desc: '角丸グリーティングカード印刷：R3mmのやさしい丸角型抜き、300gコート紙またはアート紙。127×178mm標準、10枚〜 ¥20〜。誕生日・クリスマス・感謝・記念カードに最適、サイズ・型抜きもオーダー可能です、オリジナルデザイン対応。無料デザイン校正、即日見積もり、特急対応可能、大量注文は割引対応です。',
});

/* ===== G. 名片語義保留族（質量修復，待 K3 (a)/(b)/(c) 裁決）===== */
add('thick-greeting-cards-400g', 'zh-hk', {
  title: '超厚名片印刷 (400g) | 燙金壓紋 | 10張起 HK$1.2起 | 智印港',
  h1: '超厚名片 | 400g厚紙 燙金壓紋',
  desc: '超厚名片 400g 厚卡印刷，燙金、壓紋工藝，10 張起印 HK$1.2 起/張。4 色 CMYK 全彩，logo 自由設計，免費 1 小時打稿，3-5 個工作天交貨，滿 HK$500 免費順豐，30 秒 AI 報價。',
});
add('thick-greeting-cards-400g', 'en', {
  title: 'Thick 400g Business Cards | 10 MOQ $0.15 | Foil | ZprintPro',
  h1: 'Thick 400g Business Cards | Foil & Emboss | ZprintPro',
  desc: 'Thick 400g business cards with foil stamping and emboss finishing. 4-color CMYK, 10 MOQ from $0.15 per card, free US shipping over $99. Free design support and 1-hour digital proof, 3-5 day production. | ZprintPro',
});
add('thick-greeting-cards-400g', 'ja', {
  title: '厚口名刺｜400g厚紙 箔押し・エンボス｜10枚〜 ¥23〜｜ZprintPro',
  h1: '厚口名刺 | 400g厚紙 箔押し対応',
  desc: '厚口名刺（400g）印刷、箔押し・エンボス加工対応、10枚〜 ¥23〜。4色CMYK、無料デジタル校正1時間、3-5営業日納品、DHL日本直送2-4日。30秒無料見積もり、複数回修正OK。| ZprintPro',
});
add('foil-greeting-cards', 'ja', {
  title: '箔押し名刺印刷｜金 銀 ローズゴールド｜10枚〜 ¥35〜｜ZprintPro',
  h1: '箔押し名刺 | 金・銀・ローズゴールド対応',
  desc: '箔押し名刺印刷、金・銀・ローズゴールドの箔色対応、10枚〜 ¥35〜。4色CMYK、無料デジタル校正1時間、3-5営業日納品、DHL日本直送2-4日。30秒無料見積もり、複数回修正OK。| ZprintPro',
});

/* ===== H. 婚禮/活動族（24 槽，h1/desc 新建 + 標題補鉤）===== */
const WED = {
  'cafe-table-cards': { zh: ['餐廳枱卡', '餐廳 / 咖啡廳枱卡', 'PVC防水 站立式', 'PVC 防水材質、站立式設計', '餐廳、咖啡廳點餐展示'], en: ['Cafe Table Cards', 'Café / Restaurant Table Cards', 'Waterproof Stand', 'Waterproof PVC, stand-up design', 'restaurants, cafes and events'], ja: ['カフェテーブルカード', 'カフェ / レストラン テーブルカード', 'PVC防水 スタンド式', 'PVC防水、スタンド式', 'カフェ・レストランの店内表示'], u: '張' },
  'drink-tokens': { zh: ['酒水牌', '酒水牌 / 飲品標記', 'PVC防水 圓角模切', 'PVC 防水材質、圓角模切', '酒吧、派對、活動飲品管理'], en: ['Drink Tokens', 'Drink Tokens / Beverage Markers', 'PVC Waterproof', 'Waterproof PVC, round die-cut', 'bars, parties and event beverage tracking'], ja: ['ドリンクトークン', 'ドリンクトークン', 'PVC防水 丸角仕様', 'PVC防水、丸角仕様', 'バー・イベントのドリンク管理'], u: '張' },
  'escort-cards': { zh: ['座位卡', '座位卡 / 賓客標記', '燙金UV 站立式', '燙金、局部 UV 工藝、站立式設計', '婚宴、宴會賓客座位安排'], en: ['Escort Cards', 'Escort Cards / Guest Markers', 'Foil Stand', 'Gold foil, stand-up design', 'weddings and banquet seating'], ja: ['エスコートカード', 'エスコートカード', '箔押し スタンド', '箔押し・スタンド式', '結婚式・宴會の席次案内'], u: '張' },
  'foil-wedding-invitations': { zh: null, en: ['Foil Wedding Invitations', 'Foil Wedding Invitations', 'Gold & Silver Foil', 'Gold & silver foil printing', 'wedding invitations'], ja: ['箔押し結婚式招待状', '箔押し結婚式招待状', '金銀対応', '金・銀箔押し対応', '結婚式招待状'], u: '套' },
  'name-tags-badges': { zh: null, en: ['Name Tags', 'Name Tags / Conference Badges', 'Magnet & Pin', 'Magnet and pin attachments', 'conferences, exhibitions and events'], ja: ['名札', '名札 / 会議バッジ', '磁石対応', '磁石・ピン対応', '会議・展示会・イベント'], u: '張' },
  'save-the-date-cards': { zh: ['Save the Date 卡片', 'Save the Date 結婚通知卡', 'A6 燙金UV', 'A6 尺寸、燙金、局部 UV 工藝', '婚禮通知、喜帖預告'], en: ['Save the Date Cards', 'Save the Date Cards', 'A6 Foil & UV', 'A6 size, foil and spot UV', 'wedding announcements'], ja: ['Save the Date カード', 'Save the Date カード印刷', 'A6 箔押しUV', 'A6サイズ、箔押し・UV対応', '結婚式の予告通知'], u: '套' },
  'wedding-menu-cards': { zh: ['婚禮菜單卡', '婚禮菜單卡', 'A5 燙金UV', 'A5 尺寸、燙金、局部 UV、雙面印刷', '婚宴、酒店宴會菜單'], en: ['Wedding Menu Cards', 'Wedding Menu Cards', 'A5 Foil', 'A5 size, gold foil and spot UV', 'wedding receptions and banquets'], ja: ['ウエディング メニュー', 'ウエディング メニュー印刷', 'A5 箔押し', 'A5サイズ、箔押し・UV対応', '結婚式・披露宴のメニュー'], u: '套' },
  'wedding-place-cards': { zh: ['婚宴枱卡', '婚宴枱卡', '燙金壓紋 站立式', '燙金、壓紋工藝、站立式設計', '婚宴賓客席位標示'], en: ['Wedding Place Cards', 'Wedding Place Cards', 'Foil Stand', 'Gold foil, stand-up design', 'wedding reception seating'], ja: ['ウエディング席札', 'ウエディング席札印刷', '箔押し スタンド', '箔押し・スタンド式', '結婚式の席札'], u: '張' },
  'wedding-program-cards': { zh: ['婚禮節目單', '婚禮節目單', 'A5對摺 雙面', 'A5 對摺、雙面印刷、燙金 UV', '婚禮流程、儀式節目'], en: ['Wedding Program Cards', 'Wedding Program Cards', 'A5 Folded', 'A5 folded, double-sided print', 'wedding ceremonies and programs'], ja: ['結婚式のしおり', '結婚式のしおり印刷', 'A5 折り加工', 'A5サイズ、折り加工・箔押し対応', '結婚式のプログラム'], u: '套' },
  'wedding-seating-charts': { zh: null, en: ['Wedding Seating Charts', 'Wedding Seating Charts', 'A1/A2 Foil', 'A1/A2 size, foil print', 'wedding reception seating plans'], ja: ['披露宴座席表', '披露宴座席表印刷', 'A1/A2 箔押し', 'A1/A2サイズ、箔押し対応', '披露宴の座席表'], u: '枚' },
  'wedding-suite-bundle': { zh: null, en: ['Wedding Suite Bundle', 'Wedding Suite Bundle', '6 Pcs Set', '6-piece matching invitation suite', 'complete wedding stationery'], ja: ['ウエディング フル セット', 'ウエディング フル セット印刷', '6枚組', '6枚組の揃いの招待状セット', '結婚式の総合ペーパーアイテム'], u: '套' },
  'wedding-thank-you-cards': { zh: ['婚禮感謝卡', '婚禮感謝卡', 'A6 燙金UV', 'A6 尺寸、燙金、局部 UV 工藝', '婚禮回禮、賓客感謝'], en: ['Wedding Thank You Cards', 'Wedding Thank You Cards', 'A6 Foil', 'A6 size, gold foil and spot UV', 'wedding thank-you notes'], ja: ['結婚式サンキュカード', '結婚式サンキュカード印刷', 'A6 箔押しUV', 'A6サイズ、箔押し・UV対応', '結婚式のお礼状'], u: '套' },
};
// 各槽標題現狀：zh 無價格補 HK$（bp 真值）/ NT$ 修復；en/ja 補 MOQ 鉤（無價真值 → priceFlag）
const WT = {
  'cafe-table-cards': { zh: '餐廳枱卡印刷 | PVC防水 站立式 | 50張起 HK$0.4起 | 智印港', en: 'Café Table Cards | 50 MOQ | Waterproof Stand | ZprintPro', ja: 'カフェテーブルカード｜PVC防水 スタンド式｜50枚〜｜ZprintPro' },
  'drink-tokens': { zh: null, en: 'Drink Tokens | 50 MOQ | PVC Waterproof | ZprintPro', ja: 'ドリンクトークン｜PVC防水 丸角仕様｜50枚〜｜ZprintPro' },
  'escort-cards': { zh: null, en: 'Escort Cards | 50 MOQ | Gold Foil Stand | ZprintPro', ja: 'エスコートカード｜箔押し スタンド｜50枚〜｜ZprintPro' },
  'foil-wedding-invitations': { zh: null, en: 'Foil Wedding Invitations | 50 MOQ | Gold & Silver | ZprintPro', ja: '箔押し結婚式招待状｜金銀対応｜50セット〜｜ZprintPro' },
  'name-tags-badges': { zh: null, en: 'Name Tags | 50 MOQ | Conference Badges | ZprintPro', ja: '名札｜会議用 磁石対応｜50枚〜｜ZprintPro' },
  'save-the-date-cards': { zh: 'Save the Date 卡片印刷 | A6 燙金UV | 50套起 HK$0.85起 | 智印港', en: 'Save the Date Cards | 50 MOQ | A6 Foil & UV | ZprintPro', ja: 'Save the Date カード｜A6 箔押しUV｜50セット〜｜ZprintPro' },
  'wedding-menu-cards': { zh: '婚禮菜單卡印刷 | A5 燙金UV | 50套起 HK$1.15起 | 智印港', en: 'Wedding Menu Cards | 50 MOQ | A5 Foil | ZprintPro', ja: 'ウエディング メニュー｜A5 箔押し｜50セット〜｜ZprintPro' },
  'wedding-place-cards': { zh: '婚宴枱卡印刷 | 燙金壓紋 站立式 | 50張起 HK$0.3起 | 智印港', en: 'Wedding Place Cards | 50 MOQ | Foil Stand | ZprintPro', ja: 'ウエディング席札｜箔押し スタンド｜50枚〜｜ZprintPro' },
  'wedding-program-cards': { zh: '婚禮節目單印刷 | A5對摺 雙面 | 50套起 HK$0.95起 | 智印港', en: 'Wedding Program Cards | 50 MOQ | A5 Folded | ZprintPro', ja: '結婚式のしおり｜A5 折り加工｜50セット〜｜ZprintPro' },
  'wedding-seating-charts': { zh: null, en: 'Wedding Seating Charts | 50 MOQ | A1/A2 Foil | ZprintPro', ja: '披露宴座席表｜A1/A2 箔押し｜50枚〜｜ZprintPro' },
  'wedding-suite-bundle': { zh: null, en: 'Wedding Suite Bundle | 50 MOQ | 6 Pcs Set | ZprintPro', ja: 'ウエディング フル セット｜6枚組｜50セット〜｜ZprintPro' },
  'wedding-thank-you-cards': { zh: '婚禮感謝卡印刷 | A6 燙金UV | 50套起 HK$0.65起 | 智印港', en: 'Wedding Thank You Cards | 50 MOQ | A6 Foil | ZprintPro', ja: '結婚式サンキュカード｜A6 箔押しUV｜50セット〜｜ZprintPro' },
};
const ZH_BP = { 'wedding-menu-cards': '1.15', 'wedding-program-cards': '0.95', 'wedding-thank-you-cards': '0.65' };
for (const slug of Object.keys(WED)) {
  const w = WED[slug];
  if (w.zh) {
    const zhDesc = `${w.zh[1]}印刷，${w.zh[3]}，50 ${w.u}起印。300g 特種紙，4 色 CMYK 全彩，logo 自由設計。免費 1 小時打稿，3-5 個工作天交貨，港九新界免費速遞。${w.zh[4]}首選，30 秒 AI 報價。`;
    add(slug, 'zh-hk', { ...(WT[slug].zh ? { title: WT[slug].zh } : {}), h1: `${w.zh[1]} | ${w.zh[2]}`, desc: zhDesc });
  }
  const enDesc = `Custom ${w.en[0].toLowerCase()} for ${w.en[4]}. 50 MOQ, ${w.en[3]}. 4-color CMYK on 300gsm specialty paper, free design support and 1-hour digital proof. 3-5 day production, free US shipping over $99. | ZprintPro`;
  add(slug, 'en', { ...(WT[slug].en ? { title: WT[slug].en } : {}), h1: `${w.en[1]} | ${w.en[2]}`, desc: enDesc });
  const jaDesc = `${w.ja[1]}のオーダー印刷、50セット〜。${w.ja[3]}、300g特種紙、4色CMYK、デザイン自由。無料デジタル校正1時間、3-5営業日納品、DHL日本直送2-4日。| ZprintPro`;
  add(slug, 'ja', { ...(WT[slug].ja ? { title: WT[slug].ja } : {}), h1: `${w.ja[1]} | ${w.ja[2]}`, desc: jaDesc });
}

/* ===== priceFlags（無真實單位價 / bp 異常 → 豁免 G5/G6）===== */
const priceFlags = {
  'acrylic-keychain|en': 'bp=377.65 異常無真值',
  'acrylic-keychain|ja': 'bpj=null 無日價',
  'postcard-set|zh-hk': 'bp=750 異常無真值',
  'postcard-set|en': 'bp=124.5 異常無真值',
  'postcard-set|ja': 'bpj=null 無日價',
  'eco-tote-bag|zh-hk': 'bp=9000 異常無真值',
  'eco-tote-bag|en': 'bp=1494 異常無真值',
  'gang-run-card-boxes|zh-hk': 'bp=129 非單位價',
  'gang-run-card-boxes|en': 'bpe=null 無美價',
  'gang-run-card-boxes|ja': 'bpj=null 無日價',
  'corrugated-boxes|en': 'bp=1517 異常無真值',
  'tuck-end-boxes|zh-hk': 'bp=1538 異常無真值',
  'tuck-end-boxes|en': 'bpe=null 無美價',
  'tuck-end-boxes|ja': 'bpj=null 無日價',
  'white-card-boxes|en': 'bpe=null 無美價',
  'white-card-boxes|ja': 'bpj=null 無日價',
  'fruit-food-label-stickers|ja': 'bpj=null 無日價',
};
// 婚禮族 en/ja 無價真值 → 全部豁免
for (const slug of Object.keys(WED)) {
  priceFlags[`${slug}|en`] = 'bpe=null 無美價';
  priceFlags[`${slug}|ja`] = 'bpe/bpj=null 無美日價';
}

const out = {
  meta: {
    batch: 'T1 131-213 (83 槽, imps=0 長尾)',
    generated: '2026-09-21 13:20',
    prevBatches: ['title-quality-proposals-20260921.json', 'title-quality-proposals-20260921-b31-80.json', 'title-quality-proposals-20260921-b81-130.json'],
    priceFlags,
    notes: [
      '名片語義保留族（thick-greeting-400g×3 + foil-greeting ja）：僅質量修復（鉤/假名/語種），名片語義不動，待 K3 §0.0 解禁塊 (a)/(b)/(c) 裁決',
      'zh-hk NT$→HK$ 修復 3 槽（cafe-table/save-the-date/wedding-place）',
      'kana 污染清除：postcard-set zh（推し→動漫）、eco-tote-bag zh（推し活/Comiket→企業活動）',
      'MOQ 對齊真值：賀卡族 100→10、postcard 100/10/8→4、acrylic 50→10、electronics ja 100→200、精裝/教科書/學校傳單 desc 50/100 矛盾消解',
    ],
  },
  proposals: P,
};
fs.writeFileSync('.hermes/title-quality-proposals-20260921-b131-213.json', JSON.stringify(out, null, 2));
console.log('proposals:', P.length);
const byLoc = {};
for (const p of P) byLoc[p.locale] = (byLoc[p.locale] || 0) + 1;
console.log(byLoc);
const fields = P.reduce((n, p) => n + ['title', 'h1', 'desc'].filter((f) => p[f] != null).length, 0);
console.log('total fields:', fields);
