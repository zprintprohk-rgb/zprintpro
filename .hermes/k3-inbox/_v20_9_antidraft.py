# -*- coding: utf-8 -*-
"""V20.9 anti-draft prompt 升级 (P0-1, K3 8/16 01:50 拍板)

改动:
1. 5 个 gen_v20_*.py 函数开头加 PRODUCTION-READY FINAL IMAGE ONLY 前缀
2. NEGATIVE_BLOCK 末尾加 "no draft/sketch/test" 反向约束
3. 重出 87 SKU × 4-5 视图 (1.39 MB)
"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Step 1: 在 NEGATIVE_BLOCK 末尾加 anti-draft 反向约束
OLD_NEG_TAIL = "product construction must match real-world physics and structural integrity."
NEW_NEG_TAIL = """product construction must match real-world physics and structural integrity, no draft composition, no sketch, no test render, no early-stage sampling, no work-in-progress, no low-quality preview, no placeholder elements, no partial layout, no exploratory composition, no A/B test format, no before/after format, no two candidates side by side, no candidate 1 vs candidate 2 output, each generated image must be the SINGLE FINAL POLISHED VERSION ready for commercial use, as if it were the best of 4 candidates selected by CLIP score, skip sampling step 1-25 entirely, output only the camera-ready production version."""

if OLD_NEG_TAIL in content:
    content = content.replace(OLD_NEG_TAIL, NEW_NEG_TAIL, 1)
    print("Step 1 OK: NEGATIVE_BLOCK 末尾加 anti-draft 反向约束")
else:
    print("Step 1 FAIL")
    sys.exit(1)

# Step 2: 5 个 gen_v20_*.py 函数开头加 PRODUCTION-READY FINAL IMAGE ONLY 前缀
# gen_v20_hero
OLD_HERO = '''def gen_v20_hero(name_en, client_info, scene):
    """V20 视角 1: HERO 主图 - 80-85% 近景, 单一产品, 一眼识别"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #1 主图 (HERO image for Amazon/1688/Shopify product listing page), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角1 = 电商主图)'''

NEW_HERO = '''def gen_v20_hero(name_en, client_info, scene):
    """V20 视角 1: HERO 主图 - 80-85% 近景, 单一产品, 一眼识别 (V20.9 anti-draft 加 PRODUCTION-READY 前缀)"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #1 主图 (HERO image for Amazon/1688/Shopify product listing page), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角1 = 电商主图)'''

if OLD_HERO in content:
    content = content.replace(OLD_HERO, NEW_HERO, 1)
    print("Step 2a OK: gen_v20_hero 加 PRODUCTION-READY 前缀")
else:
    print("Step 2a FAIL")
    sys.exit(1)

# gen_v20_detail
OLD_DETAIL = '''def gen_v20_detail(name_en, client_info, scene):
    """V20 视角 2: DETAIL 工艺特写 - 90% 画面, 产品放大 2 倍以上, 工艺/卖点标签"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #2 卖点特写 (DETAIL image for product detail page selling points), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角2 = 电商主图)'''

NEW_DETAIL = '''def gen_v20_detail(name_en, client_info, scene):
    """V20 视角 2: DETAIL 工艺特写 - 90% 画面, 产品放大 2 倍以上, 工艺/卖点标签 (V20.9 anti-draft)"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #2 卖点特写 (DETAIL image for product detail page selling points), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角2 = 电商主图)'''

if OLD_DETAIL in content:
    content = content.replace(OLD_DETAIL, NEW_DETAIL, 1)
    print("Step 2b OK: gen_v20_detail 加 PRODUCTION-READY 前缀")
else:
    print("Step 2b FAIL")
    sys.exit(1)

# gen_v20_variety_a + gen_v20_variety_c + gen_v20_multi_angle
OLD_VA = '''def gen_v20_variety_a(name_en, client_info, scene):
    """V20 视角 3A: VARIETY 多颜色变体 - 75-90% 画面, 5 个颜色变体摆一起"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #3 款式组合 (VARIETY image showing color/format variations), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角3A = 电商主图)'''

NEW_VA = '''def gen_v20_variety_a(name_en, client_info, scene):
    """V20 视角 3A: VARIETY 多颜色变体 - 75-90% 画面, 5 个颜色变体摆一起 (V20.9 anti-draft)"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #3 款式组合 (VARIETY image showing color/format variations), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角3A = 电商主图)'''

if OLD_VA in content:
    content = content.replace(OLD_VA, NEW_VA, 1)
    print("Step 2c OK: gen_v20_variety_a")

