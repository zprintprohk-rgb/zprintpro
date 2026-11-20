# -*- coding: utf-8 -*-
"""B6: calendar-sizes-print-reference en — 补数字真值 + 内链 + 4 段 (8->12 h2)"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "en.json")
raw = io.open(P, encoding="utf-8", newline="").read()
j = json.loads(raw)
post = j["calendar-sizes-print-reference"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>Minimum order, price band and lead time</h2>
<p>Calendar printing here starts at <strong>1 copy</strong> — you can order a single sample before committing to a run. The published price band is <strong>HK$3-8 per copy</strong> (roughly US$0.40 at the low end), with the final unit price moving on size, page count, paper stock and binding. Standard production is <strong>3-5 working days</strong> after artwork approval, and international delivery runs 2-4 days by DHL.</p>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">Quantity</th><th class="text-left p-2">Who it suits</th><th class="text-left p-2">What changes</th></tr></thead><tbody>
<tr><td class="p-2">1-10</td><td class="p-2">Sample, photo-calendar gift, proof of concept</td><td class="p-2">Digital print, highest unit cost</td></tr>
<tr><td class="p-2">50-300</td><td class="p-2">Small business, clinic, studio</td><td class="p-2">Offset kicks in, unit price drops sharply</td></tr>
<tr><td class="p-2">500-1,500</td><td class="p-2">Retail chain, agency client gifting</td><td class="p-2">Plate and setup costs spread thin</td></tr>
<tr><td class="p-2">1,500+</td><td class="p-2">Bank, insurer, property group</td><td class="p-2">Best unit price, plan storage and distribution</td></tr>
</tbody></table>
<p>The step from 10 to 100 copies is where the price per copy falls the most. If you expect to hand calendars to clients all year, order once at the larger quantity rather than reprinting.</p>

<h2>Artwork file checklist before you upload</h2>
<ul>
<li><strong>Bleed</strong>: 3 mm on all four sides; calendars are trimmed tight, so background art must extend past the trim line.</li>
<li><strong>Colour</strong>: CMYK, not RGB. Deep reds and metallic-looking golds shift most on press.</li>
<li><strong>Resolution</strong>: 300 dpi at final size for photos; vector for logos and type.</li>
<li><strong>Hanging and binding space</strong>: leave a 10-12 mm margin at the top for wire-o or hook punching, and keep type clear of it.</li>
<li><strong>Page order</strong>: supply months in reading order, 12 pages for a standard year, 13 if you include a cover page.</li>
</ul>
<p>Uploading once with these five points checked usually saves a full proof round, which is 2-3 days on a December deadline.</p>

<h2>Shipping, packing and distribution</h2>
<p>Calendars are light but bulky, so freight is a real share of the landed cost:</p>
<ul>
<li><strong>Local (Hong Kong)</strong>: free SF Express delivery on orders over HK$500; bulk orders can ship to individual branches.</li>
<li><strong>International</strong>: DHL 2-4 working days; add a week of buffer in December for customs.</li>
<li><strong>Packing</strong>: ship flat, never standing on edge — wire-o binds deform when a carton is stood upright.</li>
<li><strong>Individual wrapping</strong>: ask for poly-bagging per copy if you plan to mail calendars straight to clients.</li>
</ul>
<p>If you are sending to multiple offices, split the shipment at the order stage: one carton per address is cheaper than re-shipping from a central store.</p>

<h2>Which format should you pick?</h2>
<p>A quick decision path based on where the calendar will live:</p>
<ul>
<li><strong>Desk, close range</strong> → A5 or 190×190 mm desk calendar, tent base.</li>
<li><strong>Wall, 2 m viewing distance</strong> → A3 wall calendar.</li>
<li><strong>Lobby or factory wall</strong> → A2 wall calendar; large numerals matter more than artwork.</li>
<li><strong>Fridge or metal cabinet</strong> → magnetic calendar.</li>
<li><strong>Envelope insert or counter giveaway</strong> → calendar card.</li>
</ul>
<p>Full format options and prices are on the <a href="/en/category/calendars/">calendar printing category page</a>; specific builds are listed under <a href="/en/product/wall-calendars/">wall calendars</a>, <a href="/en/product/desk-calendars/">desk calendars</a>, <a href="/en/product/mini-calendars/">mini calendars</a> and <a href="/en/product/magnetic-calendars/">magnetic calendars</a>. For the Chinese-language buying walkthrough, see the <a href="/zh-hk/blog/corporate-calendar-customization-2027/">2027 corporate calendar guide</a>.</p>
"""

i = c.find("<h2>FAQ</h2>")
assert i > 0, "FAQ anchor"
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 8 and h1 == 12, f"h2 {h0}->{h1}"
links = len(set(re.findall(r'href="([^"]+)"', c2)))
assert links >= 6, links
for bad in ["GSC", " pos ", "imps", "份"]:
    assert bad not in SEC

post["content"] = c2
si = raw.find('"calendar-sizes-print-reference": {')
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
bp = os.path.join(REPO, ".hermes", "_bak-b6-20261022", "en.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(out)
print(f"[OK] B6: {n0} -> {len(c2)}, h2 {h0} -> {h1}, links={links}")
