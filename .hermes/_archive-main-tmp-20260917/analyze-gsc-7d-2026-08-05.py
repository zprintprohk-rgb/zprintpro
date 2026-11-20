"""
zprintpro GSC 7/28-8/4 vs 7/22 baseline 对照 + matrix 盘点 + 残杀词重算
v4 cron 2026-08-05 启动必跑
"""
import json
import csv
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(r"F:\zprintpro-nextjs")
matrix_path = ROOT / ".hermes" / "industry-keyword-matrix.json"
baseline_path = ROOT / ".hermes" / "gsc-141-baseline-2026-07-22.json"
gsc_csv_path = ROOT / ".hermes" / "gsc-7d-2026-08-05.csv"
output_report = ROOT / ".hermes" / "gsc-7d-analysis-2026-08-05.json"

# 1. 读 GSC 7/28-8/4 数据 — 用 csv.reader 处理含逗号 query
def read_gsc_csv(path):
    """fetch_gsc_data.py 写文件用 .write_bytes(data) 强写 UTF-8 (io.StringIO + encode), 直接 utf-8 读.
    csv.writer 会给含逗号/引号的 query 字段加引号 escape, 用 csv.reader 反向解析."""
    import csv as csv_mod
    with open(path, "r", encoding="utf-8", newline="") as f:
        reader = csv_mod.DictReader(f)
        rows = list(reader)
    return rows

print("=== 1. GSC 7/28-8/4 数据 (390 行) ===")
gsc_rows = read_gsc_csv(gsc_csv_path)
print(f"  rows: {len(gsc_rows)}")
total_imps = sum(int(r["展示"]) for r in gsc_rows)
total_clicks = sum(int(r["点击次数"]) for r in gsc_rows)
print(f"  total imps: {total_imps}")
print(f"  total clicks: {total_clicks}")
# 检测 智印港
zhiyin_rows = [r for r in gsc_rows if "智印港" in r["热门查询"]]
print(f"  智印港 命中: {len(zhiyin_rows)} 行")
for r in zhiyin_rows:
    print(f"    {r['热门查询']} | imps={r['展示']} | clicks={r['点击次数']} | CTR={r['点击率(%)']}% | pos={r['排名']}")

# 2. 7/22 baseline 28 词 × 7/28-8/4 命中
print()
print("=== 2. 28 baseline 词 × 7/28-8/4 命中对照 ===")
with open(baseline_path, "r", encoding="utf-8") as f:
    baseline = json.load(f)
baseline_words = [w["q"] for w in baseline["words"]]
print(f"  baseline 词数: {len(baseline_words)}")
matched = []
not_matched = []
for w in baseline["words"]:
    q = w["q"]
    hit = [r for r in gsc_rows if r["热门查询"] == q]
    if hit:
        r = hit[0]
        matched.append({
            "q": q,
            "imps_6_17": w["imps_6_17"],
            "rank_6_17": w["rank_6_17"],
            "imps_7_28_8_4": int(r["展示"]),
            "clicks_7_28_8_4": int(r["点击次数"]),
            "ctr_7_28_8_4": r["点击率(%)"],
            "pos_7_28_8_4": float(r["排名"]),
            "trend_imps": f"{(int(r['展示'])/w['imps_6_17']*100 if w['imps_6_17'] else 0):.0f}%",
        })
    else:
        not_matched.append(q)
print(f"  命中: {len(matched)} / 28 (vs 7/22-7/28 19, vs 7/29 baseline 19)")
print(f"  未命中: {len(not_matched)} 词")
if matched:
    print(f"  命中词样例 (前 5):")
    for m in matched[:5]:
        print(f"    {m['q']}: 6/17 imps {m['imps_6_17']} → 7/28-8/4 {m['imps_7_28_8_4']} ({m['trend_imps']}) | pos {m['pos_7_28_8_4']}")

# 3. 残杀词重算 (K3 §3.3 残杀词 = 高展示 0 点击)
print()
print("=== 3. 残杀词 (7/28-8/4 7 天, imps ≥ 5 + CTR 0%) ===")
high_imps_zero_click = [r for r in gsc_rows if int(r["展示"]) >= 5 and int(r["点击次数"]) == 0]
high_imps_zero_click.sort(key=lambda r: int(r["展示"]), reverse=True)
print(f"  imps ≥ 5 + CTR 0% 词数: {len(high_imps_zero_click)}")
for r in high_imps_zero_click[:25]:
    print(f"    imps={r['展示']} | q={r['热门查询']} | pos={r['排名']}")

