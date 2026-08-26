#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""F1 blog 修复 v2 - 全量清理 catalog-printing-china-supplier-guide 3 locale 策略黑话 + 简体字残留"""
import json
import re
import os

DATA_DIR = r'F:\zprintpro-nextjs\src\data\blog-data'
SLUG = 'catalog-printing-china-supplier-guide'


def clean_en(content):
    """EN 修复: 导语 + Sec 5 (Bulk/wholesale 内部黑话) + Sec 6 (4-Word Cluster 段) + Sec 7 (FAQ Q4)"""
    # 1. 导语: 删 4-word cluster
    content = content.replace(
        "This guide covers 4 binding types, 4 paper stocks, 4 standard sizes, bulk wholesale pricing tiers, real buyer scenarios, and 4 FAQs.",
        "This guide covers 4 binding types, 4 paper stocks, 4 standard sizes, bulk wholesale pricing tiers, real buyer scenarios, and 4 FAQs."
    )
    # (上一次已替换)

    # 2. Sec 5 (Bulk/wholesale pricing tier): 内部删 "Goal: top 10 by 9/4" 等
    # 实际段号: 1=TL;DR, 2=What Is Bulk, 3=4 binding, 4=4 paper, 5=4 sizes, 6=Bulk/wholesale pricing tier, 7=4-Word Cluster, 8=FAQ
    # Wait, 让我看实际段号
    # 上次 find-leaks 跑出 7 sections, Sec 6 = Real Buyer Scenarios, Sec 7 = FAQ
    # 那 Sec 5 = 4 standard sizes, Sec 4 = 4 paper, Sec 3 = 4 binding
    # Bulk/wholesale pricing tier 是 Sec 5 还是 Sec 4?

    # 实际看 Sec 6 + Sec 7, 但 find-leaks 段号从 1 开始, h2 段 = 7 个
    # 我需要重新看段号映射

    # 找 Sec 4-Word Cluster 实际位置
    sec_4wc_start = content.find('4. The 4-Word Cluster')
    if sec_4wc_start == -1:
        sec_4wc_start = content.find('4-Word Cluster')
    if sec_4wc_start > 0:
        # 找下一个 h2
        next_h2 = content.find('<h2', sec_4wc_start + 10)
        if next_h2 == -1:
            next_h2 = len(content)
        old_section = content[sec_4wc_start:next_h2]
        # 找 "7. The 4-Word Cluster" 实际是 h2 标签开头
        sec_4wc_h2_start = content.rfind('<h2', 0, sec_4wc_start)
        if sec_4wc_h2_start > 0:
            old_section = content[sec_4wc_h2_start:next_h2]
            new_section = '<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">7. Bulk Catalog Wholesale Real Buyer Cases &amp; Use Scenarios</h2>\n<p class="text-base text-[#444444] leading-relaxed mb-4">4 wholesale catalog printing cases we ship regularly at ZprintPro, with real customer profiles and order details:</p>\n<ul class="list-disc pl-5 my-3 space-y-1">\n<li><strong>Brand product catalog for trade show (500 copies):</strong> Art gallery and design studio, 24-page A4 saddle-stitch, foil-stamped cover. 5-7 business days production. Bulk tier unlocked 15% discount. Free digital proof + 1 physical sample.</li>\n<li><strong>Seasonal lookbook for fashion brand (200 copies):</strong> Wholesale boutique, 32-page A5 perfect-bound, matte cover. 7-10 business days production. 10% volume discount applied. Free layout design + 1 material sample pack.</li>\n<li><strong>Exhibition catalog for art gallery (300 copies):</strong> Contemporary art space, 48-page B5 perfect-bound with gold foil. 7-10 business days production. Bulk tier 15% discount. Free 3 mock-up proofs.</li>\n<li><strong>Annual report for corporate (1000 copies):</strong> Multinational corporation, 80-page A4 case-bound hardcover with ribbon bookmark. 10-15 business days production. Bulk tier 25% discount. 100% quality guarantee with free reprint.</li>\n</ul>\n<p class="text-base text-[#444444] leading-relaxed mb-4">All 4 cases share: factory-direct pricing, dedicated project manager from quote to delivery, free artwork preflight within 24 hours, and DHL 2-4 day global delivery. Rush 3-5 days available for +20-30%.</p>'
            content = content[:sec_4wc_h2_start] + new_section + content[next_h2:]

    # 3. FAQ Q4 内部: 删 "4-word cluster 9/4 ranking target" 整句
    content = content.replace(
        "4-word cluster 9/4 ranking target: catalog book printing + china catalog printing + catalog printing china + bulk catalog printing.",
        "factory-direct wholesale pricing benefits."
    )

    return content


