import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open(r'F:\zprintpro-nextjs\src\data\pillar-content.ts', encoding='utf-8').read()
# 提取 ecoPaperBagGsmCluster 块
m = re.search(r'export const ecoPaperBagGsmCluster.*?\n};', src, re.S)
blk = m.group(0)
for loc in ['zh-hk', 'en', 'ja']:
    cm = re.search(r'\'' + loc + r'\':\s*\'(.*?)\',\s*\n\s*\'[a-z]{2,5}\':', blk, re.S)
    if not cm:
        cm = re.search(r'\'' + loc + r'\':\s*\'(.*?)\'\s*,', blk, re.S)
    if cm:
        content = cm.group(1)
        links = re.findall(r'href="([^"]+)"', content)
        print(f'[{loc}] 链接 {len(links)} 个: {links}')
        # 检查 href 含 {locale} 的
    else:
        print(f'[{loc}] 未提取')
# 检查 350 vs 250
print()
print('350 出现:', blk.count('350'))
print('250 出现:', blk.count('250'))