# 4. matrix 盘点
print()
print("=== 4. matrix 盘点 ===")
with open(matrix_path, "r", encoding="utf-8-sig") as f:
    content = f.read()
# 试 utf-8
try:
    matrix = json.loads(content)
except Exception:
    # 试 gbk
    with open(matrix_path, "r", encoding="gbk") as f:
        matrix = json.load(f)

q = matrix["queue"]
completed = [x for x in q if x.get("status") == "completed"]
pending = [x for x in q if x.get("status") != "completed"]
print(f"  total: {len(q)}")
print(f"  completed: {len(completed)}")
print(f"  pending: {len(pending)}")

# P3 校园 3 页
campus_keywords = ["back-to-school", "new-semester", "educational", "exercise-books", "graduation", "textbook"]
campus_pending = [x for x in pending if any(kw in x.get("slug", "") for kw in campus_keywords)]
campus_completed = [x for x in completed if any(kw in x.get("slug", "") for kw in campus_keywords)]
print(f"  校园词 pending: {len(campus_pending)}")
for x in campus_pending:
    print(f"    {x['id']} | {x['slug']} | {x['category']} | priority={x['priority']} | status={x.get('status', 'pending')}")
print(f"  校园词 completed: {len(campus_completed)}")
for x in campus_completed:
    print(f"    {x['id']} | {x['slug']} | {x['category']} | completed_at={x.get('completed_at', '?')}")

# Q-005 状态
q005 = [x for x in q if x["id"] == "Q-005"]
if q005:
    print(f"  Q-005: status={q005[0].get('status', 'pending')}, slug={q005[0].get('slug')}")

# covered 数量
print(f"  covered[]: {len(matrix.get('covered', []))}")
print(f"  v7_sku_optimizations[]: {len(matrix.get('v7_sku_optimizations', []))}")
print(f"  v7_pdp_reviews[]: {len(matrix.get('v7_pdp_reviews', []))}")
print(f"  v7_cron_sessions[]: {len(matrix.get('v7_cron_sessions', []))}")

# 5. P0 SKU 覆盖
p0_total = 34
p0_optimized_skus = set()
for x in matrix.get("v7_sku_optimizations", []):
    p0_optimized_skus.add(x["slug"])
print(f"  P0 SKU total: 34 (8/4 endpoint)")
print(f"  P0 SKU optimized (v7_sku_optimizations unique slugs): {len(p0_optimized_skus)}")
# 计算 P0 100% 覆盖 (8/5 daily cron 报 34/34)
# matrix v7_sku_optimizations_count = 54, 但 unique slugs 约 35-40

# 6. 输出 JSON 报告
report = {
    "report_date": "2026-08-05",
    "gsc_window": "2026-07-28 to 2026-08-04 (7 days)",
    "gsc_total_imps": total_imps,
    "gsc_total_clicks": total_clicks,
    "gsc_total_rows": len(gsc_rows),
    "gsc_28_baseline_matched": len(matched),
    "gsc_28_baseline_not_matched": len(not_matched),
    "gsc_zhiyin_brand_row": zhiyin_rows[0] if zhiyin_rows else None,
    "gsc_high_imps_zero_click_top25": [
        {"q": r["热门查询"], "imps": int(r["展示"]), "pos": float(r["排名"])}
        for r in high_imps_zero_click[:25]
    ],
    "matrix_total_queue": len(q),
    "matrix_completed": len(completed),
    "matrix_pending": len(pending),
    "matrix_campus_pending": [{"id": x["id"], "slug": x["slug"], "category": x["category"], "priority": x["priority"]} for x in campus_pending],
    "matrix_campus_completed": [{"id": x["id"], "slug": x["slug"], "category": x["category"], "completed_at": x.get("completed_at", "?")} for x in campus_completed],
    "matrix_q005_status": q005[0].get("status", "pending") if q005 else "NOT_FOUND",
    "matrix_q005_slug": q005[0].get("slug") if q005 else None,
    "matrix_covered_count": len(matrix.get("covered", [])),
    "matrix_v7_sku_count_field": matrix.get("v7_sku_optimizations_count", 0),
    "matrix_v7_pdp_count_field": matrix.get("v7_pdp_reviews_count", 0),
    "matrix_v7_cron_sessions_count_field": matrix.get("v7_cron_sessions_count", 0),
    "matrix_v7_skip_log_count_field": matrix.get("v7_skip_log_count", 0),
    "matrix_k3_section6_skip_count_field": matrix.get("k3_section6_skip_count", 0),
    "matrix_last_updated": matrix.get("last_updated", "?"),
}
with open(output_report, "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=2)
print(f"\n=== 报告已落盘: {output_report} ===")
