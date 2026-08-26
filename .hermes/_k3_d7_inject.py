#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""D-7 整改: BC-001 SPREAD → CARD-STAND (5 张立牌展示, 去书式先验).
K3 8/17 03:19 拍板: SPREAD 仍触发书式跨页, 改 per-SKU 形态视图.
"""
import json
import os

path = r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json'
with open(path, 'r', encoding='utf-8') as f:
    rules = json.load(f)

# BC-001 SPREAD → CARD-STAND (5 张立牌展示)
bc001_card_stand = (
    "P0-4 SCENE-SELLING-POINT (K3 8/17 03:20 D-7 directive, v20.9.2): the "
    "greeting card's core selling point is FOIL-STAMPED - the 5-card display "
    "MUST show the gold foil border catching warm light on every card; warm "
    "golden-hour or candlelight is mandatory; not a flat daylight shot; not a "
    "plain white background. CARD-STAND DISPLAY (per-SKU real product form, "
    "replaces SPREAD concept, K3 D-7 directive 8/17 03:19): show 5 standalone "
    "greeting cards standing upright like greeting card display stands - each "
    "card is a SINGLE folded card with its own back support, standing "
    "vertically on a surface, arranged in a row or slight arc; each card "
    "shows the same full front design as the DETAIL master (foil border + "
    "botanical sprig + serif lettering). DO NOT show a folded paper / fan-fold "
    "/ accordion / book / booklet / two-page spread / book spine / pages / "
    "page numbers / chapter layout / folded sheet - those are book concepts, "
    "not card display; this is 5 separate individual cards each standing on "
    "its own, NOT one piece of paper folded multiple times. The 5 cards are "
    "individually displayed cards, like a greeting card shop display or a "
    "wedding card table arrangement, where each card is its own complete "
    "physical object. Each card occupies 25-35% of the frame in width, with "
    "all 5 cards visible together showing the same foil-stamped design. "
    "DESIGN MASTER (from the approved DETAIL close-up, must be reproduced "
    "identically on EACH card): the greeting card front shows (1) a thin gold "
    "foil border frame running along the card edge like a picture frame; (2) a "
    "realistic botanical sprig motif with visible leaf veins, lightly debossed "
    "or foil-printed at the lower right corner of the card; (3) the two-line "
    "centered high-contrast serif lettering 'WITH GRATITUDE' / 'AND WARMTH' in "
    "all caps with wide letter-spacing, same elegant serif as the DETAIL view; "
    "(4) warm cream card stock with soft paper fiber texture. The card front "
    "must display this full design - never a blank surface with plain text "
    "only in the middle. Each of the 5 cards shows the full design - no blank "
    "card front, no text-only card. The ONLY text allowed anywhere is the "
    "phrase 'WITH GRATITUDE AND WARMTH' spelled exactly correct, in clean "
    "serif, on the greeting cards only; no other letters, numbers or "
    "characters anywhere. NEGATIVES (P0-4 + D-7): no flat daylight, no plastic "
    "look, no generic scene without warm metallic light, no card without "
    "visible gold reflection; no folded paper, no fan-fold, no accordion, no "
    "book, no booklet, no two-page spread, no book spine, no page numbers, no "
    "chapters, no folded sheet, no greeting card book, no paper book."
)

# Inject: BC-001 SPREAD → CARD-STAND (per-SKU rename)
skus = rules['SKUS']
if 'BC-001' in skus and 'SPREAD' in skus['BC-001']:
    del skus['BC-001']['SPREAD']
    skus['BC-001']['CARD-STAND'] = bc001_card_stand
    print('BC-001: SPREAD removed, CARD-STAND added')
else:
    print('BC-001 SPREAD not found, current views:', list(skus.get('BC-001', {}).keys()))

# Update version
rules['version'] = rules.get('version', '') + ' + D-7-card-stand (2026-08-17 03:20)'

# Write
with open(path, 'w', encoding='utf-8') as f:
    json.dump(rules, f, ensure_ascii=False, indent=2)

print('New file size:', os.path.getsize(path), 'bytes')
print('Version:', rules['version'])
print()
print('BC-001 views after D-7:', list(skus['BC-001'].keys()))
print('ST-001 views unchanged:', list(skus['ST-001'].keys()))
