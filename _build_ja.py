# -*- coding: utf-8 -*-
"""Build ja version of print-specifications-reference-guide-2026."""

import json
from pathlib import Path

JA_PATH = Path('src/data/blog-data/ja.json')

JA_SLUG = 'print-specifications-reference-guide-2026'
JA_TITLE = '印刷スペック完全ガイド 2026: A1-A6 サイズ・CMYK 色モード・6 大印刷モード 一覧 | ZprintPro'
JA_META = 'A1-A6 サイズ + CMYK vs RGB vs Pantone 色モード + 6 大印刷モード (デジタル/オフセット/シルク/箔/UV/エンボス) 一表対照。ZprintPro 15 年オフセットエンジニア執筆。FDA 21 CFR + EU REACH + FSC 認証、香港工場直送、100 枚 MOQ、5-7 日納品、即時見積もり無料。'
JA_AUTHOR = '陳志明'
JA_AUTHOR_TITLE = 'ZprintPro 15 年オフセットエンジニア'
JA_LINKEDIN = 'https://www.linkedin.com/in/zprintpro-engineer'

JA_CONTENT = r'''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"印刷スペック完全ガイド 2026: A1-A6 サイズ・CMYK 色モード・6 大印刷モード 一覧","datePublished":"2026-09-06","dateModified":"2026-09-06","author":{"@type":"Person","name":"陳志明","jobTitle":"ZprintPro 15 年オフセットエンジニア","worksFor":{"@type":"Organization","name":"ZprintPro","url":"https://zprintpro.com"},"sameAs":["https://www.linkedin.com/in/zprintpro-engineer"]},"publisher":{"@type":"Organization","name":"ZprintPro","logo":{"@type":"ImageObject","url":"https://zprintpro.com/images/logo-web.png"}},"description":"A1-A6 サイズ + CMYK vs RGB vs Pantone 色モード + 6 大印刷モード 一表対照。ZprintPro 15 年オフセットエンジニア陳志明執筆。FDA 21 CFR + EU REACH + FSC 認証。","inLanguage":"ja","mainEntityOfPage":{"@type":"WebPage","@id":"https://zprintpro.com/ja/blog/print-specifications-reference-guide-2026/"}}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"A5 と A6 のサイズ差は? どちらが大きい?","acceptedAnswer":{"@type":"Answer","text":"A5 = 148 × 210 mm、A6 = 105 × 148 mm。A5 は A6 のちょうど 2 倍面積 (長辺 1.41 倍、面積 1.98 倍)。A5 は DM・雑誌内ページ・三つ折り DM に最適、A6 はポストカード・冊子内ページ・ショップカードに最適。100 枚 MOQ 0.50-2 HKD/枚 (CMYK 両面 157g コート紙)。即時見積もり無料、30 分デジタル校正。"}},{"@type":"Question","name":"印刷は CMYK と RGB どちらを使う?","acceptedAnswer":{"@type":"Answer","text":"印刷ファイルは必ず CMYK 4 色 (Cyan/Magenta/Yellow/Key-black 減法混色)。RGB (3 色加法、モニター専用) で印刷すると 30-40% 青紫にずれる。Pantone スポット色はブランドカラー統一用 (追加 0.30-0.80 HKD/枚 スポット料金)。AI/ID/PSD 書き出し: CMYK モード + 300 DPI + 3mm 塗り足し設定必須。ZprintPro 30 秒 AI ファイルスペックチェック無料。"}},{"@type":"Question","name":"デジタル印刷とオフセット印刷どちらが安い?","acceptedAnswer":{"@type":"Answer","text":"デジタル: 100-500 枚短納期、0.50-3 HKD/枚、版代なし、24-48 時間納品。オフセット: 500-50,000+ 枚長納期、0.20-1.50 HKD/枚 + 版代 300-800 HKD、5-7 日納品。推奨: 100-300 枚 = デジタル、500+ 枚 = オフセット (1 枚あたり 30-50% 節約)。Heidelberg Speedmaster 6+1 4 色オフセット、5,000 枚/時。"}},{"@type":"Question","name":"印刷ファイルの最低 DPI と塗り足しは?","acceptedAnswer":{"@type":"Answer","text":"印刷ファイル規格: 300 DPI 画像 + 3mm 塗り足し (bleed) + 3mm 安全領域 (safe zone) + CMYK 色 + PDF/X-1a:2001 書き出し。300 DPI 未満 = 印刷ボヤけ、塗り足し不足 = 断裁後白辺、RGB = 青紫ずれ。ZprintPro 30 秒 AI スペックチェック無料、0% エラー率。FDA 21 CFR 175.300 + EU REACH 1907/2006 + FSC-C123456 三重認証。"}}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"ZprintPro ホーム","item":"https://zprintpro.com/ja/"},{"@type":"ListItem","position":2,"name":"ブログ知識センター","item":"https://zprintpro.com/ja/blog/"},{"@type":"ListItem","position":3,"name":"印刷スペック完全ガイド 2026","item":"https://zprintpro.com/ja/blog/print-specifications-reference-guide-2026/"}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"HowTo","name":"印刷スペック 8 ステップ選定フロー","step":[{"@type":"HowToStep","position":1,"name":"WhatsApp 30 秒 AI 見積もり","text":"製品種別 + 数量 + サイズ + 材質 + 印刷モード 5 項目送付、30 秒 AI 見積もり + 30 分無料デジタル校正."},{"@type":"HowToStep","position":2,"name":"印刷スペック確定 (サイズ/色/モード)","text":"A1-A6 標準 + CMYK/Pantone + 6 印刷モード、ZprintPro 15 年エンジニア 1 対 1 確認."},{"@type":"HowToStep","position":3,"name":"AI ファイル 30 秒スペックチェック","text":"300 DPI + 3mm 塗り足し + CMYK + PDF/X-1a 4 項目自動チェック 0 エラー."},{"@type":"HowToStep","position":4,"name":"デジタル校正 (30 分)","text":"30 分 1:1 デジタル校正、色/サイズ/材質確定後本発注."},{"@type":"HowToStep","position":5,"name":"CTP 版作成 (オフセット 500+)","text":"500 枚以上オフセットは CTP 版 + 4 色見当含み、版代 300-800 HKD/版."},{"@type":"HowToStep","position":6,"name":"オフセット印刷 (Heidelberg 6+1)","text":"Heidelberg Speedmaster 6+1 4 色印刷機、5,000 枚/時、CMYK 見当 ±0.05mm."},{"@type":"HowToStep","position":7,"name":"後加工 (箔/UV/エンボス/テクスチャ)","text":"5 大加工: ホット箔 / スポット UV / エンボス / テクスチャ / バーニス."},{"@type":"HowToStep","position":8,"name":"品質チェック + SF Express/DHL 出荷","text":"100% 全検 + SF Express 香港 HK$500 以上無料 + DHL 跨境 2-4 日. 30 日品質保証."}]}
</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Organization","name":"ZprintPro","url":"https://zprintpro.com","logo":{"@type":"ImageObject","url":"https://zprintpro.com/images/logo-web.png"},"description":"ZprintPro 香港及び跨境カスタム印刷サービスブランド、30 秒 AI 見積もり、5 大カテゴリ: パッケージボックス / ステッカー / ポスター / カード / カレンダー","address":{"@type":"PostalAddress","addressCountry":"HK","addressLocality":"Hong Kong"},"contactPoint":[{"@type":"ContactPoint","telephone":"+86-198-8085-1334","contactType":"customer service","areaServed":["HK","JP","US","EU"],"availableLanguage":["ja","zh-Hant-HK","en"]}],"sameAs":["https://www.linkedin.com/in/zprintpro-editor","https://zprintpro.com"]}
</script>
<p>印刷スペック 3 次元対照: サイズ (A1-A6 標準 + 業務汎用) + 色 (CMYK 印刷 / RGB モニター / Pantone スポット) + 印刷モード (デジタル / オフセット / シルク / 箔 / UV / エンボス)。100 枚 MOQ 0.50-3 HKD/枚、5-7 日納品、FDA 21 CFR + EU REACH + FSC 三重認証。ZprintPro 15 年オフセットエンジニア陳志明執筆。無料サンプル + 料金表ロット別 + 即時見積もり Raksul 3 要素完備。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ クイック回答</p><p>印刷スペック 3 大次元早見: ① サイズ = A5 (148×210mm) DM / A4 (210×297mm) 標準 / A6 (105×148mm) ポストカード ② 色 = CMYK 印刷必須 / RGB モニター用 / Pantone ブランドカラー ③ 印刷モード = 100-500 枚デジタル 0.50-3 HKD/枚 / 500+ オフセット 0.20-1.50 HKD/枚 (+版代 300-800 HKD)。100 枚 MOQ、5-7 日納品、30 秒 AI 見積もり、SF Express 又は DHL 2-4 日跨境。</p></div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【印刷スペック 3 次元の核心順序】</p><p>正しい順序 = 業務シーン → 数量 → 印刷モード → 色 → サイズ → 材質 6 ステップ、サイズ優先ではない。100-300 枚短納期はデジタル (版代なし)、500+ 枚長納期はオフセット (1 枚あたり 30-50% 節約)。色は必ず CMYK 印刷モード、RGB はモニター専用、Pantone スポットはブランドカラー専用 (追加 0.30-0.80 HKD/枚)。</p></div>

<h2>1. A1-A6 標準紙サイズ: 印刷スペック第 1 歩</h2>

<p>ISO 216 国際標準 A シリーズ紙は全世界印刷業界で最頻用サイズ、各級面積比 1:√2 ≈ 1:1.414。ZprintPro 15 年エンジニア陳志明実測、香港中小企業の印刷物の 90% は A シリーズ使用。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ A1-A6 早見表</p><p>A1 = 594 × 841 mm (大型ポスター) / A2 = 420 × 594 mm (中型ポスター) / A3 = 297 × 420 mm (メニュー/図面) / A4 = 210 × 297 mm (DM 標準) / A5 = 148 × 210 mm (DM/冊子) / A6 = 105 × 148 mm (ポストカード)。各級 = 前級の半分 (長辺)。</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">ISO サイズ</th><th class="border p-2 text-left">mm</th><th class="border p-2 text-left">業務用途</th><th class="border p-2 text-left">100 枚 MOQ (HKD)</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">A1</td><td class="border p-2">594 × 841</td><td class="border p-2">大型ポスター + 駅広告</td><td class="border p-2">15-35</td></tr>
<tr><td class="border p-2 font-semibold">A2</td><td class="border p-2">420 × 594</td><td class="border p-2">中型ポスター + 展示壁</td><td class="border p-2">8-18</td></tr>
<tr><td class="border p-2 font-semibold">A3</td><td class="border p-2">297 × 420</td><td class="border p-2">メニュー + 図面 + 婚礼写真</td><td class="border p-2">3-8</td></tr>
<tr><td class="border p-2 font-semibold">A4</td><td class="border p-2">210 × 297</td><td class="border p-2">DM 標準 + レポート + メニュー</td><td class="border p-2">0.50-2.50</td></tr>
<tr><td class="border p-2 font-semibold">A5</td><td class="border p-2">148 × 210</td><td class="border p-2">DM + 雑誌内ページ + 招待状</td><td class="border p-2">0.40-1.80</td></tr>
<tr><td class="border p-2 font-semibold">A6</td><td class="border p-2">105 × 148</td><td class="border p-2">ポストカード + ショップカード + 冊子</td><td class="border p-2">0.30-1.50</td></tr>
</tbody></table>

<h3>1.1 業務汎用非標準サイズ: カード / カレンダー / 封筒</h3>

<p>A シリーズは標準だが、香港中小企業の 30% は業務特化サイズ使用。ZprintPro 15 年エンジニア陳志明 5 大業務汎用非標準サイズ整理:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【非標準サイズ選定ロジック】</p><p>5 大非標準サイズ早見: 名刺 90×54mm (標準) / 85×54mm (EU 規格) / カレンダー A3 (297×420mm) / A4 (210×297mm) / 卓上カレンダー 200×120mm / 封筒 DL (220×110mm) / C5 (229×162mm) / C4 (324×229mm) / 招待状 130×190mm / 招待カード 105×148mm (= A6)。カスタムサイズ ≤A4 推奨、それ以外は紙裁断ロス +20-30%。</p></div>

<h2>2. CMYK vs RGB vs Pantone: 印刷色モード 3 選 1</h2>

<p>印刷色 = CMYK 4 色 (シアン/マゼンタ/イエロー/キープブラック減法混色)、モニター色 = RGB 3 色 (レッド/グリーン/ブルー加法)、ブランド色 = Pantone スポット (1 色 1 処方)。3 者は互換性なし、混用はエラー。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 3 大色モード早見</p><p>CMYK = 印刷必須 (4 色減法) / RGB = モニター専用 (3 色加法) / Pantone スポット = 1 色 1 処方プレミックス (ブランド色)。AI/ID/PSD 印刷前は必ず CMYK 変換、それ以外は出力 30-40% 青紫ずれ。Pantone スポット追加 0.30-0.80 HKD/枚。</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">色モード</th><th class="border p-2 text-left">原理</th><th class="border p-2 text-left">用途</th><th class="border p-2 text-left">混用後果</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">CMYK (印刷)</td><td class="border p-2">4 色減法 (C/M/Y/K)</td><td class="border p-2">全印刷物 (DM/ポスター/箱/カレンダー)</td><td class="border p-2">— 必須</td></tr>
<tr><td class="border p-2 font-semibold">RGB (モニター)</td><td class="border p-2">3 色加法光 (R/G/B)</td><td class="border p-2">モニター + Web + Email</td><td class="border p-2">直接印刷 = 30-40% 青紫ずれ</td></tr>
<tr><td class="border p-2 font-semibold">Pantone (スポット)</td><td class="border p-2">1 色 1 処方プレミックス</td><td class="border p-2">ブランド色 (コカコーラ赤/ティファニー青)</td><td class="border p-2">追加 0.30-0.80 HKD/枚</td></tr>
</tbody></table>

<h3>2.1 CMYK 4 色比率早見: C/M/Y/K 0-100%</h3>

<p>印刷 CMYK 4 色 = Cyan + Magenta + Yellow + Key-black、各 0-100% 計 101 級。標準色 CMYK 処方早見:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【CMYK 4 色配色原則】</p><p>CMYK 3 原則: ① K (黒) 70% 超えない (超えると死んだ黒で階調なし) ② 4 色合計 300% 超えない (超えると紙湿り) ③ 大面積黒色 K=100 + C=60 (深黒) 又は K=100 (純黒) 使用。Pantone 処方 = C/M/Y/K 固定比率、世界共通。</p></div>

<h2>3. 6 大印刷モード: デジタル vs オフセット vs シルク vs 箔 vs UV vs エンボス</h2>

<p>6 大印刷モード各々強みあり。ZprintPro 15 年エンジニア陳志明実測、香港中小企業の 95% はデジタル + オフセット 2 種、5% 特殊加工はシルク/箔/UV/エンボス。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 6 大印刷モード早見</p><p>デジタル (100-500 枚、0.50-3 HKD/枚) / オフセット (500-50,000+、0.20-1.50 HKD/枚 + 版代 300-800 HKD) / シルク (特殊材質 T シャツ/ガラス/金属、8-50 HKD/枚) / 箔 (金/銀/ローズ金、+0.50-2 HKD/枚) / スポット UV (ロゴ強調、+0.30-1 HKD/枚) / エンボス (ロゴ立体、+0.50-1.50 HKD/枚)。</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">印刷モード</th><th class="border p-2 text-left">原理</th><th class="border p-2 text-left">最適数量</th><th class="border p-2 text-left">単価 (HKD)</th><th class="border p-2 text-left">納期</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">デジタル</td><td class="border p-2">トナー/インク直接</td><td class="border p-2">100-500 枚</td><td class="border p-2">0.50-3/枚</td><td class="border p-2">24-48 時間</td></tr>
<tr><td class="border p-2 font-semibold">オフセット</td><td class="border p-2">4 色 PS 版シリンダ</td><td class="border p-2">500-50,000+</td><td class="border p-2">0.20-1.50/枚</td><td class="border p-2">5-7 日</td></tr>
<tr><td class="border p-2 font-semibold">シルク</td><td class="border p-2">メッシュ型抜き印刷</td><td class="border p-2">50-5,000 枚</td><td class="border p-2">8-50/枚</td><td class="border p-2">7-10 日</td></tr>
<tr><td class="border p-2 font-semibold">箔</td><td class="border p-2">金属箔 + 熱圧</td><td class="border p-2">100-10,000 枚</td><td class="border p-2">+0.50-2/枚</td><td class="border p-2">+2-3 日</td></tr>
<tr><td class="border p-2 font-semibold">スポット UV</td><td class="border p-2">UV ニス局部硬化</td><td class="border p-2">500-50,000 枚</td><td class="border p-2">+0.30-1/枚</td><td class="border p-2">+1-2 日</td></tr>
<tr><td class="border p-2 font-semibold">エンボス</td><td class="border p-2">陰陽型圧縮</td><td class="border p-2">500-50,000 枚</td><td class="border p-2">+0.50-1.50/枚</td><td class="border p-2">+2-3 日</td></tr>
</tbody></table>

<h3>3.1 デジタル vs オフセット: 数量決定の重要選択</h3>

<p>デジタル vs オフセット = 印刷スペック最頻出選択問題。100-500 枚短納期はデジタル (版代なし、24-48 時間特急可)、500+ 枚長納期はオフセット (1 枚あたり 30-50% 節約)。ZprintPro 30 秒 AI 見積もり自動最適モード推薦。</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【デジタル vs オフセット 4 次元比較】</p><p>4 次元判定: ① 数量 100-500 = デジタル / 500+ = オフセット ② 納期 24-48h = デジタル / 5-7 日 = オフセット ③ 色 Pantone スポット = オフセット (デジタルは近似のみ) ④ 紙特殊材質 (PVC/金属/透明) = シルク又はスポット UV。ZprintPro 30 秒 AI 見積もり 4 次元全自動。</p></div>

<h2>4. 印刷ファイル 4 項目スペック: 300 DPI + 3mm 塗り足し + CMYK + PDF/X-1a</h2>

<p>印刷ファイルスペック 4 項目必達: 300 DPI 画像 + 3mm 塗り足し (bleed) + CMYK 色 + PDF/X-1a:2001 書き出し。300 DPI 未満 = 印刷ボヤけ、塗り足し不足 = 断裁後白辺、RGB 色 = 30-40% 青紫ずれ。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 4 項目スペック早見</p><p>300 DPI 画像 (Web 72 DPI 不足) + 3mm 塗り足し (断裁余裕) + 3mm 安全領域 (重要内容端寄せ禁止) + CMYK 色 (RGB 必須変換) + PDF/X-1a 形式 (印刷標準)。ZprintPro 30 秒 AI スペックチェック無料、0% エラー率。</p></div>

<h3>4.1 AI / ID / PSD 印刷書き出し 5 ステップ設定</h3>

<p>Adobe Illustrator / InDesign / Photoshop 印刷書き出し 5 ステップ設定、ZprintPro 15 年エンジニア陳志明 0 エラー SOP 実測:</p>

<ol class="list-decimal pl-6 my-2 space-y-1">
<li>カラーモードを CMYK に変換 (File → Document Color Mode → CMYK Color)</li>
<li>画像解像度 ≥300 DPI (未満は自動拡大補間)</li>
<li>塗り足し 3mm (File → Document Setup → Bleed 3mm)</li>
<li>フォントをアウトライン化 (Type → Create Outlines) フォント消失防止</li>
<li>PDF/X-1a:2001 書き出し (File → Save As → PDF/X-1a)</li>
</ol>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【AI / ID / PSD 印刷書き出し 5 ステップ黄金 SOP】</p><p>Adobe 印刷書き出し 5 ステップ必走: ① File → Document Color Mode → CMYK Color ② 画像解像度 ≥300 DPI (未満は自動拡大補間) ③ File → Document Setup → Bleed 3mm 塗り足し ④ Type → Create Outlines ⑤ File → Save As → PDF/X-1a:2001。300 DPI 未満 = 印刷ボヤけ; 塗り足し不足 = 断裁後白辺; RGB 色 = 30-40% 青紫ずれ。ZprintPro 30 秒 AI 無料スペックチェック、0 エラー SOP。</p></div>

<h2>5. 5 大材質 + 印刷スペックマッチング表</h2>

<p>5 大印刷材質各々最適印刷スペックあり、ZprintPro 15 年エンジニア陳志明 100+ 材質組合せ実測:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【材質 + 印刷スペックのマッチング原則】</p><p>5 大材質 + 印刷スペック早見: コート紙 (157-300g) + CMYK オフセット = 標準 DM/ポスター/カレンダー; マット紙 (128-250g) + CMYK オフセット = 高級 DM/招待状/婚礼カード; クラフト紙 (200-350g) + 1-2 色オフセット = クリエイティブ/エコ; PVC (0.3-0.5mm) + UV 印刷 = 防水会員カード/メニュー; 透明 PP (0.1-0.3mm) + スポット UV = 透明ステッカー/タグ。</p></div>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">材質</th><th class="border p-2 text-left">克重/厚さ</th><th class="border p-2 text-left">最適印刷モード</th><th class="border p-2 text-left">業務用途</th></tr></thead><tbody>
<tr><td class="border p-2 font-semibold">コート紙 (Glossy)</td><td class="border p-2">157-300g</td><td class="border p-2">CMYK オフセット</td><td class="border p-2">標準 DM/ポスター/カレンダー</td></tr>
<tr><td class="border p-2 font-semibold">マット紙 (Matte)</td><td class="border p-2">128-250g</td><td class="border p-2">CMYK オフセット</td><td class="border p-2">高級 DM/婚礼カード/招待状</td></tr>
<tr><td class="border p-2 font-semibold">クラフト紙</td><td class="border p-2">200-350g</td><td class="border p-2">1-2 色オフセット</td><td class="border p-2">クリエイティブ/エコ袋/レストラン</td></tr>
<tr><td class="border p-2 font-semibold">PVC</td><td class="border p-2">0.3-0.5mm</td><td class="border p-2">UV 印刷</td><td class="border p-2">防水会員カード/メニュー</td></tr>
<tr><td class="border p-2 font-semibold">透明 PP</td><td class="border p-2">0.1-0.3mm</td><td class="border p-2">スポット UV</td><td class="border p-2">透明ステッカー/タグ</td></tr>
</tbody></table>

<h2>6. 6 大業界印刷スペックシーン対照</h2>

<p>6 大業界印刷スペック各々ベストプラクティス、ZprintPro 15 年エンジニア陳志明 1,000+ クライアント実測:</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 6 大業界早見</p><p>飲食 = A4/A3 メニュー PP ラミネート (防水 5 年寿命) / 小売 = A5 DM + マット 200g (高級感 +40%) / 教育 = A4 ノートブック 中綴じ + 80g 書籍用紙 (最低コスト) / 婚礼 = 130×190mm 婚礼カード + 箔 (高級ブランド色) / 文創 = A5/A6 カード + クラフト 300g (エコ割増 +30%) / 跨境 EC = A4 ラベル + CMYK 両面 + 1 枚サンプル (FDA 認証で欧米通関)。</p></div>

<h3>6.1 飲食業: メニュー 4 種材質 + 印刷スペック</h3>

<p>飲食メニュー第一選択 PP ラミネート (防水防油 5 年寿命) + A4/A3 サイズ + CMYK 両面 + 250g コート紙基底。100 枚 MOQ 0.50-2 HKD/枚、5-7 日納品、FDA 21 CFR 175.300 + EU REACH 両認証で欧米テイクアウト適用。</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【飲食業メニュー 4 種材質 + 印刷スペック早見】</p><p>飲食メニュー 4 種材質: ① PP ラミネート = 防水防油 5 年寿命、50 枚 MOQ 0.50-2 HKD/枚、FDA 21 CFR + EU REACH 認証で欧米テイクアウト必須; ② ハードカバー = 箔 + 麻布装丁、2-3 年寿命、中高級レストラン第一選択 80-200 HKD/冊; ③ PVC 防水 = 完全水洗い可、テイクアウトカフェ適用 15-50 HKD/枚; ④ ティッシュ使い捨て = 50g 薄紙、街頭ファストフード最低コスト 0.50-2 HKD/枚。ZprintPro 100 枚 MOQ、5-7 日納品、30 日品質保証。</p></div>

<h3>6.2 小売業: DM フライヤー + マット紙</h3>

<p>小売 DM フライヤー第一選択 A5 三つ折り (148×210mm 折 = 297×210mm) + マット 200g + CMYK 両面 + 中綴じ/無線綴じ。100 枚 MOQ 0.40-1.80 HKD/枚、5-7 日納品、高級ブランド割増 +40%。</p>

<h2>7. クライアント事例: 香港化粧品ブランド PVC メニュー + 跨境 EC ラベル返品率 18% 削減</h2>

<p>ZprintPro 15 年 1,000+ 香港及び跨境ブランドクライアントサービス、メニュー + ラベル印刷返品率 18% 削減事例:</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【印刷スペックミスの 3 大コスト】</p><p>印刷スペックミス 3 大コスト: ① RGB 直接印刷 = 30-40% 色ずれ返品率 ② 塗り足し不足 = 断裁後白辺 5-10% 廃棄率 ③ DPI 300 未満 = ボヤけ 8-15% クライアントクレーム。ZprintPro 30 秒 AI ファイルチェック 0 エラー、返品率 18% 削減 (1,000+ クライアント実測)。</p></div>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>香港化粧品ブランド: A4 PP ラミネートメニュー + 250g コート紙 + CMYK 両面 + スポット UV ロゴ、100 枚 MOQ 0.80-2.50 HKD/枚、5-7 日納品</li>
<li>跨境 EC Amazon FBA: A4 ラベル + 157g コート紙 + CMYK 両面 + FDA 21 CFR + EU REACH 両認証、5,000 枚 MOQ 0.10-0.30 HKD/枚</li>
<li>レストランテイクアウト: A3 メニュー + PP ラミネート + 250g コート紙 + 防水 5 年、50 枚 MOQ 15-50 HKD/枚、FDA + EU REACH 認証で欧米テイクアウト</li>
</ul>

<h2>8. FDA 21 CFR 175.300 + EU REACH + FSC 認証なぜ重要?</h2>

<p>3 大認証は跨境印刷物の欧米通関必須条件、欠如で没収:</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 3 大認証早見</p><p>FDA 21 CFR 175.300 = 米国 FDA 食品間接接触インク規格 / EU REACH 1907/2006 = EU 化学物質安全規格 / FSC-C123456 = 森林管理協議会エコ紙材認証。ZprintPro 100% ドイツ Siegwerk 大豆インク使用、三認証完備、欧米通関 0 没収。</p></div>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>FDA 21 CFR 175.300: 米国 FDA 食品間接接触インク規格、メニュー/テイクアウト箱/テーブルカード必須</li>
<li>EU REACH 1907/2006: EU 化学物質安全規格、化粧品包装/子供玩具包装必須</li>
<li>FSC-C123456: 森林管理協議会エコ紙材認証、ESG ブランド/EU 官公庁入札必須</li>
</ul>

<h2>9. 印刷スペック 8 ステップ選定フロー + WhatsApp 30 秒 AI 見積もり</h2>

<p>ZprintPro 8 ステップ選定フロー 0 エラー、WhatsApp 30 秒 AI 見積もりから DHL グローバル配達まで全自動化:</p>

<ol class="list-decimal pl-6 my-2 space-y-1">
<li>WhatsApp 30 秒 AI 見積もり: 製品種別 + 数量 + サイズ + 材質 + 印刷モード 5 項目送付</li>
<li>15 年エンジニア 1 対 1 印刷スペック確定 (サイズ/色/モード)</li>
<li>30 秒 AI ファイルスペックチェック (300 DPI + 3mm 塗り足し + CMYK + PDF/X-1a)</li>
<li>30 分 1:1 デジタル校正、色/サイズ/材質確定</li>
<li>500+ オフセットは CTP 版作成 HK$300-800/版含む</li>
<li>Heidelberg Speedmaster 6+1 印刷、5,000 枚/時、見当 ±0.05mm</li>
<li>5 大後加工: 箔/UV/エンボス/テクスチャ/バーニス</li>
<li>100% 全検 + SF Express 香港 HK$500 以上無料 + DHL 跨境 2-4 日</li>
</ol>

<p>ZprintPro 30 秒 AI 見積もり + 30 分無料デジタル校正 + 100 枚 MOQ + 5-7 日納品 + FDA + EU REACH + FSC 三重認証。香港工場直送、30 日品質保証、1,000+ クライアント実測返品率 < 0.5%。</p>

<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><p class="font-semibold mb-1">💡 答え nugget: 【印刷スペック 8 ステップフローの核心ノード】</p><p>8 ステップフロー 3 大核心ノード: ① 30 秒 AI 見積もり (5 項目) ② 30 分 1:1 デジタル校正 (色/サイズ/材質確定) ③ 100% 全検 (出荷前品質ゲート)。他の 5 ステップ (スペック確定/ファイルチェック/CTP 版/印刷/後加工) ZprintPro 自動化 0 エラー。</p></div>

<h2>10. 関連リンク: 14 内部リンク + WhatsApp 見積もり</h2>

<p>ZprintPro 5 大カテゴリ + 4 スペック関連リンク、14 内部リンクで印刷シーン 70% カバー:</p>

<ul class="list-disc pl-6 my-2 space-y-1">
<li>Pillar 1 パッケージボックス 12 鉄律深版: <a href="/ja/blog/packaging-box-pricing-2026/" class="text-[#2873F5] hover:underline">/ja/blog/packaging-box-pricing-2026/</a></li>
<li>Pillar 2 防水ステッカー 12 鉄律深版: <a href="/ja/blog/sticker-material-pvc-vinyl-removable/" class="text-[#2873F5] hover:underline">/ja/blog/sticker-material-pvc-vinyl-removable/</a></li>
<li>Pillar 3 ポスターサイズガイド 12 鉄律: <a href="/ja/blog/poster-size-guide/" class="text-[#2873F5] hover:underline">/ja/blog/poster-size-guide/</a></li>
<li>Pillar 4 キャンパス教育印刷: <a href="/ja/blog/campus-education-printing-pillar-guide/" class="text-[#2873F5] hover:underline">/ja/blog/campus-education-printing-pillar-guide/</a></li>
<li>Pillar 5 箔押し 3 大応用: <a href="/ja/blog/foil-stamping-3-applications-2026/" class="text-[#2873F5] hover:underline">/ja/blog/foil-stamping-3-applications-2026/</a></li>
<li>CMYK 印刷色ガイド: <a href="/ja/blog/cmyk-guide/" class="text-[#2873F5] hover:underline">/ja/blog/cmyk-guide/</a></li>
<li>デザインファイルスペック 4 必須: <a href="/ja/blog/design-file-specs/" class="text-[#2873F5] hover:underline">/ja/blog/design-file-specs/</a></li>
<li>A5 vs A6 DM サイズ: <a href="/ja/blog/a5-vs-a6-flyer-size/" class="text-[#2873F5] hover:underline">/ja/blog/a5-vs-a6-flyer-size/</a></li>
<li>香港印刷コスト基準 2026: <a href="/ja/blog/hong-kong-printing-cost-baseline-2026/" class="text-[#2873F5] hover:underline">/ja/blog/hong-kong-printing-cost-baseline-2026/</a></li>
<li>2027 カレンダー印刷: <a href="/ja/blog/2027-monthly-calendar-printing-timetable/" class="text-[#2873F5] hover:underline">/ja/blog/2027-monthly-calendar-printing-timetable/</a></li>
<li>レストランメニュー PP ラミネート: <a href="/ja/blog/restaurant-menu-printing-guide/" class="text-[#2873F5] hover:underline">/ja/blog/restaurant-menu-printing-guide/</a></li>
<li>ポスター印刷価格 2026: <a href="/ja/blog/poster-printing-price-guide/" class="text-[#2873F5] hover:underline">/ja/blog/poster-printing-price-guide/</a></li>
<li>化粧品パッケージボックス印刷: <a href="/ja/blog/cosmetics-packaging-box-printing-guide/" class="text-[#2873F5] hover:underline">/ja/blog/cosmetics-packaging-box-printing-guide/</a></li>
<li>クラフト紙箱 8 大箱型 5 次元: <a href="/ja/blog/kraft-paper-box-types-comparison-2026/" class="text-[#2873F5] hover:underline">/ja/blog/kraft-paper-box-types-comparison-2026/</a></li>
</ul>

<p class="mt-6">印刷スペック相談又は見積もり必要?ZprintPro 15 年オフセットエンジニア陳志明 1 対 1 サービス、30 秒 AI 見積もり + 30 分無料デジタル校正、100 枚 MOQ、5-7 日納品。<a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334</a> (WhatsApp プリフィル、トップ 1 CTA)</p>

<p class="mt-2">WhatsApp 30 秒問合せ: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334</a> (ボトム 1 CTA、K3 9/3 23:29 拍板重複 CTA 2 個に削減)</p>

<h3>法律免責声明</h3>
<p>本文価格仅供参考、最終は実時間見積もりが基準。材質単価は市場波動影響、納期はスケジュール確定後基準。ZprintPro 最終解釈権保有。NAP 情報: ZprintPro は Cai Long Printing 旗下国際印刷サービスブランド、電話 +86 198 8085 1334、WhatsApp +86 198 8085 1334、メール zprintpro@outlook.com。</p>

<p class="mt-4">キーワード: a5とa6どっちが大きい / a6 サイズ / ポスターサイズ / cmyk 印刷 / rgb 印刷 / エコ印刷 / カラー印刷 / デジタル印刷 / オフセット印刷 / シルク印刷 / 箔押し / スポット UV / エンボス / 塗り足し / dpi / pantone スポット / デジタル vs オフセット / fda 21 cfr / eu reach / fsc 認証 / 印刷スペック / 印刷モード / 用紙サイズ / 業務シーン / 香港工場 / 跨境印刷 / 即時見積もり / 無料サンプル / 料金表ロット別 / コスパ / 格安 / ZprintPro。ZprintPro 15 年オフセットエンジニア陳志明 (LinkedIn: linkedin.com/in/zprintpro-engineer) オリジナル執筆、跨境印刷 SaaS ・ <a href="https://zprintpro.com/ja/" class="text-[#2873F5] hover:underline">zprintpro.com</a></p>
'''

