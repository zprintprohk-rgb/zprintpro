import re
content = open('src/data/category-seo-content.ts', encoding='utf-8').read()
lines = content.split('\n')

# 1. 找 weddingInvitationsContent 块
print('--- weddingInvitationsContent 块位置 ---')
start = -1
for i, l in enumerate(lines):
    if 'weddingInvitationsContent' in l:
        print('  L' + str(i+1) + ': ' + l[:120])
        if start == -1 and re.search(r'=\s*\{', l):
            start = i

if start >= 0:
    # 找块结束
    depth = 0
    end_line = start
    for i in range(start, len(lines)):
        for c in lines[i]:
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0 and i > start:
                    end_line = i
                    break
        if end_line > start:
            break

    print('')
    print('  weddingInvitationsContent 块: L' + str(start+1) + '-L' + str(end_line+1) + ' = ' + str(end_line - start + 1) + ' lines')
    block = '\n'.join(lines[start:end_line+1])
    print('  size: ' + str(len(block)) + ' chars')
    # 字段
    fields = ['title', 'subtitle', 'intro', 'materialTable', 'specialOptions', 'techSpecs', 'serviceNodes', 'faq', 'processSteps', 'advantages', 'pillarIntro', 'keyFeatures', 'tldr', 'description']
    print('  --- 字段统计 ---')
    for f in fields:
        n = len(re.findall(r'\b' + f + r'\b', block))
        if n:
            print('  ' + f + ': ' + str(n) + ' hits')

    # 3 locale 子块
    print('')
    print('  --- 3 locale 子块 ---')
    for loc in ['zh-hk', 'en', 'ja']:
        m = re.findall(r"['\"]" + loc + r"['\"]\s*:", block)
        print('  ' + loc + ': ' + str(len(m)) + ' matches')

    # 提取 zh-hk 块 看长度
    print('')
    print('  --- zh-hk 块大小 ---')
    zh_start = block.find("'zh-hk':")
    if zh_start >= 0:
        depth = 0
        zh_end = zh_start
        for i in range(zh_start, len(block)):
            c = block[i]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    zh_end = i
                    break
        zh_block = block[zh_start:zh_end+1]
        print('  zh-hk size: ' + str(len(zh_block)) + ' chars')
