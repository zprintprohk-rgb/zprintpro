# -*- coding: utf-8 -*-
"""blog-data 正文 markdown 链接 -> HTML 锚点 (14 处 / 2 篇 / 3 语)"""
import io, os, json, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-blogmd-20261020")
os.makedirs(BAK, exist_ok=True)
PAT = re.compile(r"\[([^\]]{1,40})\]\((/[A-Za-z0-9\-/_]+)\)")

total = 0
for loc in ("zh-hk", "en", "ja"):
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        j = json.loads(f.read())
    changed = 0
    for slug, post in j.items():
        if not isinstance(post, dict):
            continue
        c = post.get("content")
        if not isinstance(c, str):
            continue
        n = len(PAT.findall(c))
        if not n:
            continue
        new = PAT.sub(lambda m: '<a href="%s">%s</a>' % (m.group(2), m.group(1)), c)
        post["content"] = new
        changed += n
        total += n
        print("  [%s] %s: %d" % (loc, slug, n))
    if changed:
        out = json.dumps(j, ensure_ascii=False, indent=2) + "\n"
        json.loads(out)
        bp = os.path.join(BAK, loc + ".json.before")
        if not os.path.exists(bp):
            shutil.copy2(p, bp)
        with io.open(p, "w", encoding="utf-8", newline="") as f:
            f.write(out)

# 归零校验
for loc in ("zh-hk", "en", "ja"):
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    j = json.loads(io.open(p, "r", encoding="utf-8").read())
    resid = sum(len(PAT.findall(post.get("content") or "")) for post in j.values() if isinstance(post, dict))
    assert resid == 0, "%s residual %d" % (loc, resid)

print("[OK] converted %d markdown links -> anchors, residual 0" % total)
