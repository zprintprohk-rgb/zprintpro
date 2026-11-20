# -*- coding: utf-8 -*-
import os
footer_path = r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    src = f.read()
old = "    followUs: 'フォロー',\n    friendLinks: '友好リンク',\n    copyright: '© 2026 ZprintPro. All rights reserved.',"
new = "    followUs: 'フォロー',\n    friendLinks: '友好リンク',\n    copyright: '© 2026 ZprintPro. All rights reserved.',\n    serviceHours: '月〜土 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24時間 WhatsApp 即時対応',\n    supportCN: '中国本土 24時間対応 · 香港現地サポート',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    print('ja: OK')
else:
    print('ja NOT FOUND')
with open(footer_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
