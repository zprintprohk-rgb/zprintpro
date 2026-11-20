"""Quick GMC verify — single URL"""
import urllib.request
import json
import re
import sys

if len(sys.argv) < 2:
    print("Usage: python _k3_gmc_verify_quick.py <slug>")
    sys.exit(1)

slug = sys.argv[1]
locale = sys.argv[2] if len(sys.argv) > 2 else "zh-hk"
url = f"https://zprintpro.com/{locale}/product/{slug}/"

try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mavis/1.0"})
    html = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", errors="replace")
    blocks = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.+?)</script>', html, re.DOTALL)
    print(f"URL: {url}")
    print(f"LD blocks: {len(blocks)}")
    for i, b in enumerate(blocks):
        try:
            d = json.loads(b)
            if isinstance(d, list):
                for item in d:
                    if isinstance(item, dict) and item.get("@type") == "Product":
                        offers = item.get("offers", {})
                        vf = offers.get("validFrom") if isinstance(offers, dict) else "-"
                        print(f"  Block {i} Product: agg={bool(item.get('aggregateRating'))}, review={bool(item.get('review'))}, validFrom={vf}")
            elif isinstance(d, dict) and d.get("@type") == "Product":
                offers = d.get("offers", {})
                vf = offers.get("validFrom") if isinstance(offers, dict) else "-"
                print(f"  Block {i} Product: agg={bool(d.get('aggregateRating'))}, review={bool(d.get('review'))}, validFrom={vf}")
        except json.JSONDecodeError as e:
            print(f"  Block {i} parse fail: {e}")
except Exception as e:
    print(f"FAIL: {e}")
