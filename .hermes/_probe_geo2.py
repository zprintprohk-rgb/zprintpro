import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', ''
st, html = get('https://zprintpro.com/zh-hk/category/packaging/')
if st == 200:
    t = re.search(r'<title>(.*?)</title>', html, re.S)
    hit = [m for m in ['食品', '包裝', '紙盒'] if m in html]
    print(f'packaging category: HTTP 200 | marker {len(hit)}/3 {hit} | title: {(t.group(1).strip()[:45] if t else "?")}')
else:
    print(f'packaging category: HTTP {st}')
