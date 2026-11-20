#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
8/9 补跑 v2: ja FAQ H3 化 (v1 有 bug A1: 重复)
当前 ja FAQ 状态: 4 个 <h3>Q: ...</h3> + 4 个 <p><strong>A1:</strong>A1: 米国...</p>
目标: <h3>Q1：...</h3> + <p><strong>A1：</strong> 米国...</p> (无重复)
"""
import json
import re

SLUG = "baby-product-label-sticker-printing-guide"
path = r"F:\zprintpro-nextjs\src\data\blog-data\ja.json"

with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
content = data[SLUG]["content"]

# 匹配 4 个 <h3>Q: ...</h3> + <p><strong>A1:</strong>A1: ...</p> 块
# 替换为 <h3>Q1: ...</h3> + <p><strong>A1：</strong> 正文...</p>
h3_pattern = re.compile(
    r'<h3 class="text-lg font-bold text-\[#333333\] mt-4 mb-2">Q: ([^<]+)</h3>'
    r'<p class="text-base text-\[#444444\] leading-relaxed mb-4">'
    r"<strong>A\d+：</strong>A\d+： (.*?)</p>",
    re.DOTALL,
)

TEXT_DARK = "#333333"
TEXT_PARA = "#444444"
matches = list(h3_pattern.finditer(content))
print(f"found {len(matches)} FAQ blocks (regex match h3 + p)")

# 用 list 倒序 replace,避免 index 错位
new_content = content
for m in reversed(matches):
    q_text = m.group(1).strip()
    a_text = m.group(2).strip()
    k = len(matches) - list(matches).index(m)  # 1-4
    new_block = (
        f'<h3 class="text-lg font-bold text-[{TEXT_DARK}] mt-4 mb-2">'
        f"Q{k}：{q_text}</h3>"
        f'<p class="text-base text-[{TEXT_PARA}] leading-relaxed mb-4">'
        f"<strong>A{k}：</strong> {a_text}</p>"
    )
    new_content = new_content[: m.start()] + new_block + new_content[m.end() :]

if new_content != content:
    data[SLUG]["content"] = new_content
    print(
        f"ja FAQ H3 v2 升级: chars {len(content)} -> {len(new_content)} "
        f"(delta {len(new_content) - len(content)})"
    )
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("wrote")
else:
    print("no change")
