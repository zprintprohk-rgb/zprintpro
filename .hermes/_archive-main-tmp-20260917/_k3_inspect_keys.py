content = open('src/data/category-seo-content.ts', encoding='utf-8').read()
lines = content.split('\n')

# 看 L4603-4700 我新加的 zh-hk 块 — 找 字段 (top-level property keys)
print('--- L4603-4700 字段 (top-level, 4-space indent) ---')
seen_keys = set()
for i in range(4602, 4700):
    if i < len(lines):
        l = lines[i]
        if l.startswith('      ') and ':' in l and not l.startswith('       '):
            # 找 property key
            key = l.strip().split(':')[0]
            if key in seen_keys:
                print(f'  L{i+1} DUP: ' + key + ' | ' + l[:80])
            else:
                seen_keys.add(key)
                print(f'  L{i+1}: ' + key)
