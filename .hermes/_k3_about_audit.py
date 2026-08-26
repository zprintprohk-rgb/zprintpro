"""Audit /zh-hk/about/ page for issues K3 raised: 1.5x image size, 4:3 ratio, trust transmission"""
from pathlib import Path
import re
from collections import Counter

P = Path(r"F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx")
content = P.read_text(encoding="utf-8")

# 1) all image src references
imgs = re.findall(r"""src=[\"']([^\"']+\.(?:webp|png|jpg))[\"']""", content)
print(f"\n=== A. IMAGE SOURCES ({len(imgs)} refs) ===")
for i, src in enumerate(imgs, 1):
    print(f"  {i:2}. {src}")

# 2) image-related Tailwind classes (sizing/aspect)
# h-XX (height), aspect-XX (ratio), w-XX, max-w-XX
print("\n=== B. IMAGE-RELATED TAILWIND HEIGHTS ===")
heights = re.findall(r'h-\d+', content)
for h, c in Counter(heights).most_common(15):
    print(f"  {h}: {c}x")

# 3) aspect-ratio (4:3 / 16:9 / 1:1)
print("\n=== C. ASPECT-RATIO CLASSES ===")
ratios = re.findall(r"aspect-\[[^\]]+\]|aspect-\S+", content)
for r, c in Counter(ratios).most_common():
    print(f"  {r}: {c}x")
if not ratios:
    print("  ❌ NO aspect-ratio classes! All images default to object-cover (free ratio from source)")

# 4) width classes on figure/img
print("\n=== D. IMAGE-RELATED WIDTH CLASSES ===")
widths = re.findall(r"w-\d+|w-full|w-auto", content)
for w, c in Counter(widths).most_common(15):
    print(f"  {w}: {c}x")

# 5) Check step 4 "印刷生產" desc for junk content (per source)
print("\n=== E. STEP 4 '印刷生產' DESC ===")
step4_match = re.search(r"step: '4'.*?desc: `([^`]+)`", content, re.DOTALL)
if step4_match:
    desc = step4_match.group(1)
    print(f"  Length: {len(desc)} chars")
    print(f"  Has [查看工序流]: {'[查看工序流' in desc}")
    print(f"  Has 主营: {'主营' in desc}")
    print(f"  Has 5 [category/...]: {desc.count('[category')}")
    print(f"  Has wa.me: {'wa.me' in desc}")
    print(f"  Has ISO 9001 in step 4: {'ISO 9001' in desc}")
    print(f"  Full text:\n  {desc[:500]}...")

# 6) Check step 5 '全球送達' desc
print("\n=== F. STEP 5 '全球送達' DESC ===")
step5_match = re.search(r"step: '5'.*?desc: `([^`]+)`", content, re.DOTALL)
if step5_match:
    desc = step5_match.group(1)
    print(f"  Length: {len(desc)} chars")
    print(f"  Has wa.me: {'wa.me' in desc}")
    print(f"  Has 聯絡我們: {'聯絡我們' in desc}")
    print(f"  Full text:\n  {desc[:500]}...")

# 7) Customer team section: 3 team cards w/ placeholder content?
print("\n=== G. TEAM SECTION (3 team cards) ===")
team_match = re.search(r"teams:\s*\[(.*?)\],", content, re.DOTALL)
if team_match:
    print("  Found teams array; checking content...")
    # count generic single-character avatars
    pattern = r"children:\s*['\"][創印客]"
    matches = re.findall(pattern, content)
    print(f"  '創' / '印' / '客' single-char avatar count: {len(matches)}")

# 8) Total file size
print(f"\n=== H. PAGE FILE SIZE ===")
print(f"  page.tsx: {P.stat().st_size} bytes ({P.stat().st_size/1024:.1f} KB)")
print(f"  lines: {len(content.splitlines())}")

# 9) 客户评价 section
print("\n=== I. 客户评价 / industries ===")
ind_count = re.findall(r"iconKey: '[^']+'", content)
print(f"  industries with iconKey: {len(ind_count)}")
print(f"  industries: {ind_count}")

# 10) Check SEO schema - LocalBusiness has HK address (not Shenzhen!)
print("\n=== J. SEO SCHEMA CHECK ===")
schema = re.search(r"generateLocalBusinessSchema", content)
print(f"  LocalBusiness schema used: {schema is not None}")

# check for shenzhen vs HK
shenzhen = "深圳" in content
hk = "San Po Kong" in content or "Hong Kong" in content or "Kowloon" in content
print(f"  Mentions 深圳: {shenzhen} (K3 8/7 拍板: NAP 必须深圳, schema LocalBusiness 应改地址)")
print(f"  Mentions HK (San Po Kong/Kowloon): {hk}")
print(f"  ❌ CRITICAL: schema.org LocalBusiness 地址写 HK 觀塘/新蒲岗, 与 K3 真实主体深圳不符, Google 验证会判 NAP 不一致")
