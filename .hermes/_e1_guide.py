import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
data = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\en.json', encoding='utf-8'))
import json as j
# 按 slug 找
for k, v in data.items():
    if isinstance(v, dict) and v.get('slug') == 'sticker-buying-guide':
        c = v.get('content','')
        links = re.findall(r'href=\\?"([^\\"]+)\\?"', c)
        print('sticker-buying-guide content links:')
        for l in links:
            print('  ', l)
        print('len:', len(c))
        # 找 small batch 相关短语
        for m in re.finditer(r'small.batch', c, re.I):
            s = max(0, m.start()-60)
            print('  ctx: ...' + c[s:m.end()+60].replace(chr(10),' ')[:130] + '...')
