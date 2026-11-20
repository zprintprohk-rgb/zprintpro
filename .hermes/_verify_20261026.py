# -*- coding: utf-8 -*-
# 2026-10-26 线上验收探针: ①9 OVERRIDE PDP hero ②poster-size blog ③flyers 类目 desc
import io, sys, re, json, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE = 'https://zprintpro.com'
CHECK = [
    # (URL, 期望 hero 大数字/区间, 期望不含, 标签)
    ('/zh-hk/product/hardcover-books/', ['HK$40.00-240.00', 'HK$40'], ['HK$5.00-10.00', '每個低至 · HK$5'], 'hardcover hero'),
    ('/zh-hk/product/graduation-yearbook/', ['HK$45.00-180.00', 'HK$45'], ['HK$5.00-10.00'], 'yearbook hero'),
    ('/zh-hk/product/textbooks/', ['HK$5.00-50.00', 'HK$5'], ['HK$1.00-5.00'], 'textbooks hero'),
    ('/zh-hk/product/white-card-bags/', ['HK$5.00-12.00', 'HK$5'], ['HK$0.70-3.50'], 'white-card-bags hero'),
    ('/zh-hk/product/gift-bags/', ['HK$10.00-20.00', 'HK$10'], ['HK$5.00-10.00'], 'gift-bags hero'),
    ('/zh-hk/product/eco-paper-bags/', ['HK$3.00-8.00'], ['HK$1.50-4.00'], 'eco-paper-bags hero'),
    ('/zh-hk/product/handle-bags/', ['HK$3.00-8.00'], ['HK$1.50-4.00'], 'handle-bags hero'),
    ('/zh-hk/product/large-bags/', ['HK$6.00-15.00'], ['HK$3.00-7.50'], 'large-bags hero'),
    ('/zh-hk/product/rigid-boxes/', ['HK$8.00-42.00'], ['HK$2.00-10.00'], 'rigid-boxes hero'),
    ('/zh-hk/blog/poster-size-guide/', ['HK$9'], ['US$2.30'], 'poster-size zh 无 US$'),
    ('/ja/blog/poster-size-guide/', ['¥300'], ['US$2.30'], 'poster-size ja 无 US$'),
    ('/en/category/flyers/', ['US$0.40'], ['HK$0.35'], 'flyers en desc'),
    ('/ja/category/flyers/', ['¥50'], ['HK$0.35'], 'flyers ja desc'),
]
def get(url):
    req = urllib.request.Request(BASE + url, headers={'User-Agent': 'Mozilla/5.0 (compatible; zprintpro-probe)'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', 'ignore')
ok, fail = 0, 0
for url, want, notwant, label in CHECK:
    try:
        html = get(url)
        got = any(w in html for w in want)
        banned = any(x in html for x in notwant)
        if got and not banned:
            ok += 1
            print(f'PASS {label}: {url}')
        else:
            fail += 1
            print(f'FAIL {label}: {url} | want={want} found={any(w in html for w in want)} | notwant={notwant} present={any(x in html for x in notwant)}')
    except Exception as e:
        fail += 1
        print(f'ERROR {label}: {url} :: {e}')
print(f'\n== {ok} PASS / {fail} FAIL ==')
