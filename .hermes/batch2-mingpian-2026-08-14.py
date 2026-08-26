#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/14 batch 2 §11 名片清扫 — context-aware 替换 3 file 59 hits
范围 (保守, §0.6):
  1. src/data/blog-data/zh-hk.json (20 hits)
  2. src/data/blog-data/ja.json (12 hits)
  3. src/data/category-seo-content.ts (21 hits)
  4. src/app/[locale]/case-studies/page.tsx (6 hits)
跳过 (高风险, 推 8/15 K3 拍板):
  - src/data/sku-seo-data.ts (28 hits, 9 个名片 SKU 仍在线售卖, 跟产品描述深度耦合)
"""
import os
import re
import sys

ROOT = r"F:\zprintpro-nextjs"

# 替换规则 (per 4-week-plan §二 + AGENTS.md §11):
# zh-hk: 名片 → 卡片 (1:1 直接), 咭片 → 卡片
# ja: 名刺 → カード (1:1 直接)
# 复杂句式 (MOQ 句式「名片/信封 100 張起」) → 改用贺卡场景替代

# 规则顺序: 优先匹配长的, 再匹配短的
# 1. MOQ 句式 (最严重, 跨 SKU 复用, 4-week-plan §二建议)
# 2. 标准名片 → 标准卡片 (b77cddf 已用, 复用)
# 3. 名片印刷 → 卡片印刷
# 4. 名片设计 → 卡片设计
# 5. 咭片 → 卡片 (zh-hk 别名)
# 6. 名刺 → カード (ja 别名)
# 7. 单纯 名片 → 卡片 (兜底, 1:1)

REPLACEMENTS_ZH = [
    # 复杂句式优先
    (r"名片/名片印刷 100 張起", "卡片印刷 100 張起"),
    (r"名片/名片印刷", "卡片"),
    (r"名片/信封", "信封"),
    (r"名片/禮品盒", "禮品盒"),
    (r"名片/海報", "海報"),
    # 表格 L117/L128 (b77cddf 已用格式)
    (r"標準商務名片", "標準商務卡片"),
    (r"彩色照片名片", "彩色照片卡片"),
    (r"啞面名片", "啞面卡片"),
    (r"厚身名片", "厚身卡片"),
    (r"圓角名片", "圓角卡片"),
    (r"雙面名片", "雙面卡片"),
    (r"環保再生名片", "環保再生卡片"),
    (r"即時名片", "即時卡片"),
    (r"燙金名片", "燙金卡片"),
    (r"局部 UV 名片", "局部 UV 卡片"),
    (r"即日名片", "即日卡片"),
    (r"名片/燙金名片 100 張起", "卡片/燙金卡片 100 張起"),
    (r"名片/即時印刷 100 張起", "卡片/即時印刷 100 張起"),
    (r"名片/UV business card 100 張起", "卡片/UV business card 100 張起"),
    (r"名片/環保名片 100 張起", "卡片/環保卡片 100 張起"),
    # 1:1
    (r"名片設計的10個黃金法則", "卡片設計的10個黃金法則"),
    (r"名片最少可以印幾多張", "卡片最少可以印幾多張"),
    (r"咭片印刷", "卡片印刷"),
    (r"咭片", "卡片"),  # 兜底
    (r"名片印刷", "卡片印刷"),
    (r"名片的1\.3倍", "卡片的1.3倍"),
    (r"高級商務名片", "高級商務卡片"),
    (r"咭片服務", "卡片服務"),
    (r"咭片(400g)", "卡片(400g)"),
    (r"UV 局部光油咭片", "UV 局部光油卡片"),
    (r"雙面咭片", "雙面卡片"),
    (r"咭片設計", "卡片設計"),
    (r"即時咭片", "即時卡片"),
    (r"即時咭片印刷", "即時卡片印刷"),
    (r"燙金咭片", "燙金卡片"),
    (r"圓角咭片", "圓角卡片"),
    (r"名片服務", "卡片服務"),
    (r"咭片 \+ 信用卡", "卡片 + 信用卡"),
    (r"咭片封套", "卡片封套"),
    (r"這款名片", "這款卡片"),
    (r"名片行業", "卡片行業"),
    (r"名片盒", "卡片盒"),
    (r"名片知識", "卡片知識"),
    (r"名片印刷需要多長時間", "卡片印刷需要多長時間"),
    (r"名片夾", "卡片夾"),
    (r"名片色系", "卡片色系"),
    (r"咭片印刷廠", "卡片印刷廠"),
    (r"名信片信封", "卡片信封"),
    (r"1 個咭片", "1 個卡片"),
    (r"咭片廣告", "卡片廣告"),
    (r"咭片批發", "卡片批發"),
    (r"送名片", "送卡片"),
    (r"名片行業", "卡片行業"),
    (r"咭片訂購", "卡片訂購"),
    (r"咭片製作", "卡片製作"),
    (r"名片掛號", "卡片掛號"),
    (r"名片掛號", "卡片掛號"),
    (r"咭片雷射", "卡片雷射"),
    (r"名片尺吋", "卡片尺吋"),
    (r"名片規格", "卡片規格"),
    (r"咭片購買", "卡片購買"),
    (r"咭片低價", "卡片低價"),
    (r"咭片設計公司", "卡片設計公司"),
    (r"名片咭片", "卡片"),
    (r"名片圖案", "卡片圖案"),
    (r"名片製作", "卡片製作"),
    (r"咭片印刷服務", "卡片印刷服務"),
    (r"商務名片", "商務卡片"),
    (r"設計名片", "設計卡片"),
    (r"印名片", "印卡片"),
    (r"印咭片", "印卡片"),
    (r"優質名片", "優質卡片"),
    (r"名片的形狀", "卡片的形狀"),
    (r"咭片, ", "卡片, "),
    (r"咭片；", "卡片；"),
    (r"咭片,", "卡片,"),
    (r"咭片\\.", "卡片."),
    (r"咭片／", "卡片／"),
    (r"名片\\.", "卡片."),
    (r"咭片$", "卡片"),
    # 兜底 (最后)
    (r"咭片", "卡片"),
    (r"名片", "卡片"),
]

REPLACEMENTS_JA = [
    # 复杂句式优先
    (r"名刺・封筒", "封筒"),
    (r"名刺/封筒", "封筒"),
    (r"名刺印刷", "カード印刷"),
    (r"プレミアム名刺", "プレミアムカード"),
    (r"厚紙名刺", "厚紙カード"),
    (r"箔押し名刺", "箔押しカード"),
    (r"スポットUV名刺", "スポットUVカード"),
    (r"マット名刺", "マットカード"),
    (r"角丸名刺", "角丸カード"),
    (r"両面名刺", "両面カード"),
    (r"即日名刺", "即日カード"),
    (r"再生紙名刺", "再生紙カード"),
    (r"名刺デザイン", "カードデザイン"),
    (r"名刺から", "カードから"),
    (r"名刺業界", "カード業界"),
    (r"名刺知識", "カード知識"),
    (r"名刺の知識", "カードの知識"),
    (r"名刺の1\.3倍", "カードの1.3倍"),
    (r"名刺サービス", "カードサービス"),
    (r"名刺・ステッカー", "ステッカー"),
    (r"名刺・包装", "包装"),
    (r"名刺・パッケージ", "パッケージ"),
    (r"名刺・印刷", "印刷"),
    (r"名刺 印刷", "カード 印刷"),
    (r"名刺/", "カード/"),
    # 兜底
    (r"名刺", "カード"),
]

def transform(content: str, rules) -> tuple:
    """Apply rules, return (new_content, total_subs)."""
    total = 0
    new = content
    for pat, repl in rules:
        new2, n = re.subn(pat, repl, new)
        if n > 0:
            total += n
            new = new2
    return new, total


def process_file(rel: str, rules, out_summary: list):
    fp = os.path.join(ROOT, rel)
    if not os.path.exists(fp):
        return None
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    before_mp = content.count("名片") + content.count("名刺") + content.count("咭片")
    new, subs = transform(content, rules)
    after_mp = new.count("名片") + new.count("名刺") + new.count("咭片")
    if subs == 0:
        out_summary.append((rel, 0, before_mp, after_mp))
        return None
    # Write back with UTF-8 (BOM-free)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(new)
    out_summary.append((rel, subs, before_mp, after_mp))
    return subs


def main():
    targets_zh = [
        (r"src\data\blog-data\zh-hk.json", REPLACEMENTS_ZH),
        (r"src\data\category-seo-content.ts", REPLACEMENTS_ZH),
        (r"src\app\[locale]\case-studies\page.tsx", REPLACEMENTS_ZH),
    ]
    targets_ja = [
        (r"src\data\blog-data\ja.json", REPLACEMENTS_JA),
    ]
    summary = []
    grand_subs = 0
    for rel, rules in targets_zh + targets_ja:
        r = process_file(rel, rules, summary)
        if r:
            grand_subs += r
    out_path = r"F:\zprintpro-nextjs\.hermes\batch2-mingpian-2026-08-14-log.txt"
    with open(out_path, "w", encoding="utf-8") as out:
        out.write("=== batch 2 §11 名片清扫执行日志 8/14 ===\n")
        for rel, subs, before, after in summary:
            out.write(f"{rel}: {subs} substitutions, 名片/名刺/咭片 {before} -> {after}\n")
        out.write(f"\nGRAND: {grand_subs} substitutions total\n")
    print(f"DONE: {out_path}, {grand_subs} subs")


if __name__ == "__main__":
    main()
