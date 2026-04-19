const fs = require('fs');
let content = fs.readFileSync('src/data/product-seo.ts', 'utf8');

const expansions = {
  'thick-business-cards-400g': {
    zh: '厚紙名片,400g名片,厚身名片,高級厚名片,厚卡名片,重型名片,厚咭片印刷',
    en: 'thick business cards,400gsm business cards,heavyweight business cards,premium thick cards,luxury thick business cards,extra thick name cards',
    ja: '厚紙名刺,400g名刺,heavyweight名刺,高級厚紙名刺,厚手名刺,エクストラ厚紙名刺',
  },
  'matte-business-cards': {
    zh: '啞膠名片,啞面名片,磨砂名片,質感名片,霧面名片,啞光名片印刷',
    en: 'matte business cards,matt laminated business cards,soft touch business cards,velvet business cards,satin finish cards,matt name cards',
    ja: 'マット名刺,マットラミネート名刺,ソフトタッチ名刺,ベルベット名刺,サテン仕上げ名刺',
  },
  'double-sided-cards': {
    zh: '雙面名片,雙面印刷名片,雙面彩色名片,雙面啞膠名片,雙面燙金名片',
    en: 'double sided business cards,two sided business cards,full color both sides business cards,duplex business cards,double sided name cards',
    ja: '両面名刺,両面印刷名刺,フルカラー両面名刺,両面マット名刺,両面箔押し名刺',
  },
  'same-day-business-cards': {
    zh: '即日名片,急印名片,24小時名片,當天名片,快印名片,即日取名片',
    en: 'same day business cards,24 hour business cards,rush business cards,express business cards,emergency business cards,next day business cards',
    ja: '即日名刺,24時間名刺,急行名刺,エクスプレス名刺,当日名刺,翌日名刺',
  },
  'eco-business-cards': {
    zh: '環保名片,再生紙名片,FSC名片,大豆油墨名片,綠色名片,可持續名片',
    en: 'eco friendly business cards,recycled paper business cards,FSC certified business cards,soy ink business cards,green business cards,sustainable name cards',
    ja: 'エコ名刺,再生紙名刺,FSC認証名刺,大豆インク名刺,グリーン名刺,持続可能名刺',
  },
  'rounded-corner-cards': {
    zh: '圓角名片,圓邊名片,R角名片,圓角啞膠名片,圓角燙金名片,時尚圓角名片',
    en: 'rounded corner business cards,round edge business cards,R corner business cards,rounded matte business cards,rounded foil business cards,modern rounded cards',
    ja: '丸角名刺,ラウンドエッジ名刺,Rコーナー名刺,丸角マット名刺,丸角箔押し名刺,モダン丸角名刺',
  },
  'removable-stickers': {
    zh: '可移除貼紙,易撕貼紙,不留痕貼紙,重複使用貼紙,可再貼貼紙,牆身可移除貼紙',
    en: 'removable stickers,repositionable stickers,removable labels,peel and stick labels,reusable stickers,wall safe stickers,removable wall decals',
    ja: '剥がせるシール,再貼付シール,リムーバブルラベル,ピールアンドスティック,再利用可能シール,壁用剥がせるシール',
  },
  'small-batch-stickers': {
    zh: '小批量貼紙,少量貼紙,50張貼紙,小量貼紙印刷,打樣貼紙,測試貼紙',
    en: 'small batch stickers,low quantity stickers,50 piece stickers,small run sticker printing,sticker prototypes,test stickers,short run stickers',
    ja: '小ロットシール,少量シール,50枚シール,小ロットシール印刷,サンプルシール,テストシール',
  },
  'die-cut-stickers': {
    zh: '異形貼紙,模切貼紙,特殊形狀貼紙,自定義形狀貼紙,任意形狀貼紙,logo形狀貼紙',
    en: 'die cut stickers,custom shaped stickers,irregular shape stickers,any shape stickers,logo shaped stickers,precut stickers,kiss cut stickers',
    ja: 'ダイカットシール,自由形状シール,特殊形状シール,カスタム形状シール,ロゴ型シール,プレカットシール,キスカットシール',
  },
  'foil-stickers': {
    zh: '燙金貼紙,金箔貼紙,銀箔貼紙,金屬貼紙,燙銀貼紙,玫瑰金貼紙,奢華燙金貼紙',
    en: 'foil stickers,gold foil stickers,silver foil stickers,metallic stickers,rose gold stickers,holographic foil stickers,luxury foil labels',
    ja: '箔押しシール,ゴールド箔シール,シルバー箔シール,メタリックシール,ローズゴールドシール,ホログラム箔シール,高級箔押しシール',
  },
  'security-stickers': {
    zh: '防偽貼紙,防拆貼紙,易碎貼紙,保修貼紙,防偽標籤,防篡改貼紙,VOID貼紙',
    en: 'security stickers,tamper evident stickers,warranty labels,void stickers,anti counterfeit labels,seal stickers,tamper proof stickers,hologram security labels',
    ja: 'セキュリティシール,改ざん防止シール,保証シール,VOIDシール,偽造防止ラベル,封印シール,改ざん証明シール,ホログラムセキュリティシール',
  },
  'fluorescent-stickers': {
    zh: '螢光貼紙,夜光貼紙,發光貼紙,霓虹貼紙,反光貼紙,高可見度貼紙,安全警示貼紙',
    en: 'fluorescent stickers,neon stickers,glow in the dark stickers,reflective stickers,high visibility stickers,safety warning stickers,luminous labels',
    ja: '蛍光シール,ネオンシール,蓄光シール,反射シール,高視認性シール,安全警告シール,発光ラベル',
  },
  'white-card-bags': {
    zh: '白卡紙袋,白色紙袋,白底紙袋,高檔白紙袋,白卡手提袋,白卡禮品袋',
    en: 'white card paper bags,white paper bags,white kraft bags,premium white bags,white handle bags,white gift bags,luxury white paper bags',
    ja: '白カード紙袋,白紙袋,白クラフト袋,高級白袋,白手提げ袋,白ギフト袋,豪華白紙袋',
  },
  'gift-bags': {
    zh: '禮品紙袋,禮物紙袋,高檔禮品袋,節日禮品袋,生日禮物袋,婚禮紙袋,聖誕禮品袋',
    en: 'gift paper bags,present bags,luxury gift bags,festival gift bags,birthday gift bags,wedding paper bags,christmas gift bags,premium gift bags',
    ja: 'ギフト紙袋,プレゼント袋,高級ギフト袋,フェスティバルギフト袋,誕生日ギフト袋,結婚式紙袋,クリスマスギフト袋,プレミアムギフト袋',
  },
  'handle-bags': {
    zh: '手提紙袋,有提手紙袋,繩柄紙袋,棉繩紙袋,紙繩紙袋,尼龍繩紙袋,絲帶紙袋',
    en: 'handle paper bags,paper bags with handles,rope handle bags,cotton rope paper bags,twisted handle bags,nylon handle bags,ribbon handle bags',
    ja: '手提げ紙袋,持ち手付き紙袋,紐付き紙袋,綿紐紙袋,ツイストハンドル袋,ナイロン持ち手袋,リボン持ち手袋',
  },
  'small-bags': {
    zh: '小號紙袋,小型紙袋,迷你紙袋,小尺寸紙袋,精品小紙袋,飾品紙袋',
    en: 'small paper bags,mini paper bags,tiny gift bags,small size paper bags,petite paper bags,jewelry paper bags,compact paper bags',
    ja: '小さな紙袋,ミニ紙袋,タイニーギフト袋,小サイズ紙袋,プチ紙袋,アクセサリー紙袋,コンパクト紙袋',
  },
  'large-bags': {
    zh: '大號紙袋,大型紙袋,加大紙袋,大尺寸紙袋,購物大紙袋,服裝紙袋',
    en: 'large paper bags,big paper bags,oversized paper bags,large size paper bags,shopping paper bags,garment paper bags,jumbo paper bags',
    ja: '大きな紙袋,ビッグ紙袋,特大紙袋,大サイズ紙袋,ショッピング紙袋,衣料紙袋,ジャンボ紙袋',
  },
  'a5-flyers': {
    zh: 'A5宣傳單張,A5傳單,A5單張印刷,A5雙面傳單,A5摺頁,A5宣傳單',
    en: 'a5 flyers,a5 leaflet printing,a5 flyers printing,a5 double sided flyers,a5 folded leaflets,a5 promotional flyers,a5 marketing flyers',
    ja: 'A5チラシ,A5リーフレット印刷,A5チラシ印刷,A5両面チラシ,A5折りパンフレット,A5宣伝チラシ,A5マーケティングチラシ',
  },
  'double-sided-flyers': {
    zh: '雙面傳單,雙面單張,雙面印刷傳單,雙面彩色傳單,雙面宣傳單,兩面印刷單張',
    en: 'double sided flyers,two sided flyers,duplex flyers,double sided leaflet printing,double sided promotional flyers,full color both sides flyers',
    ja: '両面チラシ,両面印刷チラシ,両面リーフレット,両面宣伝チラシ,フルカラー両面チラシ,両面マーケティングチラシ',
  },
  'thick-paper-flyers': {
    zh: '厚紙傳單,厚身宣傳單,高級傳單,厚卡傳單,重磅傳單,厚質宣傳單',
    en: 'thick paper flyers,heavyweight flyers,premium flyers,thick card flyers,heavy stock flyers,high quality flyers,luxury flyers',
    ja: '厚紙チラシ,厚手チラシ,高級チラシ,厚カードチラシ,ヘビーストックチラシ,高品質チラシ,豪華チラシ',
  },
  'same-day-flyers': {
    zh: '即日傳單,急印傳單,24小時傳單,當天傳單,快印傳單,即日宣傳單',
    en: 'same day flyers,24 hour flyers,rush flyer printing,express flyers,emergency flyers,next day flyers,urgent flyer printing',
    ja: '即日チラシ,24時間チラシ,急行チラシ印刷,エクスプレスチラシ,緊急チラシ,翌日チラシ,至急チラシ印刷',
  },
  'eco-flyers': {
    zh: '環保傳單,再生紙傳單,FSC傳單,大豆油墨傳單,綠色傳單,可持續傳單',
    en: 'eco friendly flyers,recycled paper flyers,FSC certified flyers,soy ink flyers,green flyers,sustainable flyers,environmentally friendly leaflets',
    ja: 'エコチラシ,再生紙チラシ,FSC認証チラシ,大豆インクチラシ,グリーンチラシ,持続可能チラシ,環境に優しいリーフレット',
  },
  'a2-posters': {
    zh: 'A2海報,A2尺寸海報,A2海報印刷,A2活動海報,A2宣傳海報,A2展覽海報',
    en: 'a2 posters,a2 size posters,a2 poster printing,a2 event posters,a2 promotional posters,a2 exhibition posters,large format a2 posters',
    ja: 'A2ポスター,A2サイズポスター,A2ポスター印刷,A2イベントポスター,A2宣伝ポスター,A2展示ポスター,大判A2ポスター',
  },
  'display-posters': {
    zh: '展示海報,展架海報,易拉架海報,X展架海報,落地海報,立式海報',
    en: 'display posters,stand posters,roll up poster displays,x-banner posters,floor standing posters,vertical posters,retail display posters',
    ja: '展示用ポスター,スタンドポスター,ロールアップディスプレイ,Xバナーポスター,床置きポスター,縦型ポスター,小売展示ポスター',
  },
  'art-posters': {
    zh: '藝術海報,畫作海報,攝影海報,裝飾海報,家居海報,畫廊海報,限量海報',
    en: 'art posters,fine art posters,photography posters,decorative posters,home decor posters,gallery posters,limited edition posters,art print posters',
    ja: 'アートポスター,美術ポスター,写真ポスター,装飾ポスター,インテリアポスター,ギャラリーポスター,限定版ポスター,アートプリントポスター',
  },
  'adhesive-posters': {
    zh: '背膠海報,自粘海報,粘貼海報,牆身海報,玻璃海報,可移除背膠海報',
    en: 'adhesive posters,self adhesive posters,sticky back posters,wall posters,window posters,removable adhesive posters,peel and stick posters',
    ja: '粘着ポスター,自己粘着ポスター,粘着バックポスター,壁用ポスター,窓用ポスター,剥がせる粘着ポスター,ピールアンドスティックポスター',
  },
  'mailer-boxes': {
    zh: '飛機盒,快遞盒,郵寄盒,電商包裝盒,發貨盒,瓦楞紙盒,物流包裝盒',
    en: 'mailer boxes,shipping boxes,corrugated mailer boxes,ecommerce packaging boxes,dispatch boxes,subscription boxes,custom mailer boxes,retail shipping boxes',
    ja: 'メーラーボックス,配送用箱,段ボールメーラー,EC梱包箱,発送箱,サブスクリプションボックス,カスタムメーラー,小売配送箱',
  },
  'folding-boxes': {
    zh: '折疊盒,組裝盒,平攤盒,摺盒,手工盒,禮品折疊盒',
    en: 'folding boxes,foldable boxes,collapsible boxes,folding gift boxes,fold up boxes,flat pack boxes,diy assembly boxes',
    ja: '組み立て箱,折りたたみ箱,折り畳み箱,組み立てギフト箱,フラットパック箱,DIY組み立て箱',
  },
  'rigid-boxes': {
    zh: '硬盒,精裝盒,天地蓋盒,書型盒,磁吸盒,高檔硬盒,奢侈品包裝盒',
    en: 'rigid boxes,rigid gift boxes,set up boxes,top bottom boxes,book style boxes,magnetic closure boxes,luxury rigid boxes,premium packaging boxes',
    ja: '化粧箱,硬質箱,セットアップボックス,天地蓋箱,ブック型箱,マグネット閉鎖箱,高級化粧箱,プレミアム梱包箱',
  },
  'foil-red-packets': {
    zh: '燙金利是封,金箔利是封,高級利是封,豪華利是封,燙銀利是封,立體利是封',
    en: 'foil red packets,gold foil red envelopes,luxury red packets,premium red envelopes,embossed red packets,chinese new year red envelopes,hong bao printing',
    ja: '箔押しポチ袋,ゴールド箔ポチ袋,高級ポチ袋,豪華ポチ袋,エンボスポチ袋,旧正月ポチ袋,紅包印刷',
  },
  'embossed-red-packets': {
    zh: '凹凸利是封,壓紋利是封,浮雕利是封,立體壓紋利是封,質感利是封,觸感利是封',
    en: 'embossed red packets,debossed red envelopes,textured red packets,3d embossed red packets,tactile red envelopes,raised pattern red packets',
    ja: 'エンボスポチ袋,デボスポチ袋,テクスチャポチ袋,3Dエンボスポチ袋,触感触感ポチ袋,浮き彫りポチ袋',
  },
  'custom-red-packets': {
    zh: '定制利是封,公司利是封,品牌利是封,企業利是封,logo利是封,專屬利是封',
    en: 'custom red packets,corporate red envelopes,branded red packets,company red envelopes,logo red packets,personalized red envelopes,bespoke red packets',
    ja: 'オーダーメイドポチ袋,会社用ポチ袋,ブランドポチ袋,企業ポチ袋,ロゴポチ袋,パーソナライズポチ袋,特注ポチ袋',
  },
  'cartoon-red-packets': {
    zh: '卡通利是封,可愛利是封,動漫利是封,兒童利是封,生肖利是封,主題利是封',
    en: 'cartoon red packets,cute red envelopes,anime red packets,kids red envelopes,zodiac red packets,character red packets,themed red envelopes',
    ja: 'カートゥーンポチ袋,かわいいポチ袋,アニメポチ袋,子供用ポチ袋,干支ポチ袋,キャラクターポチ袋,テーマポチ袋',
  },
  'eco-red-packets': {
    zh: '環保利是封,再生紙利是封,FSC利是封,綠色利是封,可持續利是封,環保紅包',
    en: 'eco red packets,recycled paper red envelopes,FSC red packets,green red envelopes,sustainable red envelopes,environmentally friendly red packets',
    ja: 'エコポチ袋,再生紙ポチ袋,FSC認証ポチ袋,グリーンポチ袋,持続可能ポチ袋,環境に優しいポチ袋',
  },
  'large-red-packets': {
    zh: '大號利是封,大型利是封,加大利是封,厚款利是封,豪華大紅包,超大利是封',
    en: 'large red packets,big red envelopes,oversized red packets,thick red packets,luxury big red packets,jumbo red envelopes,extra large red packets',
    ja: '大きなポチ袋,ビッグポチ袋,特大ポチ袋,厚手ポチ袋,豪華大ポチ袋,ジャンボポチ袋,エクストララージポチ袋',
  },
  'wall-calendars': {
    zh: '掛牆年曆,壁掛曆,月曆,掛曆,年曆印刷,企業年曆,品牌年曆',
    en: 'wall calendars,custom wall calendars,hanging calendars,monthly calendars,company calendars,branded calendars,promotional wall calendars,office wall calendars',
    ja: '壁掛けカレンダー,カスタム壁掛けカレンダー,掛け曆,月間カレンダー,会社カレンダー,ブランドカレンダー,販促壁掛けカレンダー,オフィス壁掛けカレンダー',
  },
  'desk-calendars': {
    zh: '座檯曆,桌曆,枱曆,三角桌曆,立式桌曆,辦公桌曆,企業桌曆',
    en: 'desk calendars,table calendars,tent calendars,triangle desk calendars,standing desk calendars,office desk calendars,corporate desk calendars,desktop calendars',
    ja: '卓上カレンダー,テーブルカレンダー,テントカレンダー,三角卓上カレンダー,自立型卓上カレンダー,オフィス卓上カレンダー,企業卓上カレンダー,デスクトップカレンダー',
  },
  'custom-calendars': {
    zh: '定制年曆,專屬年曆,個人化年曆,訂造年曆,公司年曆,禮品年曆',
    en: 'custom calendars,personalized calendars,bespoke calendars,made to order calendars,company calendars,gift calendars,custom photo calendars',
    ja: 'オーダーメイドカレンダー,パーソナライズカレンダー,特注カレンダー,オーダーカレンダー,会社カレンダー,ギフトカレンダー,カスタムフォトカレンダー',
  },
  'mini-calendars': {
    zh: '迷你年曆,小型年曆,袖珍年曆,口袋年曆,卡片年曆,便攜年曆',
    en: 'mini calendars,small calendars,pocket calendars,card calendars,portable calendars,compact calendars,mini desk calendars,travel calendars',
    ja: 'ミニカレンダー,小さなカレンダー,ポケットカレンダー,カードカレンダー,ポータブルカレンダー,コンパクトカレンダー,ミニ卓上カレンダー,トラベルカレンダー',
  },
  'photo-frame-calendars': {
    zh: '相框年曆,照片年曆,圖片年曆,紀念年曆,家庭年曆,寶寶年曆,婚紗年曆',
    en: 'photo frame calendars,picture calendars,photo calendars,memorial calendars,family calendars,baby calendars,wedding photo calendars,custom photo calendars',
    ja: 'フォトフレームカレンダー,写真カレンダー,ピクチャーカレンダー,記念カレンダー,家族カレンダー,ベビーカレンダー,ウエディングフォトカレンダー,カスタムフォトカレンダー',
  },
  'magnetic-calendars': {
    zh: '磁石年曆,冰箱貼年曆,磁吸年曆,貼牆年曆,磁性月曆,便利年曆',
    en: 'magnetic calendars,fridge magnet calendars,magnetic wall calendars,sticky back calendars,magnetic monthly calendars,convenient calendars,refrigerator calendars',
    ja: 'マグネットカレンダー,冷蔵庫マグネットカレンダー,磁気壁掛けカレンダー,粘着カレンダー,マグネット月間カレンダー,便利カレンダー,冷蔵庫カレンダー',
  },
  'pvc-menus': {
    zh: 'PVC餐牌,膠質餐牌,防水餐牌,耐用餐牌,塑膠餐牌,硬膠餐牌,餐廳膠牌',
    en: 'pvc menus,plastic menus,waterproof menus,durable menus,vinyl menus,rigid plastic menus,restaurant pvc menus,wipeable menus',
    ja: 'PVCメニュー,プラスチックメニュー,防水メニュー,耐久メニュー,ビニールメニュー,硬質プラスチックメニュー,飲食店PVCメニュー,拭けるメニュー',
  },
  'laminated-menus': {
    zh: '過膠餐牌,護貝餐牌,過塑餐牌,防水過膠餐牌,啞膠餐牌,光膠餐牌,厚身餐牌',
    en: 'laminated menus,encapsulated menus,sealed menus,waterproof laminated menus,matte laminated menus,gloss laminated menus,thick laminated menus',
    ja: 'ラミネートメニュー,カプセル化メニュー,密封メニュー,防水ラミネートメニュー,マットラミネートメニュー,グロスラミネートメニュー,厚手ラミネートメニュー',
  },
  'hardcover-menus': {
    zh: '硬皮餐牌,精裝餐牌,高級餐牌,皮面餐牌,硬殼餐牌,厚板餐牌,豪華餐牌',
    en: 'hardcover menus,premium menus,luxury menus,leather bound menus,rigid menu boards,thick board menus,deluxe menus,high end restaurant menus',
    ja: 'ハードカバーメニュー,高級メニュー,豪華メニュー,革装丁メニュー,硬質メニューボード,厚板メニュー,デラックスメニュー,高級飲食店メニュー',
  },
  'drink-menus': {
    zh: '酒水單,飲品餐牌,酒吧餐牌,咖啡餐牌,茶餐牌,雞尾酒單,特飲餐牌',
    en: 'drink menus,beverage menus,bar menus,coffee menus,tea menus,cocktail menus,specialty drink menus,alcohol menus,soft drink menus',
    ja: 'ドリンクメニュー,飲み物メニュー,バーメニュー,コーヒーメニュー,ティーメニュー,カクテルメニュー,特製ドリンクメニュー,アルコールメニュー,ソフトドリンクメニュー',
  },
  'disposable-menus': {
    zh: '一次性餐牌,即棄餐牌,紙質餐牌,薄紙餐牌,單次餐牌,臨時餐牌,活動餐牌',
    en: 'disposable menus,single use menus,paper menus,thin paper menus,one time menus,temporary menus,event menus,cheap disposable menus',
    ja: '使い捨てメニュー,ワンタイムメニュー,紙メニュー,薄紙メニュー,一回限りメニュー,臨時メニュー,イベントメニュー,安い使い捨てメニュー',
  },
  'outdoor-vinyl-banners': {
    zh: '戶外橫額,戶外banner,防水橫額,防曬banner,大型戶外橫額,建築地盤橫額,戶外廣告牌',
    en: 'outdoor vinyl banners,outdoor banners,waterproof banners,uv resistant banners,large outdoor banners,construction site banners,outdoor advertising banners,weatherproof banners',
    ja: '屋外ビニールバナー,屋外バナー,防水バナー,耐UVバナー,大型屋外バナー,建設現場バナー,屋外広告バナー,耐候性バナー',
  },
  'roll-up-banners': {
    zh: '易拉架,易拉寶,拉架,伸縮橫額,便攜橫額,活動易拉架,展覽易拉架',
    en: 'roll up banners,roll up stands,retractable banners,pull up banners,portable banners,event roll up banners,exhibition roll up stands,pop up banners',
    ja: 'ロールアップバナー,ロールアップスタンド,伸縮バナー,プルアップバナー,ポータブルバナー,イベントロールアップバナー,展示会ロールアップスタンド,ポップアップバナー',
  },
  'adhesive-banners': {
    zh: '背膠橫額,自粘橫額,貼紙橫額,牆身橫額,玻璃橫額,可移除橫額,車身橫額',
    en: 'adhesive banners,self adhesive banners,sticker banners,wall banners,window banners,removable banners,vehicle banners,peel and stick banners',
    ja: '粘着バナー,自己粘着バナー,ステッカーバナー,壁用バナー,窓用バナー,剥がせるバナー,車用バナー,ピールアンドスティックバナー',
  },
  'vehicle-wraps': {
    zh: '車身貼,車身廣告,汽車貼紙,的士廣告,貨車廣告,巴士廣告,車身包膜,車身噴畫',
    en: 'vehicle wraps,car wraps,vehicle graphics,taxi advertising,truck advertising,bus advertising,vehicle decals,car wrapping film,fleet wraps',
    ja: '車両ラップ,カーラッピング,車両グラフィック,タクシー広告,トラック広告,バス広告,車両デカール,カーラッピングフィルム,フリートラップ',
  },
  'mesh-banners': {
    zh: '網孔橫額,透風橫額,網眼橫額,防風橫額,建築圍板,工地圍網,圍欄橫額',
    en: 'mesh banners,perforated banners,windproof banners,construction fence banners,building site banners,scaffold banners,wind mesh banners,airflow banners',
    ja: 'メッシュバナー,パンチングバナー,防風バナー,建設フェンスバナー,建設現場バナー,足場バナー,ウィンドメッシュバナー,通気性バナー',
  },
  'catalog-printing': {
    zh: '目錄印刷,產品目錄,公司目錄,商品目錄,精裝目錄,企業目錄,型錄印刷',
    en: 'catalog printing,product catalogs,company catalogs,merchandise catalogs,premium catalogs,corporate catalogs,lookbook printing,product brochures',
    ja: 'カタログ印刷,商品カタログ,会社カタログ,商品カタログ,高級カタログ,企業カタログ,ルックブック印刷,プロダクトブローシャー',
  },
  'saddle-stitch-booklets': {
    zh: '騎馬釘書刊,騎釘書,中綴書,小冊子,薄本印刷,雜誌印刷,說明書印刷',
    en: 'saddle stitch booklets,saddle stitched books,stapled booklets,pamphlet printing,thin book printing,magazine printing,instruction manual printing,brochure printing',
    ja: '中綴じ冊子,中綴じ本,ホチキス止め冊子,パンフレット印刷,薄本印刷,雑誌印刷,取扱説明書印刷,ブローシャー印刷',
  },
  'perfect-bound-books': {
    zh: '膠裝書,無線膠裝,熱熔膠裝,膠裝書刊,膠裝雜誌,膠裝目錄,膠裝畫冊',
    en: 'perfect bound books,perfect bound printing,glue bound books,softcover books,paperback printing,perfect bound magazines,perfect bound catalogs,perfect bound art books',
    ja: '無線綴じ本,無線綴じ印刷,糊付け本,ソフトカバー本,ペーパーバック印刷,無線綴じ雑誌,無線綴じカタログ,無線綴じアートブック',
  },
  'hardcover-books': {
    zh: '硬皮書,精裝書,硬殼書,皮面書,線裝書,珍藏書,限量版書',
    en: 'hardcover books,hardback books,case bound books,leather bound books,cloth bound books,collectible books,limited edition books,premium hardcover printing',
    ja: 'ハードカバー本,ハードバック本,ケース装丁本,革装丁本,布装丁本,コレクターズブック,限定版本,プレミアムハードカバー印刷',
  },
  'spiral-notebooks': {
    zh: '活頁簿,圈裝筆記本,線圈簿,螺旋裝訂,線圈筆記本,活頁筆記本,學生簿',
    en: 'spiral notebooks,wire bound notebooks,coil notebooks,spiral bound books,ring notebooks,loose leaf notebooks,student notebooks,exercise books spiral',
    ja: 'スパイラルノート,ワイヤー綴じノート,コイルノート,スパイラル装丁本,リングノート,ルーズリーフノート,学生ノート,エクササイズブックスパイラル',
  },
  'business-envelopes': {
    zh: '商務信封,公司信封,企業信封,公文信封,信封信紙套裝,印有logo信封,高級信封',
    en: 'business envelopes,corporate envelopes,company envelopes,official envelopes,letterhead envelope sets,branded envelopes,logo printed envelopes,premium business envelopes',
    ja: 'ビジネス封筒,企業封筒,会社封筒,公文封筒,レターヘッド封筒セット,ブランド封筒,ロゴ印刷封筒,高級ビジネス封筒',
  },
  'colored-envelopes': {
    zh: '彩色信封,顏色信封,紅色信封,金色信封,藍色信封,特色信封,節日信封',
    en: 'colored envelopes,colorful envelopes,red envelopes,gold envelopes,blue envelopes,specialty envelopes,festive envelopes,decorative envelopes',
    ja: 'カラー封筒,カラフル封筒,赤封筒,金封筒,青封筒,特殊封筒,祝儀封筒,装飾封筒',
  },
  'large-envelopes': {
    zh: '大號信封,大型信封,A4信封,C4信封,快遞信封,文件信封,加厚信封',
    en: 'large envelopes,big envelopes,A4 envelopes,C4 envelopes,courier envelopes,document envelopes,thick envelopes,oversized envelopes',
    ja: '大きな封筒,ビッグ封筒,A4封筒,C4封筒,宅配封筒,書類封筒,厚手封筒,特大封筒',
  },
  'pearl-envelopes': {
    zh: '珠光信封,珍珠信封,閃亮信封,特殊紙信封,高檔信封,喜帖信封,邀請函信封',
    en: 'pearl envelopes,pearlescent envelopes,shimmer envelopes,specialty paper envelopes,luxury envelopes,wedding invitation envelopes,party invitation envelopes',
    ja: 'パール封筒,パールエッセンス封筒,きらきら封筒,特殊紙封筒,高級封筒,結婚式招待状封筒,パーティー招待状封筒',
  },
  'exercise-books': {
    zh: '練習簿,作業簿,學生簿,單行簿,雙行簿,方格簿,數學簿,英文簿',
    en: 'exercise books,workbooks,student books,single line books,double line books,grid books,math books,english books,school exercise books',
    ja: '練習帳,ワークブック,学生帳,単行本,双行本,方眼帳,数学帳,英語帳,学校練習帳',
  },
  'certificates': {
    zh: '證書印刷,畢業證書,獎狀,榮譽證書,培訓證書,資格證書,感謝狀,感謝信',
    en: 'certificate printing,diploma printing,awards certificates,honor certificates,training certificates,qualification certificates,appreciation certificates,thank you certificates',
    ja: '証書印刷,卒業証書,賞状,栄誉証書,研修証書,資格証書,感謝状,サンクスレター',
  },
  'school-flyers': {
    zh: '學校傳單,招生傳單,校園活動傳單,補習社傳單,興趣班傳單,開放日傳單,學校宣傳單',
    en: 'school flyers,enrollment flyers,campus event flyers,tutorial center flyers,interest class flyers,open day flyers,school promotional flyers,education flyers',
    ja: '学校チラシ,募集チラシ,キャンパスイベントチラシ,塾チラシ,習い事チラシ,オープンデーチラシ,学校宣伝チラシ,教育チラシ',
  },
  'textbooks': {
    zh: '課本印刷,教材印刷,教科書,講義筆記,溫習筆記,校本教材,自編教材',
    en: 'textbook printing,educational material printing,textbooks,lecture notes,revision notes,school based materials,custom textbooks,curriculum materials',
    ja: '教科書印刷,教材印刷,教科書,講義ノート,復習ノート,学校独自教材,カスタム教科書,カリキュラム教材',
  },
};

