with open(r'F:\zprintpro-nextjs\src\lib\seo.ts', 'rb') as f:
    raw = f.read()
src = raw.decode('utf-8')
# Find '包裝盒訂製' in src
needle = '包裝盒訂製'
idx = src.find(needle)
print(f'Found at: {idx}')
if idx >= 0:
    # Show context
    print(f'Context: {repr(src[idx-30:idx+100])}')
print()
# Check the second 'zh-hk' line
zh_lines = []
pos = 0
while True:
    idx = src.find("'zh-hk':", pos)
    if idx < 0: break
    zh_lines.append(idx)
    pos = idx + 1
print(f'Total zh-hk lines: {len(zh_lines)}')
# Find one with 包裝
for idx in zh_lines:
    if '包裝盒' in src[idx:idx+200]:
        print(f'At {idx}: {repr(src[idx:idx+150])}')
        break
