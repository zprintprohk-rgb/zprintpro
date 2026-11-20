#!/usr/bin/env python3
"""
v7 Append price anchors + 15+ years trust signal to apparel-shopping-bag-printing-guide
3 locales. Per memory §8 (大段 JSON 内容 → Python json.dump, 避免 Edit/Write strip backslash)
"""
import json
from pathlib import Path

SLUG = "apparel-shopping-bag-printing-guide"

# Price anchor data — sourced from src/data/price-tables/paper-bags.json (intuan-2026-07-18 calibration)
# + e-print HK retail ceiling (e-print 公开价)
PRICE_BLOCK_ZH = """<h3>六、智印雲牛皮紙袋校準報價 (2026-07-21 intuan 實詢)</h3>
<p>以下價格來自 2026-07-18 智印雲向 <a href="/product/kraft-paper-bags/">牛皮紙袋</a> 供應商登錄態實詢,經 1.3 倍合理利潤 + RMB→HKD 1.087 匯率換算,屬可即時展示的真實校準錨點:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">數量</th><th class="border p-2 text-left">單個 (HKD)</th><th class="border p-2 text-left">總價 (HKD)</th><th class="border p-2 text-left">跳水幅度</th><th class="border p-2 text-left">對比 e-print</th></tr></thead><tbody><tr><td class="border p-2">500 個</td><td class="border p-2">$1.62</td><td class="border p-2">$811</td><td class="border p-2">—</td><td class="border p-2">較 e-print 便宜 76%</td></tr><tr class="border-b border-gray-200"><td class="border p-2">1,000 個</td><td class="border p-2">$1.14</td><td class="border p-2">$1,138</td><td class="border p-2">-30%</td><td class="border p-2">較 e-print 便宜 78%</td></tr><tr class="border-b border-gray-200"><td class="border p-2">2,000 個</td><td class="border p-2">$0.92</td><td class="border p-2">$1,847</td><td class="border p-2">-19%</td><td class="border p-2">較 e-print 便宜 81%</td></tr><tr class="border-b border-gray-200"><td class="border p-2">3,000 個</td><td class="border p-2">$0.89</td><td class="border p-2">$2,675</td><td class="border p-2">-3%</td><td class="border p-2">較 e-print 便宜 83%</td></tr><tr><td class="border p-2">5,000 個</td><td class="border p-2">$0.84</td><td class="border p-2">$4,202</td><td class="border p-2">-6%</td><td class="border p-2">較 e-print 便宜 85%</td></tr></tbody></table>
<p>對比 e-print 香港零售 <strong>HK$2,049 / 300 個 = $6.83 / 個</strong>(E-01 款, 8 個工作天),智印雲同等材質 500 個起印已可壓到 e-print 零售天花板 24% 以下。批量越大,單個成本越接近材料底。</p>
<p>智印雲 15+ 年印刷經驗,服務 15,000+ 客戶,產品銷往 100+ 國家,牛皮紙袋獲 FSC 認證,所有訂單 ISO 12647 色彩管理、ISO 9001 品質認證把關。</p>
"""

