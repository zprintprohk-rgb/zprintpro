# -*- coding: utf-8 -*-
# 2026-08-16 16:51 K3 拍板: 关于我们 是 重要内容, 不受 push 限制, SEO+GEO+internal link
# 改 about/page.tsx text 内容 (3 locale) - P0/P1 优先级

import os
path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()

# Track changes
changes = []

# ============ P0: factorySectionSubtitle (3 locale) ============
# zh-hk: 加 6 stage 概览 + anchor #factory
old = "factorySectionSubtitle: '深圳自設廠房 · 海德堡柯式 + HP Indigo 數碼 · 從印前到後道全程把控',"
new = "factorySectionSubtitle: '自設廠房 · 海德堡柯式 + HP Indigo 數碼 · 6 大工序實拍 (色彩管理 → 柯式 → 數碼 → 後道裝訂 → 禮盒工藝 → 成品) · [查看 22 figure 工序流 ↓](#factory)',"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk factorySectionSubtitle', old, new))

# en: 删 Shenzhen, 加 6 stage + anchor
old = "factorySectionSubtitle: 'Our own factory in Shenzhen · Heidelberg offset + HP Indigo digital · full control from prepress to finishing',"
new = "factorySectionSubtitle: 'In-house production facility · Heidelberg 4-color offset + HP Indigo digital + 6-color line · 6 production stages captured in 22 real photos ([view production flow ↓](#factory))',"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en factorySectionSubtitle', old, new))

# ja: 删 深圳, 加 6 stage + anchor
old = "factorySectionSubtitle: '深圳の自社工場 · Heidelberg オフセット + HP Indigo デジタル · 印前から後加工まで一貫管理',"
new = "factorySectionSubtitle: '自社一貫生産工場 · Heidelberg 4色オフセット + HP Indigo デジタル · 6 工程 22 枚実写 ([工程フローを見る ↓](#factory))',"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja factorySectionSubtitle', old, new))

# ============ P0: processSteps step 4 + step 5 desc (3 locale) ============
# zh-hk step 4 生产: 加 22 figure + #factory anchor + 主营品类 link
old = "{ step: '4', title: '生產印刷', desc: '海德堡 4 色柯式 + HP Indigo 數碼。ISO 9001 認證，Delta E ≤3 色彩管理。' },"
new = "{ step: '4', title: '生產印刷', desc: '海德堡 4 色柯式 + HP Indigo 數碼 + 6 道工序實拍 ([查看工序流 ↓](#factory)) · 主营 [貼紙](/category/stickers/) · [傳單](/category/flyers/) · [包裝盒](/category/packaging/) · [紙袋](/category/paper-bags/) · ISO 9001 認證 · Delta E ≤3 色彩管理 · 1,000+ 企業客戶信賴。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk processSteps step 4', old, new))

# zh-hk step 5 全球配送: 加 198 wa.me link
old = "{ step: '5', title: '全球配送', desc: '順豐速運覆蓋香港全境，DHL/FedEx 全球 2-4 天直送。1,000 件以上批量優惠。' }"
new = "{ step: '5', title: '全球配送', desc: '順豐本地 24h + DHL/FedEx 全球 2-4 天 · 50+ 國家直送 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · [聯絡我們](/contact/)' }"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk processSteps step 5', old, new))

# en step 4
old = "{ step: '4', title: 'Production', desc: 'Heidelberg 4-color offset + HP Indigo digital. ISO 9001 certified, Delta E ≤3 color control.' },"
new = "{ step: '4', title: 'Production', desc: 'Heidelberg 4-color offset + HP Indigo digital + 6 production stages ([view flow ↓](#factory)). Top categories: [Stickers](/category/stickers/) · [Flyers](/category/flyers/) · [Packaging](/category/packaging/) · [Paper Bags](/category/paper-bags/). ISO 9001 certified, Delta E ≤3. Trusted by 1,000+ global brands.' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en processSteps step 4', old, new))

