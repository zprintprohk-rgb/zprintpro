# -*- coding: utf-8 -*-
import urllib.request, time, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-full'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# Look for the gallery section start
m = re.search(r'(?:工廠|設備|設備實拍|工廠設備).*?(?=<\!--|\Z)', body, re.DOTALL)
if m:
    snippet = m.group(0)
    print('factory section length:', len(snippet))
    # Count figures in this section
    print('  figures:', snippet.count('<figure'))
    print('  imgs:', snippet.count('<img'))
    # Find figure positions
    positions = [m.start() for m in re.finditer(r'<figure', snippet)]
    print('  figure positions (relative):', positions)
# Look for any script that hydrates content
print()
# Find the RSC payload
rsc = body.count('self.__next_f.push')
print('RSC push count:', rsc)
# Find the entire factory section raw
idx_start = body.find('工廠車間')
if idx_start == -1:
    idx_start = body.find('equipment real photos')
if idx_start == -1:
    idx_start = body.find('equipment')
if idx_start >= 0:
    # Get 5000 chars
    snippet = body[idx_start:idx_start+8000]
    print('section starts at', idx_start, 'length', len(snippet))
    print(snippet[:2000])
