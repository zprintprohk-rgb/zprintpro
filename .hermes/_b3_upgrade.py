# -*- coding: utf-8 -*-
"""B3 升级: comiket blog en 5 -> 12 段"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "blog-data", "en.json")
with io.open(P, "r", encoding="utf-8", newline="") as f:
    raw = f.read()
j = json.loads(raw)
post = j["comiket-printing-prep-guide"]
c = post["content"]
n0, h0 = len(c), len(re.findall(r"<h2", c))

SEC = """<h2>Deadline Calendar: Count Backwards From Your Intake Date</h2>
<p>Comiket 109 opens on <strong>December 29, 2026 (Tuesday)</strong>. The only reliable way to have books in hand on day one is to <strong>work backwards from the opening date</strong>. Standard production runs 5-7 business days, international delivery (DHL) takes 2-4 days, and pre-event rush production is available within 24 hours. Those three numbers give you the three plans below.</p>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">Plan</th><th class="text-left p-2">Artwork in</th><th class="text-left p-2">Ships</th><th class="text-left p-2">Arrives</th><th class="text-left p-2">Buffer before opening</th></tr></thead><tbody>
<tr><td class="p-2">Relaxed</td><td class="p-2">Dec 7 (Mon)</td><td class="p-2">Dec 14-16</td><td class="p-2">Dec 16-20</td><td class="p-2">9+ days</td></tr>
<tr><td class="p-2">Standard</td><td class="p-2">Dec 14 (Mon)</td><td class="p-2">Dec 21-23</td><td class="p-2">Dec 23-27</td><td class="p-2">2 days</td></tr>
<tr><td class="p-2">Rush</td><td class="p-2">Dec 23 (Wed)</td><td class="p-2">Dec 24</td><td class="p-2">Dec 26-28</td><td class="p-2">1 day</td></tr>
</tbody></table>
<p>The table assumes "artwork in" means the file is already approved and print-ready. If you need a proof round, add that time on top. A relaxed Dec 7 intake is the safe default; Dec 23 rush still works, but <strong>a one-day flight or customs delay puts you on the morning of the event with no margin</strong>, so treat rush as a last resort rather than a plan.</p>

<h2>How Many Copies: Choosing Between 10, 30, 50 and 100</h2>
<p>Doujinshi printing starts at <strong>10 copies</strong>. For a first event, the copy count is the hardest call, so use these four bands as a starting point.</p>
<ul>
<li><strong>10-30 copies</strong>: first event, test run for a new title, or sales to friends and neighbouring circles. Lowest unsold-stock risk.</li>
<li><strong>30-50 copies</strong>: you already have a backlist and returning readers, and expect sales to run past midday.</li>
<li><strong>50-100 copies</strong>: strong genre, good traction from your social posts, and a sell-out would be a missed opportunity.</li>
<li><strong>100+ copies</strong>: you plan to sell the same title at several events (winter, then spring). Unit price drops, so this wins if you have storage.</li>
</ul>
<p>If you are unsure, take last year's sales and add 20%. A sell-out builds demand for the next event, but a reader who finds you sold out may not come back.</p>

<h2>Five Cover-File Mistakes That Trigger Reprints</h2>
<p>Most delays start on the file side, not the press side. Check these five before uploading and you will usually save one proof round.</p>
<ol class="list-decimal pl-5 my-4">
<li><strong>No bleed (3 mm)</strong>: background art stops short and the trim leaves a white edge. Add 3 mm bleed on all four sides of the cover.</li>
<li><strong>Spine width does not match the page count</strong>: spine width depends on page count and paper bulk. Keeping cover and interior as separate files makes the calculation cleaner.</li>
<li><strong>Files left in RGB</strong>: print is CMYK. Vivid blues and fluorescent tones shift most, so convert and review before uploading.</li>
<li><strong>Fonts not outlined</strong>: un-outlined fonts can reflow or substitute on another machine.</li>
<li><strong>Low-resolution images</strong>: aim for 300 dpi at final size. Reusing web images is the most common cause of soft print.</li>
</ol>