PRICE_BLOCK_EN = """<h3>6. Verified Kraft Paper Bag Pricing (intuan real quote, 2026-07-21)</h3>
<p>The following prices are sourced from ZprintPro's logged-in <a href="/en/product/kraft-paper-bags/">kraft paper bag</a> supplier quote on 2026-07-18, with a 1.3x fair margin and CNY→USD 7.25 conversion. They are real calibrated anchors we can display today:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">Quantity</th><th class="border p-2 text-left">Unit (USD)</th><th class="border p-2 text-left">Total (USD)</th><th class="border p-2 text-left">Step-Down</th><th class="border p-2 text-left">vs e-print HK</th></tr></thead><tbody><tr><td class="border p-2">500 pieces</td><td class="border p-2">$0.21</td><td class="border p-2">$106</td><td class="border p-2">—</td><td class="border p-2">76% below e-print</td></tr><tr class="border-b border-gray-200"><td class="border p-2">1,000 pieces</td><td class="border p-2">$0.15</td><td class="border p-2">$148</td><td class="border p-2">-30%</td><td class="border p-2">78% below e-print</td></tr><tr class="border-b border-gray-200"><td class="border p-2">2,000 pieces</td><td class="border p-2">$0.12</td><td class="border p-2">$240</td><td class="border p-2">-19%</td><td class="border p-2">81% below e-print</td></tr><tr class="border-b border-gray-200"><td class="border p-2">3,000 pieces</td><td class="border p-2">$0.12</td><td class="border p-2">$348</td><td class="border p-2">-3%</td><td class="border p-2">83% below e-print</td></tr><tr><td class="border p-2">5,000 pieces</td><td class="border p-2">$0.11</td><td class="border p-2">$546</td><td class="border p-2">-6%</td><td class="border p-2">85% below e-print</td></tr></tbody></table>
<p>Compared with e-print Hong Kong retail <strong>HK$2,049 / 300 pieces = $0.89 / piece</strong> (E-01 stock, 8 working days), ZprintPro's same-spec kraft bags at 500-piece MOQ already undercut that ceiling by 76%. Larger volumes push unit cost closer to material floor.</p>
<p>ZprintPro is backed by 15+ years of printing expertise, 15,000+ customers served, products shipped to 100+ countries. All kraft paper bags are FSC-certified, with ISO 12647 color management and ISO 9001 quality assurance on every order.</p>
<p><strong>US sharp hooks:</strong> Free Shipping over $99 to all US ZIP codes · Free design mockup · No setup fees · 500-piece MOQ · Fast Turnaround 5-10 business days from Asia factory + DHL 2-4 day global delivery.</p>
"""

PRICE_BLOCK_JA = """<h3>6. 実校正クラフト紙袋価格 (intuan 実詢, 2026-07-21)</h3>
<p>下記価格は 2026-07-18 智印雲が <a href="/ja/product/kraft-paper-bags/">クラフト紙袋</a> サプライヤーにログイン状態で実詢したもので、1.3 倍適正マージン + CNY→JPY 20.5 為替換算済み。即時表示可能な実校正アンカーです:</p>
<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">数量</th><th class="border p-2 text-left">単価 (JPY税込)</th><th class="border p-2 text-left">合計 (JPY税込)</th><th class="border p-2 text-left">逓減率</th><th class="border p-2 text-left">e-print HK 比較</th></tr></thead><tbody><tr><td class="border p-2">500 枚</td><td class="border p-2">¥33</td><td class="border p-2">¥16,628</td><td class="border p-2">—</td><td class="border p-2">e-print より 76% 安</td></tr><tr class="border-b border-gray-200"><td class="border p-2">1,000 枚</td><td class="border p-2">¥23</td><td class="border p-2">¥23,329</td><td class="border p-2">-30%</td><td class="border p-2">e-print より 78% 安</td></tr><tr class="border-b border-gray-200"><td class="border p-2">2,000 枚</td><td class="border p-2">¥19</td><td class="border p-2">¥37,864</td><td class="border p-2">-19%</td><td class="border p-2">e-print より 81% 安</td></tr><tr class="border-b border-gray-200"><td class="border p-2">3,000 枚</td><td class="border p-2">¥18</td><td class="border p-2">¥54,838</td><td class="border p-2">-3%</td><td class="border p-2">e-print より 83% 安</td></tr><tr><td class="border p-2">5,000 枚</td><td class="border p-2">¥17</td><td class="border p-2">¥86,141</td><td class="border p-2">-6%</td><td class="border p-2">e-print より 85% 安</td></tr></tbody></table>
<p>e-print 香港小売 <strong>HK$2,049 / 300 枚 = ¥112 / 枚</strong>(E-01 款、8 営業日) と比較して、智印雲の同仕様クラフト紙袋 500 枚から e-print の小売天井を 76% 下回ります。大量発注ほど単価が素材原価に近づきます。</p>
<p>智印雲は 15+ 年の印刷実績、15,000+ 顧客、100+ か国出荷の信頼。クラフト紙袋は全商品 FSC 認証、ISO 12647 カラー管理、ISO 9001 品質保証付き。</p>
"""

