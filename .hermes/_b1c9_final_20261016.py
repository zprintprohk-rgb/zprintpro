# -*- coding: utf-8 -*-
"""
.hermes/_b1c9_final_20261016.py — 簇9 Phase 2 最终执行器
批次A (语言区分全局, 0 KEEP): ISO 9001 全变体 → 國際認證體系(zh)/国際認証体系(ja)/internationally certified(en); 15+ 年の→長年の; 15+ 年→多年; 15+ years→over a decade
批次B (逐 SKU minQ 真值): 「10 張起印，無開版費」FIX 13 处 → {minQ} 個/張起印 (bags/boxes=個, fruit-food seo 幻影块=500 張)
域: ts 全局 (A) + ts 块级 (B) + CSV 全局 (A 变体)
§12 三件套: 计数断言 + 后置形状断言 + 备份
"""
import io, os, shutil, sys, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
TS_P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c9-20261016")

# 批次A: 语言区分变体 (顺序: 长串在前)
A_TS = [
    ("15+ 年の", "長年の"),
    ("15+ 年", "多年"),
    ("15+ years", "over a decade"),
    ("ISO 9001 認證工廠", "國際認證體系工廠"),
    ("ISO 9001 認證", "國際認證體系"),
    ("ISO 9001 認証工場", "国際認証体系の工場"),
    ("ISO 9001認証工場", "国際認証体系の工場"),
    ("ISO 9001 認証", "国際認証体系"),
    ("ISO 9001 certified", "internationally certified"),
    ("ISO 9001 quality control", "internationally certified quality control"),
    ("ISO 9001 品質管理", "国際認証体系品質管理"),
    ("ISO 9001質檢", "國際認證體系質檢"),
    ("ISO 9001 質檢報告", "國際認證體系質檢報告"),
    ("ISO 9001 + FSC 認證", "國際認證體系 + FSC 認證"),
    ("ISO 9001 QC", "internationally certified QC"),
    ("ISO 9001品質検査", "国際認証体系品質検査"),
    ("ISO 9001品質管理", "国際認証体系品質管理"),
    ("ISO 9001.", "internationally certified."),
]
A_CSV = [
    ("ISO 9001 認證", "國際認證體系"),
    ("ISO 9001質檢", "國際認證體系質檢"),
    ("ISO 9001 + FSC 認證", "國際認證體系 + FSC 認證"),
    ("ISO 9001 認証品質", "國際認證體系品質"),
    ("ISO 9001 quality control", "internationally certified quality control"),
    ("ISO 9001 品質管理", "国際認証体系品質管理"),
    ("ISO 9001 QC.", "internationally certified QC."),
    ("ISO 9001品質検査", "国際認証体系品質検査"),
]

