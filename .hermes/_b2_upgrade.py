# -*- coding: utf-8 -*-
"""B2 升级: comiket-printing-prep-guide ja 5 -> 12 段 (締切逆算/部数/データ/搬入/グッズ/3か月/保険)"""
import io, os, json, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "ja.json")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    raw = f.read()
j = json.loads(raw)
post = j["comiket-printing-prep-guide"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>締切カレンダー：入稿日から逆算する</h2>
<p>コミケ 109 は 2026 年 12 月 29 日（火）開幕です。当日に本が手元にある状態を作るには、<strong>開幕日から逆算して入稿日を決める</strong>のがもっとも確実です。標準生産は 5〜7 営業日、国際配送（DHL）は 2〜4 日、コミケ前の特急は 24 時間対応です。この 3 つの数字だけで、次の 3 プランに整理できます。</p>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">プラン</th><th class="text-left p-2">入稿</th><th class="text-left p-2">出荷</th><th class="text-left p-2">会場到着</th><th class="text-left p-2">開幕までの余裕</th></tr></thead><tbody>
<tr><td class="p-2">ゆとり</td><td class="p-2">12/7（月）</td><td class="p-2">12/14〜12/16</td><td class="p-2">12/16〜12/20</td><td class="p-2">9 日以上</td></tr>
<tr><td class="p-2">標準</td><td class="p-2">12/14（月）</td><td class="p-2">12/21〜12/23</td><td class="p-2">12/23〜12/27</td><td class="p-2">2 日</td></tr>
<tr><td class="p-2">特急</td><td class="p-2">12/23（水）</td><td class="p-2">12/24</td><td class="p-2">12/26〜12/28</td><td class="p-2">1 日</td></tr>
</tbody></table>
<p>この表は「入稿＝データ確認完了」を前提にした目安です。校正の往復が必要な場合は、その分を上に足してください。余裕を見るなら 12/7 入稿、どうしても遅れる場合は 12/23 の特急でも間に合いますが、<strong>航空便の遅延や通関で 1 日ずれると当日に間に合わない</strong>ため、特急は最後の手段と考えてください。</p>

<h2>部数の決め方：10・30・50・100 冊の使い分け</h2>
<p>同人誌は <strong>10 冊から</strong>発注できます。初出展で「どれくらい刷るか」は毎回悩むところですが、次の 4 つの目安で決めると迷いません。</p>
<ul>
<li><strong>10〜30 冊</strong>：初出展、新刊の試験販売、知人・交流サークル向け。売れ残りのリスクを最小化したい場合。</li>
<li><strong>30〜50 冊</strong>：既刊があり、既存の読者がついているサークル。昼過ぎまでの頒布を見込む場合。</li>
<li><strong>50〜100 冊</strong>：人気ジャンル、X（旧 Twitter）での告知が伸びた場合。売り切れ＝機会損失を避けたい場合。</li>
<li><strong>100 冊以上</strong>：複数イベント（冬コミ→春の即売会）で頒布する前提。単価が下がるため、保管場所があるなら有利です。</li>
</ul>
<p>迷ったら「昨年の頒布数 × 1.2」を目安にしてください。売り切れは次回への期待を作りますが、欠品で買えなかった読者は戻ってこないこともあります。</p>

<h2>表紙データで差し戻されやすい 5 パターン</h2>
<p>入稿後に止まる原因のほとんどはデータ側です。事前に次の 5 点を確認すると、校正の往復を 1 回減らせます。</p>
<ol class="list-decimal pl-5 my-4">
<li><strong>塗り足し（3mm）がない</strong>：裁ち落としの背景が白く抜けます。表紙は四周 3mm の塗り足しを必ず入れます。</li>
<li><strong>背表紙の幅がページ数と合っていない</strong>：背幅はページ数と用紙の厚みで変わります。表紙と本文を別ファイルにすると計算しやすくなります。</li>
<li><strong>RGB のまま入稿</strong>：印刷は CMYK です。特に蛍光色・鮮やかな青は変換で沈むため、事前に CMYK で確認します。</li>
<li><strong>フォントがアウトライン化されていない</strong>：環境によって字形が変わり、文字化けの原因になります。</li>
<li><strong>解像度不足の画像</strong>：仕上がりサイズで 300dpi 以上が目安です。web 用画像の流用は粗くなります。</li>
</ol>

<h2>当日の搬入と受け取りの動線</h2>
<p>印刷物は会場に直接届けるのではなく、<strong>前日までに手元（自宅・ホテル・倉庫）へ受け取る</strong>のが基本です。会場搬入はサークル入場後に手荷物として持ち込む形になり、主催者の搬入案内に従う必要があります。</p>
<ul>
<li><strong>ホテル受け取り</strong>：前泊する場合、チェックイン日以降に届くよう指定します。ホテルによっては保管期限が短いため、事前確認が必要です。</li>
<li><strong>知人・サークル宛</strong>：当日一緒に搬入する相手がいれば、まとめて受け取ると台車の手配が 1 回で済みます。</li>
<li><strong>会場近くの営業所留め置き</strong>：受け取り時間が読みにくい場合の保険になります。</li>
</ul>
<p>いずれの場合も、<strong>追跡番号を控えて開幕 3 日前までに到着確認</strong>をしてください。到着が遅れている場合は、その時点で WhatsApp で連絡いただければ、代替の配送手配を相談できます。</p>

<h2>グッズの設計：ステッカー・ポスター・タペストリー</h2>
<p>同人誌と一緒に頒布するグッズは、<strong>単価が低く在庫リスクが小さい</strong>ものが中心です。ステッカーは <strong>10 枚から</strong>、ポスターやカード類は <strong>1 部から</strong>発注できます。</p>
<ul>
<li><strong>ステッカー</strong>：防水・耐光の素材を選ぶと、屋外やスマホケースでも長持ちします。会場で「貼って剥がせる」タイプは試し買いされやすい傾向があります。</li>
<li><strong>ポスター</strong>：A2・A1 は展示用、A3 以下は持ち帰り用。丸めて配布する場合は筒の手配も忘れずに。</li>
<li><strong>タペストリー</strong>：単価は上がりますが、目立つので列の誘導になります。在庫は少なめから始めるのが安全です。</li>
</ul>
<p>グッズは「本を買った人が一緒に買う」動線を作れるかが勝負です。会場で本とグッズを並べる前提なら、什器のサイズと個数を先に決めてから発注量を調整してください。</p>

<h2>初出展向け 3 か月スケジュール例</h2>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">時期</th><th class="text-left p-2">やること</th></tr></thead><tbody>
<tr><td class="p-2">9 月</td><td class="p-2">頒布物の構成を決める（本・グッズ・既刊）、部数の仮決め、表紙ラフ</td></tr>
<tr><td class="p-2">10 月</td><td class="p-2">本文入稿（初稿）、表紙デザイン、サンプルで紙と色を確認</td></tr>
<tr><td class="p-2">11 月</td><td class="p-2">校正 1 回目、グッズのデザイン、告知用の画像準備</td></tr>
<tr><td class="p-2">12 月上旬</td><td class="p-2">最終校正、入稿（12/7 推奨）、決済</td></tr>
<tr><td class="p-2">12 月中旬</td><td class="p-2">生産完了の連絡、到着確認、梱包と搬入計画</td></tr>
<tr><td class="p-2">12/29〜31</td><td class="p-2">当日頒布、売れ行きの記録（次回の部数判断に使う）</td></tr>
</tbody></table>
<p>この表のポイントは、<strong>11 月までに「入稿できる状態」を作る</strong>ことです。12 月はイベント準備と年末進行が重なり、データ修正の時間が取れません。</p>

<h2>当日トラブルと保険の考え方</h2>
<p>過去にもっとも多かったのは「グッズの入稿漏れ」「部数の読み違い」「データ差し戻しによる遅延」の 3 つです。いずれも事前のチェックリストで防げます。</p>
<ul>
<li><strong>予備を 2〜3 冊多めに刷る</strong>：破損・関係者分・記録用を含めると、手元に残る冊数は思ったより少なくなります。</li>
<li><strong>グッズは本とは別便にしない</strong>：別便にすると、片方だけ遅れたときに会場で揃いません。同じ便でまとめるのが安全です。</li>
<li><strong>特急の可否を早めに聞く</strong>：24 時間特急は、データが完成していることが前提です。デザインが動いている段階では特急を前提にしないでください。</li>
</ul>
<p>準備の相談は無料です。仕様が固まっていない段階でも、部数と締切から逆算して現実的なスケジュールを一緒に組みます。</p>
"""

# 插到 FAQ h2 之前
i = c.find("<h2>よくあるご質問</h2>")
assert i > 0, "FAQ h2 not found"
c2 = c[:i] + SEC + c[i:]

h1 = len(re.findall(r"<h2", c2))
assert h0 == 5 and h1 == 12, f"h2 {h0}->{h1}"
assert len(c2) >= 8500, len(c2)
for bad in ["份", "GSC", " pos ", "imps"]:
    assert bad not in SEC, "bad token " + bad

post["content"] = c2
# 只替换该 post 的 content 值
si = raw.find('"comiket-printing-prep-guide": {')
assert si > 0
ci = raw.find('"content"', si)
vi = raw.find(':', ci) + 1
while raw[vi] in ' \t\r\n':
    vi += 1
assert raw[vi] == '"'
k = vi + 1
while k < len(raw):
    ch = raw[k]
    if ch == '\\':
        k += 2; continue
    if ch == '"':
        break
    k += 1
new_val = json.dumps(c2, ensure_ascii=False)
out = raw[:vi] + new_val + raw[k + 1:]
json.loads(out)

bp = os.path.join(REPO, ".hermes", "_bak-b2-20261022", "ja.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print(f"[OK] comiket blog: {n0} -> {len(c2)} chars, h2 {h0} -> {h1}")
