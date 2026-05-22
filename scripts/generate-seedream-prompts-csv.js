/**
 * 为所有 79 SKU 生成 Seedream 4.5 三语生图提示词
 * 包含：实际用户信息内容、SEO文件名、Alt标注
 * 输出 CSV + TXT 文件
 */

const fs = require('fs');

// ========== 实际用户信息内容（按分类 × 三语） ==========
const REAL_USER_CONTENT = {
  'business-cards': {
    zh: '每张名片印有真实用户信息：姓名「陳志明」、公司名「智印云有限公司」、職位「市場總監」、電話「+86 181 2638 0255」、電郵「zprintpro@outlook.com」，字體清晰可讀，排版專業',
    en: 'Each card displays real user info: name "Alex Chan", company "ZprintPro Ltd.", title "Marketing Director", phone "+86 181 2638 0255", email "zprintpro@outlook.com", clear readable typography, professional layout',
    ja: '各名刺に実際のユーザー情報が印刷されている：名前「陳志明」、会社名「智印云有限公司」、役職「市場総監」、電話「+86 181 2638 0255」、メール「zprintpro@outlook.com」、鮮明で読みやすい書体、プロフェッショナルなレイアウト',
  },
  'stickers': {
    zh: '貼紙上印有真实品牌信息：品牌名「ZprintPro」、Logo圖案、產品標籤「有機蜂蜜 250g」、條碼和生產日期，字體清晰不模糊',
    en: 'Stickers display real brand info: brand name "ZprintPro", logo graphic, product label "Organic Honey 250g", barcode and production date, crisp clear text',
    ja: 'ステッカーに実際のブランド情報が印刷されている：ブランド名「ZprintPro」、ロゴグラフィック、製品ラベル「有機蜂蜜 250g」、バーコードと製造日、鮮明で読みやすい文字',
  },
  'paper-bags': {
    zh: '紙袋印有真实品牌信息：品牌名「ZprintPro智印云」、燙金Logo、店鋪地址「九龍旺角彌敦道123號」、聯繫電話，印刷清晰精緻',
    en: 'Bags display real brand info: brand name "ZprintPro", foil-stamped logo, store address "123 Nathan Road, Mong Kok, Kowloon", contact phone, crisp premium printing',
    ja: '紙袋に実際のブランド情報が印刷されている：ブランド名「ZprintPro智印云」、箔押しロゴ、店舗住所「九龍旺角彌敦道123號」、連絡先電話、鮮明で高級な印刷',
  },
  'flyers': {
    zh: '單張印有真实活動信息：標題「ZprintPro開業大酬賓」、優惠內容「全場8折」、活動時間「2026年5月1-7日」、地址「銅鑼灣軒尼詩道456號」、QR code，排版專業',
    en: 'Flyers display real event info: headline "ZprintPro Grand Opening Sale", offer "20% Off Everything", dates "May 1-7, 2026", address "456 Hennessy Road, Causeway Bay", QR code, professional layout',
    ja: 'チラシに実際のイベント情報が印刷されている：見出し「ZprintPro開業大酬賓」、優惠内容「全場8折」、開催期間「2026年5月1-7日」、住所「銅鑼灣軒尼詩道456號」、QRコード、プロフェッショナルなレイアウト',
  },
  'posters': {
    zh: '海報展示真实活動畫面：主標題「香港書展2026」、副標題「閱讀·連繫·未來」、日期「7月15-21日」、地點「灣仔會展中心」、主辦單位Logo，色彩鮮豔',
    en: 'Poster displays real event graphics: main title "Hong Kong Book Fair 2026", subtitle "Read. Connect. Future.", dates "July 15-21", venue "HKCEC Wan Chai", organizer logo, vibrant colors',
    ja: 'ポスターに実際のイベントグラフィックが表示されている：メインタイトル「香港書展2026」、サブタイトル「閱讀·連繫·未來」、開催日「7月15-21日」、会場「灣仔會展中心」、主催者ロゴ、鮮やかな色彩',
  },
  'packaging': {
    zh: '包裝盒印有真实產品信息：品牌名「ZprintPro」、產品名「精選茶葉禮盒」、成分表、淨含量「200g」、生產日期、條碼和環保標誌，設計精美',
    en: 'Boxes display real product info: brand "ZprintPro", product name "Premium Tea Gift Box", ingredient list, net weight "200g", production date, barcode and eco label, exquisite design',
    ja: '包装盒に実際の製品情報が印刷されている：ブランド名「ZprintPro」、製品名「精選茶葉禮盒」、成分表、内容量「200g」、製造日、バーコードとエコラベル、精巧なデザイン',
  },
  'banners': {
    zh: '橫額展示真实品牌畫面：品牌名「ZprintPro智印云」、服務項目「專業印刷·免費設計」、聯繫電話「+852 2345 6789」、網址「www.zprintpro.com」，畫面清晰銳利',
    en: 'Banner displays real brand graphics: brand name "ZprintPro", services "Professional Printing · Free Design", phone "+852 2345 6789", website "www.zprintpro.com", sharp crisp graphics',
    ja: 'バナーに実際のブランドグラフィックが表示されている：ブランド名「ZprintPro智印云」、サービス「專業印刷·免費設計」、電話「+852 2345 6789」、ウェブサイト「www.zprintpro.com」、鮮明なグラフィック',
  },
  'books': {
    zh: '書籍封面印有真实出版信息：書名「香港印刷工藝全書」、作者「張偉明」、出版社「智印云出版」、ISBN條碼，書脊印有書名，排版專業',
    en: 'Book cover displays real publishing info: title "The Complete Guide to HK Printing", author "Alex Cheung", publisher "ZprintPro Press", ISBN barcode, spine printed with title, professional typography',
    ja: '書籍の表紙に実際の出版情報が印刷されている：書名「香港印刷工藝全書」、著者「張偉明」、出版社「智印云出版」、ISBNバーコード、背表紙に書名、プロフェッショナルな組版',
  },
  'menus': {
    zh: '餐牌印有真实菜品信息：餐廳名「龍記茶餐廳」、招牌菜「招牌奶茶 $28」、「黯然銷魂飯 $58」、地址「旺角西洋菜街78號」，配真實菜品圖片',
    en: 'Menu displays real dish info: restaurant name "Lung Kee Café", signature items "Signature Milk Tea $28", "Baked Pork Chop Rice $58", address "78 Sai Yeung Choi Street, Mong Kok", with real food photos',
    ja: 'メニューに実際の料理情報が印刷されている：レストラン名「龍記茶餐廳」、看板メニュー「招牌奶茶 $28」、「黯然銷魂飯 $58」、住所「旺角西洋菜街78號」、実際の料理写真付き',
  },
  'envelopes': {
    zh: '信封印有真实收件人信息：姓名「張偉明 先生」、地址「九龍旺角彌敦道123號智印中心15樓」、郵編「KLN 1234」、公司名「智印云有限公司」，地址字跡清晰',
    en: 'Envelopes display real recipient info: name "Mr. Alex Cheung", address "15/F Zprint Centre, 123 Nathan Road, Mong Kok, Kowloon", postcode "KLN 1234", company "ZprintPro Ltd.", clear legible address',
    ja: '封筒に実際の宛先情報が印刷されている：名前「張偉明 先生」、住所「九龍旺角彌敦道123號智印中心15樓」、郵便番号「KLN 1234」、会社名「智印云有限公司」、鮮明で読みやすい住所',
  },
  'calendars': {
    zh: '年曆印有真实日期和品牌信息：品牌名「智印云」、年份「2026」、月份「一月」、農曆日期、香港公眾假期標註，日期數字清晰可讀',
    en: 'Calendar displays real dates and brand info: brand "ZprintPro", year "2026", month "January", lunar dates, Hong Kong public holidays marked, clear readable date numbers',
    ja: 'カレンダーに実際の日付とブランド情報が印刷されている：ブランド名「智印云」、年「2026」、月「1月」、旧暦の日付、香港の祝日マーク、鮮明で読みやすい日付数字',
  },
  'red-packets': {
    zh: '利是封印有真实祝福信息：公司名「滙豐銀行」、燙金「福」字、吉祥語「恭喜發財」、年份「2026」，紅色紙張喜慶質感',
    en: 'Red packets display real blessing info: company name "HSBC", foil-stamped "福" character, greeting "恭喜發財", year "2026", festive red paper texture',
    ja: 'ポチ袋に実際の祝福メッセージが印刷されている：会社名「滙豐銀行」、箔押し「福」字、吉祥語「恭喜發財」、年「2026」、お祝いの赤い紙の質感',
  },
  'educational': {
    zh: '印有真实學校信息：學校名「聖保羅書院」、學生姓名「陳小明」、班級「5A」、科目「數學」，封面設計簡潔專業',
    en: "Displays real school info: school name 'St. Pauls College', student name 'Alex Chan', class '5A', subject 'Mathematics', clean professional cover design",
    ja: '実際の学校情報が印刷されている：学校名「聖保羅書院」、生徒名「陳小明」、クラス「5A」、科目「數學」、シンプルでプロフェッショナルな表紙デザイン',
  },
};

