/**
 * 5 大核心 SKU 的 FAQ 库
 * 每个 SKU 8 个 FAQ，答案中自然包含 2-3 个长尾关键词
 */

import { FAQItem } from '@/lib/faq-schema';

export const stickersFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '貼紙印刷 香港 最低訂量是多少？',
      'en': 'What is the minimum order for custom stickers in Hong Kong?',
      'ja': '香港でのシール印刷の最小ロットは何枚からですか？',
    },
    answer: {
      'zh-hk': '智印雲提供少批量貼紙印刷服務，最低100張起訂。無論是防水貼紙、透明貼紙或PVC貼紙，均可小量定制，適合初創品牌與產品包裝測試。詳情請參閱《貼紙印刷完全指南》。',
      'en': 'ZprintPro offers small-batch custom sticker printing with a minimum order of 100 pieces. Whether you need waterproof stickers, clear vinyl, or PVC labels, we support low-volume orders perfect for startups and product packaging tests. See our Complete Sticker Printing Guide for details.',
      'ja': 'ZprintProでは少ロットのシール印刷に対応しており、最小ロットは100枚からです。防水シール、透明シール、PVCシールなど、スタートアップやパッケージングテストに最適です。詳しくは「シール印刷完全ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '防水貼紙 和 PVC貼紙 有什麼分別？',
      'en': 'What is the difference between waterproof stickers and PVC stickers?',
      'ja': '防水シールとPVCシールの違いは何ですか？',
    },
    answer: {
      'zh-hk': '防水貼紙泛指具防水塗層的紙質貼紙，適合短期戶外使用；PVC貼紙則為塑膠材質，防水、防曬、耐磨，適合長期戶外或冷藏環境。兩者均可加做燙金工藝。如需產品包裝貼紙建議，歡迎聯絡我們。',
      'en': 'Waterproof stickers generally refer to paper-based stickers with a water-resistant coating, suitable for short-term outdoor use. PVC stickers are plastic-based, offering full waterproofing, UV resistance, and durability for long-term outdoor or refrigerated environments. Both support foil stamping. Contact us for product packaging sticker recommendations.',
      'ja': '防水シールは一般的に耐水コーティングされた紙素材で、短期間の屋外使用に適しています。PVCシールはプラスチック素材で、完全防水・UV耐性・耐久性に優れ、長期間の屋外や冷蔵環境に最適です。両方とも箔押し加工が可能です。',
    },
  },
  {
    question: {
      'zh-hk': '少批量貼紙印刷 可以即日取貨嗎？',
      'en': 'Can I get same-day sticker printing for small orders in Hong Kong?',
      'ja': '香港で少ロットのシール印刷は即日対応可能ですか？',
    },
    answer: {
      'zh-hk': '可以。針對九龍、港島及新界客戶，少批量貼紙印刷（100-500張）最快即日可取。建議上午12時前確認稿件，即可安排當日生產，港鐵站交收或上門送貨均可。',
      'en': 'Yes. For customers in Kowloon, Hong Kong Island, and the New Territories, small-batch sticker printing (100-500 pcs) is available with same-day pickup. Confirm your artwork before 12 PM for same-day production. We offer MTR station pickup or door-to-door delivery.',
      'ja': 'はい。九龍、香港島、新界のお客様向けに、少ロットシール印刷（100〜500枚）は即日対応可能です。正午までにデータを確定いただければ、当日生産を手配します。MTR駅での受け取りまたは宅配配送が選べます。',
    },
  },
  {
    question: {
      'zh-hk': '透明貼紙 適合用於什麼產品包裝？',
      'en': 'Are clear stickers suitable for product packaging?',
      'ja': '透明シールはどんな商品包装に適していますか？',
    },
    answer: {
      'zh-hk': '透明貼紙（Clear Stickers）適合玻璃樽、塑膠盒、化妝品瓶等透明或半透明包裝，可營造「無標籤」的高級感。智印雲提供防水透明貼紙，適合食品、護膚品及精品包裝。',
      'en': 'Clear stickers are ideal for glass bottles, plastic containers, cosmetic jars, and other transparent or semi-transparent packaging, creating a "no-label" premium look. ZprintPro offers waterproof clear stickers perfect for food, skincare, and boutique packaging.',
      'ja': '透明シールは、ガラス瓶、プラスチック容器、化粧品瓶などの透明または半透明の包装に最適で、「ラベルなし」の高級感を演出します。ZprintProでは食品、スキンケア、ブティック向けの防水透明シールを提供しています。',
    },
  },
  {
    question: {
      'zh-hk': '貼紙 燙金工藝 會增加多少成本？',
      'en': 'How much does foil stamping add to custom sticker costs?',
      'ja': '箔押しシールの追加料金はどのくらいですか？',
    },
    answer: {
      'zh-hk': '燙金貼紙的工藝附加費約為總價的15%。燙金能大幅提升產品包裝的奢華感，特別適合禮品盒封條、高級食品標籤及品牌 Logo 貼紙。量大可享階梯折扣。',
      'en': 'Foil stamping adds approximately 15% to the total sticker cost. It significantly elevates the luxury feel of product packaging, making it ideal for gift box seals, premium food labels, and brand logo stickers. Volume discounts apply.',
      'ja': '箔押し加工は総額の約15%の追加料金です。ギフトボックスのシール、高級食品ラベル、ブランドロゴシールなど、商品包装の高級感を大幅に向上させます。大量注文には段階的な割引が適用されます。',
    },
  },
  {
    question: {
      'zh-hk': '九龍 貼紙印刷 有送貨服務嗎？',
      'en': 'Do you deliver sticker orders in Kowloon and other Hong Kong areas?',
      'ja': '九龍など香港全域へのシール配送はありますか？',
    },
    answer: {
      'zh-hk': '有。智印雲提供全港送貨服務，包括九龍、港島、新界及離島。貼紙印刷訂單滿HK$500免運費，未滿額可選擇港鐵站交收，觀塘、旺角、銅鑼灣、尖沙咀等站點均可。',
      'en': 'Yes. ZprintPro offers delivery across all Hong Kong areas including Kowloon, Hong Kong Island, New Territories, and outlying islands. Sticker orders over HK$500 qualify for free shipping. For smaller orders, MTR station pickup is available at Kwun Tong, Mong Kok, Causeway Bay, Tsim Sha Tsui, and more.',
      'ja': 'はい。ZprintProは九龍、香港島、新界、離島を含む香港全域に配送しています。シール印刷のご注文がHK$500以上で送料無料です。未満の場合は、観塘、旺角、銅鑼湾、尖沙咀などのMTR駅での受け取りが可能です。',
    },
  },
  {
    question: {
      'zh-hk': '如何選擇 貼紙材質？',
      'en': 'How do I choose the right sticker material for my project?',
      'ja': 'シール素材の選び方を教えてください。',
    },
    answer: {
      'zh-hk': '選擇貼紙材質需考慮使用場景：室內靜態展示選銅版紙貼紙；需防水防曬選PVC貼紙或合成紙；追求高級透明感選透明PET貼紙；食品接觸需選防水防油材質。詳情可參閱我們的《貼紙印刷完全指南》。',
      'en': 'Choose based on usage: art paper stickers for indoor displays, PVC or synthetic paper for waterproof and UV-resistant outdoor use, clear PET for a premium transparent look, and oil-resistant waterproof materials for food contact applications. See our Complete Sticker Printing Guide for details.',
      'ja': '使用場面に応じて選びます：屋内展示にはアート紙シール、防水・UV耐性が必要な屋外にはPVCまたは合成紙シール、高級な透明感を求める場合は透明PETシール、食品接触には耐油防水素材が適しています。詳しくは「シール印刷完全ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '貼紙印刷 檔案規格要求是什麼？',
      'en': 'What file specs do you need for sticker printing?',
      'ja': 'シール印刷のデータ入稿規格は何ですか？',
    },
    answer: {
      'zh-hk': '建議提供AI、PDF或EPS格式，解析度300dpi以上，並預留3mm出血位。彩色貼紙請使用CMYK色彩模式。如需要燙金或局部UV，請另外提供獨立的黑稿（K100）標示加工位置。',
      'en': 'Please provide AI, PDF, or EPS files at 300dpi or higher with 3mm bleed. Use CMYK color mode for full-color stickers. For foil stamping or spot UV, please supply a separate black plate (K100) indicating the processing areas.',
      'ja': 'AI、PDF、EPS形式、300dpi以上、3mmの塗り足しを推奨します。フルカラーシールはCMYKカラーモードで作成してください。箔押しや局部UVが必要な場合は、加工位置を示す別の黒版（K100）をご提供ください。',
    },
  },
];

