# -*- coding: utf-8 -*-
"""blog-data: ## / ### 标题 + - 列表 转 HTML (2 篇 x 3 语)"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-bloghead-20261020")
os.makedirs(BAK, exist_ok=True)
SLUGS = {"restaurant-opening-flyer-printing-guide", "pet-food-sticker-printing-guide"}

total = 0
for loc in ("zh-hk", "en", "ja"):
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        j = json.loads(f.read())
    cnt = 0
    for slug, post in j.items():
        if slug not in SLUGS or not isinstance(post, dict):
            continue
        c = post.get("content")
        if not isinstance(c, str):
            continue
        before = c
        # 标题
        c = re.sub(r"(?m)^###\s+(.+?)\s*$", r"<h3>\1</h3>", c)
        c = re.sub(r"(?m)^##\s+(.+?)\s*$", r"<h2>\1</h2>", c)
        c = re.sub(r"(?m)^#\s+([^#\n].*?)\s*$", r"<h2>\1</h2>", c)
        # 列表: 连续 "- " 行 -> <ul><li>…</li></ul>
        def conv_block(m):
            lines = [l for l in m.group(0).split("\n") if l.strip()]
            items = "".join("<li>%s</li>" % re.sub(r"^\s*[-*]\s+", "", l).strip() for l in lines)
            return "<ul>%s</ul>" % items
        c = re.sub(r"(?m)(?:^[ \t]*[-*]\s+[^\n]+\n?)+", conv_block, c)
        if c != before:
            post["content"] = c
            cnt += 1
    if cnt:
        out = json.dumps(j, ensure_ascii=False, indent=2) + "\n"
        json.loads(out)
        bp = os.path.join(BAK, loc + ".json.before")
        if not os.path.exists(bp):
            shutil.copy2(p, bp)
        with io.open(p, "w", encoding="utf-8", newline="") as f:
            f.write(out)
        total += cnt
        print("[%s] %d posts converted" % (loc, cnt))

# 校验
for loc in ("zh-hk", "en", "ja"):
    j = json.loads(io.open(os.path.join(REPO, "src", "data", "blog-data", loc + ".json"), "r", encoding="utf-8").read())
    for slug in SLUGS:
        c = (j.get(slug) or {}).get("content") or ""
        resid_h = len(re.findall(r"(?m)^#{1,4}\s", c))
        resid_b = len(re.findall(r"(?m)^[ \t]*[-*]\s+", c))
        assert resid_h == 0 and resid_b == 0, "%s/%s resid h=%d b=%d" % (loc, slug, resid_h, resid_b)
print("[OK] %d posts rewritten, residual headings/bullets = 0" % total)