// ========== 场景模板库（按分类） ==========
const SCENE_TEMPLATES = {
  'business-cards': {
    zh: '前景为{count}张{product}整齐排列在深色胡桃木桌面，每张名片有实际用户信息内容，部分卡片微斜展示侧面厚度，{feature}工艺细节清晰可见。背景虚化现代商务办公空间，暖黄台灯与皮面记事本隐约可见，暖棕调 professional atmosphere。',
    en: 'Foreground: {count} {product} neatly arranged on dark walnut desk, each card with real user info content, some slightly angled showing thickness, {feature} details clearly visible. Background: blurred modern business office, warm yellow desk lamp and leather notebook, warm brown professional atmosphere.',
    ja: '前景：ダークウォールナットの机に整列した{product}{count}枚、各名刺に実際のユーザー情報が含まれ、一部は角度を付けて厚みを見せ、{feature}のディテールがはっきり見える。背景：ぼかしたモダンなビジネスオフィス、暖かい黄色のデスクライトと革のノート、プロフェッショナルな雰囲気。',
  },
  'stickers': {
    zh: '前景为{product}贴在{surface}上，貼紙上有实际用户信息内容，{feature}效果真实呈现，边缘细节高清。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {product} applied on {surface}, stickers with real user info content, {feature} effect realistically shown, edge details in high definition. Background: blurred {scene}, {lighting}.',
    ja: '前景：{surface}に貼られた{product}、ステッカーに実際のユーザー情報が含まれ、{feature}効果がリアルに表現され、縁のディテールが鮮明。背景：ぼかした{scene}、{lighting}。',
  },
  'paper-bags': {
    zh: '前景为{count}个{product}，紙袋上有实际用户信息内容，{feature}，袋内微露{content}，纸袋纹理清晰可见。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} {product}, bags with real user info content, {feature}, {content} slightly visible inside, paper texture clearly shown. Background: blurred {scene}, {lighting}.',
    ja: '前景：{product}{count}個、紙袋に実際のユーザー情報が含まれ、{feature}、中から{content}が少し見える、紙の質感がはっきり見える。背景：ぼかした{scene}、{lighting}。',
  },
  'flyers': {
    zh: '前景为{count}张{product}，單張上有实际用户信息内容，{feature}，展示真实印刷效果。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} {product}, flyers with real user info content, {feature}, showing real printing effect. Background: blurred {scene}, {lighting}.',
    ja: '前景：{product}{count}枚、チラシに実際のユーザー情報が含まれ、{feature}、実際の印刷効果を展示。背景：ぼかした{scene}、{lighting}。',
  },
  'posters': {
    zh: '前景为一张{product}展示在{display}上，海報上有实际用户信息内容，{feature}，边角微翘展示真实材质。背景虚化{scene}，{lighting}。',
    en: 'Foreground: one {product} displayed on {display}, poster with real user info content, {feature}, slightly curled edges showing real material. Background: blurred {scene}, {lighting}.',
    ja: '前景：{display}に展示された{product}1枚、ポスターに実際のユーザー情報が含まれ、{feature}、わずかにめくれた縁で実際の素材を見せる。背景：ぼかした{scene}、{lighting}。',
  },
  'packaging': {
    zh: '前景为{count}个{product}，包装盒上有实际用户信息内容，盒盖微开露出{content}，{feature}。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} {product}, boxes with real user info content, lid slightly open revealing {content}, {feature}. Background: blurred {scene}, {lighting}.',
    ja: '前景：{product}{count}個、包装盒に実際のユーザー情報が含まれ、蓋が少し開いて{content}が見える、{feature}。背景：ぼかした{scene}、{lighting}。',
  },
  'banners': {
    zh: '前景为{product}完整展开展示，橫額上有实际用户信息内容，{feature}，品牌画面清晰可见。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {product} fully displayed, banner with real user info content, {feature}, brand graphics clearly visible. Background: blurred {scene}, {lighting}.',
    ja: '前景：完全に展開された{product}、バナーに実際のユーザー情報が含まれ、{feature}、ブランドグラフィックがはっきり見える。背景：ぼかした{scene}、{lighting}。',
  },
  'books': {
    zh: '前景为{count}本{product}堆叠展示，書籍上有实际用户信息内容，{feature}，翻开状态展示内页。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} {product} stacked, books with real user info content, {feature}, opened state showing inner pages. Background: blurred {scene}, {lighting}.',
    ja: '前景：積み重ねられた{product}{count}冊、書籍に実際のユーザー情報が含まれ、{feature}、開いた状態で内側のページを展示。背景：ぼかした{scene}、{lighting}。',
  },
  'menus': {
    zh: '前景为{product}立于{surface}，餐牌上有实际用户信息内容，{feature}，菜单内容清晰可见。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {product} standing on {surface}, menu with real user info content, {feature}, menu content clearly visible. Background: blurred {scene}, {lighting}.',
    ja: '前景：{surface}に立てかけられた{product}、メニューに実際のユーザー情報が含まれ、{feature}、メニュー内容がはっきり見える。背景：ぼかした{scene}、{lighting}。',
  },
  'envelopes': {
    zh: '前景为{count}个{product}，信封上有实际用户信息内容，{feature}，部分信件微微抽出。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} {product}, envelopes with real user info content, {feature}, some letters slightly pulled out. Background: blurred {scene}, {lighting}.',
    ja: '前景：{product}{count}枚、封筒に実際のユーザー情報が含まれ、{feature}、一部の手紙が少し引き出されている。背景：ぼかした{scene}、{lighting}。',
  },
  'calendars': {
    zh: '前景为{product}立于桌面，年曆上有实际用户信息内容，翻开状态展示{month}月份，{feature}。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {product} standing on desk, calendar with real user info content, opened showing {month}, {feature}. Background: blurred {scene}, {lighting}.',
    ja: '前景：机に立てかけられた{product}、カレンダーに実際のユーザー情報が含まれ、開いて{month}を展示、{feature}。背景：ぼかした{scene}、{lighting}。',
  },
  'red-packets': {
    zh: '前景为{count}个红色{product}，利是封上有实际用户信息内容，{feature}，喜庆红色纸张质感可见。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {count} red {product}, red packets with real user info content, {feature}, festive red paper texture visible. Background: blurred {scene}, {lighting}.',
    ja: '前景：赤い{product}{count}枚、ポチ袋に実際のユーザー情報が含まれ、{feature}、お祭り気分の赤い紙の質感が見える。背景：ぼかした{scene}、{lighting}。',
  },
  'educational': {
    zh: '前景为{product}，教育用品上有实际用户信息内容，{feature}，摆放于课桌。背景虚化{scene}，{lighting}。',
    en: 'Foreground: {product}, educational items with real user info content, {feature}, placed on school desk. Background: blurred {scene}, {lighting}.',
    ja: '前景：{product}、教育用品に実際のユーザー情報が含まれ、{feature}、学校の机の上に置かれている。背景：ぼかした{scene}、{lighting}。',
  },
};