<h2>Getting the Boxes to the Venue</h2>
<p>Printed goods should reach <strong>you</strong> (home, hotel or warehouse) before the event, not the venue. At the venue you carry them in as luggage after circle entry, following the organiser's move-in instructions.</p>
<ul>
<li><strong>Hotel delivery</strong>: time it to arrive on or after check-in. Storage limits vary by hotel, so confirm in advance.</li>
<li><strong>Ship to a friend or neighbouring circle</strong>: one delivery, one trolley run on the day.</li>
<li><strong>Courier depot hold near the venue</strong>: a useful fallback when your arrival time is uncertain.</li>
</ul>
<p>Whichever you choose, <strong>keep the tracking number and confirm arrival at least three days before opening</strong>. If the parcel is running late, message us on WhatsApp at that point and we can discuss an alternative delivery arrangement.</p>

<h2>Planning Goods: Stickers, Posters and Tapestries</h2>
<p>Goods sold alongside books should be <strong>low unit cost and low inventory risk</strong>. Stickers start at <strong>10 pieces</strong>; posters and cards start at <strong>1 piece</strong>.</p>
<ul>
<li><strong>Stickers</strong>: waterproof and UV-resistant stock survives phone cases and outdoor use. Removable adhesive tends to sell well as an impulse add-on.</li>
<li><strong>Posters</strong>: A2/A1 for display, A3 and smaller to take home. If you hand them out rolled, order tubes at the same time.</li>
<li><strong>Tapestries</strong>: higher unit cost, but they are visible from a distance and help draw a queue. Start with a small run.</li>
</ul>
<p>Goods work when the person buying a book also buys a sticker on the way out. Decide your table layout and fixture sizes first, then set quantities to match.</p>

<h2>A Three-Month Schedule for First-Time Exhibitors</h2>
<table class="w-full text-sm my-4"><thead><tr><th class="text-left p-2">When</th><th class="text-left p-2">What to do</th></tr></thead><tbody>
<tr><td class="p-2">September</td><td class="p-2">Decide the line-up (new book, goods, backlist), draft quantities, rough cover concepts</td></tr>
<tr><td class="p-2">October</td><td class="p-2">Interior first draft, cover design, order a sample to check paper and colour</td></tr>
<tr><td class="p-2">November</td><td class="p-2">First proof round, goods artwork, prepare announcement images</td></tr>
<tr><td class="p-2">Early December</td><td class="p-2">Final proof, submit artwork (Dec 7 recommended), settle payment</td></tr>
<tr><td class="p-2">Mid December</td><td class="p-2">Production completion notice, confirm delivery, pack and plan move-in</td></tr>
<tr><td class="p-2">Dec 29-31</td><td class="p-2">Sell, and record what actually moved (it sets next event's quantities)</td></tr>
</tbody></table>
<p>The point of the schedule is to <strong>be print-ready by the end of November</strong>. December collides with event prep and year-end logistics, and there is no room left for file fixes.</p>

<h2>On-Site Problems and How to Insure Against Them</h2>
<p>The three most common failures we see are <strong>missing goods artwork</strong>, <strong>misjudged quantities</strong> and <strong>delays caused by a file reprint</strong>. All three are preventable with a checklist.</p>
<ul>
<li><strong>Print 2-3 spare copies</strong>: damage, staff copies and your own archive copy all come out of the same run.</li>
<li><strong>Do not ship goods separately</strong>: if one parcel slips, your table is incomplete. Keep everything on one shipment.</li>
<li><strong>Ask about rush early</strong>: 24-hour rush assumes the file is finished. Do not plan around rush while the design is still moving.</li>
</ul>
<p>Spec reviews are free. Even at the concept stage, we can work backwards from your copy count and deadline into a schedule that actually holds.</p>
"""

i = c.find("<h2>Frequently Asked Questions</h2>")
assert i > 0, "FAQ h2 not found"
c2 = c[:i] + SEC + c[i:]
h1 = len(re.findall(r"<h2", c2))
assert h0 == 5 and h1 == 12, f"h2 {h0}->{h1}"
assert len(c2) >= 12000, len(c2)
for bad in ["GSC", " pos ", "imps", "份"]:
    assert bad not in SEC

post["content"] = c2
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
out = raw[:vi] + json.dumps(c2, ensure_ascii=False) + raw[k + 1:]
json.loads(out)
bp = os.path.join(REPO, ".hermes", "_bak-b3-20261022", "en.json.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
with io.open(P, "w", encoding="utf-8", newline="") as f:
    f.write(out)
print(f"[OK] en comiket: {n0} -> {len(c2)}, h2 {h0} -> {h1}")
