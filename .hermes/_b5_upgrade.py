# -*- coding: utf-8 -*-
"""B5: corporate-calendar-customization-2027 zh — 7->12 段"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "zh-hk.json")
raw = io.open(P, encoding="utf-8", newline="").read()
j = json.loads(raw)
post = j["corporate-calendar-customization-2027"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>尺寸規格表：座檯曆、掛曆、三角曆實際大細</h2>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">類型</th><th class="text-left p-2">成品尺寸（約）</th><th class="text-left p-2">適合場景</th></tr></thead><tbody>
<tr><td class="p-2">座檯曆（三角）</td><td class="p-2">210×140mm</td><td class="p-2">前台、辦公桌、客戶拜年禮</td></tr>
<tr><td class="p-2">座檯曆（方形）</td><td class="p-2">190×190mm</td><td class="p-2">設計感強的品牌、展會派發</td></tr>
<tr><td class="p-2">掛曆（A3）</td><td class="p-2">297×420mm</td><td class="p-2">店舖、倉庫、辦公室牆面</td></tr>
<tr><td class="p-2">掛曆（A2）</td><td class="p-2">420×594mm</td><td class="p-2">大堂、廠房、遠距離可讀</td></tr>
<tr><td class="p-2">月曆卡</td><td class="p-2">A5 / 信用卡大小</td><td class="p-2">隨信附送、收銀處自取</td></tr>
</tbody></table>
<p>選尺寸的實用原則：<strong>看的人距離多遠，就選多大</strong>。辦公桌 50cm 內用座檯曆；牆上 2m 外用 A2 掛曆。尺寸定錯，之後的設計同成本都會跟著錯。</p>

<h2>掛裝方式：釘裝、線圈、騎馬釘分別</h2>
<ul>
<li><strong>線圈裝（YO 圈）</strong>：可 360 度翻，掛曆最常用，翻頁順手。</li>
<li><strong>騎馬釘</strong>：成本低，適合頁數少的月曆卡或薄掛曆。</li>
<li><strong>三角底座</strong>：座檯曆專用，成型後可站立，底座紙材要夠厚。</li>
<li><strong>掛鉤／雞眼</strong>：牆面懸掛用，需在印刷時預留位置，後加會收額外加工費。</li>
</ul>
<p>掛裝方式會影響報價，因為涉及後道工序。落單前講清楚「掛牆定座檯」，可以避免打完稿才改結構。</p>

<h2>紙材同工藝：用幾克紙、要唔要燙金</h2>
<p>月曆要掛足一年，紙材太薄會捲邊，太厚又會被線圈扯爛。常用配置：</p>
<ul>
<li><strong>內頁</strong>：128-157g 啞粉紙，書寫不易透墨；預算緊可用 105g。</li>
<li><strong>封面／底座</strong>：250-300g 白卡或灰板裱紙，確保站立不變形。</li>
<li><strong>工藝</strong>：封面燙金（品牌字）、局部 UV（生肖圖案）、擊凸（Logo）三者選一至二，成本可控又有質感。</li>
</ul>
<p>如果月曆會寄給海外客戶，建議加<b>啞膜</b>，減少運送途中刮花。</p>

<h2>數量分配：500、1,000、3,000 本點算</h2>
<p>企業月曆 <strong>1 本起印</strong>，價格帶 HK$3-8/本（按尺寸、頁數、紙材而定）。實際採購多數落在三個區間：</p>
<ul>
<li><strong>500 本以下</strong>：中小企、診所、補習社，派客戶＋員工。</li>
<li><strong>500-1,500 本</strong>：有門市或多個業務團隊，需分區派發。</li>
<li><strong>1,500 本以上</strong>：銀行、保險、地產、連鎖品牌，配合分行、VIP 郵寄同展會。</li>
</ul>
<p>計算公式：<strong>客戶數 × 0.6 ＋ 員工數 × 1.2 ＋ 活動用量</strong>，再加 5% 損耗。去年派剩的數量，就是今年可以減的量。</p>

<h2>派發同物流：本地、跨境、郵寄</h2>
<p>月曆體積大、重量輕，運費佔比高，安排得好可以省一筆：</p>
<ul>
<li><strong>本地</strong>：港九新界滿 HK$500 免費順豐；大量可安排送到辦公室或分行。</li>
<li><strong>跨境</strong>：DHL 2-4 個工作天，建議預留 1 週緩衝避開海關查驗。</li>
<li><strong>郵寄給客戶</strong>：可要求分裝（每本獨立包裝），方便直接貼標寄出。</li>
</ul>
<p>另外提醒：月曆忌壓，<strong>運送時要用平放紙箱</strong>，不要直立側放，否則線圈會變形。</p>
"""

i = c.find("<h2>常見問題 FAQ</h2>")
assert i > 0, "FAQ anchor"
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 7 and h1 == 12, f"h2 {h0}->{h1}"
assert "HK$3-8" in c2

post["content"] = c2
si = raw.find('"corporate-calendar-customization-2027": {')
assert si > 0
ci = raw.find('"content"', si)
vi = raw.find(':', ci) + 1
while raw[vi] in ' \t\r\n':
    vi += 1
k = vi + 1
while k < len(raw):
    ch = raw[k]
    if ch == '\\':
        k += 2; continue
    if ch == '"':
        break
    k += 1
out = raw[:vi] + json.dumps(c2, ensure_ascii=False) + raw[k + 1:]
json.loads(out)
bp = os.path.join(REPO, ".hermes", "_bak-b5-20261022", "zh-hk.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] B5: {n0} -> {len(c2)}, h2 {h0} -> {h1}")
