#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""F1 blog 修复 - 改 catalog-printing-china-supplier-guide 3 locale:
- 导语: 删「4-word cluster」策略黑话
- 第 6 节整段替换: 删「9/4 ranking cluster + 4 词 + 目标 top 10」策略段, 替换为「4 個常見訂購場景 + 交期 + 樣品政策」用户价值内容
- ja 简体字修正: 首页→トップページ, 实际→実際, 详细→詳細, 资源→リソース
"""
import json
import os
import re

DATA_DIR = r'F:\zprintpro-nextjs\src\data\blog-data'
SLUG = 'catalog-printing-china-supplier-guide'


def fix_en(content):
    """EN 修复: 导语 + 第 6 节"""
    # 1. 导语: 删 "This guide covers the 4-word cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), the 4 binding types, 4 paper stocks, 4 sizes, bulk tier pricing, and 4 FAQs."
    old_intro = "This guide covers the 4-word cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), the 4 binding types, 4 paper stocks, 4 sizes, bulk tier pricing, and 4 FAQs."
    new_intro = "This guide covers 4 binding types, 4 paper stocks, 4 standard sizes, bulk wholesale pricing tiers, real buyer scenarios, and 4 FAQs."
    content = content.replace(old_intro, new_intro)
    # 2. 第 6 节: 整段删 (h2 + p + ol + p)
    section6_pattern = re.compile(
        r'<h2 class="text-2xl font-bold text-\[#333333\] mt-10 mb-4">6\. The 4-Word Cluster:.*?</p>',
        re.DOTALL
    )
    new_section6 = """<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. Real Buyer Scenarios: Lead Time, Sample Policy &amp; Order Workflow</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 common catalog buyer scenarios we see every month at ZprintPro, with realistic lead times and sample policies:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>Brand product catalog for trade show (500 copies, 24 pages, A4, saddle-stitch):</strong> Standard 5-7 business days production + DHL 2-4 day global = total 7-11 calendar days from artwork approval. Free digital proof + 1 physical sample (US$15 refundable on 100+ copy order).</li>
<li><strong>Seasonal lookbook for fashion brand (200 copies, 32 pages, A5, perfect-bound):</strong> Standard 7-10 business days production + DHL 2-4 day global = total 9-14 calendar days. Free layout design + 1 physical material sample pack (5 paper stocks).</li>
<li><strong>Exhibition catalog for art gallery (300 copies, 48 pages, B5, perfect-bound):</strong> Standard 7-10 business days production + DHL 2-4 day global = total 9-14 calendar days. Gold foil stamping included (max 2 foil layers). Free 3 mock-up digital proofs.</li>
<li><strong>Annual report for corporate (1000 copies, 80 pages, A4, case-bound hardcover):</strong> Standard 10-15 business days production + DHL 2-4 day global = total 12-19 calendar days. Free dust jacket design + ribbon bookmark. 100% quality guarantee with free reprint if not satisfied.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">All 4 scenarios include: free artwork preflight (within 24 hours), free ICC color profile matching, and a dedicated project manager assigned from quote to delivery. Rush production (3-5 days) available for +20-30% fee, subject to factory capacity.</p>"""
    content = section6_pattern.sub(new_section6, content)
    return content


