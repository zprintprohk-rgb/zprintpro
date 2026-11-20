# -*- coding: utf-8 -*-
"""B7 (en) 8->12 段 + B8 (zh) 加快速答案块"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(REPO, ".hermes", "_bak-b78-20261022")
os.makedirs(B, exist_ok=True)

def patch(fn, slug, mutate, tag):
    P = os.path.join(REPO, "src", "data", "blog-data", fn)
    raw = io.open(P, encoding="utf-8", newline="").read()
    j = json.loads(raw)
    post = j[slug]
    c0 = post["content"]
    h0 = len(re.findall(r"<h2", c0))
    c2 = mutate(c0)
    post["content"] = c2
    si = raw.find('"%s": {' % slug)
    assert si > 0, "slug anchor"
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
    bp = os.path.join(B, fn + "." + tag)
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(out)
    print(f"[OK] {fn}/{slug}: {len(c0)} -> {len(c2)}, h2 {h0} -> {len(re.findall(r'<h2', c2))}")

# ---------- B7 ----------
B7_SEC = """<h2>Card sizes and formats</h2>
<p>Two formats cover almost every corporate order, and the choice is really about whether the card is mailed flat or handed over.</p>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">Format</th><th class="text-left p-2">Folded size</th><th class="text-left p-2">Best for</th></tr></thead><tbody>
<tr><td class="p-2">A6</td><td class="p-2">105×148mm</td><td class="p-2">Standard corporate greeting card, fits a C6 envelope</td></tr>
<tr><td class="p-2">A5</td><td class="p-2">148×210mm</td><td class="p-2">Signed by multiple people, or carries a longer message</td></tr>
<tr><td class="p-2">Square</td><td class="p-2">140×140mm</td><td class="p-2">Design-led brands, stronger shelf presence</td></tr>
<tr><td class="p-2">Flat card</td><td class="p-2">A6 / A5 single sheet</td><td class="p-2">Insert in a gift box or with an invoice</td></tr>
</tbody></table>
<p>If the card goes in the post, check the envelope at the same time — an A5 card does not fit a C6 envelope, and mismatched sizes are the most common reason a mailing slips by a week.</p>

<h2>Paper stock and finishing</h2>
<ul>
<li><strong>300-350 gsm art card</strong>: the default. Holds a fold cleanly and feels substantial in hand.</li>
<li><strong>Uncoated / textured stock</strong>: takes pen signatures without smudging, which matters for cards signed by hand.</li>
<li><strong>Foil stamping</strong>: gold or silver logo; the single biggest perceived-value upgrade per dollar.</li>
<li><strong>Emboss / deboss</strong>: raised or recessed logo; works well with minimal designs.</li>
<li><strong>Spot UV</strong>: gloss pattern on a matte card; cheaper than foil when the artwork is illustrative.</li>
</ul>
<p>One finishing touch is usually enough. Foil plus emboss plus UV on an A6 card tends to look busy rather than premium.</p>

<h2>Personalisation: names, messages and variable data</h2>
<p>Corporate cards split into two jobs: a <strong>generic card</strong> for bulk distribution, and a <strong>personalised card</strong> for top clients or staff. Variable-data printing handles the second without a separate plate per name.</p>
<ul>
<li><strong>Names and titles</strong>: supply a spreadsheet (name, title, company) and we map the fields into the artwork.</li>
<li><strong>Handwritten-style messages</strong>: a script font reads warmer than a printed block, but check legibility at A6 size.</li>
<li><strong>Individually addressed envelopes</strong>: print addresses directly on the envelope to skip labelling by hand.</li>
</ul>
<p>For a personalised run, approve the data file before printing — a misspelt name on 200 cards cannot be fixed afterwards.</p>

<h2>Timeline for December delivery</h2>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">When</th><th class="text-left p-2">Action</th></tr></thead><tbody>
<tr><td class="p-2">Early November</td><td class="p-2">Confirm quantity, format and finishing; approve artwork</td></tr>
<tr><td class="p-2">Mid November</td><td class="p-2">Production (standard 4-5 working days) and proof sign-off</td></tr>
<tr><td class="p-2">Late November</td><td class="p-2">Delivery to your office; check count and any damaged cartons</td></tr>
<tr><td class="p-2">Early December</td><td class="p-2">Addressing and posting — international mail needs 1-2 weeks</td></tr>
</tbody></table>
<p>Cards ordered in December still print on time, but the postal leg is what fails: international mail to Europe or the US slows sharply in the second half of December.</p>

"""

def m7(c):
    i = c.find("<h2>Corporate holiday cards: six FAQs</h2>")
    assert i > 0
    c2 = c[:i] + B7_SEC + c[i:]
    assert len(re.findall(r"<h2", c2)) == 12
    return c2

patch("en.json", "corporate-holiday-cards-printing-guide", m7, "before")

# ---------- B8 quick answer ----------
QA = """<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案（40 秒讀完）</p><p class="text-sm">紙袋印刷 <strong>100 個起</strong>，單價 <strong>HK$3-8/個</strong>（牛皮紙／環保紙）、白卡 HK$5-12、禮品袋 HK$10-20；標準交期 <strong>3-5 個工作天</strong>，港九新界滿 HK$500 免費順豐。最常見退稿原因係刀模線同出血位，交稿前先睇規格清單。</p></div>
"""

def m8(c):
    assert "快速答案" not in c
    # 插在第一个 <h2 之前
    i = c.find("<h2")
    assert i > 0
    return c[:i] + QA + c[i:]

patch("zh-hk.json", "paper-bag-printing-guide", m8, "before")
