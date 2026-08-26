#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/8 02:52 拍板: matrix 加 ja_brand 段.
- 日文品牌 ジープリント (J-Print) per K3 8/8 拍板 "按最优执行"
- 30 目录目标 (印刷/POD + 本地/创业)
- branded search 监测 (基线 0 → 8/12 期望 ≥1)
- 智印港公式复制 (NAP 一致性 + 实体消歧)
"""
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE = r"F:\zprintpro-nextjs"
MATRIX = os.path.join(BASE, ".hermes", "industry-keyword-matrix.json")

with open(MATRIX, "r", encoding="utf-8") as f:
    data = json.load(f)

# 1. 顶层加 ja_brand 段 (per K3 8/8 02:52 拍板)
ja_brand = {
    "policy": {
        "primary_brand_ja": "ZprintPro (per §13.13 三 Locale 鐵律, 维持现状)",
        "alternate_brand_ja": "ジープリント (J-Print) - K3 8/8 02:52 拍板 '按最优执行'",
        "rationale": "音译 Z→J (日语无 Z) + Print→プリント = 3 假名简洁, 跟 en ZprintPro 品牌延续, 跟'智印港'3 字公式同源, SEO 'プリント'是日语印刷核心搜索词",
        "nap_consistency": "站名=社媒=目录=schema 4 处统一, 不许漂移 (per K3 §13.10 NAP 脱钩 + 智印港公式)",
        "geo_entity_signal": "Organization JSON-LD 加 sameAs (X, LinkedIn, JP 目录) + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム] = AI 引擎确认实体的机器可读身份证",
        "brand_word_buried": "在价格横评页 + 学园祭指南 + 校园 blog 里自然提及品牌名 2-3 次, 诱导 branded search (per K3 8/8 02:52 第 3 段)",
    },
    "directory_targets_30": {
        "print_pod_related": [
            "プリントオンデマンド 比較サイト",
            "デザイン系ディレクトリ",
            "印刷業者 比較ポータル",
            "名刺印刷 比較サイト",
            "チラシ印刷 比較ナビ",
            "パッケージ印刷 業者一覧",
            "ステッカー印刷 業者リスト",
        ],
        "local_startup": [
            "Startup Base",
            "東京都印刷工業組合 名簿",
            "大阪府印刷工業組合",
            "IT 企業一覧",
            "Startup List Japan",
            "JP ビジネスディレクトリ",
            "関西印刷組合 名簿",
        ],
        "industry_specific": [
            "学园祭印刷 業者 比較",
            "卒業記念アルバム 印刷",
            "同人誌 印刷 比較",
            "ダイレクトメール 業者",
            "展示会 印刷 業者",
        ],
        "saas_aggregator": [
            "ITreview 印刷カテゴリ",
            "BOXIL 印刷カテゴリ",
            "サービス比較 印刷",
        ],
        "total_target": 30,
        "auto_glm_workflow": "8/10 起 AutoGLM 跑每天 10 条填表, K3 9:00 起来点最终提交+验证邮件",
        "first_week_target": "20-30 条合规目录 = 日本实体存在感基线",
    },
    "branded_search_monitoring": {
        "queries": [
            "ZprintPro",
            "ジープリント 印刷",
            "ZprintPro ステッカー",
            "ジープリント チラシ",
            "ZprintPro 評判",
            "ジープリント 料金",
        ],
        "baseline_8_8": 0,
        "target_8_12": "≥1 个 branded search 出现 (zprintpro.com 域名)",
        "monitor_cron": "zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计",
    },
    "schema_org_enhancement": {
        "add_now": "Organization JSON-LD sameAs 数组 (X + LinkedIn + JP 目录) + areaServed=JP + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷]",
        "code_change": "src/lib/seo.ts (working tree 落, 8/9 daily cron amend 合并 1 push)",
        "verify": "8/9 daily cron auto 跑 + curl grep Organization schema 含 sameAs + areaServed=JP + knowsAbout",
    },
    "update_history": [
        "2026-08-08 02:52 K3 拍板: ja 品牌词 ジープリント + 30 目录 + branded search 监测 + 智印港公式复制",
    ],
}

data["ja_brand"] = ja_brand
print(f"✅ ja_brand 段已加 (含 policy + 30 directory + branded search + schema enhancement)")

# 2. 写回
with open(MATRIX, "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ 写回 {MATRIX}")
print(f"   文件大小: {os.path.getsize(MATRIX)} bytes (was 233251)")
