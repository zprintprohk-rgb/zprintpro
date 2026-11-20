"""
Check img tags in new blog page - which are content img vs layout/nav img
"""
import re
import urllib.request

urls = [
    "https://zprintpro.com/zh-hk/blog/religious-ceremony-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/industrial-nameplate-printing-guide/",
    "https://zprintpro.com/zh-hk/blog/construction-material-sample-book-printing-guide/",
]

for url in urls:
    print(f"\n=== {url} ===")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")

    # Find all img tags
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    print(f"  total <img> tags: {len(imgs)}")
    for i, src in enumerate(imgs[:25], 1):
        print(f"    {i}. {src[:120]}")

    # Check if content area has img (look for <article> or <main>)
    main_match = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
    if main_match:
        main_content = main_match.group(1)
        main_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', main_content)
        print(f"  <main> area imgs: {len(main_imgs)}")
        for i, src in enumerate(main_imgs, 1):
            print(f"    {i}. {src[:120]}")
