# Phase B-P1-7 评分脚本修复报告

> **任务 ID**: P1-7（修评分脚本未识别 E04 AggregateRating）
> **修复日期**: 2026-06-12
> **Owner**: Mavis (orchestrator)
> **作用域**: 仅 `score_core_eeat.py` 评分逻辑（不动代码、不动 crawl）
> **依据**: Phase A2 §12.3 Limitations 第 1 条 "E04 AggregateRating 未解析"

---

## 1. 修复内容

### 1.1 根因

`score_core_eeat.py:214` 原代码:
```python
has_rating = False  # not parsed
```

`score_core_eeat.py:367` E04 评分:
```python
put("E04", FAIL, "aggregate_rating not parsed")
```

→ **E04 在 138 URL 上永远 FAIL**,因为 `has_rating` 永远 False。Phase A2 报告 §8.1 列 E04 全 138 fail 0% pass rate,跟代码层现实(79/79 产品页都有 `aggregateRating` 字段)严重不符。

### 1.2 修法

改 `score_core_eeat.py:213-230`,新增 `has_rating` / `has_review` 解析函数:

```python
# 2026-06-12 P1-7 修复: 真实解析 parsed-data.json 的 schemas 列表
# Phase A2 报告 Limitations §12.3 标 E04 全 138 fail 是因为本脚本没解析,
# 实际 79/79 产品页代码层已有 aggregateRating (见 src/lib/seo.ts:703-736)
has_rating = False
has_review = False
try:
    _schemas_list = p.get("schemas") or []
    for _s in _schemas_list:
        if not isinstance(_s, dict):
            continue
        if _s.get("@type") == "AggregateRating":
            has_rating = True
        if _s.get("@type") == "Product":
            if isinstance(_s.get("aggregateRating"), dict):
                has_rating = True
            _review = _s.get("review")
            if isinstance(_review, list) and len(_review) > 0:
                has_review = True
            elif isinstance(_review, dict):
                has_review = True
except Exception:
    pass
```

改 `score_core_eeat.py:367` E04 评分:

```python
# 之前
put("E04", FAIL, "aggregate_rating not parsed")

# 之后
put("E04", PASS if has_rating else (PARTIAL if has_review else FAIL),
    f"aggregateRating={has_rating}, review={has_review}")
```

**3 级评分**:
- `PASS (10)`: Product schema 有 `aggregateRating` dict 节点
- `PARTIAL (5)`: 没 aggregateRating 但有 review 数组
- `FAIL (0)`: 都没

---

## 2. 验证结果

### 2.1 评分重跑

```bash
$ cd F:\zprintpro-nextjs\docs\seo-audit-en
$ python score_core_eeat.py
```

### 2.2 分数变化对比

| 指标 | Phase A2 基线 (V1) | P1-7 修复后 (V2) | 增量 |
|------|---------------------|---------------------|------|
| **Overall (0-100)** | 43.5 | **43.8** | **+0.3** |
| **GEO Score (0-100)** | 53.1 | **53.6** | **+0.5** |
| **SEO Score (0-100)** | 34.0 | 34.0 | 0 (E04 不在 SEO 维度) |
| **E 维度 (0-100)** | 46.0 | **47.9** | **+1.9** |
| **E04 Pass 数** | 0/138 (0%) | 79/138 (57.2%) | **+79 页** |
| **E04 Partial 数** | 0/138 | 0/138 | 0 (没 review-only) |
| **E04 Fail 数** | 138/138 | 59/138 | -79 |

**E04 维度增量拆解**:
- 79 产品页 aggregateRating Pass: 79 × 10 = 790
- 59 其他页 (blog/category/etc) Fail: 59 × 0 = 0
- E04 均值 (0-10): 790 / 138 = 5.72
- E04 Pass 率: 79/138 = 57.2%

**整体影响 (E 维度 0-10 量表)**: 4.60 → 4.79 (+0.19),换算 0-100 是 +1.9 分

**整体 Overall 影响**: E 是 GEO 子维度 (GEO = C+O+R+E / 4),所以 GEO 增量 = +1.9/4 = +0.475 → 53.575 ≈ 53.6 (+0.5)
Overall = (GEO + SEO) / 2 = (53.6 + 34.0) / 2 = 43.8 (+0.3)

### 2.3 副作用验证

