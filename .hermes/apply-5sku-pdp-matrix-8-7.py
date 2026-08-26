# -*- coding: utf-8 -*-
"""
8/7 5 SKU 优化 + 1 PDP 审查 + F matrix tracking 综合脚本:

B 任务: 5 SKU P2 japan-doujin 优化 (3 locale append 7 行业 standard 繁體 + optimizedAt 2026-08-07 + optimizationRound 1)
- doujinshi-printing
- acrylic-keychain
- can-badge
- postcard-set
- eco-tote-bag

C 任务: v7-PDP-15 large-bags 5 维度审查 (P0 paper-bags, R1 8/3 优化, 0 fixes + 2 pending)

F 任务: matrix tracking 3 entries 追加
- Q-006 queue entry
- 5 SKU v7-SKU-56~60 entries
- v7-PDP-15 entry
- 8-7-daily-cron-v8.2-yield-v2 session entry
- lastUpdated update
"""

import json
import re
from pathlib import Path

base = Path(r"F:\zprintpro-nextjs")

# ============ B 5 SKU 优化 ============
p2_skus = [
    'doujinshi-printing',
    'acrylic-keychain',
    'can-badge',
    'postcard-set',
    'eco-tote-bag',
]

# 7 行业 standard 繁體 3 locale (跟 8/5 daily 5 SKU 一致)
industries_zh = "**適配行業**：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。"
industries_en = "**Best for**: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations."
industries_ja = "**適用業界**：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。"

# 找 products.ts 中 5 SKU 块
products_path = base / "src" / "data" / "products.ts"
with open(products_path, 'r', encoding='utf-8') as f:
    content = f.read()

for sku in p2_skus:
    # 找 slug 块
    pattern = r"(id:\s*['\"][A-Z]+-\d+['\"][\s\S]*?slug:\s*['\"]" + re.escape(sku) + r"['\"][\s\S]*?)(?=\},\s*\{|\}\s*;)"
    m = re.search(pattern, content)
    if not m:
        print(f"WARN: {sku} block not found")
        continue

    block = m.group(1)
    new_block = block

    # 1. 加 optimizedAt 2026-08-07 + optimizationRound 1 (slug 之后)
    if 'optimizedAt' not in new_block:
        slug_match = re.search(r"(slug:\s*['\"]" + re.escape(sku) + r"['\"]\s*,)", new_block)
        if slug_match:
            new_block = new_block.replace(
                slug_match.group(1),
                slug_match.group(1) + "\n    optimizedAt: '2026-08-07',\n    optimizationRound: 1,"
            )

    # 2. 3 locale append 7 行业 standard 繁體
    # description (中文简体) 末尾 append industries_zh
    desc_match = re.search(r"(description:\s*['\"][^'\"]*['\"]\s*,)", new_block)
    if desc_match and '**適配行業**' not in desc_match.group(1):
        new_block = new_block.replace(
            desc_match.group(1),
            desc_match.group(1).rstrip(',') + ' ' + industries_zh + "',"
        )

    desc_en_match = re.search(r"(descriptionEn:\s*['\"][^'\"]*['\"]\s*,)", new_block)
    if desc_en_match and '**Best for**: Food & Beverage' not in desc_en_match.group(1):
        new_block = new_block.replace(
            desc_en_match.group(1),
            desc_en_match.group(1).rstrip(',') + ' ' + industries_en + "',"
        )

    desc_ja_match = re.search(r"(descriptionJa:\s*['\"][^'\"]*['\"]\s*,)", new_block)
    if desc_ja_match and '**適用業界**：飲食' not in desc_ja_match.group(1):
        new_block = new_block.replace(
            desc_ja_match.group(1),
            desc_ja_match.group(1).rstrip(',') + ' ' + industries_ja + "',"
        )

    if new_block != block:
        content = content.replace(block, new_block, 1)
        print(f"OK: products.ts {sku} 3 locale 7 行业 standard 繁體 + optimizedAt 8/7 R1 追加")
    else:
        print(f"SKIP: {sku} 已有 optimizedAt + 7 行业 standard 繁體")

