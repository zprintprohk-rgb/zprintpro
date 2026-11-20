# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\src\data\pillar-content.ts', encoding='utf-8').read()
start = src.find("export const ecoPaperBagGsmCluster")
end = src.find("\nexport const ", start + 10)
blk = src[start:end]
cm = re.search(r"content: \{(.*?)\},", blk, re.S)
content_block = cm.group(1) if cm else ""
for loc in ['zh-hk', 'en', 'ja']:
    lm = re.search(r"'" + re.escape(loc) + r"': '(.*?)'(,|$)", content_block, re.S)
    if lm:
        c = lm.group(1)
        links = re.findall(r'href="([^"]+)"', c)
        pdp = [l for l in links if '/product/' in l]
        print(f'[{loc}] links {len(links)} | PDP {len(pdp)}: {pdp}')
    else:
        print(f'[{loc}] not matched')
