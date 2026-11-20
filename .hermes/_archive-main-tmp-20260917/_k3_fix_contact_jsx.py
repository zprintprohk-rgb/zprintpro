# -*- coding: utf-8 -*-
import os
contact_path = r'F:\zprintpro-nextjs\src\app\[locale]\contact\page.tsx'
with open(contact_path, 'r', encoding='utf-8') as f:
    src = f.read()
# Find officeHoursValue render block
i = src.find('t.officeHoursValue')
if i > 0:
    # find the <p> open before
    p_start = src.rfind('<p', max(0,i-500), i)
    # find </p> close after
    p_end = src.find('</p>', i) + len('</p>')
    print('block range:', p_start, p_end)
    old = src[p_start:p_end]
    print('OLD:')
    print(old)
    print()
    # build new with whatsapp247 + support
    new = old.replace(
        '                  {t.officeHoursValue}\n                </p>',
        '''                  {t.officeHoursValue}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1 font-semibold" data-cf-analytics="contact_whatsapp_247_view">📲 {t.whatsapp247}</p>
                  <p className="text-xs text-gray-500 mt-0.5" data-cf-analytics="contact_support_view">{t.support}</p>'''
    )
    src = src[:p_start] + new + src[p_end:]
    print('NEW:')
    print(new)
    print('OK')
with open(contact_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(contact_path, 'rb') as f:
    raw = f.read()
print('size:', len(raw), 'BOM:', raw[:3] == b'\xef\xbb\xbf')
