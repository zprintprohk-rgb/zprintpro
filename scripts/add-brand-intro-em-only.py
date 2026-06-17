#!/usr/bin/env python3
"""
Phase E v2 — Restore ONE brand intro paragraph per SKU (em block with DHL/FSC/ISO).

Per user direction 2026-06-17:
  留段 2 删段 1 — keep paragraph 2 (comprehensive em block with DHL/FSC/ISO
  keywords), delete paragraph 1 (H3 "智印雲 SaaS 印刷服務" + simpler p).

Anchor: insert before each FAQ heading.
  zh-hk: before <h3>常見問題 (FAQ)</h3>
  ja:    before <h3>よくある質問 (FAQ)</h3>

Output: src/data/products.ts with exactly ONE brand intro paragraph per
zh-hk/ja SKU longDescription, no duplicates.

UTF-8 safe, LF newlines, no BOM.
"""
import re
from pathlib import Path

path = Path(r'F:\zprintpro-nextjs\src\data\products.ts')
content = path.read_text(encoding='utf-8')
before_bytes = len(content)

# Paragraph 2 (the ONE we keep) — zh-hk
ZH_EM = (
    '<p><em>智印雲 (ZprintPro) 香港本地印刷 SaaS，自有觀塘門市自取點，'
    '48 小時速遞全港。DHL Express 全球 2-4 天配送。'
    'FSC 認證紙材、ISO 12647 色彩管理、ISO 9001 品質認證。</em></p>\n'
)

# Paragraph 2 (the ONE we keep) — ja
JA_EM = (
    '<p><em>智印雲（ZprintPro）香港自社工場、観塘店舗受取対応、'
    '48 時間香港内速達。DHL Express で全世界 2-4 日配送。'
    'FSC 認証紙、ISO 12647 カラー管理、ISO 9001 品質認証。</em></p>\n'
)

# Insertion anchor: FAQ heading line
zh_anchor = '<h3>常見問題 (FAQ)</h3>'
ja_anchor = '<h3>よくある質問 (FAQ)</h3>'

# Count occurrences before
zh_faq_before = content.count(zh_anchor)
ja_faq_before = content.count(ja_anchor)
zh_em_before = content.count(ZH_EM.strip())
ja_em_before = content.count(JA_EM.strip())

print('Counts BEFORE:')
print(f'  zh-hk FAQ anchors: {zh_faq_before}')
print(f'  ja FAQ anchors:    {ja_faq_before}')
print(f'  zh-hk em blocks (already present): {zh_em_before}')
print(f'  ja em blocks (already present):    {ja_em_before}')
print()

# Insert zh-hk em block before each zh-hk FAQ anchor (only if not already present)
def insert_em_once(content: str, anchor: str, em_block: str) -> str:
    """Insert em_block before each `anchor` occurrence, but only if the
    preceding line is not already an em block (idempotent)."""
    lines = content.split('\n')
    out = []
    inserted = 0
    skipped = 0
    for i, line in enumerate(lines):
        if line.strip() == anchor.strip():
            # Look at previous non-empty line
            prev_idx = i - 1
            while prev_idx >= 0 and lines[prev_idx].strip() == '':
                prev_idx -= 1
            if prev_idx >= 0 and lines[prev_idx].strip().startswith('<p><em>') \
                    and lines[prev_idx].strip().endswith('</em></p>'):
                # Already has an em block right above — skip
                skipped += 1
            else:
                out.append(em_block.rstrip('\n'))
                inserted += 1
        out.append(line)
    return '\n'.join(out), inserted, skipped

new_content, zh_ins, zh_skip = insert_em_once(content, zh_anchor, ZH_EM + '\n')
new_content, ja_ins, ja_skip = insert_em_once(new_content, ja_anchor, JA_EM + '\n')

# Collapse 3+ blank lines
new_content = re.sub(r'\n\n\n+', '\n\n', new_content)

after_bytes = len(new_content)
print('Insertion counts:')
print(f'  zh-hk: inserted {zh_ins}, skipped {zh_skip} (already present)')
print(f'  ja:    inserted {ja_ins}, skipped {ja_skip} (already present)')
print()
print(f'Bytes before: {before_bytes}')
print(f'Bytes after:  {after_bytes}')
print(f'Delta:        +{after_bytes - before_bytes}')

# Idempotency: only write if there was actually a change
if after_bytes != before_bytes:
    path.write_text(new_content, encoding='utf-8', newline='\n')
    print(f'WRITTEN: {path}')
else:
    print('NO CHANGE — file already has the desired state')