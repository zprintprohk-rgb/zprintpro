import io, sys, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 正确关键词: cmyk 加的是 business-cards / a4-flyers / booklet-printing
CHECKS = [
    ("doujin", "https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/",
     ["同人明信片", "亞加力膠牌", "缶バッジ", "doujin-postcard-set", "doujin-acrylic-keychain", "doujin-can-badge"]),
    ("mtr", "https://zprintpro.com/zh-hk/blog/mtr-advertising-specs/",
     ["騎馬釘書刊", "公司 Catalog", "燙金貼紙", "saddle-stitch-booklets", "catalog-printing", "foil-stickers"]),
    ("cmyk-zh", "https://zprintpro.com/zh-hk/blog/cmyk-guide/",
     ["business-cards", "a4-flyers", "booklet-printing", "CMYK 名片", "A4 宣傳單張", "CMYK 書刊"]),
    ("cmyk-en", "https://zprintpro.com/en/blog/cmyk-guide/",
     ["business-cards", "a4-flyers", "booklet-printing", "CMYK Business Cards", "A4 Flyers", "CMYK Booklet"]),
    ("cmyk-ja", "https://zprintpro.com/ja/blog/cmyk-guide/",
     ["business-cards", "a4-flyers", "booklet-printing", "CMYK 印刷", "A4 フライヤー", "名刺"]),
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Cache-Control": "no-cache"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", errors="replace")

print("=" * 70)
print("8/1 verify r3 (FIXED) - 5 blog body hits 正确关键词")
print("=" * 70)

results = []
for tag, url, must in CHECKS:
    body = fetch(url)
    hits = [k for k in must if k in body]
    miss = [k for k in must if k not in body]
    is_pass = (len(hits) == len(must))
    results.append((tag, hits, miss, is_pass))
    flag = "PASS" if is_pass else "MISS"
    print(f"\n[{flag}] {tag} ({len(hits)}/{len(must)})")
    if hits:
        print(f"  hits: {hits}")
    if miss:
        print(f"  MISS: {miss}")

print()
blog_pass = sum(1 for r in results if r[3])
print(f"BLOG: {blog_pass}/5 PASS")
if blog_pass == 5:
    print(">>> FULL PASS: PARTIAL fix 成功, 8/1 build 解决了 CF Pages 边缘缓存问题")
elif blog_pass >= 1:
    print(f">>> IMPROVED: {blog_pass}/5 (vs 7/31 0/5)")
else:
    print(">>> STILL PARTIAL: 0/5 - build 缓存没解决")