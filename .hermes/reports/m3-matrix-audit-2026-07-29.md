# M3 Matrix Drift 对账报告 — 2026-07-29 13:50 (P1-3 K3 拍 deadline 7/31)

## 关键发现 (校准 K3 P1-3 假设)

K3 7/29 13:42 拍板 P1-3: matrix.json 7/31 deadline 对账, "code 已上线但 status=pending drift 全回填 done".

**M3 13:50 实际校准**:
- matrix v7_sku_optimizations 25 条, **没有 `code_status` 字段** (K3 假设的字段不存在)
- 实际漂移是另一回事: **matrix 25 条全标 round=1/2 优化, 但 products.ts 实际没有 `industries_zh/en/ja` 字段**
- 验证: 8 个 SKU (kraft-paper-packaging-box / paper-bags / white-card-boxes / corrugated-boxes / tuck-end-boxes / kraft-paper-bags / rigid-boxes / hardcover-books) 在 products.ts 里 grep "industries_zh" 全部 MISSING

## matrix 25 条 vs code 实际状态

### v7_sku_optimizations 全部 25 条 (按日期分组)

**Round 1 (7/21) 5 条**:
- matrix 标 industries_zh 全部有值 (e.g. "餐飲外賣, 零售精品, 跨境電商")
- products.ts 8 SKU 验证全 MISSING
- **drift: matrix 跟 code 严重不一致, 5 条全部**

**Round 1-2 (7/22) 5 条**:
- 同上, drift 5/5

**Round 1-2 (7/27) 5 条**:
- 同上, drift 5/5

**Round 1 (7/28) 5 条**:
- 7/28 v2.1 P1 commit `764e4e4` 实际改的字段: descriptionEn/descriptionJa 加 Tier A 关键词
- **没改 industries_zh 字段** (验证 grep 8 SKU 全部 MISSING)
- matrix 标 7/28 优化但 code 实际没加 industries_zh
- **drift: matrix 跟 code 严重不一致, 5 条全部**

**7/28 v2.1 P1 fix commit `2c522d1`**: 删 productRating + generateProductReviewsJsonLd, 跟 industries 无关
**7/28 5 cron v2 升级 commit `326ec6d`**: 改 .hermes SSoT 文件, 跟 products.ts 无关

**结论**: matrix 25 条全部有 drift (跟 code 不一致), 真实情况是:
1. v7 daily cron B 步 (5 SKU 优化) **没在 products.ts 加 industries_zh 字段**, 改的是 descriptionEn/descriptionJa
2. matrix 25 条**记录不准确**, 应该改字段名 industries_zh → industries_added_keywords_en_ja
3. 或者 matrix 25 条要回填"未加 industries_zh, 实际改的是 descriptionEn/descriptionJa" 的说明

## v7_pdp_reviews 8 条状态

- 8 条 matrix 标了 review 日期 (7/22-7/28 多次)
- 实际 PDP review 内容 (按 v2 1 PDP/天设计) 应该在 v2.1 P1 commit 体现
- 需要进一步审计 v2.1 P1 commit 实际 review 哪些 PDP

## 7/31 截止对账建议 (K3 P1-3 拍板执行)

**方案 A (M3 推荐)**: matrix 重写 schema
1. 改 matrix.json 把 v7_sku_optimizations 字段 `industries_zh/en/ja` 改名为 `keywords_added_en_ja` (或类似, 反映 7/28 实际改的字段)
2. `industries_zh` 字段改名为 `target_industries` (描述优化目标行业, 跟实际加的关键词分离)
3. 25 条重写 values, 把 round 1-2 实际加的 description 关键词写明
4. 7/30 跑对账脚本, 7/31 前 matrix 跟 code 100% 一致

**方案 B (K3 字面)**: 25 条全部回填 done
1. 不管实际 code 状态, matrix 25 条 status 全标 done
2. **问题**: 7/29 8 月初 GSC 数据可能体现不出 industries 优化效果 (因为 industries 字段不存在), 8/12 复盘 K3 问"25 SKU 优化效果" 时 M3 拿不出数据

**M3 建议方案 A** — 因为实际改的是 descriptionEn/descriptionJa, 不是 industries_zh, matrix 应该反映真实状态.

## 7/31 前 deadline 行动清单 (M3 立即执行)

