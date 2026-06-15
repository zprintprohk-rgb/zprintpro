#!/usr/bin/env python3
import re
from pathlib import Path
prod = Path("F:/zprintpro-nextjs/src/data/products.ts").read_text(encoding="utf-8")
# 找一个产品块看完整结构
m = re.search(r"slug:\s*'premium-business-cards'\s*,\s*", prod)
if m:
    start = m.start()
    end = prod.find("\n  },\n", start)
    if end == -1:
        end = start + 2500
    block = prod[start:end+5]
    with open('C:/Users/Administrator/AppData/Local/Temp/prod_block.txt', 'w', encoding='utf-8') as f:
        f.write(block)
    print(f"块长度: {len(block)}")
print("OK")
