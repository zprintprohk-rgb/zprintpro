# -*- coding: utf-8 -*-
import os
path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()
changes = []
# zh-hk advantages 2
old = "{ title: '快速交付', desc: '數碼印刷當日可取，柯式印刷3–5天交貨。順豐速遞覆蓋香港全區，大批量可安排專車直送。緊急訂單專人跟進，確保準時交付。' },"
new = "{ title: '快速交付', desc: '數碼印刷 24h · 柯式印刷 3–5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · [聯絡我們](/contact/)' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk advantages 2', 'OK'))
# zh-hk teams 3
old = "{ title: '客戶服務團隊', desc: '流利粵語、英語、普通話及日語，提供24小時內回覆承諾，協助客戶解決從報價到售後的所有問題。' },"
new = "{ title: '客戶服務團隊', desc: '流利粵 / 普 / 英 / 日 四語 · 24 小時內回覆承諾 · 專屬 WhatsApp 支援 +86 198 8085 1334 · 從報價到售後全程跟進 · [聯絡我們](/contact/)' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk teams 3', 'OK'))

with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
with open(path, 'rb') as f:
    raw = f.read()
print('changes: {0}'.format(len(changes)))
print('size: {0} BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf'))
