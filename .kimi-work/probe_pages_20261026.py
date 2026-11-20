from __future__ import annotations

import json
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://zprintpro.com"
PATHS = [
    "/en/blog/eco-paper-bag-gsm/",
    "/en/blog/cmyk-guide/",
    "/en/product/saddle-stitch-booklets/",
    "/en/product/exercise-books/",
    "/en/category/greeting-cards/",
    "/ja/category/greeting-cards/",
    "/en/nengajo-2027/",
    "/ja/nengajo-2027/",
    "/ja/comiket-c109/",
    "/ja/product/graduation-yearbook/",
]
headers = {"User-Agent": "Mozilla/5.0 (compatible; ZprintProAudit/1.0)"}
results = []
for path in PATHS:
    url = BASE + path
    try:
        response = requests.get(url, headers=headers, timeout=35, allow_redirects=True)
        soup = BeautifulSoup(response.text, "html.parser")
        robots = [x.get("content", "") for x in soup.select('meta[name="robots"],meta[name="googlebot"]')]
        canonical = [x.get("href", "") for x in soup.select('link[rel="canonical"]')]
        h1 = [x.get_text(" ", strip=True) for x in soup.find_all("h1")]
        title = soup.title.get_text(" ", strip=True) if soup.title else ""
        desc = soup.select_one('meta[name="description"]')
        types = []
        for node in soup.select('script[type="application/ld+json"]'):
            try:
                data = json.loads(node.string or node.get_text())
                stack = data if isinstance(data, list) else [data]
                for item in stack:
                    if isinstance(item, dict):
                        types.extend(item.get("@type", []) if isinstance(item.get("@type"), list) else [item.get("@type")])
                        graph = item.get("@graph", [])
                        for g in graph:
                            if isinstance(g, dict):
                                types.extend(g.get("@type", []) if isinstance(g.get("@type"), list) else [g.get("@type")])
                    else:
                        types.append(type(item).__name__)
            except Exception as exc:
                types.append(f"JSON_PARSE_ERROR:{exc}")
        results.append({
            "path": path,
            "status": response.status_code,
            "final_url": response.url,
            "bytes": len(response.content),
            "title": title,
            "description": desc.get("content", "") if desc else "",
            "robots": robots,
            "canonical": canonical,
            "h1": h1,
            "schema_types": sorted({str(x) for x in types if x}),
            "contains_nengajo": "年賀状" in response.text,
            "contains_corporate_holiday": "corporate holiday" in response.text.lower(),
            "contains_business_holiday": "business holiday" in response.text.lower(),
        })
    except Exception as exc:
        results.append({"path": path, "error": str(exc)})
    time.sleep(1)

for path in ["/robots.txt", "/sitemap.xml"]:
    try:
        response = requests.get(BASE + path, headers=headers, timeout=35)
        results.append({"path": path, "status": response.status_code, "text_prefix": response.text[:4000]})
    except Exception as exc:
        results.append({"path": path, "error": str(exc)})

out = ROOT / ".hermes" / "logs" / "page-probe-2026-10-26.json"
out.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(results, ensure_ascii=False, indent=2))
