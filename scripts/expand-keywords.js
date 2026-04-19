/**
 * 批量扩展49个SKU的关键词
 * 读取product-seo.ts，为关键词不足的产品生成更丰富的关键词
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'product-seo.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 关键词映射：49个需要扩展的产品
const keywordMap = {
  // === BANNERS ===
  'mesh-banners': {
    'zh-hk': '網孔橫額,透風橫額,戶外網布橫額,防風橫額印刷,工地圍欄橫額,大型網孔橫額,建築地盤橫額,工程橫額,網布橫額香港,透氣橫額制作,網眼橫額印刷,戶外防風橫額',
    'en': 'mesh banners,perforated banners,windproof banners,outdoor mesh banners,construction site banners,building site banners,scaffold banners,large mesh banners,mesh banner printing hong kong,wind permeable banners,mesh vinyl banners',
    'ja': 'メッシュバナー,パンチングバナー,防風バナー,屋外メッシュバナー,建設現場バナー,足場バナー,大型メッシュバナー,メッシュバナー印刷,風通しバナー,メッシュビニールバナー',
  },
  'roll-up-banners': {
    'zh-hk': '易拉架,易拉架印刷,易拉寶,易拉架制作,便攜橫額,展覽易拉架,活動易拉架,易拉架設計,易拉架香港,易拉架訂造,易拉架連設計,易拉架快速制作,易拉架報價',
    'en': 'roll up banners,roll up banner printing,retractable banners,pull up banners,portable banners,exhibition roll up banners,event roll up banners,roll up banner design,roll up banner hong kong,custom roll up banners,roll up stand banners,rollup banner printing',
    'ja': 'ロールアップバナー,ロールアップバナー印刷,巻き取りバナー,持ち運びバナー,展示会用ロールアップバナー,イベントロールアップバナー,ロールアップバナーデザイン,ロールアップバナー香港,オーダーメイドロールアップバナー',
  },
  'vehicle-wraps': {
    'zh-hk': '車身貼紙,車身廣告貼紙,車貼印刷,車身包膜,廣告車貼,貨車車身貼,巴士車身廣告,車身貼設計,車身貼香港,汽車貼紙印刷,車身廣告制作,全車貼紙,局部車身貼',
    'en': 'vehicle wraps,car wrap printing,vehicle graphics,van wraps,car sticker printing,commercial vehicle wraps,truck wraps,bus advertising wraps,vehicle wrap design,vehicle wrap hong kong,fleet vehicle wraps,partial car wraps',
    'ja': 'カーラッピング,車両ラップ,車体広告,カーステッカー印刷,商用車ラッピング,トラックラッピング,バス広告ラッピング,カーラップデザイン,カーラップ香港,フリートラッピング',
  },

  // === BOOKS ===
  'hardcover-books': {
    'zh-hk': '硬皮書印刷,精裝書印刷,硬皮書制作,精裝書訂造,畫冊印刷,相冊印刷,紀念冊印刷,硬皮書香港,精裝書設計,硬皮書報價,高級精裝書,硬皮書少量印刷,硬皮書速印',
    'en': 'hardcover book printing,hardcover book binding,premium book printing,photo book printing,coffee table book printing,commemorative book printing,hardcover book design,hardcover book hong kong,hardcover book quote,hardcover book printing service,hardcover book small quantity',
    'ja': 'ハードカバー本印刷,上製本印刷,高級本印刷,写真集印刷,記念冊印刷,ハードカバー本デザイン,ハードカバー本香港,ハードカバー本見積もり,ハードカバー本印刷サービス',
  },
  'perfect-bound-books': {
    'zh-hk': '膠裝書印刷,無線膠裝書,膠裝書制作,膠裝書訂造,膠裝書籍,膠裝畫冊,膠裝書設計,膠裝書香港,膠裝書報價,膠裝書速印,膠裝書少量印刷,膠裝書平裝,膠裝書質量',
    'en': 'perfect bound book printing,perfect bound book binding,perfect bound books,perfect bound book design,perfect bound book hong kong,perfect bound book quote,perfect bound book printing service,softcover book printing,perfect binding books,paperback book printing',
    'ja': '中綴じ本印刷,无线綴じ本,中綴じ本制作,中綴じ本デザイン,中綴じ本香港,中綴じ本見積もり,中綴じ本印刷サービス,ソフトカバー本印刷,ペーパーバック印刷',
  },
  'saddle-stitch-booklets': {
    'zh-hk': '騎釘書刊印刷,騎馬釘小冊子,騎釘書制作,騎釘書訂造,騎釘刊物,騎釘宣傳冊,騎釘書設計,騎釘書香港,騎釘書報價,騎釘書速印,騎釘書少量印刷,騎釘書裝訂',
    'en': 'saddle stitch booklet printing,saddle stitch binding,saddle stitch booklets,saddle stitched brochures,saddle stitch booklet design,saddle stitch booklet hong kong,saddle stitch booklet quote,saddle stitch printing service,saddle stitch pamphlet printing,saddle stitched catalogs',
    'ja': '中綴じ小冊子印刷,中綴じ製本,中綴じ小冊子,中綴じパンフレット,中綴じ小冊子デザイン,中綴じ小冊子香港,中綴じ小冊子見積もり,中綴じ印刷サービス',
  },
  'spiral-notebooks': {
    'zh-hk': '鐵圈筆記簿印刷,線圈筆記本,鐵圈本制作,線圈簿印刷,螺旋裝訂筆記本,鐵圈筆記簿訂造,鐵圈本設計,鐵圈本香港,鐵圈本報價,鐵圈本速印,鐵圈本少量印刷,學校筆記簿,公司筆記簿',
    'en': 'spiral notebook printing,spiral bound notebooks,wire bound notebooks,coil notebook printing,spiral notebook design,spiral notebook hong kong,spiral notebook quote,spiral notebook printing service,custom spiral notebooks,promotional notebooks',
    'ja': 'スパイラルノート印刷,ワイヤー綴じノート,コイルノート印刷,スパイラルノートデザイン,スパイラルノート香港,スパイラルノート見積もり,オーダーメイドスパイラルノート,販促ノート',
  },

  // === BUSINESS CARDS ===
  'double-sided-cards': {
    'zh-hk': '雙面名片印刷,雙面咭片,雙面名片設計,雙面商務名片,雙面卡片印刷,雙面名片訂造,雙面名片香港,雙面名片報價,雙面名片速印,雙面名片少量印刷,雙面公司名片,雙面彩色名片',
    'en': 'double sided business cards,double sided name cards,double sided card printing,double sided business card design,double sided cards hong kong,double sided business card quote,double sided card printing service,two sided business cards,full color double sided cards',
    'ja': '両面名刺印刷,両面名刺,両面名刺デザイン,両面名刺香港,両面名刺見積もり,両面名刺印刷サービス,フルカラー両面名刺,両面ビジネスカード',
  },
  'eco-business-cards': {
    'zh-hk': '環保名片印刷,再生紙名片,環保咭片,綠色名片印刷,環保名片訂造,FSC名片,大豆油墨名片,環保名片香港,環保名片設計,環保名片報價,可持續名片,環保名片速印,環保名片少量印刷',
    'en': 'eco business cards,recycled paper business cards,environmentally friendly business cards,green business card printing,eco friendly name cards,sustainable business cards,FSC certified business cards,eco business cards hong kong,eco business card design,eco business card printing service',
    'ja': 'エコ名刺印刷,再生紙名刺,環境に優しい名刺,エコ名刺,持続可能名刺,FSC認証名刺,エコ名刺香港,エコ名刺デザイン,エコ名刺印刷サービス',
  },
  'foil-business-cards': {
    'zh-hk': '燙金名片,金屬色名片,奢華名片,燙印工藝,香港燙金,燙銀名片,玫瑰金名片,公司燙金名片,高級燙金名片,凹凸燙金名片,印刷即日速遞送貨',
    'en': 'foil stamped business cards,metallic business cards,luxury name cards,gold foil printing hong kong,silver foil business cards,rose gold business cards,corporate foil cards,premium foil stamped cards,embossed foil business cards,same day foil business cards',
    'ja': '箔押し名刺,メタリック名刺,高級名刺,ゴールド箔押し,シルバー箔押し名刺,ローズゴールド名刺,会社用箔押し名刺,プレミアム箔押し名刺,エンボス箔押し名刺,即日箔押し名刺',
  },
  'rounded-corner-cards': {
    'zh-hk': '圓角名片印刷,圓角咭片,圓角名片設計,圓角商務名片,圓角卡片制作,圓角名片訂造,圓角名片香港,圓角名片報價,圓角名片速印,圓角名片少量印刷,圓角公司名片,時尚圓角名片',
    'en': 'rounded corner business cards,rounded corner name cards,rounded edge business cards,rounded corner card printing,rounded corner card design,rounded corner cards hong kong,rounded corner business card quote,rounded corner card printing service,modern rounded corner cards',
    'ja': '丸角名刺印刷,丸角名刺,丸角名刺デザイン,丸角名刺香港,丸角名刺見積もり,丸角名刺印刷サービス,おしゃれ丸角名刺,モダン丸角名刺',
  },

  // === CALENDARS ===
  'custom-calendars': {
    'zh-hk': '定制年曆印刷,個人化年曆,訂造年曆,公司年曆訂制,禮品年曆印刷,專屬年曆制作,定制年曆設計,定制年曆香港,定制年曆報價,定制年曆速印,定制年曆少量印刷,企業定制年曆',
    'en': 'custom calendar printing,personalized calendars,custom made calendars,company calendar printing,promotional calendar printing,custom calendar design,custom calendars hong kong,custom calendar quote,custom calendar printing service,branded calendars,bespoke calendars',
    'ja': 'オーダーメイドカレンダー印刷,パーソナライズカレンダー,カスタムカレンダー,会社カレンダー印刷,販促カレンダー印刷,カスタムカレンダーデザイン,カスタムカレンダー香港,カスタムカレンダー見積もり',
  },
  'magnetic-calendars': {
    'zh-hk': '磁石年曆印刷,冰箱貼年曆,磁性年曆,磁吸年曆制作,磁石日曆印刷,磁鐵年曆訂造,磁石年曆設計,磁石年曆香港,磁石年曆報價,磁石年曆速印,磁石年曆少量印刷,磁石年曆禮品',
    'en': 'magnetic calendar printing,fridge magnet calendars,magnetic calendars,custom magnetic calendars,magnetic calendar printing,magnetic calendar design,magnetic calendars hong kong,magnetic calendar quote,magnetic calendar printing service,promotional magnetic calendars',
    'ja': 'マグネットカレンダー印刷,冷蔵庫マグネットカレンダー,磁石カレンダー,カスタムマグネットカレンダー,マグネットカレンダーデザイン,マグネットカレンダー香港,マグネットカレンダー見積もり',
  },
  'mini-calendars': {
    'zh-hk': '迷你年曆印刷,小型年曆,口袋年曆,迷你日曆印刷,小巧年曆制作,迷你年曆訂造,迷你年曆設計,迷你年曆香港,迷你年曆報價,迷你年曆速印,迷你年曆少量印刷,迷你年曆禮品',
    'en': 'mini calendar printing,small calendars,pocket calendars,mini desk calendars,tiny calendar printing,mini calendar design,mini calendars hong kong,mini calendar quote,mini calendar printing service,custom mini calendars',
    'ja': 'ミニカレンダー印刷,小型カレンダー,ポケットカレンダー,ミニ卓上カレンダー,ミニカレンダーデザイン,ミニカレンダー香港,ミニカレンダー見積もり,オーダーメイドミニカレンダー',
  },
  'photo-frame-calendars': {
    'zh-hk': '相框年曆印刷,相片年曆,相架日曆,照片年曆制作,相框月曆印刷,相框年曆訂造,相框年曆設計,相框年曆香港,相框年曆報價,相框年曆速印,相框年曆少量印刷,相框年曆禮品',
    'en': 'photo frame calendar printing,photo calendars,picture frame calendars,personalized photo calendars,photo frame calendar design,photo frame calendars hong kong,photo frame calendar quote,photo frame calendar printing service,custom photo calendars',
    'ja': 'フォトフレームカレンダー印刷,写真カレンダー,フォトカレンダー,パーソナライズフォトカレンダー,フォトフレームカレンダーデザイン,フォトフレームカレンダー香港,フォトフレームカレンダー見積もり',
  },
  'wall-calendars': {
    'zh-hk': '掛曆印刷,牆上年曆,掛牆年曆,月曆印刷,大Calendar印刷,掛曆訂造,掛曆設計,掛曆香港,掛曆報價,掛曆速印,掛曆少量印刷,公司掛曆,宣傳掛曆',
    'en': 'wall calendar printing,hanging calendars,wall calendars,custom wall calendars,large wall calendar printing,wall calendar design,wall calendars hong kong,wall calendar quote,wall calendar printing service,company wall calendars,promotional wall calendars',
    'ja': '壁掛けカレンダー印刷,掛けカレンダー,ウォールカレンダー,カスタム壁掛けカレンダー,壁掛けカレンダーデザイン,壁掛けカレンダー香港,壁掛けカレンダー見積もり',
  },

  // === EDUCATIONAL ===
  'certificates': {
    'zh-hk': '證書印刷,畢業證書,獎狀印刷,榮譽證書,結業證書,證書制作,證書訂造,證書設計,證書香港,證書報價,證書速印,證書少量印刷,學校證書,公司證書',
    'en': 'certificate printing,graduation certificates,award certificates,honor certificates,completion certificates,certificate design,certificates hong kong,certificate quote,certificate printing service,custom certificates,school certificates,diploma printing',
    'ja': '賞状印刷,卒業証書,表彰状,栄誉賞状,修了証書,賞状デザイン,賞状香港,賞状見積もり,賞状印刷サービス,オーダーメイド賞状,学校賞状,卒業証書印刷',
  },
  'exercise-books': {
    'zh-hk': '練習簿印刷,學生練習簿,作業簿印刷,學校簿册,練習簿訂造,練習簿設計,練習簿香港,練習簿報價,練習簿速印,練習簿少量印刷,印刷練習簿,定制練習簿,學校練習簿',
    'en': 'exercise book printing,student exercise books,workbook printing,school exercise books,custom exercise books,exercise book design,exercise books hong kong,exercise book quote,exercise book printing service,printed exercise books,school workbooks',
    'ja': '練習帳印刷,生徒用練習帳,ワークブック印刷,学校用練習帳,カスタム練習帳,練習帳デザイン,練習帳香港,練習帳見積もり,練習帳印刷サービス,学校ワークブック',
  },
  'school-flyers': {
    'zh-hk': '學校單張印刷,學校宣傳單張,教育機構傳單,招生單張,校園宣傳單,學校活動傳單,學校單張設計,學校單張香港,學校單張報價,學校單張速印,學校單張少量印刷,補習社傳單,學校通告印刷',
    'en': 'school flyer printing,school flyers,educational flyers,student recruitment flyers,campus flyers,school event flyers,school flyer design,school flyers hong kong,school flyer quote,school flyer printing service,tuition center flyers,school notice printing',
    'ja': '学校チラシ印刷,学校案内チラシ,教育機関チラシ,生徒募集チラシ,キャンパスチラシ,学校イベントチラシ,学校チラシデザイン,学校チラシ香港,学校チラシ見積もり',
  },
  'textbooks': {
    'zh-hk': '課本印刷,教科書印刷,教材印刷,學校課本,課本制作,課本訂造,課本設計,課本香港,課本報價,課本速印,課本少量印刷,印刷課本,定制課本,補充練習印刷',
    'en': 'textbook printing,school textbook printing,educational material printing,custom textbooks,textbook design,textbooks hong kong,textbook quote,textbook printing service,printed textbooks,workbook printing,supplementary exercise printing',
    'ja': '教科書印刷,学校教科書印刷,教材印刷,カスタム教科書,教科書デザイン,教科書香港,教科書見積もり,教科書印刷サービス,ワークブック印刷,補助教材印刷',
  },

  // === ENVELOPES ===
  'large-envelopes': {
    'zh-hk': '大型信封印刷,大信封訂造,A4信封,文件信封印刷,大碼信封,大型公文封,大信封設計,大信封香港,大信封報價,大信封速印,大信封少量印刷,商業大信封,牛皮大信封',
    'en': 'large envelope printing,custom large envelopes,A4 envelopes,document envelopes,big envelopes,large business envelopes,large envelope design,large envelopes hong kong,large envelope quote,large envelope printing service,commercial large envelopes,kraft large envelopes',
    'ja': '大判封筒印刷,大きい封筒,A4封筒,書類封筒印刷,ビッグ封筒,大型ビジネス封筒,大判封筒デザイン,大判封筒香港,大判封筒見積もり,大判封筒印刷サービス',
  },
  'pearl-envelopes': {
    'zh-hk': '珠光信封印刷,珍珠紙信封,珠光紙信封,閃亮信封,高貴信封印刷,珠光信封訂造,珠光信封設計,珠光信封香港,珠光信封報價,珠光信封速印,珠光信封少量印刷,喜帖信封,邀請函信封',
    'en': 'pearl envelope printing,pearl paper envelopes,shimmer envelopes,luxury pearl envelopes,metallic pearl envelopes,pearl envelope design,pearl envelopes hong kong,pearl envelope quote,pearl envelope printing service,pearl finish envelopes,wedding invitation envelopes',
    'ja': 'パール封筒印刷,パール紙封筒,キラキラ封筒,高級パール封筒,メタリックパール封筒,パール封筒デザイン,パール封筒香港,パール封筒見積もり,パール封筒印刷サービス',
  },

  // === FLYERS ===
  'folded-leaflets': {
    'zh-hk': '摺疊傳單印刷,摺頁傳單,對摺傳單,三摺頁印刷,四摺傳單,Z形摺傳單,門摺傳單,摺疊傳單設計,摺疊傳單香港,摺疊傳單報價,摺疊傳單速印,摺疊傳單少量印刷,宣傳摺頁',
    'en': 'folded leaflet printing,folded flyers,folded brochures,bi fold leaflets,tri fold leaflets,quad fold leaflets,z fold leaflets,gate fold leaflets,folded leaflet design,folded leaflets hong kong,folded leaflet quote,folded leaflet printing service',
    'ja': '折りたたみチラシ印刷,折りパンフレット,二つ折りチラシ,三つ折りパンフレット,四つ折りチラシ,Z折りチラシ,折りたたみチラシデザイン,折りたたみチラシ香港,折りたたみチラシ見積もり',
  },

  // === MENUS ===
  'disposable-menus': {
    'zh-hk': '即棄餐牌印刷,一次性餐牌,即棄菜單,紙質餐牌印刷,即棄餐牌訂造,即棄餐牌設計,即棄餐牌香港,即棄餐牌報價,即棄餐牌速印,即棄餐牌少量印刷,餐廳即棄餐牌,外賣餐牌印刷',
    'en': 'disposable menu printing,disposable menus,one time use menus,paper menus printing,temporary menus,disposable menu design,disposable menus hong kong,disposable menu quote,disposable menu printing service,restaurant disposable menus,takeaway menu printing',
    'ja': '使い捨てメニュー印刷,使い捨てメニュー,ワンタイムメニュー,紙メニュー印刷,使い捨てメニューデザイン,使い捨てメニュー香港,使い捨てメニュー見積もり,レストラン使い捨てメニュー',
  },
  'drink-menus': {
    'zh-hk': '飲品餐牌印刷,酒水單印刷,飲料菜單,酒吧餐牌,咖啡店餐牌,茶餐廳餐牌,飲品餐牌設計,飲品餐牌香港,飲品餐牌報價,飲品餐牌速印,飲品餐牌少量印刷,雞尾酒餐牌,特色飲品餐牌',
    'en': 'drink menu printing,drink menus,beverage menu printing,bar menus,cafe menus,tea restaurant menus,drink menu design,drink menus hong kong,drink menu quote,drink menu printing service,cocktail menus,signature drink menus',
    'ja': 'ドリンクメニュー印刷,飲み物メニュー,ドリンクメニュー,バーメニュー,カフェメニュー,ドリンクメニューデザイン,ドリンクメニュー香港,ドリンクメニュー見積もり,カクテルメニュー',
  },

  // === PACKAGING ===
  'cosmetic-boxes': {
    'zh-hk': '化妝品盒印刷,護膚品包裝盒,彩妝盒印刷,美容產品包裝,化妝品盒訂造,化妝品盒設計,化妝品盒香港,化妝品盒報價,化妝品盒速印,化妝品盒少量印刷,精緻化妝品盒,品牌化妝品盒',
    'en': 'cosmetic box printing,skincare packaging boxes,makeup box printing,beauty product packaging,custom cosmetic boxes,cosmetic box design,cosmetic boxes hong kong,cosmetic box quote,cosmetic box printing service,premium cosmetic boxes,branded cosmetic packaging',
    'ja': '化粧品箱印刷,スキンケアパッケージ箱,メイクボックス印刷,美容製品パッケージ,カスタム化粧品箱,化粧品箱デザイン,化粧品箱香港,化粧品箱見積もり',
  },
  'folding-boxes': {
    'zh-hk': '摺盒印刷,摺疊盒制作,平摺盒印刷,卡紙摺盒,自動摺盒,摺盒包裝,摺盒訂造,摺盒設計,摺盒香港,摺盒報價,摺盒速印,摺盒少量印刷,產品摺盒,禮品摺盒',
    'en': 'folding box printing,foldable boxes,carton folding boxes,cardboard folding boxes,auto lock boxes,folding packaging,folding box design,folding boxes hong kong,folding box quote,folding box printing service,product folding boxes,gift folding boxes',
    'ja': '組み立て箱印刷,折りたたみ箱,カートン折りたたみ箱,段ボール折りたたみ箱,自動ロック箱,折りたたみパッケージ,折りたたみ箱デザイン,折りたたみ箱香港,折りたたみ箱見積もり',
  },
  'food-boxes': {
    'zh-hk': '食品盒印刷,食物包裝盒,餐盒印刷,外賣盒印刷,食品級包裝盒,食品盒訂造,食品盒設計,食品盒香港,食品盒報價,食品盒速印,食品盒少量印刷,烘焙包裝盒,甜品盒印刷',
    'en': 'food box printing,food packaging boxes,meal box printing,takeaway box printing,food grade packaging,custom food boxes,food box design,food boxes hong kong,food box quote,food box printing service,bakery packaging boxes,dessert box printing',
    'ja': '食品箱印刷,食品パッケージ箱,弁当箱印刷,テイクアウト箱印刷,食品級パッケージ,カスタム食品箱,食品箱デザイン,食品箱香港,食品箱見積もり,ベーカリーパッケージ箱,デザート箱印刷',
  },
  'gift-boxes': {
    'zh-hk': '禮品盒印刷,禮物盒制作,精美禮盒,禮盒包裝印刷,禮品盒訂造,禮品盒設計,禮品盒香港,禮品盒報價,禮品盒速印,禮品盒少量印刷,高檔禮品盒,品牌禮盒,節日禮盒',
    'en': 'gift box printing,present boxes,luxury gift boxes,gift packaging printing,custom gift boxes,gift box design,gift boxes hong kong,gift box quote,gift box printing service,premium gift boxes,branded gift boxes,festival gift boxes',
    'ja': 'ギフトボックス印刷,プレゼント箱,高級ギフトボックス,ギフトパッケージ印刷,カスタムギフトボックス,ギフトボックスデザイン,ギフトボックス香港,ギフトボックス見積もり',
  },
  'mailer-boxes': {
    'zh-hk': '飛機盒印刷,快遞盒印刷,郵寄盒制作,瓦通紙盒,電商包裝盒,飛機盒訂造,飛機盒設計,飛機盒香港,飛機盒報價,飛機盒速印,飛機盒少量印刷,包裝飛機盒,定制快遞盒',
    'en': 'mailer box shipping boxes,corrugated mailer boxes,ecommerce packaging boxes,custom mailer boxes,mailer box design,mailer boxes hong kong,mailer box quote,mailer box printing service,branded shipping boxes,subscription box printing,product mailer boxes',
    'ja': 'メーラーボックス印刷,配送用箱,段ボールメーラーボックス,ECパッケージ箱,カスタムメーラーボックス,メーラーボックスデザイン,メーラーボックス香港,メーラーボックス見積もり',
  },
  'rigid-boxes': {
    'zh-hk': '硬盒印刷,精裝盒制作,硬紙盒包裝,禮品硬盒,高檔硬盒印刷,硬盒訂造,硬盒設計,硬盒香港,硬盒報價,硬盒速印,硬盒少量印刷,天地蓋硬盒,書型硬盒,抽屜硬盒',
    'en': 'rigid box printing,rigid boxes,luxury rigid packaging,premium rigid boxes,setup boxes,rigid box design,rigid boxes hong kong,rigid box quote,rigid box printing service,gift rigid boxes,telescope rigid boxes,book style rigid boxes,drawer rigid boxes',
    'ja': '化粧箱印刷,リジッドボックス,高級リジッドパッケージ,プレミアムリジッドボックス,セットアップボックス,リジッドボックスデザイン,リジッドボックス香港,リジッドボックス見積もり',
  },

  // === PAPER BAGS ===
  'eco-paper-bags': {
    'zh-hk': '環保紙袋印刷,再生紙袋,環保購物袋,綠色紙袋,FSC紙袋,環保紙袋訂造,環保紙袋設計,環保紙袋香港,環保紙袋報價,環保紙袋速印,環保紙袋少量印刷,可持續紙袋,環保手提袋',
    'en': 'eco paper bags,recycled paper bags,environmentally friendly paper bags,green paper bags,FSC paper bags,custom eco paper bags,eco paper bag design,eco paper bags hong kong,eco paper bag quote,eco paper bag printing service,sustainable paper bags,eco friendly shopping bags',
    'ja': 'エコ紙袋印刷,再生紙袋,環境に優しい紙袋,エコ紙袋,FSC紙袋,カスタムエコ紙袋,エコ紙袋デザイン,エコ紙袋香港,エコ紙袋見積もり',
  },
  'gift-bags': {
    'zh-hk': '禮品紙袋印刷,禮物袋制作,精美禮品袋,節日禮品袋,禮品紙袋訂造,禮品紙袋設計,禮品紙袋香港,禮品紙袋報價,禮品紙袋速印,禮品紙袋少量印刷,高檔禮品袋,品牌禮品袋,生日禮品袋',
    'en': 'gift paper bags,present bags,luxury gift bags,festival gift bags,custom gift paper bags,gift bag design,gift bags hong kong,gift bag quote,gift bag printing service,premium gift bags,branded gift bags,birthday gift bags',
    'ja': 'ギフト紙袋印刷,プレゼント袋,高級ギフト袋,ギフト紙袋,カスタムギフト紙袋,ギフトバッグデザイン,ギフトバッグ香港,ギフトバッグ見積もり',
  },
  'large-bags': {
    'zh-hk': '大紙袋印刷,大型紙袋,加大紙袋,大碼購物袋,大紙袋訂造,大紙袋設計,大紙袋香港,大紙袋報價,大紙袋速印,大紙袋少量印刷,服裝大紙袋,禮品大紙袋,商業大紙袋',
    'en': 'large paper bags,big paper bags,oversized paper bags,large shopping bags,custom large paper bags,large bag design,large bags hong kong,large bag quote,large bag printing service,clothing large bags,gift large bags,commercial large bags',
    'ja': '大判紙袋印刷,大きい紙袋,オーバーサイズ紙袋,大判ショッピング袋,カスタム大判紙袋,大判バッグデザイン,大判バッグ香港,大判バッグ見積もり',
  },
  'small-bags': {
    'zh-hk': '小紙袋印刷,小型紙袋,迷你紙袋,精品小紙袋,小紙袋訂造,小紙袋設計,小紙袋香港,小紙袋報價,小紙袋速印,小紙袋少量印刷,飾品小紙袋,化妝品小紙袋,禮品小紙袋',
    'en': 'small paper bags,mini paper bags,tiny paper bags,small gift bags,custom small paper bags,small bag design,small bags hong kong,small bag quote,small bag printing service,jewelry small bags,cosmetic small bags,party favor bags',
    'ja': '小判紙袋印刷,小さい紙袋,ミニ紙袋,小判ギフト袋,カスタム小判紙袋,小判バッグデザイン,小判バッグ香港,小判バッグ見積もり',
  },
  'white-card-bags': {
    'zh-hk': '白卡紙袋印刷,白卡紙手挽袋,白卡紙購物袋,白色紙袋,白卡紙袋訂造,白卡紙袋設計,白卡紙袋香港,白卡紙袋報價,白卡紙袋速印,白卡紙袋少量印刷,高檔白卡紙袋,商業白卡紙袋',
    'en': 'white card paper bags,white paper bags,white kraft bags,white shopping bags,custom white paper bags,white bag design,white bags hong kong,white bag quote,white bag printing service,premium white paper bags,commercial white bags',
    'ja': '白卡紙袋印刷,白い紙袋,白クラフト袋,白ショッピング袋,カスタム白紙袋,白バッグデザイン,白バッグ香港,白バッグ見積もり',
  },

  // === POSTERS ===
  'art-posters': {
    'zh-hk': '藝術海報印刷,畫作海報,美術海報,展覽海報,藝術品複製,藝術海報訂造,藝術海報設計,藝術海報香港,藝術海報報價,藝術海報速印,藝術海報少量印刷,畫廊海報,攝影海報',
    'en': 'art poster printing,art prints,fine art posters,exhibition posters,art reproductions,custom art posters,art poster design,art posters hong kong,art poster quote,art poster printing service,gallery posters,photography posters',
    'ja': 'アートポスター印刷,アートプリント,美術ポスター,展覧会ポスター,美術品複製,カスタムアートポスター,アートポスターデザイン,アートポスター香港,アートポスター見積もり',
  },
  'display-posters': {
    'zh-hk': '展示海報印刷,展板海報,陳列海報,賣場海報,店內展示海報,展示海報訂造,展示海報設計,展示海報香港,展示海報報價,展示海報速印,展示海報少量印刷,零售展示海報,櫥窗海報',
    'en': 'display poster printing,display posters,retail display posters,store posters,shop display posters,custom display posters,display poster design,display posters hong kong,display poster quote,display poster printing service,visual merchandising posters,window display posters',
    'ja': 'ディスプレイポスター印刷,ディスプレイポスター,陳列ポスター,店舗ポスター,小売ディスプレイポスター,カスタムディスプレイポスター,ディスプレイポスターデザイン,ディスプレイポスター香港',
  },
  'outdoor-posters': {
    'zh-hk': '戶外海報印刷,防水海報,防曬海報,戶外廣告海報,大型戶外海報,戶外海報訂造,戶外海報設計,戶外海報香港,戶外海報報價,戶外海報速印,戶外海報少量印刷,街招海報,建築棚架海報',
    'en': 'outdoor poster printing,waterproof posters,weatherproof posters,outdoor advertising posters,large outdoor posters,custom outdoor posters,outdoor poster design,outdoor posters hong kong,outdoor poster quote,outdoor poster printing service,construction hoarding posters,street posters',
    'ja': '屋外ポスター印刷,防水ポスター,耐候性ポスター,屋外広告ポスター,大型屋外ポスター,カスタム屋外ポスター,屋外ポスターデザイン,屋外ポスター香港,屋外ポスター見積もり',
  },

  // === RED PACKETS ===
  'cartoon-red-packets': {
    'zh-hk': '卡通利是封印刷,Q版利是封,可愛利是封,動漫利是封,卡通紅包,卡通利是封訂造,卡通利是封設計,卡通利是封香港,卡通利是封報價,卡通利是封速印,卡通利是封少量印刷,生肖利是封,卡通人物利是封',
    'en': 'cartoon red packet printing,cute red packets,anime red packets,cartoon lai see packets,character red packets,custom cartoon red packets,cartoon red packet design,cartoon red packets hong kong,cartoon red packet quote,cartoon red packet printing service,zodiac red packets',
    'ja': 'キャラクター红包印刷,可愛い红包,アニメ红包,漫画红包,キャラクター红包,カスタムキャラクター红包,キャラクター红包デザイン,キャラクター红包香港,キャラクター红包見積もり',
  },
  'custom-red-packets': {
    'zh-hk': '定制利是封印刷,訂造利是封,個人化利是封,公司利是封,專屬利是封,定制利是封訂造,定制利是封設計,定制利是封香港,定制利是封報價,定制利是封速印,定制利是封少量印刷,品牌利是封,Logo利是封',
    'en': 'custom red packet printing,personalized red packets,custom lai see packets,company red packets,branded red packets,custom red packet design,custom red packets hong kong,custom red packet quote,custom red packet printing service,logo red packets,exclusive red packets',
    'ja': 'オーダーメイド红包印刷,パーソナライズ红包,カスタム红包,会社红包,ブランド红包,オーダーメイド红包デザイン,オーダーメイド红包香港,オーダーメイド红包見積もり',
  },
  'eco-red-packets': {
    'zh-hk': '環保利是封印刷,再生紙利是封,環保紅包,綠色利是封,FSC利是封,環保利是封訂造,環保利是封設計,環保利是封香港,環保利是封報價,環保利是封速印,環保利是封少量印刷,可持續利是封,環保材質利是封',
    'en': 'eco red packet printing,recycled paper red packets,eco friendly lai see packets,green red packets,sustainable red packets,eco red packet design,eco red packets hong kong,eco red packet quote,eco red packet printing service,FSC red packets,environmentally friendly red packets',
    'ja': 'エコ红包印刷,再生紙红包,エコ红包,グリーン红包,持続可能红包,エコ红包デザイン,エコ红包香港,エコ红包見積もり',
  },
  'embossed-red-packets': {
    'zh-hk': '凹凸利是封印刷,立體利是封,浮雕利是封,凹凸工藝利是封,立體燙金利是封,凹凸利是封訂造,凹凸利是封設計,凹凸利是封香港,凹凸利是封報價,凹凸利是封速印,凹凸利是封少量印刷,3D效果利是封,凹凸質感利是封',
    'en': 'embossed red packet printing,3d red packets,relief red packets,debossed red packets,embossed lai see packets,custom embossed red packets,embossed red packet design,embossed red packets hong kong,embossed red packet quote,embossed red packet printing service,luxury embossed red packets',
    'ja': 'エンボス红包印刷,立体红包,リリーフ红包,エンボス工芸红包,カスタムエンボス红包,エンボス红包デザイン,エンボス红包香港,エンボス红包見積もり',
  },
  'foil-red-packets': {
    'zh-hk': '燙金利是封印刷,金銀利是封,金箔利是封,奢華利是封,燙印利是封,燙金利是封訂造,燙金利是封設計,燙金利是封香港,燙金利是封報價,燙金利是封速印,燙金利是封少量印刷,高級燙金利是封,公司燙金利是封',
    'en': 'foil red packet printing,gold foil red packets,silver foil red packets,luxury lai see packets,foil stamped red packets,custom foil red packets,foil red packet design,foil red packets hong kong,foil red packet quote,foil red packet printing service,premium foil red packets',
    'ja': '箔押し红包印刷,ゴールド箔红包,シルバー箔红包,高級红包,箔押し红包,カスタム箔押し红包,箔押し红包デザイン,箔押し红包香港,箔押し红包見積もり',
  },
  'large-red-packets': {
    'zh-hk': '大號利是封印刷,大利是封,加大利是封,大碼利是封,大紅包,大號利是封訂造,大號利是封設計,大號利是封香港,大號利是封報價,大號利是封速印,大號利是封少量印刷,豪華大利是封,超大利是封',
    'en': 'large red packet printing,big red packets,oversized red packets,large lai see packets,jumbo red packets,custom large red packets,large red packet design,large red packets hong kong,large red packet quote,large red packet printing service,extra large red packets',
    'ja': '大判红包印刷,大きい红包,特大红包,大判红包,ジャンボ红包,カスタム大判红包,大判红包デザイン,大判红包香港,大判红包見積もり',
  },

  // === STICKERS ===
  'fluorescent-stickers': {
    'zh-hk': '螢光貼紙印刷,夜光貼紙,發光貼紙,霓虹貼紙,醒目貼紙,螢光貼紙訂造,螢光貼紙設計,螢光貼紙香港,螢光貼紙報價,螢光貼紙速印,螢光貼紙少量印刷,安全標示螢光貼,警示螢光貼紙',
    'en': 'fluorescent sticker printing,glow in the dark stickers,neon stickers,luminous stickers,high visibility stickers,custom fluorescent stickers,fluorescent sticker design,fluorescent stickers hong kong,fluorescent sticker quote,fluorescent sticker printing service,safety fluorescent stickers,warning glow stickers',
    'ja': '蛍光ステッカー印刷,蓄光ステッカー,ネオンステッカー,発光ステッカー,高視認性ステッカー,カスタム蛍光ステッカー,蛍光ステッカーデザイン,蛍光ステッカー香港,蛍光ステッカー見積もり',
  },
  'foil-stickers': {
    'zh-hk': '燙金貼紙印刷,金屬貼紙,金箔貼紙,銀箔貼紙,燙印貼紙,燙金貼紙訂造,燙金貼紙設計,燙金貼紙香港,燙金貼紙報價,燙金貼紙速印,燙金貼紙少量印刷,高級燙金貼紙,裝飾燙金貼紙',
    'en': 'foil sticker printing,metallic stickers,gold foil stickers,silver foil stickers,foil stamped stickers,custom foil stickers,foil sticker design,foil stickers hong kong,foil sticker quote,foil sticker printing service,premium foil stickers,decorative foil stickers',
    'ja': '箔押しステッカー印刷,メタリックステッカー,ゴールド箔ステッカー,シルバー箔ステッカー,箔押しステッカー,カスタム箔押しステッカー,箔押しステッカーデザイン,箔押しステッカー香港,箔押しステッカー見積もり',
  },
  'removable-stickers': {
    'zh-hk': '可移除貼紙印刷,易撕貼紙,無痕貼紙,重複使用貼紙,可再貼貼紙,可移除貼紙訂造,可移除貼紙設計,可移除貼紙香港,可移除貼紙報價,可移除貼紙速印,可移除貼紙少量印刷,不留膠貼紙,玻璃可移除貼',
    'en': 'removable sticker printing,reusable stickers,removable labels,peelable stickers,restickable stickers,custom removable stickers,removable sticker design,removable stickers hong kong,removable sticker quote,removable sticker printing service,no residue stickers,glass removable stickers',
    'ja': '剥がせるステッカー印刷,再利用ステッカー,剥がせるラベル,はがせるステッカー,カスタム剥がせるステッカー,剥がせるステッカーデザイン,剥がせるステッカー香港,剥がせるステッカー見積もり',
  },
  'small-batch-stickers': {
    'zh-hk': '小批量貼紙印刷,少量貼紙,小量貼紙訂造,低起訂量貼紙,少量貼紙印刷,小批量貼紙訂造,小批量貼紙設計,小批量貼紙香港,小批量貼紙報價,小批量貼紙速印,小批量貼紙少量印刷,10張貼紙,50張貼紙,試印貼紙',
    'en': 'small batch sticker printing,low quantity stickers,small quantity stickers,low minimum stickers,few stickers printing,custom small batch stickers,small batch sticker design,small batch stickers hong kong,small batch sticker quote,small batch sticker printing service,10 stickers,50 stickers,sample stickers',
    'ja': '小ロットステッカー印刷,少量ステッカー,小ロットステッカー,低ロットステッカー,小ロットステッカーデザイン,小ロットステッカー香港,小ロットステッカー見積もり,サンプルステッカー',
  },

  // === thick-business-cards-400g ===
  'thick-business-cards-400g': {
    'zh-hk': '400g厚咭片印刷,厚身名片,超厚名片,400克名片,厚紙名片印刷,厚咭片訂造,厚咭片設計,厚咭片香港,厚咭片報價,厚咭片速印,厚咭片少量印刷,高級厚咭片,400g咭片,厚身咭片印刷',
    'en': '400g business card printing,thick business cards,heavy business cards,400gsm business cards,ultra thick business cards,custom thick business cards,thick business card design,thick business cards hong kong,thick business card quote,thick business card printing service,premium thick business cards,400g card printing',
    'ja': '400g名刺印刷,厚紙名刺,ヘビー名刺,400gsm名刺,超厚紙名刺,カスタム厚紙名刺,厚紙名刺デザイン,厚紙名刺香港,厚紙名刺見積もり,厚紙名刺印刷サービス',
  },
};

let changes = 0;

for (const [slug, keywords] of Object.entries(keywordMap)) {
  // Find the product block start
  const productStartPattern = `'${slug}': {`;
  const startIdx = content.indexOf(productStartPattern);
  
  if (startIdx === -1) {
    console.log(`WARNING: Product '${slug}' not found`);
    continue;
  }
  
  // Find the end of this product block by counting braces
  let braceCount = 1;
  let endIdx = startIdx + productStartPattern.length;
  while (braceCount > 0 && endIdx < content.length) {
    if (content[endIdx] === '{') braceCount++;
    if (content[endIdx] === '}') braceCount--;
    endIdx++;
  }
  
  const oldProductBlock = content.substring(startIdx, endIdx);
  
  // Check if it has keywords
  if (!oldProductBlock.includes('keywords:')) {
    console.log(`WARNING: Product '${slug}' has no keywords field`);
    continue;
  }
  
  // Find keywords block within the product block
  const kwStartIdx = oldProductBlock.indexOf('keywords:');
  let kwBraceCount = 1;
  let kwEndIdx = oldProductBlock.indexOf('{', kwStartIdx) + 1;
  while (kwBraceCount > 0 && kwEndIdx < oldProductBlock.length) {
    if (oldProductBlock[kwEndIdx] === '{') kwBraceCount++;
    if (oldProductBlock[kwEndIdx] === '}') kwBraceCount--;
    kwEndIdx++;
  }
  
  const oldKeywordsBlock = oldProductBlock.substring(kwStartIdx, kwEndIdx);
  
  const newKeywordsBlock = `keywords: {
      'zh-hk': '${keywords['zh-hk']}',
      'en': '${keywords['en']}',
      'ja': '${keywords['ja']}',
    }`;
  
  const newProductBlock = oldProductBlock.replace(oldKeywordsBlock, newKeywordsBlock);
  
  if (newProductBlock === oldProductBlock) {
    console.log(`WARNING: Could not replace keywords for '${slug}'`);
    continue;
  }
  
  content = content.substring(0, startIdx) + newProductBlock + content.substring(endIdx);
  changes++;
  console.log(`Updated: ${slug}`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone! Updated ${changes} products.`);