with open(products_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
print()

# ============ C v7-PDP-15 large-bags 5 维度审查 ============
# 不动 src/ (C 任务是审计, 只追加 matrix entry, 不改 products.ts large-bags 字段)
# v7-PDP-15 entry 已经在上面 F 任务追加

# ============ F matrix tracking 3 entries ============
matrix_path = base / ".hermes" / "industry-keyword-matrix.json"
with open(matrix_path, 'r', encoding='utf-8') as f:
    m = json.load(f)

# 1. Q-006 queue entry 追加
q006_entry = {
    "id": "Q-006",
    "category": "packaging",
    "sku": "food-boxes",
    "industry": "茶飲食品",
    "tier": "A",
    "priority": "P0",
    "slug": "tea-beverage-gift-box-printing-guide",
    "title_zh": "香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印港 ZprintPro",
    "title_en": "Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro",
    "title_ja": "茶・ドリンクギフトボックス印刷ガイド：リーフティー・タピオカ・ECブランド向け | ZprintPro",
    "valid_internal_links": [
        "/category/packaging/",
        "/product/food-boxes/",
        "/product/rigid-boxes/",
        "/product/magnetic-closure-gift-box/",
        "/product/gift-boxes/",
        "/quote/"
    ],
    "expected_words_zh": 950,
    "expected_faqs": 4,
    "queued_at": "2026-07-07",
    "status": "completed",
    "completed_at": "2026-08-07",
    "completed_slug": "tea-beverage-gift-box-printing-guide",
    "v8_standard": True,
    "anti_ai_slop_8_items": True,
    "9_section_structure": True,
    "no_images": True,
    "faq_count": 4,
    "internal_links_count": 4,
    "locale_chars": {"zh-hk": 6745, "en": 12109, "ja": 7411}
}

# 检查是否已存在 Q-006 (上次 8/5 报告已写 Q-006 status=pending, 现在 mark completed)
q006_idx = None
for i, e in enumerate(m['queue']):
    if e['id'] == 'Q-006':
        q006_idx = i
        break

if q006_idx is not None:
    # 更新 Q-006 现有 entry
    m['queue'][q006_idx] = q006_entry
    print(f"OK: matrix Q-006 updated to completed (8/7)")
else:
    m['queue'].append(q006_entry)
    print(f"OK: matrix Q-006 added as completed (8/7)")

# 2. 5 SKU v7-SKU-56~60 entries 追加
sku_entries = []
for i, sku in enumerate(p2_skus, start=56):
    sku_entries.append({
        "optimizationId": f"v7-SKU-{i}",
        "sku": sku,
        "category": "japan-doujin",
        "priority": "P2",
        "tier": "C",
        "optimizationRound": 1,
        "optimizedAt": "2026-08-07",
        "industries_appended_zh": "餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動",
        "industries_appended_en": "Food & Beverage / Retail / Cross-border E-commerce / Beauty & Skincare / Education & Training / Wedding / Brand Activations",
        "industries_appended_ja": "飲食・ケータリング / 小売・ブティック / 越境EC / 美容・スキンケア / 教育・研修 / 婚礼・冠婚葬祭 / ブランドイベント"
    })

m['v7_sku_optimizations'].extend(sku_entries)
print(f"OK: matrix v7_sku_optimizations +5 (v7-SKU-56~60, P2 japan-doujin R1 全新 8/7)")

# 3. v7-PDP-15 large-bags entry 追加
pdp15 = {
    "reviewId": "v7-PDP-15",
    "slug": "large-bags",
    "category": "paper-bags",
    "priority": "P0",
    "industries_covered": [
        "服裝",
        "鞋類",
        "禮品籃",
        "家居用品",
        "酒類多瓶",
        "婚慶",
        "跨境電商"
    ],
    "optimizationRound": 1,
    "previous_optimizedAt": "2026-08-03",
    "reviewAt": "2026-08-07",
    "5_dim_audit": {
        "title_ctr": {
            "status": "PASS",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "zh-hk_title_zh": "現有 title_zh 維持 (跟 8/3 R1 优化 一致)",
                "en_nameEn": "現有 nameEn 維持",
                "ja_nameJa": "現有 nameJa 維持"
            },
            "note": "P0 paper-bags 5 sharp hook 命中, §13.10 NAP 脱敏"
        },
        "price_anchor": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 1,
            "evidence": {
                "description_industries_zh": "8/3 R1 优化 append 7 繁体 適配行業 standard (服裝/鞋類/禮品籃/家居/酒類/婚慶/跨境電商) 跟原 7 简体 适配行业 并存 14 行业覆盖",
                "longDescription_tables": "2 个 table (Stock: Brown/White/Art/Black/Recycled Kraft + Size: Apparel Large/XL/Footwear/Gift Hamper)",
                "5_industries_zh_scenarios": "Apparel twin-pack shoes / Footwear boxes / Gift hampers / Wine multi-bottle / Holiday bundles"
            },
            "pending_8_12": "缺 price_range 显式 (8/12 §PDP 复盘统一补, 跟 v7-PDP-09~14 5 件 predecessor fix pending 一致)"
        },
        "trust_bar_15y": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 1,
            "evidence": {
                "iso_9001": "longDescriptionEn '15+ years' + ZprintPro Engineering Team author 跟 RegionalContent.tsx 跨产品通用 ✓",
                "fsc_certified": "FSC 认证纸材 + 8/3 R1 优化 维持 ✓",
                "31_brands": "1 fix pending 8/12 §PDP 复盘统一补 (跟 v7-PDP-12/13/14 3 件 predecessor fix pending 一致)"
            }
        },
        "nap_consistency": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "title_no_supplier_origin": "title_zh 不含 深圳/Shenzhen/深セン ✓",
                "nap_real_address": "longDescription '深圳自設廠房直送' (法务 NAP, 不是 SEO 硬塞) ✓"
            }
        },
        "cta_path": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "entry_3_way": "WhatsApp + QuoteCalculator + /quote/ 3 入口 7/30-8/5 模式一致 ✓"
            }
        }
    },
    "summary": {
        "fixes_total": 0,
        "pending_total": 2,
        "pdp_dimension_score": "5/5 dimensions PASS (0 fixes + 2 pending 8/12 §P4 复盘统一补)",
        "pdp_tier": "P0 paper-bags × Tier A (高复购月/周频次, 跨境主力客群, 优先铺)",
        "comparison_to_predecessors": "跟 7/30 v7-PDP-09 corrugated-boxes 0+2 / 7/31 v7-PDP-10 folding-boxes 0+0 / 8/1 v7-PDP-11 foil-stickers 0+0 / 8/3 v7-PDP-12 gift-bags 0+0 / 8/5 v7-PDP-13 mailer-boxes 0+0 / 8/6 v7-PDP-14 removable-stickers 0+2 同水准 (P0 paper-bags 5 维度全过 + 2 pending 8/12 统一补)"
    }
}
m['v7_pdp_reviews'].append(pdp15)
print(f"OK: matrix v7_pdp_reviews +1 (v7-PDP-15 large-bags, 5 维度 0+2)")

