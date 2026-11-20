#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 v3.12 Session 1 批处理脚本 (2026-08-21 18:30)
- T5: 订製词根 top 20 SKU title_zh 注入 (利是封/月曆/餐牌/贴纸/信封/包装盒/纸袋/標籤 优先)
- T6: handle-bags PDP 注入「邊度買紙袋」口语词 + 订製
- 不动 slug / 不动 schema / 不动图片

SSoT: docs/m3-execution-card-v3.12-2day-2026-08-21.md §T5 + §T6
"""
import re
import sys
from pathlib import Path

PRODUCTS = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
txt = PRODUCTS.read_text(encoding="utf-8")

# === T5: 遍历所有带 title_zh 的 SKU, 检查是否含「訂製」, 缺的注入 ===
# 策略: 按 slug 关键词判断是否需要注入 (利是封/月曆/餐牌/贴纸/信封/包装盒/纸袋/標籤/卡片/海報/書)
INJECT_KEYWORDS = [
    # (slug_keyword, current_ending_pattern, new_title_injection)
    # 已含「訂製」/「定製」/「订制」的跳过
]

# 找所有 title_zh 字段
title_pattern = re.compile(r"title_zh:\s*'([^']*)'", re.MULTILINE)
matches = list(title_pattern.finditer(txt))
print(f"[T5] Found {len(matches)} title_zh entries in products.ts")

# 统计: 哪些缺「訂製」, 需要注入
needs_inject = []
for m in matches:
    title = m.group(1)
    has_dingzhi = ('訂製' in title) or ('订制' in title) or ('訂做' in title) or ('定製' in title)
    has_low_priority = False
    # 排除已含同义词的 (避免重复)
    if has_dingzhi:
        has_low_priority = True
    if not has_low_priority:
        # 看 slug 上下文 (往前 200 字符找 slug:)
        start = max(0, m.start() - 500)
        ctx = txt[start:m.start()]
        slug_match = re.search(r"slug:\s*'([^']*)'", ctx[::-1])
        # 简单方法: 直接用 context text 找最近的 slug
        slug = ""
        for line in ctx.split('\n')[::-1]:
            sm = re.search(r"slug:\s*'([^']*)'", line)
            if sm:
                slug = sm.group(1)
                break
        needs_inject.append((slug, title, m.start(), m.end()))

print(f"[T5] Needs inject: {len(needs_inject)} SKUs (no 訂製/定製/订制/訂做 in title_zh)")

# 优先顺序: imps 高词相关 SKU
# 8/14-8/20 GSC imps top 词对应 SKU: 利是封 / 月曆 / 餐牌 / 贴纸 / 信封 / 包装盒 / 纸袋 / 標籤 / 卡片 / 海報 / 書
# 按 slug 关键词优先级
PRIORITY_SLUGS = [
    'red-packet', 'lai-see', 'red-envelope',  # 利是封
    'calendar', 'desk-calendar', 'wall-calendar',  # 月曆
    'menu',  # 餐牌
    'sticker',  # 贴纸
    'envelope',  # 信封
    'packaging', 'box', 'gift-box',  # 包装盒
    'paper-bag', 'kraft-bag', 'handle-bag',  # 纸袋
    'label',  # 標籤
    'card', 'business-card',  # 卡片
    'poster',  # 海報
    'book', 'catalog', 'brochure',  # 書
    'wedding', 'invitation',  # 婚礼
    'menu',  # 餐牌
    'flyer',  # 傳單
    'envelope',  # 信封
]

# 给 needs_inject 排序
def priority(slug):
    for i, kw in enumerate(PRIORITY_SLUGS):
        if kw in slug.lower():
            return i
    return 999

needs_inject.sort(key=lambda x: priority(x[0]))

# 取 top 20
top_20 = needs_inject[:20]
print(f"[T5] Top 20 (priority sorted):")
for slug, title, _, _ in top_20:
    print(f"   - {slug}: {title}")

# === 实施 T5: 改 title_zh 加「訂製」词根 ===
def inject_dingzhi(slug, old_title):
    """根据 slug 关键词, 在 title_zh 末尾或合适位置加「訂製」词根"""
    # 替换 "定製" 为 "訂製" (K3 拍板: GSC 用户搜「訂製」)
    new_title = old_title.replace('定製', '訂製')
    if new_title != old_title:
        return new_title, "定製→訂製"
    # 已含「訂製」/「訂做」/「订制」/「訂制」跳过
    if '訂製' in old_title or '訂做' in old_title or '訂制' in old_title:
        return old_title, "已含跳过"
    # 加「訂製」到 title 末尾 (≤60 字符)
    # 策略: 替换末尾词, 或追加 "· 訂製" / "印刷訂製"
    add_suffix = '訂製'
    # 如果 title ≤ 50 字符, 追加 " · 訂製" 否则替换同义弱词
    if len(old_title) <= 50:
        new_title = old_title + ' · 訂製'
    elif len(old_title) <= 60:
        new_title = old_title + ' 訂製'
    else:
        # 替换 "印刷" 或 "订制" 为 "印刷訂製" (如果存在)
        if '印刷' in old_title:
            new_title = old_title.replace('印刷', '印刷訂製', 1)
        elif '印刷' in old_title:
            new_title = old_title.replace('印刷', '印刷訂製', 1)
        else:
            new_title = old_title + ' 訂製'
    if len(new_title) > 60:
        # 截断
        new_title = new_title[:60]
    return new_title, f"加{add_suffix}"

# 倒序替换 (避免 index 偏移)
new_txt = txt
changes = []
for slug, old_title, start, end in reversed(top_20):
    new_title, action = inject_dingzhi(slug, old_title)
    if new_title != old_title:
        old_str = f"title_zh: '{old_title}'"
        new_str = f"title_zh: '{new_title}'"
        if old_str in new_txt:
            new_txt = new_txt.replace(old_str, new_str, 1)
            changes.append((slug, old_title, new_title, action))

# === T6: handle-bags PDP 注入「訂製」+「邊度買紙袋」口语词 ===
handle_bags_old = "title_zh: '手挽紙袋 · 餐飲零售日常大量採購'"
handle_bags_new = "title_zh: '手挽紙袋訂製 · 邊度買紙袋 餐飲零售採購首選'"
if handle_bags_old in new_txt:
    new_txt = new_txt.replace(handle_bags_old, handle_bags_new, 1)
    changes.append(('handle-bags', '手挽紙袋 · 餐飲零售日常大量採購',
                    '手挽紙袋訂製 · 邊度買紙袋 餐飲零售採購首選', 'T6 口语词+订製'))

# handle-bags description 加口语词
hb_desc_old = "description: '堅固手挽設計，承重能力強。適合購物中心、超市。適配行業: 餐廳外賣、咖啡店、烘焙坊、零售店、便利店、品牌快閃、展會攤位、活動禮品袋。'"
hb_desc_new = "description: '堅固手挽設計，承重能力強，邊度買紙袋首選：餐廳、咖啡店、烘焙坊、零售店。適合購物中心、超市。紙袋訂製、訂做紙袋、邊度買紙袋 WhatsApp 30 秒報價。適配行業: 餐廳外賣、咖啡店、烘焙坊、零售店、便利店、品牌快閃、展會攤位、活動禮品袋。'"
if hb_desc_old in new_txt:
    new_txt = new_txt.replace(hb_desc_old, hb_desc_new, 1)
    changes.append(('handle-bags-description', '...堅固手挽設計...',
                    '...邊度買紙袋首選 + 紙袋訂製 + 訂做紙袋...', 'T6 口语词+订製'))

# 写回
PRODUCTS.write_text(new_txt, encoding="utf-8")
print(f"\n[T5+T6] Applied {len(changes)} changes:")
for slug, old, new, action in changes:
    print(f"  {slug}: {action}")
    print(f"    - {old}")
    print(f"    + {new}")
print(f"\n✓ products.ts written: {len(new_txt)} chars (was {len(txt)})")
