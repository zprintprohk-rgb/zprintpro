"""
§0.16 残留清理 batch 1: zh-hk 旧 label + Footer + Categories
K3 8/12 10:55 PM 审核拍板

范围:
- src/components/layout/Header.tsx (zh-hk 旧 label)
- src/components/layout/Footer.tsx (邮箱/服务时间预留位)
- src/data/categories.ts (类目 label 兜底)
- src/data/products.ts (类目显示字段)

执行: python scripts/cleanup/labels-zhhk-2026-08-12.py
验证: grep -r "宣傳單張\|包裝盒定制\|海報定制\|客製化\|紙袋" src/ | wc -l  → 应 = 0
"""

import os
import re
from pathlib import Path

WORKSPACE = Path("F:/zprintpro-nextjs")
SRC = WORKSPACE / "src"

# 旧 label → 新 label 映射 (per K3 8/11 10:41 拍板 + 8/12 03:41 战略)
REPLACEMENTS = {
    # Header 类目
    "宣傳單張": "傳單印刷",
    "包裝盒定制": "包裝盒印刷",
    "海報定制": "海報印刷",
    "客製化": "訂製",
    # 简→繁
    "定製": "訂製",
    "制": "製",  # 单字替换, 范围窄, 后面人工复核
    # Footer 旧
    "全年無休": "Inquiries accepted 24/7",
    "24 小時客戶服務": "Inquiries accepted 24/7",
}

# 豁免: 名片禁区
EXEMPT_PATTERNS = [
    r"business[-_]?cards?",
    r"/category/business-cards/",
    r"/product/business-cards/",
]

def is_exempt(text: str) -> bool:
    return any(re.search(pat, text, re.IGNORECASE) for pat in EXEMPT_PATTERNS)


def cleanup_file(path: Path) -> tuple[int, list[str]]:
    """返回 (替换数, 替换位置列表)"""
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return 0, []
    except Exception as e:
        print(f"  ⚠ 跳过 {path.name}: {e}")
        return 0, []

    if is_exempt(content):
        return 0, []

    changes = []
    for old, new in REPLACEMENTS.items():
        if old in content:
            count = content.count(old)
            content = content.replace(old, new)
            changes.append(f"{old!r} → {new!r} ×{count}")

    if changes:
        path.write_text(content, encoding="utf-8")

    return len(changes), changes


def main():
    target_files = [
        "components/layout/Header.tsx",
        "components/layout/Footer.tsx",
        "data/categories.ts",
        "data/products.ts",
        "data/category-seo-content.ts",
    ]

    total_changes = 0
    for rel in target_files:
        path = SRC / rel
        if not path.exists():
            print(f"  [WARN] {rel} 不存在")
            continue
        n, changes = cleanup_file(path)
        total_changes += n
        if n > 0:
            print(f"[OK] {rel}: {n} 处替换")
            for c in changes:
                print(f"     - {c}")
        else:
            print(f"  - {rel}: 无需替换")

    print(f"\n总替换: {total_changes} 处")

    # 验证
    print("\n=== 验证 ===")
    os.chdir(WORKSPACE)
    residual_patterns = ["宣傳單張", "包裝盒定制", "海報定制"]
    for pat in residual_patterns:
        result = os.popen(f'grep -r "{pat}" src/ 2>/dev/null | grep -v node_modules | head -5').read()
        if result.strip():
            print(f"[WARN] {pat} 仍有残留:")
            print(result)
        else:
            print(f"[OK] {pat} 已清零")

    return total_changes


if __name__ == "__main__":
    main()
