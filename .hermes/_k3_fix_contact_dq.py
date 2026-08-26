# -*- coding: utf-8 -*-
import os
contact_path = r'F:\zprintpro-nextjs\src\app\[locale]\contact\page.tsx'
with open(contact_path, 'r', encoding='utf-8') as f:
    src = f.read()
# zh-hk
old = '    officeHours: "辦公時間",\n    officeHoursValue: "週一至週五 09:00 - 18:00",'
new = '    officeHours: "辦公時間",\n    officeHoursValue: "週一至週六 09:00 - 18:00 (GMT+8)",\n    whatsapp247: "24/7 WhatsApp 即時回覆",\n    support: "中國大陸 24h 響應 · 香港本地客服",'
if old in src:
    src = src.replace(old, new, 1)
    print('zh-hk: OK')
# en
old = '    officeHours: "Office Hours",\n    officeHoursValue: "Mon - Fri 09:00 - 18:00",'
new = '    officeHours: "Office Hours",\n    officeHoursValue: "Mon - Sat 09:00 - 18:00 (GMT+8)",\n    whatsapp247: "24/7 WhatsApp instant reply",\n    support: "China mainland 24h · Hong Kong local support",'
if old in src:
    src = src.replace(old, new, 1)
    print('en: OK')
# ja
old = '    officeHours: "営業時間",\n    officeHoursValue: "月〜金 09:00 - 18:00",'
new = '    officeHours: "営業時間",\n    officeHoursValue: "月〜土 09:00 - 18:00 (GMT+8)",\n    whatsapp247: "24時間 WhatsApp 即時対応",\n    support: "中国本土 24時間対応 · 香港現地サポート",'
if old in src:
    src = src.replace(old, new, 1)
    print('ja: OK')

# JSX render area: t.officeHoursValue render 处加 24/7 + support
# Look for t.officeHoursValue in render area
old = '<p className="text-sm text-gray-600 mt-0.5">{t.officeHoursValue}</p>'
new = '<p className="text-sm text-gray-600 mt-0.5" data-cf-analytics="contact_office_hours_view">{t.officeHoursValue}</p>\n                  <p className="text-xs text-emerald-600 mt-1 font-semibold" data-cf-analytics="contact_whatsapp_247_view">📲 {t.whatsapp247}</p>\n                  <p className="text-xs text-gray-500 mt-0.5" data-cf-analytics="contact_support_view">{t.support}</p>'
if old in src:
    src = src.replace(old, new, 1)
    print('JSX render: OK')

with open(contact_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(contact_path, 'rb') as f:
    raw = f.read()
print('size:', len(raw), 'BOM:', raw[:3] == b'\xef\xbb\xbf')