export const flyersFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '傳單印刷 香港 最低訂量是多少？',
      'en': 'What is the minimum order for flyer printing in Hong Kong?',
      'ja': '香港でのチラシ印刷の最小ロットは何枚からですか？',
    },
    answer: {
      'zh-hk': '智印雲提供A5傳單印刷服務，最低10張起訂。無論是宣傳單張派發、開業傳單或活動傳單，均可少批量定制，適合初創企業與社區宣傳。詳情請參閱《宣傳單張印刷攻略》。',
      'en': 'ZprintPro offers A5 flyer printing with a minimum order of 10 copies. Whether for leaflet distribution, grand opening flyers, or event promotions, we support small orders perfect for startups and community outreach. See our Flyer Printing Masterclass for details.',
      'ja': 'ZprintProではA5チラシ印刷に対応しており、最小ロットは10枚からです。チラシ配布、開業チラシ、イベントプロモーションなど、スタートアップや地域宣伝に最適です。詳しくは「チラシ印刷マスターガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': 'A5傳單 和 A4傳單 應該怎樣選擇？',
      'en': 'Should I choose A5 or A4 flyers for my campaign?',
      'ja': 'A5チラシとA4チラシ、どちらを選べばいいですか？',
    },
    answer: {
      'zh-hk': 'A5傳單尺寸較小，適合街頭派發及信箱投遞，成本較低；A4傳單則適合展示詳細產品資訊，如餐牌、課程表等。燙金傳單無論A5或A4均可提升奢華感。如需傳單派發策略建議，歡迎聯絡我們。',
      'en': 'A5 flyers are compact and ideal for street handouts and mailbox drops at lower cost. A4 flyers suit detailed product information like menus and course schedules. Foil flyers in either size add a luxurious feel. Contact us for flyer distribution strategy advice.',
      'ja': 'A5チラシはコンパクトで、街頭配布やポスト投函に適しコストも低いです。A4チラシはメニューや時間割など詳細な情報に適しています。どちらのサイズでも箔押しチラシで高級感を演出できます。',
    },
  },
  {
    question: {
      'zh-hk': '傳單印刷 可以即日取貨嗎？',
      'en': 'Is same-day flyer printing available in Hong Kong?',
      'ja': '香港でチラシ印刷の即日対応はありますか？',
    },
    answer: {
      'zh-hk': '可以。針對港島、九龍及新界客戶，A5傳單印刷（10-1000張）最快即日可取。建議上午11時前確認稿件，即可安排當日生產，適合緊急活動及選舉宣傳。',
      'en': 'Yes. For customers in Hong Kong Island, Kowloon, and the New Territories, A5 flyer printing (10-1000 copies) is available with same-day pickup. Confirm artwork before 11 AM for same-day production, ideal for urgent events and campaigns.',
      'ja': 'はい。香港島、九龍、新界のお客様向けに、A5チラシ印刷（10〜1000枚）は即日対応可能です。午前11時までにデータを確定いただければ当日生産を手配します。緊急のイベントや選挙宣伝に最適です。',
    },
  },
  {
    question: {
      'zh-hk': '燙金傳單 適合什麼行業？',
      'en': 'Which industries benefit most from foil-stamped flyers?',
      'ja': '箔押しチラシが最適な業種は何ですか？',
    },
    answer: {
      'zh-hk': '燙金傳單特別適合奢侈品、美容護膚、高端餐飲及金融服務行業。燙金工藝能瞬間提升品牌檔次，適合開業典禮、VIP活動邀請及年度報告派發。與普通傳單相比，回收率可提升30%以上。',
      'en': 'Foil-stamped flyers are especially suited for luxury, beauty, fine dining, and financial services. Foil stamping instantly elevates brand perception, perfect for grand openings, VIP event invitations, and annual report distribution. Response rates can be 30% higher than standard flyers.',
      'ja': '箔押しチラシは、ラグジュアリー、ビューティー、高級飲食、金融サービスに特に適しています。開業式、VIPイベントの招待状、年度報告書の配布に最適です。通常のチラシと比較して反応率が30%向上する可能性があります。',
    },
  },
  {
    question: {
      'zh-hk': '宣傳單張派發 有什麼策略建議？',
      'en': 'What are the best strategies for flyer distribution?',
      'ja': 'チラシ配布のベスト戦略は何ですか？',
    },
    answer: {
      'zh-hk': '有效的宣傳單張派發策略包括：1) 目標區域選擇（如九龍商業區、港島住宅區）；2) 時段配合（上下班高峰期、周末市集）；3) 傳單設計配合行動號召（QR Code、限時優惠）。詳情請參閱《宣傳單張印刷攻略》。',
      'en': 'Effective flyer distribution strategies include: 1) Target area selection (e.g., Kowloon business districts, Hong Kong Island residential areas); 2) Timing alignment (rush hours, weekend markets); 3) Design with clear CTAs (QR codes, limited-time offers). See our Flyer Printing Masterclass for details.',
      'ja': '効果的なチラシ配布戦略には、1）ターゲットエリアの選定、2）タイミングの調整、3）QRコードや期間限定オファーなど明確なCTAを含むデザインが含まれます。詳しくは「チラシ印刷マスターガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '傳單印刷 檔案規格要求是什麼？',
      'en': 'What file specs do you need for flyer printing?',
      'ja': 'チラシ印刷のデータ入稿規格は何ですか？',
    },
    answer: {
      'zh-hk': '建議提供AI、PDF或EPS格式，解析度300dpi以上，並預留3mm出血位。彩色傳單請使用CMYK色彩模式，文字請轉曲線。雙面傳單請提供正反面獨立檔案。',
      'en': 'Please provide AI, PDF, or EPS files at 300dpi or higher with 3mm bleed. Use CMYK color mode for full-color flyers and convert fonts to outlines. For double-sided flyers, supply separate files for front and back.',
      'ja': 'AI、PDF、EPS形式、300dpi以上、3mmの塗り足しを推奨します。フルカラーチラシはCMYKカラーモードで、フォントはアウトライン化してください。両面チラシは表裏別のデータをご提供ください。',
    },
  },
  {
    question: {
      'zh-hk': '摺頁傳單 有什麼款式？',
      'en': 'What folded leaflet styles do you offer?',
      'ja': '折りパンフレットにはどんな種類がありますか？',
    },
    answer: {
      'zh-hk': '智印雲提供多款摺頁傳單：對摺（2頁）、三摺（Z摺/門摺）、四摺地圖式等。適合產品目錄、活動流程表及餐牌設計。不同摺法影響閱讀動線，建議根據內容層次選擇。',
      'en': 'ZprintPro offers various folded leaflets: half-fold (2 panels), tri-fold (Z-fold/gate-fold), and four-fold map styles. Suitable for product catalogs, event programs, and menu design. Different folds affect reading flow; choose based on content hierarchy.',
      'ja': 'ZprintProでは、二つ折り、三つ折り（Z折り/観音開き）、四つ折りマップ式などの折りパンフレットを提供しています。商品カタログ、イベントプログラム、メニュー設計に適しています。',
    },
  },
  {
    question: {
      'zh-hk': '九龍 傳單印刷 有送貨服務嗎？',
      'en': 'Do you deliver flyer orders in Kowloon and other areas?',
      'ja': '九龍などへのチラシ配送はありますか？',
    },
    answer: {
      'zh-hk': '有。智印雲提供全港送貨服務，包括九龍、港島、新界及離島。傳單印刷訂單滿HK$500免運費，未滿額可選擇港鐵站交收。大量傳單派發訂單可安排貨車直送。',
      'en': 'Yes. ZprintPro offers delivery across all Hong Kong areas. Flyer orders over HK$500 qualify for free shipping. For bulk leaflet distribution orders, truck delivery can be arranged directly to your distribution team.',
      'ja': 'はい。ZprintProは香港全域に配送しています。チラシ印刷のご注文がHK$500以上で送料無料です。大量のチラシ配布注文には、トラックでの直送も手配可能です。',
    },
  },
];

