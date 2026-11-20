import io, sys, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

print("=== 9 URL 二次 verify (en custom-stickers + ja 3 locale) ===")
slugs = ["paper-bags", "stickers", "custom-stickers"]
for loc in ["en", "ja"]:
  for slug in slugs:
    url = f"https://zprintpro.com/{loc}/product/{slug}/"
    try:
      req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
      with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read()
        location = r.headers.get("Location", "")
        # 301/302 = redirect
        if r.status in (301, 302, 307, 308):
          # follow
          req2 = urllib.request.Request(f"https://zprintpro.com{location}", headers={"User-Agent": "Mozilla/5.0"})
          with urllib.request.urlopen(req2, timeout=15) as r2:
            print(f"  {r.status} {url} -> {r.status} -> {r2.status} ({len(r2.read())} B)")
        else:
          print(f"  {r.status} {url}  (no redirect, body {len(body)} B)")
    except urllib.error.HTTPError as e:
      print(f"  {e.code} {url}")
    except Exception as ex:
      print(f"  ERR {url}: {str(ex)[:80]}")