// ========== 分类场景关键词映射 ==========
const CATEGORY_SCENES = {
  'business-cards': {
    zh: { scene: '现代商务办公室', lighting: '暖黄台灯调', surface: '深色胡桃木桌面' },
    en: { scene: 'modern business office', lighting: 'warm yellow desk lamp tone', surface: 'dark walnut desk' },
    ja: { scene: 'モダンなビジネスオフィス', lighting: '暖かい黄色のデスクライト調', surface: 'ダークウォールナットの机' },
  },
  'stickers': {
    zh: { scene: '手作工作室桌面', lighting: '自然柔光暖米调', surface: '牛皮纸包裹和玻璃瓶' },
    en: { scene: 'craft studio desk', lighting: 'natural soft warm beige light', surface: 'kraft paper parcel and glass bottle' },
    ja: { scene: '手作りスタジオの机', lighting: '自然な柔らかい暖かいベージュの光', surface: 'クラフト紙の小包とガラス瓶' },
  },
  'paper-bags': {
    zh: { scene: '精品店橱窗或婚礼迎宾区', lighting: '柔和香槟金调', surface: '木桌面', content: '礼品或商品' },
    en: { scene: 'boutique window or wedding welcome area', lighting: 'soft champagne gold tone', surface: 'wood surface', content: 'gifts or products' },
    ja: { scene: 'ブティックの窓やウェディング受付エリア', lighting: '柔らかいシャンパンゴールド調', surface: '木の表面', content: 'ギフトや商品' },
  },
  'flyers': {
    zh: { scene: '旺角街头社区布告栏', lighting: '暖黄路灯调', surface: '木纹展板' },
    en: { scene: 'Mong Kok street noticeboard', lighting: 'warm yellow street light', surface: 'wood display board' },
    ja: { scene: 'モンコックの街の掲示板', lighting: '暖かい黄色の街灯', surface: '木製展示ボード' },
  },
  'posters': {
    zh: { scene: '旺角街头或展會現場', lighting: '自然暖光', display: '木纹展板或X展架' },
    en: { scene: 'Mong Kok street or exhibition venue', lighting: 'natural warm light', display: 'wood display board or X-stand' },
    ja: { scene: 'モンコックの街や展示会場', lighting: '自然な暖かい光', display: '木製展示ボードまたはXスタンド' },
  },
  'packaging': {
    zh: { scene: '香港本地工厂发货区或电商打包台', lighting: '暖黄工业灯光', content: '内衬或产品' },
    en: { scene: 'Hong Kong local factory dispatch area or e-commerce packing table', lighting: 'warm yellow industrial light', content: 'inner lining or product' },
    ja: { scene: '香港の地元工場の発送エリアやEC梱包テーブル', lighting: '暖かい黄色の工業用照明', content: '内装または製品' },
  },
  'banners': {
    zh: { scene: '展会入口或户外市集', lighting: '自然日光', surface: '地面或展架' },
    en: { scene: 'exhibition entrance or outdoor market', lighting: 'natural daylight', surface: 'ground or display stand' },
    ja: { scene: '展示会の入り口や屋外マーケット', lighting: '自然な日光', surface: '地面または展示スタンド' },
  },
  'books': {
    zh: { scene: '书店书架或企业会议室', lighting: '暖白阅读灯光', surface: '木桌' },
    en: { scene: 'bookstore shelf or corporate meeting room', lighting: 'warm white reading light', surface: 'wood table' },
    ja: { scene: '書店の棚や企業の会議室', lighting: '暖かい白い読書灯', surface: '木のテーブル' },
  },
  'menus': {
    zh: { scene: '茶餐厅或高级餐厅桌面', lighting: '暖黄吊灯调', surface: '餐厅桌面' },
    en: { scene: 'café or fine dining table', lighting: 'warm yellow pendant light', surface: 'restaurant table' },
    ja: { scene: 'カフェや高級レストランのテーブル', lighting: '暖かい黄色のペンダントライト', surface: 'レストランのテーブル' },
  },
  'envelopes': {
    zh: { scene: '现代办公室或家庭书桌', lighting: '自然光暖米调', surface: '木桌面' },
    en: { scene: 'modern office or home desk', lighting: 'natural warm beige light', surface: 'wood surface' },
    ja: { scene: 'モダンなオフィスや家庭の机', lighting: '自然な暖かいベージュの光', surface: '木の表面' },
  },
  'calendars': {
    zh: { scene: '家庭客厅或企业前台', lighting: '暖白自然光', month: '一月', surface: '木桌面' },
    en: { scene: 'home living room or corporate reception', lighting: 'warm white natural light', month: 'January', surface: 'wood desk' },
    ja: { scene: '家庭のリビングルームや企業の受付', lighting: '暖かい白い自然光', month: '1月', surface: '木の机' },
  },
  'red-packets': {
    zh: { scene: '春节装饰桌面或企业前台', lighting: '喜庆暖黄灯光', surface: '红丝绒或红木桌面' },
    en: { scene: 'Chinese New Year decorated desk or corporate reception', lighting: 'festive warm yellow light', surface: 'red velvet or mahogany desk' },
    ja: { scene: '春節の飾り付けの机や企業の受付', lighting: 'お祝いの暖かい黄色の灯り', surface: '赤いベルベットやマホガニーの机' },
  },
  'educational': {
    zh: { scene: '香港中小学教室或补习社', lighting: '自然光', surface: '课桌' },
    en: { scene: 'Hong Kong primary/secondary classroom or tutorial center', lighting: 'natural light', surface: 'school desk' },
    ja: { scene: '香港の小中学校や塾の教室', lighting: '自然光', surface: '学校の机' },
  },
};

