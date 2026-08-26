# -*- coding: utf-8 -*-
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
keys = ["step: '4', title: '生產印刷'",
        "step: '5', title: '全球配送'",
        "title: '快速交付'",
        "title: '客戶服務團隊'",
        '海德堡 4 色柯式 + HP Indigo 數碼 + 6 道工序實拍',
        '順豐本地 24h + DHL/FedEx',
        '1000+ 訂單累計',
        '1,000+ 訂單累計']
for k in keys:
    cnt = src.count(k)
    print('{0}: {1}'.format(k[:50], cnt))
print()
print('wa.me: {0}'.format(src.count('wa.me')))
print('/category/: {0}'.format(src.count('/category/')))
print('/blog/: {0}'.format(src.count('/blog/')))
print('#factory: {0}'.format(src.count('#factory')))
print('/contact/: {0}'.format(src.count('/contact/')))
print('198 8085 1334: {0}'.format(src.count('198 8085 1334')))
