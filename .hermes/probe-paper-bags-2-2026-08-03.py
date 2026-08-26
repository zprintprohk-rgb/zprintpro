import re, sys
sys.stdout = sys.stdout

content = open("src/data/products.ts", encoding="utf-8").read()

# 找 paper-bags 第一个出现
idx = content.find("slug: 'paper-bags'")
if idx > 0:
  # 找前后 200 字符
  start = max(0, idx - 300)
  end = min(len(content), idx + 500)
  print("=== paper-bags 第一个匹配 (前后 800 字符) ===")
  print(content[start:end])