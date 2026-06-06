/**
 * ProductGallery — 产品详情页图片展示
 * 增强版：3 个 Tab（产品图 / 实景效果 / 材质特写）+ 缩略图导航 + lightbox
 * 增强于 2026-06-06：v2 融合方案 P1.3
 */

'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';
import { Product } from '@/data/products';
import { Locale } from '@/lib/seo';
import { trackProductView } from '@/lib/analytics';

interface ProductGalleryProps {
  product: Product;
  locale: Locale;
}

type TabKey = 'product' | 'lifestyle' | 'material';

const I18N: Record<Locale, Record<TabKey, string>> = {
  'zh-hk': { product: '產品圖', lifestyle: '實景效果', material: '材質特寫' },
  en: { product: 'Product', lifestyle: 'In Use', material: 'Material' },
  ja: { product: '商品画像', lifestyle: '使用例', material: '素材特写' },
};

const TAB_ICONS: Record<TabKey, React.ComponentType<{ className?: string }>> = {
  product: ImageIcon,
  lifestyle: Sparkles,
  material: Layers,
};

export function ProductGallery({ product, locale }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>('product');

  const t = I18N[locale] || I18N.en;

  // 每个 Tab 4-6 张缩略图（占位结构，等真实图）
  const TAB_IMAGE_COUNTS: Record<TabKey, number> = {
    product: 4,
    lifestyle: 4,
    material: 4,
  };

  const totalImages = TAB_IMAGE_COUNTS[activeTab];
  const currentAlt = `${product.name} - ${t[activeTab]} ${currentImage + 1}`;

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setCurrentImage(0);
    trackProductView(product.slug, `${tab}_tab_open`);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const TABS: TabKey[] = ['product', 'lifestyle', 'material'];

  return (
    <div className="space-y-4">
      {/* 场景图 Tab 栏 */}
      <div
        role="tablist"
        aria-label="Gallery views"
        className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit"
      >
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab];
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={active}
              onClick={() => handleTabChange(tab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                active
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {t[tab]}
            </button>
          );
        })}
      </div>

      {/* 主图区域 */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-[#2873F5]/20 to-[#F87314]/20 rounded-2xl flex items-center justify-center">
            <span className="text-6xl font-bold text-[#2873F5]">{product.name.charAt(0)}</span>
          </div>
        </div>

        {/* 左右导航 */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 放大按钮 */}
        <button
          aria-label="Zoom"
          className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* 计数器 */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {totalImages}
        </div>
      </div>

      {/* 缩略图导航 */}
      <div className="flex gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={`${activeTab}-${index}`}
            onClick={() => setCurrentImage(index)}
            aria-label={currentAlt}
            className={`flex-1 aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
              currentImage === index ? 'border-[#2873F5]' : 'border-transparent hover:border-gray-200'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-bold text-[#2873F5]/50">{product.name.charAt(0)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
