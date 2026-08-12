"""
§0.16 batch 2: products.ts 智印雲 985 处 context-aware 替换 (K3 8/12 11:50 全推拍板)

locale-aware 替换逻辑 (per §0.15 公式):
- zh-hk 字段 (title_zh, name, description, longDescription, description_zh): 智印港
- en 字段 (nameEn, descriptionEn, longDescriptionEn): ZprintPro
- ja 字段 (nameJa, descriptionJa, longDescriptionJa): ジープリント

2 步:
1. 全文 智印雲 → 智印港 (zh-hk 默认)
2. en/ja 字段范围内 智印港 → ZprintPro / ジープリント

豁免: brand-attribute 字段 (NAP 法律名, 保留 智印雲)
"""

import re
from pathlib import Path

WORKSPACE = Path("F:/zprintpro-nextjs")
TARGET = WORKSPACE / "src" / "data" / "products.ts"

# 字段名: zh-hk 字段 (智印港)
ZH_HK_FIELDS = ["title_zh", "name", "description", "longDescription", "description_zh"]

# 字段名: en 字段 (ZprintPro)
EN_FIELDS = ["nameEn", "descriptionEn", "longDescriptionEn"]

# 字段名: ja 字段 (ジープリント)
JA_FIELDS = ["nameJa", "descriptionJa", "longDescriptionJa"]


def main():
    if not TARGET.exists():
        print(f"[ERR] {TARGET} 不存在")
        return 0

    content = TARGET.read_text(encoding="utf-8")
    orig = content
    changes = []

    # 步骤 1: 全文 智印雲 → 智印港 (zh-hk 默认, 985 处预期)
    n1 = content.count("智印雲")
    content = content.replace("智印雲", "智印港")
    changes.append(f"步骤1: 全文 智印雲 → 智印港: x{n1}")

    # 步骤 2: en/ja 字段范围内 智印港 → ZprintPro / ジープリント
    # 用 line-based regex 找字段名到下一个字段名 (或 } 结束) 的范围

    def replace_in_field_range(text, field_name, new_brand):
        """对指定字段的值范围 (引号或反引号包裹) 内做 智印港 → new_brand 替换"""
        n = 0
        # 匹配 field_name: '...' 或 field_name: `...` (跨多行)
        # 用非贪婪匹配 + DOTALL
        pattern = re.compile(
            rf"\b{re.escape(field_name)}\s*:\s*(['`])((?:(?!\1)[\s\S])*?)\1",
            re.MULTILINE,
        )
        def _replace(m):
            nonlocal n
            quote = m.group(1)
            value = m.group(2)
            new_value = value.replace("智印港", new_brand)
            if new_value != value:
                n += value.count("智印港")
            return f"{field_name}: {quote}{new_value}{quote}"
        text = pattern.sub(_replace, text)
        return text, n

    for field in EN_FIELDS:
        content, n = replace_in_field_range(content, field, "ZprintPro")
        if n > 0:
            changes.append(f"步骤2.en: {field} 智印港 → ZprintPro: x{n}")

    for field in JA_FIELDS:
        content, n = replace_in_field_range(content, field, "ジープリント")
        if n > 0:
            changes.append(f"步骤2.ja: {field} 智印港 → ジープリント: x{n}")

    # 写回
    if content != orig:
        TARGET.write_text(content, encoding="utf-8")

    print(f"=== §0.16 batch 2: products.ts 智印雲 985 处 context-aware 替换 ===\n")
    for c in changes:
        print(f"  - {c}")

    print(f"\n总变更: {len(changes)} 类\n")

    # 验证 grep
    print("=== 验证 grep ===")
    residual_total = 0
    for brand, label in [("智印雲", "旧品牌"), ("智印港", "zh-hk brand")]:
        result = re.findall(brand, content)
        n = len(result)
        residual_total += n
        if n == 0:
            print(f"[OK] '{brand}' ({label}) 残留 = 0")
        else:
            print(f"[INFO] '{brand}' ({label}) 残留 {n} 处 (符合预期 if zh-hk brand)")

    return len(changes)


if __name__ == "__main__":
    main()
