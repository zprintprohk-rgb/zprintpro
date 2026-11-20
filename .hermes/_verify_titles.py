# -*- coding: utf-8 -*-
# 2026-10-26 title 线上验收探针: 5 个退场词/进攻面 title
import io, sys, re, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
BASE = 'https://zprintpro.com'
CHECK = [
    # (URL, 期望含, 期望不含, 标签)
    ('/ja/blog/cny-2027-red-packet-printing-guide/', ['¥64 起'], ['HK$1.1'], '利是封 ja title ¥64'),
    ('/ja/blog/saddle-stitch-booklet-printing-guide/', ['¥258/冊'], ['完全ガイド：ページ数・用紙・価格'], '中綴じ冊子 ja title ¥258'),
    ('/zh-hk/blog/graduation-yearbook-printing-guide/', ['HK$45起'], ['印刷指南 · 香港中學大學院校定制方案 | 智印港'], '畢業紀念冊 zh title HK$45'),
    ('/zh-hk/blog/poster-printing-guide/', ['HK$9起'], ['完全指南：尺寸、紙質'], '海報印刷指南 zh HK$9'),
    ('/zh-hk/blog/poster-printing-price-guide/', ['HK$9起'], ['價格指南：單價'], '海報價格指南 zh HK$9'),
]
def get(url):
    req = urllib.request.Request(BASE + url, headers={'User-Agent': 'Mozilla/5.0 (compatible; zprintpro-probe)'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', 'ignore')
ok, fail = 0, 0
for url, want, notwant, label in CHECK:
    try:
        html = get(url)
        # 取 <title> 或 og:title
        m = re.search(r'<title>(.*?)</title>', html, re.S) or re.search(r'property="og:title" content="(.*?)"', html)
        t = re.sub(r'\s+', ' ', m.group(1)).strip() if m else '(no title tag)'
        got = any(w in t for w in want)
        banned = any(x in t for x in notwant)
        if got and not banned:
            ok += 1
            print(f'PASS {label}: {t[:90]}')
        else:
            fail += 1
            print(f'FAIL {label}: title={t[:90]} | want={want} found={any(w in t for w in want)} | notwant={notwant} present={any(x in t for x in notwant)}')
    except Exception as e:
        fail += 1
        print(f'ERROR {label}: {url} :: {e}')
print(f'\n== {ok} PASS / {fail} FAIL ==')
