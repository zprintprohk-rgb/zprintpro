# -*- coding: utf-8 -*-
# 修正: 用行号范围定位 4 个 slug 块并改 title
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
p = r'F:\zprintpro-nextjs\src\data\blog-posts.ts'
lines = open(p, encoding='utf-8').read().split('\n')

# (slug_line_idx, locale, 新 title)
TARGETS = [
    (491, 'ja', '中綴じ冊子印刷 10冊から ¥258/冊〜 低MOQ ZprintPro'),
    (509, 'zh-hk', '香港海報印刷 HK$9起：尺寸・紙質・工藝・設計要點 | 智印港'),
    (854, 'zh-hk', '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案 智印港'),
    (1517, 'zh-hk', 'A1 A2 海報印刷價格 HK$9起 單價紙材批量折扣 | 智印港'),
]
for sidx, loc, new in TARGETS:
    # 从 slug 行向后找 title 块
    found = None
    for i in range(sidx, min(sidx + 60, len(lines))):
        if re.match(r'\s*title: \{', lines[i]):
            found = i
            break
    if found is None:
        print(f'NO title block after slug@{sidx}'); continue
    # title 块内找 locale 行
    loc_re = re.compile(r'^\s*' + re.escape(loc) + r': "(.*)",?\s*$')
    done = False
    for j in range(found, min(found + 6, len(lines))):
        m = loc_re.match(lines[j])
        if m:
            old = m.group(1)
            indent = lines[j][:len(lines[j]) - len(lines[j].lstrip())]
            lines[j] = indent + loc + ': "' + new + '",'
            print(f'slug@{sidx} {loc}: {old[:40]} -> {new[:40]}')
            done = True
            break
    if not done:
        print(f'slug@{sidx} locale {loc} NOT FOUND in title block')
open(p, 'w', encoding='utf-8').write('\n'.join(lines))
print('done')