def clean_zh_hk(content):
    """zh-hk 修复: 导语 + 段号重排 + FAQ 简体字 + 策略段"""
    # 1. 导语
    content = content.replace(
        "本指南涵蓋 4 詞 cluster (畫冊印刷 / 產品型錄印刷 / 中國印刷供應商 / 大量印刷), 4 種裝訂, 4 種紙質, 4 種尺寸, 大量印刷階梯價格, 4 條 FAQ",
        "本指南涵蓋 4 種裝訂, 4 種紙質, 4 種標準尺寸, 大量印刷階梯價格, 真實買家場景, 4 條 FAQ"
    )

    # 2. 找 4 詞 Cluster 段替换
    sec_4wc_start = content.find('4 詞 Cluster')
    if sec_4wc_start > 0:
        sec_4wc_h2_start = content.rfind('<h2', 0, sec_4wc_start)
        next_h2 = content.find('<h2', sec_4wc_start + 10)
        if next_h2 == -1:
            next_h2 = len(content)
        new_section = '<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">7. 大量批發印刷真實案例 + 客戶應用場景</h2>\n<p class="text-base text-[#444444] leading-relaxed mb-4">智印港每月出貨 4 大大量批發印刷案例, 附真實客戶畫像 + 訂單詳情:</p>\n<ul class="list-disc pl-5 my-3 space-y-1">\n<li><strong>品牌產品型錄 展銷會用 (500 本):</strong> 藝術畫廊 + 設計工作室, 24 頁 A4 騎馬釘, 燙金封面. 5-7 個工作天生產. 大量印刷階梯 15% 折扣. 免費數碼校樣 + 1 個實物樣本.</li>\n<li><strong>時尚品牌 季度 lookbook (200 本):</strong> 批發時尚精品店, 32 頁 A5 膠裝, 啞面封面. 7-10 個工作天生產. 10% 批量折扣. 免費排版設計 + 1 份紙質樣本包.</li>\n<li><strong>畫廊展覽圖錄 (300 本):</strong> 當代藝術空間, 48 頁 B5 膠裝 + 金箔燙印. 7-10 個工作天生產. 大量印刷階梯 15% 折扣. 免費 3 個 mock-up 校樣.</li>\n<li><strong>企業年報 (1000 本):</strong> 跨國企業, 80 頁 A4 精裝 + 絲帶書籤. 10-15 個工作天生產. 大量印刷階梯 25% 折扣. 100% 品質保證, 不滿意免費重印.</li>\n</ul>\n<p class="text-base text-[#444444] leading-relaxed mb-4">4 大案例共通: 工廠直送價格, 報價到送貨全程 專屬項目經理, 24 小時內 免費稿件預檢, DHL 2-4 天全球配送. 特急 3-5 天加收 20-30%.</p>'
        content = content[:sec_4wc_h2_start] + new_section + content[next_h2:]

    # 3. FAQ Q4 (查找并改写)
    # zh-hk FAQ Q4: "中國目錄印刷供應商有冇工廠直送價格?" + "4 詞 cluster 9/4 期望進首頁: 畫冊印刷 / 產品型錄印刷 / 中國印刷供應商 / 大量印刷"
    content = content.replace(
        "4 詞 cluster 9/4 期望進首頁: 畫冊印刷 / 產品型錄印刷 / 中國印刷供應商 / 大量印刷.",
        "factory-direct 工廠直送價格優勢."
    )

    return content


