# -*- coding: utf-8 -*-
"""
.hermes/_b1c9_apply_20261016.py — B1c 簇9 全站 body 清扫 (Phase 2)
依据: .hermes/_b1c9_plan.json (Phase 1 逐 SKU minQ 对照, KEEP 77 / FIX 224)
批次A (低风险纯口径): ISO 9001 認證工廠→國際認證體系工廠 / 認証工場→国際認証体系の工場 / certified→internationally certified / 15+ 年の→長年の / 15+ 年→多年
批次B (FIX only): 10 張起印→{minQ} 個起印 (minQ 已知) / | 100 MOQ 删除 / 100-MOQ.→{minQ}-piece MOQ. / 50-MOQ(rigid minQ100)→100-MOQ
域序: CSV (col11/col12 覆盖域) 先修 → regen 同步 → ts body (ts-only) 后修
§12 三件套: 逐项计数断言 + 后置形状断言 + 备份
"""
import io, os, shutil, sys, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_P = os.path.join(REPO, "zprintpro-sku-seo-data.csv")
TS_P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c9-20261016")
os.makedirs(BAK, exist_ok=True)

A_MAP = [  # (old, new) — 全站 0 KEEP, 全局替换安全 (顺序敏感: の 在前)
    ("15+ 年の", "長年の"),
    ("15+ 年", "多年"),
    ("ISO 9001 認證工廠", "國際認證體系工廠"),
    ("ISO 9001 認証工場", "国際認証体系の工場"),
    ("ISO 9001 certified", "internationally certified"),
]

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    plan = json.load(open(os.path.join(REPO, ".hermes", "_b1c9_plan.json"), encoding="utf-8"))
    # slug -> {pattern: (count, minQ)}
    fix_map = {}
    for batch in ("A_low_risk", "B_needs_truth"):
        for rec in plan["batches"][batch]:
            fix_map.setdefault(rec["slug"], {})[rec["pattern"]] = (rec["count"], rec["minQ"], rec["verdict"])
    csv_text = read(CSV_P)
    ts_text = read(TS_P)

    # ---------- 批次A: 全局口径替换 (ts + CSV 两域) ----------
    pre_csv = {old: csv_text.count(old) for old, _ in A_MAP}
    pre_ts = {old: ts_text.count(old) for old, _ in A_MAP}
    csv_a = csv_text
    ts_a = ts_text
    for old, new in A_MAP:
        csv_a = csv_a.replace(old, new)
        ts_a = ts_a.replace(old, new)
    # 断言: 替换后 0 残留 (两域)
    for old, _ in A_MAP:
        if csv_a.count(old) or ts_a.count(old):
            print(f"[c9A] FAIL 残留 {old!r} csv={csv_a.count(old)} ts={ts_a.count(old)}"); return 3

    # ---------- 批次B: CSV 覆盖域 (col11/col12) FIX 项 ----------
    csv_lines = csv_a.split("\n")
    b_csv_fixed = 0
    for i, row in enumerate(csv_lines):
        cols = row.split("\t")
        if len(cols) != 31 or not cols[3]:
            continue
        slug = cols[3]
        fmap = fix_map.get(slug)
        if not fmap:
            continue
        mq = fmap.get("10 張起印，無開版費", (0, None, ""))[1] if "10 張起印，無開版費" in fmap else None
        # col12 (EN desc): | 100 MOQ / 100-MOQ / 50-MOQ / ISO certified 已在A批处理
        v = cols[12]
        if " | 100 MOQ" in v and " | 100 MOQ" in fmap and fmap[" | 100 MOQ"][2] == "FIX":
            v = v.replace(" | 100 MOQ", ""); b_csv_fixed += 1
        if "100-MOQ." in v and "100-MOQ" in fmap and fmap["100-MOQ"][2] == "FIX":
            m = fmap["100-MOQ"][1]
            v = v.replace("100-MOQ.", f"{m}-piece MOQ.") if isinstance(m, int) else v.replace("100-MOQ. ", "").replace("100-MOQ.", "")
            b_csv_fixed += 1
        if "50-MOQ" in v and "50-MOQ" in fmap and fmap["50-MOQ"][2] == "FIX":
            m = fmap["50-MOQ"][1]
            v = v.replace("50-MOQ", f"{m}-MOQ") if isinstance(m, int) else v
            b_csv_fixed += 1
        cols[12] = v
        # col11 (ZH desc): 15+ 年 已在A批; 10 張起印 FIX 在 col11 若出现 (kgb 等 slug 已核实在 ts body, col11 无 — 但按 plan 保险处理)
        v = cols[11]
        if "10 張起印，無開版費" in v and "10 張起印，無開版費" in fmap and fmap["10 張起印，無開版費"][2] == "FIX":
            m = fmap["10 張起印，無開版費"][1]
            v = v.replace("10 張起印，無開版費", f"{m} 個起印，無開版費") if isinstance(m, int) else v.replace("10 張起印，無開版費。", "")
            b_csv_fixed += 1
        cols[11] = v
        csv_lines[i] = "\t".join(cols)
    csv_b = "\n".join(csv_lines)

    # ---------- regen 同步 (CSV → ts desc/h1/alt) ----------
    for p, t in ((CSV_P, csv_b),):
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        with io.open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(t)

    # ---------- 批次B: ts body (ts-only) 10 張起印 FIX ----------
    ts_lines = ts_b_text = read(TS_P)
    b_ts_fixed = 0
    for slug, fmap in fix_map.items():
        if "10 張起印，無開版費" not in fmap or fmap["10 張起印，無開版費"][2] != "FIX":
            continue
        m = fmap["10 張起印，無開版費"][1]
        i = ts_b_text.find(f'"{slug}": {{')
        if i < 0:
            print(f"[c9B] FAIL ts 块未找到 {slug}"); return 2
        j = ts_b_text.find("\n  },", i)
        blk = ts_b_text[i:j]
        n = blk.count("10 張起印，無開版費")
        if n != fmap["10 張起印，無開版費"][0]:
            print(f"[c9B] FAIL {slug} 块内 10 張起印 x{n} (plan {fmap['10 張起印，無開版費'][0]})"); return 2
        new_phrase = f"{m} 個起印，無開版費" if isinstance(m, int) else ""
        blk = blk.replace("10 張起印，無開版費", new_phrase)
        ts_b_text = ts_b_text[:i] + blk + ts_b_text[j:]
        b_ts_fixed += n

    # ---------- 后置形状断言 ----------
    ts_final = ts_b_text
    checks = [
        (ts_final, "ISO 9001 認證工廠", 0), (ts_final, "ISO 9001 認証工場", 0), (ts_final, "ISO 9001 certified", 0),
        (ts_final, "15+ 年", 0), (ts_final, "15+ 年の", 0),
        (csv_b, "ISO 9001 認證工廠", 0), (csv_b, "15+ 年", 0), (csv_b, "ISO 9001 certified", 0),
    ]
    for t, s, n in checks:
        c = t.count(s)
        if c != n:
            print(f"[c9] FAIL 形状 {s!r} x{c} (期望 {n})"); return 3
    # KEEP 保护: ts 中 10 張起印 剩余 = KEEP 34 (body 域)
    rem = ts_final.count("10 張起印，無開版費")
    keep_expected = plan["summary"]["patterns"]["10 張起印，無開版費"]["keep"]
    if rem != keep_expected:
        print(f"[c9] FAIL KEEP 保护: 剩余 {rem} (期望 {keep_expected})"); return 3

    # ---------- 写盘 ts ----------
    shutil.copy2(TS_P, os.path.join(BAK, "sku-seo-data.ts.before"))
    with io.open(TS_P, "w", encoding="utf-8", newline="") as fh:
        fh.write(ts_final)

    print(f"[c9] PASS: 批次A CSV {sum(pre_csv.values())} 处 + ts {sum(pre_ts.values())} 处 | 批次B CSV {b_csv_fixed} 处 + ts body {b_ts_fixed} 处 | KEEP {rem} 保护 ✓")
    print(f"[c9] 下一步: regen 同步 CSV→ts desc 域 + tsc + 门童")
    return 0

if __name__ == "__main__":
    sys.exit(main())