OLD_VC = '''def gen_v20_variety_c(name_en, client_info, scene):
    """V20 视角 3C: VARIETY 多场景 - 75-90% 画面, 3 个使用场景拼图"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #3 场景组合 (VARIETY image showing usage scenarios), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角3C = 电商主图)'''

NEW_VC = '''def gen_v20_variety_c(name_en, client_info, scene):
    """V20 视角 3C: VARIETY 多场景 - 75-90% 画面, 3 个使用场景拼图 (V20.9 anti-draft)"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #3 场景组合 (VARIETY image showing usage scenarios), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角3C = 电商主图)'''

if OLD_VC in content:
    content = content.replace(OLD_VC, NEW_VC, 1)
    print("Step 2d OK: gen_v20_variety_c")

OLD_MA = '''def gen_v20_multi_angle(name_en, client_info, scene):
    """V20 视角 4: MULTI-ANGLE 多角度拼图 - 75-80% 画面, 同 SKU 4 角度"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #4 多角度 (MULTI-ANGLE composite image showing 4 views), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角4 = 电商主图)'''

NEW_MA = '''def gen_v20_multi_angle(name_en, client_info, scene):
    """V20 视角 4: MULTI-ANGLE 多角度拼图 - 75-80% 画面, 同 SKU 4 角度 (V20.9 anti-draft)"""
    client, _, colors, font, brand_text = client_info
    product_name = name_en.split('|')[0].strip().rstrip(',').strip() if name_en else 'product'
    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #4 多角度 (MULTI-ANGLE composite image showing 4 views), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角4 = 电商主图)'''

if OLD_MA in content:
    content = content.replace(OLD_MA, NEW_MA, 1)
    print("Step 2e OK: gen_v20_multi_angle")

# gen_v20_spread 也要加
OLD_SP = '''def gen_v20_spread(name_en, client_info, scene, spread_scene=None, book_layout=None, slug=""):
    """V20.6 视角 5: SPREAD 展开展示内页 (K3 8/15 04:13+04:42 反馈升级)'''

NEW_SP = '''def gen_v20_spread(name_en, client_info, scene, spread_scene=None, book_layout=None, slug=""):
    """V20.9 视角 5: SPREAD 展开展示内页 (V20.6+V20.9 anti-draft, K3 8/15 04:13+04:42+8/16 拍板)'''

if OLD_SP in content:
    content = content.replace(OLD_SP, NEW_SP, 1)
    print("Step 2f OK: gen_v20_spread docstring 升级 V20.9")

# gen_v20_spread 的 return 也要加 anti-draft
OLD_SP_RET = '''    return f"""生图图片: Seedream 5.0 e-commerce product photo generation, 电商主图 #5 展开展示 (SPREAD image showing unfolded interior as creative design showcase), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20.6 视角5 = 电商主图, 8/15 04:13+04:42 K3 反馈中缝连贯 + 真实可读英文 + 内容逻辑 + 智能 PHOTO/TEXT layout)'''

NEW_SP_RET = '''    return f"""生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render. Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates, skip early sampling stages entirely. Seedream 5.0 e-commerce product photo generation, 电商主图 #5 展开展示 (SPREAD image showing unfolded interior as creative design showcase), 1:1 ratio, 8K ultra-high-definition, ← 工具声明 (Seedream 5.0) + 商业定位 (V20.6 视角5 = 电商主图, 8/15 04:13+04:42 K3 反馈中缝连贯 + 真实可读英文 + 内容逻辑 + 智能 PHOTO/TEXT layout)'''

if OLD_SP_RET in content:
    content = content.replace(OLD_SP_RET, NEW_SP_RET, 1)
    print("Step 2g OK: gen_v20_spread 加 PRODUCTION-READY 前缀")

# Step 3: 升级 V20.8 header 到 V20.9
OLD_HEADER = 'V20.8 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50+04:34 拍板 (BC/PK/RP/JP 不能用 books 模板 + cat-aware SPREAD routing + 22 SKU 修复)'
NEW_HEADER = 'V20.9 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50+04:34+8/16 01:50 拍板 (anti-draft prompt 升级 + _auto_select_best.py 保护模式自动选图 + 5 维度评分 design 35% + cat-aware SPREAD routing 保持)'

if OLD_HEADER in content:
    content = content.replace(OLD_HEADER, NEW_HEADER, 1)
    print("Step 3 OK: V20.8 -> V20.9 header")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n=== V20.9 升级完成, file size: {len(content)} bytes ===")
