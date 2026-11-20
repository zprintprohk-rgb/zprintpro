import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.read().decode('utf-8', errors='replace')
# §9.1 验收基线: saddle/exercise H1 "from 10 Copies"
for u, m in [("https://zprintpro.com/en/product/saddle-stitch-booklets/", "from 10 Copies"),
             ("https://zprintpro.com/en/product/exercise-books/", "from 10 Copies"),
             ("https://zprintpro.com/ja/product/nengajo-2027/", "10枚から")]:
    st, html = fetch(u)
    has = m in html
    print(f"{st} | 基线'{m}'={'✓' if has else '✗'} | {u}")
