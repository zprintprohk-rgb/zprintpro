#!/usr/bin/env python3
"""Fix duplicated '色彩'/'カラーパレット' prefix in COLOR_PALETTE strings."""
import re

fp = r'F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v24.py'
with open(fp, 'r', encoding='utf-8') as f:
    text = f.read()

# Find COLOR_PALETTE_JA and COLOR_PALETTE_ZHHK and strip the leading prefix
# JA starts with "カラーパレット：日本美"
# zh-hk starts with "色彩：香港送禮"

# Find JA COLOR_PALETTE = ( ... ) block
m_ja = re.search(r'COLOR_PALETTE_JA = \(([^)]+)\)', text, re.DOTALL)
m_zh = re.search(r'COLOR_PALETTE_ZHHK = \(([^)]+)\)', text, re.DOTALL)
m_ja2 = re.search(r'COLOR_PALETTE_JA = "([^"]+)"', text)
m_zh2 = re.search(r'COLOR_PALETTE_ZHHK = "([^"]+)"', text)

print(f'm_ja: {bool(m_ja)}  m_ja2: {bool(m_ja2)}')
print(f'm_zh: {bool(m_zh)}  m_zh2: {bool(m_zh2)}')

# Strip leading "カラーパレット：" / "色彩：" from JA/zh-hk if present
# Approach: find the COLOR_PALETTE definitions and check first line of content
# The values start with カラーパレット： or 色彩：

# Just remove the leading カラーパレット： from the JA value
text = text.replace(
    '"カラーパレット：日本美',
    '"日本美'
)
text = text.replace(
    '"色彩：香港送禮',
    '"香港送禮'
)
text = text.replace(
    '"カラーパレット：',
    '"'
)
text = text.replace(
    '"色彩：',
    '"'
)

# Also fix build_prompt to NOT add "色彩：" / "カラーパレット：" prefix since we removed it
# Currently build_prompt JA has: f"カラーパレット：{COLOR_PALETTE_JA}\n"
# We removed "カラーパレット：" from COLOR_PALETTE_JA, but the build_prompt still adds it
# That's actually fine - it adds the prefix BACK. So we're back to original.
# Better: keep the prefix in build_prompt, but it appears twice (once in build_prompt, once in COLOR_PALETTE)

# Let me just keep it consistent: COLOR_PALETTE_* has the prefix, build_prompt doesn't
# So we need to revert my "remove leading カラーパレット" / "色彩：" changes
# and instead just keep build_prompt not adding prefix

# Actually the cleanest fix: keep COLOR_PALETTE_* with prefix, and build_prompt uses
# the value as-is (no extra prefix added)

# Let me revert
text = text.replace(
    '"日本美',
    '"カラーパレット：日本美'
)
text = text.replace(
    '"香港送禮',
    '"色彩：香港送禮'
)

# Now update build_prompt to remove the duplicate "カラーパレット：" / "色彩：" prefix
text = text.replace(
    'f"カラーパレット：{COLOR_PALETTE_JA}\\n"',
    'f"{COLOR_PALETTE_JA}\\n"'
)
text = text.replace(
    'f"色彩：{COLOR_PALETTE_ZHHK}\\n"',
    'f"{COLOR_PALETTE_ZHHK}\\n"'
)

with open(fp, 'w', encoding='utf-8') as f:
    f.write(text)
print('Done')
