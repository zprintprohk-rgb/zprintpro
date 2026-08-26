#!/usr/bin/env python3
"""
2026-07-23 v7 daily-content-evolve: 5 SKU description 适配行业强化
为每个 SKU 的 description 末尾追加 / 强化 "适配行业" 列表
"""
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / "src/data/products.ts"

content = F.read_text(encoding='utf-8')

# 5 SKU 适配行业补强 (每条追加到 description 末尾)
# 策略: 找到 slug 行 → 找该对象的 description 字段 → 末尾追加适配行业
enhancements = {
    "kraft-paper-bags": {
        "zh_追加": " 2026 旺季: ESG 環保品牌、有機食品品牌、文創市集限定、減塑徵費合規。",
        "en_追加": " 2026 Peak Season: ESG eco brands, organic food brands, creative market limited editions, plastic ban compliance.",
        "ja_追加": " 2026 繁忙季節: ESG エコブランド、オーガニック食品ブランド、クリエイティブ マーケット限定、プラスチック禁止コンプライアンス。"
    },
    "mailer-boxes": {
        "zh_追加": " 2026 旺季重點: D2C 美妝配送、茶飲/手搖外送、訂閱盒盲盒、Kickstarter 集資送貨。",
        "en_追加": " 2026 Peak Focus: D2C beauty delivery, tea/bubble tea delivery, subscription mystery box, Kickstarter fulfillment shipping.",
        "ja_追加": " 2026 繁忙季節重点: D2C 美容配送、茶・タピオカ テイクアウト、サブスクリプション mystery box、Kickstarter フルフィルメント配送。"
    },
    "white-card-boxes": {
        "zh_追加": " 2026 升級方案: 拼版彩盒試水反應好 → 升級白卡彩盒 50-10,000 件,單件 +HK$1-2。",
        "en_追加": " 2026 Upgrade Path: gang-run boxes trial success → upgrade to white card 50-10,000 pieces, +USD 0.13-0.27/box premium.",
        "ja_追加": " 2026 アップグレード パス: 合版ボックス試作成功 → 白カード 50-10,000 個にアップグレード、単価 +¥15-30/個 プレミアム。"
    },
    "food-boxes": {
        "zh_追加": " 2026 旺季: 春節年糕禮盒、端午粽、夏日冰品配送、中秋月餅聖誕禮籃。",
        "en_追加": " 2026 Peak Season: Lunar New Year rice cake, Dragon Boat zongzi, summer ice cream delivery, Mid-Autumn mooncake, Christmas gift basket.",
        "ja_追加": " 2026 繁忙季節: 春節餅菓子、端午粽、夏アイスクリーム配送、中秋月餅、クリスマス ギフトバスケット。"
    },
    "folding-boxes": {
        "zh_追加": " 2026 旺季: 環保品牌限定、ESG 碳審計合規、月餅糕點禮盒、聖誕節日禮盒。",
        "en_追加": " 2026 Peak Season: eco-brand limited editions, ESG carbon audit compliance, mooncake/pastry gift boxes, Christmas holiday gift sets.",
        "ja_追加": " 2026 繁忙季節: エコブランド限定版、ESG 炭素監査コンプライアンス、月餅・菓子ギフトボックス、クリスマス祝日ギフトセット。"
    },
}

# 找每个 SKU 对象,修改其 description 字段
for slug, adds in enhancements.items():
    # 找 slug 行
    pattern = rf"slug:\s*'{re.escape(slug)}',"
    m = re.search(pattern, content)
    if not m:
        print(f"  ❌ SKU not found: {slug}")
        continue
    # 从 slug 行往前找最近的 '{' 开头 (对象开始)
    obj_start = content.rfind('{', 0, m.start())
    if obj_start < 0:
        print(f"  ❌ Object start not found for {slug}")
        continue
    # 找 description 字段 - 在 slug 之前的行
    # 向前找 `description: '...', descriptionEn: '...', descriptionJa: '...', description_zh: '...'`
    # 简单做法: 在 obj_start 到 m.start() 之间找 `description:`
    desc_match = re.search(r"description:\s*'([^']*)'", content[obj_start:m.start()])
    if not desc_match:
        print(f"  ❌ description field not found for {slug}")
        continue
    old_desc = desc_match.group(1)
    new_desc_zh = old_desc + adds['zh_追加']
    # 替换
    old_pattern = f"description: '{old_desc}'"
    new_pattern_zh = f"description: '{new_desc_zh}'"
    content = content.replace(old_pattern, new_pattern_zh, 1)
    print(f"  ✓ {slug}: zh description enhanced ({len(old_desc)}→{len(new_desc_zh)} chars)")

# 写回
F.write_text(content, encoding='utf-8')
print(f"\n  📊 5 SKU description 强化完成")
