# -*- coding: utf-8 -*-
import urllib.request, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-fullsec'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# Find 廠房與設備 section end
start = body.find('拍板: 廠房與設備')
if start == -1:
    start = body.find('Bento 深色畫廊')
if start == -1:
    start = body.find('深圳自設廠房')
if start == -1:
    start = body.find('廠房與設備')
print('start:', start)
# Find matching </section>
depth = 0
i = start
end = -1
while i < len(body):
    nxt_open = body.find('<section', i + 1)
    nxt_close = body.find('</section>', i + 1)
    if nxt_close == -1:
        break
    if nxt_open != -1 and nxt_open < nxt_close:
        depth += 1
        i = nxt_open
    else:
        if depth == 0:
            end = nxt_close + len('</section>')
            break
        depth -= 1
        i = nxt_close
print('end:', end)
section = body[start:end] if end > 0 else body[start:start+20000]
print('section bytes:', len(section))
# Save full
with open(r'F:\zprintpro-nextjs\.hermes\_k3_section_full.html', 'w', encoding='utf-8') as f:
    f.write(section)
# Count
print('  figures:', section.count('<figure'))
print('  imgs:', section.count('<img'))
print('  stage labels 01-06:')
for n in range(1, 7):
    s = str(n).zfill(2)
    cnt = section.count('>{0}<'.format(s))
    print('    {0}: {1} (in <span>)'.format(s, cnt))
# Print the section raw
print('--- raw section ---')
print(section[:8000])
