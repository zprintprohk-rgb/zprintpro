"""GSC 31 URL 404 摸底 + 根因分类"""
import io, sys, urllib.request, urllib.error
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 31 URL (从 K3 3 张截图 + 粘贴 URL 提取)
URLS = [
    # 截图 1 (1-10)
    "https://zprintpro.com/zh-hk/zh-hk/services/rush-printing-delivery/",
    "https://zprintpro.com/ja/services/seo/eco-tote-bag/",
    "https://zprintpro.com/en/product/cosmetics-packaging-box/",
    "https://zprintpro.com/ja/product/double-sided-cards/",
    "https://zprintpro.com/ja/services/seo/postcard-set/",
    "https://zprintpro.com/upload/22163932084.m3u8",
    "https://zprintpro.com/upload/4032212230.m3u8",
    "https://zprintpro.com/product/small-bags/",
    "https://zprintpro.com/100张起",
    "https://zprintpro.com/en/product/same-day-business-cards/",
    # 截图 2 (11-20)
    "https://zprintpro.com/ja/product/same-day-business-cards/",
    "https://zprintpro.com/product/double-sided-cards/",
    "https://zprintpro.com/license/",
    "https://zprintpro.com/en/product/double-sided-cards/",
    "https://zprintpro.com/zh-hk/product/packaging/",
    "https://zprintpro.com/ja/ja/services/rush-printing-delivery/",
    "https://zprintpro.com/zh-hk/product/",
    "https://zprintpro.com/en/en/services/rush-printing-delivery/",
    "https://zprintpro.com/product/eco-business-cards/",
    "https://zprintpro.com/blog/design-file-specs/",
    # 截图 3 (21-30)
    "https://www.zprintpro.com/個から",
    "https://www.zprintpro.com/個起",
    "https://zprintpro.com/{locale}/product/gift-boxes",  # GSC raw
    "https://zprintpro.com/{locale}/product/kraft-paper-bags",  # GSC raw
    "https://www.zprintpro.com/cdn-cgi/email-protection",
    "https://zprintpro.com/blog/mtr-advertising-specs/",
    "https://zprintpro.com/ja/guide/",
    "https://zprintpro.com/ja/services/same-day-printing-delivery/",
    "https://zprintpro.com/zh-hk/services/",
    "https://www.zprintpro.com/枚から",
    # K3 粘贴
    "https://zprintpro.com/product/drawer-slide-gift-box/",
]

print(f"=== 31 URL 状态 ===")
results = []
for url in URLS:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            results.append((url, r.status, r.headers.get("Location", ""), ""))
    except urllib.error.HTTPError as e:
        results.append((url, e.code, "", ""))
    except Exception as ex:
        results.append((url, "ERR", "", str(ex)[:60]))

# 按 status 分类
from collections import Counter
status_count = Counter(r[1] for r in results)
print(f"\nstatus 分布: {dict(status_count)}")

# 按模式分类
print(f"\n=== 按模式分类 (共 31 URL) ===\n")
for i, (url, status, loc, err) in enumerate(results, 1):
    flag = "✓" if status == 200 else ("→" if status in (301, 302, 307, 308) else "✗")
    short = url.replace("https://zprintpro.com/", "").replace("https://www.zprintpro.com/", "www/")
    print(f"  {i:2d}. {flag} {status:>3}  {short[:60]:<60}  {loc[:30] if loc else err[:30]}")
