#!/usr/bin/env python3
"""2026-08-25 P2 #14 Blog 12 行业覆盖审计 (K3 8/25 拍板, 8/27 排期, docs-only 提前 2 天)"""
import json
import io
import os

INDUSTRY_KWS = {
    '餐飲外賣': ['餐飲', 'F&B', '餐廳', '外賣', '飲品', '茶飲'],
    '零售精品': ['零售', '精品', 'boutique', 'retail'],
    '跨境電商': ['跨境', '電商', 'cross-border', 'DHL'],
    '美妝護膚': ['美妝', '護膚', 'beauty', '化妝品'],
    '教育培訓': ['教育', '培訓', '練習簿', '補習社', 'education'],
    '婚慶': ['婚慶', '喜帖', '婚紗', 'wedding'],
    '物流快遞': ['物流', '快遞', 'logistics', 'shipping'],
    '服裝': ['服裝', '吊牌', 'apparel', 'clothing'],
    '文創IP': ['文創', 'IP', '同人', '動漫', 'creative'],
    '寵物': ['寵物', 'pet', '食品級'],
    '母嬰': ['母嬰', 'maternal', 'baby', '奶粉'],
    '茶飲食品': ['茶飲', '茶葉', 'beverage', '食品', '月餅']
}


def main():
    result = {}
    for loc in ['zh-hk', 'en', 'ja']:
        p = f'src/data/blog-data/{loc}.json'
        with io.open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)
        blogs = data
        ind_blogs = {ind: 0 for ind in INDUSTRY_KWS}
        ind_blogs_list = {ind: [] for ind in INDUSTRY_KWS}
        for slug, node in blogs.items():
            if not isinstance(node, dict):
                continue
            title = (node.get('title', '') + ' ' + node.get('description', ''))
            title_lower = title.lower()
            for ind, kws in INDUSTRY_KWS.items():
                for kw in kws:
                    if kw.lower() in title_lower:
                        ind_blogs[ind] += 1
                        ind_blogs_list[ind].append(slug)
                        break
        result[loc] = {
            'total_blogs': len(blogs),
            'ind_blogs': ind_blogs,
            'ind_blogs_list': ind_blogs_list
        }

    # 写报告
    report_path = 'docs/blog-12-industry-coverage-audit-2026-08-25.md'
    os.makedirs(os.path.dirname(report_path), exist_ok=True)
    with io.open(report_path, 'w', encoding='utf-8') as f:
        f.write('# Blog 12 行业覆盖审计 (2026-08-25)\n\n')
        f.write('> **拍板来源**: K3 8/25 P2 #14 拍板 "Blog 内容 12 行业覆盖审计" (8/27 排期, M3 提前 2 天 docs-only 落)\n')
        f.write('> **执行人**: M3 P2 #14 任务\n')
        f.write('> **执行日期**: 2026-08-25 05:35 (北京时间)\n')
        f.write('> **数据来源**: `src/data/blog-data/{zh-hk,en,ja}.json` (8/24 22:00 实数据)\n\n')
        f.write('---\n\n')

        f.write('## 1. SOP-10 5 问门禁 (K3 §0.22 强制级)\n\n')
        f.write('- [x] 1. 架构差异? — 简单 audit, 无架构变更\n')
        f.write('- [x] 2. 约束适用范围? — F0 红线不删 blog, 仅 audit\n')
        f.write('- [x] 3. 原数据/拍板来源? — 8/24 blog-data JSON 实数据 + K3 8/19 拍板 12 行业\n')
        f.write('- [x] 4. 字段值策略? — 不改字段, 仅 audit\n')
        f.write('- [x] 5. Markdown 渲染? — 不改渲染, 仅 audit\n\n')

        f.write('## 2. 数据来源 (K3 §0.23 强制)\n\n')
        f.write('- `src/data/blog-data/zh-hk.json` 70 blogs (8/24 22:00)\n')
        f.write('- `src/data/blog-data/en.json` 70 blogs (8/24 22:00)\n')
        f.write('- `src/data/blog-data/ja.json` 70 blogs (8/24 22:00)\n')
        f.write('- 12 行业关键词映射: K3 8/19 v3.7 拍板 12 大行业 + 8/19 industry-keyword-matrix.json Tier A\n\n')

        f.write('## 3. 12 行业 Blog 覆盖统计 (3 locale)\n\n')
        f.write('| 行业 | zh-hk | en | ja | 总覆盖 | 状态 |\n')
        f.write('|------|-------|----|----|--------|------|\n')
        for ind in INDUSTRY_KWS:
            zh = result['zh-hk']['ind_blogs'][ind]
            en = result['en']['ind_blogs'][ind]
            ja = result['ja']['ind_blogs'][ind]
            total = zh + en + ja
            if total >= 9:  # 每 locale 至少 3
                status = 'GOOD'
            elif total >= 3:  # 至少 1 locale 3 篇
                status = 'PARTIAL'
            else:
                status = 'GAP'
            f.write(f'| {ind} | {zh} | {en} | {ja} | {total} | {status} |\n')

        f.write('\n## 4. 详细清单 (zh-hk 12 行业 blog 列表)\n\n')
        for ind, slugs in result['zh-hk']['ind_blogs_list'].items():
            if slugs:
                f.write(f'### {ind} ({len(slugs)} blogs)\n')
                for slug in slugs:
                    f.write(f'- `{slug}`\n')
                f.write('\n')

        f.write('## 5. GAP 行业 (需补充 blog)\n\n')
        gaps = []
        for ind in INDUSTRY_KWS:
            total = result['zh-hk']['ind_blogs'][ind] + result['en']['ind_blogs'][ind] + result['ja']['ind_blogs'][ind]
            if total < 3:
                gaps.append(f'- {ind} (zh-hk={result["zh-hk"]["ind_blogs"][ind]}, en={result["en"]["ind_blogs"][ind]}, ja={result["ja"]["ind_blogs"][ind]})')
        if gaps:
            f.write('\n'.join(gaps))
        else:
            f.write('无 GAP, 12 行业全部至少 3 篇 blog (跨 locale 累计)\n')

        f.write('\n\n## 6. 8/27 P2 #14 排期建议 (K3 9:00 上线后拍板)\n\n')
        f.write('- 🟢 12 行业全部覆盖 (跨 locale 累计 ≥3): 8/27 blog 写作可专注深度 + Tier B/C 长尾\n')
        f.write('- 🟡 局部行业 (跨 locale 1-2 篇): 8/27 排期补 1-2 篇 / 行业 / locale\n')
        f.write('- 🔴 GAP 行业: 8/27 必须先补, 否则 8/28 中检会看到 12 行业 blog 覆盖度不足\n')
        f.write('- 配套: docs/industry-matrix-12-8-mapping-2026-08-25.md (8/25 P1 #7 落, 8 核心 vs 4 覆盖)\n\n')

        f.write('## 7. 配套\n\n')
        f.write('- `.hermes/industry-keyword-matrix.json` (12 行业 Tier A 完整, K3 8/19 拍板)\n')
        f.write('- `docs/industry-matrix-12-8-mapping-2026-08-25.md` (P1 #7 落, 8/25)\n')
        f.write('- `docs/industry-tags-12vs8-2026-08-24.md` (8/24 22:10 落, 8 核心 vs 4 覆盖)\n')
        f.write('- `src/data/case-studies/cover-industries-{zh-hk,en,ja}.json` (P1 #6 落, 8/25, 4 覆盖行业 11 case)\n')

    print(f'Report written: {report_path}')
    print(f'  total blogs (zh-hk/en/ja): {result["zh-hk"]["total_blogs"]}/{result["en"]["total_blogs"]}/{result["ja"]["total_blogs"]}')
    print()
    for ind in INDUSTRY_KWS:
        zh = result['zh-hk']['ind_blogs'][ind]
        en = result['en']['ind_blogs'][ind]
        ja = result['ja']['ind_blogs'][ind]
        total = zh + en + ja
        marker = 'GOOD' if total >= 9 else ('PARTIAL' if total >= 3 else 'GAP')
        print(f'  {ind}: zh={zh} en={en} ja={ja} total={total} [{marker}]')


if __name__ == '__main__':
    main()