// ========== 材质/工艺关键词提取 ==========
function extractFeatures(description, locale) {
  const featureMap = {
    zh: {
      '燙金': '燙金工藝閃耀奪目', '燙銀': '燙銀工藝高檔質感', 'UV': 'UV光油立體光澤',
      '啞膠': '啞膠質感低調內斂', '光膠': '光膠表面亮麗通透', '防水': '防水材質耐用可靠',
      '透明': '高透明無白邊', '環保': 'FSC環保認證材質', '浮雕': '浮雕立體觸感',
      '厚紙': '厚實紙質手感極佳', '磁石': '磁吸設計方便實用', '精裝': '硬殼精裝高檔耐用',
      '啞': '啞面質感細膩', '光': '光面亮麗通透',
    },
    en: {
      '燙金': 'foil stamping gleams brilliantly', '燙銀': 'silver foil premium quality',
      'UV': 'UV coating dimensional gloss', '啞膠': 'matte finish understated elegance',
      '光膠': 'gloss lamination bright and clear', '防水': 'waterproof material durable',
      '透明': 'crystal clear no white edges', '環保': 'FSC eco-certified material',
      '浮雕': 'embossed dimensional texture', '厚紙': 'thick paper excellent feel',
      '磁石': 'magnetic design convenient', '精裝': 'hardcover rigid premium durable',
      '啞': 'matte texture refined', '光': 'glossy bright and clear',
    },
    ja: {
      '燙金': '箔押し加工が輝く', '燙銀': '銀箔押しプレミアム質感',
      'UV': 'UVコーティング立体的な光沢', '啞膠': 'マット仕上げ落ち着いたエレガンス',
      '光膠': 'グロスラミネーション明るく透明', '防水': '防水素材耐久性あり',
      '透明': 'クリスタルクリア白縁なし', '環保': 'FSCエコ認証素材',
      '浮雕': 'エンボス立体的な触感', '厚紙': '厚紙優れた手触り',
      '磁石': 'マグネットデザイン便利', '精裝': '上製本硬質プレミアム耐久',
      '啞': 'マット質感繊細', '光': 'グロス明るく透明',
    },
  };

  const found = [];
  const desc = description || '';
  for (const [kw, text] of Object.entries(featureMap[locale])) {
    if (desc.includes(kw)) found.push(text);
  }
  if (found.length === 0) {
    const defaults = {
      zh: '專業四色印刷色彩鮮豔',
      en: 'professional 4-color printing vibrant colors',
      ja: 'プロ4色印刷鮮やかな色彩',
    };
    found.push(defaults[locale]);
  }
  return found.slice(0, 2).join('，');
}

