# -*- coding: utf-8 -*-
# 收尾：lib 层 'zh-HK': 映射残留 → 'zh-Hant-HK':（5 处，计数断言 + 备份 + 写后校验）
import io, os, shutil

ROOT = r"F:\zprintpro-nextjs"
BAK = os.path.join(ROOT, ".hermes", "geo", "bak-phase1")
os.makedirs(BAK, exist_ok=True)

targets = [
    (r"src\lib\metadata.ts", 1),
    (r"src\lib\seo.ts", 4),
]

for rel, expect in targets:
    p = os.path.join(ROOT, rel)
    with io.open(p, 'r', encoding='utf-8') as f:
        t = f.read()
    n = t.count("'zh-HK':")
    assert n == expect, "%s count=%d expect=%d" % (rel, n, expect)
    shutil.copy2(p, os.path.join(BAK, os.path.basename(rel) + ".bak-libfix"))
    t2 = t.replace("'zh-HK':", "'zh-Hant-HK':")
    with io.open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(t2)
    with io.open(p, 'r', encoding='utf-8') as f:
        chk = f.read()
    assert chk.count("'zh-Hant-HK':") >= expect and "'zh-HK':" not in chk, "post-check fail %s" % rel
    print(rel, "->", expect, "replaced OK")
print("LIB FIX OK")