let updatedCount = 0;
for (const [slug, exp] of Object.entries(expansions)) {
  const slugIdx = content.indexOf(`'${slug}':`);
  if (slugIdx === -1) continue;

  // Find keywords block within 500 chars after slug
  const keywordsIdx = content.indexOf('keywords:', slugIdx);
  if (keywordsIdx === -1 || keywordsIdx > slugIdx + 500) continue;

  // Find the zh-hk, en, ja lines after keywords
  const zhIdx = content.indexOf("'zh-hk':", keywordsIdx);
  const enIdx = content.indexOf("'en':", keywordsIdx);
  const jaIdx = content.indexOf("'ja':", keywordsIdx);
  if (zhIdx === -1 || enIdx === -1 || jaIdx === -1) continue;
  if (zhIdx > keywordsIdx + 300) continue; // too far, wrong block

  // Extract current values using regex at exact positions
  const zhLine = content.slice(zhIdx, zhIdx + 300).match(/'zh-hk': '([^']+)'/);
  const enLine = content.slice(enIdx, enIdx + 300).match(/'en': '([^']+)'/);
  const jaLine = content.slice(jaIdx, jaIdx + 300).match(/'ja': '([^']+)'/);
  if (!zhLine || !enLine || !jaLine) continue;

  const curZh = zhLine[1];
  const curEn = enLine[1];
  const curJa = jaLine[1];

  // Merge and deduplicate
  const newZh = [...new Set([...curZh.split(','), ...exp.zh.split(',')])].join(',');
  const newEn = [...new Set([...curEn.split(','), ...exp.en.split(',')])].join(',');
  const newJa = [...new Set([...curJa.split(','), ...exp.ja.split(',')])].join(',');

  // Use indexOf from specific positions to avoid global replacement issues
  // Replace only the first occurrence after our slug position
  const zhPos = content.indexOf(`'zh-hk': '${curZh}'`, slugIdx);
  const enPos = content.indexOf(`'en': '${curEn}'`, slugIdx);
  const jaPos = content.indexOf(`'ja': '${curJa}'`, slugIdx);

  if (zhPos === -1 || enPos === -1 || jaPos === -1) continue;
  if (zhPos > slugIdx + 600 || enPos > slugIdx + 600 || jaPos > slugIdx + 600) continue;

  content = content.slice(0, zhPos) + `'zh-hk': '${newZh}'` + content.slice(zhPos + `'zh-hk': '${curZh}'`.length);
  // Recalculate positions after first replacement
  const enPos2 = content.indexOf(`'en': '${curEn}'`, slugIdx);
  if (enPos2 === -1) continue;
  content = content.slice(0, enPos2) + `'en': '${newEn}'` + content.slice(enPos2 + `'en': '${curEn}'`.length);
  const jaPos2 = content.indexOf(`'ja': '${curJa}'`, slugIdx);
  if (jaPos2 === -1) continue;
  content = content.slice(0, jaPos2) + `'ja': '${newJa}'` + content.slice(jaPos2 + `'ja': '${curJa}'`.length);

  updatedCount++;
}

fs.writeFileSync('src/data/product-seo.ts', content);
console.log(`Updated ${updatedCount} SKU keyword entries`);
