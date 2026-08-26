#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.8 集群 A 内链改动 — paper-bags PDP 5+ 内部链接
- 拆 v3.7 WEDDING_CATEGORIES=['wedding-invitations','paper-bags']
- 拆为 WEDDING_CATEGORIES=['wedding-invitations'] + PAPER_BAGS_CATEGORIES=['paper-bags']
- 加 PAPER_BAGS_RELATED_BLOGS 数组 (5 paper-bags 内部链接 × 3 locale)
- 改 PDP page.tsx L227-228 块启用 paper-bags 独立
K3 8/21 11:35 v3.8 拍板
"""
from pathlib import Path

FILE = Path(r"F:\zprintpro-nextjs\src\app\[locale]\product\[slug]\page.tsx")
content = FILE.read_text(encoding='utf-8')

# 1. 拆 WEDDING_CATEGORIES + 加 PAPER_BAGS_RELATED_BLOGS
old_block = """  // V3.7 DoD 7: 12 wedding PDP 内链三角 — 启用 relatedBlogs 块
  // 6 wedding-invitations SKU + 6 paper-bags (含婚慶) SKU 全部启用, 每页 3-5 链接
  const WEDDING_CATEGORIES = ['wedding-invitations', 'paper-bags'];
  const isWeddingCategory = WEDDING_CATEGORIES.includes(product.category_slug);
  // 6 wedding blog slugs 来自 src/data/blog-posts.ts
  const WEDDING_RELATED_BLOGS = [
    { slug: 'wedding-invitation-pricing-guide', titleZh: '喜帖價格指南 2026 · 50-500 個 4 檔實價', titleEn: 'Wedding Invitation Pricing Guide 2026: 50-500 Piece Runs', titleJa: '結婚式招待状価格ガイド 2026' },
    { slug: 'wedding-invitation-cost-guide', titleZh: '美國婚禮邀請卡 2026 成本指南 · 4 檔真實價格', titleEn: 'Wedding Invitation Cost Guide 2026: Real Pricing & Budget Breakdown', titleJa: '結婚式招待状コスト ガイド 2026' },
    { slug: 'wedding-table-card-printing-guide', titleZh: '枱卡印刷指南 · 7 個設計風格 + 材質對比', titleEn: 'Wedding Table Card Printing Guide: 7 Styles & Materials', titleJa: '席カード印刷ガイド' },
    { slug: 'wedding-favor-bag-printing-guide', titleZh: '香港婚慶喜帖 / 婚禮禮袋印刷指南', titleEn: 'Wedding Favor Bag & Invitation Printing Guide 2026', titleJa: 'ブライダル フォーバー バッグ印刷ガイド' },
    { slug: 'wedding-red-packet-printing-guide', titleZh: '婚禮利是封印刷指南 · 龍鳳 / 中式 / 燙金', titleEn: 'Wedding Red Packet Printing Guide', titleJa: '結婚式レッドパケット ガイド' },
  ];
  // 取前 5 个作为内链 (DoD 7 验收 ≥5)
  const relatedBlogs = isWeddingCategory ? WEDDING_RELATED_BLOGS : null;
  const localePrefix = `/${locale}`;"""

new_block = """  // V3.7 DoD 7 (wedding) + V3.8 集群 A 纸袋一击四词 (8/21 K3 拍板) — 启用 relatedBlogs 块
  // wedding-invitations → 5 wedding blog 链接 (5 内部链接, ≥5 验收)
  // paper-bags → 5 paper-bags 内部链接 (类目页 + 6 PDP + 2 blog)
  const WEDDING_CATEGORIES = ['wedding-invitations'];
  const PAPER_BAGS_CATEGORIES = ['paper-bags'];
  const isWeddingCategory = WEDDING_CATEGORIES.includes(product.category_slug);
  const isPaperBagsCategory = PAPER_BAGS_CATEGORIES.includes(product.category_slug);

  // 6 wedding blog slugs 来自 src/data/blog-posts.ts (V3.7 DoD 4-7)
  const WEDDING_RELATED_BLOGS = [
    { slug: 'wedding-invitation-pricing-guide', titleZh: '喜帖價格指南 2026 · 50-500 個 4 檔實價', titleEn: 'Wedding Invitation Pricing Guide 2026: 50-500 Piece Runs', titleJa: '結婚式招待状価格ガイド 2026' },
    { slug: 'wedding-invitation-cost-guide', titleZh: '美國婚禮邀請卡 2026 成本指南 · 4 檔真實價格', titleEn: 'Wedding Invitation Cost Guide 2026: Real Pricing & Budget Breakdown', titleJa: '結婚式招待状コスト ガイド 2026' },
    { slug: 'wedding-table-card-printing-guide', titleZh: '枱卡印刷指南 · 7 個設計風格 + 材質對比', titleEn: 'Wedding Table Card Printing Guide: 7 Styles & Materials', titleJa: '席カード印刷ガイド' },
    { slug: 'wedding-favor-bag-printing-guide', titleZh: '香港婚慶喜帖 / 婚禮禮袋印刷指南', titleEn: 'Wedding Favor Bag & Invitation Printing Guide 2026', titleJa: 'ブライダル フォーバー バッグ印刷ガイド' },
    { slug: 'wedding-red-packet-printing-guide', titleZh: '婚禮利是封印刷指南 · 龍鳳 / 中式 / 燙金', titleEn: 'Wedding Red Packet Printing Guide', titleJa: '結婚式レッドパケット ガイド' },
  ];

  // V3.8 集群 A 纸袋一击四词 — 5 paper-bags 内部链接 (类目页 + 6 PDP + 2 blog)
  // 4 词命中: 印刷紙袋 + 紙袋印刷 + 紙袋訂製 + 訂做紙袋
  const PAPER_BAGS_RELATED_BLOGS = [
    // 1 paper-bags 类目页 (内链核心, 跟 PDP 三角互链)
    { slug: 'category/paper-bags', isCategory: true, titleZh: '紙袋印刷類目 · 印刷紙袋 / 紙袋訂製 / 訂做紙袋 4 詞一頁', titleEn: 'Paper Bag Printing Category · Custom Paper Bags, Kraft, Gift Bags One-Stop', titleJa: '紙袋印刷カテゴリ · 紙袋 オーダメイド・クラフト紙袋・ギフト紙袋' },
    // 2 paper-bags 博客 (2 个 blog, zh-hk/en/ja 3 locale 适配)
    { slug: 'paper-bag-printing-guide', isCategory: false, titleZh: '紙袋印刷完全指南 2026 · 100 個起印 + 5 種材質對比', titleEn: 'Paper Bag Printing Guide 2026: 100 pcs MOQ + 5 Materials Compared', titleJa: '紙袋印刷完全ガイド 2026 · 100個から + 5材質比較' },
    { slug: 'paper-bag-buying-guide', isCategory: false, titleZh: 'Custom Paper Bag Buying Guide 2026 · 4 Quantity Tiers + Material Cost Breakdown', titleEn: 'Custom Paper Bag Buying Guide 2026 · 4 Quantity Tiers + Material Cost Breakdown', titleJa: 'クラフト紙袋選び方ガイド 2026 · 4 数量段階 + 材質コスト内訳' },
    // 3 paper-bags PDP (牛皮/白卡/禮品 3 个核心 SKU)
    { slug: 'product/kraft-paper-bags', isCategory: false, titleZh: '牛皮紙袋 · 環保文創首選 HK$1.5 起', titleEn: 'Kraft Paper Bags · Eco-friendly Brand Favorite, from HK$1.5', titleJa: 'クラフト紙袋 · エコブランド向け HK$1.5 から' },
    { slug: 'product/white-card-paper-bags', isCategory: false, titleZh: '白卡紙袋 · 服裝美妝品牌升級首選', titleEn: 'White Card Paper Bags · Fashion & Beauty Brand Upgrade', titleJa: '白カード紙袋 · アパレル・美容ブランドアップグレード' },
    { slug: 'product/gift-paper-bags', isCategory: false, titleZh: '禮品紙袋 · 高檔燙金 + 婚禮回禮', titleEn: 'Gift Paper Bags · Premium Foil + Wedding Favors', titleJa: 'ギフト紙袋 · 高級箔押し + ブライダルギフト' },
  ];

  // 取前 5 个作为内链 (V3.8 集群 A 验收 ≥5)
  const relatedBlogs = isWeddingCategory ? WEDDING_RELATED_BLOGS : isPaperBagsCategory ? PAPER_BAGS_RELATED_BLOGS : null;
  const localePrefix = `/${locale}`;"""

assert old_block in content, "old block not found"
content = content.replace(old_block, new_block)

# 2. 改 PDP page.tsx relatedBlogs 块 href 渲染 — paper-bags 类目用 isCategory 字段
old_render = """              {/* V3.7 DoD 7: 12 wedding PDP 内链三角 — 3-5 wedding blog 链接 */}
              {relatedBlogs && relatedBlogs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3 font-semibold">
                    {locale === 'zh-hk' ? '📚 婚禮印刷延伸閱讀：' : locale === 'en' ? '📚 Related Wedding Printing Guides:' : '📚 ブライダル印刷関連ガイド：'}
                  </p>
                  <ul className="space-y-2">
                    {relatedBlogs.map((b) => {
                      const title = locale === 'zh-hk' ? b.titleZh : locale === 'en' ? b.titleEn : b.titleJa;
                      return (
                        <li key={b.slug}>
                          <a
                            href={`${localePrefix}/blog/${b.slug}/`}
                            className="inline-flex items-center text-[#2873F5] hover:underline font-medium text-sm"
                          >
                            <span className="mr-1">→</span>
                            <span>{title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}"""

new_render = """              {/* V3.7 DoD 7 (wedding) + V3.8 集群 A 纸袋一击四词 — 3-5 内部链接 */}
              {relatedBlogs && relatedBlogs.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3 font-semibold">
                    {isPaperBagsCategory
                      ? (locale === 'zh-hk' ? '📦 紙袋印刷延伸閱讀：' : locale === 'en' ? '📦 Related Paper Bag Printing Guides:' : '📦 紙袋印刷関連ガイド：')
                      : (locale === 'zh-hk' ? '📚 婚禮印刷延伸閱讀：' : locale === 'en' ? '📚 Related Wedding Printing Guides:' : '📚 ブライダル印刷関連ガイド：')}
                  </p>
                  <ul className="space-y-2">
                    {relatedBlogs.map((b) => {
                      const title = locale === 'zh-hk' ? b.titleZh : locale === 'en' ? b.titleEn : b.titleJa;
                      // V3.8 集群 A: paper-bags 类目页 / PDP 用 isCategory 区分路径
                      const href = b.isCategory
                        ? `${localePrefix}/category/${b.slug.replace('category/', '')}/`
                        : `${localePrefix}/blog/${b.slug}/`;
                      return (
                        <li key={b.slug}>
                          <a
                            href={href}
                            className="inline-flex items-center text-[#2873F5] hover:underline font-medium text-sm"
                          >
                            <span className="mr-1">→</span>
                            <span>{title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}"""

assert old_render in content, "old render block not found"
content = content.replace(old_render, new_render)

# 落盘
FILE.write_text(content, encoding='utf-8')
print(f"OK: PDP page.tsx V3.8 内链改动 2 处替换")
print(f"  1. 拆 WEDDING_CATEGORIES + 加 PAPER_BAGS_CATEGORIES + PAPER_BAGS_RELATED_BLOGS (5 内部链接)")
print(f"  2. 改 relatedBlogs 块 href 渲染 (isCategory 区分 类目页 vs blog 路径)")
print(f"  size: {len(content)} chars")
