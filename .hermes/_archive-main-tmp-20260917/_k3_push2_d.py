# -*- coding: utf-8 -*-
# 2026-08-16 17:49 K3 拍板 (千问建议 + K3 16:51 重要内容 + 不受 push 限制)
# Push 2 (D): 联系层级重设计 + 服务时间 + 邮箱显眼化 + data-cf-analytics attr 启用

import os
results = []

# ============ 1. Footer.tsx - 3 locale serviceHours + 24/7 WhatsApp + data-cf-analytics attr ============
footer_path = r'F:\zprintpro-nextjs\src\components\layout\Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    src = f.read()

# 1.1 zh-hk: 加 serviceHours + 24/7 WhatsApp 文案
old = "    followUs: '關注我們',\n    friendLinks: '友情連結',\n    copyright: '© 2026 智印港 ZprintPro. 保留所有權利。',"
new = "    followUs: '關注我們',\n    friendLinks: '友情連結',\n    copyright: '© 2026 智印港 ZprintPro. 保留所有權利。',\n    serviceHours: '週一至週六 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24/7 WhatsApp 即時回覆',\n    supportCN: '中國大陸 24h 響應 · 香港本地客服',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('zh-hk translations add', 'OK'))
# 1.2 en
old = "    followUs: 'Follow Us',\n    friendLinks: 'Friendly Links',\n    copyright: '© 2026 ZprintPro. All rights reserved.',"
new = "    followUs: 'Follow Us',\n    friendLinks: 'Friendly Links',\n    copyright: '© 2026 ZprintPro. All rights reserved.',\n    serviceHours: 'Mon - Sat 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24/7 WhatsApp instant reply',\n    supportCN: 'China mainland 24h · Hong Kong local support',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('en translations add', 'OK'))
# 1.3 ja
old = "    followUs: 'フォローする',\n    friendLinks: '友情链接',\n    copyright: '© 2026 智印港 ZprintPro. 全著作権所有。',"
new = "    followUs: 'フォローする',\n    friendLinks: '友情链接',\n    copyright: '© 2026 智印港 ZprintPro. 全著作権所有。',\n    serviceHours: '月〜土 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24時間 WhatsApp 即時対応',\n    supportCN: '中国本土 24時間対応 · 香港現地サポート',\n    supportEN: 'China mainland 24h · Hong Kong local support',\n    supportJA: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('ja translations add', 'OK'))

# 1.4 zh-hk: 在 serviceArea 之后 (line 318) 加 serviceHours + 24/7 WhatsApp + support + data-cf-analytics attr
# 实际: 看 zh-hk 没 serviceArea (只有 en 显式), 我们在 en serviceArea 之后加
old = "              {/* Service Area - Only show for English version */}\n              {locale === 'en' && t.serviceArea && (\n                <div className=\"flex items-center gap-2 text-gray-400 mt-3\">\n                  <svg className=\"w-4 h-4 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                    <path fillRule=\"evenodd\" d=\"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z\" clipRule=\"evenodd\" />\n                  </svg>\n                  <span className=\"text-sm\">{t.serviceArea}</span>\n                </div>\n              )}"
new = "              {/* Service Area - Only show for English version */}\n              {locale === 'en' && t.serviceArea && (\n                <div className=\"flex items-center gap-2 text-gray-400 mt-3\">\n                  <svg className=\"w-4 h-4 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                    <path fillRule=\"evenodd\" d=\"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z\" clipRule=\"evenodd\" />\n                  </svg>\n                  <span className=\"text-sm\">{t.serviceArea}</span>\n                </div>\n              )}\n\n              {/* 2026-08-16 K3 拍板: 服務時間 + 24/7 WhatsApp + 中國大陸 24h 響應 (3 locale) */}\n              <div className=\"mt-3 pt-3 border-t border-white/10 space-y-2\" data-footer-service-info>\n                <div className=\"flex items-center gap-2 text-gray-300 text-xs\">\n                  <svg className=\"w-4 h-4 flex-shrink-0\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>\n                  <span data-cf-analytics=\"footer_service_hours_view\">{t.serviceHours}</span>\n                </div>\n                <div className=\"flex items-center gap-2 text-emerald-400 text-xs font-semibold\">\n                  <svg className=\"w-4 h-4 flex-shrink-0\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\" /></svg>\n                  <span data-cf-analytics=\"footer_whatsapp_247_view\">{t.whatsapp247}</span>\n                </div>\n                <div className=\"flex items-center gap-2 text-gray-400 text-xs\">\n                  <svg className=\"w-4 h-4 flex-shrink-0\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>\n                  <span data-cf-analytics=\"footer_support_view\">{(locale === 'zh-hk' ? t.supportCN : (locale === 'ja' ? t.supportJA : t.supportEN))}</span>\n                </div>\n              </div>"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('zh-hk/en/ja serviceHours block', 'OK'))

