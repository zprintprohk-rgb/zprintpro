# -*- coding: utf-8 -*-
# blog-posts.ts: 单引号格式修正 title
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
lines = open(p, encoding='utf-8').read().split('\n')
TARGETS = [
    (491, 'ja', '中綴じ冊子印刷 10冊から ¥258/冊〜 低MOQ ZprintPro'),
    (509, 'zh-hk', '香港海報印刷 HK$9起：尺寸・紙質・工藝・設計要點 | 智印港'),
    (854, 'zh-hk', '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案 智印港'),
    (1517, 'zh-hk', 'A1 A2 海報印刷價格 HK$9起 單價紙材批量折扣 | 智印港'),
]
for sidx, loc, new in TARGETS:
    found = None
    for i in range(sidx, min(sidx + 60, len(lines))):
        if re.match(r'\s*title: \{', lines[i]):
            found = i; break
    if found is None:
        print(f'NO title block after slug@{sidx}'); continue
    loc_re = re.compile(r"^(\s*)" + re.escape(loc) + r": '(.*)',?\s*$")
    done = False
    for j in range(found, min(found + 6, len(lines))):
        m = loc_re.match(lines[j])
        if m:
            indent, old = m.group(1), m.group(2)
            lines[j] = indent + loc + ": '" + new + "',"
            print(f'slug@{sidx} {loc}: {old[:42]} -> {new[:42]}')
            done = True
            break
    if not done:
        print(f'slug@{sidx} locale {loc} NOT FOUND (单引号格式?)')
open(p, 'w', encoding='utf-8').write('\n'.join(lines))
print('done')
