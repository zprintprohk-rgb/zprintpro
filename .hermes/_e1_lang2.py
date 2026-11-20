import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
base = 'F:/zprintpro-nextjs/src/data/blog-data/'
for f in ['en', 'zh-hk', 'ja']:
    data = json.load(open(base + f + '.json', encoding='utf-8'))
    v = data.get('sticker-guide')
    if not v:
        print('[' + f + '] 无 sticker-guide')
        continue
    c = v.get('content', '')
    has_pdp = re.findall(r'href="/(?:en|ja|zh-hk)/product/([^"]+)"', c)
    has_sb = '/product/small-batch-stickers/' in c
    print('[' + f + '] PDP链接=' + str(len(has_pdp)) + ' 个 | 已链 small-batch-stickers=' + str(has_sb))
    if has_pdp:
        print('    ' + ', '.join(has_pdp[:6]))
