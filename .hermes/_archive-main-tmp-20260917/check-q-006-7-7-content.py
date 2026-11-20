import json
import sys

# Read from git show
content = sys.stdin.read()
# Strip BOM
if content.startswith('\ufeff'):
    content = content[1:]
d = json.loads(content)
v = d['tea-beverage-gift-box-printing-guide']
print(f'7/7 Q-006 zh-hk content chars: {len(v["content"])}')
print(f'7/7 Q-006 keys: {list(v.keys())}')

# Check if 7/7 has v8 9 段
print(f'7/7 Q-006 重點摘要: {"YES" if "重點摘要" in v["content"] else "NO"}')
print(f'7/7 Q-006 黄 callout: {"YES" if "bg-amber-50" in v["content"] else "NO"}')
print(f'7/7 Q-006 蓝 CTA: {"YES" if "bg-blue-50" in v["content"] else "NO"}')
print(f'7/7 Q-006 Author: {"YES" if "ZprintPro Engineering Team" in v["content"] else "NO"}')
print(f'7/7 Q-006 Sources: {"YES" if "資料來源" in v["content"] else "NO"}')
print(f'7/7 Q-006 Disclaimer: {"YES" if "免責" in v["content"] else "NO"}')
