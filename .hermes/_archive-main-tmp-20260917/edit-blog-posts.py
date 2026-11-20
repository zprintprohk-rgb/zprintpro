"""Add Q-NEW-04 same-day-flyers blog meta to blog-posts.ts"""
import re

path = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert new BlogPostMeta const before "export const blogPosts"
new_meta_block = '''// 2026-08-05 v8 daily-content-evolve: Q-NEW-04 即日宣傳單張 (Tier A 餐飲外賣 + 活動展會) — flyers × same-day-flyers — 純文字・v8 SEO+GEO 雙引擎
// 8 Anti-AI-Slop: 9-section zprintpro structure + 4 FAQ + 5 internal links + 800-1000 zh-hk + 250-350 en/ja + no images + Last Updated timestamp + ISO/行業標準 + 3 locale native
const lpSameDayFlyersHK: BlogPostMeta = {
  slug: 'same-day-flyers-printing-hong-kong-guide',
  categoryKey: 'flyers',
  source: 'daily',
  date: '2026-08-05',
  title: {
    'zh-hk': '即日宣傳單張印刷指南 · 香港餐廳開業 / 活動速遞方案 | 智印雲 ZprintPro',
    en: 'Same-Day Flyer Printing Guide · 4-6hr Rush Turnaround for US Small Business | ZprintPro',
    ja: '即日チラシ印刷ガイド · 4-6時間特急納品 日本の中小企業向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港餐廳開幕 / 活動 late-call / 地產快銷旺季,Q1-Q2 同期急單需求 +35%。即日宣傳單張 100 張起印,4-6 小時特急,順豐本地 / DHL 全球,7 種現成紙材 + 3 工藝限制 + 4 FAQ,1 小時內下單出貨。',
    en: 'US restaurant launch / event late-call / real estate quick sale peak season. Same-day flyers 100 MOQ, 4-6hr rush, USPS Priority / FedEx 2-day, 5 paper stocks + 3 process limits + 4 FAQ, ship within 1 hour.',
    ja: '日本 レストラン開業 / イベント late-call / 不動産クイック 繁忙期。100 個 MOQ スターター、4-6 時間特急、ヤマト運輸 1-3 日配送、5 種在庫用紙 + 3 加工制限 + 4 FAQ、1 時間内注文出荷。',
  },
};

'''

# Insert before "export const blogPosts"
old_marker = "export const blogPosts: BlogPostMeta[] = ["
assert old_marker in content, 'marker not found'
content = content.replace(old_marker, new_meta_block + old_marker, 1)

# 2. Add to blogPosts array (last entry before closing bracket)
# Find lpSportsMerchandiseGiftBox, and add lpSameDayFlyersHK after it
target = "  lpSportsMerchandiseGiftBox,\n];"
assert target in content, 'array end not found'
content = content.replace(target, "  lpSportsMerchandiseGiftBox,\n  // 2026-08-05 v8 daily-content-evolve: Q-NEW-04 即日宣傳單張 (Tier A 餐飲外賣 + 活動展會)\n  lpSameDayFlyersHK,\n];", 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Added lpSameDayFlyersHK meta + array entry')
print('File size:', len(content), 'chars')
