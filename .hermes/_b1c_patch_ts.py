# -*- coding: utf-8 -*-
# B1c cluster1: ts body 15-slot patch + products.ts faqSchema 5-slot + transparent desc 清毒
import io, json, re, sys

BODIES = json.load(io.open('.hermes/_b1c_bodies_new.json', encoding='utf-8'))
FAQS = {
 'waterproof-stickers': [
  {"question":"Are your waterproof stickers really waterproof?","answer":"Yes. Our PVC waterproof stickers handle rain, washing and brief soaking and are rated IP65; laminated versions withstand dishwasher cycles up to 80C."},
  {"question":"How long do waterproof stickers last outdoors?","answer":"With UV-resistant ink, colors stay vivid for 3 years outdoors and up to 5 years indoors. Lamination is recommended for constant sun exposure."},
  {"question":"What is the minimum order for waterproof stickers?","answer":"10 pieces with no setup fees. A 50-piece small-batch option is available. Standard production time is 5-7 business days."},
  {"question":"Can waterproof stickers include variable data?","answer":"Yes. Digital printing supports a different serial number, barcode or QR code on every sticker for asset labels and event tickets."}],
 'transparent-stickers': [
  {"question":"What do clear stickers look like when applied?","answer":"Only the printed design is visible. The transparent PET background disappears onto glass, bottles and clear packaging for a premium no-label look."},
  {"question":"Will colors show on dark bottles?","answer":"Add a white ink base. The white layer under CMYK keeps colors saturated on dark green, amber or cobalt glass; note white ink when ordering."},
  {"question":"What is the minimum order for clear stickers?","answer":"10 pieces with no setup fees. Standard production time is 5-7 business days; laminated versions resist scratches better."},
  {"question":"Do clear stickers work on curved surfaces?","answer":"Yes. The flexible PET stock suits standard round bottles; for tight curves we recommend testing with a physical sample first."}],
 'foil-stickers': [
  {"question":"Which foil colors are available?","answer":"Gold, silver and rose gold are standard options; special colors are assessed per artwork. Swatches are available before ordering."},
  {"question":"Can foil stamping combine with full-color printing?","answer":"Yes. Foil and CMYK run as two plates - color first, foil second. Mark foil areas on a spot plate; a free registration check is included."},
  {"question":"How small can foil text be?","answer":"Minimum foil text height and line width depend on the artwork; overly fine details may break. A free feasibility check flags risky areas before production."},
  {"question":"Does the foil surface scratch easily?","answer":"Lamination protects the foil during everyday handling and display. For high-friction spots, keep the foil area smaller or use spot foil."}],
 'security-stickers': [
  {"question":"How does a VOID tamper-evident sticker work?","answer":"The face stock and adhesive separate on peeling: the label lifts off and leaves VOID wording or a preset pattern on the surface, showing the package has been opened."},
  {"question":"What is destructible paper?","answer":"An extremely brittle stock that shreds into tiny pieces when lifted, so it cannot be re-applied onto counterfeits - ideal for certificates and bottle seals."},
  {"question":"Can each security sticker carry a different serial or QR code?","answer":"Yes. Variable-data printing gives every label a unique serial, QR or barcode that connects to your system for authenticity checks and diversion tracking."},
  {"question":"What anti-counterfeit options do you offer?","answer":"VOID tamper-evident film, destructible paper, holographic film and variable-data printing, plus batch sample retention and color-delta control. Sizes from tiny seals to A4 sheets."}],
 'fluorescent-stickers': [
  {"question":"What is the difference between fluorescent and reflective stickers?","answer":"Fluorescent stands out in daylight or lamplight; reflective bounces light back in the dark when hit by headlights. They can be combined for day-and-night visibility."},
  {"question":"Are fluorescent stickers safe for food or children related labels?","answer":"Yes. The inks are SGS certified with no heavy-metal migration, suitable for food-related and children-related labeling."},
  {"question":"Are fluorescent stickers suitable for outdoor use?","answer":"Fluorescent PVC film is waterproof and weather-resistant for outdoor use; fluorescent paper suits indoor or short-term use. Lamination extends outdoor life."},
  {"question":"Which fluorescent colors are available?","answer":"Fluorescent yellow, orange, pink and green are standard. Free prepress color advice confirms high-contrast pairings."}],
}

def find_json_string_end(s, start):
    # s[start] == '"'; returns index of closing quote
    assert s[start] == '"'
    i = start + 1
    while i < len(s):
        c = s[i]
        if c == '\\':
            i += 2
            continue
        if c == '"':
            return i
        i += 1
    raise ValueError('unterminated string')

# ---------- 1) ts body patch ----------
ts_path = 'src/data/sku-seo-data.ts'
ts = io.open(ts_path, encoding='utf-8').read()
count = 0
for slug, locales in BODIES.items():
    s0 = ts.index('"%s": {' % slug)
    # 块窗: 到下一个顶层 slug 或文件尾
    mnext = re.search(r'\n  "[a-z0-9-]+": \{', ts[s0+10:])
    end = s0 + 10 + (mnext.start() if mnext else len(ts))
    window = ts[s0:end]
    for loc in ('zh-hk', 'en', 'ja'):
        locmark = '"%s": {' % loc
        li = window.index(locmark)
        bi = window.index('"body": "', li)
        vstart = bi + len('"body": ')
        vend = find_json_string_end(window, vstart)
        newv = json.dumps(locales[loc], ensure_ascii=False)
        window = window[:vstart] + newv + window[vend+1:]
        count += 1
    ts = ts[:s0] + window + ts[end:]
io.open(ts_path, 'w', encoding='utf-8', newline='\n').write(ts)
print('ts body slots patched:', count, '(expect 15)')

# ---------- 2) products.ts faqSchema + transparent desc ----------
pp = 'src/data/products.ts'
p = io.open(pp, encoding='utf-8').read()
fcount = 0
for slug, faq in FAQS.items():
    s0 = p.index("slug: '%s'" % slug)
    mnext = re.search(r"\n  \{\n    (?:id|slug|name)", p[s0+20:])
    end = s0 + 20 + (mnext.start() if mnext else len(p))
    window = p[s0:end]
    fi = window.index('faqSchema: ')
    astart = window.index('[', fi)
    aend = window.index('],', astart)
    newa = json.dumps(faq, ensure_ascii=False)
    window = window[:astart] + newa + window[aend+1:]
    fcount += 1
    p = p[:s0] + window + p[end:]
io.open(pp, 'w', encoding='utf-8', newline='\n').write(p)
print('products.ts faqSchema patched:', fcount, '(expect 5)')

# transparent descEn/descJa 简体清毒（独立小补丁，重读文件）
p = io.open(pp, encoding='utf-8').read()
fixes = [
 ('glass decoration. 适配行业： Beauty', 'glass decoration. **Best for**: Beauty'),
 ('ガラス裝飾に最適。 适配行业： 美容', 'ガラス装飾に最適。 **適合業種**: 美容'),
]
nfix = 0
for old, new in fixes:
    c = p.count(old)
    assert c == 1, 'expected 1 got %d for %s' % (c, old[:30])
    p = p.replace(old, new)
    nfix += 1
io.open(pp, 'w', encoding='utf-8', newline='\n').write(p)
print('products.ts transparent desc fixes:', nfix)
