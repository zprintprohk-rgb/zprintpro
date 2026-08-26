#!/usr/bin/env python3
"""
T4 matrix sync - 8/6 0:39 K3 拍板
1. Add Q-NEW-05 entry for calendar-printing-guide (status=completed, written 8/5 15:30 in 56f254c)
2. Add ctr_targets_2026_08_06_t1 entry with 4 keywords + imps + positions
"""
import json
import os
from datetime import datetime

MATRIX = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

def main():
    with open(MATRIX, "r", encoding="utf-8") as f:
        m = json.load(f)

    # === 1. Q-NEW-05 calendar-printing-guide ===
    qnew05 = {
        "id": "Q-NEW-05",
        "category": "calendars",
        "sku": "desk-calendars",
        "industry": "教育培訓 + 企業宣傳",
        "tier": "A",
        "priority": "P1",
        "slug": "calendar-printing-guide",
        "title_zh": "月曆印刷完整指南 · 2027 桌曆 / 掛曆 / 寫真月曆材質工藝對比 | 智印港 ZprintPro",
        "title_en": "2027 Calendar Printing Guide · Desk / Wall / Photo Calendar Materials & Process Comparison | ZprintPro",
        "title_ja": "2027年カレンダー印刷完全ガイド · 卓上・壁掛け・写真カレンダーの素材・加工比較 | ZprintPro",
        "note": "2026-08-05 15:30 v8 拍板 calendar H1 已含 '月曆/Calendar/カレンダー' (8/5 0:39 K3 0:39 早会识别 ctr_target 31 imps 23.61, 不动结构)",
        "priority_boost": 2,
        "queued_at": "2026-08-05",
        "status": "completed",
        "completed_at": "2026-08-05",
        "completed_slug": "calendar-printing-guide",
        "v8_standard": True,
        "anti_ai_slop_8_items": True,
        "9_section_structure": True,
        "no_images": True,
        "faq_count": 4,
        "internal_links_count": 12,
        "locale_chars": {
            "zh-hk": 4200,
            "en": 6100,
            "ja": 4500
        },
        "ctr_target": "月曆印刷",
        "ctr_7d_imps": 31,
        "ctr_7d_pos": 23.61,
        "ctr_target_4w_pos": 10,
        "ctr_baseline_at": "2026-08-05"
    }
    m["queue"].append(qnew05)

    # === 2. ctr_targets_2026_08_06_t1 entry (新增顶层 ctr_targets 段) ===
    if "ctr_targets" not in m:
        m["ctr_targets"] = []

    ctr_targets_entry = {
        "snapshot_id": "ctr_targets_2026_08_06_t1",
        "snapshot_at": "2026-08-06T00:39:51+08:00",
        "snapshot_source": "GSC 7d 2026-07-29 to 2026-08-05 (zprintpro 8/5 GSC cron report)",
        "trigger": "K3 8/6 0:39 早会 — CTR 0.23% 真实问题, 4 排名 15-24 词狙击",
        "by_orchestrator": True,
        "commit_id": "664f9e3",
        "commit_msg": "fix(seo): K3 8/6 0:39 T1 4 CTR 狙击 (即 +1 push)",
        "targets": [
            {
                "id": "CTR-T1-01",
                "keyword": "即日印刷",
                "market": "zh-hk / ja / en",
                "page": "same-day-flyers-printing-hong-kong-guide (blog)",
                "pages_count": 3,
                "7d_imps": 28,
                "7d_pos": 15.25,
                "change": "title/description 3 locale 前置 '即日印刷/same day printing/即日印刷'",
                "files": [
                    "src/data/blog-data/zh-hk.json (title + description)",
                    "src/data/blog-data/en.json (title + description)",
                    "src/data/blog-data/ja.json (title + description)"
                ],
                "target_4w_pos": 10,
                "target_4w_ctr": 0.05,
                "review_date": "2026-09-02"
            },
            {
                "id": "CTR-T1-02",
                "keyword": "餐牌印刷",
                "market": "zh-hk",
                "page": "pvc-menus PDP zh-hk",
                "pages_count": 1,
                "7d_imps": 14,
                "7d_pos": 17.93,
                "change": "title_zh 加 '餐牌印刷' 关键词 + 智印雲→智印港 (sku-seo-data.ts 优先 + products.ts 兜底)",
                "files": [
                    "src/data/sku-seo-data.ts (pvc-menus zh-hk title + description + h1)",
                    "src/data/products.ts (pvc-menus title_zh 兜底)"
                ],
                "target_4w_pos": 10,
                "target_4w_ctr": 0.05,
                "review_date": "2026-09-02"
            },
            {
                "id": "CTR-T1-03",
                "keyword": "月曆印刷",
                "market": "zh-hk / en / ja",
                "page": "calendar-printing-guide (blog)",
                "pages_count": 3,
                "7d_imps": 31,
                "7d_pos": 23.61,
                "change": "不动结构 (8/5 15:30 56f254c 已 v8 升级, 3 locale H1 已含 '月曆/Calendar/カレンダー')",
                "files": [],
                "target_4w_pos": 10,
                "target_4w_ctr": 0.05,
                "review_date": "2026-09-02"
            },
            {
                "id": "CTR-T1-04",
                "keyword": "両面カラー印刷",
                "market": "ja",
                "page": "double-sided-flyers PDP ja",
                "pages_count": 1,
                "7d_imps": 27,
                "7d_pos": 22.19,
                "change": "sku-seo-data.ts ja title/h1/keywords 前置 '両面カラー印刷' + 加 keywords",
                "files": [
                    "src/data/sku-seo-data.ts (double-sided-flyers ja title + h1 + keywords)"
                ],
                "target_4w_pos": 10,
                "target_4w_ctr": 0.05,
                "review_date": "2026-09-02"
            }
        ],
        "next_action": "8/12 复盘按此 ctr_targets 4 词出对比报告 (排名/CTR/imps 变化), 同步 8/6-8/12 v8 rollout 进度"
    }
    m["ctr_targets"].append(ctr_targets_entry)

    # 写回
    with open(MATRIX, "w", encoding="utf-8") as f:
        json.dump(m, f, ensure_ascii=False, indent=2)

    print(f"[OK] Q-NEW-05 added to queue (status=completed)")
    print(f"[OK] ctr_targets_2026_08_06_t1 added to ctr_targets (4 keywords)")
    print(f"[OK] Matrix written to {MATRIX}")
    print(f"     queue now has {len(m['queue'])} entries")
    print(f"     ctr_targets now has {len(m['ctr_targets'])} entries")

if __name__ == "__main__":
    main()
