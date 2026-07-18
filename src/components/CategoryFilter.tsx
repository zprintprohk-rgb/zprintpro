/**
 * 分类筛选器组件
 * 用于产品列表页的筛选功能
 */

import { Locale } from '@/lib/seo';

interface CategoryFilterProps {
  locale: Locale;
}

export function CategoryFilter({ locale }: CategoryFilterProps) {
  // 翻译
  const translations = {
    'zh-hk': {
      filter: '篩選條件',
      material: '材質',
      size: '尺寸',
      priceRange: '價格範圍',
      reset: '重置',
      apply: '應用篩選',
      materials: ['銅版紙', '環保紙', 'PVC', 'PET', '牛皮紙', '白卡紙'],
      sizes: ['A4', 'A5', 'A3', 'A2', 'A1', '自定義'],
    },
    'en': {
      filter: 'Filters',
      material: 'Material',
      size: 'Size',
      priceRange: 'Price Range',
      reset: 'Reset',
      apply: 'Apply Filters',
      materials: ['Glossy Paper', 'Eco Paper', 'PVC', 'PET', 'Kraft Paper', 'White Card'],
      sizes: ['A4', 'A5', 'A3', 'A2', 'A1', 'Custom'],
    },
    'ja': {
      filter: 'フィルター',
      material: '素材',
      size: 'サイズ',
      priceRange: '価格帯',
      reset: 'リセット',
      apply: '適用',
      materials: ['コート紙', 'エコ紙', 'PVC', 'PET', 'クラフト紙', '白カード'],
      sizes: ['A4', 'A5', 'A3', 'A2', 'A1', 'カスタム'],
    },
  };
  
  const t = translations[locale];
  
  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-semibold text-gray-900 mb-4">{t.filter}</h3>
      
      {/* 材质筛选 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{t.material}</h4>
        <div className="space-y-2">
          {t.materials.map((material) => (
            <label key={material} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">{material}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* 尺寸筛选 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{t.size}</h4>
        <div className="space-y-2">
          {t.sizes.map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">{size}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* 价格范围 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{t.priceRange}</h4>
        <input
          type="range"
          min="0"
          max="1000"
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{locale === 'zh-hk' ? 'HK$0' : locale === 'ja' ? '¥0' : '$0'}</span>
          <span>{locale === 'zh-hk' ? 'HK$1000+' : locale === 'ja' ? '¥15000+' : '$130+'}</span>
        </div>
      </div>
      
      {/* 按钮 */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
          {t.reset}
        </button>
        <button className="flex-1 px-4 py-2 bg-[#2873F5] text-white rounded-lg text-sm hover:bg-[#1e5fd1]">
          {t.apply}
        </button>
      </div>
    </div>
  );
}
