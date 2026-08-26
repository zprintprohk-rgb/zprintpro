# -*- coding: utf-8 -*-
import os
path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()
changes = []
# zh-hk processSteps step 4
old = "{ step: '4', title: '印刷生產', desc: '海德堡 4 色柯式 + HP Indigo 數碼印刷，ISO 9001 認證，Delta E ≤3 色彩控製。' },"
new = "{ step: '4', title: '印刷生產', desc: '海德堡 4 色柯式 + HP Indigo 數碼 + 6 道工序實拍 ([查看工序流 ↓](#factory)) · 主营 [貼紙](/category/stickers/) · [傳單](/category/flyers/) · [包裝盒](/category/packaging/) · [紙袋](/category/paper-bags/) · ISO 9001 認證 · Delta E ≤3 色彩管理 · 1,000+ 企業客戶信賴。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk step 4', old[:60]))
# zh-hk processSteps step 5
old = "{ step: '5', title: '全球送達', desc: '順豐速遞覆蓋香港全境，DHL/FedEx 全球 2-4 天直達。1000 本起享批量優惠價。' }"
new = "{ step: '5', title: '全球送達', desc: '順豐本地 24h + DHL/FedEx 全球 2-4 天 · 50+ 國家直送 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · [聯絡我們](/contact/)' }"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk step 5', old[:60]))
# zh-hk advantages 1 - check
old = "ISO 9001質量管理體系認證，海德堡四色柯式印刷，ICC色彩管理，Delta E ≤3色彩誤差控製。從印前到印後，每個環節均有專人檢查。' },"
new = "ISO 9001 + FSC 認證 · 海德堡四色柯式 + HP Indigo 數碼 + 6 道工序實拍 ([查看工序流 ↓](#factory)) · ICC 色彩管理 Delta E ≤3 · 1,000+ 企業客戶信賴。' },"
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk advantages 1', old[:60]))
else:
    # try find another
    pass
# zh-hk advantages 2 - title: '快速交付'
old = "{ title: '快速交付', desc: '數碼印刷當日可取，柯式印刷3–5天交貨。順豐速遞覆蓋香港全區，大批量可安排專車直送。緊急訂單專人跟進，'"
new = "{ title: '快速交付', desc: '數碼印刷 24h · 柯式印刷 3–5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · "
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk advantages 2', old[:60]))
# zh-hk teams 3
old = "客戶服務團隊', desc: '流利粵語、英語、普通話及日語均可對話。24 小時內回覆承諾，專屬 WhatsApp 支援 +86 198 8085 1334。從報價到售後全程跟進，'"
new = "客戶服務團隊', desc: '粵 / 普 / 英 / 日 四語 24h 響應 · 專屬 WhatsApp 支援 +86 198 8085 1334 · 從報價到售後全程跟進 · [聯絡我們](/contact/) · "
if old in src:
    src = src.replace(old, new, 1)
    changes.append(('zh-hk teams 3', old[:60]))

# write
with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
# verify
with open(path, 'rb') as f:
    raw = f.read()
print('changes: {0}'.format(len(changes)))
for n, _ in changes:
    print('  ✓ {0}'.format(n))
print('size: {0} BOM: {1}'.format(len(raw), raw[:3] == b'\xef\xbb\xbf'))
