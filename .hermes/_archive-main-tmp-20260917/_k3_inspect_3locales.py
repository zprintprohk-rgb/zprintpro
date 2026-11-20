content = open('src/data/category-seo-content.ts', encoding='utf-8').read()
lines = content.split('\n')

# 找 const weddingInvitationsContent 块
start = -1
for i, l in enumerate(lines):
    if l.startswith('const weddingInvitationsContent'):
        start = i
        break

depth = 0
end = start
for i in range(start, len(lines)):
    for c in lines[i]:
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
    if depth == 0 and i > start:
        end = i
        break

print('  块: L' + str(start+1) + '-L' + str(end+1) + ' = ' + str(end - start + 1) + ' lines')

# 找各 locale 起点
for loc in ['zh-hk', 'en', 'ja']:
    for i in range(start, end):
        if lines[i].strip() == "'" + loc + "': {":
            print('  ' + loc + ': L' + str(i+1))
            break
