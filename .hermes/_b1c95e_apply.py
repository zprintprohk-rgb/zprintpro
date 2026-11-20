# -*- coding: utf-8 -*-
"""
.hermes/_b1c95e_apply.py — 簇9.5-E 执行器 (1000+/12行业/裸15年/FSC C123456/國際頂級)
排除: geo-atom 知识原子区 (K3 冲突区不碰) / 「2015 年」数字前缀误配 / 数量阈值 (白名单域)
"""
import io, os, re, shutil, sys, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-b1c95e-20261016")
os.makedirs(BAK, exist_ok=True)

FILES = [
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/case-studies/page.tsx",
    "src/app/[locale]/services/catalog-printing-china/page.tsx",
    "src/components/geo/CompareTable.tsx",
    "src/components/home/WhyChooseUs.tsx",
    "src/components/services/rush-data.ts",
    "src/data/blog-data/en.json",
    "src/data/blog-data/ja.json",
    "src/data/blog-data/zh-hk.json",
    "src/data/blog-posts.ts",
    "src/data/buying-guides.ts",
    "src/data/case-studies/cover-industries-zh-hk.json",
]

# 语言域: (old, new, lang)  lang: en/zh/ja — 只应用于对应语言文件或混合 ts (ts 全应用)
EN_R = [
    ("15 years since 2011", "over a decade since 2012"),
    ("15 years", "over a decade"),
    ("FSC C123456", "FSC certification"),
    ("12 industries", "key industries"),
    ("1,000+ clients", "global clients"),
    ("1000+ global clients", "global clients"),
    ("Trusted by 1,000+", "Trusted by global"),
    ("1,000+ business clients", "global business clients"),
    ("1,000+ businesses", "global businesses"),
    ("1,000+ orders shipped", "global order fulfilment"),
    ("1,000+ brands", "global brands"),
]
ZH_R = [
    ("FSC C123456", "FSC 認證文件"),
    ("12 大行業", "多個行業"),
    ("國際頂級印刷集團", "大型印刷集團"),
    ("1,000+ 企業客戶", "全球企業客戶"),
    ("1,000+ 客戶", "全球客戶"),
    ("15 年", "多年"),
    ("15年", "多年"),
]
JA_R = [
    ("FSC C123456", "FSC 認証書類"),
    ("15 年以上", "長年にわたり"),
    ("15 年の", "長年の"),
    ("1,000 社以上のクライアント", "世界中のクライアント"),
    ("15 年", "長年"),
    ("15年", "長年"),
]

def classify(f):
    if f.endswith("en.json"): return "en"
    if f.endswith("ja.json"): return "ja"
    if f.endswith("zh-hk.json") or "cover-industries-zh-hk" in f: return "zh"
    return "all"  # 混合 ts/tsx: 全部规则可用 (长串语言自区分)

def atom_spans(content):
    """geo-atom 知识原子区 spans (K3 冲突区, 不碰)"""
    spans = []
    for marker in ["data-geo-atoms", "直引き知識アトム", "直引知識原子", "AI 直引"]:
        start = 0
        while True:
            i = content.find(marker, start)
            if i < 0: break
            end = content.find("</section>", i)
            spans.append((i, end if end > 0 else i + len(marker) + 5000))
            start = i + len(marker)
    return spans

def in_spans(idx, spans):
    for a, b in spans:
        if a <= idx < b: return True
    return False

def apply_lang_rules(t, rules, spans):
    """带 geo-atom 排除 + 数字前缀守卫的替换"""
    n = 0
    for old, new in rules:
        pos = 0
        out = []
        while True:
            j = t.find(old, pos)
            if j < 0:
                out.append(t[pos:]); break
            if in_spans(j, spans):
                out.append(t[pos:j + len(old)]); pos = j + len(old); continue
            # 数字前缀守卫: 「15 年」「15年」类避免 2015 年 误配
            if old.startswith("15") and j > 0 and t[j-1].isdigit():
                out.append(t[pos:j + len(old)]); pos = j + len(old); continue
            out.append(t[pos:j]); out.append(new)
            n += 1
            pos = j + len(old)
        t = "".join(out)
    return t, n

def main():
    grand = {}
    for rel in FILES:
        p = os.path.join(REPO, rel)
        if not os.path.exists(p):
            print(f"[skip] {rel}"); continue
        with io.open(p, "r", encoding="utf-8", newline="") as fh:
            t = fh.read()
        before = t
        lang = classify(rel)
        spans = atom_spans(t)
        n = 0
        if lang in ("en", "all"):
            t, k = apply_lang_rules(t, EN_R, spans); n += k
        if lang in ("zh", "all"):
            t, k = apply_lang_rules(t, ZH_R, spans); n += k
        if lang in ("ja", "all"):
            t, k = apply_lang_rules(t, JA_R, spans); n += k
        if t != before:
            shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
            with io.open(p, "w", encoding="utf-8", newline="") as fh:
                fh.write(t)
        grand[rel] = n
    total = sum(grand.values())
    print(f"[9.5-E] total replaced: {total}")
    for k, v in sorted(grand.items(), key=lambda x: -x[1]):
        if v: print(f"  {v:4d}  {k}")
    # 终态断言
    finals = {}
    for rel in FILES:
        p = os.path.join(REPO, rel)
        if not os.path.exists(p): continue
        with io.open(p, "r", encoding="utf-8", newline="") as fh:
            t = fh.read()
        for pat in ["FSC C123456", "國際頂級", "国际顶级", "12 大行業", "12 industries"]:
            c = t.count(pat)
            if c: finals[f"{pat}@{rel}"] = c
    if finals:
        print("[FINAL-RESIDUAL]", json.dumps(finals, ensure_ascii=False))
    else:
        print("[FINAL] C123456/頂級/12行業 全清 ✓")
    return 0

if __name__ == "__main__":
    sys.exit(main())
