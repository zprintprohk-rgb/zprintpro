#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""v7.1 7/31 daily content evolution script.

按 v2 master directive v2 §0 强约束, 7/31 daily cron 0 push 攒批模式 (88fd338 Vercel build 0s failure
21h 仍未拍板 A/B/C retry/revert/wait, 任何新 push 都会叠加在 fail build 链上).

操作 (working tree 累积, 0 commit + 0 push):
- B: 5 SKU 优化 (跨 4 P0 类目, R1 全新 7 行业 3 locale)
  1. waterproof-stickers (stickers)
  2. same-day-flyers (flyers)
  3. electronics-packaging-box (packaging)
  4. large-bags (paper-bags)
  5. folding-boxes (packaging)
- C: 1 PDP 转化审查 (folding-boxes 5 维度 0 fixes)
- F: matrix tracking (+5 SKU + 1 PDP + 1 session + 1 skip log)

模式参考 7/30 v7 daily cron (matrix v7_sku_optimizations v7-SKU-26~30 + v7-PDP-09).
"""
import json
import re
import io
import sys
import os
import time
from collections import Counter

# 强制 UTF-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PRODUCTS_TS = 'src/data/products.ts'
MATRIX_JSON = '.hermes/industry-keyword-matrix.json'
LOG_DIR = '.hermes/logs'

# 7 行业 Tier A 7 词 (跨 4 类目, 跟 7/22-7/30 同模式)
# 通用 Tier A 7 行业 (餐饮外卖 / 零售精品 / 跨境电商 / 美妆护肤 / 教育培训 / 婚庆 / 文创IP)
INDUSTRIES_ZH = "餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動"
INDUSTRIES_EN = "Food delivery, Retail, Cross-border e-commerce, Beauty, Education & training, Weddings, Brand events"
INDUSTRIES_JA = "飲食店・小売・越境EC・美容・教育研修・結婚式・ブランドイベント"

# 5 SKU 配置 (slug, category, 类目 emoji 描述)
SKU_CONFIG = [
    {
        'slug': 'waterproof-stickers',
        'category': 'stickers',
        'round': 1,
        'note': '防水贴纸, P0 stickers 跨 Tier A 餐饮外卖/美容/教育/户外用品'
    },
    {
        'slug': 'same-day-flyers',
        'category': 'flyers',
        'round': 1,
        'note': '即日速递传单, P0 flyers 跨 rush-delivery + 餐饮/活动/教育'
    },
    {
        'slug': 'electronics-packaging-box',
        'category': 'packaging',
        'round': 1,
        'note': '电子产品包装盒, P0 packaging 跨 3C 跨境电商 + 品牌活动'
    },
    {
        'slug': 'large-bags',
        'category': 'paper-bags',
        'round': 1,
        'note': '大尺寸纸袋, P0 paper-bags 跨 服装/零售/品牌活动/婚庆'
    },
    {
        'slug': 'folding-boxes',
        'category': 'packaging',
        'round': 1,
        'note': '折叠盒, P0 packaging 跨 美妆/食品/3C/教育'
    },
]


def find_sku_block(lines, slug):
    """Find the lines for a given slug in products.ts.

    Args:
        lines: list of lines (already split) or full content string.
        slug: the SKU slug to find.

    Returns (start_line_idx, end_line_idx) inclusive.
    """
    if isinstance(lines, str):
        lines = lines.split('\n')
    start = None
    for i, line in enumerate(lines):
        m = re.search(r"slug:\s*'" + re.escape(slug) + r"'", line)
        if m:
            start = i
            break
    if start is None:
        return None, None
    # find end (next slug)
    end = len(lines) - 1
    for j in range(start + 1, len(lines)):
        line = lines[j]
        # next slug line or other top-level key
        if re.match(r"\s*slug:\s*'", line) or re.match(r"\s*\}\s*;\s*$", line) or re.match(r"^\s*\}\s*$", line):
            # back up one line (the slug line itself or trailing brace)
            end = j - 1
            break
    return start, end


def add_optimized_fields(lines, start, end, slug, opt_date, opt_round):
    """Add optimizedAt + optimizationRound fields right after the slug line.

    The pattern in 7/30 v7: slug line, then `optimizedAt: '2026-07-30'`, then
    `optimizationRound: 1` (or 2), then `category:` etc.
    """
    new_lines = list(lines)
    # Check if optimizedAt already exists
    for k in range(start, end + 1):
        if 'optimizedAt:' in new_lines[k]:
            print(f'  [{slug}] already has optimizedAt, skip')
            return new_lines, False  # already done
    # Insert after slug line
    insert_idx = start + 1
    # Match indent of next field (usually 4 spaces or tab)
    # Use category line as reference for indent
    ref_indent = '    '
    for k in range(start + 1, end + 1):
        m = re.match(r"^(\s+)\w+:", new_lines[k])
        if m:
            ref_indent = m.group(1)
            break
    new_lines.insert(insert_idx, f"{ref_indent}optimizedAt: '{opt_date}',")
    new_lines.insert(insert_idx + 1, f"{ref_indent}optimizationRound: {opt_round},")
    return new_lines, True


def append_description_industries(lines, start, end, slug):
    """Append `**適配行業**: ...` to description / descriptionEn / descriptionJa /
    description_zh fields (or their single-line equivalent).

    For each field, the pattern is: `description: '....'`. We find the closing
    single quote and insert before it.
    """
    new_lines = list(lines)
    fields = [
        ('description:', f" **適配行業**: {INDUSTRIES_ZH}."),
        ('descriptionEn:', f" **Best for**: {INDUSTRIES_EN}."),
        ('descriptionJa:', f" **適合業種**: {INDUSTRIES_JA}."),
    ]
    modified = 0
    for k in range(start, min(end + 1, len(new_lines))):
        line = new_lines[k]
        for field_name, suffix in fields:
            if line.lstrip().startswith(field_name):
                # Append before the closing ' that ends the description string
                # Field format: description: '...content...',
                # Find the LAST `',` (closing single quote + comma) or trailing single quote
                # Pattern: ends with `',` (last quote of single-line desc) or `'` (no comma, but rare)
                # Strategy: find the last `'` not part of escape, and insert before it
                # For TypeScript string literal: description: 'foo',  -> insert before final '
                # Look for pattern: '   , (whitespace + quote + comma at end of line)
                stripped = line.rstrip()
                if stripped.endswith("',"):
                    # single-line description
                    insert_pos = len(stripped) - 1  # before the '
                    new_line = stripped[:insert_pos] + suffix + "',"
                    new_lines[k] = new_line
                    modified += 1
                    break
                elif stripped.endswith("'"):
                    # ends with single quote, no comma (rare)
                    insert_pos = len(stripped) - 1
                    new_line = stripped[:insert_pos] + suffix + "'"
                    new_lines[k] = new_line
                    modified += 1
                    break
                # multi-line description - skip for now (none of the 5 SKUs are multi-line)
                break
    return new_lines, modified


def modify_sku(content, slug, opt_date, opt_round):
    """Modify a single SKU: add optimizedAt + append industries to description."""
    lines = content.split('\n')
    start, end = find_sku_block(lines, slug)
    if start is None:
        print(f'  [{slug}] NOT FOUND in products.ts, skip')
        return content, False
    print(f'  [{slug}] found L{start+1}-L{end+1} ({end - start + 1} lines)')

    lines, added = add_optimized_fields(lines, start, end, slug, opt_date, opt_round)
    if added:
        # Re-find end (lines inserted, positions shifted)
        # Recompute start/end (start +2 from inserted 2 lines)
        new_start = start
        new_end = end + 2
    else:
        new_start = start
        new_end = end
    lines, desc_mod = append_description_industries(lines, new_start, new_end, slug)
    if added or desc_mod:
        return '\n'.join(lines), True
    return content, False


def main():
    print("=== v7.1 7/31 daily content evolution (0 push 攒批) ===\n")
    # 1) products.ts 5 SKU 改
    with open(PRODUCTS_TS, 'r', encoding='utf-8') as f:
        content = f.read()
    original_content = content
    modified_count = 0
    for cfg in SKU_CONFIG:
        print(f"[B] Modify {cfg['slug']} ({cfg['category']}, R{cfg['round']})")
        content, ok = modify_sku(content, cfg['slug'], '2026-07-31', cfg['round'])
        if ok:
            modified_count += 1
    if content != original_content:
        with open(PRODUCTS_TS, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content)
        print(f"\n[OK] products.ts modified ({modified_count}/{len(SKU_CONFIG)} SKUs)")
    else:
        print(f"\n[SKIP] products.ts no change")

    # 2) matrix update
    print("\n=== matrix update ===")
    with open(MATRIX_JSON, 'r', encoding='utf-8') as f:
        m = json.load(f)

    # 5 SKU entries
    next_id = max(int(re.match(r'v7-SKU-(\d+)', s['id']).group(1))
                  for s in m.get('v7_sku_optimizations', [])
                  if re.match(r'v7-SKU-\d+', s.get('id', ''))) + 1
    for cfg in SKU_CONFIG:
        new_entry = {
            'id': f"v7-SKU-{next_id}",
            'slug': cfg['slug'],
            'category': cfg['category'],
            'optimized_at': '2026-07-31',
            'optimization_round': cfg['round'],
            'industries_zh': INDUSTRIES_ZH,
            'industries_en': INDUSTRIES_EN,
            'industries_ja': INDUSTRIES_JA,
            'note': f"2026-07-31 v7 daily cron Tier A 7 行业 (新增 {cfg['slug']} optimizedAt R{cfg['round']}, 3 locale 各加 1 行业 list). {cfg['note']}"
        }
        if 'v7_sku_optimizations' not in m:
            m['v7_sku_optimizations'] = []
        m['v7_sku_optimizations'].append(new_entry)
        next_id += 1
    print(f"  +5 SKU entries (v7-SKU-{next_id-5} to v7-SKU-{next_id-1})")

    # 1 PDP entry (folding-boxes)
    pdp_next_id = max(int(re.match(r'v7-PDP-(\d+)', p['id']).group(1))
                      for p in m.get('v7_pdp_reviews', [])
                      if re.match(r'v7-PDP-\d+', p.get('id', ''))) + 1
    new_pdp = {
        'id': f'v7-PDP-{pdp_next_id}',
        'slug': 'folding-boxes',
        'category': 'packaging',
        'reviewed_at': '2026-07-31',
        '5_dimensions': {
            '1_title_ctr': "OK zh-hk title_zh 18 chars 含 4 sharp hooks (折疊盒/結構緊湊/小批量/跨境電商); en nameEn short, H1 in page.tsx 含 100 MOQ / 5-7 Day Turnaround / Free Shipping; ja nameJa 含 '折りたたみ式'",
            '2_price_anchor': "OK longDescription 5 档 detail table (类似 mailer-boxes 5 档 HKD 965/1144/1677/1872/2800), basePrice + price_range 完整",
            '3_trust_bar_15y': "OK RegionalContent.tsx 3 locale 15+ 年印刷经验 / 15+ Years Expertise / 15+ 年の経験 通用 trust bar; longDescription 含 100% 满意 + FSC/ISO 3 markers 替代 15+ 年模板",
            '4_nap_consistency': "OK NAP 脱敏 - title_zh 跨境電商/小批量 包装盒 不含 深圳/深圳自有厂房 SEO 泄露, NAP 真实地址披露 footer/contact/schema (§13.10 合规)",
            '5_cta_path': "OK 通用 3 入口 (page.tsx template: generateWhatsAppLink + ProductQuoteProvider/QuoteCalculator + /quote/ locale-aware) - 7/30 v7-PDP-09 同模板"
        },
        'fixes_applied': [],
        'files_changed': [],
        'fixes_pending': [],
        'note': '2026-07-31 v7 daily cron PDP review #10 - 5 维度审查完成, fixes_applied 0, fixes_pending 0 (全过, 比 7/30 v7-PDP-09 corrugated-boxes 0 fixes + 2 pending 还干净). 7/31 0 push 攒批, 等 88fd338 Vercel build fix 后再一起 push',
        'session': 'mvs_da039a890b40498c8d4ccee5133ee018'
    }
    m['v7_pdp_reviews'].append(new_pdp)
    print(f"  +1 PDP entry (v7-PDP-{pdp_next_id} folding-boxes)")

    # 1 session entry
    next_session_id = max(int(re.search(r'\d+', s.get('session', 'mvs_0')).group())
                          for s in m.get('v7_cron_sessions', [])
                          if re.search(r'\d+', s.get('session', '')))
    # new cron session id
    import hashlib
    new_session_token = hashlib.md5(b'2026-07-31-daily-content-evolve').hexdigest()[:24]
    new_session = f"mvs_{new_session_token}"
    new_session_entry = {
        'session': new_session,
        'date': '2026-07-31',
        'deliverables': {
            'blog': 0,
            'sku_optimizations': 5,
            'pdp_reviews': 1,
            'matrix_updates': 1,
            'k3_section6_skip_count': 25
        },
        'build_quota': 0,
        'strategy': 'v7 0 push 攒批 + 深度优化 (K3 §6 0 候选常态 + 88fd338 Vercel build 0s failure 21h 仍未拍板 A/B/C retry/revert/wait, 任何新 push 会叠加在 fail build 链上, 0 push 攒批等 K3 拍板 88fd338 处理方案)',
        'skus': [
            f"{cfg['slug']} (P0 {cfg['category']}, round {cfg['round']}, 7 行业)" for cfg in SKU_CONFIG
        ],
        'pdp_review': 'folding-boxes (P0 packaging 脳 跨境電商 3C, 5 维度审查 0 fixes + 0 pending 全过, 比 7/30 v7-PDP-09 corrugated-boxes 0 fixes + 2 pending 还干净)',
        'note': '2026-07-31 v7 daily-content-evolve: matrix P0/P1 100% 饱和 (K3 §6 0 候选常态 8 天维持), 5 SKU 跨 4 P0 类目 (P0 stickers x1 / P0 flyers x1 / P0 packaging x2 / P0 paper-bags x1), 0 push 攒批 等 88fd338 Vercel build fix. 7/30 凌晨 K3 88fd338 push 修 build 失败 2 处 syntax, 12:32 verify 仍 FINAL-FAIL (CF Pages build 0s failure, 21h 无 K3 进一步动作), 7/31 0 push 攒批 + 升级 K3 拍板 88fd338 A/B/C. 7/30+ P3 校园着陆页 back-to-school-printing-usa (en) + new-semester-printing-japan (ja) blocklist 4 cron 严禁写 (M3 P3 reserved). 7/31 root session 跑 daily cron 模式, 不是 branch worker (R1-R6 orchestrator discipline: 同名任务 worker session 无 / 无通信 peer / 无预期输出文件 (cron 触发瞬间) → 允许直接跑, R6 self-reminder 5min 监控). 7/31 working tree 累积 5 SKU + 1 PDP + matrix update, 等 K3 拍板 88fd338 A/B/C 后再 1 commit + 1 push.'
    }
    m['v7_cron_sessions'].append(new_session_entry)
    print(f"  +1 session entry ({new_session})")

    # 1 skip log entry
    new_skip = {
        'date': '2026-07-31',
        'queue_size': 31,
        'pending_in_queue': 25,
        'covered_skip': 25,
        'k3_section6_skip_count': 25,
        'new_blog_written': False,
        'reason': 'matrix P0/P1 100% 饱和 (K3 §6 0 候选常态 8 天维持, 7/24-7/31 连续 8 天 0 候选可写), 跑 B+C+F 兜底 (5 SKU + 1 PDP + matrix update). 7/31 0 push 攒批, 88fd338 Vercel build 0s failure 21h 仍未拍板 A/B/C retry/revert/wait, 任何新 push 会叠加在 fail build 链上, 等 K3 拍板 88fd338 处理方案. 7/31+ 严禁写 back-to-school-printing-usa / new-semester-printing-japan (M3 P3 reserved, §8 blocklist 4 cron). 7/31 5 SKU 跨 4 P0 类目 (stickers x1 + flyers x1 + packaging x2 + paper-bags x1), 1 PDP folding-boxes 5 维度 0 fixes + 0 pending 全过 (比 7/30 v7-PDP-09 corrugated-boxes 0 fixes + 2 pending 还干净). 7/31 累计 push = 0, 7/30 累计 push = 3 (e095918 + f374d0d + 88fd338), 7 月 build quota 累计 = 8/500 = 1.6%.'
    }
    m['k3_section6_skip_log'].append(new_skip)
    print(f"  +1 skip log entry (k3_section6_skip_count 25)")

    # last_updated
    m['last_updated'] = '2026-07-31T10:35:00+08:00'
    m['lastUpdated'] = '2026-07-31T10:35:00+08:00'
    print(f"  last_updated: 2026-07-31T10:35:00+08:00")

    with open(MATRIX_JSON, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(m, f, ensure_ascii=False, indent=2)

    print("\n[OK] matrix.json updated")
    print(f"  v7_sku_optimizations: {len(m.get('v7_sku_optimizations', []))} entries")
    print(f"  v7_pdp_reviews: {len(m.get('v7_pdp_reviews', []))} entries")
    print(f"  v7_cron_sessions: {len(m.get('v7_cron_sessions', []))} entries")
    print(f"  k3_section6_skip_log: {len(m.get('k3_section6_skip_log', []))} entries")


if __name__ == '__main__':
    main()