export const packagingBoxesFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '包裝盒定制 香港 最低訂量是多少？',
      'en': 'What is the minimum order for custom packaging boxes in Hong Kong?',
      'ja': '香港での箱包装オーダーメイドの最小ロットはいくつからですか？',
    },
    answer: {
      'zh-hk': '智印雲提供磁吸禮盒、環保包裝盒等定制服務，最低100個起訂。無論是化妝品盒、食品盒或禮品盒，均可小量定制，適合初創品牌與節日禮品測試。詳情請參閱《品牌包裝完全指南》。',
      'en': 'ZprintPro offers custom packaging box printing from 100 units minimum. Whether cosmetic boxes, food packaging, or gift boxes, we support small orders perfect for startups and seasonal gift testing. See our Brand Packaging Guide for details.',
      'ja': 'ZprintProでは100個からの箱包装オーダーメイドに対応しています。化粧品箱、食品箱、ギフト箱など、スタートアップや季節のギフトテストに最適です。詳しくは「ブランド包装完全ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '磁吸禮盒 和 摺疊盒 有什麼分別？',
      'en': 'What is the difference between rigid boxes and folding cartons?',
      'ja': '箱包装の種類、それぞれの違いは何ですか？',
    },
    answer: {
      'zh-hk': '磁吸禮盒（Rigid Box）由厚紙板裱糊而成，結構堅固，適合高端禮品及奢侈品包裝；摺疊盒（Folding Carton）則可攤平運輸，成本較低，適合零售產品及電商包裝。兩者均可加做燙金及局部UV工藝。',
      'en': 'Rigid boxes are made from thick paperboard, offering sturdy construction ideal for luxury gifts. Folding cartons ship flat and cost less, suitable for retail products and e-commerce packaging. Both support foil stamping and spot UV.',
      'ja': '化粧箱は厚紙板で作られており、高級ギフトに適しています。組み立て箱は平積み配送できコストも低く、小売商品やEC包装に適しています。両方とも箔押しや局部UVが可能です。',
    },
  },
  {
    question: {
      'zh-hk': '環保包裝盒 可以使用什麼材質？',
      'en': 'What eco-friendly materials are available for packaging boxes?',
      'ja': 'エコ包装箱にはどんな素材が使えますか？',
    },
    answer: {
      'zh-hk': '智印雲提供FSC認證環保包裝盒，材質包括再生紙、牛皮紙及大豆油墨印刷。適合注重ESG的品牌及有機產品包裝。新界及九龍客戶可安排即日打樣。',
      'en': 'ZprintPro offers FSC-certified eco-friendly packaging boxes using recycled paper, kraft paper, and soy-based inks. Ideal for ESG-focused brands and organic product packaging. Same-day sampling available for New Territories and Kowloon customers.',
      'ja': 'ZprintProではFSC認証のエコ包装箱を提供しており、再生紙、クラフト紙、大豆インクを使用しています。ESGに配慮したブランドやオーガニック商品の包装に最適です。新界と九龍のお客様には即日サンプルも可能です。',
    },
  },
  {
    question: {
      'zh-hk': '包裝盒 燙金工藝 會增加多少成本？',
      'en': 'How much does foil stamping add to packaging box costs?',
      'ja': '箱包装の箔押し加工の追加料金はどのくらいですか？',
    },
    answer: {
      'zh-hk': '燙金包裝盒的工藝附加費約為總價的15%。燙金能大幅提升品牌包裝的奢華感，特別適合化妝品盒、月餅盒及高端禮品盒。量大可享階梯折扣。',
      'en': 'Foil stamping adds approximately 15% to total packaging box cost. It significantly elevates brand packaging luxury, ideal for cosmetic boxes, mooncake boxes, and premium gift packaging. Volume discounts apply.',
      'ja': '箔押し加工は総額の約15%の追加料金です。化粧品箱、月餅箱、高級ギフト箱など、ブランド包装の高級感を大幅に向上させます。大量注文には段階的な割引が適用されます。',
    },
  },
  {
    question: {
      'zh-hk': '化妝品盒 定制有什麼尺寸選擇？',
      'en': 'What sizes are available for custom cosmetic packaging boxes?',
      'ja': '化粧品箱のオーダーメイドにはどんなサイズがありますか？',
    },
    answer: {
      'zh-hk': '智印雲提供多款化妝品盒尺寸，常見包括：小號（80×80×30mm，適合唇膏/眼影）、中號（120×120×50mm，適合護膚套裝）、大號（200×150×80mm，適合禮品套裝）。亦可按產品尺寸完全定制刀模。',
      'en': 'ZprintPro offers various cosmetic box sizes: small (80×80×30mm for lipsticks/eyeshadow), medium (120×120×50mm for skincare sets), and large (200×150×80mm for gift sets). Fully custom die-cut sizes are also available based on your product dimensions.',
      'ja': 'ZprintProでは様々な化粧品箱サイズを提供しています。小（80×80×30mm）、中（120×120×50mm）、大（200×150×80mm）のほか、商品サイズに応じた完全オーダーメイドも可能です。',
    },
  },
  {
    question: {
      'zh-hk': '包裝盒定制 可以即日打樣嗎？',
      'en': 'Can I get same-day packaging box sampling in Hong Kong?',
      'ja': '箱包装の即日サンプルは可能ですか？',
    },
    answer: {
      'zh-hk': '可以。針對九龍、港島及新界客戶，包裝盒定制最快即日可打樣。建議提前提供設計稿及尺寸規格，即可安排當日白樣或數碼樣。確認樣板後3-5個工作天可批量生產。',
      'en': 'Yes. For Kowloon, Hong Kong Island, and New Territories customers, packaging box sampling is available same-day. Provide design files and dimensions in advance for same-day white or digital samples. Bulk production takes 3-5 working days after sample approval.',
      'ja': 'はい。九龍、香港島、新界のお客様向けに、箱包装の即日サンプルが可能です。デザインデータと寸法を事前にご提供いただければ、当日に白箱サンプルまたはデジタルサンプルを手配できます。',
    },
  },
  {
    question: {
      'zh-hk': '如何選擇 包裝盒材質？',
      'en': 'How do I choose the right packaging box material?',
      'ja': '包装箱の素材の選び方を教えてください。',
    },
    answer: {
      'zh-hk': '選擇包裝盒材質需考慮產品特性及預算：白卡紙適合彩色印刷及高端形象；牛皮紙適合環保品牌及簡約風格；瓦楞紙適合電商運輸及重型產品。詳情可參閱《品牌包裝完全指南》。',
      'en': 'Choose packaging box material based on product characteristics and budget: white card paper suits full-color printing and premium branding; kraft paper fits eco brands and minimalist aesthetics; corrugated cardboard is ideal for e-commerce shipping and heavy products. See our Brand Packaging Guide for details.',
      'ja': '商品の特性と予算に応じて選びます。白卡紙はフルカラー印刷と高級ブランドに、クラフト紙はエコブランドとミニマルデザインに、段ボールはEC配送と重い商品に適しています。詳しくは「ブランド包装完全ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '新界 包裝盒印刷 有送貨服務嗎？',
      'en': 'Do you deliver packaging box orders to the New Territories?',
      'ja': '新界などへの包装箱配送はありますか？',
    },
    answer: {
      'zh-hk': '有。智印雲提供全港送貨服務，包括九龍、港島、新界及離島。包裝盒定制訂單滿HK$500免運費，未滿額可選擇港鐵站交收。大量訂單可安排貨車直送倉庫。',
      'en': 'Yes. ZprintPro delivers across all Hong Kong areas including the New Territories. Packaging box orders over HK$500 qualify for free shipping. For bulk orders, truck delivery to your warehouse can be arranged.',
      'ja': 'はい。ZprintProは新界を含む香港全域に配送しています。箱包装のご注文がHK$500以上で送料無料です。大量注文には倉庫へのトラック直送も手配可能です。',
    },
  },
];

