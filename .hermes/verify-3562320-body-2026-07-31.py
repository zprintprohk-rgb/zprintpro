import io
import sys
import urllib.request
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

CHECKS = [
    ('https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/', ['同人明信片', '亞加力膠牌', '缶バッジ', 'Related', 'doujin']),
    ('https://zprintpro.com/zh-hk/blog/mtr-advertising-specs/', ['騎馬釘書刊', 'Catalog', '燙金貼紙', 'Related']),
    ('https://zprintpro.com/zh-hk/blog/cmyk-guide/', ['相關', '騎馬釘書刊', 'a4 傳單']),
    ('https://zprintpro.com/en/blog/cmyk-guide/', ['Related', 'booklet', 'a4-flyers']),
    ('https://zprintpro.com/ja/blog/cmyk-guide/', ['関連', 'a4', '名刺']),
    ('https://zprintpro.com/zh-hk/product/a2-posters/', ['海報印刷', 'A2', '即日']),
    ('https://zprintpro.com/zh-hk/product/same-day-flyers/', ['宣傳單張', '即日']),
    ('https://zprintpro.com/zh-hk/category/paper-bags/', ['紙袋印刷', '訂做紙袋']),
    ('https://zprintpro.com/zh-hk/category/stickers/', ['貼紙印刷', '透明貼', '防水貼']),
]

results = []
for url, must in CHECKS:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=20) as r:
            body = r.read().decode('utf-8', errors='replace')
            status = r.status
            nbytes = len(body)
    except Exception as e:
        results.append((url, 'ERR', 0, [], must, str(e)[:80]))
        continue
    hits, miss = [], []
    for k in must:
        if k in body:
            hits.append(k)
        else:
            miss.append(k)
    results.append((url, status, nbytes, hits, miss, ''))

total_hits = sum(len(h) for _, _, _, h, _, _ in results)
total_must = sum(len(m) for _, _, _, _, m, _ in results)
ok_pages = sum(1 for _, _, _, h, m, _ in results if len(h) == len(m))

print(f"=== 3562320 body 命中 ({ok_pages}/{len(results)} pages, {total_hits}/{total_must} keywords) ===")
for url, status, nb, h, m, err in results:
    flag = 'OK' if len(h) == len(m) else ('PART' if h else 'MISS')
    short = url.replace('https://zprintpro.com/', '').rstrip('/')
    print(f"  [{flag}] {status} {nb:>7}B  {short}")
    if h:
        print(f"        hits: {h}")
    if m:
        print(f"        MISS: {m}")
    if err:
        print(f"        err:  {err}")

print()
print(f"VERIFY: {'PASS' if ok_pages == len(results) and total_hits >= 17 else 'PARTIAL/FAIL'}")