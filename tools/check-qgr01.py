#!/usr/bin/env python3
import json, re, sys
with open('src/data/blog-data/zh-hk.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
c = data['gang-run-card-boxes-hk-guide']['content']
# Strip HTML
plain = re.sub(r'<[^>]+>', ' ', c)
plain = re.sub(r'\s+', ' ', plain).strip()
print(f"  zh-hk plain chars: {len(plain)}")

# 15+ 年 / 15,000+ 客戶 / 100+ 國家 check
checks = [
    ('15+ 年', '15+ 年'),
    ('15+ Years', '15+ Years'),
    ('15,000+ 客戶', '15,000+'),
    ('100+ 國家', '100+ 國家'),
    ('免刀模費', '免刀模費'),
    ('順豐', '順豐'),
    ('DHL', 'DHL'),
    ('香港', '香港'),
    ('深圳 (should be 0)', '深圳'),
    ('智印港', '智印港'),
]
for name, kw in checks:
    count = plain.count(kw) if kw else 0
    print(f"  {name}: {count}")
print(f"\n  📋 15+ 段 100+ 國家 context:")
idx = plain.find('15+')
if idx > 0:
    print(f"    {plain[idx:idx+80]}")
