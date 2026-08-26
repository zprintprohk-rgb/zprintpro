#!/usr/bin/env python3
"""
v7 Sub-task C: 在 kraft-paper-bags longDescription 末尾加 5 档校准价格表
数据源: src/data/price-tables/paper-bags.json (intuan-2026-07-18)
"""
import re
from pathlib import Path

SRC = Path("src/data/products.ts")
content = SRC.read_text(encoding="utf-8")

# 5 档价格表 (intuan-2026-07-18)
PRICE_TABLE_ZH = """
<h3>5 檔牛皮紙袋校準報價 (intuan 實詢, 2026-07-18)</h3>
<p>以下價格來自智印雲 2026-07-18 向 <a href="/product/kraft-paper-bags/">牛皮紙袋</a> 供應商登錄態實詢 (中號 260x170x250mm / 120g 黃牛皮 / 紙繩或扁繩 / 單色-四色),1.3 倍合理利潤 + RMB→HKD 1.087 換算後的可即時展示真實校準錨點:</p>
<table>
  <thead><tr><th>數量</th><th>單個 (HKD)</th><th>總價 (HKD)</th><th>跳水幅度</th><th>對比 e-print 零售</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>500 個</td><td>$1.62</td><td>$811</td><td>—</td><td>較 e-print 便宜 76%</td></tr>
    <tr class="border-b border-gray-200"><td>1,000 個</td><td>$1.14</td><td>$1,138</td><td>-30%</td><td>較 e-print 便宜 78%</td></tr>
    <tr class="border-b border-gray-200"><td>2,000 個</td><td>$0.92</td><td>$1,847</td><td>-19%</td><td>較 e-print 便宜 81%</td></tr>
    <tr class="border-b border-gray-200"><td>3,000 個</td><td>$0.89</td><td>$2,675</td><td>-3%</td><td>較 e-print 便宜 83%</td></tr>
    <tr><td>5,000 個</td><td>$0.84</td><td>$4,202</td><td>-6%</td><td>較 e-print 便宜 85%</td></tr>
  </tbody>
</table>
<p>對比 e-print 香港零售 <strong>HK$2,049 / 300 個 = $6.83 / 個</strong> (E-01 款, 8 個工作天),智印雲 500 個起印已可壓到 e-print 零售天花板 24% 以下。批量越大,單個成本越接近材料底。智印雲 15+ 年印刷經驗,服務 15,000+ 客戶,產品銷往 100+ 國家,牛皮紙袋獲 FSC 認證,所有訂單 ISO 12647 色彩管理、ISO 9001 品質認證把關。</p>
"""

PRICE_TABLE_EN = """
<h3>5-Tier Kraft Paper Bag Calibrated Pricing (intuan real quote, 2026-07-18)</h3>
<p>The following prices are sourced from ZprintPro's logged-in <a href="/en/product/kraft-paper-bags/">kraft paper bag</a> supplier quote on 2026-07-18 (medium 260x170x250mm / 120g brown kraft / paper or flat rope / 1-4 color print), with a 1.3x fair margin and CNY→USD 7.25 conversion. They are real calibrated anchors we can display today:</p>
<table>
  <thead><tr><th>Quantity</th><th>Unit (USD)</th><th>Total (USD)</th><th>Step-Down</th><th>vs e-print HK Retail</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>500 pieces</td><td>$0.21</td><td>$106</td><td>—</td><td>76% below e-print</td></tr>
    <tr class="border-b border-gray-200"><td>1,000 pieces</td><td>$0.15</td><td>$148</td><td>-30%</td><td>78% below e-print</td></tr>
    <tr class="border-b border-gray-200"><td>2,000 pieces</td><td>$0.12</td><td>$240</td><td>-19%</td><td>81% below e-print</td></tr>
    <tr class="border-b border-gray-200"><td>3,000 pieces</td><td>$0.12</td><td>$348</td><td>-3%</td><td>83% below e-print</td></tr>
    <tr><td>5,000 pieces</td><td>$0.11</td><td>$546</td><td>-6%</td><td>85% below e-print</td></tr>
  </tbody>
</table>
<p>Compared with e-print Hong Kong retail <strong>HK$2,049 / 300 pieces = $0.89 / piece</strong> (E-01 stock, 8 working days), ZprintPro's same-spec kraft bags at 500-piece MOQ already undercut that ceiling by 76%. Larger volumes push unit cost closer to material floor. ZprintPro is backed by 15+ years of printing expertise, 15,000+ customers served, products shipped to 100+ countries. All kraft paper bags are FSC-certified, with ISO 12647 color management and ISO 9001 quality assurance on every order.</p>
<p><strong>US sharp hooks:</strong> Free Shipping over $99 to all US ZIP codes · Free design mockup · No setup fees · 500-piece MOQ · Fast Turnaround 5-10 business days from Asia factory + DHL 2-4 day global delivery.</p>
"""

