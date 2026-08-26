import re, sys
sys.stdout = sys.stdout

content = open("src/data/products.ts", encoding="utf-8").read()

# 找 paper-bags 第一个对象 (前后 1500 字符)
idx = content.find("slug: 'paper-bags'")
if idx > 0:
  # 找对象开始 ({
  # 找前一个 {
  obj_start = content.rfind("{", 0, idx)
  obj_end = content.find("}", idx)
  if obj_start > 0 and obj_end > 0:
    obj_str = content[obj_start:obj_end+1]
    print(f"=== paper-bags 第一个对象 ({len(obj_str)} 字符) ===")
    print(obj_str[:2000])

# 看 products 是哪一行导出
print("\n=== products export 头 ===")
for i, line in enumerate(content.split("\n")[:50]):
  if "export const products" in line or "export const Product" in line:
    print(f"  L{i+1}: {line}")

# 找 products 数组 (类型 + 第 1 项)
m = re.search(r"export const products: Product\[\] = (\[[\s\S]*?\];)", content)
if m:
  # 找 products 数组的 [
  arr_start = m.start(1)
  # 找 ]
  arr_end = m.end(1)
  arr_str = content[arr_start:arr_end]
  # 找第一个 slug
  first_slug = re.search(r"slug:\s*[\'\"]([^\'\"]+)[\'\"]", arr_str)
  if first_slug:
    print(f"\n=== products 数组第一个 slug: {first_slug.group(1)} ===")