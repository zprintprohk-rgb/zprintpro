import re
for loc in ['en', 'ja', 'zh-hk']:
    text = open(f'F:\\zprintpro-nextjs\\seedream\\v24-prompts-{loc}.txt', 'r', encoding='utf-8').read()
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        if 'PKG-014' in b[:60]:
            for view in ['HERO', 'DETAIL']:
                m = re.search(rf'\[{view}\]\s*\((\d+)\s*chars\)', b)
                if m:
                    print(f'{loc} PKG-014 {view}: {m.group(1)} chars')
            break