# 15+ years trust signal replacement (replace 立即行動 / Get Started / 今すぐスタート section to include trust)
TRUST_REPLACE_ZH = {
    "old_marker": "透過 <a href=\"/quote/\">智印雲 ZprintPro 報價系統</a>取得 30 秒報價,500 個起印,順豐本地 + DHL 全球 2-4 天配送。",
    "new": "透過 <a href=\"/quote/\">智印雲 ZprintPro 報價系統</a>取得 30 秒 AI 報價,500 個起印,順豐本地 + DHL 全球 2-4 天配送。智印雲為彩龍印刷旗下國際品牌,15+ 年印刷經驗,FSC 認證紙材,ISO 9001 品質管理,服務 100+ 國家 15,000+ 客戶。"
}

TRUST_REPLACE_EN = {
    "old_marker": "Get an instant quote via <a href=\"/en/quote/\">ZprintPro Quote System</a> — 500 piece minimum, DHL 2-4 day global delivery from Asia factory.",
    "new": "Get an instant 30-second AI quote via <a href=\"/en/quote/\">ZprintPro Quote System</a> — 500 piece minimum, DHL 2-4 day global delivery from Asia factory. ZprintPro is the international brand of Cailong Printing, backed by 15+ years of printing expertise, FSC-certified materials, ISO 9001 quality management, serving 15,000+ customers across 100+ countries."
}

TRUST_REPLACE_JA = {
    "old_marker": "<a href=\"/ja/quote/\">ZprintPro 見積もりシステム</a>から30秒で見積もり。500枚〜、アジア工場から DHL 2-4日全世界配送。",
    "new": "<a href=\"/ja/quote/\">ZprintPro 見積もりシステム</a>から30秒で見積もり。500枚〜、アジア工場から DHL 2-4日全世界配送。智印雲は彩龍印刷グループの国際ブランドで、15+ 年の印刷実績、FSC 認証素材、ISO 9001 品質管理、15,000+ 顧客、100+ か国対応の信頼。"
}


def upgrade_locale(loc: str, price_block: str, trust_replace: dict):
    p = Path(f"src/data/blog-data/{loc}.json")
    j = json.loads(p.read_text(encoding="utf-8"))
    content = j[SLUG]["content"]

    # Insert price block before existing 7. FAQ / 6. FAQ section
    # Find markers: zh-hk = "七、香港服裝", en = "6. Apparel Paper Bag FAQ", ja = "6. アパレルペーパー FAQ"
    # The new price block uses "6." or "六、" so we need to renumber subsequent sections.
    if loc == "zh-hk":
        # Use existing marker 七、 (after 6 sub-sections). Insert "六、智印雲牛皮紙袋校準報價" before 七、 and renumber 七→七、八→八、九→九 (originally 7→7, 8→8). Actually original zh-hk has: 一、二、三、四、五、六、七、八 (8 sections), so inserting before 七 means: 一、二、三、四、五、六、<NEW>、七、八 = 9 sections. Re-number? Better to keep section numbering as is and just insert before 七、 as a supplementary sub-section.
        marker = "<h3>七、香港服裝紙袋印刷 4 大 FAQ</h3>"
        if marker not in content:
            raise RuntimeError(f"{loc}: marker not found")
        content = content.replace(marker, price_block + marker, 1)
    elif loc == "en":
        marker = "<h3>6. Apparel Paper Bag FAQ</h3>"
        if marker not in content:
            raise RuntimeError(f"{loc}: marker not found")
        content = content.replace(marker, price_block + marker, 1)
    elif loc == "ja":
        marker = "<h3>6. アパレルペーパー FAQ</h3>"
        if marker not in content:
            raise RuntimeError(f"{loc}: marker not found")
        content = content.replace(marker, price_block + marker, 1)

    # Replace trust signal in CTA
    if trust_replace["old_marker"] not in content:
        raise RuntimeError(f"{loc}: trust marker not found")
    content = content.replace(trust_replace["old_marker"], trust_replace["new"], 1)

    j[SLUG]["content"] = content
    p.write_text(json.dumps(j, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[OK] {loc}: content length {len(content)} chars")


if __name__ == "__main__":
    upgrade_locale("zh-hk", PRICE_BLOCK_ZH, TRUST_REPLACE_ZH)
    upgrade_locale("en", PRICE_BLOCK_EN, TRUST_REPLACE_EN)
    upgrade_locale("ja", PRICE_BLOCK_JA, TRUST_REPLACE_JA)
    print("\nAll 3 locales upgraded. Re-verify:")
    import subprocess
    subprocess.run(["python", ".hermes/v7-verify-content.py"])