E04 之外的 79 个评分项**未受影响**。重跑前后 79 项分项完全一致:
- C01-C10: 全部不变
- O01-O10: 全部不变
- R01-R10: 全部不变 (R02/R06/R07/R08 仍 hard-coded FAIL,等下次修复)
- E01-E03, E05-E10: 全部不变 (E10 仍 hard-coded FAIL, 留给 Ept07 一起修)
- Exp01-Exp10: 全部不变
- Ept01-Ept10: 全部不变 (Ept07 仍 hard-coded FAIL)
- A01-A10: 全部 N/A
- T01-T10: T02/T04/T06/T08/T09 不变 (其他 5 项 N/A)

---

## 3. 与 Phase B-P0/P1 代码修复的对比

**P0/P1 代码修复** (Phase B + Phase B-P1 报告):
- 修了 5 P0 + 4 P1 项
- 真实代码改动 7 个文件
- Build 通过,grep 验证 14 处 schema 调用

**P1-7 评分脚本修复** (本报告):
- 修了 1 项评分逻辑
- 真实代码改动 1 个文件 (score_core_eeat.py) 共 20 行
- 重跑评分通过

**但 P0/P1 的代码修复效果,这次重跑评分看不到完整增量**,原因是:
- `parsed-data.json` 是 **2026-06-10 06:51 crawl** 的
- Phase B 代码修复是 **2026-06-10 11:22 之后** 提交的
- P1 代码修复是 **2026-06-12 10:25 之后** 提交的
- **没有重新 crawl + parse**,所以 P0/P1 代码修复的 meta description / schema 注入,在 parsed-data.json 里**还没有体现**

**正确的工作流**:
1. 代码修复 (P0+P1) ✓ 已完成
2. **重新 crawl + parse** (Phase C 触发: gsc_data.csv + seo-weekly-analyzer.py 之后, 或者手动 `python crawl_parse_en.py` 重新跑)
3. 评分 (score_core_eeat.py) ← 现在 P1-7 修完了, 这步能正确识别 E04
4. 报告 (build_summary.py)

---

## 4. 下一步建议

### 4.1 立即做 (1-2h)

1. **重新 crawl + parse**:
   ```bash
   cd F:\zprintpro-nextjs\docs\seo-audit-en
   # 检查 crawl 脚本是否可重跑
   python crawl_parse_en.py 2>&1 | tail -20
   ```
   - 预计 30-60min (138 URL × 几秒/URL)
   - 输出新 parsed-data.json,包含 P0/P1 修复后的真实 meta description / schema

2. **重新评分**:
   ```bash
   python score_core_eeat.py
   python build_summary.py
   ```
   - 预计看到 Overall 43.5 → 50+ 的大幅提升 (P0 修了 79 产品页中文泄漏 + 98 标题品牌重复 + 5 schema 新增 + P1-1 description 长度 + P1-4 5 page schema)

### 4.2 可选 (1h)

- 改 `score_core_eeat.py:399` E10 (resource download) 解析 — 用 word_count 启发式 (≥ 800 字符 + 含 "download" 关键词)
- 改 `score_core_eeat.py:436` Ept07 (glossary) 解析 — 用 word_count + 含 "glossary" / "術語" / "用語" 关键词

这两项 + 1h 工作量,可以让 Phase A2 §12.3 的 7 条 limitations 闭环 4 条 (E04/E10/Ept07 + crawl 时直接补 Ept07 内容),E 维度均值预计再 +3-5 分。

### 4.3 长期 (Phase C)

- 接 GSC + Ahrefs (解锁 Authority 10 项 N/A, A 维度从 0 → 实测分)
- 接 Trustpilot widget (解锁 T01/T03/T05/T07/T10, T 维度从 45.9 → 实测分)
- 扩写 25 个 stub blog (P1-5, 工作量最大 3 周)
- Phase C 监控 (gsc_data.csv + seo-weekly-analyzer.py 已就绪)

---

## 5. 文件位置

报告: `F:\zprintpro-nextjs\docs\phase-b-p1-7-scoring-fix-summary.md`
score_core_eeat.py: `F:\zprintpro-nextjs\docs\seo-audit-en\score_core_eeat.py` (+19 / -2 行)
core-eeat-scores.json: `F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-scores.json` (重生成)
core-eeat-summary.md: `F:\zprintpro-nextjs\docs\seo-audit-en\core-eeat-summary.md` (重生成)

---

**报告结束**

*P1-7 评分脚本 E04 修复完成 — 2026-06-12 by Mavis*
*下一步: 重新 crawl + parse 抓取 P0/P1 真实修复后状态 + 重评分看完整增量*
