#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""P0-4 v2 整改: 写 BC-001 + ST-001 新版本 prompt (含 P0-4 场景-卖点对位 + P0-1 DETAIL 重写).
K3 8/17 02:18 拍板: '给指令重新给到autoclaw来跑啊，更新两款SKU的提示词版本才能给到它跑测试啊'.

New versions per view:
- HERO/VARIETY/MULTI-ANGLE: 加 P0-4 scene-selling-point alignment 段
- DETAIL: P0-1 重写 (60-70% + 4 边留白 + 同设计放大 + 5 NEGATIVES)
- SPREAD (BC-001 only): 加 P0-4 + 保持 fan-fold 形态
"""
import json
import os

path = r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json'
with open(path, 'r', encoding='utf-8') as f:
    rules = json.load(f)

skus = rules.get('SKUS', {})

# ============================================
# BC-001 (greeting card, foil-stamped, craft type) new version
# ============================================
bc001_v2 = {
    "HERO": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18 directive, v20.9.1): the greeting "
        "card's core selling point is FOIL-STAMPED gold border and botanical deboss - "
        "the scene MUST visually demonstrate the metallic gold reflection under warm "
        "light to prove the foil-stamp craft; mandatory scene elements: warm "
        "golden-hour sunlight or candlelight catching the gold foil border, "
        "metallic gold reflection visible on the card border, luxury gift-box or "
        "Christmas decoration or candle-lit dinner table context; must NOT use "
        "flat daylight, must NOT use generic living-room props, must NOT show the "
        "card on a plain neutral background without warm metallic light; "
        "DESIGN MASTER (from the approved DETAIL close-up, must be reproduced "
        "identically in this view): the greeting card front shows (1) a thin gold "
        "foil border frame running along the card edge like a picture frame; (2) a "
        "realistic botanical sprig motif with visible leaf veins, lightly debossed "
        "or foil-printed at the lower right corner of the card; (3) the two-line "
        "centered high-contrast serif lettering 'WITH GRATITUDE' / 'AND WARMTH' in "
        "all caps with wide letter-spacing, same elegant serif as the DETAIL view; "
        "(4) warm cream card stock with soft paper fiber texture. The card front "
        "must display this full design - never a blank surface with plain text only "
        "in the middle. In the hero scene the card stands upright with its full "
        "front design clearly visible - the printed design (foil border + botanical "
        "sprig + serif lettering) is the selling point and must be readable at "
        "60-70% frame occupancy; scene props (candles, gift box, gold ribbon, "
        "Christmas greenery, warm fairy lights) stay softly blurred behind the card "
        "BUT the warm light must clearly reflect off the gold foil border. The "
        "ONLY text allowed anywhere is the phrase 'WITH GRATITUDE AND WARMTH' "
        "spelled exactly correct, in clean serif, on the greeting card only; no "
        "other letters, numbers or characters anywhere. NEGATIVES (P0-4): no flat "
        "daylight, no plastic look, no generic living room, no plain neutral "
        "background, no cool white light, no card without visible gold reflection."
    ),
    "VARIETY-C": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18, v20.9.1): all 3 scenario panels "
        "MUST keep the foil-stamped gold reflection visible under warm light; "
        "panels change only the scene context (candlelight vs Christmas tree vs "
        "gift box) but every panel must show the gold foil border catching warm "
        "light; must NOT use flat daylight or generic living-room scenes. "
        "DESIGN MASTER (from the approved DETAIL close-up, must be reproduced "
        "identically in this view): the greeting card front shows (1) a thin gold "
        "foil border frame running along the card edge like a picture frame; (2) a "
        "realistic botanical sprig motif with visible leaf veins, lightly debossed "
        "or foil-printed at the lower right corner of the card; (3) the two-line "
        "centered high-contrast serif lettering 'WITH GRATITUDE' / 'AND WARMTH' in "
        "all caps with wide letter-spacing, same elegant serif as the DETAIL view; "
        "(4) warm cream card stock with soft paper fiber texture. The card front "
        "must display this full design - never a blank surface with plain text only "
        "in the middle. In all 3 scenario panels the card shows the same full front "
        "design as the DETAIL master (foil border + botanical sprig + serif "
        "lettering) - no blank card front, no text-only card. The ONLY text "
        "allowed anywhere is the phrase 'WITH GRATITUDE AND WARMTH' spelled exactly "
        "correct - W-I-T-H G-R-A-T-I-T-U-D-E A-N-D W-A-R-M-T-H - in clean "
        "Baskerville serif, readable, on the greeting cards only. ABSOLUTELY NO "
        "other text, no letters, no numbers, no handwriting, no gibberish "
        "characters on any card, envelope, tag or paper surface. NEGATIVES (P0-4): "
        "no flat daylight, no plastic look, no generic scene without warm "
        "metallic light, no panel without visible gold reflection."
    ),
    "MULTI-ANGLE": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18, v20.9.1): all 4 angles MUST keep "
        "the foil-stamped gold reflection visible; the front view and 3/4 view must "
        "show warm light catching the gold foil border; the back view can be in "
        "softer warm light but the gold border edge must still be visible. "
        "DESIGN MASTER (from the approved DETAIL close-up, must be reproduced "
        "identically in this view): the greeting card front shows (1) a thin gold "
        "foil border frame running along the card edge like a picture frame; (2) a "
        "realistic botanical sprig motif with visible leaf veins, lightly debossed "
        "or foil-printed at the lower right corner of the card; (3) the two-line "
        "centered high-contrast serif lettering 'WITH GRATITUDE' / 'AND WARMTH' in "
        "all caps with wide letter-spacing, same elegant serif as the DETAIL view; "
        "(4) warm cream card stock with soft paper fiber texture. The card front "
        "must display this full design - never a blank surface with plain text only "
        "in the middle. In all 4 angles the card shows the same full front design "
        "as the DETAIL master (foil border + botanical sprig + serif lettering); "
        "the front view must show the complete design. The ONLY text allowed "
        "anywhere is the phrase 'WITH GRATITUDE AND WARMTH' spelled exactly "
        "correct, in clean serif, on the greeting cards only; no other letters, "
        "numbers or characters anywhere. NEGATIVES (P0-4): no flat daylight, no "
        "cool white light, no angle without visible gold foil reflection."
    ),
    "SPREAD": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18, v20.9.1): fan-fold display MUST "
        "have warm golden-hour or candlelight reflecting off the gold foil border "
        "on each card; the accordion fan must catch warm light to prove the "
        "foil-stamp craft; NOT a flat daylight shot, NOT a plain white background. "
        "DESIGN MASTER (from the approved DETAIL close-up, must be reproduced "
        "identically in this view): the greeting card front shows (1) a thin gold "
        "foil border frame running along the card edge like a picture frame; (2) a "
        "realistic botanical sprig motif with visible leaf veins, lightly debossed "
        "or foil-printed at the lower right corner of the card; (3) the two-line "
        "centered high-contrast serif lettering 'WITH GRATITUDE' / 'AND WARMTH' in "
        "all caps with wide letter-spacing, same elegant serif as the DETAIL view; "
        "(4) warm cream card stock with soft paper fiber texture. The card front "
        "must display this full design - never a blank surface with plain text only "
        "in the middle. The fan-out display shows 4-8 standalone greeting cards, "
        "each card showing the same full front design as the DETAIL master (foil "
        "border + botanical sprig + serif lettering) - no book spine, no page "
        "numbers, no two-page book spread. Show exactly ONE greeting card in an "
        "accordion fan-fold display, standing like a zigzag screen - NOT a booklet, "
        "NOT a book, NOT opened like book pages, no spine, no page numbers, no "
        "chapters, no book interior. The card is a BLANK folded card with NO "
        "printed text except the single allowed phrase 'WITH GRATITUDE AND WARMTH' "
        "spelled exactly correct. Absolutely no HAPPY BIRTHDAY, no congratulations, "
        "no greeting words, no handwriting, no decorative lettering, no watermark, "
        "no brand name anywhere. NEGATIVES (P0-4): no flat daylight, no plain "
        "white background, no fan-fold without warm light, no panel without gold "
        "reflection."
    ),
    "DETAIL": (
        "P0-1 DETAIL REWRITE (K3 8/17 02:18, v20.9.1): CLOSE-UP DETAIL VIEW OF THE "
        "FULL PRODUCT - the complete greeting card shown in its entirety within the "
        "frame, card occupying 60-70% of the frame with 30-40% clean negative space "
        "on all four sides, camera positioned close enough that the gold foil "
        "border and botanical deboss craft details are clearly visible, the card "
        "fully in frame with margin on all sides; the printed design must show the "
        "full artwork (foil border + botanical sprig + serif lettering), enlarged "
        "so the gold foil border catches warm light and the leaf veins are visible; "
        "the printed area must show the full design, never a blank surface with "
        "text only; the same artwork, same colors, same typography and same gold "
        "foil finish as the HERO image. No studio watermark text, no brand name "
        "anywhere (no Maplewood Studio, no logo watermark in any corner). The "
        "greeting card surface shows the gold foil border, the botanical sprig "
        "with leaf veins, the cream paper texture and the centered serif "
        "lettering. The ONLY text allowed is the phrase 'WITH GRATITUDE AND "
        "WARMTH' spelled exactly correct. NEGATIVES (P0-1): no extreme close-up, "
        "no 90% frame fill, no 2X enlargement, no plain unprinted surface, no blank "
        "card front, no missing artwork, no different design from the hero image, "
        "no color mismatch, no flat daylight, no cool white light."
    ),
}

# ============================================
# ST-001 (waterproof sticker, function type) new version
# ============================================
st001_v2 = {
    "HERO": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18 directive, v20.9.1): the "
        "waterproof sticker's core selling point is WATERPROOF - the scene MUST "
        "visually demonstrate water contact or water exposure; mandatory scene "
        "elements: water drops visible on the sticker surface, OR the sticker "
        "stuck on a Hydro Flask water bottle that is in outdoor rain scene, OR "
        "the sticker on a bathroom mirror with visible steam droplets, OR the "
        "sticker on a kitchen sink edge with running water nearby, OR the "
        "sticker next to a swimming pool or beach scene with water visible; "
        "must NOT use dry office scene, must NOT use the sticker on MacBook "
        "or Moleskine without water context, must NOT use a plain dry Hydro "
        "Flask held in dry hand, must NOT show the sticker in a generic "
        "everyday-object lifestyle scene that has no water element; the "
        "sticker MUST be shown surviving visible water contact to prove the "
        "waterproof selling point. DESIGN MASTER (from the approved DETAIL "
        "close-up, must be reproduced identically in this view): the signature "
        "badge sticker shows (1) a scalloped cloud/shield die-cut silhouette "
        "with visible sticker thickness at the edge; (2) a double border: thin "
        "inner white line plus thick outer gold/antique-bronze foil outline "
        "with subtle metallic sheen; (3) symmetrical floral-feather artwork in "
        "coral pink (top) and baby blue (bottom) with warm gold transitions, "
        "area-filled colors; (4) deep forest green ultra-bold condensed "
        "all-caps lettering 'STICK YOUR VIBE' with tight tracking, varsity/70s "
        "retro style; (5) cream oat base. The sticker must display this full "
        "design - never a plain surface with text only. The badge sticker "
        "(DETAIL master design) must be the MOST PROMINENT product in the "
        "scene, clearly visible with its foil border and floral artwork; the "
        "scene may also show the matching sticker set (circle pine/wave/"
        "mountain icons and square line-art mountain stickers in the same "
        "colorway) as companions, but the badge sticker leads the composition "
        "- never a text-only sticker as the main subject. Replace branded "
        "items with generic unbranded props. Sticker designs must be clean "
        "vector-style illustrations with no watermark and no gibberish. "
        "NEGATIVES (P0-4): no dry office scene, no MacBook without water "
        "context, no plain dry water bottle, no Moleskine notebook, no "
        "everyday objects without water element, no sticker in dry hand, no "
        "sticker without visible water exposure."
    ),
    "VARIETY-A": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18, v20.9.1): the 5 colorway "
        "variations MUST each be shown in a context demonstrating waterproof - "
        "e.g. one on a Hydro Flask with water drops, one on a bathroom mirror "
        "with steam, one on a kitchen surface with water nearby, one in outdoor "
        "rain, one on a pool-side Hydro Flask; do NOT use 5 identical dry office "
        "scenes that just change the sticker color. DESIGN MASTER (from the "
        "approved DETAIL close-up, must be reproduced identically in this view): "
        "the signature badge sticker shows (1) a scalloped cloud/shield die-cut "
        "silhouette with visible sticker thickness at the edge; (2) a double "
        "border: thin inner white line plus thick outer gold/antique-bronze foil "
        "outline with subtle metallic sheen; (3) symmetrical floral-feather "
        "artwork in coral pink (top) and baby blue (bottom) with warm gold "
        "transitions, area-filled colors; (4) deep forest green ultra-bold "
        "condensed all-caps lettering 'STICK YOUR VIBE' with tight tracking, "
        "varsity/70s retro style; (5) cream oat base. The sticker must display "
        "this full design - never a plain surface with text only. Show 5 colorway "
        "variations of the badge sticker master design (same scalloped die-cut "
        "shape, same floral border artwork, same STICK YOUR VIBE lettering), each "
        "in one colorway from the brand palette (forest green / coral pink / sky "
        "blue / chocolate brown / cream); every variation keeps the full artwork - "
        "never blank with text only. Sticker designs must be plain vector "
        "illustrations with NO printed brand name, NO logo text, NO lettering on "
        "sticker surfaces (no BriteMar, no BriteMark, no brand wordmark). No "
        "watermark anywhere. NEGATIVES (P0-4): no 5 identical dry office scenes, "
        "no colorway variation without water context, no sticker without visible "
        "waterproof demonstration."
    ),
    "MULTI-ANGLE": (
        "P0-4 SCENE-SELLING-POINT (K3 8/17 02:18, v20.9.1): all 4 angles MUST be "
        "in a waterproof context - the sticker can be shown on a Hydro Flask with "
        "water drops from 4 different angles (front, 3/4, side, back); the water "
        "droplets on the sticker surface must be visible from at least 2 angles "
        "to prove the waterproof selling point. DESIGN MASTER (from the approved "
        "DETAIL close-up, must be reproduced identically in this view): the "
        "signature badge sticker shows (1) a scalloped cloud/shield die-cut "
        "silhouette with visible sticker thickness at the edge; (2) a double "
        "border: thin inner white line plus thick outer gold/antique-bronze foil "
        "outline with subtle metallic sheen; (3) symmetrical floral-feather "
        "artwork in coral pink (top) and baby blue (bottom) with warm gold "
        "transitions, area-filled colors; (4) deep forest green ultra-bold "
        "condensed all-caps lettering 'STICK YOUR VIBE' with tight tracking, "
        "varsity/70s retro style; (5) cream oat base. The sticker must display "
        "this full design - never a plain surface with text only. In all 4 "
        "angles show the badge sticker master design (scalloped die-cut, foil "
        "double border, floral artwork, STICK YOUR VIBE lettering); the front "
        "view shows the complete design. Replace branded items with generic "
        "unbranded props. Sticker designs must be clean vector-style "
        "illustrations with no watermark and no gibberish. NEGATIVES (P0-4): no "
        "dry office scene, no MacBook without water context, no plain dry water "
        "bottle, no Moleskine, no everyday objects without water element."
    ),
    "DETAIL": (
        "P0-1 DETAIL REWRITE (K3 8/17 02:18, v20.9.1): CLOSE-UP DETAIL VIEW OF "
        "THE FULL PRODUCT - the complete badge sticker shown in its entirety "
        "within the frame, sticker occupying 60-70% of the frame with 30-40% "
        "clean negative space on all four sides, camera positioned close enough "
        "that the scalloped die-cut edge and foil border craft details are clearly "
        "visible, the sticker fully in frame with margin on all sides; the printed "
        "design must show the full artwork (scalloped die-cut shape, double foil "
        "border, floral-feather pattern, STICK YOUR VIBE lettering), enlarged so "
        "the foil outline and floral pattern are visible; the printed area must "
        "show the full design, never a blank surface with text only; the same "
        "artwork, same colors, same typography and same foil finish as the HERO "
        "image. No brand name anywhere (no BriteMar, no BriteMark, no studio "
        "name, no logo watermark in any corner). Background must be clean and "
        "plain; sticker close-up shows the full design (die-cut shape, foil "
        "border, floral pattern, STICK YOUR VIBE lettering) and visible water "
        "drops or moisture on the sticker surface to demonstrate the waterproof "
        "selling point. NEGATIVES (P0-1): no extreme close-up, no 90% frame fill, "
        "no 2X enlargement, no plain unprinted surface, no blank sticker face, "
        "no missing artwork, no different design from the hero image, no color "
        "mismatch, no dry sticker without water drops."
    ),
}

# Inject into rules
skus['BC-001'] = bc001_v2
skus['ST-001'] = st001_v2
rules['SKUS'] = skus
rules['version'] = rules.get('version', '') + ' + P0-4-v20.9.1 (2026-08-17 02:18)'

# Write
with open(path, 'w', encoding='utf-8') as f:
    json.dump(rules, f, ensure_ascii=False, indent=2)

print('New file size:', os.path.getsize(path), 'bytes')
print()
print('BC-001 view lengths:')
for k, v in bc001_v2.items():
    print('  ' + k + ': ' + str(len(v)) + ' chars')
print()
print('ST-001 view lengths:')
for k, v in st001_v2.items():
    print('  ' + k + ': ' + str(len(v)) + ' chars')
print()
print('Version:', rules['version'])
print()
print('--- P0-4 marker check (BC-001 HERO) ---')
print('  contains "P0-4 SCENE-SELLING-POINT":', 'P0-4 SCENE-SELLING-POINT' in bc001_v2['HERO'])
print('  contains "foil-stamped":', 'foil-stamped' in bc001_v2['HERO'])
print('  contains "warm light":', 'warm light' in bc001_v2['HERO'])
print()
print('--- P0-4 marker check (ST-001 HERO) ---')
print('  contains "P0-4 SCENE-SELLING-POINT":', 'P0-4 SCENE-SELLING-POINT' in st001_v2['HERO'])
print('  contains "waterproof":', 'waterproof' in st001_v2['HERO'])
print('  contains "Hydro Flask":', 'Hydro Flask' in st001_v2['HERO'])
print('  contains "water drops":', 'water drops' in st001_v2['HERO'])