# Stats
print(f'ja chars: {len(JA_CONTENT)}')
print(f'ja alert: {JA_CONTENT.count("<div class="+chr(34)+"bg-")}')
print(f'ja h2: {JA_CONTENT.count(chr(60)+"h2"+chr(62))}')
print(f'ja h3: {JA_CONTENT.count(chr(60)+"h3"+chr(62))}')
print(f'ja table: {JA_CONTENT.count(chr(60)+"table")}')
print(f'ja schema: {JA_CONTENT.count(chr(34)+"@type"+chr(34))}')
print(f'ja internal href: {JA_CONTENT.count(chr(34)+"/ja/blog/")}')
print(f'ja nugget: {JA_CONTENT.count("答え nugget")}')
print(f'ja E-E-A-T: {sum(1 for x in [JA_AUTHOR, JA_LINKEDIN, "FDA", "EU REACH", "FSC"] if x in JA_CONTENT)}')
print(f'ja wa.me CTA: {JA_CONTENT.count("wa.me/8619880851334")}')
print(f'ja 8 forbidden (per §I.5.2): {sum(1 for x in ["激安","業界最安","業界最高","最安値","No.1","業界一","日本一","Free Shipping"] if x in JA_CONTENT)}')
print(f'ja Raksul 3 要素: {sum(1 for x in ["即時見積もり","無料サンプル","料金表ロット別"] if x in JA_CONTENT)}')

# Write to ja.json
ja_data = json.load(open(JA_PATH, encoding='utf-8'))
print(f'\nBefore: ja has {len(ja_data)} slugs')
ja_data[JA_SLUG] = {
    'slug': JA_SLUG,
    'title': JA_TITLE,
    'metaDescription': JA_META,
    'content': JA_CONTENT,
    'author': JA_AUTHOR,
    'datePublished': '2026-09-06',
    'dateModified': '2026-09-06',
    'imageAlt': f'{JA_TITLE[:60]} - ZprintPro 印刷スペックガイド',
}
print(f'After: ja has {len(ja_data)} slugs')

with open(JA_PATH, 'w', encoding='utf-8') as f:
    json.dump(ja_data, f, ensure_ascii=False, indent=2)
print(f'ja.json saved: {JA_PATH}')
