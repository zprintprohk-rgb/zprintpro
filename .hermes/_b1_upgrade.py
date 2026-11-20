# -*- coding: utf-8 -*-
"""B1: new-year-card-printing-2027-guide ja — 11->12 段 (サイズと枚数設計)"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "ja.json")
raw = io.open(P, encoding="utf-8", newline="").read()
j = json.loads(raw)
post = j["new-year-card-printing-2027-guide"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>サイズと枚数の決め方：10枚から始める</h2>
<p>年賀状は<strong>はがきサイズ（100×148mm）</strong>が標準で、封筒に入れずにそのまま郵送できます。角形2号などの封筒入りにする場合は、カードタイプを選ぶと折れずに届きます。料金は<strong>10枚から</strong>発注でき、単価は ¥20 前後から（紙・箔押し・厚紙などの仕様で変動）。</p>
<ul>
<li><strong>10-30枚</strong>：個人・少人数の取引先。まず紙質と印刷の仕上がりを確認したい場合。</li>
<li><strong>50-100枚</strong>：小規模事業所、店舗のお客様向け。社名とロゴを入れるならこの帯が現実的。</li>
<li><strong>100-300枚</strong>：取引先が多い法人、複数拠点で配る場合。版代が分散して単価が下がります。</li>
<li><strong>300枚以上</strong>：顧客名簿ベースで一斉送付する場合。宛名印刷や分納の相談も同時に。</li>
</ul>
<p>枚数の目安は「<strong>取引先数 × 1.2 ＋ 社内用 20枚</strong>」。年賀状は毎年同じ相手に出すものなので、去年の枚数に新規取引先を足すのがいちばん外さない方法です。なお、喪中はがきが届いた相手には年賀状を出さないのが礼儀なので、11月中にリストを見直しておくと安全です。</p>
"""

i = c.find("<h2>よくあるご質問</h2>")
assert i > 0, "FAQ anchor"
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 11 and h1 == 12, f"h2 {h0}->{h1}"
for bad in ["份", "GSC", "imps"]:
    assert bad not in SEC

post["content"] = c2
si = raw.find('"new-year-card-printing-2027-guide": {')
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
bp = os.path.join(REPO, ".hermes", "_bak-b1-20261022", "ja.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] B1: {n0} -> {len(c2)}, h2 {h0} -> {h1}")
