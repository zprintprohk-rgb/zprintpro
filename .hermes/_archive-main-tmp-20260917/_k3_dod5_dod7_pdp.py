#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
V3.7 DoD 5 + DoD 7 PDP page.tsx 改动
- 启用 FreeSampleBanner (产品图后)
- 启用 WeddingBundle (RegionalCta 前, 仅 wedding-invitations)
- 启用 relatedBlogs 块 (12 wedding PDP 5+ 内链)
K3 14:16 拍板: 一次性全量上线, 不分批
"""
import re
from pathlib import Path

FILE = Path(r"F:\zprintpro-nextjs\src\app\[locale]\product\[slug]\page.tsx")
content = FILE.read_text(encoding='utf-8')

# 1. import 追加 FreeSampleBanner + WeddingBundle
old_import = "import RushDeliveryBadge from '@/components/sections/RushDeliveryBadge';\nimport { TrustWaterfall } from '@/components/home/TrustWaterfall';"
new_import = """import RushDeliveryBadge from '@/components/sections/RushDeliveryBadge';
import { TrustWaterfall } from '@/components/home/TrustWaterfall';
import FreeSampleBanner from '@/components/pdp/FreeSampleBanner';
import WeddingBundle from '@/components/pdp/WeddingBundle';"""
assert old_import in content, "import block not found"
content = content.replace(old_import, new_import)

# 2. 启用 relatedBlog + WEDDING_RELATED_BLOGS (DoD 7 内链三角)
old_related = """  // 相关博客链接（暂不启用）
  const relatedBlog = null;
  const localePrefix = `/${locale}`;"""
new_related = """  // V3.7 DoD 7: 12 wedding PDP 内链三角 — 启用 relatedBlogs 块
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
assert old_related in content, "relatedBlog block not found"
content = content.replace(old_related, new_related)

# 3. ProductGallery 之后插 FreeSampleBanner
old_gallery = """              <ProductGallery
                images={getProductImages(product, locale)}
                title={productTitle}
                alt={getProductImageAlt(product, locale)}
              />

              {/* 2026-07-16: 上传设计稿 + 备注栏已移除 — 文件上传统一走 /contact/; 批量折扣色块通过 ProductQuoteProvider context 联动右栏 QuoteCalculator */}
              <div className="mt-6">
                <QuantityTierInteractive locale={locale} />
              </div>"""
new_gallery = """              <ProductGallery
                images={getProductImages(product, locale)}
                title={productTitle}
                alt={getProductImageAlt(product, locale)}
              />

              {/* V3.7 DoD 5: 12 wedding PDP 置顶免费打样横幅 (5 天免費打樣 + 100+ 件可全額抵扣) */}
              {isWeddingCategory && (
                <div className="mt-6">
                  <FreeSampleBanner locale={locale} productSlug={product.slug} />
                </div>
              )}

              {/* 2026-07-16: 上传设计稿 + 备注栏已移除 — 文件上传统一走 /contact/; 批量折扣色块通过 ProductQuoteProvider context 联动右栏 QuoteCalculator */}
              <div className="mt-6">
                <QuantityTierInteractive locale={locale} />
              </div>"""
assert old_gallery in content, "ProductGallery block not found"
content = content.replace(old_gallery, new_gallery)

# 4. RegionalCta 之前插 WeddingBundle (条件: wedding-invitations)
old_regional = """            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">
                <RegionalContent locale={locale} type="shipping" />
              </p>
              <RegionalCta locale={locale} productSlug={product.slug} />
              <p className="text-xs text-gray-400">
                <RegionalContent locale={locale} type="pricingNote" />
              </p>
            </div>"""
new_regional = """            {/* V3.7 DoD 5: 6 件整套 vs 竞品 3 件对比 (ZprintPro vs e-print vs intuan) */}
            {isWeddingCategory && product.category_slug === 'wedding-invitations' && (
              <WeddingBundle locale={locale} productSlug={product.slug} />
            )}

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-500">
                <RegionalContent locale={locale} type="shipping" />
              </p>
              <RegionalCta locale={locale} productSlug={product.slug} />
              <p className="text-xs text-gray-400">
                <RegionalContent locale={locale} type="pricingNote" />
              </p>
            </div>"""
assert old_regional in content, "RegionalCta block not found"
content = content.replace(old_regional, new_regional)

# 5. 启用 relatedBlogs 块 (替换 relatedBlog 单个为 relatedBlogs 列表)
old_blog_block = """              {/* 相关博客链接 */}
              {relatedBlog && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">
                    {locale === 'zh-hk' ? '延伸閱讀：' : locale === 'en' ? 'Related Reading:' : '関連記事：'}
                  </p>
                  <a
                    href={`${localePrefix}/blog/${relatedBlog}/`}
                    className="inline-flex items-center text-[#2873F5] hover:underline font-medium"
                  >
                    {locale === 'zh-hk' ? '了解更多關於此產品的知識 →' : locale === 'en' ? 'Learn more about this product →' : 'この製品について詳しく知る →'}
                  </a>
                </div>
              )}"""
new_blog_block = """              {/* V3.7 DoD 7: 12 wedding PDP 内链三角 — 3-5 wedding blog 链接 */}
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
assert old_blog_block in content, "blog block not found"
content = content.replace(old_blog_block, new_blog_block)

FILE.write_text(content, encoding='utf-8')
print("OK: PDP page.tsx 5 块改动已写")
print("  1. import FreeSampleBanner + WeddingBundle")
print("  2. 启用 WEDDING_RELATED_BLOGS 数组 (5 blog × 3 locale)")
print("  3. ProductGallery 后插 FreeSampleBanner (条件: isWeddingCategory)")
print("  4. RegionalCta 前插 WeddingBundle (条件: wedding-invitations only)")
print("  5. 启用 relatedBlogs 块 (5 链接列表, 替换原 relatedBlog 单链)")
print(f"  文件: {FILE} ({len(content)} chars)")
