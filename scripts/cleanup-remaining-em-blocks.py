#!/usr/bin/env python3
"""
Cleanup remaining 6 isolated zh-hk em blocks (standalone, no preceding SaaS H3).
"""
import re
from pathlib import Path

path = Path(r'F:\zprintpro-nextjs\src\data\products.ts')
content = path.read_text(encoding='utf-8')

# Standalone zh-hk em block (no preceding H3 SaaS)
pattern = re.compile(
    r'<p><em>智印雲 \(ZprintPro\) 香港本地印刷 SaaS[^<]*?ISO 9001[^<]*?</em></p>\n'
)

matches = pattern.findall(content)
print(f"Found {len(matches)} isolated zh-hk em blocks")
for m in matches:
    print(f"  - {m[:80]}...")

new_content = pattern.sub('', content)
removed = len(content) - len(new_content)
print(f"Removed {removed} bytes")

# Collapse 3+ blank lines
new_content = re.sub(r'\n\n\n+', '\n\n', new_content)

path.write_text(new_content, encoding='utf-8', newline='\n')
print(f"Written: {path}")