# en step 5
old = "{ step: '5', title: 'Global Delivery', desc: 'SF Express covers all of Hong Kong, DHL/FedEx delivers worldwide in 2-4 days. Volume pricing on 1000+ units.' }"
new = "{ step: '5', title: 'Global Delivery', desc: 'SF Express covers Hong Kong in 24h, DHL/FedEx delivers worldwide in 2-4 days. 50+ countries served, 1,000+ orders shipped. [WhatsApp us 📲](https://wa.me/8619880851334) · [Contact us](/contact/)' }"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en processSteps step 5', old, new))

# ja step 4
old = "{ step: '4', title: '印刷生産', desc: 'ハイデルベルク 4 色オフセット + HP Indigo デジタル。ISO 9001 認証、Delta E ≤3 色彩管理。' },"
new = "{ step: '4', title: '印刷生産', desc: 'ハイデルベルク 4 色オフセット + HP Indigo デジタル + 6 工程実写 ([工程フローを見る ↓](#factory)) · 主要取扱: [ステッカー](/category/stickers/) · [チラシ](/category/flyers/) · [パッケージ](/category/packaging/) · [紙袋](/category/paper-bags/) · ISO 9001 認証 · Delta E ≤3 · 1,000+ 法人顧客。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja processSteps step 4', old, new))

# ja step 5
old = "{ step: '5', title: '世界配送', desc: '顺丰速运は香港全域をカバー、DHL/FedEx は世界 2-4 日直送。1000 部以上で批量割引。' }"
new = "{ step: '5', title: '世界配送', desc: '顺丰速运は香港全域 24h · DHL/FedEx は世界 2-4 日直送 · 50+ ヶ国対応 · 1,000+ 注文実績 · [WhatsApp で即時お問合せ 📲](https://wa.me/8619880851334) · [お問合せ](/contact/)' }"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja processSteps step 5', old, new))

# ============ P1: advantages (3 locale) ============
# zh-hk advantages 3 项 desc
old = "{ title: '品質保證', desc: 'ISO 9001質量管理體系認證，海德堡四色柯式印刷，ICC色彩管理，Delta E ≤3色彩誤差控製。從印前到印後，每個環節均有專人檢查。' },"
new = "{ title: '品質保證', desc: 'ISO 9001 + FSC 認證 · 海德堡四色柯式 + HP Indigo 數碼 + 6 道工序實拍 ([查看工序流 ↓](#factory)) · ICC 色彩管理 Delta E ≤3 · 1,000+ 企業客戶信賴。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk advantages 1', old, new))

old = "{ title: '快速交付', desc: '數碼印刷當日可取，柯式印刷3–5天交貨。順豐速遞覆蓋香港全區，大批量可安排專車直送。緊急訂單專人跟進，'"
new = "{ title: '快速交付', desc: '數碼印刷 24h · 柯式印刷 3–5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · 1000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · '"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk advantages 2', old, new))

# en advantages 1
old = "{ title: 'Quality Assurance', desc: 'ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital printing. ICC color management with Delta E ≤3 control. Every order inspected by dedicated prepress and postpress teams before shipping.' },"
new = "{ title: 'Quality Assurance', desc: 'ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital + 6 production stages ([view flow ↓](#factory)). ICC color management with Delta E ≤3. Trusted by 1,000+ global brands.' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en advantages 1', old, new))

# en advantages 2
old = "{ title: 'Fast Global Delivery', desc: 'Digital printing ships in 24 hours. Offset printing delivers in 3–5 business days. Worldwide express shipping to 50+ countries. Free shipping on selected products to US / UK / AU / CA. Volume orders include dedicated freight forwarding.' },"
new = "{ title: 'Fast Global Delivery', desc: 'Digital ships in 24h, offset 3–5 business days. DHL/FedEx worldwide in 2–4 days to 50+ countries. Free shipping to US / UK / AU / CA. 1,000+ orders shipped. [WhatsApp us 📲](https://wa.me/8619880851334) · [Contact us](/contact/)' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en advantages 2', old, new))

