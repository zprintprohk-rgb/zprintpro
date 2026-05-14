'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getAltTag } from '@/data/image-alt-map';


interface SKUItem {
  slug: string;
  title: string;
  titleEn: string;
  titleJa: string;
  spec: string;
  specEn: string;
  specJa: string;
  price: string;
  priceEn: string;
  priceJa: string;
  image: (locale: string) => string;
  href: string;
}

const skus: SKUItem[] = [
  {
    slug: 'flyers',
    title: '宣傳單張',
    titleEn: 'Flyers',
    titleJa: 'チラシ',
    spec: 'A4/A5/A6 · 157g銅版紙',
    specEn: 'A4/A5/A6 · 157gsm art paper',
    specJa: 'A4/A5/A6 · 157gアート紙',
    price: 'HK$0.25/張起',
    priceEn: '$0.03/sheet',
    priceJa: '¥5/枚起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-flyers-a4-flyers-${locale === 'zh-hk' ? 'zh-hk' : locale}-1.webp`,
    href: '/product/a4-flyers',
  },
  {
    slug: 'posters',
    title: '海報印刷',
    titleEn: 'Posters',
    titleJa: 'ポスター',
    spec: 'A2/A1/A3 · 防水材質',
    specEn: 'A2/A1/A3 · Waterproof',
    specJa: 'A2/A1/A3 · 防水材質',
    price: 'HK$15/張起',
    priceEn: '$1.90/sheet',
    priceJa: '¥300/枚起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-posters-a2-posters-${locale === 'zh-hk' ? 'zh-hk' : locale}-1.webp`,
    href: '/product/a2-posters',
  },
  {
    slug: 'stickers',
    title: '貼紙印刷',
    titleEn: 'Stickers',
    titleJa: 'シール',
    spec: '防水/PVC/透明',
    specEn: 'Waterproof / PVC / Clear',
    specJa: '防水・PVC・透明',
    price: 'HK$0.22/張起',
    priceEn: '$0.03/sheet',
    priceJa: '¥4/枚起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-${locale === 'zh-hk' ? 'zh-hk' : locale}.webp`,
    href: '/product/waterproof-stickers',
  },
  {
    slug: 'business-cards',
    title: '名片印刷',
    titleEn: 'Business Cards',
    titleJa: '名刺',
    spec: '燙金/棉紙/局部UV',
    specEn: 'Foil / Cotton / Spot UV',
    specJa: '箔押し・コットン・局部UV',
    price: 'HK$100/100張起',
    priceEn: '$13/100 pcs',
    priceJa: '¥2,000/100枚起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-${locale === 'zh-hk' ? 'zh-hk' : locale}.webp`,
    href: '/product/premium-business-cards',
  },
  {
    slug: 'booklets',
    title: '畫冊印刷',
    titleEn: 'Booklets',
    titleJa: '冊子',
    spec: '騎馬釘/膠裝 · 封面覆膜',
    specEn: 'Saddle-stitch / Perfect bound',
    specJa: '中綴じ・無線綴じ',
    price: 'HK$8/本起',
    priceEn: '$1.00/pc',
    priceJa: '¥160/部起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-${locale === 'zh-hk' ? 'zh-hk' : locale}.webp`,
    href: '/product/saddle-stitch-booklets',
  },
  {
    slug: 'roll-up-banners',
    title: '易拉寶/噴繪',
    titleEn: 'Roll-up Banners',
    titleJa: 'ロールアップバナー',
    spec: '鋁合金支架 · 高清噴繪',
    specEn: 'Aluminum stand · HD print',
    specJa: 'アルミスタンド・高画質',
    price: 'HK$35/個起',
    priceEn: '$4.50/pc',
    priceJa: '¥700/個起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-banners-roll-up-banners-${locale === 'zh-hk' ? 'zh-hk' : locale}.webp`,
    href: '/product/roll-up-banners',
  },
];

export default function RushDeliveryGrid({ locale }: { locale: string }) {
  const getText = (item: SKUItem, field: 'title' | 'spec' | 'price') => {
    if (locale === 'en') return item[`${field}En` as keyof SKUItem] as string;
    if (locale === 'ja') return item[`${field}Ja` as keyof SKUItem] as string;
    return item[field];
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        {locale === 'zh-hk'
          ? '今天下單，明天中午12點前收貨'
          : locale === 'en'
          ? 'Order Today, Receive by 12PM Tomorrow'
          : '本日注文・翌日12時までにお届け'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {skus.map((sku) => (
          <Link
            key={sku.slug}
            href={`/${locale}${sku.href}`}
            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
              <Image
                src={sku.image(locale)}
                alt={getAltTag(sku.slug, locale)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (!img.src.includes('placeholder')) {
                    img.src = '/images/placeholder.svg';
                  }
                }}
              />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs md:text-sm font-bold px-2.5 py-1 rounded-md shadow-sm">
                {locale === 'zh-hk'
                  ? '明天12:00前'
                  : locale === 'en'
                  ? 'By 12PM tomorrow'
                  : '翌日12時まで'}
              </span>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {getText(sku, 'title')}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{getText(sku, 'spec')}</p>
              <p className="text-red-600 font-bold mt-3 text-base md:text-lg">
                {getText(sku, 'price')}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-600 flex items-start gap-2">
        <span className="text-lg">⚠️</span>
        <span>
          {locale === 'zh-hk'
            ? '包裝盒、紙袋、信封等需後工產品不適用隔夜達服務，常規交期2-5天。'
            : locale === 'en'
            ? 'Packaging boxes, paper bags, and envelopes require post-press finishing. Standard lead time: 2-5 days.'
            : '包装盒・紙袋・封筒などは後加工が必要なため、翌日配送対象外。標準納期：2-5日。'}
        </span>
      </div>
    </section>
  );
}
