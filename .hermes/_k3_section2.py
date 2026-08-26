# -*- coding: utf-8 -*-
import urllib.request, re
url = 'https://zprintpro.com/zh-hk/about/'
req = urllib.request.Request(url, headers={'User-Agent': 'M3-section2'})
with urllib.request.urlopen(req, timeout=15) as resp:
    body = resp.read().decode('utf-8')
# Get the section after 廠房與設備 (idx 24634)
start = 24634
end = body.find('</section>', start + 500)  # find the matching close
if end < 0:
    end = start + 30000
section = body[start:end]
print('section bytes:', len(section))
print('figures in section:', section.count('<figure'))
print('imgs in section:', section.count('<img'))
# Find any HTML error / incomplete tags
opens = section.count('<div')
closes = section.count('</div>')
print('div open/close:', opens, '/', closes)
# Save
with open(r'F:\zprintpro-nextjs\.hermes\_k3_about_section.html', 'w', encoding='utf-8') as f:
    f.write(section)
# Print first 2000 chars
print('--- first 2000 chars ---')
print(section[:2000])
