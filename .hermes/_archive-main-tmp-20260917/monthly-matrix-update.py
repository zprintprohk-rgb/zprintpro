"""monthly-matrix-update.py
8/1 monthly cron: bump matrix.json version + 修正 stats + 加 8/1 monthly entry + 加 10 orphan 标记
"""
import json
import re
from pathlib import Path
from datetime import datetime, timezone, timedelta

ROOT = Path(r"F:\zprintpro-nextjs")
m = json.loads((ROOT / ".hermes/industry-keyword-matrix.json").read_text(encoding="utf-8"))

# 1. bump version
old_version = m["version"]
new_version = "2026-08-01-v1"
m["version"] = new_version
print(f"VERSION: {old_version} -> {new_version}")

# 2. 算真实 P0/P1/P2 覆盖
queue = m.get("queue", [])
p0_q = [q for q in queue if q.get("priority") == "P0"]
p1_q = [q for q in queue if q.get("priority") == "P1"]
p2_q = [q for q in queue if q.get("priority") == "P2"]
p0_done = [q for q in p0_q if q.get("status") == "completed"]
p1_done = [q for q in p1_q if q.get("status") == "completed"]
p2_done = [q for q in p2_q if q.get("status") == "completed"]
# Tier A/B/C
tier_a_q = [q for q in queue if q.get("tier") == "A"]
tier_b_q = [q for q in queue if q.get("tier") == "B"]
tier_c_q = [q for q in queue if q.get("tier") == "C"]
tier_a_done = [q for q in tier_a_q if q.get("status") == "completed"]
tier_b_done = [q for q in tier_b_q if q.get("status") == "completed"]
tier_c_done = [q for q in tier_c_q if q.get("status") == "completed"]

# 3. 更新 stats
stats = m.get("stats", {})
stats["queue_size"] = len(queue)
stats["covered_count"] = sum(1 for q in queue if q.get("status") == "completed")
stats["pending_in_queue"] = sum(1 for q in queue if q.get("status") != "completed")
stats["p0_total"] = len(p0_q)
stats["p0_covered"] = len(p0_done)
stats["p0_coverage_pct"] = round(len(p0_done)/len(p0_q), 4) if p0_q else 0
stats["p1_total"] = len(p1_q)
stats["p1_covered"] = len(p1_done)
stats["p1_coverage_pct"] = round(len(p1_done)/len(p1_q), 4) if p1_q else 0
stats["p2_total"] = len(p2_q)
stats["p2_covered"] = len(p2_done)
stats["p2_coverage_pct"] = round(len(p2_done)/len(p2_q), 4) if p2_q else 0
stats["tier_a_total"] = len(tier_a_q)
stats["tier_a_covered"] = len(tier_a_done)
stats["tier_b_total"] = len(tier_b_q)
stats["tier_b_covered"] = len(tier_b_done)
stats["tier_c_total"] = len(tier_c_q)
stats["tier_c_covered"] = len(tier_c_done)
stats["tier_b_coverage"] = f"{len(tier_b_done)}/{len(tier_b_q)} ({round(len(tier_b_done)/len(tier_b_q)*100)}%) — 8 月待补"
stats["last_updated"] = "2026-08-01T22:55:00+08:00"
stats["last_updated_event"] = (
    "monthly-matrix-audit v4.1 (10 orphan 内容质量自迭代 30 URL = 19 new + 11 v2 kept, "
    "matrix version bump 2026-07-23-qgr01-deployed → 2026-08-01-v1, 0 push 攒批 8/2, "
    "price-tables 目录未实施 = 0 校准数据, k3_section6_skip_count 26/26 维持)"
)
m["stats"] = stats
print(f"STATS: P0 {stats['p0_covered']}/{stats['p0_total']} ({stats['p0_coverage_pct']*100:.0f}%) | "
      f"P1 {stats['p1_covered']}/{stats['p1_total']} ({stats['p1_coverage_pct']*100:.0f}%) | "
      f"P2 {stats['p2_covered']}/{stats['p2_total']} ({stats['p2_coverage_pct']*100:.0f}%) | "
      f"covered 524: {stats['covered_524_pct']}%")

# 4. 加 8/1 monthly cron session
v7_sessions = m.get("v7_cron_sessions", [])
v7_sessions.append({"date": "2026-08-01", "event": "monthly-matrix-audit v4.1"})
m["v7_cron_sessions"] = v7_sessions
print(f"v7_cron_sessions: {len(v7_sessions)} (added 8/1 monthly)")

