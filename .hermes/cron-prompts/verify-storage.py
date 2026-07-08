import os
files = {
  'daily':  'zprintpro-daily-content-evolve.md',
  'weekly': 'zprintpro-weekly-meta-refresh.md',
  'monthly':'zprintpro-monthly-matrix-audit.md',
  'gsc':    'zprintpro-gsc-feedback-loop.md',
}
print("=== 4 个 cron 存储 .md 完整性验证 ===\n")
for k, fn in files.items():
    p = rf'C:\Users\Administrator\.mavis\agents\mavis\crons\{fn}'
    if not os.path.exists(p):
        print(f"  {k}: FILE NOT FOUND")
        continue
    with open(p, 'rb') as f:
        raw = f.read()
    text = raw.decode('utf-8', errors='replace')
    print(f"  {k} ({fn}): {len(raw)} bytes")
    # 检查所有标志性内容
    markers_map = {
        'daily':   ['Sub-task A', 'blog-posts.ts', 'src/data/blog-data', '完成标准', '启动后立即读', 'v4'],
        'weekly':  ['内链自生长', 'Tier B', 'meta refresh', '完成标准', '启动后立即读', 'v3'],
        'monthly': ['半年冲刺', '月报落盘', 'Tier 切换判定', '完成标准', '启动后立即读', 'v3', '内容质量自迭代'],
        'gsc':     ['GSC 数据', 'priority_boost', 'matrix.json', '启动后立即读', '完成标准'],
    }
    found = [(m, m in text) for m in markers_map[k]]
    misses = [m for m, ok in found if not ok]
    if misses:
        print(f"    ❌ MISSING: {misses}")
    else:
        print(f"    ✅ ALL MARKERS PRESENT")
    # 显示末尾 100 字符 (确认没截断)
    print(f"    last 100: ...{text[-100:]}")
    print()
