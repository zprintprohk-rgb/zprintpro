import io
import sys
import urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

URLS = [
    'https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/',
    'https://zprintpro.com/zh-hk/blog/mtr-advertising-specs/',
    'https://zprintpro.com/zh-hk/blog/cmyk-guide/',
    'https://zprintpro.com/en/blog/cmyk-guide/',
    'https://zprintpro.com/ja/blog/cmyk-guide/',
]

for url in URLS:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(req, timeout=20) as r:
            body = r.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"ERR {url}: {e}")
        continue
    # find ending 1500 chars
    short = url.replace('https://zprintpro.com/', '').rstrip('/')
    print(f"\n=== {short} (last 1500 chars) ===")
    print(body[-1500:])