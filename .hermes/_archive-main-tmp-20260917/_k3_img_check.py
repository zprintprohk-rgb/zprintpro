# -*- coding: utf-8 -*-
import urllib.request, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-verify'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# 找所有 <img ...>
img_tags = re.findall(r'<img[^>]+>', body)
print('zh-hk /about/ <img> 标签: {0}'.format(len(img_tags)))
# 显示前 5
for i, t in enumerate(img_tags[:5]):
    print('[{0}] {1}'.format(i+1, t[:200]))
print('...')
# 找 /images/factory/ 引用
img_refs = re.findall(r'/images/factory/[\w-]+\.webp', body)
print('\n所有 /images/factory/ 引用 ({0}):'.format(len(set(img_refs))))
for r in sorted(set(img_refs)):
    print('  -', r)
# next/image 优化 URL
nx_refs = re.findall(r'/_next/image\?url=[^"\']+', body)
print('\nnext/image 优化 URL ({0}):'.format(len(set(nx_refs))))
for r in sorted(set(nx_refs))[:8]:
    print('  -', r[:120])
