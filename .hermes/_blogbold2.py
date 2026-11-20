# -*- coding: utf-8 -*-
"""补轮: 长粗体 (2-200 字符) -> <strong>"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-blogbold2-20261020")
os.makedirs(BAK, exist_ok=True)
BOLD = re.compile(r"\*\*([^*\n<]{2,300})\*\*")
total = 0
for loc in ("zh-hk", "en", "ja"):
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        j = json.loads(f.read())
    cnt = 0
    for slug, post in j.items():
        if not isinstance(post, dict):
            continue
        c = post.get("content")
        if not isinstance(c, str) or "**" not in c:
            continue
        parts = re.split(r"(<pre[\s\S]*?</pre>|<code[\s\S]*?</code>)", c)
        for i in range(0, len(parts), 2):
            parts[i], n = BOLD.subn(lambda m: "<strong>%s</strong>" % m.group(1), parts[i])
            cnt += n
        post["content"] = "".join(parts)
    if cnt:
        out = json.dumps(j, ensure_ascii=False, indent=2) + "\n"
        json.loads(out)
        bp = os.path.join(BAK, loc + ".json.before")
        if not os.path.exists(bp):
            shutil.copy2(p, bp)
        with io.open(p, "w", encoding="utf-8", newline="") as f:
            f.write(out)
        print("[%s] +%d" % (loc, cnt))
        total += cnt
print("[OK] extra %d" % total)