# ja advantages 1
old = "{ title: '品質保証', desc: 'ISO 9001品質管理システム認証、ハイデルベルク4色オフセット印刷、ICCカラーマネジメント、Delta E ≤3の色彩誤差管理。印前から印後まで、各工程に専任者が検査を行います。' },"
new = "{ title: '品質保証', desc: 'ISO 9001 + FSC 認証 · ハイデルベルク 4 色オフセット + HP Indigo デジタル + 6 工程実写 ([工程フローを見る ↓](#factory)) · ICC カラーマネジメント Delta E ≤3 · 1,000+ 法人顧客。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja advantages 1', old, new))

# ja advantages 2
old = "{ title: '迅速な納品', desc: 'デジタル印刷は当日受取可能、オフセット印刷は3～5日で納品。顺丰速遞は香港全域をカバーし、大口注文は専用トラック直送も可能です。'"
new = "{ title: '迅速な納品', desc: 'デジタル 24h · オフセット 3-5 日 · DHL/FedEx 世界 2-4 日直送 · 50+ ヶ国対応 · 1,000+ 注文実績 · [WhatsApp で即時お問合せ 📲](https://wa.me/8619880851334) · '"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja advantages 2', old, new))

# ============ P1: teams (3 locale) - 198 联系号 ============
# zh-hk teams 3
old = "客戶服務團隊', desc: '流利粵語、英語、普通話及日語均可對話。24 小時內回覆承諾，專屬 WhatsApp 支援 +86 198 8085 1334。從報價到售後全程跟進，'"
new = "客戶服務團隊', desc: '粵 / 普 / 英 / 日 四語 24h 響應 · 專屬 WhatsApp 支援 +86 198 8085 1334 · 從報價到售後全程跟進 · [聯絡我們](/contact/) · '"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk teams 3', old, new))

# en teams 3
old = "{ title: 'Customer Service', desc: 'Fluent English-speaking team (Mandarin, Cantonese, Japanese available). 24-hour response commitment, dedicated WhatsApp support at +8619880851334. Assisting clients from quote to after-sales.' },"
new = "{ title: 'Customer Service', desc: 'Fluent English / Mandarin / Cantonese / Japanese, 24-hour response. Dedicated WhatsApp support at +86 198 8085 1334. [Contact us](/contact/) · [WhatsApp 📲](https://wa.me/8619880851334)' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('en teams 3', old, new))

# ja teams 3
old = "カスタマーサービス', desc: '広東語、英語、北京語、日本語が堪能。24時間以内の返信を約束し、見積もりからアフターサービスまですべての問題を解決します。' },"
new = "カスタマーサービス', desc: '粵 / 普 / 英 / 日 四言語対応 · 24 時間以内返信 · WhatsApp サポート +86 198 8085 1334 · [お問合せ](/contact/) · [WhatsApp 📲](https://wa.me/8619880851334)' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('ja teams 3', old, new))

# ============ P2: industries 6 重要 desc (3 locale) ============
# 餐饮外卖 → /category/flyers/
old_zh = "餐飲外賣', desc: '餐廳及外賣平台' }"
new_zh = "餐飲外賣', desc: '餐廳及外賣平台 · [菜單印刷](/category/flyers/) · [外賣標籤](/category/labels/) · [打包盒](/category/packaging/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries fnb', old_zh, new_zh))

# 零售精品 → /category/packaging/
old_zh = "零售精品', desc: '實體店及品牌專櫃' }"
new_zh = "零售精品', desc: '實體店及品牌專櫃 · [包裝盒](/category/packaging/) · [紙袋](/category/paper-bags/) · [吊牌](/category/labels/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries retail', old_zh, new_zh))

