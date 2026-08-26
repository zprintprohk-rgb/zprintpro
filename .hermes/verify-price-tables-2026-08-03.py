import io, sys, urllib.request, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 等 30s 让 CF Pages 边缘刷新 (5 月以来 K3 拍板等 ISR)
time.sleep(5)

# 1. /pricing/ 3 locale 探活
URLS = [
    ("zh-hk /pricing", "https://zprintpro.com/zh-hk/pricing/"),
    ("en /pricing", "https://zprintpro.com/en/pricing/"),
    ("ja /pricing", "https://zprintpro.com/ja/pricing/"),
    ("zh-hk /", "https://zprintpro.com/zh-hk/"),
    ("en /", "https://zprintpro.com/en/"),
    ("ja /", "https://zprintpro.com/ja/"),
    ("zh-hk /category/stickers/", "https://zprintpro.com/zh-hk/category/stickers/"),
    ("zh-hk /category/paper-bags/", "https://zprintpro.com/zh-hk/category/paper-bags/"),
]
for tag, url in URLS:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Cache-Control": "no-cache"})
        with urllib.request.urlopen(req, timeout=15) as r:
            print(f"  {r.status}  {tag}  ({len(r.read())} B)")
    except urllib.error.HTTPError as e:
        print(f"  {e.code}  {tag}")
    except Exception as e:
        print(f"  ERR  {tag}: {str(e)[:60]}")

# 2. git remote
import subprocess
print()
print("git ls-remote:")
r = subprocess.run(["git", "ls-remote", "origin_ssh", "main"], capture_output=True, text=True, cwd="F:/zprintpro-nextjs")
print(f"  HEAD: {r.stdout.strip().split(chr(10))[-1]}")

# 3. build artifacts: 15 files in src/data/price-tables
import os
print()
print("src/data/price-tables 3 locale subdirs:")
for loc in ["zh-hk", "en", "ja"]:
    p = f"F:/zprintpro-nextjs/src/data/price-tables/{loc}"
    if os.path.isdir(p):
        files = [f for f in os.listdir(p) if f.endswith(".json")]
        print(f"  {loc}: {len(files)} files  {sorted(files)}")