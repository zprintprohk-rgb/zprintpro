# -*- coding: utf-8 -*-
"""blog-data 正文 **bold** -> <strong>bold</strong> (三语, 排除代码块)"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-blogbold-20261020")
os.makedirs(BAK, exist_ok=True)
BOLD = re.compile(r"\*\*([^*\n<]{2,60})\*\*")

total = 0
for loc in ("zh-hk", "en", "ja"):
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        j = json.loads(f.read())
    cnt = 0
    touched = []
    for slug, post in j.items():
        if not isinstance(post, dict):
            continue
        c = post.get("content")
        if not isinstance(c, str):
            continue
        n = len(BOLD.findall(c))
        if not n:
            continue
        # 跳过 <pre>/<code> 区段: 分段处理
        parts = re.split(r"(<pre[\s\S]*?</pre>|<code[\s\S]*?</code>)", c)
        for i in range(0, len(parts), 2):
            parts[i] = BOLD.sub(lambda m: "<strong>%s</strong>" % m.group(1), parts[i])
        post["content"] = "".join(parts)
        cnt += n
        touched.append(f"{slug}({n})")
    if cnt:
        out = json.dumps(j, ensure_ascii=False, indent=2) + "\n"
        json.loads(out)
        bp = os.path.join(BAK, loc + ".json.before")
        if not os.path.exists(bp):
            shutil.copy2(p, bp)
        with io.open(p, "w", encoding="utf-8", newline="") as f:
            f.write(out)
        print("[%s] %d bold -> strong in %d posts: %s" % (loc, cnt, len(touched), ", ".join(touched[:5])))
        total += cnt

# 归零校验
for loc in ("zh-hk", "en", "ja"):
    j = json.loads(io.open(os.path.join(REPO, "src", "data", "blog-data", loc + ".json"), "r", encoding="utf-8").read())
    resid = 0
    for post in j.values():
        if isinstance(post, dict) and isinstance(post.get("content"), str):
            c = re.sub(r"(<pre[\s\S]*?</pre>|<code[\s\S]*?</code>)", "", post["content"])
            resid += len(BOLD.findall(c))
    assert resid == 0, "%s residual %d" % (loc, resid)
print("[OK] total %d converted, residual 0" % total)
