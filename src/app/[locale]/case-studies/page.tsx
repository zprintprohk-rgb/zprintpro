import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = translations[params.locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/case-studies/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/case-studies/`,
        'en': `${siteConfig.url}/en/case-studies/`,
        'ja-JP': `${siteConfig.url}/ja/case-studies/`,
      },
    },
  };
}

const translations = {
  'zh-hk': {
    metaTitle: '客戶案例 | 智印云 ZprintPro 印刷成功案例',
    metaDesc: '瀏覽智印云為香港及全球企業提供的印刷解決方案案例，涵蓋餐飲、零售、金融、教育、美容等行業。',
    h1: '客戶成功案例',
    subtitle: '真實客戶，真實成果——看看我們如何幫助各行業提升品牌與銷售',
    clientsLabel: '服務客戶',
    industriesLabel: '覆蓋行業',
    satisfactionLabel: '客戶滿意度',
    caseStudies: [
      {
        industry: '連鎖餐飲',
        client: '港式茶餐廳集團（8間分店）',
        need: '需要統一品牌的防水餐牌與宣傳單張，應對香港潮濕氣候與頻繁翻台',
        solution: '採用300g銅版紙覆啞膜餐牌，配合PVC防水貼紙標註限時優惠；A5宣傳單張雙面印刷派發',
        products: ['防水餐牌', 'A5宣傳單張', 'PVC防水貼紙'],
        result: '餐牌壽命延長3倍，翻台率提升15%，單月新增會員2000+',
        quote: '智印云的防水餐牌解決了我們長期以來的困擾，現在即使打翻湯水也只需輕輕一擦。',
        author: '陳經理',
        role: '營運總監',
      },
      {
        industry: '美容護膚',
        client: '本地有機護膚品牌',
        need: '新品牌上市，需要高端包裝盒與品牌名片建立專業形象',
        solution: '350g白卡紙磁吸禮盒配合燙金Logo；300g啞粉紙名片局部UV工藝',
        products: ['磁吸禮盒', '啞膠咭片', '透明貼紙'],
        result: '開業首月售出500套禮盒，Instagram打卡率提升40%',
        quote: '包裝的質感直接決定了客戶對品牌的第一印象，智印云幫我們做到了。',
        author: '林小姐',
        role: '品牌創辦人',
      },
      {
        industry: '金融法律',
        client: '中型律師事務所',
        need: '400g厚身名片與企業畫冊，展現專業權威與品牌一致性',
        solution: '400g超厚銅版紙名片配合啞膠覆膜；膠裝畫冊157g銅版紙四色印刷',
        products: ['厚身咭片(400g)', '膠裝畫冊', 'A4宣傳單張'],
        result: '客戶名片留存率提升60%，畫冊在業界會議中獲得高度評價',
        quote: '第一次拿到400g名片時，客戶都說這是他們見過最有份量的律師名片。',
        author: '黃律師',
        role: '合夥人',
      },
      {
        industry: '教育培訓',
        client: '補習社連鎖（5間分校）',
        need: '開學季大量教材、練習簿與宣傳單張，要求快速交付與色彩一致',
        solution: '數碼印刷練習簿1000本3天交付；A5宣傳單張雙面彩色派發',
        products: ['練習簿', 'A5宣傳單張', '證書'],
        result: '5間分校教材統一到貨，招生率同比提升25%',
        quote: '開學前最頭痛的就是教材印刷，智印云總能準時甚至提前交付。',
        author: '張主任',
        role: '教務主任',
      },
      {
        industry: '電商零售',
        client: '跨境電商賣家（年銷售額3000萬）',
        need: '小批量包裝盒與貼紙，快速迭代測試不同設計',
        solution: '數碼印刷折疊盒50個起訂；小批量貼紙A4尺寸快印',
        products: ['折疊盒', '小批量貼紙', '牛皮紙袋'],
        result: '包裝測試週期從2週縮短至3天，爆款產品包裝轉化率提升22%',
        quote: '小批量起訂讓我們可以大膽測試，不用擔心庫存積壓。',
        author: '周先生',
        role: '電商運營總監',
      },
      {
        industry: '活動策劃',
        client: '大型會展公司',
        need: '展會Backdrop、易拉寶與宣傳單張，要求即日取貨',
        solution: 'Backdrop背景板2.4×3m UV噴繪；易拉寶85×200cm當日交付',
        products: ['Backdrop背景板', '易拉寶', 'A4宣傳單張'],
        result: '展會佈置準時完成，客戶現場簽約率提升30%',
        quote: '急單交給智印云從來沒出過問題，品質和速度都有保障。',
        author: '劉小姐',
        role: '項目經理',
      },
      {
        industry: '房地產',
        client: '新盤代理公司',
        need: '樓書、宣傳單張與大型海報，高質感呈現物業賣點',
        solution: '200g厚紙宣傳單張；A1海報PP合成紙防水；膠裝樓書',
        products: ['厚紙宣傳單張', 'A1海報', '膠裝畫冊'],
        result: '開盤當日到訪量超預期40%，樓書在展廳被索取一空',
        quote: '厚紙單張的手感讓客戶願意多花時間閱讀，這對我們很重要。',
        author: '馬先生',
        role: '市場總監',
      },
      {
        industry: '節慶禮品',
        client: '企業禮品供應商',
        need: '農曆新年利是封與禮盒，5000個批量定制',
        solution: '120g紅紙燙金利是封；抽屜禮盒配合緞帶拉手',
        products: ['燙金利是封', '抽屜禮盒', '紙袋'],
        result: '5000個3天交付，客戶回購率100%',
        quote: '燙金的精細度超出了我們的預期，客戶非常滿意。',
        author: '何小姐',
        role: '採購經理',
      },
    ],
  },
  en: {
    metaTitle: 'Case Studies | ZprintPro Printing Success Stories',
    metaDesc: 'Explore ZprintPro printing solutions for Hong Kong and global businesses across F&B, retail, finance, education, and beauty industries.',
    h1: 'Client Success Stories',
    subtitle: 'Real clients, real results—see how we help businesses boost brand and sales',
    clientsLabel: 'Clients Served',
    industriesLabel: 'Industries',
    satisfactionLabel: 'Satisfaction',
    caseStudies: [
      {
        industry: 'Chain Restaurants',
        client: 'HK Cafe Group (8 branches)',
        need: 'Unified branded waterproof menus and flyers for Hong Kong humidity and high turnover',
        solution: '300g glossy paper matte-laminated menus with PVC waterproof stickers for promotions; A5 double-sided flyers',
        products: ['Waterproof Menus', 'A5 Flyers', 'PVC Stickers'],
        result: 'Menu lifespan extended 3x, turnover rate up 15%, 2000+ new members monthly',
        quote: 'ZprintPro waterproof menus solved our long-standing problem. Now spilled soup wipes right off.',
        author: 'Mr. Chan',
        role: 'Operations Director',
      },
      {
        industry: 'Beauty & Skincare',
        client: 'Local Organic Skincare Brand',
        need: 'Premium packaging and business cards for new brand launch',
        solution: '350g white card magnetic gift boxes with foil-stamped logo; 300g matte cards with spot UV',
        products: ['Magnetic Gift Box', 'Matte Cards', 'Clear Stickers'],
        result: '500 gift boxes sold in first month, Instagram check-ins up 40%',
        quote: 'Packaging quality directly determines first impressions. ZprintPro helped us nail it.',
        author: 'Ms. Lam',
        role: 'Brand Founder',
      },
      {
        industry: 'Finance & Legal',
        client: 'Mid-sized Law Firm',
        need: '400g thick business cards and corporate catalog for professional authority',
        solution: '400g ultra-thick glossy cards with matte lamination; perfect-bound catalogs on 157g glossy paper',
        products: ['Thick Cards (400g)', 'Perfect-bound Catalog', 'A4 Flyers'],
        result: 'Business card retention up 60%, catalog highly praised at industry events',
        quote: 'When clients received our 400g cards, they said it was the most substantial lawyer card they had seen.',
        author: 'Mr. Wong',
        role: 'Partner',
      },
      {
        industry: 'Education',
        client: 'Tutorial Chain (5 campuses)',
        need: 'Mass production of textbooks and exercise books before semester start',
        solution: 'Digital printing 1000 exercise books in 3 days; A5 double-sided color flyers',
        products: ['Exercise Books', 'A5 Flyers', 'Certificates'],
        result: 'All 5 campuses received materials on time, enrollment up 25% YoY',
        quote: 'The biggest headache before term starts is printing. ZprintPro always delivers on time or early.',
        author: 'Mr. Cheung',
        role: 'Academic Director',
      },
      {
        industry: 'E-commerce',
        client: 'Cross-border Seller (30M HKD annual)',
        need: 'Small-batch packaging and stickers for rapid design iteration',
        solution: 'Digital folding boxes from 50 units; small-batch sticker A4 quick printing',
        products: ['Folding Boxes', 'Small-batch Stickers', 'Kraft Bags'],
        result: 'Packaging test cycle shortened from 2 weeks to 3 days, conversion up 22%',
        quote: 'Low MOQ lets us test boldly without worrying about inventory buildup.',
        author: 'Mr. Chow',
        role: 'E-commerce Director',
      },
      {
        industry: 'Event Planning',
        client: 'Large Exhibition Company',
        need: 'Backdrop, roll-up banners and flyers with same-day pickup',
        solution: 'Backdrop 2.4×3m UV printing; roll-up banner 85×200cm same-day delivery',
        products: ['Backdrop', 'Roll-up Banner', 'A4 Flyers'],
        result: 'Exhibition setup completed on time, on-site client signing rate up 30%',
        quote: 'Rush orders to ZprintPro never fail. Quality and speed are both guaranteed.',
        author: 'Ms. Lau',
        role: 'Project Manager',
      },
      {
        industry: 'Real Estate',
        client: 'New Development Agency',
        need: 'High-quality brochures, flyers and large posters showcasing property highlights',
        solution: '200g thick paper flyers; A1 posters on PP synthetic waterproof paper; perfect-bound brochures',
        products: ['Thick Flyers', 'A1 Posters', 'Perfect-bound Catalogs'],
        result: 'Launch day visits exceeded forecast by 40%, all brochures taken at showroom',
        quote: 'The substantial feel of thick paper makes clients willing to spend more time reading.',
        author: 'Mr. Ma',
        role: 'Marketing Director',
      },
      {
        industry: 'Festive Gifts',
        client: 'Corporate Gift Supplier',
        need: '5000 Lunar New Year red packets and gift boxes bulk customized',
        solution: '120g red paper foil-stamped red packets; drawer gift boxes with ribbon pulls',
        products: ['Foil Red Packets', 'Drawer Gift Boxes', 'Paper Bags'],
        result: '5000 units delivered in 3 days, 100% client repurchase rate',
        quote: 'The foil stamping precision exceeded our expectations. Clients were very satisfied.',
        author: 'Ms. Ho',
        role: 'Procurement Manager',
      },
    ],
  },
  ja: {
    metaTitle: '導入事例 | ZprintPro 印刷成功事例',
    metaDesc: '香港およびグローバル企業向けのZprintPro印刷ソリューション事例をご覧ください。飲食、小売、金融、教育、美容業界をカバー。',
    h1: 'クライアント成功事例',
    subtitle: '実際のクライアント、実際の成果——業界のブランドと販売向上を支援',
    clientsLabel: '累計クライアント',
    industriesLabel: '業界カバー',
    satisfactionLabel: '満足度',
    caseStudies: [
      {
        industry: 'チェーン飲食店',
        client: '香港茶餐廳グループ（8店舗）',
        need: '香港の多湿気候と頻繁な回転率に対応する統一ブランドの防水メニューとチラシ',
        solution: '300gコート紙マットラミネートメニューとPVC防水ステッカー。A5両面カラーチラシ配布',
        products: ['防水メニュー', 'A5チラシ', 'PVCステッカー'],
        result: 'メニュー寿命3倍延長、回転率15%向上、月間新規会員2000名超',
        quote: '智印云の防水メニューは長年の悩みを解決しました。こぼしたスープもサッと拭けます。',
        author: '陳マネージャー',
        role: '運営ディレクター',
      },
      {
        industry: '美容スキンケア',
        client: '地元オーガニックスキンケアブランド',
        need: '新ブランド立ち上げに向けた高級パッケージと名刺',
        solution: '350g白カード磁石式ギフトボックスに箔押しロゴ。300gマット紙名刺に局部UV',
        products: ['磁石式ギフトボックス', 'マット名刺', '透明ステッカー'],
        result: '初月500セット完売、Instagramチェックイン率40%向上',
        quote: 'パッケージの質感がブランドの第一印象を決めます。智印云が実現してくれました。',
        author: '林さん',
        role: 'ブランド創業者',
      },
      {
        industry: '金融法律',
        client: '中規模法律事務所',
        need: '400g厚紙名刺と企業カタログで専門的な権威とブランド一貫性を演出',
        solution: '400g超厚コート紙名刺にマットラミネート。157gコート紙4色印刷の無線綴じカタログ',
        products: ['厚紙名刺(400g)', '無線綴じカタログ', 'A4チラシ'],
        result: '名刺保持率60%向上、カタログは業界イベントで高評価',
        quote: '400g名刺を受け取ったクライアントは、今までで最も重厚な弁護士名刺だと言いました。',
        author: '黄弁護士',
        role: 'パートナー',
      },
      {
        industry: '教育',
        client: '塾チェーン（5校舎）',
        need: '新学期前の大量教材、練習帳、チラシ。迅速な納品と色彩の均一性が必要',
        solution: 'デジタル印刷で練習帳1000冊3日納品。A5両面カラーチラシ配布',
        products: ['練習帳', 'A5チラシ', '証書'],
        result: '5校舎全てに教材が統一納品、募集率前年比25%向上',
        quote: '学期開始前の最大の悩みは印刷です。智印云はいつも期日内、時には前倒しで納品してくれます。',
        author: '張主任',
        role: '教務主任',
      },
      {
        industry: 'EC小売',
        client: '越境EC販売者（年商3000万香港ドル）',
        need: '小ロットのパッケージとステッカー、迅速なデザイン迭代テスト',
        solution: 'デジタル印刷折りたたみ箱50個から。小ロットステッカーA4サイズ即日印刷',
        products: ['折りたたみ箱', '小ロットステッカー', 'クラフト紙袋'],
        result: 'パッケージテスト周期が2週間から3日に短縮、コンバージョン率22%向上',
        quote: '小ロットからの発注で大胆にテストでき、在庫圧力を心配する必要がありません。',
        author: '周さん',
        role: 'EC運営ディレクター',
      },
      {
        industry: 'イベント企画',
        client: '大型会展会社',
        need: '展示会Backdrop、ロールアップバナー、チラシの即日受取',
        solution: 'Backdrop 2.4×3m UV印刷。ロールアップバナー85×200cm当日納品',
        products: ['Backdrop', 'ロールアップバナー', 'A4チラシ'],
        result: '展示会設置が定刻通り完了、現場の契約率30%向上',
        quote: '急ぎの注文を智印云に任せて一度も失敗したことがありません。品質も速度も保証されています。',
        author: '劉さん',
        role: 'プロジェクトマネージャー',
      },
      {
        industry: '不動産',
        client: '新築代理会社',
        need: '物件の売りポイントを高品質に演出するパンフレット、チラシ、大型ポスター',
        solution: '200g厚紙チラシ。A1ポスターPP合成紙防水。無線綴じパンフレット',
        products: ['厚紙チラシ', 'A1ポスター', '無線綴じカタログ'],
        result: '発売当日の来場数が予想を40%超過、ショールームのパンフレットが尽きる',
        quote: '厚紙チラシの手触りが、クライアントにより長く読んでいただく理由になります。',
        author: '馬さん',
        role: 'マーケティングディレクター',
      },
      {
        industry: '祝祭ギフト',
        client: '企業ギフトサプライヤー',
        need: '旧正月ポチ袋とギフトボックス、5000個の大量カスタム',
        solution: '120g赤紙箔押しポチ袋。引き出し式ギフトボックスにリボン引手',
        products: ['箔押しポチ袋', '引き出し式ギフトボックス', '紙袋'],
        result: '5000個を3日で納品、クライアントリピート率100%',
        quote: '箔押しの精度は予想を超えていました。クライアントも大変満足しています。',
        author: '何さん',
        role: '購買マネージャー',
      },
    ],
  },
};

export default function CaseStudiesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = translations[locale];

  // Review Schema (aggregate + individual)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: t.caseStudies.map((cs, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: cs.author },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: cs.quote,
        itemReviewed: {
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          image: siteConfig.logo,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={reviewSchema} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white py-16 md:py-24">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
            <div className="mt-8 flex justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-white/80 text-sm">{t.clientsLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-white/80 text-sm">{t.industriesLabel}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-white/80 text-sm">{t.satisfactionLabel}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {t.caseStudies.map((cs, i) => (
                <article key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-[#2873F5]/10 text-[#2873F5] text-sm font-medium rounded-full">{cs.industry}</span>
                      <span className="text-gray-400 text-sm">{cs.client}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
                            {locale === 'zh-hk' ? '客戶需求' : locale === 'ja' ? '顧客の課題' : 'Client Need'}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">{cs.need}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
                            {locale === 'zh-hk' ? '解決方案' : locale === 'ja' ? '解決策' : 'Solution'}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">{cs.solution}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
                            {locale === 'zh-hk' ? '使用產品' : locale === 'ja' ? '使用製品' : 'Products Used'}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {cs.products.map((p, pi) => (
                              <span key={pi} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">{p}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h3 className="text-sm font-bold text-green-700 uppercase tracking-wide mb-1">
                            {locale === 'zh-hk' ? '成果數據' : locale === 'ja' ? '成果データ' : 'Results'}
                          </h3>
                          <p className="text-green-800 font-semibold">{cs.result}</p>
                        </div>
                        <blockquote className="border-l-4 border-[#2873F5] pl-4 italic text-gray-600 text-sm leading-relaxed">
                          &ldquo;{cs.quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="font-medium text-gray-700">{cs.author}</span>
                          <span>·</span>
                          <span>{cs.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