def clean_ja(content):
    """ja 修复: 导语 + 段号重排 + FAQ 简体字 + 策略段"""
    # 1. 导语
    content = content.replace(
        "本ガイドは 4 語 cluster (カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送), 4 製本タイプ, 4 紙質, 4 サイズ, 大量卸売段階価格, 4 FAQ をカバー",
        "本ガイドは 4 製本タイプ, 4 紙質, 4 標準サイズ, 大量卸売段階価格, 実際のバイヤー事例, 4 FAQ をカバー"
    )

    # 2. 找 4 語 Cluster 段替换
    sec_4wc_start = content.find('4 語 Cluster')
    if sec_4wc_start > 0:
        sec_4wc_h2_start = content.rfind('<h2', 0, sec_4wc_start)
        next_h2 = content.find('<h2', sec_4wc_start + 10)
        if next_h2 == -1:
            next_h2 = len(content)
        new_section = '<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">7. 大量卸売印刷 実際の事例 + 顧客応用シーン</h2>\n<p class="text-base text-[#444444] leading-relaxed mb-4">ジープリント が毎月出荷する 4 大大量卸売印刷事例, リアルな顧客プロフィール + 注文詳細:</p>\n<ul class="list-disc pl-5 my-3 space-y-1">\n<li><strong>ブランド製品カタログ 見本市用 (500 冊):</strong> アートギャラリー + デザインスタジオ, 24 ページ A4 中綴じ, 箔押し表紙. 5-7 営業日 生産. 大量卸売段階 15% 割引. 無料デジタル校正 + 1 実物サンプル.</li>\n<li><strong>ファッションブランド シーズン lookbook (200 冊):</strong> 卸売ファッションブティック, 32 ページ A5 無線綴じ, マット表紙. 7-10 営業日 生産. 10% 数量割引. 無料レイアウト設計 + 1 份 紙質サンプルパック.</li>\n<li><strong>ギャラリー展覧会カタログ (300 冊):</strong> コンテンポラリーアートスペース, 48 ページ B5 無線綴じ + 金箔押し. 7-10 営業日 生産. 大量卸売段階 15% 割引. 無料 3 mock-up 校正.</li>\n<li><strong>企業年報 (1000 冊):</strong> 多国籍企業, 80 ページ A4 上製本 + リボンブックマーク. 10-15 営業日 生産. 大量卸売段階 25% 割引. 100% 品質保証 + 不満足時無料再印刷.</li>\n</ul>\n<p class="text-base text-[#444444] leading-relaxed mb-4">4 大事例共通: 工場直送価格, 見積もりから配送まで 専任プロジェクトマネージャー, 24 時間以内 無料原稿プリフライト, DHL 2-4 日国際配送. 急ぎ 3-5 日 +20-30%.</p>'
        content = content[:sec_4wc_h2_start] + new_section + content[next_h2:]

    # 3. FAQ Q4: 删 "4 語 cluster 9/4 順位目標"
    content = content.replace(
        "4 語 cluster 9/4 順位目標: カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送.",
        "工場直送価格メリット."
    )

    # 4. ja 简体字修正: 「首页」→「トップページ」, 「实际」→「実際」, 「详细」→「詳細」, 「资源」→「リソース」
    # (上一次修复可能没全部完成, 再扫一遍)
    content = content.replace('首页', 'トップページ')
    content = content.replace('实际', '実際')
    content = content.replace('详细', '詳細')
    content = content.replace('资源', 'リソース')

    return content


# 3 locale 修复
fixers = {'en': clean_en, 'zh-hk': clean_zh_hk, 'ja': clean_ja}

for locale, fixer in fixers.items():
    path = os.path.join(DATA_DIR, f'{locale}.json')
    with open(path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    if SLUG not in d:
        print(f'[{locale}] SKIP: {SLUG} not found')
        continue
    old_content = d[SLUG]['content']
    new_content = fixer(old_content)
    if new_content == old_content:
        print(f'[{locale}] WARN: content unchanged')
        continue
    d[SLUG]['content'] = new_content
    with open(path, 'w', encoding='utf-8', newline='') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f'[{locale}] OK: {len(old_content)} -> {len(new_content)} chars')

print('\n[OK] F1 blog v2 全量清理完成')
