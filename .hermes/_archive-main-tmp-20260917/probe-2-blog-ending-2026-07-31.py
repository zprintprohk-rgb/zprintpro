import io
import re
import sys
import urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URLS = [
    ('https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/', ['同人明信片', '亞加力膠牌', '同人亞加力膠牌', '缶バッジ', '同人缶バッジ', 'saddle-stitch', 'border-t']),
    ('https://zprintpro.com/zh-hk/blog/mtr-advertising-specs/', ['騎馬釘書刊', '公司 Catalog', '燙金貼紙', 'border-t']),
    ('https://zprintpro.com/zh-hk/blog/cmyk-guide/', ['騎馬釘書刊', 'a4 傳單', 'border-t', '相關產品']),
    ('https://zprintpro.com/en/blog/cmyk-guide/', ['Related Products', 'booklet', 'a4-flyers', 'border-t']),
    ('https://zprintpro.com/ja/blog/cmyk-guide/', ['関連商品', 'a4 フライヤー', '名刺', 'border-t']),
]

for url, kws in URLS:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'})
    with urllib.request.urlopen(req, timeout=20) as r:
        body = r.read().decode('utf-8', errors='replace')
    short = url.replace('https://zprintpro.com/', '').rstrip('/')
    print(f"\n=== {short} (len={len(body)}) ===")
    # 找 border-t 段（ending section marker）
    idx = body.rfind('border-t border-gray-200')
    if idx > 0:
        print(f"FOUND border-t at idx={idx}")
        print(f"  snippet: {body[idx:idx+500]}")
    else:
        print("  NO border-t found in live page")
    # check 关键词 hits
    for kw in kws:
        cnt = body.count(kw)
        marker = '✓' if cnt else '✗'
        print(f"  {marker} {kw}: {cnt}")