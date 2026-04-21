'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ShoppingCart, User, Search, ChevronDown } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface HeaderProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24/7 客戶服務',
    searchPlaceholder: '搜尋印刷產品...',
    search: '搜尋',
    login: '登入',
    cart: '購物車',
    home: '首頁',
    knowledge: '印刷知識',
    contact: '聯絡我們',
    categories: {
      'paper-bags': '紙袋印刷',
      'flyers': '宣傳單張',
      'stickers': '貼紙印刷',
      'packaging': '包裝盒定制',
      'posters': '海報定制',
      'educational': '校園印刷',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
  en: {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24/7 Customer Service',
    searchPlaceholder: 'Search printing products...',
    search: 'Search',
    login: 'Login',
    cart: 'Cart',
    home: 'Home',
    knowledge: 'Knowledge',
    contact: 'Contact Us',
    categories: {
      'paper-bags': 'Paper Bags',
      'flyers': 'Flyers',
      'stickers': 'Stickers',
      'packaging': 'Packaging',
      'posters': 'Posters',
      'educational': 'Educational',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
  ja: {
    phone: '+86 181 2638 0255',
    email: 'zprintpro@outlook.com',
    whatsapp: 'WhatsApp',
    support: '24時間年中無休サポート',
    searchPlaceholder: '印刷製品を検索...',
    search: '検索',
    login: 'ログイン',
    cart: 'カート',
    home: 'ホーム',
    knowledge: '印刷知識',
    contact: 'お問い合わせ',
    categories: {
      'paper-bags': '紙袋印刷',
      'flyers': 'チラシ印刷',
      'stickers': 'ステッカー印刷',
      'packaging': 'パッケージ印刷',
      'posters': 'ポスター印刷',
      'educational': '教育印刷',
    },
    navOrder: ['paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'educational'] as const,
  },
};

const categorySubItems: Record<string, string[]> = {
  'paper-bags': ['kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags'],
  'flyers': ['a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers'],
  'stickers': ['waterproof-stickers', 'transparent-stickers', 'foil-stickers', 'die-cut-stickers', 'removable-stickers'],
  'packaging': ['gift-boxes', 'cosmetic-boxes', 'food-boxes', 'mailer-boxes', 'folding-boxes'],
  'posters': ['a2-posters', 'a1-posters', 'outdoor-posters', 'display-posters', 'art-posters'],
  'educational': ['exercise-books', 'certificates', 'school-flyers', 'textbooks'],
};

// 印刷知識下拉菜單內容（文章分類）
const knowledgeSubItems: Record<string, string[]> = {
  'zh-hk': ['畫冊知識', '貼紙知識', '包裝盒知識', '印刷工藝', '常見問題', '公司新聞'],
  'en': ['Brochure Guide', 'Sticker Guide', 'Packaging Guide', 'Printing Techniques', 'FAQ', 'Company News'],
  'ja': ['パンフレット知識', 'ステッカー知識', '包装箱知識', '印刷技術', 'よくある質問', '会社ニュース'],
};

const categoryCounts: Record<string, number> = {
  'paper-bags': 7,
  'flyers': 7,
  'stickers': 8,
  'packaging': 6,
  'posters': 6,
  'educational': 4,
};

// 下拉菜單對齊偏移（居中以按鈕中心為基準，再偏移）
const dropdownOffsets: Record<string, string> = {
  'paper-bags': 'translateX(calc(-50% + 240px))',
  'flyers': 'translateX(calc(-50% + 160px))',
  'stickers': 'translateX(calc(-50% + 80px))',
  'packaging': 'translateX(-50%)',
  'posters': 'translateX(calc(-50% - 80px))',
  'educational': 'translateX(calc(-50% - 160px))',
  'blog': 'translateX(calc(-50% - 240px))',
};

const subItemNames: Record<string, Record<string, string>> = {
  'zh-hk': {
    'kraft-paper-bags': '牛皮紙袋', 'white-card-bags': '白卡紙袋', 'gift-bags': '禮品袋',
    'eco-paper-bags': '環保紙袋', 'handle-bags': '手提紙袋',
    'a4-flyers': 'A4宣傳單張', 'a5-flyers': 'A5宣傳單張', 'a3-flyers': 'A3宣傳單張',
    'dl-flyers': 'DL宣傳單張', 'door-hangers': '門掛卡',
    'waterproof-stickers': '防水貼紙', 'transparent-stickers': '透明貼紙',
    'foil-stickers': '燙金貼紙', 'die-cut-stickers': '異形貼紙', 'hologram-stickers': '全息貼紙',
    'product-boxes': '產品包裝盒', 'mailer-boxes': '快遞紙盒', 'gift-boxes': '禮品盒',
    'display-boxes': '展示盒', 'food-packaging': '食品包裝',
    'a2-posters': 'A2海報', 'a1-posters': 'A1海報', 'a0-posters': 'A0海報',
    'foam-board-posters': '泡沫板海報', 'backlit-posters': '燈箱海報',
    'workbooks': '練習簿', 'certificates': '證書', 'diplomas': '畢業證書', 'educational-banners': '教育橫幅',
  },
  en: {
    'kraft-paper-bags': 'Kraft Paper Bags', 'white-card-bags': 'White Card Bags', 'gift-bags': 'Gift Bags',
    'eco-paper-bags': 'Eco Paper Bags', 'handle-bags': 'Handle Bags',
    'a4-flyers': 'A4 Flyers', 'a5-flyers': 'A5 Flyers', 'a3-flyers': 'A3 Flyers',
    'dl-flyers': 'DL Flyers', 'door-hangers': 'Door Hangers',
    'waterproof-stickers': 'Waterproof Stickers', 'transparent-stickers': 'Transparent Stickers',
    'foil-stickers': 'Foil Stickers', 'die-cut-stickers': 'Die-cut Stickers', 'hologram-stickers': 'Hologram Stickers',
    'product-boxes': 'Product Boxes', 'mailer-boxes': 'Mailer Boxes', 'gift-boxes': 'Gift Boxes',
    'display-boxes': 'Display Boxes', 'food-packaging': 'Food Packaging',
    'a2-posters': 'A2 Posters', 'a1-posters': 'A1 Posters', 'a0-posters': 'A0 Posters',
    'foam-board-posters': 'Foam Board Posters', 'backlit-posters': 'Backlit Posters',
    'workbooks': 'Workbooks', 'certificates': 'Certificates', 'diplomas': 'Diplomas', 'educational-banners': 'Educational Banners',
  },
  ja: {
    'kraft-paper-bags': 'クラフト紙袋', 'white-card-bags': '白卡紙袋', 'gift-bags': 'ギフトバッグ',
    'eco-paper-bags': 'エコ紙袋', 'handle-bags': '手提げ紙袋',
    'a4-flyers': 'A4チラシ', 'a5-flyers': 'A5チラシ', 'a3-flyers': 'A3チラシ',
    'dl-flyers': 'DLチラシ', 'door-hangers': 'ドアハンガー',
    'waterproof-stickers': '防水ステッカー', 'transparent-stickers': '透明ステッカー',
    'foil-stickers': '燙金ステッカー', 'die-cut-stickers': 'ダイカットステッカー', 'hologram-stickers': 'ホログラムステッカー',
    'product-boxes': '製品箱', 'mailer-boxes': '配送箱', 'gift-boxes': 'ギフト箱',
    'display-boxes': '展示箱', 'food-packaging': '食品包装',
    'a2-posters': 'A2ポスター', 'a1-posters': 'A1ポスター', 'a0-posters': 'A0ポスター',
    'foam-board-posters': '発泡板ポスター', 'backlit-posters': 'バックライトポスター',
    'workbooks': 'ワークブック', 'certificates': '証明書', 'diplomas': '卒業証書', 'educational-banners': '教育バナー',
  },
};

const featuredImages: Record<string, string> = {
  'kraft-paper-bags': '/images/hero-v21/kraft-bag.jpg',
  'white-card-bags': '/images/hero-v21/white-bag.jpg',
  'gift-bags': '/images/hero-v21/gift-box.jpg',
  'a4-flyers': '/images/hero-v21/flyer.jpg',
  'a5-flyers': '/images/hero-v21/poster.jpg',
  'double-sided-flyers': '/images/hero-v21/sticker.jpg',
  'folded-leaflets': '/images/hero-v21/gift-box.jpg',
  'thick-paper-flyers': '/images/hero-v21/kraft-bag.jpg',
  'waterproof-stickers': '/images/hero-v21/sticker.jpg',
  'transparent-stickers': '/images/hero-v21/flyer.jpg',
  'foil-stickers': '/images/hero-v21/poster.jpg',
  'removable-stickers': '/images/hero-v21/white-bag.jpg',
  'die-cut-stickers': '/images/hero-v21/kraft-bag.jpg',
  'gift-boxes': '/images/hero-v21/gift-box.jpg',
  'cosmetic-boxes': '/images/hero-v21/white-bag.jpg',
  'food-boxes': '/images/hero-v21/kraft-bag.jpg',
  'mailer-boxes': '/images/hero-v21/kraft-bag.jpg',
  'folding-boxes': '/images/hero-v21/gift-box.jpg',
  'a2-posters': '/images/hero-v21/poster.jpg',
  'a1-posters': '/images/hero-v21/flyer.jpg',
  'outdoor-posters': '/images/hero-v21/sticker.jpg',
  'display-posters': '/images/hero-v21/gift-box.jpg',
  'art-posters': '/images/hero-v21/poster.jpg',
  'exercise-books': '/images/hero-v21/flyer.jpg',
  'certificates': '/images/hero-v21/poster.jpg',
  'school-flyers': '/images/hero-v21/sticker.jpg',
  'textbooks': '/images/hero-v21/flyer.jpg',
};

const featuredDescs: Record<string, Record<string, string>> = {
  'zh-hk': {
    'kraft-paper-bags': '環保耐用，100個起訂', 'white-card-bags': '高檔印刷，品牌首選', 'gift-bags': '精美包裝，送禮首選',
    'a4-flyers': '彩色印刷，即日可取', 'a5-flyers': '多種尺寸，宣傳必備', 'double-sided-flyers': '雙面印刷，信息加倍', 'folded-leaflets': '摺頁設計，層次豐富', 'thick-paper-flyers': '厚紙質感，高端形象',
    'waterproof-stickers': '耐用防水，戶外適用', 'transparent-stickers': '清晰透明，質感出眾', 'foil-stickers': '高檔質感，奢華體驗', 'removable-stickers': '可重複撕貼，靈活運用', 'die-cut-stickers': '任意形狀，創意無限',
    'gift-boxes': '精美包裝，提升品牌', 'cosmetic-boxes': '時尚外觀，品牌加分', 'food-boxes': '食品級材，安全衛生', 'mailer-boxes': '快遞專用，運輸安全', 'folding-boxes': '摺疊設計，節省倉儲',
    'display-boxes': '展示專用，吸引目光', 'food-packaging': '食品級材，安全衛生',
    'a2-posters': '大圖輸出，色彩鮮豔', 'a1-posters': '展覽專用，視覺震撼', 'outdoor-posters': '防水防曬，戶外耐用', 'display-posters': '展示專用，吸引眼球', 'art-posters': '藝術級印刷，色彩細膩',
    'foam-board-posters': '輕便展示，易於搬運', 'backlit-posters': '燈箱專用，夜間醒目',
    'exercise-books': '教育專用，品質保證', 'certificates': '正式場合，尊貴體驗', 'school-flyers': '校園宣傳，信息傳遞', 'textbooks': '教學必備，知識傳承',
  },
  'en': {
    'kraft-paper-bags': 'Eco-friendly, min 100', 'white-card-bags': 'Premium, brand choice', 'gift-bags': 'Elegant, perfect gift',
    'a4-flyers': 'Full color, same day', 'a5-flyers': 'Multi sizes, essential', 'a3-flyers': 'Large format, impact',
    'waterproof-stickers': 'Durable, outdoor use', 'transparent-stickers': 'Clear, premium feel', 'foil-stickers': 'Luxury, elegant look',
    'product-boxes': 'Sturdy, protective', 'mailer-boxes': 'Shipping safe', 'gift-boxes': 'Elegant, branded',
    'display-boxes': 'Display, eye-catching', 'food-packaging': 'Food-grade, hygienic',
    'a2-posters': 'Large, vivid colors', 'a1-posters': 'Exhibition ready', 'a0-posters': 'Huge, outdoor ads',
    'foam-board-posters': 'Light, easy move', 'backlit-posters': 'Backlit, night visible',
    'workbooks': 'Education quality', 'certificates': 'Formal, prestigious', 'diplomas': 'Graduation memento', 'educational-banners': 'School events',
  },
  'ja': {
    'kraft-paper-bags': 'エコで耐久性あり', 'white-card-bags': '高級印刷，ブランド', 'gift-bags': 'ギフトに最適',
    'a4-flyers': 'フルカラー当日', 'a5-flyers': '多サイズ必須', 'a3-flyers': '大判出力衝撃',
    'waterproof-stickers': '防水耐久屋外', 'transparent-stickers': '透明高級感', 'foil-stickers': '高級ラグジュアリー',
    'product-boxes': '丈夫保護製品', 'mailer-boxes': '配送安全専用', 'gift-boxes': 'ブランド向上',
    'display-boxes': '展示注目集める', 'food-packaging': '食品級衛生的',
    'a2-posters': '大判鮮やか色彩', 'a1-posters': '展示会専用', 'a0-posters': '巨大屋外広告',
    'foam-board-posters': '軽量持運び易', 'backlit-posters': 'バックライト夜間',
    'workbooks': '教育品質保証', 'certificates': '格式高級体験', 'diplomas': '卒業記念必須', 'educational-banners': '学校イベント',
  },
};

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const t = translations[locale];
  const localePrefix = `/${locale}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${localePrefix}/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getSubItemName = (slug: string) => {
    return subItemNames[locale]?.[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const navLinkClass = (isActive: boolean) =>
    `flex-1 h-full w-full flex items-center justify-center text-[16px] font-medium transition-colors ${
      isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
    }`;

  const catNavLinkClass = (catSlug: string) =>
    `h-full w-full flex items-center justify-center gap-1 text-[16px] font-medium transition-colors ${
      pathname.includes(`/category/${catSlug}`) ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-[1320px] mx-auto bg-white shadow-sm">
        {/* Top Bar */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm py-2">
            <div className="flex items-center text-gray-600">
              <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-[#2873F5] transition-colors px-3 border-r border-gray-300">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.phone}</span>
              </a>
              <a href={`mailto:${t.email}`} className="hidden md:flex items-center gap-2 hover:text-[#2873F5] transition-colors px-3 border-r border-gray-300">
                <Mail className="w-3.5 h-3.5" />
                <span>{t.email}</span>
              </a>
              <a href="https://wa.me/8618126380255" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors px-3">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t.whatsapp}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {t.support}
              </span>
              <div className="flex items-center gap-1">
                <Link href="/zh-hk/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'zh-hk' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>繁</Link>
                <Link href="/en/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'en' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>EN</Link>
                <Link href="/ja/" className={`px-2.5 py-0.5 rounded text-xs font-medium transition-colors ${locale === 'ja' ? 'bg-[#2873F5] text-white' : 'text-gray-500 hover:text-[#2873F5]'}`}>日</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[53px] lg:h-[61px] gap-4">
              <Link href={`${localePrefix}/`} className="flex-shrink-0 ml-5">
                <Image src="/images/logo.png" alt="智印港 ZprintPro" width={180} height={44} className="h-11 w-auto" priority />
              </Link>
              <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
                <div className="relative w-full">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-4 pr-24 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm" />
                  <button type="submit" className="absolute right-0 top-0 h-full px-5 bg-[#F87314] hover:bg-[#E56203] text-white rounded-r-lg flex items-center gap-1.5 transition-colors text-sm font-medium">
                    <Search className="w-4 h-4" /><span className="hidden lg:inline">{t.search}</span>
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-3 lg:gap-5">
                <Link href={`${localePrefix}/contact/`} className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-[#2873F5] transition-colors text-sm"><User className="w-5 h-5" /><span>{t.login}</span></Link>
                <Link href={`${localePrefix}/contact/`} className="flex items-center gap-1.5 text-gray-600 hover:text-[#2873F5] transition-colors text-sm">
                  <div className="relative"><ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 w-4 h-4 bg-[#F87314] text-white text-[10px] rounded-full flex items-center justify-center font-bold">0</span></div>
                  <span className="hidden sm:inline">{t.cart}</span>
                </Link>
                <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Blue Navigation Bar */}
        <nav className="hidden lg:block bg-[#2873F5]">
          <div className="px-0">
            <div className="flex items-center h-[46px]">
              <Link href={`${localePrefix}/`} className={navLinkClass(pathname === `${localePrefix}/`)}>{t.home}</Link>

              {t.navOrder.map((catSlug) => (
                <div key={catSlug} className="relative h-full flex-1" onMouseEnter={() => setActiveDropdown(catSlug)} onMouseLeave={() => setActiveDropdown(null)}>
                  <Link href={`${localePrefix}/category/${catSlug}/`} className={catNavLinkClass(catSlug)}>
                    {t.categories[catSlug]}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === catSlug ? 'rotate-180' : ''}`} />
                  </Link>
                  {activeDropdown === catSlug && (
                    <div className="absolute top-full left-1/2 bg-white shadow-2xl rounded-b-lg overflow-hidden z-50 flex" style={{ transform: dropdownOffsets[catSlug], width: 950, minHeight: 320 }}>
                      {/* Left Column */}
                      <div className="w-[150px] p-4 flex flex-col">
                        <div className="pb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-[#2873F5] rounded-full" />
                          <span className="text-[15px] font-bold text-gray-700">{locale === 'zh-hk' ? '產品分類' : locale === 'en' ? 'Categories' : 'カテゴリー'}</span>
                        </div>
                        <div className="border-b border-dotted border-gray-200" />
                        <div className="flex-1 flex flex-col justify-around py-3">
                          {categorySubItems[catSlug]?.map((subSlug) => (
                            <Link key={subSlug} href={`${localePrefix}/product/${subSlug}/`} className="block text-[13px] font-normal text-gray-500 hover:text-[#2873F5] transition-colors py-1">{getSubItemName(subSlug)}</Link>
                          ))}
                        </div>
                        <div className="border-t border-dotted border-gray-200" />
                        <div className="pt-3 h-[50px] flex items-center">
                          <Link href={`${localePrefix}/category/${catSlug}/`} className="block text-xs font-medium text-[#2873F5] hover:bg-gray-50 transition-colors">{locale === 'zh-hk' ? '查看全部 →' : locale === 'en' ? 'View All →' : 'すべて見る →'}</Link>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="flex-1 bg-gray-50 p-4 border-l border-gray-100 flex flex-col">
                        <div className="pb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-[#F87314] rounded-full" />
                          <span className="text-[15px] font-bold text-gray-700">{locale === 'zh-hk' ? '熱門產品' : locale === 'en' ? 'Hot Products' : '人気製品'}</span>
                        </div>
                        <div className="border-b border-transparent" />
                        <div className="flex-1 flex gap-4">
                          {categorySubItems[catSlug]?.slice(0, 3).map((subSlug, idx) => {
                            const tagText = idx < 2 ? (locale === 'zh-hk' ? '熱銷' : locale === 'en' ? 'Hot' : '人気') : (locale === 'zh-hk' ? '推薦' : locale === 'en' ? 'New' : '新着');
                            return (
                              <Link key={subSlug} href={`${localePrefix}/product/${subSlug}/`} className="block group flex-1 flex flex-col">
                                <div className="flex-1 relative overflow-hidden rounded-t-lg">
                                  <Image src={featuredImages[subSlug] || '/images/hero-v21/gift-box.jpg'} alt={getSubItemName(subSlug)} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">{tagText}</span>
                                </div>
                                <div className="pt-2 h-[60px] flex flex-col justify-center">
                                  <p className="text-base font-medium text-gray-700 leading-tight text-center">{getSubItemName(subSlug)}</p>
                                  <p className="text-[13px] text-gray-400 leading-tight mt-1.5 text-center">{featuredDescs[locale]?.[subSlug] || ''}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* 印刷知識 - 帶下拉菜單 */}
              <div className="relative h-full flex-1" onMouseEnter={() => setActiveDropdown('blog')} onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={`${localePrefix}/blog/`} className={`h-full w-full flex items-center justify-center gap-1 text-[16px] font-medium transition-colors ${pathname.includes('/blog') ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}>
                  {t.knowledge}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'blog' ? 'rotate-180' : ''}`} />
                </Link>
                {activeDropdown === 'blog' && (
                  <div className="absolute top-full left-1/2 bg-white shadow-2xl rounded-b-lg overflow-hidden z-50 flex" style={{ transform: dropdownOffsets['blog'], width: 950, minHeight: 320 }}>
                    <div className="w-[150px] p-4 flex flex-col">
                      <div className="pb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#2873F5] rounded-full" />
                        <span className="text-[15px] font-bold text-gray-700">{locale === 'zh-hk' ? '內容分類' : locale === 'en' ? 'Topics' : 'トピック'}</span>
                      </div>
                      <div className="border-b border-dotted border-gray-200" />
                      <div className="flex-1 flex flex-col justify-around py-3">
                        {knowledgeSubItems[locale]?.map((item, idx) => (
                          <Link key={idx} href={`${localePrefix}/blog/`} className="block text-[13px] font-normal text-gray-500 hover:text-[#2873F5] transition-colors py-1">{item}</Link>
                        ))}
                      </div>
                      <div className="border-t border-dotted border-gray-200" />
                      <div className="pt-3 h-[50px] flex items-center">
                        <Link href={`${localePrefix}/blog/`} className="block text-xs font-medium text-[#2873F5] hover:bg-gray-50 transition-colors">{locale === 'zh-hk' ? '查看全部 →' : locale === 'en' ? 'View All →' : 'すべて見る →'}</Link>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 border-l border-gray-100 flex flex-col">
                      <div className="pb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#F87314] rounded-full" />
                        <span className="text-[15px] font-bold text-gray-700">{locale === 'zh-hk' ? '推薦文章' : locale === 'en' ? 'Featured' : 'おすすめ'}</span>
                      </div>
                      <div className="border-b border-transparent" />
                      <div className="flex-1 flex gap-4">
                        {['flyer.jpg', 'sticker.jpg', 'gift-box.jpg'].map((img, idx) => (
                          <Link key={idx} href={`${localePrefix}/blog/`} className="block group flex-1 flex flex-col">
                            <div className="flex-1 relative overflow-hidden rounded-t-lg">
                              <Image src={`/images/hero-v21/${img}`} alt="" fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                            </div>
                            <div className="pt-2 h-[50px] flex items-center justify-center">
                              <p className="text-base font-medium text-gray-700 leading-tight text-center">{knowledgeSubItems[locale]?.[idx] || ''}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href={`${localePrefix}/contact/`} className={navLinkClass(pathname.includes('/contact'))}>{t.contact}</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <form onSubmit={handleSearch} className="md:hidden mb-4">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-lg text-sm" />
                <button type="submit" className="absolute right-0 top-0 h-full px-3 text-[#F87314]"><Search className="w-5 h-5" /></button>
              </div>
            </form>
            <Link href={`${localePrefix}/`} className="block font-medium text-[#333333] py-2">{t.home}</Link>
            {t.navOrder.map((catSlug) => (
              <Link key={catSlug} href={`${localePrefix}/category/${catSlug}/`} className="block font-medium text-[#333333] py-2">{t.categories[catSlug]}</Link>
            ))}
            <Link href={`${localePrefix}/blog/`} className="block font-medium text-[#333333] py-2">{t.knowledge}</Link>
            <Link href={`${localePrefix}/contact/`} className="block font-medium text-[#333333] py-2">{t.contact}</Link>
            <div className="flex gap-2 pt-4 border-t">
              <Link href="/zh-hk/" className={`px-4 py-2 rounded text-sm ${locale === 'zh-hk' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>繁</Link>
              <Link href="/en/" className={`px-4 py-2 rounded text-sm ${locale === 'en' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>EN</Link>
              <Link href="/ja/" className={`px-4 py-2 rounded text-sm ${locale === 'ja' ? 'bg-[#2873F5] text-white' : 'border border-gray-200'}`}>日</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
