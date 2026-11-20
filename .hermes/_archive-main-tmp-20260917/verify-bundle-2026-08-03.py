import io, sys, urllib.request, subprocess, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 1. git ls-remote
print("=== 1. git ls-remote origin_ssh main ===")
r = subprocess.run(["git", "ls-remote", "origin_ssh", "main"], capture_output=True, text=True, cwd="F:/zprintpro-nextjs")
print(f"  {r.stdout.strip()}")

# 2-5. 等 30s 让 CF Pages build + edge 刷
print("\n=== 等 30s 让 CF Pages build + 边缘 cache 刷 ===")
time.sleep(30)

# 2. 3 PDP 3 locale = 9 URL 301 -> 200
print("\n=== 2. 3 PDP 3 locale = 9 URL ===")
slugs = ["paper-bags", "stickers", "custom-stickers"]
results_2 = []
for loc in ["zh-hk", "en", "ja"]:
  for slug in slugs:
    url = f"https://zprintpro.com/{loc}/product/{slug}/"
    try:
      req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
      with urllib.request.urlopen(req, timeout=15) as r:
        body = r.read()
        location = r.headers.get("Location", "")
        results_2.append((url, r.status, location, len(body)))
        print(f"  {r.status}  {url}  ->  {location}")
    except urllib.error.HTTPError as e:
      results_2.append((url, e.code, "", 0))
      print(f"  {e.code}  {url}")

# 3. /pricing/ 3 locale 仍 404
print("\n=== 3. /pricing/ 3 locale 仍 404 ===")
for loc in ["zh-hk", "en", "ja"]:
  url = f"https://zprintpro.com/{loc}/pricing/"
  try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
      print(f"  {r.status}  {url}  (UNEXPECTED, K3 没要建)")
  except urllib.error.HTTPError as e:
    print(f"  {e.code}  {url}  (expected 404)")

# 4. / + /category/stickers/ + /category/paper-bags/ 200
print("\n=== 4. 现有页面 200 (二次确认无破其他页) ===")
for url in ["https://zprintpro.com/zh-hk/", "https://zprintpro.com/en/", "https://zprintpro.com/ja/",
            "https://zprintpro.com/zh-hk/category/stickers/",
            "https://zprintpro.com/zh-hk/category/paper-bags/"]:
  try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
      body = r.read()
      print(f"  {r.status}  {url}  ({len(body)} B)")
  except urllib.error.HTTPError as e:
    print(f"  {e.code}  {url}")

# 5. quota
print("\n=== 5. quota ===")
print("  7/31: 11/500")
print("  8/3 01:30 (bb3817b 第 4 例外): +1")
print("  8/3 daily cron (10:15 c2eb910): +1")
print("  8/3 22:00 (f2156dc9 第 5 例外): +1")
print("  8/3 累计: 14/500 = 2.8%")