import io, sys, urllib.request, urllib.error
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

urls = [
  "https://zprintpro.com/zh-hk/product/paper-bags",
  "https://zprintpro.com/zh-hk/product/paper-bags/",
  "https://zprintpro.com/zh-hk/category/paper-bags/",
  "https://zprintpro.com/zh-hk/category/paper-bags",
  "https://zprintpro.com/zh-hk/product/stickers/",
  "https://zprintpro.com/zh-hk/product/die-cut-stickers/",
  "https://zprintpro.com/zh-hk/product/kraft-paper-bags/",
  "https://zprintpro.com/zh-hk/product/eco-paper-bags/",
  "https://zprintpro.com/zh-hk/product/gift-bags/",
  "https://zprintpro.com/zh-hk/product/handle-bags/",
  "https://zprintpro.com/zh-hk/product/large-bags/",
  "https://zprintpro.com/zh-hk/product/thick-paper-flyers/",
  "https://zprintpro.com/zh-hk/product/white-card-bags/",
]
for u in urls:
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            print(f"  {r.status}  {u}  ({len(r.read())} B)")
    except urllib.error.HTTPError as e:
        print(f"  {e.code}  {u}")
    except Exception as e:
        print(f"  ERR  {u}: {str(e)[:60]}")