# 批次B: slug -> (minQ, 单位)  (plan FIX 13 处; seo 幻影块归 fruit-food-label-stickers minQ 500 單位張)
B_UNITS = {
    "kraft-paper-bags": (100, "個"), "white-card-bags": (100, "個"), "gift-bags": (100, "個"),
    "handle-bags": (100, "個"), "large-bags": (100, "個"), "cosmetic-boxes": (100, "個"),
    "rigid-boxes": (100, "個"), "magnetic-closure-gift-box": (100, "個"),
    "electronics-packaging-box": (200, "個"), "kraft-paper-packaging-box": (300, "個"),
    "__seo_phantom__": (500, "張"),  # fruit-food-label-stickers 的 seo 子块 (缩进异常)
}

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    plan = json.load(open(os.path.join(REPO, ".hermes", "_b1c9_plan.json"), encoding="utf-8"))
    csv_text = read(CSV_P)
    ts_text = read(TS_P)

    # ---------- 批次A: ts + CSV 全局 (语言区分变体) ----------
    pre_ts = {old: ts_text.count(old) for old, _ in A_TS}
    pre_csv = {old: csv_text.count(old) for old, _ in A_CSV}
    ts_new = ts_text
    for old, new in A_TS:
        ts_new = ts_new.replace(old, new)
    csv_new = csv_text
    for old, new in A_CSV:
        csv_new = csv_new.replace(old, new)

    # ---------- 批次B: ts 10 張起印 FIX (slug-line 块级) ----------
    import re
    SLUG_RE = re.compile(r'^  "([a-z0-9-]+)": \{', re.M)
    marks = [(m.group(1), m.start()) for m in SLUG_RE.finditer(ts_new)]
    positions = {s: i for s, i in marks}
    b_done = 0
    b_log = []
    for slug, (mq, unit) in B_UNITS.items():
        new_phrase = f"{mq} {unit}起印，無開版費"
        if slug == "__seo_phantom__":
            key = '\n  "seo": {'
            i = ts_new.find(key)
            if i < 0:
                print("[c9f] FAIL seo 幻影块未找到"); return 2
            j = ts_new.find("\n  },", i)
            blk = ts_new[i:j]
            n = blk.count("10 張起印，無開版費")
            if n != 3:
                print(f"[c9f] FAIL seo 块 10 張起印 x{n} (期望 3)"); return 2
            blk = blk.replace("10 張起印，無開版費", new_phrase)
            ts_new = ts_new[:i] + blk + ts_new[j:]
            b_done += n
            b_log.append(f"seo幻影(fruit-food,minQ500張) x{n}")
            continue
        i = ts_new.find(f'"{slug}": {{')
        if i < 0:
            print(f"[c9f] FAIL 块未找到 {slug}"); return 2
        j = ts_new.find("\n  },", i)
        blk = ts_new[i:j]
        n = blk.count("10 張起印，無開版費")
        if n < 1:
            print(f"[c9f] FAIL {slug} 块内 0 处"); return 2
        blk = blk.replace("10 張起印，無開版費", new_phrase)
        ts_new = ts_new[:i] + blk + ts_new[j:]
        b_done += n
        b_log.append(f"{slug}(minQ{mq}{unit}) x{n}")

    # ---------- 后置形状断言 ----------
    finals = {
        "ISO 9001": ts_new.count("ISO 9001") + csv_new.count("ISO 9001"),
        "15+ 年": ts_new.count("15+ 年"),
        "15+ years": ts_new.count("15+ years"),
        "10 張起印，無開版費": ts_new.count("10 張起印，無開版費"),
    }
    # KEEP 保护: 10 張起印 剩余 = plan keep 34 (全部为 minQ=10 SKU body 真值)
    keep_expected = plan["summary"]["patterns"]["10 張起印，無開版費"]["keep"]
    if finals["10 張起印，無開版費"] != keep_expected:
        print(f"[c9f] FAIL KEEP 保护: {finals['10 張起印，無開版費']} (期望 {keep_expected})"); return 3
    for k, v in finals.items():
        if k != "10 張起印，無開版費" and v != 0:
            print(f"[c9f] FAIL 残留 {k!r} x{v}")
            for src_name, src_t in (("ts", ts_new), ("csv", csv_new)):
                idx = 0, 0
                p1, p2 = 0, 0
                while True:
                    j = src_t.find(k, p2)
                    if j < 0: break
                    print(f"  [{src_name}] ...{src_t[max(0, j - 60):j + 60]}...".replace(chr(10), ' '))
                    p2 = j + 1
            return 3
    if ts_new.count("國際認證體系") < pre_ts.get("ISO 9001 認證工廠", 0):
        print("[c9f] FAIL 替换计数异常"); return 3

    # ---------- 写盘 ----------
    for p, t in ((CSV_P, csv_new), (TS_P, ts_new)):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        with io.open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(t)
    print(f"[c9f] PASS: 批次A ts {sum(pre_ts.values())} + CSV {sum(pre_csv.values())} | 批次B {b_done} 处 ({'; '.join(b_log)})")
    print(f"[c9f] finals: {finals} | KEEP {keep_expected} 保护 ✓")
    return 0

if __name__ == "__main__":
    sys.exit(main())
