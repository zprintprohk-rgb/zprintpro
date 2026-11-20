# -*- coding: utf-8 -*-
# Phase 1.2 sameAs 真实锚点注入（GitHub org+repo，2026-09-30 HTTP 200 已验）
import io, os, shutil

ROOT = r"F:\zprintpro-nextjs"
p = os.path.join(ROOT, "src", "lib", "seo.ts")
BAK_DIR = os.path.join(ROOT, ".hermes", "geo", "bak-phase1")
os.makedirs(BAK_DIR, exist_ok=True)

GH_BLOCK = (
    "        // 2026-09-30 W2 Phase 1.2: 真实可核验自有锚点 (GitHub 组织+仓库, HTTP 200 已验)\n"
    "        'https://github.com/zprintprohk-rgb',\n"
    "        'https://github.com/zprintprohk-rgb/zprintpro',\n"
)

targets = [
    "// HK business directories (to be created)",
    "// Japan business directories (to be created)",
    "// Global business directories (to be created)",
]

with io.open(p, 'r', encoding='utf-8') as f:
    txt = f.read()

for t in targets:
    assert txt.count(t) == 1, "anchor not unique: %s (%d)" % (t, txt.count(t))

for t in targets:
    txt = txt.replace(t, GH_BLOCK + t, 1)

old_org = "sameAs: ['https://twitter.com/zprintpro', 'https://linkedin.com/company/zprintpro'],"
assert txt.count(old_org) == 1, "org sameAs pattern count != 1"
new_org = ("sameAs: ['https://twitter.com/zprintpro', 'https://linkedin.com/company/zprintpro',\n"
           "      // 2026-09-30 W2 Phase 1.2: GitHub 真实锚点 (HTTP 200 已验)\n"
           "      'https://github.com/zprintprohk-rgb', 'https://github.com/zprintprohk-rgb/zprintpro'],")
txt = txt.replace(old_org, new_org, 1)

shutil.copy2(p, os.path.join(BAK_DIR, "seo.ts.bak-sameas"))
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(txt)

# 写后校验
with io.open(p, 'r', encoding='utf-8') as f:
    chk = f.read()
n = chk.count('https://github.com/zprintprohk-rgb')
print("github anchor occurrences:", n, "(expect 8 = 3 NAP x2 + org x2)")
assert n == 8, "unexpected occurrence count"
print("OK")
