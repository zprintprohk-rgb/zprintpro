'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface CategoryFilterProps {
  locale: Locale;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
}

const translations = {
  'zh-hk': {
    filterBy: '篩選條件',
    clearAll: '清除全部',
    material: '材質',
    size: '尺寸',
    priceRange: '價格範圍',
    turnaround: '製作時間',
    materials: {
      paper: '紙張',
      vinyl: '膠質',
      pvc: 'PVC',
      pet: 'PET',
      hologram: '鐳射',
    },
    sizes: {
      small: '小型',
      medium: '中型',
      large: '大型',
      custom: '自定尺寸',
    },
    priceRanges: {
      under100: 'Under $100',
      '100to500': '$100 - $500',
      '500to1000': '$500 - $1,000',
      over1000: 'Over $1,000',
    },
    turnarounds: {
      sameday: '即日',
      '1to2days': '1-2天',
      '3to5days': '3-5天',
    },
  },
  en: {
    filterBy: 'Filter By',
    clearAll: 'Clear All',
    material: 'Material',
    size: 'Size',
    priceRange: 'Price Range',
    turnaround: 'Turnaround',
    materials: {
      paper: 'Paper',
      vinyl: 'Vinyl',
      pvc: 'PVC',
      pet: 'PET',
      hologram: 'Hologram',
    },
    sizes: {
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      custom: 'Custom Size',
    },
    priceRanges: {
      under100: 'Under $100',
      '100to500': '$100 - $500',
      '500to1000': '$500 - $1,000',
      over1000: 'Over $1,000',
    },
    turnarounds: {
      sameday: 'Same Day',
      '1to2days': '1-2 Days',
      '3to5days': '3-5 Days',
    },
  },
  ja: {
    filterBy: 'フィルター',
    clearAll: 'すべてクリア',
    material: '素材',
    size: 'サイズ',
    priceRange: '価格帯',
    turnaround: '納期',
    materials: {
      paper: '紙',
      vinyl: 'ビニール',
      pvc: 'PVC',
      pet: 'PET',
      hologram: 'ホログラム',
    },
    sizes: {
      small: '小',
      medium: '中',
      large: '大',
      custom: 'カスタムサイズ',
    },
    priceRanges: {
      under100: '100ドル未満',
      '100to500': '100-500ドル',
      '500to1000': '500-1,000ドル',
      over1000: '1,000ドル以上',
    },
    turnarounds: {
      sameday: '当日',
      '1to2days': '1-2日',
      '3to5days': '3-5日',
    },
  },
};

export function CategoryFilter({ 
  locale, 
  selectedFilters, 
  onFilterChange, 
  onClearFilters 
}: CategoryFilterProps) {
  const t = translations[locale];
  const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const filterGroups = [
    { key: 'material', label: t.material, options: t.materials },
    { key: 'size', label: t.size, options: t.sizes },
    { key: 'priceRange', label: t.priceRange, options: t.priceRanges },
    { key: 'turnaround', label: t.turnaround, options: t.turnarounds },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#2873F5]" />
          <span className="font-medium text-[#333333]">{t.filterBy}</span>
        </div>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-[#F87314] hover:text-[#E56203] transition-colors"
          >
            <X className="w-3 h-3" />
            {t.clearAll}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.key}>
            <h4 className="text-sm font-medium text-[#333333] mb-2">{group.label}</h4>
            <div className="space-y-1">
              {Object.entries(group.options).map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFilters[group.key]?.includes(value) || false}
                    onChange={() => onFilterChange(group.key, value)}
                    className="w-4 h-4 rounded border-[#DDDDDD] text-[#2873F5] focus:ring-[#2873F5]"
                  />
                  <span className="text-sm text-[#666666] group-hover:text-[#333333] transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