# 跨境电商 → /blog/cross-border-ecommerce-shipping-box-guide
old_zh = "跨境電商', desc: 'DTC 品牌及亞馬遜 FBA' }"
new_zh = "跨境電商', desc: 'DTC 品牌及亞馬遜 FBA · [跨境電商包裝指南](/blog/cross-border-ecommerce-shipping-box-guide/) · [快遞標籤](/category/labels/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries ecommerce', old_zh, new_zh))

# 美妆护肤 → /category/labels/
old_zh = "美妝護膚', desc: '護膚品及化妝品' }"
new_zh = "美妝護膚', desc: '護膚品及化妝品 · [標籤貼紙](/category/labels/) · [包裝盒](/category/packaging/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries beauty', old_zh, new_zh))

# 教育培训 → /category/books/
old_zh = "教育培訓', desc: '學校及培訓機構' }"
new_zh = "教育培訓', desc: '學校及培訓機構 · [書籍畫冊](/category/books/) · [貼紙](/category/stickers/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries education', old_zh, new_zh))

# 婚庆 → /category/stickers/ (邀请函贴纸)
old_zh = "婚慶', desc: '婚禮及企業活動' }"
new_zh = "婚慶', desc: '婚禮及企業活動 · [貼紙](/category/stickers/) · [包裝盒](/category/packaging/)' }"
if old_zh in src:
    src = src.replace(old_zh, new_zh, 1)
    changes.append(('zh-hk industries wedding', old_zh, new_zh))

# en fnb
old_en = "Food &amp; Beverage', desc: 'Restaurants &amp; delivery platforms' }"
# Will look for non-encoded version
old_en2 = "Food & Beverage', desc: 'Restaurants & delivery platforms' }"
new_en = "Food &amp; Beverage', desc: 'Restaurants &amp; delivery platforms · [Menus](/category/flyers/) · [Takeout labels](/category/labels/) · [Packaging](/category/packaging/)' }"
new_en2 = "Food & Beverage', desc: 'Restaurants & delivery platforms · [Menus](/category/flyers/) · [Takeout labels](/category/labels/) · [Packaging](/category/packaging/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries fnb', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries fnb', old_en2, new_en2))

# en retail
old_en = "Retail &amp; Boutique', desc: 'Brick-and-mortar stores &amp; counters' }"
old_en2 = "Retail & Boutique', desc: 'Brick-and-mortar stores & counters' }"
new_en = "Retail &amp; Boutique', desc: 'Brick-and-mortar stores &amp; counters · [Packaging](/category/packaging/) · [Paper bags](/category/paper-bags/) · [Hang tags](/category/labels/)' }"
new_en2 = "Retail & Boutique', desc: 'Brick-and-mortar stores & counters · [Packaging](/category/packaging/) · [Paper bags](/category/paper-bags/) · [Hang tags](/category/labels/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries retail', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries retail', old_en2, new_en2))

# en ecommerce
old_en = "Cross-border E-com', desc: 'DTC brands &amp; Amazon FBA' }"
old_en2 = "Cross-border E-com', desc: 'DTC brands & Amazon FBA' }"
new_en = "Cross-border E-com', desc: 'DTC brands &amp; Amazon FBA · [Shipping box guide](/blog/cross-border-ecommerce-shipping-box-guide/) · [Shipping labels](/category/labels/)' }"
new_en2 = "Cross-border E-com', desc: 'DTC brands & Amazon FBA · [Shipping box guide](/blog/cross-border-ecommerce-shipping-box-guide/) · [Shipping labels](/category/labels/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries ecommerce', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries ecommerce', old_en2, new_en2))

