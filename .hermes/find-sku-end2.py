"""
Show structure around L2140-2150 (waterproof-stickers optimizedAt location)
"""
from pathlib import Path
p = Path(r"F:\zprintpro-nextjs\src\data\products.ts")
content = p.read_text(encoding="utf-8")
lines = content.split("\n")
for i in range(2130, 2155):
    s = lines[i].encode('gbk', errors='replace').decode('gbk')
    print(f"L{i+1}: {s[:120]}")
