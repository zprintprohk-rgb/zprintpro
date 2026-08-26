import re, sys
sys.stdout = sys.stdout

content = open("src/data/products.ts", encoding="utf-8").read()

# 找 paper-bags 简化对象
m = re.search(r"\{\s*slug:\s*[\'\"]paper-bags[\'\"][^}]*\}", content)
if m:
    print("=== paper-bags 简化对象 (4 字段) ===")
    print(m.group(0))
    print()

# 找 kraft-paper-bags 完整对象
m2 = re.search(r"\{\s*slug:\s*[\'\"]kraft-paper-bags[\'\"][^}]*\}[^}]*\}", content)
if m2:
    print("=== kraft-paper-bags 完整对象 ===")
    print(m2.group(0)[:1500])
    print()

# 找 stickers 简化对象
m3 = re.search(r"\{\s*slug:\s*[\'\"]stickers[\'\"][^}]*\}", content)
if m3:
    print("=== stickers 简化对象 (4 字段) ===")
    print(m3.group(0))

# 找 die-cut-stickers 完整对象
m4 = re.search(r"\{\s*slug:\s*[\'\"]die-cut-stickers[\'\"][^}]*\}[^}]*\}", content)
if m4:
    print("\n=== die-cut-stickers 完整对象 (前 1500 字符) ===")
    print(m4.group(0)[:1500])