"""Image dimensions audit + step 4/5 content check"""
from PIL import Image
from pathlib import Path
import re

# 1. Image dimensions and aspect ratios
root = Path(r"F:\zprintpro-nextjs\public\images\factory")
print("=" * 100)
print("A. IMAGE DIMENSIONS & ASPECT RATIOS")
print("=" * 100)
print(f"{'FILE':<60} {'WxH':>12} {'AR':>10} {'KB':>8}")
print("-" * 100)
for p in sorted(root.glob("*.webp")):
    try:
        im = Image.open(p)
        w, h = im.size
        ar = w / h
        size_kb = p.stat().st_size / 1024
        if 1.25 < ar < 1.45: ar_str = "4:3 [TARGET]"
        elif 1.7 < ar < 1.85: ar_str = "16:9 [widescreen]"
        elif 0.99 < ar < 1.01: ar_str = "1:1"
        elif 0.55 < ar < 0.62: ar_str = "9:16"
        else: ar_str = f"{ar:.2f}"
        print(f"{p.name:<60} {w}x{h:<6} {ar_str:>10} {size_kb:>6.0f}KB")
    except Exception as e:
        print(f"{p.name}: ERROR {e}")

# 2. Step 4/5 content
print("\n" + "=" * 100)
print("B. STEP 4 '印刷生產' & STEP 5 '全球送達' CONTENT")
print("=" * 100)
p = Path(r"F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx")
content = p.read_text(encoding="utf-8")

# find step 4 block
m4 = re.search(r"step:\s*'4'.*?desc:\s*`([^`]+)`", content, re.DOTALL)
m5 = re.search(r"step:\s*'5'.*?desc:\s*`([^`]+)`", content, re.DOTALL)
if m4:
    desc = m4.group(1)
    print(f"\nStep 4 '印刷生產' desc: {len(desc)} chars")
    print(f"  Contains [查看工序流]: {'[查看工序流' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Contains 主营: {'主营' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Contains [category/...]: {desc.count('[category/') }x ❌ SHOULD NOT BE IN STEP")
    print(f"  Contains wa.me: {'wa.me' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Contains ISO 9001: {'ISO 9001' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Contains Delta E: {'Delta E' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Full: {desc[:300]}...")
if m5:
    desc = m5.group(1)
    print(f"\nStep 5 '全球送達' desc: {len(desc)} chars")
    print(f"  Contains wa.me: {'wa.me' in desc} ❌ SHOULD NOT BE IN STEP (CTA link)")
    print(f"  Contains 聯絡我們: {'聯絡我們' in desc} ❌ SHOULD NOT BE IN STEP")
    print(f"  Full: {desc[:300]}...")

# 3. Image dimensions and 1.5x assessment
print("\n" + "=" * 100)
print("C. K3 1.5X SIZE + 4:3 ASSESSMENT")
print("=" * 100)
print("Industry standard 'professional' 4:3 web image: 800x600 minimum (120KB+ for crispness)")
print("K3 target: at least 1.5x = 1200x900 (180KB+ for crispness)")
print()
small = []
for p in sorted(root.glob("*.webp")):
    im = Image.open(p)
    w, h = im.size
    ar = w / h
    size_kb = p.stat().st_size / 1024
    # 4:3 target
    if not (1.25 < ar < 1.45):
        small.append((p.name, w, h, ar, size_kb, "NOT 4:3"))
    elif w < 1200 or h < 900:
        small.append((p.name, w, h, ar, size_kb, "TOO SMALL"))
    elif size_kb < 180:
        small.append((p.name, w, h, ar, size_kb, "LOW QUALITY (compression too high)"))

if small:
    print(f"❌ {len(small)} images DON'T meet K3 1.5x + 4:3 standard:")
    for name, w, h, ar, kb, issue in small:
        print(f"  {name}: {w}x{h} AR={ar:.2f} {kb:.0f}KB — {issue}")
else:
    print("✅ All images meet 1.5x + 4:3 standard")

# 4. Total page file size assessment
print("\n" + "=" * 100)
print("D. PAGE COMPLEXITY ASSESSMENT")
print("=" * 100)
print(f"page.tsx: 67.8 KB / 824 lines")
print(f"  - Single file holds 3 locales (zh-hk/en/ja) translations dict")
print(f"  - Trade-off: easier maintenance vs file size (best practice: split per locale)")
print(f"  - 23 image refs, all factory/ source")
print(f"  - No aspect-ratio classes (relies on object-cover + source image ratio)")

# 5. Schema NAP check
print("\n" + "=" * 100)
print("E. SCHEMA.ORG LOCALBUSINESS NAP CHECK (K3 8/7 拍板: 真实主体深圳)")
print("=" * 100)
print("From the rendered HTML earlier, the LocalBusiness JSON-LD has:")
print('  "streetAddress": "Unit C, 15/F, Maxgrand Plaza, 3 Tai Yau Street"')
print('  "addressLocality": "San Po Kong"')
print('  "addressRegion": "Kowloon"')
print('  "addressCountry": "HK"')
print()
print("❌ CRITICAL: K3 8/7 拍板 (per AGENTS.md / MEMORY.md) - 真实主体 = 深圳市彩龍印刷包裝有限公司")
print("  真实地址: 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111)")
print()
print("Current schema says HK 觀塘/新蒲岗. Google 验证会判 NAP 不一致 (discrepancy).")
print("This violates Google's 'represent the real business' guideline and hurts local SEO trust.")
