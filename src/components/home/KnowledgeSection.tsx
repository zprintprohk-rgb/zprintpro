'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, FileText, HelpCircle, Lightbulb, Video } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface KnowledgeSectionProps {
  locale: Locale;
}

const translations = {
  'zh-hk': {
    title: '印刷知識庫',
    subtitle: '了解更多印刷相關知識，助您做出明智選擇',
    articles: {
      title: '實用文章',
      items: [
        { title: '如何準備印刷文件', description: '學習正確的PDF設定和出血設定' },
        { title: '紙材選擇指南', description: '了解不同紙材的特性與應用' },
        { title: '印刷工藝介紹', description: '燙金、UV、擊凸等特殊工藝' },
      ],
    },
    faq: {
      title: '常見問題',
      items: [
        { title: '訂單多久可以完成？', description: '標準訂單3-5個工作天' },
        { title: '支持哪些付款方式？', description: '信用卡、銀行轉帳、PayPal' },
        { title: '如何追蹤訂單狀態？', description: '登入帳戶查看即時進度' },
      ],
    },
    guides: {
      title: '設計指南',
      items: [
        { title: '名片設計規範', description: '尺寸、解析度、色彩模式' },
        { title: '海報設計技巧', description: '視覺層次與排版建議' },
        { title: '包裝設計要點', description: '結構與視覺的平衡' },
      ],
    },
    cta: '查看更多',
  },
  en: {
    title: 'Printing Knowledge Hub',
    subtitle: 'Learn more about printing to make informed decisions',
    articles: {
      title: 'Helpful Articles',
      items: [
        { title: 'How to Prepare Print Files', description: 'Learn proper PDF settings and bleed setup' },
        { title: 'Paper Selection Guide', description: 'Understand different paper types and applications' },
        { title: 'Printing Techniques', description: 'Foil stamping, UV coating, embossing and more' },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        { title: 'How long does an order take?', description: 'Standard orders take 3-5 business days' },
        { title: 'What payment methods are accepted?', description: 'Credit card, bank transfer, PayPal' },
        { title: 'How to track order status?', description: 'Log in to your account for real-time updates' },
      ],
    },
    guides: {
      title: 'Design Guides',
      items: [
        { title: 'Business Card Design Specs', description: 'Size, resolution, color mode' },
        { title: 'Poster Design Tips', description: 'Visual hierarchy and layout advice' },
        { title: 'Packaging Design Essentials', description: 'Balance between structure and visuals' },
      ],
    },
    cta: 'View More',
  },
  ja: {
    title: '印刷知識ハブ',
    subtitle: 'より良い判断のための印刷関連知識',
    articles: {
      title: '役立つ記事',
      items: [
        { title: '印刷ファイルの準備方法', description: '適切なPDF設定と塗り足し設定を学ぶ' },
        { title: '紙の選択ガイド', description: '異なる紙タイプと用途を理解する' },
        { title: '印刷技術', description: '箔押し、UVコーティング、エンボス加工など' },
      ],
    },
    faq: {
      title: 'よくある質問',
      items: [
        { title: '注文にどのくらい時間がかかりますか？', description: '標準注文は3-5営業日' },
        { title: 'どの支払い方法が利用できますか？', description: 'クレジットカード、銀行振込、PayPal' },
        { title: '注文状況を確認するには？', description: 'アカウントにログインしてリアルタイム更新を確認' },
      ],
    },
    guides: {
      title: 'デザインガイド',
      items: [
        { title: '名刺デザイン仕様', description: 'サイズ、解像度、カラーモード' },
        { title: 'ポスターデザインのヒント', description: '視覚的階層とレイアウトのアドバイス' },
        { title: 'パッケージングデザインの基本', description: '構造と視覚のバランス' },
      ],
    },
    cta: 'もっと見る',
  },
};

export function KnowledgeSection({ locale }: KnowledgeSectionProps) {
  const t = translations[locale];
  const localePrefix = locale === 'zh-hk' ? '' : `/${locale}`;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#333333] mb-4">{t.title}</h2>
          <p className="text-[#666666] max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Knowledge Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#2873F5]" />
              </div>
              <h3 className="font-semibold text-[#333333]">{t.articles.title}</h3>
            </div>
            <ul className="space-y-3">
              {t.articles.items.map((item, index) => (
                <li key={index} className="group">
                  <Link href={`${localePrefix}/blog/preparing-print-files`} className="block">
                    <h4 className="text-sm font-medium text-[#333333] group-hover:text-[#2873F5] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#666666]">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#F87314]/10 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-[#F87314]" />
              </div>
              <h3 className="font-semibold text-[#333333]">{t.faq.title}</h3>
            </div>
            <ul className="space-y-3">
              {t.faq.items.map((item, index) => (
                <li key={index} className="group">
                  <Link href={`${localePrefix}/faq`} className="block">
                    <h4 className="text-sm font-medium text-[#333333] group-hover:text-[#2873F5] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#666666]">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#333333]">{t.guides.title}</h3>
            </div>
            <ul className="space-y-3">
              {t.guides.items.map((item, index) => (
                <li key={index} className="group">
                  <Link href={`${localePrefix}/guides/business-card-specs`} className="block">
                    <h4 className="text-sm font-medium text-[#333333] group-hover:text-[#2873F5] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#666666]">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link 
            href={`${localePrefix}/blog`}
            className="inline-flex items-center gap-2 text-[#2873F5] hover:text-[#1E5FD1] font-medium transition-colors"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