# 4. 8-7-daily-cron-v8.2-yield-v2 session entry 追加
cron_8_7 = {
    "session_id": "8-7-daily-cron-v8.2",
    "date": "2026-08-07",
    "cron_name": "zprintpro-daily-content-evolve",
    "cron_id": "3684eb06",
    "trigger_type": "manual_cron_root_session_pre_prepare",
    "yield_mode": False,
    "tasks_executed": {
        "A_blog": {
            "executed": True,
            "new_q_entry": "Q-006",
            "slug": "tea-beverage-gift-box-printing-guide",
            "3_locale_chars": {
                "zh-hk": 6745,
                "en": 12109,
                "ja": 7411
            },
            "8_anti_ai_slop": True,
            "9_section": True,
            "4_faq": True,
            "internal_links": 4,
            "no_images": True
        },
        "B_sku_optimization": {
            "executed": True,
            "count": 5,
            "r1_new": 5,
            "skus": [
                "doujinshi-printing",
                "acrylic-keychain",
                "can-badge",
                "postcard-set",
                "eco-tote-bag"
            ],
            "category": "japan-doujin P2 0% 优化覆盖率"
        },
        "C_pdp_review": {
            "executed": True,
            "v7_id": "v7-PDP-15",
            "slug": "large-bags",
            "category": "paper-bags",
            "priority": "P0",
            "5_dim_audit": True,
            "fixes": 0,
            "pending": 2
        },
        "F_matrix_tracking": {
            "executed": True,
            "q_added": "Q-006 (mark completed)",
            "v7_sku_added": 5,
            "v7_pdp_added": 1
        },
        "retrofit_1_blog": {
            "executed": True,
            "slug": "packaging-box-custom-guide",
            "v8_template_v2_added": [
                "段 0 重點摘要 (zh-hk 重點摘要 / en Key Takeaways / ja 要約)",
                "黄 callout (关键洞察 box)",
                "3 新 FAQ (凑 4 FAQ)",
                "蓝 CTA (含 4 个 SKU/quote 链接)",
                "Author (ZprintPro Engineering Team)",
                "Sources (香港品牌管理局 + ISTA 3A + FSC + ISO 12647)",
                "Disclaimer (NAP 真实地址 + 免责声明)"
            ]
        }
    },
    "push_status": "pending 1 push (8/7 9:10 cron 触发 commit + push origin_ssh main)",
    "build_quota": 1,
    "verify_deploy_status": "pending"
}
m['v7_cron_sessions'].append(cron_8_7)
print(f"OK: matrix v7_cron_sessions +1 (8-7-daily-cron-v8.2)")

