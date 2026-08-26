import re
h = open('.hermes/tmp-eprint-flyer.html', encoding='utf-8', errors='ignore').read()
# 找含 宣傳單張 / 書刊 的链接
for m in re.finditer(r'href="([^"]+)"[^>]*>([^<]{0,40}(?:宣傳單張|書刊|單張)[^<]{0,40})<', h):
    print(m.group(1), '|', m.group(2).strip())
print('---- 所有 product 链接 ----')
links = set(re.findall(r'href="(/[^"]*(?:product|print|item)[^"]*)"', h))
for l in sorted(links)[:40]:
    print(l)