// ========== 生成标签文字 ==========
function generateTagLines(product, locale) {
  const price = product.price_range || '';
  const minQty = product.minQuantity || 100;
  
  const priceMatch = price.match(/HK\$?([\d,.]+)/);
  const minPrice = priceMatch ? priceMatch[1].replace(',', '') : '';
  
  const unitMap = {
    'business-cards': '張', 'stickers': '張', 'paper-bags': '個',
    'flyers': '張', 'posters': '張', 'packaging': '個',
    'banners': '套', 'books': '本', 'menus': '張',
    'envelopes': '個', 'calendars': '本', 'red-packets': '個',
    'educational': '本',
  };
  let unit = unitMap[product.category] || '個';
  
  const jaUnitMap = {
    'business-cards': '枚', 'stickers': '枚', 'paper-bags': '個',
    'flyers': '枚', 'posters': '枚', 'packaging': '個',
    'banners': 'セット', 'books': '冊', 'menus': '枚',
    'envelopes': '枚', 'calendars': '冊', 'red-packets': '枚',
    'educational': '冊',
  };
  
  const lines = {
    'zh-hk': {
      line1: `${product.name}｜${minQty}${unit} ${minPrice ? 'HK$'+minPrice+'起' : '優惠價格'}`,
      line2: product.isHot ? '熱賣中・免費設計' : (product.isNew ? '新品上市・免費設計' : '免費設計・即日交貨'),
    },
    'en': {
      line1: `${product.nameEn}｜From HK$${minPrice || 'Best Price'}`,
      line2: product.isHot ? 'Hot Sale · Free Design' : (product.isNew ? 'New Arrival · Free Design' : 'Free Design · Same Day'),
    },
    'ja': {
      line1: `${product.nameJa}｜${minQty}${jaUnitMap[product.category] || '枚'} HK$${minPrice || '特別価格'}〜`,
      line2: product.isHot ? '人気商品・無料デザイン' : (product.isNew ? '新発売・無料デザイン' : '無料デザイン・即日発送'),
    },
  };
  
  return lines[locale];
}

