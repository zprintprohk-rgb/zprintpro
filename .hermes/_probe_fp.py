import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.headers, r.read().decode('utf-8', errors='replace')
st, h, html = fetch("https://zprintpro.com/en/blog/sticker-guide/")
print("状态:", st)
print("cf-cache-status:", h.get('cf-cache-status'))
print("cf-ray:", h.get('cf-ray'))
# 找资源哈希
hashes = re.findall(r'(?:/_next/static|/images)/[^"\x27 ]+', html)
print("资源引用数:", len(hashes))
# 页面更新时间线索
m = re.search(r'Updated 2026-(\d+-\d+)', html)
print("Updated 标记:", m.group(0) if m else "?")
