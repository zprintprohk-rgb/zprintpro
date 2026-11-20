import io, sys, urllib.request, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, dict(r.headers), r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return 'ERR', {}, ''
st, h, html = get('https://zprintpro.com/en/blog/eco-paper-bag-gsm/')
print('HTTP:', st)
if st == 200:
    t = re.search(r'<title>(.*?)</title>', html, re.S)
    print('title:', t.group(1).strip()[:60] if t else '?')
    robo = h.get('X-Robots-Tag', '(无 X-Robots-Tag)')
    print('X-Robots-Tag:', robo)
    can = re.search(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"', html)
    print('canonical:', can.group(1) if can else '(无)')
    print('含 meta robots:', re.search(r'<meta[^>]*name="robots"', html) is not None)
    print('页面长度:', len(html))
else:
    print('响应头片段:', dict(list(h.items())[:5]) if isinstance(h, dict) else h)
