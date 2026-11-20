# -*- coding: utf-8 -*-
# 站点级回归抽探: roll  gallery alt / 婚礼 hero / Tier1 链 / blog og
import requests, re
UA = {'User-Agent': 'Mozilla/5.0'}
r = requests.get('https://zprintpro.com/zh-hk/product/roll-stickers/', headers=UA, timeout=30)
hits = re.findall(r'alt="(卷裝[^"]{10,})"', r.text)
print('roll gallery GEO alt:', hits[:1] if hits else 'FAIL')

r = requests.get('https://zprintpro.com/en/product/foil-wedding-invitations/', headers=UA, timeout=30)
print('wedding hero present:', 'zprintpro-wedding-invitations-foil-wedding-invitations-en-hero.webp' in r.text)

r2 = requests.get('https://zprintpro.com/zh-hk/product/drink-tokens/', headers=UA, timeout=30, allow_redirects=False)
loc = r2.headers.get('Location', '')
r3 = requests.get('https://zprintpro.com' + loc, headers=UA, timeout=30) if loc.startswith('/') else None
print('drink-tokens chain:', r2.status_code, '->', loc, '->', (r3.status_code if r3 is not None else '?'))

r4 = requests.get('https://zprintpro.com/zh-hk/blog/textbook-printing-guide/', headers=UA, timeout=30)
og = re.findall(r'og:image" content="([^"]+)"', r4.text)
print('blog og:', og[0].replace('https://zprintpro.com', '') if og else 'FAIL')
