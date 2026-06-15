#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
清理 v1 残留: zh-hk seo 块内有 2 个 h1 字段的, 删掉前一个(空字符串)
"""
import re
from pathlib import Path
SEO_FILE = Path("F:/zprintpro-nextjs/src/data/sku-seo-data.ts")
src = SEO_FILE.read_text(encoding="utf-8")
new_src = src

# 找所有 zh-hk seo 块, 看是否有 2 个 h1
# zh-hk 块: "zh-hk": { ... "en":
# 块内可能 h1 重复, 删除第一个 "h1": "...",  (或多个 h1 中保留最后一个,删除前面的)
# 用 re.finditer 找所有 h1 在 zh-hk 块内

# 简化: 找 zh-hk 块, 抓所有 h1, 只保留最后一个
zh_hk_blocks = re.finditer(r'"zh-hk"\s*:\s*\{', new_src)
removed = 0
# 倒序处理避免位置偏移
matches = list(re.finditer(r'"zh-hk"\s*:\s*\{', new_src))
for m in reversed(matches):
    # zh-hk 块起点
    start = m.end()
    # zh-hk 块结束: 找 "en":
    # 找最近的 "en":
    en_m = re.search(r'"\s*en\s*"\s*:\s*\{', new_src[start:start+5000])
    if not en_m:
        continue
    end = start + en_m.start()
    block = new_src[start:end]
    # 找所有 h1
    h1s = list(re.finditer(r'"h1"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?', block))
    if len(h1s) > 1:
        # 保留最后一个, 删前面的
        # 从前往后删
        block_new = block
        for h in h1s[:-1]:
            # 删 h1 行 (含前面空白)
            line_start = block_new.rfind('\n', 0, h.start()) + 1
            line_end = h.end()
            # 检查 line_end 后是否换行
            if line_end < len(block_new) and block_new[line_end] == '\n':
                line_end += 1
            elif block_new[line_end:line_end+2] == '\r\n':
                line_end += 2
            block_new = block_new[:line_start] + block_new[line_end:]
            removed += 1
        # 替换
        new_src = new_src[:start] + block_new + new_src[end:]

SEO_FILE.write_text(new_src, encoding="utf-8")
print(f"删除重复 h1 行: {removed}")
print(f"字节: {len(src):,} -> {len(new_src):,} (delta {len(new_src)-len(src):+,})")
