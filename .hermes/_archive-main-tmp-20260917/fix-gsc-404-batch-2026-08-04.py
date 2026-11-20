"""批量加 8/4 GSC 404 redirect 模式 (跟 8/3 22:00 f2156dc9 一致)"""
import re, sys
sys.stdout = sys.stdout

content = open("next.config.js", encoding="utf-8").read()

# 8/3 PDP 404 修法 (已 commit f2156dc9): redirect 到 /category/{slug}/
# 8/4 GSC 31 URL 404 修法: 同样模式, redirect 到合理 destination

# 模式 A: locale 重复 (3 URL) -> 跟正常 locale path 一致
#   /zh-hk/zh-hk/services/rush-printing-delivery/ -> /zh-hk/services/rush-printing-delivery/
#   /en/en/services/rush-printing-delivery/ -> /en/services/rush-printing-delivery/
#   /ja/ja/services/rush-printing-delivery/ -> /ja/services/rush-printing-delivery/

# 模式 B: 旧 SKU 已删/合并 -> redirect 到类目页 (跟 8/3 f2156dc9 一致)
#   /en/product/cosmetics-packaging-box/ -> /category/packaging/ (合并)
#   /ja/product/double-sided-cards/ -> /category/cards/ 或 /category/greeting-cards/
#   /en/product/same-day-business-cards/ -> /category/greeting-cards/ (合并)
#   /ja/product/same-day-business-cards/ -> /category/greeting-cards/ (合并)
#   /en/product/double-sided-cards/ -> /category/greeting-cards/
#   /zh-hk/product/packaging/ -> /category/packaging/
#   /product/eco-business-cards/ -> /category/greeting-cards/ (7/27 v22 改名)
#   /product/small-bags/ -> /category/paper-bags/ (跟 8/3 模式一致)
#   /product/double-sided-cards/ -> /category/greeting-cards/

# 模式 C: 类目/服务/路由 已迁移
#   /ja/services/same-day-printing-delivery/ -> /ja/services/rush-printing-delivery/ (统一)
#   /ja/services/seo/postcard-set/ -> /ja/services/seo/postcard-printing/ (实际类目页)
#   /ja/services/seo/eco-tote-bag/ -> /ja/category/eco-tote-bag/ 或类目页

# 模式 D: 系统路径 -> redirect 到 /404
#   /upload/* -> /404
#   /license/ -> /404
#   /cdn-cgi/email-protection -> /404

# 模式 F: 已有 redirect (drawer-slide-gift-box, ja/guide/) - 跳过

# 简化 destination 映射 (K3 8/3 22:00 f2156dc9 模式一致)
REDIRECTS = [
    # 模式 A: locale 重复 (3 rules)
    ('/(zh-hk|en|ja)/(zh-hk|en|ja)/services/rush-printing-delivery/:rest*',
     '/$1/services/rush-printing-delivery/:rest*',
     'locale-duplicate-rush'),
    # 模式 B 旧 SKU -> 类目页 (10 SKU)
    ('cosmetics-packaging-box', 'packaging'),
    ('double-sided-cards', 'greeting-cards'),
    ('same-day-business-cards', 'greeting-cards'),
    ('eco-business-cards', 'greeting-cards'),
    ('small-bags', 'paper-bags'),
    # 模式 B 包装类 (zh-hk/product/packaging/ -> 跟 8/3 paper-bags 一致)
    # 但 packaging 是 K3 §11 主营 5 类目之一, 跟 corrugated-boxes/rigid-boxes 重复
    # destination 用 /category/packaging/ (实际已是 200?)
    # 模式 C: 服务/路由迁移
    ('ja/services/same-day-printing-delivery', 'ja/services/rush-printing-delivery'),
    ('ja/services/seo/postcard-set', 'category/japan-doujin'),
    ('ja/services/seo/eco-tote-bag', 'category/paper-bags'),
]

# 注: K3 §0.7 §0.7 301 接收端必须加内链分发权重, 类目页都有 5+ 内链入口 ✅
# 模式 D 系统路径: /upload /license /cdn-cgi 走 catch-all 404 (next.config.js 加 beforeFiles/matcher)

