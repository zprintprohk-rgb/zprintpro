# -*- coding: utf-8 -*-
"""V20.7.1 修复 detect_book_layout 关键词"""
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

PATH = r"F:\zprintpro-nextjs\.hermes\k3-inbox\_gen_v20_per_sku.py"
with open(PATH, 'r', encoding='utf-8') as f:
    content = f.read()

OLD = '''    text_keywords = [
        "textbook", "academic", "saddle-stitch", "saddle stitch", "booklet",
        "notebook", "journal", "novel", "manual", "report", "perfect-bound",
        "perfect bound", "training", "workbook", "exercise", "certificate",
    ]
    workbook_keywords = [
        "exercise", "workbook", "textbook", "training", "education", "school material",
    ]'''

NEW = '''    text_keywords = [
        "textbook", "academic", "saddle-stitch", "saddle stitch", "booklet",
        "notebook", "journal", "novel", "manual", "report", "perfect-bound",
        "perfect bound", "training", "workbook", "exercise", "certificate",
        "flyer", "newsletter", "announcement", "school flyer", "leaflet",
        "brochure", "pamphlet",
    ]
    workbook_keywords = [
        "exercise", "workbook", "textbook", "training", "education",
        "school material", "school", "school flyers", "school flyer",
        "school textbook", "school announcement", "school newsletter",
    ]'''

if OLD not in content:
    print("ERROR: text_keywords / workbook_keywords marker not found")
    sys.exit(1)

content = content.replace(OLD, NEW, 1)
print("V20.7.1: keywords upgraded (added flyer/newsletter/announcement/school)")

# 也升级 V20.7 header 到 V20.7.1
OLD5 = 'V20.7 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50 拍板 (books 智能 PHOTO/TEXT/WORKBOOK layout + 跨 category ED-005 yearbook 升级 + 空白页修复)'
NEW5 = 'V20.7.1 Final - K3 8/15 03:26+03:36+03:38+04:11+04:13+04:20+04:42+04:50 拍板 (books 智能 PHOTO/TEXT/WORKBOOK layout + ED-005 yearbook 升级 + 关键词扩展 flyer/newsletter/school + 空白页修复)'
if OLD5 in content:
    content = content.replace(OLD5, NEW5, 1)
    print("Header upgraded V20.7 -> V20.7.1")

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Done, file size: {len(content)} bytes")
