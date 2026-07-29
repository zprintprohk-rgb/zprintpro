'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getAltTag } from '@/data/image-alt-map';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';


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
    // 2026-07-19 user 拍板: 推荐位撤名片 → 貼紙 (異形模切 SKU, 避免与上方防水貼紙重复)
    slug: 'die-cut-stickers',
    title: '異形貼紙印刷',
    titleEn: 'Die-Cut Stickers',
    titleJa: 'ダイカットステッカー',
    spec: '任意形狀模切 · 防水/PVC',
    specEn: 'Custom die-cut shapes · Waterproof / PVC',
    specJa: '自由形ダイカット・防水/PVC',
    price: 'HK$0.35/張起',
    priceEn: '$0.05/pc',
    priceJa: '¥6/枚起',
    image: (locale: string) =>
      `/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-${locale === 'zh-hk' ? 'zh-hk' : locale}-1.webp`,
    href: '/product/die-cut-stickers',
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
          <div
            key={sku.slug}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            {/* 上半: 图片 + 标题 + 规格 + 价格 (整块 Link 到产品页) */}
            <Link href={`/${locale}${sku.href}`} className="block">
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
              <div className="p-4 md:p-5 pb-3">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {getText(sku, 'title')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{getText(sku, 'spec')}</p>
                <p className="text-red-600 font-bold mt-3 text-base md:text-lg">
                  {getText(sku, 'price')}
                </p>
              </div>
            </Link>
            {/* 下半: WhatsApp 預填確認按鈕 (P0 K3 拍板: 不破壞原卡片跳轉) */}
            <div className="px-4 pb-4 md:px-5 md:pb-5">
              <a
                {...getWhatsAppLinkProps(locale as 'zh-hk' | 'en' | 'ja', {
                  productName: getText(sku, 'title'),
                  source: `rush-printing-delivery-card-${sku.slug}`,
                  extra:
                    locale === 'zh-hk'
                      ? '我想確認明天 12:00 前能送達。\n請填寫：\n• 數量：\n• 收貨地址/港鐵站：'
                      : locale === 'en'
                      ? 'I want to confirm next-day delivery by 12PM.\nPlease fill in:\n• Quantity:\n• Delivery address / MTR station:'
                      : '翌日12時までの配送を確認したいです。\nご記入ください：\n• 数量：\n• 配送住所/MTR駅：',
                })}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                💬 {locale === 'zh-hk' ? '確認明日達' : locale === 'en' ? 'Confirm Next-Day' : '翌日配送を確認'}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
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
