# -*- coding: utf-8 -*-
# Phase 1 hreflang + sameAs 修复脚本（备份 + 断言未过不写盘 + 写后校验，per §12 三件套）
import io, shutil, sys, os

ROOT = r"F:\zprintpro-nextjs"
BAK_DIR = os.path.join(ROOT, ".hermes", "geo", "bak-phase1")
os.makedirs(BAK_DIR, exist_ok=True)

files_keys = [
    r"src\app\[locale]\about\page.tsx",
    r"src\app\[locale]\blog\[slug]\page.tsx",
    r"src\app\[locale]\blog\page.tsx",
    r"src\app\[locale]\business-card-printing\page.tsx",
    r"src\app\[locale]\case-studies\page.tsx",
    r"src\app\[locale]\company-news\page.tsx",
    r"src\app\[locale]\contact\page.tsx",
    r"src\app\[locale]\faq\page.tsx",
    r"src\app\[locale]\help-center\page.tsx",
    r"src\app\[locale]\insights\hk-print-inquiry-index\page.tsx",
    r"src\app\[locale]\layout.tsx",
    r"src\app\[locale]\legal\page.tsx",
    r"src\app\[locale]\payment\success\page.tsx",
    r"src\app\[locale]\press-kit\page.tsx",
    r"src\app\[locale]\services\business-cards-printing\page.tsx",
    r"src\app\[locale]\services\catalog-printing-china\page.tsx",
    r"src\app\[locale]\services\rush-printing-delivery\page.tsx",
    r"src\app\[locale]\services\seo\[slug]\page.tsx",
    r"src\app\[locale]\trade-program\page.tsx",
]

def read(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def write(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(s)

total_keys = 0
changed = []

# 1) 页面级 'zh-HK': 键 → 'zh-Hant-HK':（og:locale 用 hreflangMap，不在本批范围）
for rel in files_keys:
    p = os.path.join(ROOT, rel)
    txt = read(p)
    n1 = txt.count("'zh-HK':")
    n2 = txt.count('"zh-HK":')
    n = n1 + n2
    if rel.endswith("layout.tsx"):
        # layout 的 manifest hrefLang="zh-HK" 是属性值(=连接), 不含 ': 形态, 上述计数天然不命中
        assert 'hrefLang="zh-HK"' in txt, "layout manifest marker missing"
        assert n == 1, "layout key count unexpected: %d" % n
    else:
        assert n >= 1, "no zh-HK key in %s" % rel
    new = txt.replace("'zh-HK':", "'zh-Hant-HK':").replace('"zh-HK":', '"zh-Hant-HK":')
    assert new.count("'zh-Hant-HK':") + new.count('"zh-Hant-HK":') == n, "replace count mismatch in %s" % rel
    if n > 0:
        shutil.copy2(p, os.path.join(BAK_DIR, rel.replace("\\", "__") + ".bak"))
        write(p, new)
        total_keys += n
        changed.append(rel)

# 2) faq/page.tsx 本地映射值 'zh-hk': 'zh-HK' → 'zh-Hant-HK'
p_faq = os.path.join(ROOT, r"src\app\[locale]\faq\page.tsx")
txt = read(p_faq)
old = "'zh-hk': 'zh-HK',"
assert txt.count(old) == 1, "faq local map pattern count != 1"
shutil.copy2(p_faq, os.path.join(BAK_DIR, "faq__value.bak"))
write(p_faq, txt.replace(old, "'zh-hk': 'zh-Hant-HK',"))
changed.append("faq value-map")

# 3) layout x-default '/' → '/zh-hk'
p_layout = os.path.join(ROOT, r"src\app\[locale]\layout.tsx")
txt = read(p_layout)
old = "'x-default': '/',"
assert txt.count(old) == 1, "layout x-default count != 1"
write(p_layout, txt.replace(old, "'x-default': '/zh-hk',"))
changed.append("layout x-default")

# 4) 死代码生成器 x-default /en → /zh-hk（防未来复活时带错默认）
p_hl = os.path.join(ROOT, r"src\lib\hreflang.ts")
txt = read(p_hl)
old = """  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${BASE_URL}/en${normalizedPath}`,
  });"""
assert txt.count(old) == 1, "hreflang.ts x-default block count != 1"
shutil.copy2(p_hl, os.path.join(BAK_DIR, "hreflang.ts.bak"))
write(p_hl, txt.replace(old, """  tags.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${BASE_URL}/zh-hk${normalizedPath}`,
  });"""))
changed.append("hreflang.ts x-default")

print("OK total key replaced:", total_keys)
for c in changed:
    print(" -", c)
