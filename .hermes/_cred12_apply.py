# -*- coding: utf-8 -*-
"""en/ja blog-data CRED 清理: 12 Industries/12 業界 -> Multi-Industry/多業界; ja 国際トップ -> 大型"""
import io, os, json, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-cred12-20261020")
os.makedirs(BAK, exist_ok=True)

RULES = {
    "en": [
        (r"【12\s*Industries】", "【Multi-Industry】"),
        (r"12[\s-]?Industries", "Multi-Industry"),
        (r"12[\s-]?Industry\b", "Multi-Industry"),
        (r"12[\s-]industry\b", "multi-industry"),
    ],
    "ja": [
        (r"12\s*業界", "多業界"),
        (r"国際トップ", "大型"),
    ],
}

total = {}
for loc, rules in RULES.items():
    p = os.path.join(REPO, "src", "data", "blog-data", loc + ".json")
    with io.open(p, "r", encoding="utf-8", newline="") as f:
        raw = f.read()
    j = json.loads(raw)
    cnt_before = 0
    changed_posts = 0
    for slug, post in j.items():
        if not isinstance(post, dict):
            continue
        touched = False
        for field in ("title", "description", "content"):
            v = post.get(field)
            if not isinstance(v, str):
                continue
            nv = v
            for pat, rep in rules:
                n = len(re.findall(pat, nv))
                if n:
                    cnt_before += n
                    nv = re.sub(pat, rep, nv)
            if nv != v:
                post[field] = nv
                touched = True
        if touched:
            changed_posts += 1
    # 归零校验
    resid = 0
    for slug, post in j.items():
        if not isinstance(post, dict):
            continue
        for field in ("title", "description", "content"):
            v = post.get(field)
            if isinstance(v, str):
                for pat, rep in rules:
                    resid += len(re.findall(pat, v))
    assert resid == 0, "%s residual %d" % (loc, resid)
    # 写回 (只改动相关 post 的 content 值, 保持原字节结构)
    out = json.dumps(j, ensure_ascii=False, indent=2) + "\n"
    json.loads(out)
    bp = os.path.join(BAK, loc + ".json.before")
    if not os.path.exists(bp):
        shutil.copy2(p, bp)
    with io.open(p, "w", encoding="utf-8", newline="") as f:
        f.write(out)
    total[loc] = (cnt_before, changed_posts)

for loc, (n, p) in total.items():
    print("[OK] %s: 替换 %d 处, 触及 %d 篇, 残留 0" % (loc, n, p))
