"""按 V26.0 标准 (12 张 webp) 重新定义"网站缺图" - 排序生图优先级"""
import re
from pathlib import Path
from collections import defaultdict

text = Path(r'F:\zprintpro-nextjs\src\data\products.ts').read_text(encoding='utf-8')

# 找所有产品对象
sku_codes = re.findall(r'sku_code:\s*["\']([A-Z]+-\d+)["\']', text)
products = re.split(r'sku_code:\s*["\']([A-Z]+-\d+)["\']', text)
sku_data = {}
for i in range(1, len(products), 2):
    sku = products[i]
    chunk = products[i + 1] if i + 1 < len(products) else ''
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

# V26.0 99 SKU
v26_skus = set()
v26_text = Path(r'F:\电商生图提示词重要\V26.0_EN_full_99sku_4views.txt').read_text(encoding='utf-8')
for m in re.finditer(r'^### ([A-Z]+-\d+)', v26_text, re.MULTILINE):
    v26_skus.add(m.group(1))

# 排序: 图数从少到多
ranked = []
for sku in sorted(v26_skus):
    imgs = sku_data.get(sku, [])
    n_imgs = len(imgs)
    webp_count = sum(1 for i in imgs if i.endswith('.webp'))
    jpg_count = sum(1 for i in imgs if i.endswith('.jpg') or i.endswith('.jpeg'))
    png_count = sum(1 for i in imgs if i.endswith('.png'))
    ranked.append((sku, n_imgs, webp_count, jpg_count, png_count, imgs[:2]))

ranked.sort(key=lambda x: x[1])

print('=== V26.0 99 SKU 按现有图数排序 (从少到多) ===')
print(f'{"SKU":<8} {"图数":>4} {"webp":>4} {"jpg":>4} {"png":>4}  示例')
print('-' * 70)
for sku, n, w, j, p, sample in ranked:
    flag = ''
    if n == 0:
        flag = '🔴 完全无图'
    elif n == 1 and j == 1:
        flag = '🟡 单张 jpg 老图'
    elif n < 5:
        flag = '🟠 图数偏少'
    sample_str = sample[0] if sample else '无'
    print(f'{sku:<8} {n:>4} {w:>4} {j:>4} {p:>4}  {sample_str}  {flag}')

# 统计
print()
print('=== 缺图分级 (按"是否需要 V26.0 12 张标准") ===')
need_v26 = [s for s, n, *_ in ranked if n < 12]
print(f'  需生 V26.0 图: {len(need_v26)} 个 (图数 < 12)')
print(f'  已有 12+ 张: {99 - len(need_v26)} 个')

# 按类目分组
print()
print('=== 按类目分组 (按缺图数量) ===')
by_prefix_count = defaultdict(int)
for sku in need_v26:
    prefix = sku.split('-')[0]
    by_prefix_count[prefix] += 1
for prefix, cnt in sorted(by_prefix_count.items(), key=lambda x: -x[1]):
    print(f'  {prefix}: {cnt} 个 SKU 缺图')

# 已有完整图的 SKU (12+ 张) - 这些可以跳过
print()
print('=== 已有 12+ 张图 (跳过) ===')
full = [s for s, n, *_ in ranked if n >= 12]
for sku in full:
    n = next(r[1] for r in ranked if r[0] == sku)
    print(f'  {sku}: {n} 张')

# 成本
print()
print('=== 成本估算 (全部缺图 SKU) ===')
n_skus = len(need_v26)
n_imgs = n_skus * 12
cost = n_imgs * 0.3
print(f'  {n_skus} SKU × 12 图 = {n_imgs} 张')
print(f'  成本: {n_imgs} × 0.3 = {cost:.1f} 元')
print(f'  时间: {n_imgs * 3 // 60}-{n_imgs * 5 // 60} 分钟 (3-5 秒/张)')

print()
print('=== 成本估算 (P0 优先: 5 SKU 测试集已有图, 看其他主营类目) ===')
# 按 §13 主营品类 P0/P1/P2
P0 = ['ST', 'FL', 'PK', 'PB']  # stickers, flyers, packaging, paper-bags
P1 = ['PO', 'BK', 'RP', 'MN', 'CL']  # posters, books, red-packets, menus, calendars
P2 = ['BN', 'EV']  # banners, envelopes
DJ = ['DJ']  # japan-doujin (P2)
EDU = ['ED']  # educational (P2)
WI = ['WI']  # wedding-invitations (业务子类目豁免)
PC = ['PC']  # place-cards (业务子类目豁免)
BC = ['BC']  # business-cards → §11 禁区! 实际 BC 是 greeting cards, 不冲突

# 主营 5 品类: 贴紙/宣傳單張/包裝盒/紙袋/標籤
main_5 = {'ST', 'FL', 'PK', 'PB', 'CL'}  # 推测 CL=card/labels
# 让我看实际类目映射
print('注: 类目前缀 → 主营品类对照待 K3 拍板')