export const postersFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '海報印刷 香港 最低訂量是多少？',
      'en': 'What is the minimum order for poster printing in Hong Kong?',
      'ja': '香港でのポスター印刷の最小ロットは何枚からですか？',
    },
    answer: {
      'zh-hk': '智印雲提供A2海報印刷服務，最低10張起訂。無論是戶外防水海報、展覽海報或燙金海報，均可少批量定制，適合活動宣傳及零售推廣。詳情請參閱《海報印刷完全指南》。',
      'en': 'ZprintPro offers A2 poster printing with a minimum order of 10 copies. Whether outdoor waterproof posters, exhibition posters, or foil-stamped posters, we support small orders perfect for event promotion and retail advertising. See our Poster Printing Guide for details.',
      'ja': 'ZprintProではA2ポスター印刷に対応しており、最小ロットは10枚からです。屋外防水ポスター、展示会用ポスター、箔押しポスターなど、イベント宣伝や小売広告に最適です。詳しくは「ポスター印刷ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': 'A2海報 和 A1海報 應該怎樣選擇？',
      'en': 'Should I choose A2 or A1 posters for my event?',
      'ja': 'A2ポスターとA1ポスター、どちらを選べばいいですか？',
    },
    answer: {
      'zh-hk': 'A2海報（420×594mm）適合店內展示及中小型活動；A1海報（594×841mm）則適合展覽會、演唱會及大型戶外廣告。戶外防水海報建議選用A1尺寸以確保遠距離可見度。如需Backdrop背景板，可定制更大尺寸。',
      'en': 'A2 posters (420×594mm) suit in-store displays and small-to-medium events. A1 posters (594×841mm) are ideal for exhibitions, concerts, and large outdoor advertising. Outdoor waterproof posters are recommended in A1 for long-distance visibility. Custom larger sizes available for backdrops.',
      'ja': 'A2ポスター（420×594mm）は店内展示や中小規模イベントに適しています。A1ポスター（594×841mm）は展示会やコンサート、大型屋外広告に最適です。屋外防水ポスターは遠距離からの視認性を確保するためA1サイズが推奨されます。',
    },
  },
  {
    question: {
      'zh-hk': '戶外防水海報 可以即日取貨嗎？',
      'en': 'Is same-day outdoor waterproof poster printing available?',
      'ja': '屋外防水ポスターの即日対応はありますか？',
    },
    answer: {
      'zh-hk': '可以。針對九龍、港島及新界客戶，A2海報印刷（10-100張）最快即日可取。戶外防水海報採用防水PP紙或帆布材質，適合長期戶外展示。建議上午11時前確認稿件。',
      'en': 'Yes. For Kowloon, Hong Kong Island, and New Territories customers, A2 poster printing (10-100 copies) is available same-day. Outdoor waterproof posters use waterproof PP paper or canvas, suitable for long-term outdoor display. Confirm artwork before 11 AM.',
      'ja': 'はい。九龍、香港島、新界のお客様向けに、A2ポスター印刷（10〜100枚）は即日対応可能です。屋外防水ポスターは防水PP紙またはキャンバスを使用し、長期間の屋外展示に適しています。',
    },
  },
  {
    question: {
      'zh-hk': '展覽海報 燙金工藝 效果如何？',
      'en': 'How effective is foil stamping for exhibition posters?',
      'ja': '展示会用ポスターの箔押し加工の効果はどうですか？',
    },
    answer: {
      'zh-hk': '燙金海報能在展覽會場中迅速吸引目光，特別適合品牌主視覺牆及頒獎典禮Backdrop。燙金工藝附加費約為總價的15%，但能提升品牌專業形象，增加參觀者駐足率。',
      'en': 'Foil-stamped posters quickly capture attention at exhibition venues, ideal for brand feature walls and award ceremony backdrops. Foil stamping adds approximately 15% to cost but enhances professional brand image and increases visitor dwell time.',
      'ja': '箔押しポスターは展示会場で素早く注目を集め、ブランドのフィーチャーウォールや授賞式のバックドロップに最適です。総額の約15%の追加料金ですが、ブランドのプロフェッショナルなイメージを向上させ、来場者の滞在時間を増やします。',
    },
  },
  {
    question: {
      'zh-hk': '海報材質 有什麼選擇？',
      'en': 'What poster material options do you offer?',
      'ja': 'ポスター素材にはどんな種類がありますか？',
    },
    answer: {
      'zh-hk': '智印雲提供多款海報材質：光粉紙（室內展示，色彩鮮豔）、啞粉紙（減少反光，適合攝影）、防水PP紙（戶外短期）、帆布（戶外長期）、相紙（高解析度輸出）。展覽海報建議選用啞粉紙或相紙。',
      'en': 'ZprintPro offers various poster materials: glossy art paper (indoor, vibrant colors), matte art paper (reduced glare, photography-friendly), waterproof PP paper (short-term outdoor), canvas (long-term outdoor), and photo paper (high-resolution output). Exhibition posters are recommended in matte art paper or photo paper.',
      'ja': 'ZprintProでは光沢紙、マット紙、防水PP紙、キャンバス、写真用紙などのポスター素材を提供しています。展示会用ポスターにはマット紙または写真用紙が推奨されます。',
    },
  },
  {
    question: {
      'zh-hk': 'Backdrop背景板 可以定制什麼尺寸？',
      'en': 'What sizes are available for custom backdrop printing?',
      'ja': 'バックドロップのオーダーメイドサイズはどこまで対応していますか？',
    },
    answer: {
      'zh-hk': '智印雲提供Backdrop背景板定制服務，常見尺寸包括：2×2.5m、3×3m、4×2.5m。採用防水帆布或遮光布，適合展覽會、發布會及婚禮佈置。亦可按場地尺寸完全定制。',
      'en': 'ZprintPro offers custom backdrop printing in common sizes: 2×2.5m, 3×3m, and 4×2.5m. Using waterproof canvas or blackout fabric, suitable for exhibitions, product launches, and wedding setups. Fully custom sizes based on venue dimensions are also available.',
      'ja': 'ZprintProでは2×2.5m、3×3m、4×2.5mなどのバックドロップを提供しています。防水キャンバスまたは遮光布を使用し、展示会や発表会、結婚式の演出に適しています。会場サイズに応じた完全オーダーメイドも可能です。',
    },
  },
  {
    question: {
      'zh-hk': '海報印刷 檔案規格要求是什麼？',
      'en': 'What file specs do you need for poster printing?',
      'ja': 'ポスター印刷のデータ入稿規格は何ですか？',
    },
    answer: {
      'zh-hk': '建議提供AI、PDF或EPS格式，解析度150-300dpi（視尺寸而定），並預留3mm出血位。彩色海報請使用CMYK色彩模式。大尺寸海報（A1以上）建議使用150dpi即可，以控制檔案大小。',
      'en': 'Please provide AI, PDF, or EPS files at 150-300dpi depending on size, with 3mm bleed. Use CMYK color mode for full-color posters. For large posters (A1 and above), 150dpi is sufficient to manage file size.',
      'ja': 'AI、PDF、EPS形式、サイズに応じて150〜300dpi、3mmの塗り足しを推奨します。フルカラーポスターはCMYKカラーモードで作成してください。大判ポスター（A1以上）はファイルサイズ管理のため150dpiで十分です。',
    },
  },
  {
    question: {
      'zh-hk': '港島 海報印刷 有送貨服務嗎？',
      'en': 'Do you deliver poster orders to Hong Kong Island?',
      'ja': '香港島などへのポスター配送はありますか？',
    },
    answer: {
      'zh-hk': '有。智印雲提供全港送貨服務，包括港島、九龍、新界及離島。海報印刷訂單滿HK$500免運費，Backdrop背景板等大件可安排貨車直送會場。未滿額可選擇港鐵站交收。',
      'en': 'Yes. ZprintPro delivers across all Hong Kong areas including Hong Kong Island. Poster orders over HK$500 qualify for free shipping. Large items like backdrop boards can be truck-delivered directly to your venue.',
      'ja': 'はい。ZprintProは香港島を含む香港全域に配送しています。ポスター印刷のご注文がHK$500以上で送料無料です。バックドロップなどの大きな商品は会場へのトラック直送も可能です。',
    },
  },
];