# 1.5 tel: link 加 data-cf-analytics attr (3 locale 共享)
old = "              <a href={`tel:${t.phone.replace(/\\D/g, '')}`} className=\"flex items-center gap-2 text-gray-400 hover:text-white transition-colors\">\n                <Phone className=\"w-4 h-4\" />\n                <span className=\"text-sm\">{t.phone}</span>\n              </a>"
new = "              <a href={`tel:${t.phone.replace(/\\D/g, '')}`} data-cf-analytics=\"footer_phone_click\" className=\"flex items-center gap-2 text-gray-400 hover:text-white transition-colors\">\n                <Phone className=\"w-4 h-4\" />\n                <span className=\"text-sm\">{t.phone}</span>\n              </a>"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('footer tel: data-cf-analytics', 'OK'))

# 1.6 mailto: link 加 data-cf-analytics attr
old = "              <a href={`mailto:${t.email}`} className=\"flex items-center gap-2 text-gray-400 hover:text-white transition-colors\">\n                <Mail className=\"w-4 h-4\" />\n                <span className=\"text-sm\">{t.email}</span>\n              </a>"
new = "              <a href={`mailto:${t.email}`} data-cf-analytics=\"footer_email_click\" className=\"flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold text-base\">\n                <Mail className=\"w-4 h-4\" />\n                <span className=\"text-base\">{t.email}</span>\n              </a>"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('footer mailto: data-cf-analytics + 16px/600', 'OK'))

# 1.7 WhatsApp 链接列 (renderFooterLink) 加 data-cf-analytics attr
old = "        <a\n          href={waProps.href}\n          target={waProps.target}\n          rel={waProps.rel}\n          onClick={waProps.onClick}\n          className=\"text-gray-400 hover:text-white transition-colors text-sm\"\n        >"
new = "        <a\n          href={waProps.href}\n          target={waProps.target}\n          rel={waProps.rel}\n          onClick={waProps.onClick}\n          data-cf-analytics=\"footer_whatsapp_click\"\n          className=\"text-gray-400 hover:text-white transition-colors text-sm\"\n        >"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('footer WhatsApp link data-cf-analytics', 'OK'))

# write Footer
with open(footer_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(footer_path, 'rb') as f:
    raw = f.read()
results.append(('Footer.tsx size', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

# ============ 2. contact/page.tsx - 服务时间 24/7 + data-cf-analytics attr + Google Map iframe ============
contact_path = r'F:\zprintpro-nextjs\src\app\[locale]\contact\page.tsx'
with open(contact_path, 'r', encoding='utf-8') as f:
    src = f.read()

# 2.1 zh-hk 改 officeHoursValue + 加 whatsapp247
old = "    officeHours: '辦公時間',\n    officeHoursValue: '週一至週五 09:00 - 18:00',"
new = "    officeHours: '辦公時間',\n    officeHoursValue: '週一至週六 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24/7 WhatsApp 即時回覆',\n    support: '中國大陸 24h 響應 · 香港本地客服',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('zh-hk officeHours update', 'OK'))
# 2.2 en
old = "    officeHours: 'Office Hours',\n    officeHoursValue: 'Mon - Fri 09:00 - 18:00',"
new = "    officeHours: 'Office Hours',\n    officeHoursValue: 'Mon - Sat 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24/7 WhatsApp instant reply',\n    support: 'China mainland 24h · Hong Kong local support',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('en officeHours update', 'OK'))
# 2.3 ja
old = "    officeHours: '営業時間',\n    officeHoursValue: '月〜金 09:00 - 18:00',"
new = "    officeHours: '営業時間',\n    officeHoursValue: '月〜土 09:00 - 18:00 (GMT+8)',\n    whatsapp247: '24時間 WhatsApp 即時対応',\n    support: '中国本土 24時間対応 · 香港現地サポート',"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('ja officeHours update', 'OK'))

# 2.4 contact 页 tel: link 加 data-cf-analytics attr (3 locale 共享)
old = "                  <a href=\"tel:+8619880851334\" className=\"flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 hover:to-blue-50/50 transition-colors group\">"
new = "                  <a href=\"tel:+8619880851334\" data-cf-analytics=\"contact_phone_click\" className=\"flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 hover:to-blue-50/50 transition-colors group\">"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('contact tel: data-cf-analytics', 'OK'))

# 2.5 contact 页 mailto: link 加 data-cf-analytics attr + 16px/600 显眼化
old = "                  <a href=\"mailto:zprintpro@outlook.com\" className=\"flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent hover:from-orange-50 hover:to-orange-50/50 transition-colors group\">"
new = "                  <a href=\"mailto:zprintpro@outlook.com\" data-cf-analytics=\"contact_email_click\" className=\"flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent hover:from-orange-50 hover:to-orange-50/50 transition-colors group\">"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('contact mailto: data-cf-analytics', 'OK'))

