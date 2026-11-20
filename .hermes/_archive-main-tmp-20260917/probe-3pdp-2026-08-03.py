"""3 PDP 现状 探查 + daily cron 检查"""
import io, subprocess, sys, urllib.request, urllib.error, os, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

slugs = ["custom-stickers", "die-cut-stickers", "paper-bags"]

print("=== 3 PDP x 3 locale = 9 URL HEAD ===")
for loc in ["zh-hk", "en", "ja"]:
    for slug in slugs:
        url = f"https://zprintpro.com/{loc}/product/{slug}/"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as r:
                body = r.read()
                print(f"  {r.status}  {url}  ({len(body)} B)")
        except urllib.error.HTTPError as e:
            print(f"  {e.code}  {url}")
        except Exception as e:
            print(f"  ERR  {url}: {str(e)[:60]}")

print("\n=== 3 PDP products.ts 注册 ===")
content = open("src/data/products.ts", encoding="utf-8").read()
for slug in slugs:
    reg = bool(re.search(rf"slug:\s*['\"]" + re.escape(slug) + r"['\"]", content))
    print(f"  {slug}: {'注册 OK' if reg else '未注册'}")

print("\n=== 3 PDP matrix.json tracking ===")
try:
    mj = open(".hermes/industry-keyword-matrix.json", encoding="utf-8").read()
    for slug in slugs:
        n = mj.count(slug)
        print(f"  {slug}: {n} hit{'s' if n != 1 else ''} " + ("(tracking)" if n > 0 else ""))
except FileNotFoundError:
    print("  matrix.json 不存在")

print("\n=== 现有 src/data/price-tables/ 顶层 ===")
for slug in ["paper-bags", "stickers", "custom-stickers", "die-cut-stickers"]:
    p = f"src/data/price-tables/{slug}.json"
    if os.path.exists(p):
        print(f"  {slug}: 顶层文件 ({os.path.getsize(p)} B)")
    else:
        print(f"  {slug}: 缺失")

print("\n=== git log 最近 5 ===")
r = subprocess.run(["git", "log", "-5", "--pretty=format:%H %ci %s"], capture_output=True, text=True, cwd="F:/zprintpro-nextjs")
print(r.stdout)