// ========== 生成 SEO 文件名 ==========
function generateSEOFilename(product, locale) {
  // 格式: zprintpro-{category}-{slug}-{locale}.jpg
  return `zprintpro-${product.category}-${product.slug}-${locale}.jpg`;
}

// ========== 生成 Alt Text ==========
function generateAltText(product, locale) {
  const price = product.price_range || '';
  if (locale === 'zh-hk') {
    return `香港${product.name}印刷 ${price} 起｜${product.description.slice(0, 25)}｜ZprintPro智印云`;
  }
  if (locale === 'en') {
    return `${product.nameEn} Printing Hong Kong ${price}｜${product.descriptionEn.slice(0, 35)}｜ZprintPro`;
  }
  if (locale === 'ja') {
    return `香港${product.nameJa} ${price}｜${product.descriptionJa.slice(0, 25)}｜ZprintPro`;
  }
  return product.name;
}

// ========== 生成完整提示词 ==========
function generatePrompt(product, locale) {
  const template = SCENE_TEMPLATES[product.category] || SCENE_TEMPLATES['business-cards'];
  const scene = CATEGORY_SCENES[product.category] || CATEGORY_SCENES['business-cards'];
  const realContent = REAL_USER_CONTENT[product.category] || REAL_USER_CONTENT['business-cards'];
  
  const localeKey = locale === 'zh-hk' ? 'zh' : (locale === 'en' ? 'en' : 'ja');
  const desc = locale === 'zh-hk' ? product.description : (locale === 'en' ? product.descriptionEn : product.descriptionJa);
  const features = extractFeatures(desc, localeKey);
  const tags = generateTagLines(product, locale);
  const userContent = realContent[localeKey];
  
  const t = template[localeKey];
  const s = scene[localeKey];
  
  const count = product.minQuantity || 100;
  const productName = locale === 'zh-hk' ? product.name : (locale === 'en' ? product.nameEn : product.nameJa);
  
  let sceneDesc = t
    .replace(/{count}/g, count)
    .replace(/{product}/g, productName)
    .replace(/{feature}/g, features)
    .replace(/{scene}/g, s.scene)
    .replace(/{lighting}/g, s.lighting)
    .replace(/{surface}/g, s.surface || '')
    .replace(/{display}/g, s.display || '')
    .replace(/{content}/g, s.content || '')
    .replace(/{month}/g, s.month || '');

  const prefix = {
    'zh-hk': `1:1比例，8K超高清电商主图。右上角固定放置单一枚大红色(#DC2626)底色、白色粗体字(PingFang HK Bold)、白色3px描边的爆炸促销标签。标签主标题：${tags.line1}，副标题：${tags.line2}。标签外画面内绝对不出现任何其他文字、乱码、水印、品牌名、多标签。`,
    'en': `1:1 ratio, 8K ultra-high-definition e-commerce hero image. Top-right single burst label with deep red (#DC2626) background, white bold text (Inter Bold), white 3px stroke. Label main: ${tags.line1}, sub: ${tags.line2}. Absolutely no other text, gibberish, watermarks, brand names, or multiple labels anywhere else in the image.`,
    'ja': `1:1比率、8K超高清Eコマースメイン画像。右上に単一の赤色(#DC2626)背景、白太字(Hiragino Sans W6)、白3px縁取りのバーストラベル。ラベル主見出し：${tags.line1}、副見出し：${tags.line2}。ラベル外の画面内に他の文字・乱码・透かし・ブランド名・複数ラベル一切禁止。`,
  };

  const suffix = {
    'zh-hk': `产品占画面75%-85%，材质和工艺细节高清呈现。所有中文字符必须笔画完整准确，英文单词拼写正确、无粘连、无乱码。產品上必須有实际用户信息内容：${userContent}`,
    'en': `Product occupies 75%-85% of frame, material and craftsmanship details in high definition. All English words must be spelled correctly, no粘连, no gibberish. Products must display real user info content: ${userContent}`,
    'ja': `製品が画面の75%-85%を占める、素材と職人技のディテールが高精細。すべての文字が正確に表示されること。製品には実際のユーザー情報が含まれている必要がある：${userContent}`,
  };

  return `${prefix[locale]} ${sceneDesc} ${suffix[locale]}`;
}

