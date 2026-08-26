"""盘点 products.ts: 网站中哪些 SKU 缺图 + V26.0 99 SKU 缺图交集 = 生图目标"""
import re
from pathlib import Path
from collections import defaultdict

text = Path(r'F:\zprintpro-nextjs\src\data\products.ts').read_text(encoding='utf-8')

# 找所有产品对象的 sku_code 字段
sku_codes = re.findall(r'sku_code:\s*["\']([A-Z]+-\d+)["\']', text)
print(f'Total SKU codes in products.ts: {len(sku_codes)}')
print(f'Unique SKU codes: {len(set(sku_codes))}')

# 找所有 products 的 images 字段
# 用平衡括号匹配找 images: [...] 内容
products = re.split(r'sku_code:\s*["\']([A-Z]+-\d+)["\']', text)
# products[0] = 头, products[1] = 第一个 sku, products[2] = sku 1 后面内容, products[3] = sku 2, ...
sku_data = {}
for i in range(1, len(products), 2):
    sku = products[i]
    chunk = products[i + 1] if i + 1 < len(products) else ''
    # 在 chunk 里找 images: [ ... ] 平衡括号
    m = re.search(r'images:\s*\[', chunk)
    if m:
        start = m.end()
        depth = 1
        pos = start
        while pos < len(chunk) and depth > 0:
            if chunk[pos] == '[':
                depth += 1
            elif chunk[pos] == ']':
                depth -= 1
            pos += 1
        array_content = chunk[start:pos - 1]
        imgs = re.findall(r'["\']([^"\']*\.(?:webp|png|jpg|jpeg))["\']', array_content)
        sku_data[sku] = imgs

# 统计
skus_with_images = {s for s, imgs in sku_data.items() if imgs}
skus_without_images = {s for s, imgs in sku_data.items() if not imgs}
print(f'Products with images: {len(skus_with_images)}')
print(f'Products WITHOUT images: {len(skus_without_images)}')
print(f'Total image refs: {sum(len(v) for v in sku_data.values())}')

# 5 SKU 测试集
five_skus = {'BC-001', 'DJ-001', 'PB-001', 'PK-002', 'RP-001'}
print()
print('=== 5 SKU 测试集在网站中的状态 ===')
for sku in sorted(five_skus):
    if sku in sku_data:
        imgs = sku_data[sku]
        preview = imgs[:3]
        more = '...' if len(imgs) > 3 else ''
        print(f'  {sku}: {len(imgs)} 张图 — {preview}{more}')
    else:
        print(f'  {sku}: NOT in products.ts')

# V26.0 99 SKU 全集
v26_skus = set()
v26_text = Path(r'F:\电商生图提示词重要\V26.0_EN_full_99sku_4views.txt').read_text(encoding='utf-8')
for m in re.finditer(r'^### ([A-Z]+-\d+)', v26_text, re.MULTILINE):
    v26_skus.add(m.group(1))
print(f'\nV26.0 99 SKU 全集: {len(v26_skus)}')

# V26.0 99 SKU 全部（用 set 排序输出）
print(f'  {sorted(v26_skus)}')

# 网站缺图 (products.ts 中无图的 SKU)
print(f'\n=== 网站中缺图的 SKU ({len(skus_without_images)} 个) ===')
print(f'  {sorted(skus_without_images)}')

# V26.0 99 SKU ∩ 网站缺图 = 用户真实目标
need_gen = v26_skus & skus_without_images
print(f'\n========================================')
print(f'用户真实生图目标: V26.0 ∩ 网站缺图 = {len(need_gen)} 个')
print(f'========================================')
print(f'  {sorted(need_gen)}')

# 按类目分组
print()
print('=== 按类目分组 (用户真实目标) ===')
by_prefix = defaultdict(list)
for sku in sorted(need_gen):
    prefix = sku.split('-')[0]
    by_prefix[prefix].append(sku)
for prefix, skus in sorted(by_prefix.items()):
    print(f'  {prefix}: {len(skus)} 个 → {skus}')

# 成本估算
total_imgs = len(need_gen) * 12  # 4 view × 3 lang
cost = total_imgs * 0.3
print(f'\n=== 成本估算 ===')
print(f'  生成图数: {len(need_gen)} SKU × 4 view × 3 lang = {total_imgs} 张')
print(f'  成本: {total_imgs} × 0.3 元 = {cost:.1f} 元')
print(f'  时间: 约 {total_imgs * 3 // 60}-{total_imgs * 5 // 60} 分钟 (按 3-5 秒/张)')

# V26.0 99 SKU ∩ 网站有图 (已经在网站有图, 跳过)
already_have = v26_skus & skus_with_images
print(f'\n=== V26.0 99 SKU ∩ 网站有图 = 已有图, 跳过 ({len(already_have)} 个) ===')
print(f'  {sorted(already_have)}')
