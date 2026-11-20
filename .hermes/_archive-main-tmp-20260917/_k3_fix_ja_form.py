# -*- coding: utf-8 -*-
import os

# 1. Footer.tsx ja 修
footer_path = r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    src = f.read()
# ja 实际 followUs='フォロー', friendLinks='友好リンク', copyright='© 2026 ZprintPro. All rights reserved.'
old = "    followUs: 'フォローする',\n    friendLinks: '友情链接',\n    copyright: '© 2026 智印港 ZprintPro. 全著作権所有。',\n    serviceHours: '月〜土 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24時間 WhatsApp 即時対応',\n    supportCN: '中国本土 24時間対応 · 香港現地サポート',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
new = "    followUs: 'フォロー',\n    friendLinks: '友好リンク',\n    copyright: '© 2026 ZprintPro. All rights reserved.',\n    serviceHours: '月〜土 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24時間 WhatsApp 即時対応',\n    supportCN: '中国本土 24時間対応 · 香港現地サポート',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    print('ja translations: OK')
else:
    # try simpler search
    print('ja NOT FOUND, trying fragment match')
    if 'serviceHours: \'月〜土' in src:
        print('  ja serviceHours found but full block differs')
with open(footer_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)

# 2. QuoteForm.tsx form 加 data-cf-analytics attr
qf_path = r'F:\zprintpro-nextjs\src\components\quote\QuoteForm.tsx'
with open(qf_path, 'r', encoding='utf-8') as f:
    src = f.read()
old = '<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">'
new = '<form onSubmit={form.handleSubmit(onSubmit)} data-cf-analytics="contact_quote_submit" className="space-y-6">'
if old in src:
    src = src.replace(old, new, 1)
    print('QuoteForm form data-cf-analytics: OK')
else:
    print('QuoteForm form NOT FOUND')
with open(qf_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(qf_path, 'rb') as f:
    raw = f.read()
print('QuoteForm.tsx size:', len(raw), 'BOM:', raw[:3] == b'\xef\xbb\xbf')
