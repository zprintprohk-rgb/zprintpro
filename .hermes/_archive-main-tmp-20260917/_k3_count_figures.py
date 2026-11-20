# -*- coding: utf-8 -*-
import re
with open(r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx', 'r', encoding='utf-8') as f:
    src = f.read()
# Count <img tags
img_tags = re.findall(r'<img\s', src)
print('source <img tags: {0}'.format(len(img_tags)))
# Count <figure tags
figs = re.findall(r'<figure', src)
print('source <figure tags: {0}'.format(len(figs)))
# Unique webp
webps = re.findall(r'/images/factory/[\w-]+\.webp', src)
print('source unique webp: {0}'.format(len(set(webps))))
for w in sorted(set(webps)):
    print('  -', w)
# Find 'useTranslations' / 'createArray' / components if mapped
import_line = re.search(r'export default function', src)
if import_line:
    print('default function line:', import_line.start() + 1)
# Find the gallery section: search for factorySectionTitle
m = re.search(r'factorySectionTitle', src)
if m:
    print('factorySectionTitle line: {0}'.format(m.start() + 1))
# Find where all 24 imgs live
# Look for "galleries" or "galleryItems" array
arr = re.findall(r'(?:galleryItems|gallery|imgs|images)\s*[:=]', src)
print('gallery arrays: {0}'.format(len(arr)))
