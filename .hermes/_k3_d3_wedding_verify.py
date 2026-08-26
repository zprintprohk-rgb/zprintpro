"""D3 婚礼 zh-hk 喜帖价格指南 严格 verify (改严 NAP check)"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')

# 重新读 3 locale content
zh = json.loads((ROOT / 'src/data/blog-data/zh-hk.json').read_text(encoding='utf-8'))
en = json.loads((ROOT / 'src/data/blog-data/en.json').read_text(encoding='utf-8'))
ja = json.loads((ROOT / 'src/data/blog-data/ja.json').read_text(encoding='utf-8'))

ZH_HK_CONTENT = zh['wedding-invitation-pricing-guide']['content']
EN_CONTENT = en['wedding-invitation-pricing-guide']['content']
JA_CONTENT = ja['wedding-invitation-pricing-guide']['content']

# 1. JSON parse OK (已 import verify 过)
print("=" * 60)
print("1. JSON parse + 3 locale content 存在")
print("=" * 60)
for name, data in [('zh-hk', zh), ('en', en), ('ja', ja)]:
    assert 'wedding-invitation-pricing-guide' in data, f'{name} 缺 wedding-invitation-pricing-guide'
    print(f"  ✅ {name} wedding-invitation-pricing-guide content 存在 ({len(data['wedding-invitation-pricing-guide']['content'])} chars)")

# 2. 简体字残留 (zh-hk 100% 繁体 强制)
print("\n" + "=" * 60)
print("2. zh-hk 100% 繁体 (per §13.16.1)")
print("=" * 60)
simp_chars_check = ['贴', '纸', '样', '复', '证', '质', '实', '当', '严', '种', '产', '张', '时', '这', '过', '满', '应', '对', '们', '你', '们', '党', '学', '习', '开', '关', '总', '经', '会', '议', '国', '华', '语', '请', '让', '选', '择', '单', '击', '链', '接', '显', '示', '页', '面', '统', '计', '结', '果', '设', '置', '风', '险', '预', '警', '报', '告', '警', '报', '配', '置', '文', '档', '代', '码', '工', '具', '链']
simp_found = []
for c in simp_chars_check:
    if c in ZH_HK_CONTENT:
        # 找上下文
        idx = ZH_HK_CONTENT.find(c)
        ctx = ZH_HK_CONTENT[max(0, idx-10):idx+10]
        simp_found.append((c, ctx))
if simp_found:
    print(f"  ⚠️  zh-hk content 含 {len(simp_found)} 处简体字残留:")
    for c, ctx in simp_found[:5]:
        print(f"      '{c}': ...{ctx}...")
else:
    print(f"  ✅ zh-hk content 0 简体字残留")

# 3. NAP §13.10 严判
print("\n" + "=" * 60)
print("3. NAP §13.10 严判 (supplier origin 暗示)")
print("=" * 60)
nap_strict = [
    ('Shenzhen Printing', 'en', EN_CONTENT),
    ('Shenzhen factory', 'en', EN_CONTENT),
    ('China factory', 'en', EN_CONTENT),
    ('深圳印刷', 'zh-hk', ZH_HK_CONTENT),
    ('深圳 factory', 'zh-hk', ZH_HK_CONTENT),
    ('中国印刷', 'zh-hk', ZH_HK_CONTENT),
    ('深セン', 'ja', JA_CONTENT),
    ('深圳印刷', 'ja', JA_CONTENT),
]
violations = 0
for term, locale, content in nap_strict:
    if term in content:
        idx = content.find(term)
        after = content[idx:idx+60]
        # 严判: supplier origin 暗示
        # 软判: 介词短语 "in Hong Kong market" / "Hong Kong's peak" = 市场描述 OK
        print(f"  ⚠️  {locale} 含 '{term}': {after[:50]}")
        violations += 1
# 'in Hong Kong' + supplier origin 暗示
if 'in Hong Kong' in EN_CONTENT:
    idx = EN_CONTENT.find('in Hong Kong')
    after = EN_CONTENT[idx:idx+80]
    # 检查 supplier origin 暗示
    if any(s in after for s in ['ZprintPro', 'printing', 'factory', 'delivers', 'supplies', 'ship']):
        print(f"  ⚠️  en 'in Hong Kong' 后跟 supplier origin 暗示: {after[:60]}")
        violations += 1
    else:
        print(f"  ℹ️  en 'in Hong Kong' 是介词短语 (市场/场景描述), OK")
        # 9 处 'Hong Kong' 实际都是 market/user 描述,不算违规
if violations == 0:
    print(f"  ✅ NAP §13.10 严判: 0 违规")
else:
    print(f"  ⚠️  NAP §13.10 严判: {violations} 处违规")

# 4. 字符数
print("\n" + "=" * 60)
print("4. 字数 / 词数")
print("=" * 60)
zh_chars = len(ZH_HK_CONTENT)
en_words = len(EN_CONTENT.split())
ja_words = len(JA_CONTENT.split())
print(f"  zh-hk = {zh_chars} 字 (现有 3 wedding avg 4504, D3 V3.6 §三 杠杆 1 鼓励深度 4000-8000)")
print(f"  en = {en_words} 词 (现有 3 wedding avg 819, 范围 600-1000)")
print(f"  ja = {ja_words} 词 (现有 3 wedding ?)")

# 5. 内部链接
print("\n" + "=" * 60)
print("5. 内部链接数")
print("=" * 60)
zh_links = re.findall(r'href="(/[^"]+)"', ZH_HK_CONTENT)
en_links = re.findall(r'href="(/[^"]+)"', EN_CONTENT)
ja_links = re.findall(r'href="(/[^"]+)"', JA_CONTENT)
print(f"  zh-hk 内部链接 {len(zh_links)} 处:")
for l in zh_links:
    print(f"    - {l}")
print(f"  en 内部链接 {len(en_links)} 处")
print(f"  ja 内部链接 {len(ja_links)} 处")

# 6. FAQ 数
print("\n" + "=" * 60)
print("6. FAQ 数")
print("=" * 60)
print(f"  zh-hk FAQ = {ZH_HK_CONTENT.count('<strong>Q')}")
print(f"  en FAQ = {EN_CONTENT.count('<strong>Q')}")
print(f"  ja FAQ = {JA_CONTENT.count('<strong>Q')}")

# 7. 9 段结构
print("\n" + "=" * 60)
print("7. 9 段结构")
print("=" * 60)
print(f"  zh-hk H3 段数 = {ZH_HK_CONTENT.count('<h3>')}")
print(f"  zh-hk table 数 = {ZH_HK_CONTENT.count('<table')}")
print(f"  zh-hk ol/ul 数 = {ZH_HK_CONTENT.count('<ol') + ZH_HK_CONTENT.count('<ul')}")

# 8. brand 双品牌检查 (zh-hk = 智印港, en/ja = ZprintPro, 不冲突)
print("\n" + "=" * 60)
print("8. brand 双品牌 §13.16.1")
print("=" * 60)
zh_brand_zhg = ZH_HK_CONTENT.count('智印港')
zh_brand_zpp = ZH_HK_CONTENT.count('ZprintPro')
en_brand_zpp = EN_CONTENT.count('ZprintPro')
en_brand_zhg = EN_CONTENT.count('智印港')
ja_brand_zpp = JA_CONTENT.count('ZprintPro')
print(f"  zh-hk: 智印港={zh_brand_zhg}, ZprintPro={zh_brand_zpp}")
print(f"  en: ZprintPro={en_brand_zpp}, 智印港={en_brand_zhg} (期望 ≤0, 残留违规)")
print(f"  ja: ZprintPro={ja_brand_zpp}")

# 9. WhatsApp 198 统一
print("\n" + "=" * 60)
print("9. WhatsApp 198 统一 (per K3 8/7 phase-out)")
print("=" * 60)
for c, l in [(ZH_HK_CONTENT, 'zh-hk'), (EN_CONTENT, 'en'), (JA_CONTENT, 'ja')]:
    has_198 = '198' in c and ('8619880851334' in c or '19880851334' in c)
    has_181 = '18126380255' in c or '181 2638 0255' in c
    if has_181:
        print(f"  ⚠️  {l} 含 181 旧号 (违规)")
    if has_198:
        print(f"  ✅ {l} 含 198 新号")
    if not has_198 and not has_181:
        print(f"  ℹ️  {l} 无 WhatsApp 链接")

# 10. 双品牌宪法 + NAP 脱钩 + locale-aware siteName (per §0.15)
print("\n" + "=" * 60)
print("10. locale-aware 品牌一致性 (per §0.15)")
print("=" * 60)
# zh-hk 用 "智印港" (双品牌)
# en 用 "ZprintPro"
# ja 用 "ZprintPro"
expected = {
    'zh-hk': ['智印港 ZprintPro', 'ZprintPro'],
    'en': ['ZprintPro'],
    'ja': ['ZprintPro'],
}
for c, l, exp in [(ZH_HK_CONTENT, 'zh-hk', expected['zh-hk']), (EN_CONTENT, 'en', expected['en']), (JA_CONTENT, 'ja', expected['ja'])]:
    for e in exp:
        if e in c:
            print(f"  ✅ {l} 含 '{e}'")
        else:
            print(f"  ⚠️  {l} 缺 '{e}'")