# en beauty
old_en = "Beauty &amp; Skincare', desc: 'Skincare &amp; cosmetics' }"
old_en2 = "Beauty & Skincare', desc: 'Skincare & cosmetics' }"
new_en = "Beauty &amp; Skincare', desc: 'Skincare &amp; cosmetics · [Labels](/category/labels/) · [Packaging](/category/packaging/)' }"
new_en2 = "Beauty & Skincare', desc: 'Skincare & cosmetics · [Labels](/category/labels/) · [Packaging](/category/packaging/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries beauty', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries beauty', old_en2, new_en2))

# en education
old_en = "Education &amp; Training', desc: 'Schools &amp; training institutes' }"
old_en2 = "Education & Training', desc: 'Schools & training institutes' }"
new_en = "Education &amp; Training', desc: 'Schools &amp; training institutes · [Books](/category/books/) · [Stickers](/category/stickers/)' }"
new_en2 = "Education & Training', desc: 'Schools & training institutes · [Books](/category/books/) · [Stickers](/category/stickers/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries education', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries education', old_en2, new_en2))

# en wedding
old_en = "Weddings &amp; Events', desc: 'Weddings &amp; corporate events' }"
old_en2 = "Weddings & Events', desc: 'Weddings & corporate events' }"
new_en = "Weddings &amp; Events', desc: 'Weddings &amp; corporate events · [Stickers](/category/stickers/) · [Packaging](/category/packaging/)' }"
new_en2 = "Weddings & Events', desc: 'Weddings & corporate events · [Stickers](/category/stickers/) · [Packaging](/category/packaging/)' }"
if old_en in src:
    src = src.replace(old_en, new_en, 1)
    changes.append(('en industries wedding', old_en, new_en))
elif old_en2 in src:
    src = src.replace(old_en2, new_en2, 1)
    changes.append(('en industries wedding', old_en2, new_en2))

# ja fnb
old_ja = "飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム' }"
new_ja = "飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム · [メニュー印刷](/category/flyers/) · [テイクアウトラベル](/category/labels/) · [パッケージ](/category/packaging/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries fnb', old_ja, new_ja))

# ja retail
old_ja = "小売・精品', desc: '実店舗・ブランドカウンター' }"
new_ja = "小売・精品', desc: '実店舗・ブランドカウンター · [パッケージ](/category/packaging/) · [紙袋](/category/paper-bags/) · [下げ札](/category/labels/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries retail', old_ja, new_ja))

# ja ecommerce
old_ja = "越境 EC', desc: 'DTC ブランド・Amazon FBA' }"
new_ja = "越境 EC', desc: 'DTC ブランド・Amazon FBA · [越境 EC パッケージガイド](/blog/cross-border-ecommerce-shipping-box-guide/) · [配送ラベル](/category/labels/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries ecommerce', old_ja, new_ja))

# ja beauty
old_ja = "美容・スキンケア', desc: 'スキンケア・化粧品' }"
new_ja = "美容・スキンケア', desc: 'スキンケア・化粧品 · [ラベル](/category/labels/) · [パッケージ](/category/packaging/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries beauty', old_ja, new_ja))

# ja education
old_ja = "教育・研修', desc: '学校・研修機関' }"
new_ja = "教育・研修', desc: '学校・研修機関 · [書籍](/category/books/) · [ステッカー](/category/stickers/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries education', old_ja, new_ja))

# ja wedding
old_ja = "結婚・イベント', desc: '結婚式・企業イベント' }"
new_ja = "結婚・イベント', desc: '結婚式・企業イベント · [ステッカー](/category/stickers/) · [パッケージ](/category/packaging/)' }"
if old_ja in src:
    src = src.replace(old_ja, new_ja, 1)
    changes.append(('ja industries wedding', old_ja, new_ja))

# Write back via UTF-8 no BOM
with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
# Verify
with open(path, 'rb') as f:
    raw = f.read()
print('total changes: {0}'.format(len(changes)))
for name, _, _ in changes:
    print('  ✓ {0}'.format(name))
print('file size: {0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf'))
print('NOT FOUND:')
import re
# Find what was NOT replaced
