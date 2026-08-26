import re
with open(r'F:\zprintpro-nextjs\.hermes\k3-inbox\seedream_prompts_v20_87sku_4views.txt', 'r', encoding='utf-8') as f:
    text = f.read()
blocks = re.split(r'(?=^### SKU-\d+ \|)', text, flags=re.MULTILINE)
for b in blocks:
    if 'corrugated-boxes' in b[:200] or 'packaging' in b[:200]:
        m = re.search(r'\[HERO[^\]]*\] \((\d+)\s*chars\)', b)
        if m:
            print(f'V20 PKG HERO: {m.group(1)} chars')
        m2 = re.search(rf'\[HERO[^\]]*\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m2:
            print(f'Body: {m2.group(1)[:1000]}')
        break