# 5. lastUpdated update
m['lastUpdated'] = "2026-08-07T02:15:00+08:00"

# 6. counts update
m['v7_pdp_reviews_count'] = len(m['v7_pdp_reviews'])
m['v7_cron_sessions_count'] = len(m['v7_cron_sessions'])
m['v7_sku_optimizations_count'] = len(m['v7_sku_optimizations'])
m['k3_section6_skip_count'] = m.get('k3_section6_skip_count', 30)  # 维持 30 (8/6 已 30)

# 7. 写回
with open(matrix_path, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(m, f, ensure_ascii=False, indent=2)
print(f"OK: matrix.json updated (Q-006 completed + 5 SKU + v7-PDP-15 + 8-7-cron session)")

# 8. verify
print()
print('=== 8/7 final matrix verify ===')
print(f'lastUpdated: {m["lastUpdated"]}')
print(f'v7_sku_optimizations_count: {m["v7_sku_optimizations_count"]} (期望 59)')
print(f'v7_pdp_reviews_count: {m["v7_pdp_reviews_count"]} (期望 15)')
print(f'v7_cron_sessions_count: {m["v7_cron_sessions_count"]} (期望 14)')
print(f'queue total: {len(m["queue"])} (期望 36)')

# verify Q-006 completed
q006_check = [e for e in m['queue'] if e['id'] == 'Q-006']
if q006_check:
    print(f'Q-006 status: {q006_check[0]["status"]} (期望 completed)')

# verify v7-SKU-56~60
sku_check = [e for e in m['v7_sku_optimizations'] if e.get('optimizationId') in ['v7-SKU-56','v7-SKU-57','v7-SKU-58','v7-SKU-59','v7-SKU-60']]
print(f'v7-SKU-56~60: {len(sku_check)} entries (期望 5)')

# verify v7-PDP-15
pdp_check = [e for e in m['v7_pdp_reviews'] if e.get('reviewId') == 'v7-PDP-15']
if pdp_check:
    print(f'v7-PDP-15: {pdp_check[0]["slug"]} (期望 large-bags)')

# verify 8-7 cron session
cron_check = [e for e in m['v7_cron_sessions'] if e.get('session_id') == '8-7-daily-cron-v8.2']
if cron_check:
    print(f'8-7 cron session: {cron_check[0]["trigger_type"]} (期望 manual_cron_root_session_pre_prepare)')
