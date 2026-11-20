# -*- coding: utf-8 -*-
import urllib.request, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# 1. background-image 引用
bg_refs = re.findall(r'url\([\"\']?(/images/factory/[\w-]+\.webp)[\"\']?\)', body)
print('background-image /images/factory/ ({0}):'.format(len(set(bg_refs))))
for r in sorted(set(bg_refs)):
    print('  -', r)
print()
# 2. 任何 source srcset 引用
ss_refs = re.findall(r'srcset=[\"\']([^\"\']+)[\"\']', body)
print('srcset 数: {0}'.format(len(ss_refs)))
for ss in ss_refs[:3]:
    print('  -', ss[:200])
print()
# 3. 任何 _next/image url=
nx_refs = re.findall(r'_next/image\?[^\"\']+', body)
print('_next/image url 数: {0}'.format(len(nx_refs)))
for nx in sorted(set(nx_refs))[:5]:
    print('  -', nx[:200])
print()
# 4. showcase 引用 (K3 11:22 成品盒子)
sc = re.findall(r'showcase[\w-]*', body)
print('showcase 出现 ({0}):'.format(len(sc)))
for s in sorted(set(sc))[:10]:
    print('  -', s)
print()
# 5. factory-press-pano (K3 11:22 印刷机长图)
fp = re.findall(r'factory-press[\w-]*', body)
print('factory-press 系列:')
for s in sorted(set(fp))[:5]:
    print('  -', s)
