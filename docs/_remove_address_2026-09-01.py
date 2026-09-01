#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 18:50 拍板硬规则: zh-hk 语言不出现
"深圳市彩龍印刷包裝有限公司" + "深圳市龍崗區平湖街道嘉城路 1 號"
仅修 zh-hk (en/ja 留待 K3 后续拍板)
"""
import json

PATH = r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json"
SLUG = "restaurant-menu-printing-guide"

with open(PATH, encoding="utf-8") as f:
    data = json.load(f)

c = data[SLUG]["content"]
old = c

# 移除 " / 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號"
# 包含在 callout 段: "唯一聯繫號 +86 198 8085 1334 / wa.me/8619880851334 / zprintpro@outlook.com / 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號"
target_old = " / 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號"
target_new = ""  # 移除

if target_old in c:
    c = c.replace(target_old, target_new, 1)
    print(f"  zh-hk: 移除 \"{target_old}\"")
else:
    print(f"  zh-hk: target_old NOT FOUND")

# 也检查单独的 "深圳市彩龍印刷包裝有限公司" 和 "深圳市龍崗區平湖街道嘉城路 1 號"
for kw in ["深圳市彩龍印刷包裝有限公司", "深圳市龍崗區平湖街道嘉城路 1 號", "龍崗區平湖街道嘉城路 1 號"]:
    n = c.count(kw)
    if n > 0:
        c = c.replace(kw, "", 1)
        print(f"  zh-hk: 移除 \"{kw}\" (剩余)")

# 验证
for kw in ["深圳市彩龍印刷包裝有限公司", "深圳市龍崗區平湖街道嘉城路 1 號", "平湖街道", "彩龍印刷", "深圳"]:
    n = c.count(kw)
    if n > 0:
        print(f"  WARN: zh-hk 仍有 \"{kw}\" {n} 次")
    else:
        print(f"  PASS: zh-hk \"{kw}\" 0 次")

# 写回
data[SLUG]["content"] = c
with open(PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 末尾 LF
with open(PATH, "rb") as fp:
    d = fp.read()
d = d.rstrip(b"\r\n") + b"\n"
with open(PATH, "wb") as fp:
    fp.write(d)

print(f"\n=== 改后 ===")
print(f"  old chars: {len(old)}")
print(f"  new chars: {len(c)}")
print(f"  diff: {len(c) - len(old)} chars (should be -42 chars ~ company + address)")
