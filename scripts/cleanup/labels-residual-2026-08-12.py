"""
§0.16 batch 1 残留清扫 (8/11 db2cb5f 漏 35 文件, 8/12 e06c1d0 PASS 后 verify 发现)

范围:
- 35 个文件 (components/ + data/ + lib/)
- 180 处旧 label (宣傳單張/包裝盒定制/海報定制)
- zh-hk 纯繁體化 (K3 8/11 10:41 拍板, 简→繁"制→製")

执行: python scripts/cleanup/labels-residual-2026-08-12.py
验证: grep -rE "宣傳單張|包裝盒定制|海報定制|客製" src/ | wc -l → 应 = 0
"""

import os
import re
from pathlib import Path

WORKSPACE = Path("F:/zprintpro-nextjs")
SRC = WORKSPACE / "src"

# 替换映射 (zh-hk 旧 label → 纯繁體新 label, K3 8/11 10:41 拍板)
REPLACEMENTS = {
    # 类目名 + 简→繁
    "宣傳單張": "傳單印刷",  # 7 候选, K3 拍板加"印刷" 词
    "包裝盒定制": "包裝盒印刷",  # 简→繁"制→製"+ 加"印刷"
    "海報定制": "海報印刷",  # 同上
    "客製化": "訂製",  # 简→繁
    "制 ": "製 ",  # 单字替换 (繁體化)
    "制$": "製$",  # 行末
    "制，": "製，",  # 中文标点
    "制。": "製。",
    "制:": "製:",
    "制/": "製/",
    "制（": "製（",
    "制)": "製)",
    "制定 ": "訂製 ",
    "制作 ": "製作 ",
}

# 豁免: 名片禁区业务 (走 §11 sweep 单独处理) + 文件路径
EXEMPT_PATTERNS = [
    r"business[-_]?cards?",
    r"/category/business-cards/",
    r"/product/business-cards/",
]


def is_exempt_file(path: Path) -> bool:
    return any(re.search(pat, str(path), re.IGNORECASE) for pat in EXEMPT_PATTERNS)


def sweep_file(path: Path) -> tuple[int, list[str]]:
    try:
        content = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return 0, []
    except Exception as e:
        return 0, [f"skip: {e}"]

    if is_exempt_file(path):
        return 0, []

    changes = []
    orig = content
    for old, new in REPLACEMENTS.items():
        if old in content:
            n = content.count(old)
            content = content.replace(old, new)
            changes.append(f"{old!r} -> {new!r} x{n}")

    if content != orig:
        path.write_text(content, encoding="utf-8")

    return len(changes), changes


def main():
    print("=== §0.16 batch 1 残留清扫 (K3 8/12 11:50 全推拍板) ===\n")
    target_extensions = {".ts", ".tsx", ".json"}

    total_files = 0
    total_changes = 0
    for path in SRC.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix not in target_extensions:
            continue
        n, changes = sweep_file(path)
        if n > 0:
            total_files += 1
            total_changes += n
            rel = path.relative_to(WORKSPACE)
            print(f"[OK] {rel}: {n} 类替换")
            for c in changes:
                print(f"     - {c}")

    print(f"\n总文件: {total_files}, 总替换: {total_changes} 类\n")

    # 验证 grep
    print("=== 验证 grep ===")
    os.chdir(WORKSPACE)
    residual_total = 0
    for pat in ["宣傳單張", "包裝盒定制", "海報定制", "客製化"]:
        result = os.popen(
            f'grep -r "{pat}" src/ 2>/dev/null | grep -v node_modules | wc -l'
        ).read().strip()
        n = int(result) if result.isdigit() else 0
        residual_total += n
        if n == 0:
            print(f"[OK] '{pat}' 全清零")
        else:
            print(f"[WARN] '{pat}' 残留 {n} 处")

    print(f"\n总残留: {residual_total} 处")
    return total_files


if __name__ == "__main__":
    main()