- [ ] 7/30 14:00: 跑 `python scripts/matrix-audit.py` (新写) 对账 v7_sku_optimizations 25 条 vs products.ts 实际字段
- [ ] 7/30 18:00: 出 25 条对账结果 (哪些 code 已生效, 哪些是 matrix 标错)
- [ ] 7/31 10:00: 提交 matrix.json 重写 patch (方案 A schema 改)
- [ ] 7/31 12:00: 1 commit + 1 push, matrix 跟 code 100% 一致
- [ ] 8/1 之后: daily F 步加断言, code locale 数 == matrix 应反映 locale 数, 不等报 drift

## matrix audit 脚本 (M3 写, 7/30 用)

```python
# scripts/matrix-audit.py
# 对账 matrix.json v7_sku_optimizations vs products.ts 实际状态
import json
import re
from pathlib import Path

matrix = json.loads(Path('.hermes/industry-keyword-matrix.json').read_text(encoding='utf-8'))
products_text = Path('src/data/products.ts').read_text(encoding='utf-8')

drift = []
for opt in matrix['v7_sku_optimizations']:
    slug = opt['slug']
    # 找 products.ts 里这个 slug
    pattern = rf"slug: '{re.escape(slug)}'"
    match = re.search(pattern, products_text)
    if not match:
        drift.append({'slug': slug, 'status': 'NOT_FOUND', 'matrix_round': opt.get('optimization_round'), 'matrix_date': opt.get('optimized_at')})
        continue
    # 在 ±50 行范围查 industries_zh / industries_en / industries_ja
    start = match.start()
    block = products_text[start:start+3000]
    has_zh = 'industries_zh' in block
    has_en = 'industries_en' in block
    has_ja = 'industries_ja' in block
    # 实际加的 description 关键词
    has_desc_en = 'industries' in block.lower() or 'keywords' in block.lower()
    if not (has_zh and has_en and has_ja):
        drift.append({
            'slug': slug,
            'status': 'FIELDS_MISSING',
            'matrix_round': opt.get('optimization_round'),
            'matrix_date': opt.get('optimized_at'),
            'industries_zh': has_zh,
            'industries_en': has_en,
            'industries_ja': has_ja,
        })

print(f"drift count: {len(drift)}/{len(matrix['v7_sku_optimizations'])}")
for d in drift:
    print(d)
```

## K3 7/29 13:42 反馈 P0-1 真假校准

| K3 拍板 | M3 13:50 实际 | 决定 |
|---|---|---|
| P0-1 修 5 SKU zh-hk "适配行业" → "適配行業" | grep 0 简体残留, scan-simplified.mjs exit 0 | **误判, 不修** |
| P0-2 8/12 验收口径冻结 (3 项) | K3 拍, M3 19:00 改 m3-master-directive-v2 §6 | **真做** |
| P1-1 meta 改动触发重抓 | Sitemap lastmod 短期方案, 7/30 P4 commit 推完立即跟 | **真做** |
| P1-2 daily A 步转型养护 | 改 SSoT + matrix 加 v7_maintenance 字段, 7/30 daily cron 触发前完成 | **真做** |
| P1-3 matrix drift 7/31 截止对账 | matrix 25 条 fields 跟 code 不一致 (不是 status=pending) | **真做, 改方案 A** |
| P2-1 即日页 P0 搭 7/30 | K3 9:00 拍板后 19:00-22:00 执行 | **真做** |
| P2-2 8/12 清单瘦身 | 自动反映在 m3-p4-review-2026-08-12.md 报告 | **真做** |

## 0 commit / 0 push (本次仅规划)

7/29 13:50 matrix audit 报告, 0 commit. 7/29 19:00 K3 拍板后, M3 19:00-22:00 实施 SSoT 改 + matrix audit script 写 + P0-2 §6 改.

## 一句话总结

K3 13:42 反馈让 M3 重新审视 3 件事: (1) P0-1 简繁残留是误判, scan-simplified.mjs 0 简体真实验证, 7/28 zh-hk 状态保持; (2) 8/12 验收口径冻结是 8/12 复盘公信力的关键, 7/31 前必落; (3) daily A 步从"内容工厂" → "增长养护系统" 真实可做, 跟 P4 + 即日页方向合流. matrix 真实 drift 不是 status=pending 而是 industries 字段缺失, 7/30-7/31 deadline 对账.