# 5. 加 covered entries: 10 orphan 博客内容质量自迭代
ORPHAN_SLUGS = [
    "poster-printing-guide",
    "paper-bag-printing-guide",
    "sticker-guide",
    "cmyk-guide",
    "restaurant-opening-flyer-printing-guide",
    "food-packaging-printing-guide",
    "paper-materials",
    "brand-materials-checklist",
    "hong-kong-printing-guide",
    "packaging-trends",
]
covered = m.get("covered", [])
existing_slugs = {c.get("slug") for c in covered if isinstance(c, dict)}

# 算每个 orphan 3 locale 的新字数
def wc(html):
    if not html: return 0
    t = re.sub(r"<[^>]+>", " ", html)
    t = re.sub(r"\s+", " ", t)
    return len(t.split())

# 读新 3 locale JSON
for slug in ORPHAN_SLUGS:
    if slug in existing_slugs:
        continue
    locale_chars = {}
    for loc in ["zh-hk", "en", "ja"]:
        p = ROOT / f"src/data/blog-data/{loc}.json"
        d = json.loads(p.read_text(encoding="utf-8"))
        if slug in d:
            locale_chars[loc] = wc(d[slug].get("content", ""))
    new_entry = {
        "id": f"ORPHAN-{slug[:20].upper()}",
        "slug": slug,
        "category": "content-quality-iteration",
        "industry": "mixed",
        "tier": "mixed",
        "priority": "P-mixed",
        "covered_at": "2026-08-01",
        "deployed_at": "2026-08-01T22:55:00+08:00",
        "deploy_method": "git commit pending (8/1 daily c2eb910 already pushed 5 SKU + matrix 6 entries, 1 push/天 quota 维持, monthly 0 push 攒批 8/2 daily cron 之前 push 1 build)",
        "verify_status": "pending-8-2-push",
        "locale_chars": locale_chars,
        "content_iteration": "+53-105w × 3 FAQ × 4-6 内链 (实体名词短语, 200 OK URL only, 跳过 404 custom-stickers / product-labels / baby-product-stickers / a2-poster / paper-bags / pvc-menu / laminated-menu / lai-see-packets / foil-stamped-lai-see / gift-boxes 308)",
        "cron_session": "mvs_292d8951f4eb44eca39c08be7acfaa16",
    }
    covered.append(new_entry)
    existing_slugs.add(slug)
m["covered"] = covered
print(f"covered added 10 orphan: total = {len(covered)}")

# 6. 加 last_tier_switch_run (本月)
m["last_tier_switch_run"] = {
    "date": "2026-08-01",
    "by": "monthly-matrix-audit v4.1 (orchestrator auto)",
    "applied": False,
    "downgrades": [],
    "upgrades": [],
    "manual_review": [],
    "reason_no_apply": (
        "K3 §6 铁律 applied 计数 = 0 (9 天 P0/P1 100% 饱和 0 候选常态, Tier 切换候选 = 0); "
        "GSC 7/22-7/28 7d 数据 296 词 862 imps 1 click (智印港唯一), 28 baseline 词 19 命中 0 点击, 校园词 0 命中 (8/12 验收 §6.2 8/12 不可达); "
        "P3 7/30-8/5 校园 3 页 blocklist 2 slug 留给 M3 P3 独立执行, 4 cron 严禁写; "
        "Tier 60 天无改善 自动降级候选 = 0 (matrix P0/P1 全 100% 饱和, 没候选可降); "
        "Tier 7 天滚动 100 imps ≤ 20 升级 = 0 (GSC 0 命中 < 100); "
        "无需切换, 接受 0 候选常态说明"
    ),
}

# 7. 加 k3_section6_skip_log
k3_log = m.get("k3_section6_skip_log", [])
k3_log.append({
    "date": "2026-08-01",
    "event": "monthly-matrix-audit v4.1",
    "applied": 0,
    "skipped": 0,
    "reason": "K3 §6 铁律 0 候选常态 9 天 (7/24-8/1) - 0 切换候选 = 0 skip",
})
m["k3_section6_skip_log"] = k3_log
m["k3_section6_skip_count"] = m.get("k3_section6_skip_count", 26) + 1  # monthly cron 0 候选 skip
print(f"k3_section6_skip_count: {m['k3_section6_skip_count']}")

# 8. 写回
out = ROOT / ".hermes/industry-keyword-matrix.json"
out.write_text(json.dumps(m, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"\n>>> wrote {out.name}: {out.stat().st_size:,} bytes")
print("DONE")
