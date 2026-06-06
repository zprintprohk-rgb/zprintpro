/**
 * DoujinSKU — 日本动漫风 5 SKU 网格
 * 风格：粉色-紫色渐变（区别于常规蓝白商务风）
 * 标签：コミケ必須 / 推し活応援 / VTuber向け / 少部数OK
 * 图：seedream 生成 → scripts/convert-doujin-to-webp.mjs 转 webp
 */

import Link from 'next/link';
import { Locale } from '@/types/locale';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { trackProductView } from '@/lib/analytics';

const I18N: Record<Locale, {
  sectionTitle: string;
  sectionSubtitle: string;
  ctaText: string;
  badges: { comiket: string; oshi: string; vTuber: string; small: string };
  items: Array<{
    slug: string;
    name: string;
    price: string;
    spec: string;
    tag: 'comiket' | 'oshi' | 'vTuber' | 'small';
  }>;
}> = {
  'zh-hk': {
    sectionTitle: '同人誌・動漫周邊',
    sectionSubtitle: 'コミケ必須・推し活応援——少部数から対応',
    ctaText: '立即 WhatsApp 查詢',
    badges: {
      comiket: 'コミケ必須',
      oshi: '推し活応援',
      vTuber: 'VTuber向け',
      small: '少部数OK',
    },
    items: [
      { slug: 'doujinshi-printing', name: '同人誌印刷', price: 'HK$500~/部起', spec: 'A5/B5対応・表紙フルカラー', tag: 'comiket' },
      { slug: 'acrylic-keychain', name: '亞克力鑰匙扣', price: 'HK$150~/個起', spec: '透明・2mm/3mm・角色造型', tag: 'oshi' },
      { slug: 'can-badge', name: '缶バッジ印刷', price: 'HK$80~/個起', spec: '57mm/76mm・安全扣', tag: 'vTuber' },
      { slug: 'postcard-set', name: 'ポストカード套装', price: 'HK$50~/枚起', spec: '和紙風・4-8枚套', tag: 'oshi' },
      { slug: 'eco-tote-bag', name: 'エコトートバッグ', price: 'HK$600~/個起', spec: 'オーガニックコットン・シルク印刷', tag: 'small' },
    ],
  },
  en: {
    sectionTitle: 'Doujinshi & Anime Merch',
    sectionSubtitle: 'Comiket ready · Oshi support · Small batches from 10',
    ctaText: 'WhatsApp Us Now',
    badges: {
      comiket: 'Comiket Ready',
      oshi: 'Oshi-katsu Support',
      vTuber: 'VTuber Friendly',
      small: 'Small MOQ',
    },
    items: [
      { slug: 'doujinshi-printing', name: 'Doujinshi Printing', price: 'From $65/book', spec: 'A5/B5 · Full-color cover', tag: 'comiket' },
      { slug: 'acrylic-keychain', name: 'Acrylic Keychain', price: 'From $20/pc', spec: '2mm/3mm · Custom shape', tag: 'oshi' },
      { slug: 'can-badge', name: 'Can Badge', price: 'From $10/pc', spec: '57mm/76mm · Safety pin', tag: 'vTuber' },
      { slug: 'postcard-set', name: 'Postcard Set', price: 'From $6.5/pc', spec: 'Washi-style · 4-8 pcs/set', tag: 'oshi' },
      { slug: 'eco-tote-bag', name: 'Eco Tote Bag', price: 'From $78/pc', spec: 'Organic cotton · Silk print', tag: 'small' },
    ],
  },
  ja: {
    sectionTitle: '同人誌・アニメグッズ',
    sectionSubtitle: 'コミケ必須・推し活応援・少部数OK',
    ctaText: 'WhatsAppで問い合わせ',
    badges: {
      comiket: 'コミケ必須',
      oshi: '推し活応援',
      vTuber: 'VTuber向け',
      small: '少部数OK',
    },
    items: [
      { slug: 'doujinshi-printing', name: '同人誌印刷', price: '¥7500〜/部〜', spec: 'A5/B5対応・表紙フルカラー', tag: 'comiket' },
      { slug: 'acrylic-keychain', name: 'アクリルキーホルダー', price: '¥2275〜/個〜', spec: '透明・2mm/3mm・キャラ形状', tag: 'oshi' },
      { slug: 'can-badge', name: '缶バッジ印刷', price: '¥1200〜/個〜', spec: '57mm/76mm・安全ピン付き', tag: 'vTuber' },
      { slug: 'postcard-set', name: 'ポストカードセット', price: '¥750〜/枚〜', spec: '和紙風・4-8枚セット', tag: 'oshi' },
      { slug: 'eco-tote-bag', name: 'エコトートバッグ', price: '¥9000〜/個〜', spec: 'オーガニックコットン・シルク印刷', tag: 'small' },
    ],
  },
};

const TAG_STYLES: Record<string, string> = {
  comiket: 'bg-pink-100 text-pink-700 border-pink-200',
  oshi: 'bg-purple-100 text-purple-700 border-purple-200',
  vTuber: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  small: 'bg-rose-100 text-rose-700 border-rose-200',
};

interface DoujinSKUProps {
  locale: Locale;
}

export function DoujinSKU({ locale }: DoujinSKUProps) {
  const t = I18N[locale] || I18N.ja;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base">{t.sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {t.items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/services/seo/${item.slug}/`}
              className="bg-white rounded-2xl p-4 block"
            >
              <h3 className="font-semibold text-slate-900 text-sm">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
