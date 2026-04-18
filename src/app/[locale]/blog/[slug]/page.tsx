import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, siteConfig } from '@/lib/seo';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

const posts: Record<string, Record<string, { title: string; description: string; date: string; category: string; content: string }>> = {
  'zh-hk': {
    'sticker-guide': {
      title: '貼紙印刷完全指南：材質、工藝與應用場景',
      description: '深入了解貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。',
      date: '2024-03-15', category: '貼紙知識',
      content: '貼紙是品牌宣傳和產品包裝中不可或缺的元素...',
    },
    'business-card-design': {
      title: '名片設計的10個黃金法則',
      description: '從排版到色彩搭配，掌握名片設計的核心技巧，打造令人印象深刻的專業形象。',
      date: '2024-03-10', category: '名片知識',
      content: '名片是商業交往中的第一印象...',
    },
    'packaging-trends': {
      title: '2024包裝盒設計趨勢解析',
      description: '探索最新包裝設計趨勢，從極簡主義到環保材質，了解如何讓產品在貨架上脫穎而出。',
      date: '2024-03-05', category: '包裝知識',
      content: '包裝設計正在經歷一場革命...',
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷色彩模式詳解',
      description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。',
      date: '2024-02-28', category: '印刷工藝',
      content: '色彩管理是印刷品質的關鍵...',
    },
    'paper-materials': {
      title: '印刷紙材選擇指南：從銅版紙到特種紙',
      description: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。',
      date: '2024-02-20', category: '印刷工藝',
      content: '紙張是印刷品的靈魂...',
    },
    'eco-printing': {
      title: '環保印刷：可持續包裝的未來',
      description: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。',
      date: '2024-02-15', category: '行業趨勢',
      content: '可持續發展已經成為全球趨勢...',
    },
  },
  en: {
    'sticker-guide': {
      title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications',
      description: 'Deep dive into sticker material choices, surface treatments, and application scenarios.',
      date: '2024-03-15', category: 'Sticker Guide',
      content: 'Stickers are essential elements in brand promotion...',
    },
    'business-card-design': {
      title: '10 Golden Rules for Business Card Design',
      description: 'From layout to color matching, master the core techniques of business card design.',
      date: '2024-03-10', category: 'Card Guide',
      content: 'Business cards create the first impression...',
    },
    'packaging-trends': {
      title: '2024 Packaging Design Trends Analysis',
      description: 'Explore the latest packaging design trends from minimalism to eco-friendly materials.',
      date: '2024-03-05', category: 'Packaging Guide',
      content: 'Packaging design is undergoing a revolution...',
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB: Complete Guide to Print Color Modes',
      description: 'Understand the difference between CMYK and RGB color modes for optimal print results.',
      date: '2024-02-28', category: 'Printing Techniques',
      content: 'Color management is key to print quality...',
    },
    'paper-materials': {
      title: 'Paper Selection Guide: From Art Paper to Specialty Stock',
      description: 'Analysis of different paper characteristics to help you choose the right stock.',
      date: '2024-02-20', category: 'Printing Techniques',
      content: 'Paper is the soul of printed materials...',
    },
    'eco-printing': {
      title: 'Eco-Friendly Printing: The Future of Sustainable Packaging',
      description: 'Learn about eco-friendly printing materials and processes for a better planet and brand.',
      date: '2024-02-15', category: 'Industry Trends',
      content: 'Sustainability has become a global trend...',
    },
  },
  ja: {
    'sticker-guide': {
      title: 'ステッカー印刷完全ガイド：材質、加工と応用場面',
      description: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。',
      date: '2024-03-15', category: 'ステッカー知識',
      content: 'ステッカーはブランド宣伝に欠かせない要素です...',
    },
    'business-card-design': {
      title: '名刺デザインの10の黄金法則',
      description: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。',
      date: '2024-03-10', category: '名刺知識',
      content: '名刺はビジネスでの第一印象を作ります...',
    },
    'packaging-trends': {
      title: '2024年パッケージデザイントレンド解析',
      description: 'ミニマリズムからエコ素材まで、最新のパッケージデザイントレンドを探ります。',
      date: '2024-03-05', category: '包装知識',
      content: 'パッケージデザインに革命が起きています...',
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷カラーモード完全解説',
      description: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。',
      date: '2024-02-28', category: '印刷技術',
      content: 'カラーマネージメントは印刷品質の鍵です...',
    },
    'paper-materials': {
      title: '印刷用紙選択ガイド：アート紙から特殊紙まで',
      date: '2024-02-20', category: '印刷技術',
      description: '異なる紙の特性を分析し、最適な用紙を選びましょう。',
      content: '紙は印刷物の魂です...',
    },
    'eco-printing': {
      title: 'エコ印刷：持続可能な包装の未来',
      description: '地球とブランドの両方のために、エコ印刷材料とプロセスについて学びましょう。',
      date: '2024-02-15', category: '業界トレンド',
      content: '持続可能性は世界的なトレンドになっています...',
    },
  },
};

const articleSlugs = ['sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing'];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['zh-hk', 'en', 'ja'].forEach((locale) => {
    articleSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const post = posts[locale]?.[params.slug];
  return {
    title: post?.title || 'Blog Post',
    description: post?.description || '',
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}blog/${params.slug}/`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale as Locale;
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;
  const post = posts[locale]?.[params.slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-[#333333]">Post not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`${localePrefix}/blog/`} className="text-[#2873F5] hover:underline text-sm mb-6 inline-block">
          ← Back to Blog
        </Link>
        <article className="bg-white rounded-xl border border-gray-100 p-8">
          <span className="text-xs font-medium text-[#F87314] bg-orange-50 px-2 py-1 rounded">{post.category}</span>
          <h1 className="mt-3 text-2xl md:text-3xl font-bold text-[#333333]">{post.title}</h1>
          <p className="mt-2 text-sm text-gray-400">{post.date}</p>
          <div className="mt-6 prose prose-blue max-w-none">
            <p className="text-gray-600 leading-relaxed">{post.content}</p>
            <p className="text-gray-500 mt-8 italic">(Full article content will be expanded with detailed SEO-optimized content.)</p>
          </div>
        </article>
      </div>
    </main>
  );
}
