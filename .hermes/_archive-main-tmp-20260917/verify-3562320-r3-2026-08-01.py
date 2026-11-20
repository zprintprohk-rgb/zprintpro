import io, sys, urllib.request, re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# baseline from 7/31 20:08
BASELINE_SIZE = {
    "doujin": 79442,
    "mtr": 74367,
    "cmyk-zh": 72762,
    "cmyk-en": 78176,
    "cmyk-ja": 75119,
}

CHECKS = [
    ("doujin", "https://zprintpro.com/zh-hk/blog/doujin-circle-printing-guide/",
     ["同人明信片", "亞加力膠牌", "缶バッジ", "doujin-postcard-set", "doujin-acrylic-keychain", "doujin-can-badge"]),
    ("mtr", "https://zprintpro.com/zh-hk/blog/mtr-advertising-specs/",
     ["騎馬釘書刊", "公司 Catalog", "燙金貼紙", "saddle-stitch-booklets", "catalog-printing", "foil-stickers"]),
    ("cmyk-zh", "https://zprintpro.com/zh-hk/blog/cmyk-guide/",
     ["相關產品", "騎馬釘書刊", "a4 傳單", "saddle-stitch", "a4"]),
    ("cmyk-en", "https://zprintpro.com/en/blog/cmyk-guide/",
     ["Related Products", "booklet", "a4-flyers", "saddle-stitch"]),
    ("cmyk-ja", "https://zprintpro.com/ja/blog/cmyk-guide/",
     ["関連商品", "a4 フライヤー", "名刺", "saddle-stitch"]),
]

PCHECKS = [
    ("a2-posters", "https://zprintpro.com/zh-hk/product/a2-posters/", ["海報印刷", "A2", "即日"]),
    ("same-day-flyers", "https://zprintpro.com/zh-hk/product/same-day-flyers/", ["宣傳單張", "即日"]),
    ("paper-bags", "https://zprintpro.com/zh-hk/category/paper-bags/", ["紙袋印刷", "訂做紙袋"]),
    ("stickers", "https://zprintpro.com/zh-hk/category/stickers/", ["貼紙印刷", "透明貼", "防水貼"]),
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Cache-Control": "no-cache", "Pragma": "no-cache"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode("utf-8", errors="replace")

def extract_modified_time(body):
    m = re.search(r"article:modified_time[^\"]*\"([^\"]+)\"", body)
    return m.group(1) if m else "NOT_FOUND"

def hits_miss(body, must):
    hits, miss = [], []
    for k in must:
        if k in body:
            hits.append(k)
        else:
            miss.append(k)
    return hits, miss

print("=" * 70)
print("8/1 verify r3 - 5 blog body hits + modified_time + size delta")
print("=" * 70)

blog_results = []
for tag, url, must in CHECKS:
    status, body = fetch(url)
    hits, miss = hits_miss(body, must)
    mt = extract_modified_time(body)
    base_size = BASELINE_SIZE[tag]
    size_delta = len(body) - base_size
    is_pass = (len(hits) == len(must))
    blog_results.append((tag, status, mt, size_delta, hits, miss, is_pass))
    flag = "PASS" if is_pass else "MISS"
    print(f"\n[{flag}] {tag} ({status}, +{size_delta:+d}B vs base {base_size}, modified_time={mt})")
    if hits:
        print(f"  hits: {hits}")
    if miss:
        print(f"  MISS: {miss}")

print("\n" + "=" * 70)
print("8/1 verify r3 - 4 product/category body hits (2nd confirm)")
print("=" * 70)

prod_results = []
for tag, url, must in PCHECKS:
    status, body = fetch(url)
    hits, miss = hits_miss(body, must)
    is_pass = (len(hits) == len(must))
    prod_results.append((tag, status, hits, miss, is_pass))
    flag = "PASS" if is_pass else "MISS"
    print(f"\n[{flag}] {tag} ({status})")
    if hits:
        print(f"  hits: {hits}")
    if miss:
        print(f"  MISS: {miss}")

print("\n" + "=" * 70)
print("VERDICT")
print("=" * 70)
blog_pass = sum(1 for r in blog_results if r[6])
prod_pass = sum(1 for r in prod_results if r[4])
print(f"Blog:  {blog_pass}/5 PASS")
print(f"Prod:  {prod_pass}/4 PASS")
print()
if blog_pass == 5 and prod_pass == 4:
    print(">>> FULL PASS: PARTIAL fix successful, 8/1 build 解决了 CF Pages 边缘缓存问题")
elif blog_pass == 0 and prod_pass == 4:
    print(">>> STILL PARTIAL: 3 blog 仍 0 命中, build 缓存问题没解决, 需 K3 §0.6 P0 拍板 A/B/C")
elif blog_pass >= 1 and prod_pass == 4:
    print(f">>> IMPROVED: blog {blog_pass}/5 (7/31 PARTIAL 0/5 → 8/1 {blog_pass}/5)")
else:
    print(f">>> MIXED: blog {blog_pass}/5, prod {prod_pass}/4")