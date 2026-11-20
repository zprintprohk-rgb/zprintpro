import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', ''
print('=== GEO 可验证资产线上核验 (§6.3) ===')
checks = [
    ('C109 逆算/入稿', 'https://zprintpro.com/ja/comiket-c109/', ['逆算', '入稿', 'C109']),
    ('年賀状 2027', 'https://zprintpro.com/ja/nengajo-2027/', ['2027', '投函']),
    ('school 教材', 'https://zprintpro.com/en/category/educational/', ['textbook', 'MOQ']),
    ('食品包装', 'https://zprintpro.com/zh-hk/category/food-packaging/', ['食品', '印刷']),
]
for name, url, markers in checks:
    st, html = get(url)
    if st == 200:
        t = re.search(r'<title>(.*?)</title>', html, re.S)
        hit = [m for m in markers if m in html]
        print(f'  {name}: HTTP 200 | marker 命中 {len(hit)}/{len(markers)} {hit} | title: {(t.group(1).strip()[:40] if t else "?")}')
    else:
        print(f'  {name}: HTTP {st}')
