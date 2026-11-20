import io, sys, urllib.request, urllib.error
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

URLS = [
    "https://zprintpro.com/zh-hk/zh-hk/services/rush-printing-delivery/",
    "https://zprintpro.com/ja/services/seo/eco-tote-bag/",
    "https://zprintpro.com/en/product/cosmetics-packaging-box/",
    "https://zprintpro.com/ja/product/double-sided-cards/",
    "https://zprintpro.com/ja/services/seo/postcard-set/",
    "https://zprintpro.com/upload/22163932084.m3u8",
    "https://zprintpro.com/upload/4032212230.m3u8",
    "https://zprintpro.com/product/small-bags/",
    "https://zprintpro.com/100%E5%BC%B5%E8%B5%B7",  # URL-encode
    "https://zprintpro.com/en/product/same-day-business-cards/",
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
    "https://www.zprintpro.com/%E5%80%8B%E3%81%8B%E3%82%89",
    "https://www.zprintpro.com/%E5%80%8B%E8%B5%B7",
    "https://zprintpro.com/%7Blocale%7D/product/gift-boxes",
    "https://zprintpro.com/%7Blocale%7D/product/kraft-paper-bags",
    "https://www.zprintpro.com/cdn-cgi/email-protection",
    "https://zprintpro.com/blog/mtr-advertising-specs/",
    "https://zprintpro.com/ja/guide/",
    "https://zprintpro.com/ja/services/same-day-printing-delivery/",
    "https://zprintpro.com/zh-hk/services/",
    "https://www.zprintpro.com/%E6%9E%9A%E3%81%8B%E3%82%89",
    "https://zprintpro.com/product/drawer-slide-gift-box/",
]

for i, url in enumerate(URLS, 1):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as r:
            loc = r.headers.get("Location", "")
            short = url.replace("https://zprintpro.com/", "").replace("https://www.zprintpro.com/", "www/")
            print(f"  {i:2d}. {r.status}  {short[:60]}")
    except urllib.error.HTTPError as e:
        short = url.replace("https://zprintpro.com/", "").replace("https://www.zprintpro.com/", "www/")
        print(f"  {i:2d}. {e.code}  {short[:60]}")
    except Exception as ex:
        short = url.replace("https://zprintpro.com/", "").replace("https://www.zprintpro.com/", "www/")
        print(f"  {i:2d}. ERR  {short[:60]}  {str(ex)[:30]}")