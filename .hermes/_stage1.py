# -*- coding: utf-8 -*-
# Stage 1: gen-price-data.mjs 映射 + pricing.ts + middleware.ts
import io, re

# ---- 1. gen-price-data.mjs: 加 roll-stickers 映射 ----
p = 'scripts/gen-price-data.mjs'
t = io.open(p, encoding='utf-8').read()
anchor = "map['digital-stickers'] = { source: 'digital-stickers-cost.json', productName: dsName, defaultConfigIndex: 0, configs: dsConfigs };"
assert anchor in t and t.count(anchor) == 1
new_line = anchor + "\nmap['roll-stickers'] = { source: 'digital-stickers-cost.json', productName: dsName, defaultConfigIndex: 4, configs: dsConfigs }; // 2026-10-12 K3 拍板: 卷裝貼紙新建 (卷裝檔=cfg[4])"
t = t.replace(anchor, new_line)
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('gen-price-data.mjs: roll-stickers mapping added')

# ---- 2. pricing.ts: 删 fluorescent 块, 加 roll-stickers 块 ----
p = 'src/lib/pricing.ts'
t = io.open(p, encoding='utf-8').read()
old = """  'fluorescent-stickers': {
    'en': { min: 0.46, max: 0.92, unit: 'pc' },
    'ja': { min: 60, max: 115, unit: '枚' },
  },
"""
assert t.count(old) == 1
new = """  'roll-stickers': {
    'en': { min: 0.03, max: 0.71, unit: 'pc' },
    'ja': { min: 4, max: 110, unit: '枚' },
  },
"""
t = t.replace(old, new)
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('pricing.ts: fluorescent removed, roll-stickers added (min 0.03/4 = 3000檔單價 $0.20/¥4)')

# ---- 3. middleware.ts: QUOTE 映射重指 + roll 键 + 退役 PDP 301 ----
p = 'src/middleware.ts'
t = io.open(p, encoding='utf-8').read()
# 3a. fluorescent 重指 + 新增 roll-stickers 键
old = "  'fluorescent-stickers': '/product/fluorescent-stickers/',"
assert t.count(old) == 1
t = t.replace(old, "  'roll-stickers': '/product/roll-stickers/', // 2026-10-12 新建\n  'fluorescent-stickers': '/product/roll-stickers/', // 2026-10-12 退役 301 收拢 (K3 拍板)")
# 3b. 退役 PDP 301 map + handler (插在优先级3之前)
map_block = """// 2026-10-12 K3 拍板 SKU 压缩: 退役 PDP 直接 URL 301 收拢 (不影响 QUOTE_PRODUCT_MAP 既有映射)
const RETIRED_PRODUCT_REDIRECTS: Record<string, string> = {
  'fluorescent-stickers': '/product/roll-stickers/',
  'drink-tokens': '/product/place-cards/',
  'cafe-table-cards': '/product/place-cards/',
  'wedding-place-cards': '/product/place-cards/',
  'save-the-date-cards': '/product/wedding-invitations/',
  'wedding-seating-charts': '/product/wedding-invitations/',
  'wedding-suite-bundle': '/product/wedding-invitations/',
  'eco-tote-bag': '/product/paper-bags/',
  'postcard-set': '/product/greeting-cards/',
};

"""
anchor2 = "export async function middleware(request: NextRequest) {"
assert t.count(anchor2) == 1
t = t.replace(anchor2, map_block + anchor2)
# 3c. handler: 优先级2.65 (在 locale 大小写归一 之前插入)
handler = """  // 优先级2.65：退役 PDP slug → 301 收拢 (K3 2026-10-12 拍板: 荧光→卷裝 + Tier1 八收拢)
  const retiredMatch = pathname.match(/^\\/(zh-hk|en|ja)\\/product\\/([a-z0-9-]+)\\/?$/);
  if (retiredMatch) {
    const target = RETIRED_PRODUCT_REDIRECTS[retiredMatch[2]];
    if (target) {
      url.pathname = `/${retiredMatch[1]}${target}`;
      return NextResponse.redirect(url, 301);
    }
  }

"""
anchor3 = "  // 优先级3：locale 大小写归一化"
assert t.count(anchor3) == 1
t = t.replace(anchor3, handler + anchor3)
io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('middleware.ts: QUOTE 映射重指 + 退役 PDP 301 map/handler done')
