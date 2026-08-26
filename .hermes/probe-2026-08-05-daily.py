"""2026-08-05 daily cron probe - 找未优化 P0 SKU + 确认今日 A 选题"""
import re
import json
from collections import defaultdict

with open(r'F:\zprintpro-nextjs\src\data\products.ts', 'r', encoding='utf-8') as f:
    products_ts = f.read()

# 找所有 SKU blocks
# 模式: slug: 'xxx' ... category: 'yyy' ... optimizedAt?: 'zzz'
sku_pattern = re.compile(
    r"slug:\s*['\"]([^'\"]+)['\"][^{]*?\{[^}]*?category:\s*['\"]([^'\"]+)['\"](.*?)\}\s*\}",
    re.DOTALL
)

# 简化版: 用 split + 块
# 实际: 每个 SKU 是 { ... } 块, 找 slug + 后续块
# 找所有 slug: 出现位置 + 后续 800 chars 是否含 optimizedAt
slugs = re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", products_ts)
print(f'Total slug occurrences: {len(slugs)}')
print(f'Unique: {len(set(slugs))}')

# 找每个 slug 后到下一个 slug 之间的内容
sku_blocks = re.split(r"(?=^\s*slug:\s*['\"])", products_ts, flags=re.MULTILINE)
print(f'SKU blocks: {len(sku_blocks)}')

# 提取每块的 category + 是否有 optimizedAt
sku_data = []
for block in sku_blocks[1:]:  # skip header
    slug_m = re.match(r"\s*slug:\s*['\"]([^'\"]+)['\"]", block)
    if not slug_m:
        continue
    slug = slug_m.group(1)
    cat_m = re.search(r"category:\s*['\"]([^'\"]+)['\"]", block)
    category = cat_m.group(1) if cat_m else 'unknown'
    opt_m = re.search(r"optimizedAt:\s*['\"]([^'\"]+)['\"]", block)
    opt = opt_m.group(1) if opt_m else None
    round_m = re.search(r"optimizationRound:\s*(\d+)", block)
    rnd = round_m.group(1) if round_m else 0
    sku_data.append({'slug': slug, 'category': category, 'optimizedAt': opt, 'round': int(rnd)})

# P0 SKU 列表
P0 = ['stickers', 'flyers', 'packaging', 'paper-bags']
print(f'\n=== P0 SKU 总数 ===')
p0_all = [s for s in sku_data if s['category'] in P0]
print(f'P0 total: {len(p0_all)}')
print(f'P0 optimized: {len([s for s in p0_all if s["optimizedAt"]])}')
print(f'P0 not optimized: {len([s for s in p0_all if not s["optimizedAt"]])}')

# 未优化的 P0 SKU
unopt_p0 = [s for s in p0_all if not s['optimizedAt']]
print(f'\n=== P0 未优化 SKU (前 25 个) ===')
for s in unopt_p0[:25]:
    print(f'  - {s["slug"]} ({s["category"]})')

# 已优化的 P0 SKU
opt_p0 = [s for s in p0_all if s['optimizedAt']]
print(f'\n=== P0 已优化 SKU ({len(opt_p0)} 个, 前 15) ===')
for s in opt_p0[:15]:
    print(f'  - {s["slug"]} ({s["category"]}) R{s["round"]} @ {s["optimizedAt"]}')

# 全 P0 category 分布
print(f'\n=== P0 category 分布 ===')
cat_count = defaultdict(lambda: {'total': 0, 'opt': 0})
for s in p0_all:
    cat_count[s['category']]['total'] += 1
    if s['optimizedAt']:
        cat_count[s['category']]['opt'] += 1
for c, d in sorted(cat_count.items()):
    print(f'  {c}: {d["opt"]}/{d["total"]} optimized')

# matrix.json 检查 covered[]
with open(r'F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

queue = matrix.get('queue', [])
print(f'\n=== matrix queue ({len(queue)} entries) ===')
status_count = defaultdict(int)
for q in queue:
    status_count[q.get('status', 'pending')] += 1
print(f'  status: {dict(status_count)}')

covered = matrix.get('covered', [])
print(f'  covered[]: {len(covered)} entries')

# pending 状态但 slug 已在 blog-posts.ts 的
with open(r'F:\zprintpro-nextjs\src\data\blog-posts.ts', 'r', encoding='utf-8') as f:
    blog_ts = f.read()
blog_slugs = set(re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", blog_ts))
print(f'\n  blog-posts.ts slugs: {len(blog_slugs)}')

# 找 pending 状态且不在 blog-posts.ts 的 (真正待写)
truly_pending = []
for q in queue:
    if q.get('status') != 'pending':
        continue
    if q['slug'] in blog_slugs:
        continue
    truly_pending.append(q)
print(f'\n=== 真正 pending (matrix status=pending + blog-posts.ts 还没) ({len(truly_pending)} 个) ===')
for q in truly_pending[:20]:
    print(f'  {q["id"]} | {q["slug"]} | {q["category"]}/{q["industry"]} | P{q["priority"]} | boost {q.get("priority_boost", 0)}')
