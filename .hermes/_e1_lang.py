# -*- coding: utf-8 -*-
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base = 'F:/zprintpro-nextjs/src/data/blog-data/'
for f in ['en', 'zh-hk', 'ja']:
    data = json.load(open(base + f + '.json', encoding='utf-8'))
    v = data.get('sticker-guide')
    if v:
        c = v.get('content', '')
        enl = re.findall(r'href="/en/(product|blog|category)/[^"]+"', c)
        jal = re.findall(r'href="/ja/(product|blog|category)/[^"]+"', c)
        loc = re.findall(r'href="/\{locale\}/(product|blog|category)/[^"]+"', c)
        no = re.findall(r'href="/(product|blog|category)/[^"]+"', c)
        print('[' + f + '] /en/=' + str(len(enl)) + ' /ja/=' + str(len(jal)) + ' /{locale}/=' + str(len(loc)) + ' 无前缀=' + str(len(no)))
    else:
        print('[' + f + '] 无 sticker-guide')