// ========== 解析 products.ts ==========
function extractProducts() {
  const content = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
  const arrayStart = content.indexOf('export const products: Product[] = [');
  const arrayEnd = content.lastIndexOf('];\n\n// 获取所有产品');
  const arrayContent = content.substring(arrayStart, arrayEnd);
  
  const productRegex = /\{\s*\n\s*id:\s*['"]([^'"]+)['"][\s\S]*?\n\s*\},?\s*\n/g;
  const products = [];
  let match;
  
  while ((match = productRegex.exec(arrayContent)) !== null) {
    const block = match[0];
    const id = match[1];
    
    const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
    const catMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    const nameEnMatch = block.match(/nameEn:\s*['"]([^'"]+)['"]/);
    const nameJaMatch = block.match(/nameJa:\s*['"]([^'"]+)['"]/);
    const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);
    const descEnMatch = block.match(/descriptionEn:\s*['"]([^'"]+)['"]/);
    const descJaMatch = block.match(/descriptionJa:\s*['"]([^'"]+)['"]/);
    const priceMatch = block.match(/price_range:\s*['"]([^'"]+)['"]/);
    const hotMatch = block.match(/isHot:\s*(true|false)/);
    const newMatch = block.match(/isNew:\s*(true|false)/);
    const qtyMatch = block.match(/minQuantity:\s*(\d+)/);
    
    if (slugMatch) {
      products.push({
        id,
        slug: slugMatch[1],
        category: catMatch ? catMatch[1] : '',
        name: nameMatch ? nameMatch[1] : slugMatch[1],
        nameEn: nameEnMatch ? nameEnMatch[1] : slugMatch[1],
        nameJa: nameJaMatch ? nameJaMatch[1] : slugMatch[1],
        description: descMatch ? descMatch[1] : '',
        descriptionEn: descEnMatch ? descEnMatch[1] : '',
        descriptionJa: descJaMatch ? descJaMatch[1] : '',
        price_range: priceMatch ? priceMatch[1] : '',
        isHot: hotMatch ? hotMatch[1] === 'true' : false,
        isNew: newMatch ? newMatch[1] === 'true' : false,
        minQuantity: qtyMatch ? parseInt(qtyMatch[1]) : 100,
      });
    }
  }
  
  return products;
}

