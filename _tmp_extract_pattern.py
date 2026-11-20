import json, re
zh = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
c = zh['packaging-box-pricing-2026']['content']

# Extract div.alert block format
print('=== div.alert blocks in compliant Pillar 1 ===')
m = re.findall(r'<div class="bg-(?:amber|blue|red|green|gray)-50[^>]*>[\s\S]*?</div>', c)
for i, b in enumerate(m[:3]):
    print(f'--- block {i} ({len(b)} chars) ---')
    print(b[:500])
    print()

# Extract Person schema format
print('=== Person schema occurrence ===')
pi = c.find('"Person"')
if pi >= 0:
    print(c[max(0,pi-400):pi+500])
print()
print('=== linkedin occurrence ===')
li = c.find('linkedin.com')
if li >= 0:
    print(c[max(0,li-200):li+200])

# CTA placement
print()
print('=== wa.me CTA positions (relative %) ===')
for mm in re.finditer(r'wa\.me/8619880851334', c):
    print(f'  pos {mm.start()/len(c)*100:.0f}%')

# top-level entry keys
print()
print('=== entry keys + schemas field value ===')
e = zh['packaging-box-pricing-2026']
print('keys:', sorted(e.keys()))
print('schemas:', e.get('schemas'))