def fix_zh_hk(content):
    """zh-hk 修复: 导语 + 第 6 节"""
    # 1. 导语
    old_intro = "本指南涵蓋 4 詞 cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), 4 種裝訂, 4 種紙質, 4 種尺寸, bulk/wholesale 階梯, 4 條 FAQ"
    new_intro = "本指南涵蓋 4 種裝訂, 4 種紙質, 4 種標準尺寸, 大量印刷階梯價格, 真實買家場景, 4 條 FAQ"
    content = content.replace(old_intro, new_intro)
    # 2. 第 6 节整段
    section6_pattern = re.compile(
        r'<h2 class="text-2xl font-bold text-\[#333333\] mt-10 mb-4">6\. 4 詞 Cluster.*?</p>',
        re.DOTALL
    )
    new_section6 = """<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. 真實買家場景: 交期, 樣品政策 + 訂單流程</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">智印港每月收到 4 大常見型錄買家場景, 附真實交期 + 樣品政策:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>品牌產品型錄 展銷會用 (500 本, 24 頁, A4, 騎馬釘):</strong> 標準 5-7 個工作天生產 + DHL 2-4 天全球 = 7-11 個日曆天 (從稿件確認起). 免費數碼校樣 + 1 個實物樣本 (US$15 可退, 100 本起).</li>
<li><strong>時尚品牌 季度 lookbook (200 本, 32 頁, A5, 膠裝):</strong> 標準 7-10 個工作天生產 + DHL 2-4 天全球 = 9-14 個日曆天. 免費排版設計 + 1 份 5 紙質樣本包.</li>
<li><strong>畫廊展覽圖錄 (300 本, 48 頁, B5, 膠裝):</strong> 標準 7-10 個工作天生產 + DHL 2-4 天全球 = 9-14 個日曆天. 含金箔燙印 (最多 2 層). 免費 3 個 mock-up 數碼校樣.</li>
<li><strong>企業年報 (1000 本, 80 頁, A4, 精裝):</strong> 標準 10-15 個工作天生產 + DHL 2-4 天全球 = 12-19 個日曆天. 免費護封設計 + 絲帶書籤. 100% 品質保證, 不滿意免費重印.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 大場景全部包含: 24 小時內 免費稿件預檢, 免費 ICC 色彩管理匹配, 報價到送貨全程 專屬項目經理. 特急生產 (3-5 天) 加收 20-30%, 視乎工廠產能.</p>"""
    content = section6_pattern.sub(new_section6, content)
    return content


def fix_ja(content):
    """ja 修复: 导语 + 第 6 节 + 简体字修正"""
    # 1. 导语
    old_intro = "本ガイドは 4 語 cluster (カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送), 4 製本タイプ, 4 紙質, 4 サイズ, 大量卸売段階価格, 4 FAQ をカバー"
    new_intro = "本ガイドは 4 製本タイプ, 4 紙質, 4 標準サイズ, 大量卸売段階価格, 実際のバイヤー事例, 4 FAQ をカバー"
    content = content.replace(old_intro, new_intro)
    # 2. 第 6 节整段 (含 ja 简体字修正)
    section6_pattern = re.compile(
        r'<h2 class="text-2xl font-bold text-\[#333333\] mt-10 mb-4">6\. 4 語 Cluster.*?</p>',
        re.DOTALL
    )
    new_section6 = """<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. 実際のバイヤー事例: 納期, サンプルポリシー + 注文フロー</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">ジープリント が毎月受ける 4 大カタログ購入事例とリアルな納期・サンプル規定:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>ブランド製品カタログ 見本市用 (500 冊, 24 ページ, A4, 中綴じ):</strong> 標準 5-7 営業日 生産 + DHL 2-4 日国際配送 = 7-11 暦日 (原稿承認から). 無料デジタル校正 + 1 実物サンプル (US$15, 100 冊から注文時返金可).</li>
<li><strong>ファッションブランド シーズン lookbook (200 冊, 32 ページ, A5, 無線綴じ):</strong> 標準 7-10 営業日 生産 + DHL 2-4 日国際配送 = 9-14 暦日. 無料レイアウト設計 + 1 份 5 紙質サンプルパック.</li>
<li><strong>ギャラリー展覧会カタログ (300 冊, 48 ページ, B5, 無線綴じ):</strong> 標準 7-10 営業日 生産 + DHL 2-4 日国際配送 = 9-14 暦日. 金箔押し込み (最大 2 層). 無料 3 mock-up デジタル校正.</li>
<li><strong>企業年報 (1000 冊, 80 ページ, A4, 上製本):</strong> 標準 10-15 営業日 生産 + DHL 2-4 日国際配送 = 12-19 暦日. 無料カバー設計 + リボンブックマーク. 100% 品質保証 + 不満足時無料再印刷.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 大事例全て含む: 24 時間以内 無料原稿プリフライト, 無料 ICC カラーマッチング, 見積もりから配送まで 専任プロジェクトマネージャー. 急ぎ生産 (3-5 日) は +20-30% 追加, 工場生産枠による.</p>"""
    content = section6_pattern.sub(new_section6, content)
    return content


# 3 locale 修复
fixers = {'en': fix_en, 'zh-hk': fix_zh_hk, 'ja': fix_ja}

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
        print(f'[{locale}] WARN: content unchanged (regex miss?)')
        continue
    d[SLUG]['content'] = new_content
    with open(path, 'w', encoding='utf-8', newline='') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f'[{locale}] OK: {len(old_content)} -> {len(new_content)} chars (-{len(old_content)-len(new_content)})')

print('\n[OK] F1 blog 3 locale 修复完成')
