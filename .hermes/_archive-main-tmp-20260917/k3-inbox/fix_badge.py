#!/usr/bin/env python3
"""Fix BADGE_LAYOUT_ZHHK to pure 繁中."""
import sys
sys.stdout.reconfigure(encoding='utf-8')

fp = r'F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v24.py'
with open(fp, 'r', encoding='utf-8') as f:
    text = f.read()

# Find the BADGE_LAYOUT_ZHHK line by searching
import re
m = re.search(r'BADGE_LAYOUT_ZHHK = "([^"]+)"', text)
if m:
    old_value = m.group(1)
    print(f'Found BADGE_LAYOUT_ZHHK: {old_value[:80]}...')
    new_value = '在畫面右上方加入鮮明大中國紅色爆炸贴，內含3個簡短繁體中文賣點（非價格類，每點6字以內）：「{p1}」 / 「{p2}」 / 「{p3}」。白字加粗、節慶感、吸引點擊、但不俗豔、不過度搶眼。'
    new_text = text.replace(f'BADGE_LAYOUT_ZHHK = "{old_value}"', f'BADGE_LAYOUT_ZHHK = "{new_value}"')
    if new_text != text:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print('OK updated')
    else:
        print('FAIL no change')
else:
    print('BADGE_LAYOUT_ZHHK not found')
