# -*- coding: utf-8 -*-
"""B8: paper-bag-printing-guide zh — 假价修正 + 7 段补齐 (5->12 h2)"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "zh-hk.json")
raw = io.open(P, encoding="utf-8", newline="").read()
j = json.loads(raw)
post = j["paper-bag-printing-guide"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

# 1) 假价修正
old_price = "牛皮紙袋訂製</a> — 環保首選, HK$1.5/個起"
new_price = "牛皮紙袋訂製</a> — 環保首選, HK$3-8/個"
assert c.count(old_price) == 1, "price ctx match " + str(c.count(old_price))
c = c.replace(old_price, new_price)

SEC = """<h2>紙袋類型點揀：牛皮、白卡、禮品袋分別</h2>
<p>紙袋唔止「一個袋」咁簡單，材質同結構決定成本同觀感。常見四類：</p>
<ul>
<li><strong>牛皮紙袋</strong>：最通用，韌性高、耐撕，適合零售、外賣、活動派發。價格帶 HK$3-8/個。</li>
<li><strong>白卡紙袋</strong>：表面平滑，印刷色彩還原最好，適合美妝、珠寶、精品。價格帶 HK$5-12/個。</li>
<li><strong>禮品紙袋</strong>：加厚紙材＋特種工藝（燙金、UV），配絲帶手挽，適合節慶送禮。價格帶 HK$10-20/個。</li>
<li><strong>環保紙袋</strong>：FSC 認證紙或再生紙，配大豆油墨，適合 ESG 品牌同社企。價格帶 HK$3-8/個。</li>
</ul>
<p>唔肯定邊款啱？可以先睇<a href="/zh-hk/category/paper-bags/">紙袋印刷類目</a>，或者按「裝咩、邊個場合派」兩個問題去揀。</p>

<h2>手挽款式：扭紙繩、棉繩、絲帶、模切</h2>
<p>手挽係紙袋最易被忽略、但最影響手感嘅部分：</p>
<ul>
<li><strong>扭紙繩</strong>：成本最低，顏色可配紙色，適合大量派發。</li>
<li><strong>棉繩</strong>：手感軟、承重好，適合較重的商品（酒、護膚品套裝）。</li>
<li><strong>絲帶</strong>：觀感最高級，多用於禮品袋，成本亦最高。</li>
<li><strong>模切手挽</strong>：直接在紙上開孔，無額外配件，最環保，承重較低。</li>
</ul>
<p>實務上：<strong>承重 2kg 以下用扭紙繩、2-5kg 用棉繩、送禮場景用絲帶</strong>，就已經覆蓋八成需求。手挽位記得加補強紙，否則提幾次就爆口。</p>

<h2>尺寸同承重：三個常用規格</h2>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">規格</th><th class="text-left p-2">尺寸（約）</th><th class="text-left p-2">適合</th></tr></thead><tbody>
<tr><td class="p-2">小號</td><td class="p-2">200×250×90mm</td><td class="p-2">化妝品、首飾、小型禮品</td></tr>
<tr><td class="p-2">中號</td><td class="p-2">260×320×110mm</td><td class="p-2">服裝、書刊、烘焙禮盒</td></tr>
<tr><td class="p-2">大號</td><td class="p-2">320×420×130mm</td><td class="p-2">鞋盒、家品、大量採購</td></tr>
</tbody></table>
<p>尺寸要按「內容物 + 5-10mm 鬆動空間」計，太貼會塞唔入，太大會顯得空。需要特定尺寸可訂製，起印量同標準款一樣。</p>

<h2>印刷工藝：四色、燙金、局部 UV 點配</h2>
<p>紙袋嘅視覺重點通常係「一個大 Logo + 一個主色」，唔需要太多層次。三種最常用工藝：</p>
<ul>
<li><strong>四色 CMYK</strong>：適合有插畫、相片、漸變的設計，成本最低。</li>
<li><strong>燙金／燙銀</strong>：Logo 或品牌字樣用，提升高級感，常用於禮品袋。</li>
<li><strong>局部 UV</strong>：在啞面紙上做亮面圖案，低調但有質感，成本比燙金低。</li>
</ul>
<p>注意：<strong>牛皮紙本身有色底</strong>，淺色或白色油墨印上去會偏色，設計時要用「紙色即底色」的思路，或者先打白墨底。</p>

<h2>起印量同預算：100 個起，點樣慳得更多</h2>
<p>紙袋全部 <strong>100 個起印</strong>。數量越少，單價越高，因為開機、調墨、手挽裝配都係固定成本。想壓低成本有三個方法：</p>
<ol class="list-decimal pl-5 my-4">
<li><strong>用標準尺寸</strong>：唔使另開刀模，直接省一筆。</li>
<li><strong>減少工藝層數</strong>：四色＋一個工藝已經足夠，每加一層都加價。</li>
<li><strong>同一批落單多款</strong>：同一尺寸唔同圖案，可以合併生產，攤薄開機成本。</li>
</ol>
<p>如果只係活動一次性使用，可以考慮 100-300 個；如果係門市長期使用，500-1,000 個會更划算。</p>

<h2>交稿規格：紙袋最容易退稿嘅 4 個位</h2>
<ul>
<li><strong>刀模線冇跟標準</strong>：自訂尺寸要提供刀模線，否則無法排產。</li>
<li><strong>出血不足</strong>：四邊要 3mm 出血，手挽位要預留補強區。</li>
<li><strong>顏色用 RGB</strong>：印刷用 CMYK，尤其品牌色（紅、金）必須對色。</li>
<li><strong>文字太貼邊</strong>：摺位同黏合位要留安全距離，否則摺完會遮字。</li>
</ul>
<p>完整交稿清單可參考<a href="/zh-hk/blog/print-specifications-reference-guide-2026/">印刷規格參考</a>；提交檔案後 1 小時內有免費數碼打稿，確認咗先開印。</p>

<h2>交期同物流：本地與跨境點安排</h2>
<p>標準交期 3-5 個工作天（檔案確認後）。港九新界滿 HK$500 免費順豐；跨境訂單用 DHL，2-4 個工作天到。</p>
<p>紙袋體積大，<strong>運輸成本佔比高</strong>，所以：① 盡量壓平出貨（我方可壓平包裝，到貨後自行成型）；② 大批量可安排直送倉庫；③ 跨境客戶建議預留 1 週緩衝，避免海關查驗耽誤活動檔期。</p>
"""

i = c.find('<h2 id="paper-bag-topic-cluster">')
assert i > 0
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 5 and h1 == 12, f"h2 {h0}->{h1}"
assert "HK$1.5" not in c2

post["content"] = c2
si = raw.find('"paper-bag-printing-guide": {')
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
bp = os.path.join(REPO, ".hermes", "_bak-b8-20261022", "zh-hk.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] B8: {n0} -> {len(c2)}, h2 {h0} -> {h1}")
