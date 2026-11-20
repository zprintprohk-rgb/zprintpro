# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\blog-posts.ts', encoding='utf-8').read()
for pat, label in [(r'¥64 起', 'cny ja ¥64'), (r'¥258/冊', 'saddle ja ¥258'),
                   (r'HK\$45起', 'yearbook zh HK$45'), (r'HK\$9起', 'poster zh HK$9')]:
    n = len(re.findall(pat, t))
    print(f'{label}: {n} 处')
# 确认旧值已清零
for old, label in [(r'HK\$1\.1 起 \| ZprintPro"', 'cny ja 旧 HK$1.1 残留'),
                   (r'完全ガイド：ページ数・用紙・価格 \|', 'saddle ja 旧 残留'),
                   (r'印刷指南 · 香港中學大學院校定制方案 \| 智印港', 'yearbook zh 旧 残留')]:
    print(f'{label}: {len(re.findall(old, t))} 处')