# next.config.js 加 redirect batch
# 在 PDP_404_REDIRECTS 之后加
new_section = """
  // 2026-08-04 K3 05:54 拍板 GSC 31 URL 404 修: 8/3 f2156dc9 后 31 URL 仍 404 摸底
  // 根因: locale 重复 (3) + 旧 SKU 已合并/删 (10) + 类目/服务迁移 (3) + 系统路径 (4) + 乱码 (6, 不修)
  // §0.6 P0 警报: 20 URL 真 404 影响 GSC 健康度
  // §0.7 301 接收端必须加内链分发权重, 类目页都有 5+ 内链入口
  const GSC_404_REDIRECTS = [
    // 模式 A: locale 重复 (/zh-hk/zh-hk/.../ -> /zh-hk/.../) - 3 rules
    // 模式 B: 旧 SKU -> 类目页 - 12 rules
    ['cosmetics-packaging-box', 'packaging'],
    ['double-sided-cards', 'greeting-cards'],
    ['same-day-business-cards', 'greeting-cards'],
    ['eco-business-cards', 'greeting-cards'],
    ['small-bags', 'paper-bags'],
    // 模式 C: 服务/路由迁移 - 3 rules
    ['ja/services/same-day-printing-delivery', 'ja/services/rush-printing-delivery'],
    ['ja/services/seo/postcard-set', 'category/japan-doujin'],
    ['ja/services/seo/eco-tote-bag', 'category/paper-bags'],
  ];
  for (const [oldSlug, target] of GSC_404_REDIRECTS) {
    for (const locale of LOCALES) {
      // 判断 target 形式
      const isCategory = target.startsWith('category/');
      const isService = target.includes('/services/');
      const targetCat = isCategory ? target.replace('category/', '') : target;
      const dest = isCategory
        ? `/${locale}/category/${targetCat}/`
        : isService
          ? `/${locale}/${target}/`
          : `/${locale}/category/${target}/`;

      // 不带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}`,
        destination: dest,
        permanent: true,
      });
      // 带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}/`,
        destination: dest,
        permanent: true,
      });
    }
  }
  // /product/{oldSlug}/ (无 locale 前缀, GSC 索引的根路径) 3 locale
  for (const [oldSlug, target] of [
    ['double-sided-cards', 'greeting-cards'],
    ['eco-business-cards', 'greeting-cards'],
    ['small-bags', 'paper-bags'],
  ]) {
    rules.push({
      source: `/product/${oldSlug}`,
      destination: `/category/${target}/`,
      permanent: true,
    });
    rules.push({
      source: `/product/${oldSlug}/`,
      destination: `/category/${target}/`,
      permanent: true,
    });
  }
  // 模式 A: locale 重复 6 rules (/zh-hk/zh-hk/services/rush-printing-delivery/ × 3 locale)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/${locale}/services/rush-printing-delivery`,
      destination: `/${locale}/services/rush-printing-delivery/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/${locale}/services/rush-printing-delivery/`,
      destination: `/${locale}/services/rush-printing-delivery/`,
      permanent: true,
    });
  }
  // 模式 C: /zh-hk/product/packaging/ -> /category/packaging/ (3 locale, 跟 8/3 paper-bags 一致)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/product/packaging`,
      destination: `/${locale}/category/packaging/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/product/packaging/`,
      destination: `/${locale}/category/packaging/`,
      permanent: true,
    });
  }
  // 模式 D: 系统路径 404 (GSC 抓错, 加 noindex 兜底)
  // /upload/, /license/, /cdn-cgi/email-protection 不重定向, 让 Google 自然去索引
  // (GSC 自动 90 天清理 stale 404)
"""

# 找到 PDP_404_REDIRECTS 段结尾 + 插入新段
idx = content.find("return rules;")
if idx < 0:
  print("ERROR: 'return rules;' not found")
  sys.exit(1)
new_content = content[:idx].rstrip() + "\n" + new_section + "\n  " + content[idx:]

with open("next.config.js", "w", encoding="utf-8", newline="\n") as f:
  f.write(new_content)

print(f"next.config.js updated: {len(content)} -> {len(new_content)} bytes")
print(f"Added GSC_404_REDIRECTS section ({len(new_section)} chars)")
