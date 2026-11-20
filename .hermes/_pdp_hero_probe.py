# -*- coding: utf-8 -*-
import io, sys, re, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(u):
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=25).read().decode('utf-8', errors='replace')
urls = [
    'https://zprintpro.com/zh-hk/product/hardcover-books/',
    'https://zprintpro.com/zh-hk/product/graduation-yearbook/',
    'https://zprintpro.com/zh-hk/product/textbooks/',
    'https://zprintpro.com/zh-hk/product/perfect-bound-books/',
    'https://zprintpro.com/zh-hk/product/exercise-books/',
    'https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/',
]
pats = ['HK$5.00', 'HK$1.00-5.00', 'HK$0.90', 'HK$0.87', 'HK$1.20', 'HK$40', 'HK$45', 'HK$16', 'HK$4', 'HK$6', '起批', '低至', '每個', '每本']
for u in urls:
    try:
        t = get(u)
    except Exception as e:
        print('FAIL', u, e); continue
    title = re.search(r'<title>([^<]*)</title>', t)
    print('===', u.split('/')[-2], '| title:', title.group(1)[:60] if title else '?')
    for pat in pats:
        for m in re.finditer(re.escape(pat), t):
            i = m.start()
            ctx = re.sub(r'\s+', ' ', t[max(0, i-60):i+70])
            # only show hero-area hits (near 每個低至/起批/每本)
            if '低至' in ctx or '起批' in ctx or '每個' in ctx or '每本' in ctx or 'HK$40' == pat:
                print('  ', ctx[:130])
                break
