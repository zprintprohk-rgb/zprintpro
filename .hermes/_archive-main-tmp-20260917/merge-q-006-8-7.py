# -*- coding: utf-8 -*-
"""
合并 Q-006 茶飲品牌禮盒 3 locale content 到 blog-data/{zh-hk,en,ja}.json
+ 更新 blog-posts.ts 追加 lpTeaBeverageGiftBox BlogPostMeta + articleSlugs
+ 不动 matrix.json (等 8/7 9:10 cron 一起 commit)
"""

import json
import re
from pathlib import Path

base = Path(r"F:\zprintpro-nextjs")

# 1. 读 blog-data/{zh-hk,en,ja}.json
def read_blog_data(locale):
    p = base / "src" / "data" / "blog-data" / f"{locale}.json"
    with open(p, 'r', encoding='utf-8') as f:
        return json.load(f), p

# 2. 读 Q-006 html content
def read_html(name):
    p = base / ".hermes" / f"q-006-{name}.html"
    with open(p, 'r', encoding='utf-8') as f:
        return f.read()

# 3. 合并到 blog-data
q006_content = {
    'zh-hk': read_html('zh-hk'),
    'en': read_html('en'),
    'ja': read_html('ja'),
}

q006_meta_zh = {
    "title": "香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印港 ZprintPro",
    "description": "香港茶飲品牌禮盒訂製: 30 個起印天地蓋盒、磁性禮盒、紙袋 1 條龍印刷。比較天地蓋、磁性、飛機盒 4 大盒型 + 5 種紙材 + 6 種工藝,附 4 條茶飲老闆 FAQ,助您用合理預算打造品牌專屬禮盒包裝。",
    "date": "2026-08-07",
    "category": "茶飲食品",
}

q006_meta_en = {
    "title": "Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro",
    "description": "Tea and beverage brand gift box printing: 30-unit MOQ for lid-base, magnetic, and mailer boxes. Compare 4 box styles, 5 paper grades, and 6 finishes. Includes 4 FAQs from tea brand founders and budget-friendly brand-specific gift box packaging strategies.",
    "date": "2026-08-07",
    "category": "Tea & Beverage",
}

q006_meta_ja = {
    "title": "茶・ドリンクギフトボックス印刷ガイド：リーフティー・タピオカ・ECブランド向け | ZprintPro",
    "description": "茶・ドリンクブランドギフトボックス印刷：天地蓋箱・マグネット・メール便 30 個 MOQ。4 つの主要箱型、5 素材、6 加工を比較。茶ブランド創業者 FAQ 4 件と予算フレンドリーなブランド特化型ギフトボックス包装戦略を含む。",
    "date": "2026-08-07",
    "category": "茶・ドリンク",
}

q006_meta_by_locale = {
    'zh-hk': q006_meta_zh,
    'en': q006_meta_en,
    'ja': q006_meta_ja,
}

for locale, content in q006_content.items():
    data, p = read_blog_data(locale)
    meta = q006_meta_by_locale[locale]
    # Q-006 全部 3 locale 统一结构 (含 title/description/date/category)
    data['tea-beverage-gift-box-printing-guide'] = {
        "title": meta["title"],
        "description": meta["description"],
        "date": meta["date"],
        "category": meta["category"],
        "content": content,
    }
    # 写回 (UTF-8 无 BOM, LF)
    with open(p, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"OK: {p.name} updated (Q-006 tea-beverage-gift-box-printing-guide)")

# 4. 读 blog-posts.ts 找 articleSlugs + BlogPostMeta
blog_posts_path = base / "src" / "data" / "blog-posts.ts"
with open(blog_posts_path, 'r', encoding='utf-8') as f:
    bp = f.read()

# 5. 找 articleSlugs 数组,追加 'tea-beverage-gift-box-printing-guide'
# 注: blog-posts.ts 是 .ts 文件,不是 JSON,需要 Edit 字符串
# 找 articleSlugs 末尾 '];'
m = re.search(r"(articleSlugs\s*=\s*\[)([\s\S]*?)(\];)", bp)
if m:
    existing_slugs_text = m.group(2)
    # 检查是否已存在
    if 'tea-beverage-gift-box-printing-guide' not in existing_slugs_text:
        new_slugs_text = existing_slugs_text.rstrip() + "\n  'tea-beverage-gift-box-printing-guide',"
        bp = bp[:m.start(2)] + new_slugs_text + bp[m.end(2):]
        print("OK: blog-posts.ts articleSlugs +'tea-beverage-gift-box-printing-guide'")
    else:
        print("SKIP: tea-beverage-gift-box-printing-guide already in articleSlugs")

# 6. 找 blogPosts 数组,追加 lpTeaBeverageGiftBox BlogPostMeta
# 找 const blogPosts 末尾 '];'
m2 = re.search(r"(const blogPosts: BlogPost\[\]\s*=\s*\[)([\s\S]*?)(\n\];)", bp)
if m2:
    new_entry = '''
  {
    slug: 'tea-beverage-gift-box-printing-guide',
    categoryKey: 'packaging',
    source: 'daily',
    date: '2026-08-07',
    title: {
      'zh-hk': '香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印港 ZprintPro',
      en: 'Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro',
      ja: '茶・ドリンクギフトボックス印刷ガイド：リーフティー・タピオカ・ECブランド向け | ZprintPro',
    },
    excerpt: {
      'zh-hk': '香港茶飲品牌禮盒訂製：30 個起印天地蓋盒、磁性禮盒、紙袋 1 條龍印刷。比較天地蓋、磁性、飛機盒 4 大盒型 + 5 種紙材 + 6 種工藝,附 4 條茶飲老闆 FAQ,助您用合理預算打造品牌專屬禮盒包裝。',
      en: 'Tea and beverage brand gift box printing: 30-unit MOQ for lid-base, magnetic, and mailer boxes. Compare 4 main box styles, 5 paper grades, and 6 finishes. Includes 4 FAQs from tea brand founders and budget-friendly brand-specific gift box packaging strategies.',
      ja: '茶・ドリンクブランドギフトボックス印刷：天地蓋箱・マグネット・メール便 30 個 MOQ。4 つの主要箱型、5 素材、6 加工を比較。茶ブランド創業者 FAQ 4 件と予算フレンドリーなブランド特化型ギフトボックス包装戦略を含む。',
    },
    // 故意不写 cover 字段 — 純文字博客 (v2 硬约束 2026-07-04)
  },
'''
    if 'tea-beverage-gift-box-printing-guide' not in m2.group(2):
        # 在 last entry 之后,'];' 之前插入
        existing_inner = m2.group(2)
        # 找最后一个 '},' 位置
        last_brace = existing_inner.rfind('},')
        if last_brace >= 0:
            new_inner = existing_inner[:last_brace+2] + new_entry + existing_inner[last_brace+2:]
            bp = bp[:m2.start(2)] + new_inner + bp[m2.end(2):]
            print("OK: blog-posts.ts blogPosts +lpTeaBeverageGiftBox entry")
    else:
        print("SKIP: tea-beverage-gift-box-printing-guide already in blogPosts")

# 7. 写回
with open(blog_posts_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(bp)
print(f"OK: blog-posts.ts updated (Q-006)")

# 8. 跑 articleSlugs 验证
m3 = re.search(r"articleSlugs\s*=\s*\[([\s\S]*?)\];", bp)
if m3:
    slugs = re.findall(r"'([^']+)'", m3.group(1))
    has_new = 'tea-beverage-gift-box-printing-guide' in slugs
    print(f"articleSlugs total: {len(slugs)}, has Q-006: {has_new}")
