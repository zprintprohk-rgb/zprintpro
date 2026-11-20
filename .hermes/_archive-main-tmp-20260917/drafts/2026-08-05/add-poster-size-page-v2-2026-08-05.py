#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Step 3.3 (v2): Insert poster-size-guide entries into src/app/[locale]/blog/[slug]/page.tsx
Precise anchors:
- posts object starts at "const posts: Record<"
- zh-hk block: first "  'zh-hk': {\n" AFTER posts declaration
- en block: "\n  en: {\n" (unquoted — translations uses quoted 'en')
- ja block: "\n  ja: {\n" (unquoted — translations uses quoted 'ja')
- articleSlugs: insert before "];" closing array after same-day-flyers line
"""

PATH = 'src/app/[locale]/blog/[slug]/page.tsx'
with open(PATH, encoding='utf-8') as f:
    content = f.read()

ZH_ENTRY = """    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海報尺寸指南 (GSC 7d ~60 imps, posters × 尺寸長尾)
    'poster-size-guide': {
      title: 'A1 A2 A3 海報尺寸指南：印刷尺寸對照表・應用場景・紙材選擇 | 智印港 ZprintPro',
      description: 'A1 / A2 / A3 海報尺寸點樣揀？本文整理三種尺寸對照表（mm / cm / 英吋）、零售・展會・戶外場景應用建議、紙材與防水工藝選擇，附 4 條常見 FAQ，協助 10-1,000 張小至大批量落單，3-5 個工作天交付。',
      date: '2026-08-05', category: '海報印刷',
      content: '',
    },
"""

EN_ENTRY = """    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 Poster Size Guide (GSC 7d ~60 imps)
    'poster-size-guide': {
      title: 'A1 A2 A3 Poster Size Guide: Dimensions Chart, Uses & Paper Choices | ZprintPro',
      description: 'A1, A2 and A3 poster sizes compared — exact dimensions in mm / cm / inches, best use cases for retail, trade shows and outdoor, paper & waterproof finish choices, 4 FAQs, 10-1,000 piece runs, 3-5 day production from Asia factory.',
      date: '2026-08-05', category: 'Poster Printing',
      content: '',
    },
"""

JA_ENTRY = """    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 ポスターサイズガイド (GSC 7d ~60 imps)
    'poster-size-guide': {
      title: 'A1 A2 A3 ポスターサイズガイド：寸法早見表・用途・用紙選び | ZprintPro',
      description: 'A1・A2・A3 ポスターサイズを徹底比較。寸法（mm / cm / インチ）早見表、小売・展示会・屋外での用途別選び方、用紙と防水加工の選び方、よくある質問 4 件、10-1,000 枚小〜大ロット、3-5 営業日生産。',
      date: '2026-08-05', category: 'ポスター印刷',
      content: '',
    },
"""

# --- locate posts declaration ---
posts_decl = content.find('const posts: Record<')
assert posts_decl != -1, 'posts declaration not found'

# --- zh-hk block: first quoted 'zh-hk' AFTER posts declaration ---
zh_start = content.find("  'zh-hk': {\n", posts_decl)
assert zh_start != -1, 'posts zh-hk block not found'
# find its closing "\n  },\n" — but must be the one at 2-space indent closing zh-hk block.
# The block's inner entries close at 4-space "    },"; block closes at 2-space "  },"
search_from = zh_start + len("  'zh-hk': {\n")
zh_close = content.find('\n  },\n', search_from)
assert zh_close != -1, 'zh-hk block close not found'
# sanity: ensure this close is before the en block unquoted key
zh_end = zh_close + len('\n  },\n')
content = content[:zh_end] + ZH_ENTRY + content[zh_end:]

# --- en block: unquoted "\n  en: {\n" AFTER posts decl ---
en_start = content.find('\n  en: {\n', posts_decl)
assert en_start != -1, 'en block not found'
en_close = content.find('\n  },\n', en_start)
assert en_close != -1, 'en block close not found'
en_end = en_close + len('\n  },\n')
content = content[:en_end] + EN_ENTRY + content[en_end:]

# --- ja block: unquoted "\n  ja: {\n" AFTER posts decl ---
ja_start = content.find('\n  ja: {\n', posts_decl)
assert ja_start != -1, 'ja block not found'
ja_close = content.find('\n  }\n};', ja_start)
assert ja_close != -1, 'ja block close not found'
ja_end = ja_close + len('\n  }\n};')
content = content[:ja_end] + JA_ENTRY.rstrip('\n') + '\n' + content[ja_end:]

# --- articleSlugs ---
art_anchor = "  'same-day-flyers-printing-hong-kong-guide',\n];"
idx = content.find(art_anchor)
assert idx != -1, 'articleSlugs tail anchor not found'
content = content[:idx] + "  'same-day-flyers-printing-hong-kong-guide',\n  // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海報尺寸指南\n  'poster-size-guide',\n];" + content[idx + len(art_anchor):]

with open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print('page.tsx updated OK')
print("'poster-size-guide' occurrences:", content.count("'poster-size-guide'"))
# verify positions are inside posts object (after posts_decl)
print('posts_decl at:', posts_decl)
for marker in ["'poster-size-guide'"]:
    pos = content.find(marker, posts_decl)
    print(f'first occurrence after posts_decl at offset:', pos)