export const paperBagsFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '紙袋印刷 香港 最低訂量是多少？',
      'en': 'What is the minimum order for custom paper bags in Hong Kong?',
      'ja': '香港での紙袋印刷の最小ロットはいくつからですか？',
    },
    answer: {
      'zh-hk': '智印雲提供環保紙袋、牛皮紙袋等定制服務，最低100個起訂。無論是禮品紙袋、品牌紙袋或餐飲外賣紙袋，均可小量定制。詳情請參閱《品牌包裝完全指南》。',
      'en': 'ZprintPro offers custom paper bag printing from 100 units minimum. Whether gift bags, branded shopping bags, or F&B takeaway bags, we support small orders. See our Brand Packaging Guide for details.',
      'ja': 'ZprintProでは100個からの紙袋印刷に対応しています。ギフト袋、ブランド紙袋、飲食テイクアウト袋など、小ロットから承ります。詳しくは「ブランド包装完全ガイド」をご覧ください。',
    },
  },
  {
    question: {
      'zh-hk': '牛皮紙袋 和 白卡紙袋 有什麼分別？',
      'en': 'What is the difference between kraft and white card paper bags?',
      'ja': 'クラフト紙袋と白卡紙袋の違いは何ですか？',
    },
    answer: {
      'zh-hk': '牛皮紙袋（Kraft）呈天然啡色，質感樸實，適合環保品牌及有機產品；白卡紙袋則表面光滑，適合彩色印刷及高端品牌形象。兩者均可加做燙金及棉繩手挽。',
      'en': 'Kraft paper bags have a natural brown tone with an earthy texture, ideal for eco brands and organic products. White card paper bags have a smooth surface suited for full-color printing and premium branding. Both support foil stamping and cotton rope handles.',
      'ja': 'クラフト紙袋は天然の茶色で素朴な質感があり、エコブランドやオーガニック商品に適しています。白卡紙袋は表面が滑らかでフルカラー印刷と高級ブランドに適しています。両方とも箔押しや綿紐持ち手が可能です。',
    },
  },
  {
    question: {
      'zh-hk': '環保紙袋 可以使用什麼認證材質？',
      'en': 'What certified eco-friendly materials are available for paper bags?',
      'ja': 'エコ紙袋にはどんな認証素材が使えますか？',
    },
    answer: {
      'zh-hk': '智印雲提供FSC認證環保紙袋，材質包括再生牛皮紙、未漂白原木漿紙及大豆油墨印刷。適合注重可持續發展的品牌，可於袋身印製FSC標誌及環保標語。新界及九龍客戶可安排即日打樣。',
      'en': 'ZprintPro offers FSC-certified eco-friendly paper bags using recycled kraft paper, unbleached wood pulp, and soy-based inks. Ideal for sustainability-focused brands, with FSC logos and eco slogans printable on the bag. Same-day sampling for New Territories and Kowloon.',
      'ja': 'ZprintProではFSC認証のエコ紙袋を提供しており、再生クラフト紙、無漂白木材パルプ、大豆インクを使用しています。サステナビリティに注力したブランドに最適で、袋身にFSCロゴや環保スローガンを印刷できます。',
    },
  },
  {
    question: {
      'zh-hk': '紙袋 燙金工藝 會增加多少成本？',
      'en': 'How much does foil stamping add to paper bag costs?',
      'ja': '紙袋の箔押し加工の追加料金はどのくらいですか？',
    },
    answer: {
      'zh-hk': '燙金紙袋的工藝附加費約為總價的15%。燙金能大幅提升禮品紙袋及品牌紙袋的奢華感，特別適合節日禮品、VIP客戶回饋及周年慶活動。量大可享階梯折扣。',
      'en': 'Foil stamping adds approximately 15% to total paper bag cost. It significantly elevates the luxury feel of gift bags and branded shopping bags, ideal for holiday gifts, VIP client rewards, and anniversary events. Volume discounts apply.',
      'ja': '箔押し加工は総額の約15%の追加料金です。ギフト袋やブランド紙袋の高級感を大幅に向上させ、ホリデーギフト、VIP顧客向け、周年イベントに最適です。大量注文には段階的な割引が適用されます。',
    },
  },
  {
    question: {
      'zh-hk': '禮品紙袋 定制有什麼尺寸選擇？',
      'en': 'What sizes are available for custom gift paper bags?',
      'ja': 'ギフト袋のオーダーメイドにはどんなサイズがありますか？',
    },
    answer: {
      'zh-hk': '智印雲提供多款禮品紙袋尺寸：小號（180×230×80mm，適合飾品/化妝品）、中號（250×300×100mm，適合服裝/鞋履）、大號（320×400×120mm，適合禮品套裝）。亦可按產品尺寸完全定制。',
      'en': 'ZprintPro offers various gift bag sizes: small (180×230×80mm for accessories/cosmetics), medium (250×300×100mm for apparel/footwear), and large (320×400×120mm for gift sets). Fully custom sizes based on your products are also available.',
      'ja': 'ZprintProでは小（180×230×80mm）、中（250×300×100mm）、大（320×400×120mm）などのギフト袋サイズを提供しています。商品サイズに応じた完全オーダーメイドも可能です。',
    },
  },
  {
    question: {
      'zh-hk': '紙袋定制 可以即日打樣嗎？',
      'en': 'Can I get same-day paper bag sampling in Hong Kong?',
      'ja': '紙袋の即日サンプルは可能ですか？',
    },
    answer: {
      'zh-hk': '可以。針對九龍、港島及新界客戶，紙袋定制最快即日可打樣。建議提前提供設計稿及尺寸規格，即可安排當日白樣。確認樣板後5-7個工作天可批量生產。',
      'en': 'Yes. For Kowloon, Hong Kong Island, and New Territories customers, paper bag sampling is available same-day. Provide design files and dimensions in advance for same-day white samples. Bulk production takes 5-7 working days after sample approval.',
      'ja': 'はい。九龍、香港島、新界のお客様向けに、紙袋の即日サンプルが可能です。デザインデータと寸法を事前にご提供いただければ、当日に白箱サンプルを手配できます。',
    },
  },
  {
    question: {
      'zh-hk': '如何選擇 紙袋手挽材質？',
      'en': 'How do I choose the right handle material for paper bags?',
      'ja': '紙袋の持ち手素材の選び方を教えてください。',
    },
    answer: {
      'zh-hk': '智印雲提供多款紙袋手挽：棉繩手挽（堅固耐用，適合重載）、扁紙手挽（經濟實惠，適合輕量商品）、緞帶手挽（高級感強，適合禮品袋）。選擇時需考慮載重量及品牌形象。',
      'en': 'ZprintPro offers various paper bag handles: cotton rope (durable, heavy loads), flat paper (economical, light items), and satin ribbon (luxury feel, gift bags). Consider load weight and brand image when choosing.',
      'ja': 'ZprintProでは綿紐持ち手（頑丈で重い荷物向け）、平紐（経済的で軽い商品向け）、サテンリボン（高級感がありギフト向け）などの紙袋持ち手を提供しています。',
    },
  },
  {
    question: {
      'zh-hk': '九龍 紙袋印刷 有送貨服務嗎？',
      'en': 'Do you deliver paper bag orders to Kowloon?',
      'ja': '九龍などへの紙袋配送はありますか？',
    },
    answer: {
      'zh-hk': '有。智印雲提供全港送貨服務，包括九龍、港島、新界及離島。紙袋印刷訂單滿HK$500免運費，未滿額可選擇港鐵站交收。大量訂單可安排貨車直送店舖或倉庫。',
      'en': 'Yes. ZprintPro delivers across all Hong Kong areas including Kowloon. Paper bag orders over HK$500 qualify for free shipping. For bulk orders, truck delivery to your store or warehouse can be arranged.',
      'ja': 'はい。ZprintProは九龍を含む香港全域に配送しています。紙袋印刷のご注文がHK$500以上で送料無料です。大量注文には店舗や倉庫へのトラック直送も手配可能です。',
    },
  },
];