// ========== 生成 CSV ==========
function generateCSV() {
  const products = extractProducts();
  console.log(`Found ${products.length} products`);
  
  if (products.length === 0) {
    console.log('ERROR: No products found!');
    return;
  }
  
  const headers = [
    'id', 'slug', 'category',
    'name_zh', 'name_en', 'name_ja',
    'price_range', 'is_hot', 'is_new', 'min_quantity',
    'tag_line_zh', 'tag_sub_zh',
    'tag_line_en', 'tag_sub_en',
    'tag_line_ja', 'tag_sub_ja',
    'prompt_zh_hk', 'prompt_en', 'prompt_ja',
    'filename_zh_hk', 'filename_en', 'filename_ja',
    'alt_zh_hk', 'alt_en', 'alt_ja',
    'scene_keywords', 'target_audience', 'material_keywords'
  ];
  
  let csv = '\uFEFF' + headers.join(',') + '\n';
  
  for (const product of products) {
    const tagsZh = generateTagLines(product, 'zh-hk');
    const tagsEn = generateTagLines(product, 'en');
    const tagsJa = generateTagLines(product, 'ja');
    
    const promptZh = generatePrompt(product, 'zh-hk');
    const promptEn = generatePrompt(product, 'en');
    const promptJa = generatePrompt(product, 'ja');
    
    const filenameZh = generateSEOFilename(product, 'zh-hk');
    const filenameEn = generateSEOFilename(product, 'en');
    const filenameJa = generateSEOFilename(product, 'ja');
    
    const altZh = generateAltText(product, 'zh-hk');
    const altEn = generateAltText(product, 'en');
    const altJa = generateAltText(product, 'ja');
    
    const sceneKw = CATEGORY_SCENES[product.category]?.zh?.scene || '办公场景';
    
    const audienceMap = {
      'business-cards': '企業/專業人士',
      'stickers': '品牌/電商/手作',
      'paper-bags': '零售/餐飲/婚禮',
      'flyers': '活動/餐飲/教育',
      'posters': '活動/零售/教育',
      'packaging': '電商/品牌/食品',
      'banners': '活動/戶外廣告',
      'books': '企業/教育/出版',
      'menus': '餐飲/酒店',
      'envelopes': '企業/婚禮/法律',
      'calendars': '企業/家庭',
      'red-packets': '企業/節日營銷',
      'educational': '學校/補習社',
    };
    
    const matKeywords = extractFeatures(product.description, 'zh');
    
    const row = [
      product.id,
      product.slug,
      product.category,
      product.name,
      product.nameEn,
      product.nameJa,
      product.price_range,
      product.isHot ? 'TRUE' : 'FALSE',
      product.isNew ? 'TRUE' : 'FALSE',
      product.minQuantity,
      tagsZh.line1,
      tagsZh.line2,
      tagsEn.line1,
      tagsEn.line2,
      tagsJa.line1,
      tagsJa.line2,
      `"${promptZh.replace(/"/g, '""')}"`,
      `"${promptEn.replace(/"/g, '""')}"`,
      `"${promptJa.replace(/"/g, '""')}"`,
      filenameZh,
      filenameEn,
      filenameJa,
      `"${altZh.replace(/"/g, '""')}"`,
      `"${altEn.replace(/"/g, '""')}"`,
      `"${altJa.replace(/"/g, '""')}"`,
      sceneKw,
      audienceMap[product.category] || '一般企業',
      matKeywords,
    ];
    
    csv += row.join(',') + '\n';
  }
  
  const outputPath = 'F:/zprintpro-nextjs/seedream-prompts-all-skus.csv';
  fs.writeFileSync(outputPath, csv, 'utf8');
  console.log(`\nCSV saved to: ${outputPath}`);
  console.log(`Total products: ${products.length}`);
  
  // 纯文本提示词文件
  let txtOutput = '';
  for (const product of products) {
    txtOutput += `\n========== ${product.id} | ${product.slug} ==========\n`;
    txtOutput += `SEO Filename ZH: ${generateSEOFilename(product, 'zh-hk')}\n`;
    txtOutput += `SEO Filename EN: ${generateSEOFilename(product, 'en')}\n`;
    txtOutput += `SEO Filename JA: ${generateSEOFilename(product, 'ja')}\n\n`;
    txtOutput += `[zh-hk]\n${generatePrompt(product, 'zh-hk')}\n\n`;
    txtOutput += `[en]\n${generatePrompt(product, 'en')}\n\n`;
    txtOutput += `[ja]\n${generatePrompt(product, 'ja')}\n\n`;
  }
  
  const txtPath = 'F:/zprintpro-nextjs/seedream-prompts-all-skus.txt';
  fs.writeFileSync(txtPath, txtOutput, 'utf8');
  console.log(`TXT saved to: ${txtPath}`);
  
  console.log('\n=== Category Summary ===');
  const catCounts = {};
  for (const p of products) {
    catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  }
  for (const [cat, count] of Object.entries(catCounts)) {
    console.log(`  ${cat}: ${count} SKU`);
  }
}

generateCSV();
