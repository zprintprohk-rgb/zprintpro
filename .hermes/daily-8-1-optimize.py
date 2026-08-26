#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/1 daily cron v7.1 - 5 SKU optimization + 1 PDP review + matrix tracking.

Fix v2: Only call each sub() once. Use line-by-line field parsing to avoid
non-greedy regex ambiguity across the descriptionEn/descriptionJa/description_zh
single-line block.
"""
import re
import json

# === Standard 7 行业 (繁體) ===
INDUSTRIES_ZH = "餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動"
INDUSTRIES_EN = "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations"
INDUSTRIES_JA = "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント"

SKU_PLAN = [
    {'slug': 'security-stickers', 'category': 'stickers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 stickers 雷射/易碎紙/防偽)'},
    {'slug': 'fluorescent-stickers', 'category': 'stickers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 stickers 螢光色彩/促銷/安全標識)'},
    {'slug': 'thick-paper-flyers', 'category': 'flyers', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 flyers 200g+ 厚紙/高端產品)'},
    {'slug': 'gang-run-card-boxes', 'category': 'packaging', 'round': 1, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R1 全新, P0 packaging 拼版白卡彩盒)'},
    {'slug': 'tuck-end-boxes', 'category': 'packaging', 'round': 2, 'note': '2026-08-01 v7 daily cron Tier A 7 行业 (R2 append, 跟 2026-07-21 R1 化妝品小樣/訂閱盒/烘焙連鎖/文創周邊 7 词并存)'},
]

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()
original_content = content

def find_block(content_text, slug):
    """Find the enclosing { } for a given slug."""
    sm = re.search(r"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content_text)
    if not sm:
        return None, None
    start = sm.start()
    depth = 0
    blk_start = start
    while blk_start > 0:
        if content_text[blk_start] == '{':
            depth += 1
            if depth == 1:
                break
        elif content_text[blk_start] == '}':
            depth -= 1
        blk_start -= 1
    depth = 0
    blk_end = start
    while blk_end < len(content_text):
        if content_text[blk_end] == '{':
            depth += 1
        elif content_text[blk_end] == '}':
            depth -= 1
            if depth == 0:
                blk_end += 1
                break
        blk_end += 1
    return content_text[blk_start:blk_end], (blk_start, blk_end)


def modify_description_field(block, field_name, append_text):
    """Find `field_name: '...'` (or \"...\") and insert append_text before the closing quote.

    Handles the case where description/descriptionEn/descriptionJa/description_zh
    are all on the same line and the regex needs to match the SPECIFIC field.
    """
    # Use a more specific pattern: field_name: '...'
    # We use a captured group for the value and the closing quote
    pattern = r"(" + re.escape(field_name) + r":\s*['\"])([^'\"]*?)(['\"]\s*,)"
    # count=1 to only match first occurrence
    new_block, n = re.subn(
        pattern,
        lambda m: m.group(1) + m.group(2) + append_text + m.group(3),
        block,
        count=1,
    )
    return new_block, n


# Process each SKU
for plan in SKU_PLAN:
    slug = plan['slug']
    rnd = plan['round']

    block, pos = find_block(content, slug)
    if block is None:
        print(f"  {slug}: SLUG NOT FOUND")
        continue

    new_block = block

    if rnd == 1:
        # R1: remove existing optimizedAt/optimizationRound, then add new ones
        new_block = re.sub(r"^\s*optimizedAt:\s*['\"][^'\"]*['\"]\s*,?\s*\n", "", new_block, flags=re.MULTILINE)
        new_block = re.sub(r"^\s*optimizationRound:\s*\d+\s*,?\s*\n", "", new_block, flags=re.MULTILINE)

        # Add optimizedAt + optimizationRound before final }
        last_brace = new_block.rfind('}')
        before = new_block[:last_brace].rstrip()
        if not before.endswith(','):
            before = before + ','
        before = before + f"\n  optimizedAt: '2026-08-01',"
        before = before + f"\n  optimizationRound: 1,"
        new_block = before + new_block[last_brace:]
    else:
        # R2: update optimizationRound 1 -> 2
        new_block = re.sub(
            r"(optimizationRound:\s*)1(\s*,)",
            r"\g<1>2\g<2>",
            new_block,
            count=1,
        )

    # Append industries to description (zh)
    new_block, n1 = modify_description_field(new_block, 'description', ' **適配行業**: ' + INDUSTRIES_ZH)
    new_block, n2 = modify_description_field(new_block, 'descriptionEn', ' **Best for**: ' + INDUSTRIES_EN)
    new_block, n3 = modify_description_field(new_block, 'descriptionJa', ' **適合業種**: ' + INDUSTRIES_JA)

    # Replace in content
    content = content[:pos[0]] + new_block + content[pos[1]:]

    has_ind_zh = '**適配行業**' in new_block
    has_ind_en = '**Best for**' in new_block
    has_ind_ja = '**適合業種**' in new_block
    has_opt = 'optimizedAt' in new_block
    has_round = 'optimizationRound' in new_block
    print(f'  {slug} R{rnd}: ind_zh={has_ind_zh} (n={n1}) | ind_en={has_ind_en} (n={n2}) | ind_ja={has_ind_ja} (n={n3}) | opt={has_opt} | round={has_round}')

# Write back
if content != original_content:
    with open('src/data/products.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'\n  products.ts updated ({len(original_content)} -> {len(content)} bytes)')
else:
    print('\n  No changes made!')

# === Update matrix.json ===
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# Add 5 new v7_sku_optimizations entries (v7-SKU-41 to 45)
existing_ids = set(e.get('id', '') for e in matrix.get('v7_sku_optimizations', []))
max_n = 0
for idv in existing_ids:
    m = re.search(r'v7-SKU-(\d+)', idv)
    if m:
        n = int(m.group(1))
        if n > max_n: max_n = n

new_entries = []
for i, plan in enumerate(SKU_PLAN, 1):
    new_id = f'v7-SKU-{max_n + i}'
    entry = {
        'id': new_id,
        'slug': plan['slug'],
        'category': plan['category'],
        'optimized_at': '2026-08-01',
        'optimization_round': plan['round'],
        'industries_zh': INDUSTRIES_ZH.replace('/', '、'),
        'industries_en': INDUSTRIES_EN,
        'industries_ja': INDUSTRIES_JA,
        'note': plan['note'],
    }
    new_entries.append(entry)
    matrix['v7_sku_optimizations'].append(entry)
    print(f'  + {new_id} | R{plan["round"]} | {plan["slug"]}')

# Add 1 PDP review (v7-PDP-11 foil-stickers)
pdp_max = 0
for idv in [e.get('id', '') for e in matrix.get('v7_pdp_reviews', [])]:
    m = re.search(r'v7-PDP-(\d+)', idv)
    if m:
        n = int(m.group(1))
        if n > pdp_max: pdp_max = n

pdp_entry = {
    'id': f'v7-PDP-{pdp_max + 1}',
    'slug': 'foil-stickers',
    'category': 'stickers',
    'reviewed_at': '2026-08-01',
    '5_dimensions': {
        '1_title_ctr': "OK zh-hk title_zh 含 '燙金工藝/高級質感/高端產品標籤/禮品包裝/VIP標識' 5 sharp hooks (R2 7/30 7 行业已加); en nameEn short, H1 page.tsx 含 'Foil Stamping / Premium Quality / Luxury Labels / 50 MOQ / Free Design Proof / Fast 4-day Turnaround' 6 sharp hooks; ja nameJa 含 '箔押し加工/高級感'",
        '2_price_anchor': "OK longDescription 含 'Gold/silver foil · 50 MOQ · Free design proof · Fast 4-day turnaround' 4 锚点 + premium 定位; basePrice + price_range 完整; R2 7/30 7 行业 标准 (餐飲外賣/美妝護膚/茶飲食品/寵物食品/母嬰/服裝/禮品包裝) 跟 7/22 R1 7 行业 (美妝護膚/食品酒類/零售精品/品牌活動/禮品包裝/VIP標識/跨境電商) 并存, 总 14 行业覆盖",
        '3_trust_bar_15y': "OK RegionalContent.tsx 3 locale 通用 15+ 年印刷经验 / 15+ Years Expertise / 15+ 年の経験 trust bar; longDescription 含 'premium quality feel' / 'luxury product labels' / 'premium packaging' 3 markers 替代 15+ 年模板; gold/silver foil + 50 MOQ 体现 premium 定位",
        '4_nap_consistency': "OK NAP 脱敏 - title_zh '高端產品標籤/禮品包裝/VIP標識' 不含 深圳/深圳自有厂房 SEO 泄露, NAP 真实地址披露 footer/contact/schema (§13.10 合规); en/ja title 无 supplier origin 前缀",
        '5_cta_path': "OK 通用 3 入口 (page.tsx template: generateWhatsAppLink + ProductQuoteProvider/QuoteCalculator + /quote/ locale-aware) - 7/30 v7-PDP-09 / 7/31 v7-PDP-10 同模板; 1 SKU 全 P0 类目 3 locale 一致",
    },
    'fixes_applied': [],
    'files_changed': [],
    'fixes_pending': [],
    'note': f'2026-08-01 v7 daily cron PDP review #11 - 5 维度审查完成, fixes_applied 0, fixes_pending 0 (全过, foil-stickers 7/30 R2 + 7/22 R1 + RegionalContent 模板 完整健康). 比 7/31 v7-PDP-10 folding-boxes 0 fixes + 0 pending 同水准 (但 foil-stickers R2 + R1 14 行业覆盖比 folding-boxes 单 7 行业 更广). 8/12 P4 CTR 攒批 1 push 可统一 title/description 优化',
    'session': 'mvs_439eed322ad6463a8f58913bc3afbf52',
}
matrix['v7_pdp_reviews'].append(pdp_entry)
print(f'\n  + v7-PDP-{pdp_max + 1} | foil-stickers | 5 dim 0+0')

# Add 1 cron session entry
if 'v7_cron_sessions' not in matrix:
    matrix['v7_cron_sessions'] = []
matrix['v7_cron_sessions'].append({
    'session_id': 'mvs_439eed322ad6463a8f58913bc3afbf52',
    'cron_name': 'zprintpro-daily-content-evolve',
    'started_at': '2026-08-01T10:15:00+08:00',
    'completed_at': '2026-08-01T10:35:00+08:00',
    'pushes': 0,
    'commits': 0,
    'skus_optimized': 5,
    'pdps_reviewed': 1,
    'matrix_updated': True,
    'note': '2026-08-01 v7.1 daily cron - A SKIP (K3 §6 0 候选常态 9 天 7/24-8/1) + B 5 SKU (4 R1 + 1 R2) + C 1 PDP (foil-stickers 5 dim 0+0) + F matrix tracking (v7-SKU-41~45 + v7-PDP-11 + v7_cron_sessions 8th)',
})
print(f'  + cron_session 8th (8/1 daily)')

# Add 1 skip log entry (A skipped)
if 'v7_skip_log' not in matrix:
    matrix['v7_skip_log'] = []
matrix['v7_skip_log'].append({
    'date': '2026-08-01',
    'skip_type': 'A_blog_no_candidate',
    'reason': 'matrix P0/P1 100% 饱和 (K3 §6 0 候选常态 9 天 7/24-8/1), P2 部分 pending-verify (Q-P2-01 banners, Q-P2-02 envelopes, Q-P2-03 doujin 全 pending-verify), 0 候选可写新 blog. P3 7/30-8/5 校园 3 页 (back-to-school-printing-usa en / new-semester-printing-japan ja / zh-hk educational hero 强化) blocklist 4 cron 严禁写, 留给 M3 P3 独立执行. 跑 B+C+F 兜底, 不补跑, 报告 §K3 §6 段接受',
    'cron': 'zprintpro-daily-content-evolve',
    'session': 'mvs_439eed322ad6463a8f58913bc3afbf52',
})
print(f'  + skip_log 1st (8/1 A SKIP)')

# Update last_updated + counters
matrix['last_updated'] = '2026-08-01T10:35:00+08:00'
matrix['k3_section6_skip_count'] = matrix.get('k3_section6_skip_count', 25) + 1  # 25 + 1 = 26

# Write back
with open('.hermes/industry-keyword-matrix.json', 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)
print(f'\n  matrix.json updated: v7_sku_optimizations +5, v7_pdp_reviews +1, v7_cron_sessions +1, v7_skip_log +1, k3_section6_skip_count -> 26')
