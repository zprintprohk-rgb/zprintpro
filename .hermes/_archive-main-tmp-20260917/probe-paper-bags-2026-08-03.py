import re, sys, json, subprocess
sys.stdout = sys.stdout  # passthrough

content = open("src/data/products.ts", encoding="utf-8").read()

print("=== paper-bags 实际 slug ===")
m = re.search(r"slug:\s*[\'\"]([^\'\"]*)paper[-_]?bag[^\'\"]*[\'\"]", content)
if m: print(f"  found: {m.group(0)}")

# 找 products.ts 包含 "paper" 的所有 slug
print("\n=== products.ts 所有包含 paper 的 slug ===")
slugs = re.findall(r"slug:\s*[\'\"]([^\'\"]+)[\'\"]", content)
for s in slugs:
    if "paper" in s.lower() or "bag" in s.lower():
        print(f"  {s}")

print("\n=== products.ts 所有包含 custom 的 slug ===")
for s in slugs:
    if "custom" in s.lower():
        print(f"  {s}")

print("\n=== products.ts 所有包含 sticker 的 slug (前 20) ===")
sticker_slugs = [s for s in slugs if "sticker" in s.lower()]
for s in sticker_slugs[:20]:
    print(f"  {s}")
print(f"  total: {len(sticker_slugs)}")

# 找 page.tsx 路由配置
print("\n=== [locale]/product/[slug]/page.tsx 关键代码 (generateStaticParams / dynamicParams) ===")
import os
page_path = "src/app/[locale]/product/[slug]/page.tsx"
if os.path.exists(page_path):
  pc = open(page_path, encoding="utf-8").read()
  for keyword in ["generateStaticParams", "dynamicParams", "dynamic = ", "revalidate", "notFound"]:
    m = re.search(rf"{re.escape(keyword)}[^\n]{{0,200}}", pc)
    if m: print(f"  {keyword}: {m.group(0)[:180]}")
else:
  print(f"  no {page_path}")

# 查 matrix.json custom-stickers 实际场景
print("\n=== matrix.json custom-stickers 实际引用 ===")
mj = open(".hermes/industry-keyword-matrix.json", encoding="utf-8").read()
m = re.search(r"[^\n]*custom-stickers[^\n]*", mj)
if m:
  print(f"  hit: {m.group(0)[:200]}")
# 找所有 custom-sticker* 
hits = [m.start() for m in re.finditer(r"custom-sticker\w*", mj)]
for h in hits[:5]:
  print(f"  {mj[max(0,h-80):h+80]}")