PRICE_TABLE_JA = """
<h3>5 段階クラフト紙袋校正価格 (intuan 実詢, 2026-07-18)</h3>
<p>下記価格は 2026-07-18 智印雲が <a href="/ja/product/kraft-paper-bags/">クラフト紙袋</a> サプライヤーにログイン状態で実詢したもの(中サイズ 260x170x250mm / 120g クラフト / 紙紐または平紐 / 1-4 色印刷)、1.3 倍適正マージン + CNY→JPY 20.5 為替換算済み。即時表示可能な実校正アンカーです:</p>
<table>
  <thead><tr><th>数量</th><th>単価 (JPY税込)</th><th>合計 (JPY税込)</th><th>逓減率</th><th>e-print HK 比較</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>500 枚</td><td>¥33</td><td>¥16,628</td><td>—</td><td>e-print より 76% 安</td></tr>
    <tr class="border-b border-gray-200"><td>1,000 枚</td><td>¥23</td><td>¥23,329</td><td>-30%</td><td>e-print より 78% 安</td></tr>
    <tr class="border-b border-gray-200"><td>2,000 枚</td><td>¥19</td><td>¥37,864</td><td>-19%</td><td>e-print より 81% 安</td></tr>
    <tr class="border-b border-gray-200"><td>3,000 枚</td><td>¥18</td><td>¥54,838</td><td>-3%</td><td>e-print より 83% 安</td></tr>
    <tr><td>5,000 枚</td><td>¥17</td><td>¥86,141</td><td>-6%</td><td>e-print より 85% 安</td></tr>
  </tbody>
</table>
<p>e-print 香港小売 <strong>HK$2,049 / 300 枚 = ¥112 / 枚</strong> (E-01 款、8 営業日) と比較して、智印雲の同仕様クラフト紙袋 500 枚から e-print の小売天井を 76% 下回ります。大量発注ほど単価が素材原価に近づきます。智印雲は 15+ 年の印刷実績、15,000+ 顧客、100+ か国出荷の信頼。クラフト紙袋は全商品 FSC 認証、ISO 12647 カラー管理、ISO 9001 品質保証付き。</p>
"""

# Find the kraft-paper-bags block and inject price tables before FAQ header in longDescription
def inject_into_long_desc(content, field_name, price_table):
    """Inject price_table before the <h3>常見問題 (FAQ)</h3> inside the given longDescription field"""
    # Find the field: longDescription: `...`  OR  longDescriptionEn: `...`
    pattern = rf"({field_name}: `[\s\S]*?)(<h3>常見問題 \(FAQ\)</h3>)"
    m = re.search(pattern, content)
    if not m:
        # try en
        pattern = rf"({field_name}: `[\s\S]*?)(<h3>Frequently Asked Questions</h3>)"
        m = re.search(pattern, content)
    if not m:
        # try ja
        pattern = rf"({field_name}: `[\s\S]*?)(<h3>よくあるご質問 \(FAQ\)</h3>)"
        m = re.search(pattern, content)
    if not m:
        print(f"!! {field_name}: FAQ header not found")
        return content
    new = m.group(1) + price_table + m.group(2)
    content = content.replace(m.group(0), new, 1)
    print(f"[OK] {field_name}: injected {len(price_table)} chars price table")
    return content

content = inject_into_long_desc(content, "longDescription", PRICE_TABLE_ZH)
content = inject_into_long_desc(content, "longDescriptionEn", PRICE_TABLE_EN)
content = inject_into_long_desc(content, "longDescriptionJa", PRICE_TABLE_JA)

SRC.write_text(content, encoding="utf-8")
print(f"\nFile size: {len(content)} chars")
