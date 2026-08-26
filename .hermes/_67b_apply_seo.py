#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
B 19 词攒批 6 slug 改写实施脚本 (line-based).
不 commit, 不 push, 仅 diff 落盘 → 等 K3 拍板 22 词具体清单 + 实施节奏.
"""
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs'
SEO = os.path.join(ROOT, 'src', 'lib', 'seo.ts')
DIFF_JSON = os.path.join(ROOT, '.hermes', '_67b_22_seo_diff.json')
DIFF_APPLIED = os.path.join(ROOT, '.hermes', '_67b_22_seo_diff_applied.txt')


def find_slug_block(lines, slug):
    """找 'slug': { 起始行 + 块结束行 (匹配的 }). 返回 (start, end) 行号 (0-indexed).
    支持 0/2 空格前导 (posters 段异常, 无前导空格).
    """
    import re
    # 匹配可选前导空格 + 'slug': {
    pat = re.compile(rf"^(\s*)'{re.escape(slug)}': \{{")
    start = None
    for i, line in enumerate(lines):
        if pat.search(line):
            start = i
            break
    if start is None:
        return None, None
    # 块结束: 找 start 之后的 }, 行 (同 indent 深度)
    # 块起始 indent
    m = pat.search(lines[start])
    base_indent = len(m.group(1))
    end_indent = ' ' * base_indent + '},'
    end_indent2 = ' ' * base_indent + '}'
    for j in range(start + 1, len(lines)):
        line = lines[j].rstrip('\n')
        if line == end_indent or (line == end_indent2 and not line.endswith(',}')):
            return start, j
    return start, None


def find_segment(lines, start, end, segment_name):
    """在 slug 块 [start, end] 内找 'segment_name: {' 行 + 结束行."""
    seg_start = None
    for i in range(start + 1, end):
        line = lines[i]
        # 找 '  segment_name: {' 模式 (4 空格 indent)
        if line.strip() == f'{segment_name}: {{' or line.startswith(f'    {segment_name}: {{'):
            seg_start = i
            break
    if seg_start is None:
        return None, None
    # segment 结束: 找 '    },' 行 (4 空格 indent)
    for j in range(seg_start + 1, end):
        line = lines[j]
        if line.strip() == '},':
            return seg_start, j
    return seg_start, None


def replace_segment(lines, seg_start, seg_end, new_content_dict):
    """替换 segment 内的 3 个 locale 行 (zh-hk/en/ja).
    原格式兼容: zh-hk 行有引号 'zh-hk':, en/ja 行无引号 en: / ja: (per 7481e51 SOP).
    改后统一用带引号格式.
    """
    new_lines = list(lines)
    for locale in ['zh-hk', 'en', 'ja']:
        new_value = new_content_dict[locale]
        replaced = False
        for i in range(seg_start + 1, seg_end):
            line = new_lines[i]
            stripped = line.strip()
            # 匹配带引号 (zh-hk 风格): 'locale':
            # 或不带引号 (en/ja 风格): locale:
            if (stripped.startswith(f"'{locale}':") or
                (locale != 'zh-hk' and stripped.startswith(f"{locale}:"))):
                # 整行替换
                indent = '      '
                new_lines[i] = f"{indent}'{locale}': '{new_value}',\n"
                replaced = True
                break
        if not replaced:
            print(f'    ⚠ {locale} 行未在 [{seg_start+1}, {seg_end}] 找到')
    return new_lines


def main():
    with open(SEO, 'r', encoding='utf-8') as f:
        content = f.read()
    lines = content.splitlines(keepends=True)
    with open(DIFF_JSON, encoding='utf-8') as f:
        diffs = json.load(f)

    log = []
    total_replaced = 0
    for d in diffs:
        slug = d['slug']
        start, end = find_slug_block(lines, slug)
        if start is None:
            log.append(f'  ⚠ {slug} : slug 段未找到')
            continue
        if end is None:
            log.append(f'  ⚠ {slug} : slug 段结束未找到')
            continue
        # 找 3 子段
        s_ok = True
        for seg, data_key in [('titles', 'titles'), ('keywords', 'keywords'), ('descriptions', 'descriptions')]:
            seg_start, seg_end = find_segment(lines, start, end, seg)
            if seg_start is None:
                log.append(f'  ⚠ {slug}.{seg} : 子段未找到')
                s_ok = False
                break
            lines = replace_segment(lines, seg_start, seg_end, d[data_key])
            total_replaced += 1
        if s_ok:
            log.append(f'  ✓ {slug} : 3/3 段替换 OK ({start+1}-{end+1})')

    # 写回
    new_content = ''.join(lines)
    with open(SEO, 'w', encoding='utf-8') as f:
        f.write(new_content)
    log.append(f'\n✓ 写回 {SEO}, 总 {total_replaced} 段替换')
    log.append(f'  字节数: {len(new_content):,}')

    with open(DIFF_APPLIED, 'w', encoding='utf-8') as f:
        f.write('\n'.join(log))
        f.write('\n\n注: 攒批不 push, 等 K3 拍板 22 词具体清单 + 实施节奏.\n')
    print('\n'.join(log))


if __name__ == '__main__':
    main()
