#!/usr/bin/env python3
"""v7 verify all 3 file changes after edit"""
from pathlib import Path
import json, re

# 1. blog-posts.ts
bp = Path("src/data/blog-posts.ts").read_text(encoding="utf-8")
has_def = "const lpApparelShoppingBag: BlogPostMeta = {" in bp
has_arr = "  lpApparelShoppingBag," in bp
print(f"blog-posts.ts: lpApparelShoppingBag defined={has_def}, in blogPosts array={has_arr}")

# 2. page.tsx — verify zh-hk block has apparel entry
page = Path("src/app/[locale]/blog/[slug]/page.tsx").read_text(encoding="utf-8")
zh_hk_pos = page.find("'zh-hk': {")
en_pos = page.find("  en: {", zh_hk_pos)
zh_hk_block = page[zh_hk_pos:en_pos]
has_zh = "'apparel-shopping-bag-printing-guide':" in zh_hk_block
print(f"page.tsx: zh-hk block has apparel entry = {has_zh}")

# 3. blog-data JSON 3 locales
for loc in ["zh-hk", "en", "ja"]:
    j = json.loads(Path(f"src/data/blog-data/{loc}.json").read_text(encoding="utf-8"))
    c = j.get("apparel-shopping-bag-printing-guide", {}).get("content", "")
    has_price = "intuan" in c or "intuan-2026-07-18" in c
    has_15y = "15+ 年" in c or "15+ years" in c or "15+ 年の" in c
    print(f"blog-data/{loc}.json: apparel content {len(c)} chars, has price={has_price}, has 15+ years={has_15y}")

# 4. encoding check
print("\nEncoding spot check (UTF-8 BOM?):")
for f in ["src/data/blog-posts.ts", "src/app/[locale]/blog/[slug]/page.tsx",
          "src/data/blog-data/zh-hk.json", "src/data/blog-data/en.json", "src/data/blog-data/ja.json"]:
    b = Path(f).read_bytes()
    bom = "BOM" if b[:3] == b"\xef\xbb\xbf" else "no-BOM"
    print(f"  {f}: {len(b)} bytes, {bom}")
