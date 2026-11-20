# -*- coding: utf-8 -*-
"""B4 升级: cny-2027-red-packet zh-hk 7 -> 12 段（尺寸/工藝/流程/數量/配套）"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "zh-hk.json")
raw = io.open(P, encoding="utf-8", newline="").read()
j = json.loads(raw)
post = j["cny-2027-red-packet-printing-guide"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>利是封尺寸同規格：標準、加大、迷你點揀</h2>
<p>利是封唔止一款尺寸。揀錯尺寸，鈔票摺兩摺都塞唔入，或者派出去感覺「縮水」。常見三種規格：</p>
<ul>
<li><strong>標準 90×170mm</strong>：最通用，可平放一張紙幣，銀行、保險、地產公司派發都用呢個尺寸。</li>
<li><strong>加大約 110×200mm</strong>：比標準大約三至五成，適合放多張紙幣、禮券或者現金卡，企業週年、婚宴回禮常用。</li>
<li><strong>迷你／卡裝尺寸</strong>：配合禮品卡、現金券或者壓歲錢，適合零售換領同活動小禮。</li>
</ul>
<p>印刷前要留意：<strong>加大尺寸嘅紙材要夠挺</strong>，否則裝多張紙幣會變形；迷你尺寸嘅燙金圖案要縮細設計，線條太密會糊。想直接睇規格同價格，可去<a href="/zh-hk/category/red-packets/">利是封印刷類目</a>，或者單獨睇<a href="/zh-hk/product/large-red-packets/">加大利是封</a>。</p>

<h2>燙金、浮雕、擊凸：三種工藝分別在邊</h2>
<p>利是封嘅高級感，八成來自工藝，唔係來自印刷色數。三種最常用：</p>
<ul>
<li><strong>燙金／燙銀</strong>：金屬箔壓印，光線下有鏡面反光，最快令人感覺「貴」。適合品牌字樣、生肖圖案。價格帶 HK$1.10-4.80/個。</li>
<li><strong>浮雕（壓凹／壓凸）</strong>：用模具壓出立體紋理，手指摸得到凹凸，適合傳統花紋、剪紙圖案。價格帶 HK$3.00-9.50/個，屬工藝最重嘅一款。</li>
<li><strong>局部 UV</strong>：光油只上局部圖案，做出「亮面 vs 啞面」對比，成本比燙金低，適合大量派發。</li>
</ul>
<p>實務建議：<strong>企業 Logo 用燙金、底紋用浮雕、其餘用局部 UV</strong>，一個利是封就有三層質感，而成本仍然可控。工藝可以混搭，落單時講清楚邊個位用邊種就得。</p>

<h2>企業訂製流程：由設計到收貨 5 步</h2>
<ol class="list-decimal pl-5 my-4">
<li><strong>確認規格同數量</strong>：尺寸、工藝、數量（100 個起），同時講清楚派發對象（客戶／員工／VIP）。</li>
<li><strong>提交設計或委託設計</strong>：有現成 AI／PDF 檔可直接入稿；無設計檔可由我方出初稿，Logo 同品牌色要提供原始檔。</li>
<li><strong>免費數碼打稿</strong>：1 小時內出稿，確認版面、燙金位置同色值。這一步係唯一可以改嘅時間點，之後就上機。</li>
<li><strong>生產</strong>：標準交期 5-7 個工作天；旺季（農曆新年前 3 週）建議提早 3-4 週落單。</li>
<li><strong>交貨</strong>：港九新界滿 HK$500 免費順豐；跨境可用 DHL，2-4 個工作天到。</li>
</ol>
<p>如果公司內部要審批（品牌部、採購部、管理層），記得預留 3-5 個工作天走流程——旺季最常見嘅延誤唔係印刷廠，而係內部簽核。</p>

<h2>數量規劃：100、300、500、1,000 個點分配</h2>
<p>利是封係「派唔完可以留明年」嘅品項，但仍然建議按實際派發人數規劃，避免積壓：</p>
<ul>
<li><strong>100-300 個</strong>：中小企、診所、補習社，派客戶同員工剛剛好，也是試版最常用嘅數量。</li>
<li><strong>500 個</strong>：有門市、有穩定客流的零售同餐飲品牌，預留前台派發同活動使用。</li>
<li><strong>1,000 個以上</strong>：銀行、保險、地產、連鎖品牌，配合分行派發同客戶郵寄。</li>
</ul>
<p>另外要計「損耗」：運送壓皺、派發時寫錯名、內部同事自用，通常要預留 5-10%。100 個嘅訂單，實際可派大約 90-95 個。</p>

<h2>配套派發：利是封加貼紙、紙袋一次過落單</h2>
<p>新年檔期唔止利是封。企業通常同時要：</p>
<ul>
<li><strong>封口貼紙</strong>：圓形燙金貼，貼在利是封背面封口，比用膠水整齊，亦可以印上「福」字或年份。</li>
<li><strong>紙袋</strong>：派利是加禮品時用，同一批設計語言（同色系、同 Logo 位置）會令整套感覺完整。</li>
<li><strong>賀卡／揮春</strong>：VIP 客戶成套寄出，提升開箱體驗。</li>
</ul>
<p>同一批落單嘅好處係<strong>一次打稿、一次對色、一次出貨</strong>，唔會出現利是封同紙袋色差。相關品項可睇<a href="/zh-hk/product/paper-bags/">紙袋印刷</a>同<a href="/zh-hk/category/greeting-cards/">賀卡類目</a>，或直接 WhatsApp 講清楚整套需求，我們一次過報價。</p>
"""

i = c.find("<h2>常見問題</h2>")
assert i > 0
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 7 and h1 == 12, f"h2 {h0}->{h1}"
for bad in ["GSC", " pos ", "imps"]:
    assert bad not in SEC

post["content"] = c2
si = raw.find('"cny-2027-red-packet-printing-guide": {')
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
bp = os.path.join(REPO, ".hermes", "_bak-b4-20261022", "zh-hk.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] B4: {n0} -> {len(c2)}, h2 {h0} -> {h1}")
