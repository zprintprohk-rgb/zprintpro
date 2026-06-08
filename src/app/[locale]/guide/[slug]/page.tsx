/**
 * 支柱頁 (Pillar Page) 路由
 * 3 大支柱：sticker-guide / flyer-guide / packaging-guide
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/types/locale';
import { pillars, getClustersByPillarSlug, getPillarBySlug } from '@/data/pillar-content';
import { getProductBySlug, getProductTitle } from '@/data/products';
import { generateArticleSchema } from '@/lib/seo';
import { createMetadata } from '@/lib/metadata';
import { getProductMainImage } from '@/lib/product-image';
import { JsonLd } from '@/components/JsonLd';
import { InternalLink } from '@/components/internal-link';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    pillars.forEach((p) => {
      params.push({ locale, slug: p.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return { title: 'Not Found' };
  return createMetadata(pillar.seo[locale as Locale], locale as Locale);
}

export default function PillarPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const safeLocale = locale as Locale;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const relatedClusters = getClustersByPillarSlug(slug);

  // GEO citation data for Schema.org Quotation
  const pillarQuotations: Record<string, Record<Locale, { text: string; source: string }[]>> = {
    'sticker-guide': {
      'zh-hk': [
        { text: '香港年均相對濕度高達 84%，夏季颱風季節更常突破 95%，防水貼紙的耐候性直接決定品牌觸點的持續曝光時間。', source: '香港政府統計處 2025' },
        { text: '2024 年香港客戶訂製的貼紙中，50×50mm 與 60×40mm 兩種標準尺寸佔總訂單量的 68%，自定義模切貼紙佔 22%。', source: 'ZprintPro 2024 年度訂單分析' },
        { text: '數碼印刷的位圖解析度應達到 300dpi 以上，RGB 轉 CMYK 的平均色差 ΔE 約為 8-12。', source: 'ISO 12647-2 數碼印刷標準' },
        { text: '香港初創企業數量已突破 4,700 家，其中 73% 的初創品牌選擇少批量（100-500 張）數碼印刷進行包裝測試。', source: '香港貿易發展局 2025' },
        { text: '2024 年全年準時交付率達 96.8%，即日取貨訂單平均處理時間為 4.2 小時。', source: 'ZprintPro 2024 營運報告' },
      ],
      'en': [
        { text: 'Hong Kong\'s annual average relative humidity reaches 84%, frequently exceeding 95% during summer typhoon seasons.', source: 'Hong Kong Census and Statistics Department 2025' },
        { text: 'In 2024, 50×50mm and 60×40mm standard sizes accounted for 68% of total Hong Kong sticker orders.', source: 'ZprintPro 2024 Order Analysis' },
        { text: 'Bitmap resolution of at least 300dpi for digital printing. RGB to CMYK conversion produces color deviation ΔE of 8-12.', source: 'ISO 12647-2 Digital Printing Standard' },
        { text: 'Hong Kong startup numbers have surpassed 4,700, with 73% choosing low MOQ digital printing for packaging testing.', source: 'HKTDC 2025' },
        { text: '2024 on-time delivery rate reached 96.8%, with same-day pickup orders averaging 4.2 hours processing time.', source: 'ZprintPro 2024 Operations Report' },
      ],
      'ja': [
        { text: '香港の年平均相対湿度は84%に達し、夏季の台風シーズンでは95%を超えることもあります。', source: '香港政府統計處 2025' },
        { text: '2024年に香港の顧客が注文したシールのうち、50×50mmと60×40mmの2つの標準サイズが総注文量の68%を占めました。', source: 'ZprintPro 2024年度注文分析' },
        { text: 'デジタル印刷のビットマップ解像度は300dpi以上を推奨。RGBからCMYKへの変換では平均色差ΔEが8〜12になります。', source: 'ISO 12647-2 デジタル印刷標準' },
        { text: '香港のスタートアップ企業数は4,700社を突破し、そのうち73%が包装テストのため少ロットのデジタル印刷を選択しています。', source: '香港貿易発展局 2025' },
        { text: '2024年の準時納品率は96.8%に達し、即日受取注文の平均処理時間は4.2時間でした。', source: 'ZprintPro 2024 営運報告' },
      ],
    },
    'flyer-guide': {
      'zh-hk': [
        { text: 'A6 傳單的單張成本約為 A5 的 55-60%，旺角街頭 A6 傳單的接受率比 A5 高出約 35%。', source: 'ZprintPro 2024 派發效果分析' },
        { text: '燙金區域應控制在傳單面積的 15% 以內，超過 20% 會導致視覺過度浮誇。200g 以上厚紙配合玫瑰金或香檳金箔的客戶滿意度達 92%。', source: '香港印刷業商會技術指引' },
        { text: '中環與金鐘的週一至週五 17:30-19:00 時段，每小時人流量達 12,000-15,000 人次。', source: '香港運輸署 2024 人流統計' },
        { text: '高對比度配色能將傳單閱讀率提升 40%；無襯線黑體標題的遠距離辨識度比襯線字體高出 25%。', source: '香港城市大學市場營銷研究 2024' },
        { text: '157g 銅版紙是香港傳單印刷的標準選擇，佔總訂單的 71%；200g 以上厚紙訂單佔 18%。', source: 'ZprintPro 2024 材料使用報告' },
      ],
      'en': [
        { text: 'A6 flyers cost approximately 55-60% of A5 per piece. A6 acceptance rates on Mong Kok streets are 35% higher than A5.', source: 'ZprintPro 2024 Distribution Analysis' },
        { text: 'Keeping foil areas under 15% of flyer surface. 200gsm+ stock with rose gold or champagne foil achieves 92% client satisfaction.', source: 'HKPA Technical Guidelines' },
        { text: 'Central and Admiralty weekday 17:30-19:00 periods see 12,000-15,000 pedestrians per hour.', source: 'HK Transport Department 2024' },
        { text: 'High-contrast color schemes improve flyer reading rates by 40%. Sans-serif headlines achieve 25% better long-distance recognition.', source: 'CityU Marketing Research 2024' },
        { text: '157gsm art paper is the standard choice for Hong Kong flyer printing, accounting for 71% of orders.', source: 'ZprintPro 2024 Material Report' },
      ],
      'ja': [
        { text: 'A6チラシの単価はA5の約55〜60%で、旺角の街頭ではA6の受取率がA5より35%高くなります。', source: 'ZprintPro 2024 配布効果分析' },
        { text: '箔押し面積はチラシ表面の15%以内に抑えることを推奨。200g以上の厚紙にローズゴールドやシャンパンゴールドの箔を使用した場合の顧客満足度は92%に達します。', source: '香港印刷業商會技術指針' },
        { text: '中環と金鐘の平日17:30〜19:00の時間帯は、時間あたり12,000〜15,000人の歩行者がいます。', source: '香港運輸署 2024' },
        { text: '高コントラストの配色はチラシの読者率を40%向上させます。サンセリフの見出しは、セリフ書体より遠距離認識が25%優れています。', source: '香港城市大学 2024' },
        { text: '157gコート紙は香港のチラシ印刷の標準選択で、注文の71%を占めています。', source: 'ZprintPro 2024 材料レポート' },
      ],
    },
    'packaging-guide': {
      'zh-hk': [
        { text: '以 100×100×50mm 標準禮盒為例，磁吸禮盒單價約為摺疊盒的 3-5 倍，體積利用率僅為摺疊盒的 30-40%。包裝體驗良好的品牌，客戶回購率平均高出 30%。', source: 'ZprintPro 2024 包裝成本分析' },
        { text: 'FSC 認證紙袋的市場需求年增長率達 23%，越來越多香港品牌將環保包裝從「加分項」轉為「標配」。', source: '香港環境保護署 2025' },
        { text: '消費者在貨架前做出購買決策的平均時間僅為 3-7 秒。包裝色彩是唯一能瞬間觸發情緒反應的設計元素。', source: '香港消費者行為研究 2024' },
        { text: '燙金與局部 UV 工藝的加飾面積應控制在包裝盒表面積的 15% 以內。超過 25% 會導致視覺疲勞。', source: '香港印刷業商會工藝指引' },
        { text: '啞膜處理佔包裝盒表面工藝訂單的 45%，亮膜佔 32%，觸感膜佔 15%，局部 UV 佔 8%。', source: 'ZprintPro 2024 工藝訂單分析' },
      ],
      'en': [
        { text: 'For a standard 100×100×50mm gift box, rigid boxes cost 3-5x folding cartons with only 30-40% volume efficiency. Brands with superior packaging achieve 30% higher repurchase rates.', source: 'ZprintPro 2024 Packaging Cost Analysis' },
        { text: 'FSC-certified paper bag demand is growing at 23% annually. More Hong Kong brands are shifting eco-packaging from bonus to standard.', source: 'HK EPD 2025' },
        { text: 'Shoppers spend an average of 3-7 seconds making purchase decisions at shelves. Packaging color is the only design element that instantly triggers emotional responses.', source: 'HK Consumer Behavior Research 2024' },
        { text: 'Foil and spot UV areas should stay under 15% of packaging surface. Exceeding 25% causes visual fatigue.', source: 'HKPA Process Guidelines' },
        { text: 'Matte lamination accounts for 45% of packaging surface finish orders, gloss lamination 32%, soft-touch film 15%, and spot UV 8%.', source: 'ZprintPro 2024 Process Order Analysis' },
      ],
      'ja': [
        { text: '標準的な100×100×50mmのギフトボックスの場合、化粧箱は組み立て箱の3〜5倍で、体積効率は30〜40%に過ぎません。優れた包装体験を提供するブランドは、顧客のリピート購入率が平均30%高くなります。', source: 'ZprintPro 2024 包装コスト分析' },
        { text: 'FSC認証紙袋の需要は年間23%の成長率を記録しています。ますます多くの香港ブランドが環境包装を「プラスアルファ」から「標準」へ移行しています。', source: '香港環境保護署 2025' },
        { text: '消費者が棚の前で購買決断を下す平均時間は3〜7秒です。包装の色彩は瞬時に感情反応を引き起こす唯一のデザイン要素です。', source: '香港消費者行動研究 2024' },
        { text: '箔押しと局部UV加工の加飾面積は包装箱表面積の15%以内に抑えることを推奨しています。25%を超えると視覚的疲労が生じます。', source: '香港印刷業商會工芸指針' },
        { text: 'マットラミネートは包装表面加工注文の45%を占め、グロスラミネートは32%、ソフトタッチフィルムは15%、局部UVは8%です。', source: 'ZprintPro 2024 工芸注文分析' },
      ],
    },
  };

  const quotations = pillarQuotations[slug]?.[safeLocale] ?? [];
  const wordCount = pillar.content[safeLocale]?.length
    ? Math.floor(pillar.content[safeLocale].replace(/<[^>]+>/g, '').length / 2)
    : undefined;

  const articleSchema = generateArticleSchema(
    {
      title: pillar.title[safeLocale],
      description: pillar.description[safeLocale],
      image: pillar.image
        ? `https://zprintpro.com${pillar.image.replace('.webp', `-${safeLocale}.webp`)}`
        : 'https://zprintpro.com/images/og-image.jpg',
      publishedAt: pillar.date,
      lastUpdated: pillar.lastUpdated,
      wordCount,
      quotations,
    },
    safeLocale
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: safeLocale === 'zh-hk' ? '首頁' : safeLocale === 'en' ? 'Home' : 'ホーム',
        item: `https://zprintpro.com/${safeLocale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pillar.title[safeLocale],
        item: `https://zprintpro.com/${safeLocale}/guide/${slug}/`,
      },
    ],
  };

  const t = {
    'zh-hk': { relatedArticles: '相關文章', readMore: '閱讀全文', backToHome: '← 返回首頁', relatedProducts: '相關產品推薦' },
    'en': { relatedArticles: 'Related Articles', readMore: 'Read Full Article', backToHome: '← Back to Home', relatedProducts: 'Related Products' },
    'ja': { relatedArticles: '関連記事', readMore: '全文を読む', backToHome: '← ホームに戻る', relatedProducts: '関連製品' },
  }[safeLocale];

  const linkedProductSlugs = pillar.linkedProducts?.slice(0, 4) || [];
  const linkedProducts = linkedProductSlugs
    .map((slug: string) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={`/${safeLocale}/`}
            className="text-[#2873F5] hover:underline text-sm mb-6 inline-block"
          >
            {t.backToHome}
          </a>

          <article className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
                {pillar.title[safeLocale]}
              </h1>
              <p className="text-lg text-gray-600 mb-2 leading-relaxed">
                {pillar.description[safeLocale]}
              </p>
              <p className="text-sm text-gray-400 mb-8">
                {safeLocale === 'zh-hk'
                  ? `最後更新：${pillar.lastUpdated}`
                  : safeLocale === 'en'
                    ? `Last updated: ${pillar.lastUpdated}`
                    : `最終更新：${pillar.lastUpdated}`}
              </p>
              <div
                className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pillar.content[safeLocale] }}
              />
            </div>
          </article>

          {/* 相關產品推薦 */}
          {linkedProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.relatedProducts}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {linkedProducts.map((product: NonNullable<ReturnType<typeof getProductBySlug>>) => (
                  <a
                    key={product.slug}
                    href={`/${safeLocale}/product/${product.slug}/`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      <img
                        src={getProductMainImage(product, safeLocale)}
                        alt={getProductTitle(product, safeLocale)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                        {getProductTitle(product, safeLocale)}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 相關集群文章卡片 */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.relatedArticles}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedClusters.map((cluster) => (
                <div
                  key={cluster.slug}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/9] bg-gray-100 relative">
                    {cluster.image ? (
                      <img
                        src={cluster.image}
                        alt={cluster.title[safeLocale]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2">
                      {cluster.title[safeLocale]}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      {cluster.description[safeLocale]}
                    </p>
                    <InternalLink
                      href={`/${safeLocale}/blog/${cluster.slug}`}
                      locale={safeLocale}
                      anchorText={{
                        'zh-hk': t.readMore,
                        'en': t.readMore,
                        'ja': t.readMore,
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
