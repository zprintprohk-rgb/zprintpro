#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import re
import os

ROOT = r"F:\zprintpro-nextjs"
PATH = os.path.join(ROOT, "src", "app", "[locale]", "category", "[slug]", "page.tsx")

# 用 regex - 不依赖精确 DOT 字符
# 模式: 'calendars' 块里 'en' 行的 '100 MOQ' 改成 '1000 MOQ'
def main():
    with io.open(PATH, "r", encoding="utf-8") as f:
        text = f.read()

    # 定位 'calendars': { zh-hk, en, ja } 3 行, 改 en 行
    # 找 'calendars' 块
    cal_match = re.search(r"    'calendars':\s*\{[^}]+?\},", text, re.DOTALL)
    if not cal_match:
        raise RuntimeError("'calendars' 块未找到")
    cal_block = cal_match.group(0)
    print(f"calendars block ({len(cal_block)} chars):")
    print(cal_block)
    print()

    # 找 en 行
    en_match = re.search(r"      'en':\s*'(Custom Calendars[^']*)',", cal_block)
    if not en_match:
        raise RuntimeError("'calendars' 块内 en 行未找到")
    en_str = en_match.group(1)
    print(f"en line found: {en_str[:80]}...")
    print(f"  full: {en_str}")
    print(f"  bytes: {[hex(ord(c)) for c in en_str[:30]]}")
    print()

    # 替换 100 MOQ -> 1000 MOQ (en calendar 块特有)
    if "1000 MOQ" in en_str:
        print("ALREADY 1000 MOQ — skip")
        return
    if "100 MOQ" not in en_str:
        raise RuntimeError("'100 MOQ' not in en string — different format?")

    new_en_str = en_str.replace("100 MOQ", "1000 MOQ", 1)
    new_cal_block = cal_block.replace(en_str, new_en_str, 1)
    new_text = text.replace(cal_block, new_cal_block, 1)

    if new_text == text:
        raise RuntimeError("No change after replace")

    with io.open(PATH, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)

    # Verify
    with io.open(PATH, "r", encoding="utf-8") as f:
        t2 = f.read()
    if "Custom Calendars Free Shipping" in t2 and "1000 MOQ 2027 Desk Wall Hardcover Foil" in t2:
        print("OK — L193 en calendars 100 MOQ -> 1000 MOQ")
    else:
        raise RuntimeError("Verification failed")

    # Spot check
    with open(PATH, "rb") as f:
        b = f.read()
    bom = b[:3] == b"\xef\xbb\xbf"
    print(f"size={len(b)} BOM={bom}")
    if bom:
        raise RuntimeError("BOM detected!")

if __name__ == "__main__":
    main()
