#!/usr/bin/env python3
"""
Batch remove duplicated SaaS brand intro blocks from products.ts longDescription.

Targets:
  zh-hk (73 occurrences): H3 "智印雲 SaaS 印刷服務" + 2 paragraphs
  ja (11 occurrences): H3 "SaaS 印刷プラットフォーム概要" + 2 paragraphs (split by other sections)

UTF-8 safe, LF newlines, no BOM.
"""
import re
from pathlib import Path

path = Path(r'F:\zprintpro-nextjs\src\data\products.ts')
content = path.read_text(encoding='utf-8')
before_bytes = len(content)

# zh-hk pattern: H3 + p + blank + p(em)
# Anchor: H3 fixed text + em contains "ISO 9001 品質認證"
zh_pattern = re.compile(
    r'<h3>智印雲 SaaS 印刷服務</h3>\n'
    r'<p>[^<]*?智印雲[^<]*?</p>\n'
    r'\n'
    r'<p><em>[^<]*?ISO 9001[^<]*?</em></p>\n'
)

# ja pattern A: H3 + p (the SaaS intro paragraph)
ja_h3_pattern = re.compile(
    r'<h3>SaaS 印刷プラットフォーム概要</h3>\n'
    r'<p>[^<]*?香港本社の印刷 SaaS[^<]*?</p>\n'
)

# ja pattern B: standalone em p (the DHL/FSC line) — sits at end of longDescription
ja_em_pattern = re.compile(
    r'<p><em>[^<]*?智印雲（ZprintPro）香港自社工場[^<]*?ISO 9001[^<]*?</em></p>\n'
)

zh_matches = zh_pattern.findall(content)
ja_h3_matches = ja_h3_pattern.findall(content)
ja_em_matches = ja_em_pattern.findall(content)

print(f"Counts BEFORE replace:")
print(f"  zh-hk blocks: {len(zh_matches)}")
print(f"  ja H3+p blocks: {len(ja_h3_matches)}")
print(f"  ja em blocks: {len(ja_em_matches)}")
print()

new_content = zh_pattern.sub('', content)
new_content = ja_h3_pattern.sub('', new_content)
new_content = ja_em_pattern.sub('', new_content)

# Also collapse 3+ consecutive blank lines to 2 (cleanup after removal)
new_content = re.sub(r'\n\n\n+', '\n\n', new_content)

after_bytes = len(new_content)
print(f"Bytes before: {before_bytes}")
print(f"Bytes after:  {after_bytes}")
print(f"Removed:      {before_bytes - after_bytes}")
print()

path.write_text(new_content, encoding='utf-8', newline='\n')
print(f"Written: {path}")