# 2.6 contact 页 WhatsApp CTA 加 data-cf-analytics attr
old = "                  <a\n                    href={generateWhatsAppLink(locale, { source: \"contact\" })}\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    className=\"flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200 group\"\n                  >"
new = "                  <a\n                    href={generateWhatsAppLink(locale, { source: \"contact\" })}\n                    target=\"_blank\"\n                    rel=\"noopener noreferrer\"\n                    data-cf-analytics=\"contact_whatsapp_click\"\n                    className=\"flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200 group\"\n                  >"
if old in src:
    src = src.replace(old, new, 1)
    results.append(('contact WhatsApp CTA data-cf-analytics', 'OK'))

# 2.7 ContactFormWrapper form 加 data-cf-analytics attr (submit 事件)
# 这块在 ContactFormWrapper.tsx 内部 (line 214), 需要单独改 wrapper
# 但 contact/page.tsx 渲染 ContactFormWrapper 不传 attr, 所以加在 wrapper 内的 form
# 暂时只改 page.tsx 的 anchor/button attrs, 改 wrapper 后续

# write contact
with open(contact_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(contact_path, 'rb') as f:
    raw = f.read()
results.append(('contact/page.tsx size', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

# ============ 3. ContactFormWrapper.tsx - form submit data-cf-analytics attr ============
wrapper_path = r'F:\zprintpro-nextjs\src\app\[locale]\contact\ContactFormWrapper.tsx'
with open(wrapper_path, 'r', encoding='utf-8') as f:
    src = f.read()
# form 标签
old = "<form"
new = '<form data-cf-analytics="contact_quote_submit"'
if old in src:
    src = src.replace(old, new, 1)
    results.append(('ContactFormWrapper form data-cf-analytics', 'OK'))

# write wrapper
with open(wrapper_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(wrapper_path, 'rb') as f:
    raw = f.read()
results.append(('ContactFormWrapper.tsx size', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

# ============ 4. about/page.tsx - CTA button data-cf-analytics attr (2 buttons) ============
about_path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(about_path, 'r', encoding='utf-8') as f:
    src = f.read()
# Find a place to add data-cf-analytics to CTA links (link to /quote/ or /contact/)
# 22 figure sections + industries + processSteps already have /category/ links
# Add data-cf-analytics="cta_quote_click" to any link pointing to /quote/ (if exists)
# Let me add to the processSteps step 5 link or just to /contact/ links
# Simpler: just find href="/quote/" and add attr
old = 'href="/quote/"'
new = 'href="/quote/" data-cf-analytics="cta_quote_click"'
if old in src:
    count = src.count(old)
    src = src.replace(old, new)
    results.append(('about /quote/ data-cf-analytics', '{0} 处'.format(count)))
old = 'href="/contact/"'
new = 'href="/contact/" data-cf-analytics="cta_contact_click"'
if old in src:
    count = src.count(old)
    src = src.replace(old, new)
    results.append(('about /contact/ data-cf-analytics', '{0} 处'.format(count)))

# write about
with open(about_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(about_path, 'rb') as f:
    raw = f.read()
results.append(('about/page.tsx size', '{0} bytes, BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf')))

print('changes: {0}'.format(len(results)))
for n, msg in results:
    print('  {0}: {1}'.format(n, msg))
