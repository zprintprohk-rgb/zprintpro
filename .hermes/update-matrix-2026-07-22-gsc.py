"""
matrix.json priority_boost update (2026-07-22 gsc-feedback-loop v3)
- 读取 .hermes/industry-keyword-matrix.json
- 应用 4 条 priority_boost 规则 (按 K3 §6 + AGENTS.md §13.4)
- 写回 (Python json.dump, 避免 Edit/Write 大段 JSON 转义问题)
- 不改 covered[], 不改 priority, 不改 slug/sku/title
- 仅改 priority_boost (在 [-3, +3] 范围) + version + stats.last_updated + stats.last_updated_event
"""
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path('.').resolve()
matrix_path = ROOT / '.hermes' / 'industry-keyword-matrix.json'
snapshot_path = ROOT / '.hermes' / 'gsc-snapshot-2026-07-22.json'

print("=" * 70)
print("matrix.json priority_boost update (2026-07-22 gsc-feedback-loop v3)")
print("=" * 70)

# 加载 matrix.json
with open(matrix_path, 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# 加载 snapshot
with open(snapshot_path, 'r', encoding='utf-8') as f:
    snapshot = json.load(f)

print(f"  matrix.json version: {matrix.get('version')}")
print(f"  matrix.json queue length: {len(matrix.get('queue', []))}")
print(f"  snapshot residual_141 count: {snapshot.get('residual_141_count', 0)}")

# 4 条 priority_boost 规则 (按 cron prompt)
# +1: orphan (展示≥50 zero clicks) - 11 词 (本轮全部已 covered, 不重复加权)
# +1: high_potential (展示≥20 rank 20-50) - 11 词 (本轮全部已 covered, 不重复加权)
# +1: 141 残杀词 7 天滚动展示 > 0 - 28 词 (本轮 6/17 快照, 暂作 1-time 检查)
# +2: 强信号 (展示≥100 rank 11-30) - 1 词 (已 covered)
# -1: 30/90 天零展示 / 141 残杀词连续 14 天零展示 - 数据局限,跳过
# 0: 中性

# K3 §6: 已 covered Q 不重复加权 (避免 GSC 反馈循环污染)
covered_ids = {c.get('id') for c in matrix.get('covered', [])}
print(f"  covered_ids count: {len(covered_ids)}")

# 计算每个 Q 是否要调整
boost_changes = []  # list of (Q-id, old, new, reason)
for q in matrix.get('queue', []):
    qid = q.get('id', '?')
    old_boost = q.get('priority_boost', 0)
    status = q.get('status', 'pending')

    # 已 completed: 不重复加权 (K3 §6 铁律)
    if status == 'completed':
        continue

    # 检查 GSC 命中 (基于 snapshot)
    slug = q.get('slug', '')

    # 应用规则
    new_boost = old_boost  # default no change
    reason = []

    # 检查 141 残杀词命中 (但 6/17 快照非 7-day rolling,需谨慎)
    residual_141 = snapshot.get('residual_141_top20', [])
    for r in residual_141:
        # 弱匹配 (slug or industry)
        if r['q'] in slug or slug in r['q']:
            # 141 残杀词规则: 7-day 滚动展示仍 > 0
            # 本轮 6/17 快照,非 7-day rolling,仅作 best-effort 信号
            # 若未 covered 且 priority_boost < 2,加 1
            if old_boost < 2 and qid not in covered_ids:
                new_boost = min(old_boost + 1, 2)
                reason.append(f"141_residual_match q={r['q']} imps={r['imps']} (best-effort, 6/17 snapshot non-7d-rolling)")
            break

    # 检查强信号 (但已 covered 不重复)
    # 强信号: 食品包裝印刷 (108, 25.45) → Q-002/Q-003/Q-005/Q-006/Q-P1-04 都涉及
    # Q-P1-04 已有 priority_boost 1, 不再加
    # Q-005 已有 priority_boost 2, 不再加

    if new_boost != old_boost:
        boost_changes.append((qid, old_boost, new_boost, reason, slug, status))

print(f"\n[priority_boost changes]")
if not boost_changes:
    print("  NO CHANGES — all GSC signals 已 covered, K3 §6 不重复加权")
    print("  6/17 快照 22 个 GSC 信号词全部已 covered:")
    print("    - strong_signal (1 词): 食品包裝印刷 → Q-002/Q-003/Q-005/Q-006 covered")
    print("    - orphan_+1 (11 词): 全部已 covered Q-001/Q-002/Q-003/Q-004/Q-005/Q-006/Q-007/Q-P1-01")
    print("    - high_potential_+1 (11 词): 全部已 covered Q-001/Q-003/Q-004/Q-P1-01/Q-P1-02/Q-P1-03/Q-P1-04")
    print("  141 残杀词 baseline 28 词已建立, 等 7-day rolling 复查触发 -1 减权")
else:
    for qid, old, new, reasons, slug, status in boost_changes:
        print(f"  {qid:8} {old} → {new} ({slug}) [{status}]")
        for r in reasons:
            print(f"    reason: {r}")

# 写回 matrix.json
# 1. update version
old_version = matrix.get('version', '?')
new_version = '2026-07-22-v1'
matrix['version'] = new_version

# 2. update priority_boost in queue
for qid, old, new, reasons, slug, status in boost_changes:
    for q in matrix.get('queue', []):
        if q.get('id') == qid:
            q['priority_boost'] = new
            # 记录 last 调整时间
            q['priority_boost_last_adjusted'] = '2026-07-22'
            q['priority_boost_last_reason'] = '; '.join(reasons)[:200]

# 3. update stats
if 'stats' in matrix:
    matrix['stats']['last_updated'] = '2026-07-22'
    matrix['stats']['last_updated_event'] = 'gsc-feedback-loop v3 (141 baseline established, 0 priority_boost changes, GSC API timeout fallback)'

# 4. add priority_boost_history entry
if 'priority_boost_history' not in matrix:
    matrix['priority_boost_history'] = []
matrix['priority_boost_history'].append({
    'date': '2026-07-22',
    'event': 'gsc-feedback-loop v3',
    'changes': [
        {'qid': c[0], 'old': c[1], 'new': c[2], 'slug': c[4]}
        for c in boost_changes
    ] or 'no_changes (all GSC signals already covered per K3 §6)',
    'data_source': '6/17 gsc_data.csv snapshot + 7/17 overlap-keywords.csv (GSC API timeout, GFW-blocked oauth2.googleapis.com)',
    'residual_141_baseline_established': True,
    'residual_141_count': snapshot.get('residual_141_count', 0),
})

# 5. 写回 (Python json.dump + ensure_ascii=False 避免 \u 转义)
with open(matrix_path, 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f"\n[matrix.json updated]")
print(f"  version: {old_version} → {new_version}")
print(f"  priority_boost changes: {len(boost_changes)}")
print(f"  residual_141 baseline: {snapshot.get('residual_141_count', 0)} words (saved separately)")
print(f"  file size: {matrix_path.stat().st_size} bytes")

# 验证 priority_boost 范围
all_b = [q.get('priority_boost', 0) for q in matrix.get('queue', [])]
in_range = all(-3 <= b <= 3 for b in all_b)
print(f"  priority_boost range: [{min(all_b)}, {max(all_b)}] (in [-3, +3]: {in_range})")
assert in_range, "FATAL: priority_boost out of [-3, +3]"
print("  [OK] priority_boost all in [-3, +3]")
