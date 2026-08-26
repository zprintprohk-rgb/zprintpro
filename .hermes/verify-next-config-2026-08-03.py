import re, sys
sys.stdout = sys.stdout

content = open("next.config.js", encoding="utf-8").read()
# 统计 rules.push 数量
push_count = content.count("rules.push({")
print(f"=== next.config.js ===")
print(f"  total rules.push: {push_count}")

# 找 PDP_404_REDIRECTS 段
if "PDP_404_REDIRECTS" in content:
    print(f"  PDP_404_REDIRECTS section: ADDED")
    m = re.search(r"PDP_404_REDIRECTS = \[([\s\S]*?)\]", content)
    if m:
        print(f"  3 redirects configured")
    # 找 3 redirect 名字
    for slug in ["paper-bags", "stickers", "custom-stickers"]:
        n = content.count(f"${{locale}}/product/{slug}")
        if n > 0:
            print(f"  /product/{slug}/ -> mentioned {n}x")