// 通用 FAQ — 適用所有未自定義的 category（business-cards / books / calendars /
// menus / banners / red-packets / envelopes / educational）
// 含 6 個最高頻問題：最低訂量 / 印刷工期 / 配送 / 設計稿要求 / 付款方式 / 環保認證
export const generalProductFAQs: FAQItem[] = [
  {
    question: {
      'zh-hk': '產品印刷 最低訂量是多少？',
      'en': 'What is the minimum order quantity for printing?',
      'ja': '印刷の最小注文数はいくつですか？',
    },
    answer: {
      'zh-hk': '智印雲大部分產品最低 50–100 個 / 本 / 張起訂，具體以產品頁報價為準。即日小批量急件可低至 10 張起。大量訂單享階梯折扣，請聯絡客服獲取專屬報價。',
      'en': 'Most ZprintPro products start from 50–100 units/copies. Specific minimums are shown on each product page. Same-day small-batch rush orders are available from 10 copies. Bulk orders enjoy tiered discounts—contact us for a custom quote.',
      'ja': 'ZprintPro のほとんどの商品は 50〜100 個/部/枚からの最小注文です。詳細は各商品ページをご覧ください。即日少量急ぎは10枚から対応。大量注文は段階割引あり、お気軽にお問い合わせください。',
    },
  },
  {
    question: {
      'zh-hk': '印刷工期 需要多長時間？',
      'en': 'How long does printing and delivery take?',
      'ja': '印刷と納品にはどのくらい時間がかかりますか？',
    },
    answer: {
      'zh-hk': '標準工期為 3–5 個工作天，加急件最快 24–48 小時內完成。即日交貨適用於大部分標準 SKU，建議上午 11 時前確認稿件。觀塘門市可現場打樣，港九新界 48 小時快遞直送。',
      'en': 'Standard turnaround is 3–5 business days. Rush orders are completed in 24–48 hours. Same-day delivery is available for most standard SKUs—confirm artwork before 11 AM. Kwun Tong showroom offers on-site proofing, with 48-hour courier delivery across Hong Kong.',
      'ja': '標準納期は 3〜5 営業日、急ぎは 24〜48 時間以内。即日納品は多くの標準 SKU で対応可能、正午までのデータ確定推奨です。観塘 showroom で現場校正、香港全域へ 48 時間配送。',
    },
  },
  {
    question: {
      'zh-hk': '香港本地 有送貨服務嗎？',
      'en': 'Do you offer delivery in Hong Kong?',
      'ja': '香港内で配送サービスはありますか？',
    },
    answer: {
      'zh-hk': '智印雲提供全港送貨服務，包括九龍、港島、新界及離島。訂單滿 HK$500 免運費，未滿額可選擇港鐵站交收（觀塘、旺角、銅鑼灣、尖沙咀等）。海外市場支援 DHL / FedEx 全球直送，3-5 個工作天到美國、2-4 天到日本。',
      'en': 'ZprintPro offers Hong Kong-wide delivery including Kowloon, Hong Kong Island, New Territories, and outlying islands. Free shipping on orders over HK$500; MTR station pickup available for smaller orders (Kwun Tong, Mong Kok, Causeway Bay, Tsim Sha Tsui). International orders ship via DHL/FedEx—3-5 days to USA, 2-4 days to Japan.',
      'ja': 'ZprintPro は九龍・香港島・新界・離島を含む香港全域に配送します。HK$500 以上で送料無料、未満は MTR 駅受取（観塘・旺角・銅鑼湾・尖沙咀など）。海外は DHL/FedEx 対応、米国 3-5 日、日本 2-4 日。',
    },
  },
  {
    question: {
      'zh-hk': '設計稿 有什麼規格要求？',
      'en': 'What file specifications do you need?',
      'ja': '入稿データの仕様を教えてください。',
    },
    answer: {
      'zh-hk': '建議提供 AI / PDF / EPS 格式，解析度 300dpi 以上，並預留 3mm 出血位。彩色印刷請使用 CMYK 色彩模式，文字請轉曲線。如需燙金、局部 UV、壓凹等加值工藝，請另外提供獨立黑稿（K100）標示加工位置。',
      'en': 'Please provide AI / PDF / EPS files at 300dpi or higher with 3mm bleed. Use CMYK color mode for full-color printing and convert fonts to outlines. For foil stamping, spot UV, or embossing, supply a separate K100 black plate marking the processing areas.',
      'ja': 'AI / PDF / EPS 形式、300dpi 以上、3mm の塗り足しを推奨します。フルカラー印刷は CMYK カラーモード、フォントはアウトライン化。箔押し・スポット UV・エンボスなどのオプション加工には、加工位置を示す K100 黒版を別途ご支給ください。',
    },
  },
  {
    question: {
      'zh-hk': '支援 哪些付款方式？',
      'en': 'What payment methods do you accept?',
      'ja': '支払い方法は何が利用できますか？',
    },
    answer: {
      'zh-hk': '智印雲支援 Airwallex 多幣種結算：港幣 / 美元 / 日圓 / 人民幣，Visa / Mastercard / 銀聯 / FPS / PayMe / 支付寶香港 / 微信支付。企業客戶可申請 NET 30 月結賬期。',
      'en': 'ZprintPro supports Airwallex multi-currency settlement: HKD / USD / JPY / CNY, with Visa / Mastercard / UnionPay / FPS / PayMe / Alipay HK / WeChat Pay. Corporate accounts can apply for NET 30 monthly billing.',
      'ja': 'ZprintPro は Airwallex マルチ通貨決済対応：HKD / USD / JPY / CNY、Visa / Mastercard / UnionPay / FPS / PayMe / Alipay HK / WeChat Pay。法人顧客は NET 30 月締請求対応可。',
    },
  },
  {
    question: {
      'zh-hk': '紙材 是環保認證的嗎？',
      'en': 'Are your paper materials eco-certified?',
      'ja': '紙素材に環境認証はありますか？',
    },
    answer: {
      'zh-hk': '智印雲所有紙張均通過 FSC 森林管理委員會認證，可持續採購。環保系列額外採用再生紙 / 大豆油墨，可完全降解，無毒無味。適合注重 ESG 形象的企業、社會企業及 NGO。',
      'en': 'All ZprintPro paper is FSC (Forest Stewardship Council) certified for sustainable sourcing. Our eco line additionally uses recycled paper and soy-based inks—fully biodegradable and non-toxic. Ideal for ESG-focused corporates, social enterprises, and NGOs.',
      'ja': 'ZprintPro の紙材は全て FSC（森林管理協議会）認証を取得。エコシリーズは再生紙・大豆インクを採用、完全生分解性・無毒無臭。ESG 重視の企業・社会企業・NGO に最適。',
    },
  },
  {
    question: {
      'zh-hk': '急件 / 加急 如何收費？',
      'en': 'How much does rush delivery cost?',
      'ja': '急ぎ/速納の追加料金は？',
    },
    answer: {
      'zh-hk': '48 小時快遞免費（港九新界大部分地區）。即日 4 小時取件加收 HK$80–150（視產品類型）。加急件可聯絡客服走專屬急件通道，產能優先排程。',
      'en': '48-hour delivery is free for most Hong Kong areas. Same-day 4-hour pickup adds HK$80–150 (depending on product type). For urgent orders, contact our team for a dedicated rush channel with priority production scheduling.',
      'ja': '48 時間配送は香港大部分の地域で無料。即日 4 時間受取は HK$80〜150 追加（商品による）。急ぎは專用急便チャンネルをカスタマーサポートまで、優先生産スケジュールで対応。',
    },
  },
  {
    question: {
      'zh-hk': '不滿意 可以重印嗎？',
      'en': 'Can you reprint if I am not satisfied?',
      'ja': '仕上がりに不満があれば再印刷できますか？',
    },
    answer: {
      'zh-hk': '智印雲提供「不滿意免費重印」承諾。若成品顏色 / 裁切 / 裝訂與確認樣稿不符，我們承擔重印費用。請於收貨 7 個工作天內提交問題照片與訂單號碼，客服 24 小時內回覆處理方案。',
      'en': 'ZprintPro offers a "Free Reprint If Unsatisfied" guarantee. If color, cutting, or binding does not match the approved proof, we cover reprinting costs. Please submit issue photos and order number within 7 business days of receipt—our team responds within 24 hours.',
      'ja': 'ZprintPro は「ご不満なら無料再印刷」保証を提供。色・裁断・製本が承認サンプルと相違する場合、再印刷費用は当社負担。商品受領後 7 営業日以内に問題写真と注文番号をご提出ください、24 時間以内に対応。',
    },
  },
];

export const coreProductFAQMap: Record<string, FAQItem[]> = {
  stickers: stickersFAQs,
  flyers: flyersFAQs,
  'packaging-boxes': packagingBoxesFAQs,
  posters: postersFAQs,
  'paper-bags': paperBagsFAQs,
  // 通用 FAQ 兜底 — 適用所有未自定義的 category
  'business-cards': generalProductFAQs,
  books: generalProductFAQs,
  calendars: generalProductFAQs,
  menus: generalProductFAQs,
  banners: generalProductFAQs,
  'red-packets': generalProductFAQs,
  envelopes: generalProductFAQs,
  educational: generalProductFAQs,
  // packaging 沒有專屬 FAQ（只有 packaging-boxes），回退到通用
  packaging: generalProductFAQs,
};
