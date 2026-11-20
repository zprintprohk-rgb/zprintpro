#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Step 3.3: Insert poster-size-guide meta into src/data/blog-posts.ts
- Add lpPosterSizeGuide object after lpCalendarPrinting (line ~1462)
- Add lpPosterSizeGuide to blogPosts[] array after lpCalendarPrinting
"""
import re

PATH = 'src/data/blog-posts.ts'
with open(PATH, encoding='utf-8') as f:
    content = f.read()

# === 1. Insert meta object before "export const blogPosts" ===
meta_obj = """
// 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海报尺寸指南 (GSC 7d ~60 imps, posters × 尺寸长尾)
const lpPosterSizeGuide: BlogPostMeta = {
  slug: 'poster-size-guide',
  categoryKey: 'posters',
  source: 'daily',
  date: '2026-08-05',
  title: {
    'zh-hk': 'A1 A2 A3 海報尺寸指南：印刷尺寸對照表・應用場景・紙材選擇 | 智印港 ZprintPro',
    en: 'A1 A2 A3 Poster Size Guide: Dimensions Chart, Uses & Paper Choices | ZprintPro',
    ja: 'A1 A2 A3 ポスターサイズガイド：寸法早見表・用途・用紙選び | ZprintPro',
  },
  excerpt: {
    'zh-hk': 'A1 / A2 / A3 海報尺寸點樣揀？本文整理三種尺寸對照表（mm / cm / 英吋）、零售・展會・戶外場景應用建議、紙材與防水工藝選擇，附 4 條常見 FAQ，協助 10-1,000 張小至大批量落單，3-5 個工作天交付。',
    en: 'A1, A2 and A3 poster sizes compared — exact dimensions in mm / cm / inches, best use cases for retail, trade shows and outdoor, paper & waterproof finish choices, 4 FAQs, 10-1,000 piece runs, 3-5 day production from Asia factory.',
    ja: 'A1・A2・A3 ポスターサイズを徹底比較。寸法（mm / cm / インチ）早見表、小売・展示会・屋外での用途別選び方、用紙と防水加工の選び方、よくある質問 4 件、10-1,000 枚小〜大ロット、3-5 営業日生産。',
  },
};
"""

anchor = 'export const blogPosts: BlogPostMeta[] = ['
idx = content.find(anchor)
assert idx != -1, 'anchor not found'
content = content[:idx] + meta_obj + '\n' + content[idx:]

# === 2. Add to blogPosts[] array after lpCalendarPrinting ===
arr_anchor = '  lpCalendarPrinting,\n];'
idx2 = content.find(arr_anchor)
assert idx2 != -1, 'array anchor not found'
content = content[:idx2] + '  lpCalendarPrinting,\n  // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海报尺寸指南 (GSC 7d ~60 imps)\n  lpPosterSizeGuide,\n];' + content[idx2 + len(arr_anchor):]

with open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print('blog-posts.ts updated OK')
print('lpPosterSizeGuide count:', content.count('lpPosterSizeGuide'))
