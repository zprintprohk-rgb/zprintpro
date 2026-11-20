from pathlib import Path
import json
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".kimi-work" / "packaging-research-20261026" / "packaging-page-probes.json"
PATHS = [
    "/en/category/packaging/",
    "/en/product/custom-boxes/",
    "/en/product/custom-packaging-boxes/",
    "/en/product/mailer-boxes/",
    "/en/product/rigid-boxes/",
    "/en/product/kraft-paper-packaging-box/",
    "/en/product/food-boxes/",
    "/en/product/cosmetic-boxes/",
    "/ja/category/packaging/",
    "/ja/product/rigid-boxes/",
    "/ja/product/kraft-paper-packaging-box/",
    "/ja/product/food-boxes/",
    "/zh-hk/category/packaging/",
    "/zh-hk/product/rigid-boxes/",
    "/zh-hk/product/kraft-paper-packaging-box/",
    "/zh-hk/product/food-boxes/",
]
rows = []
for path in PATHS:
    url = "https://zprintpro.com" + path
    try:
        response = requests.get(url, timeout=25, headers={"User-Agent": "Mozilla/5.0 ZprintProStrategyAudit/1.0"})
        soup = BeautifulSoup(response.text, "html.parser")
        canonical = soup.find("link", rel="canonical")
        robots = soup.find("meta", attrs={"name": "robots"})
        title = soup.title.get_text(" ", strip=True) if soup.title else ""
        h1 = [x.get_text(" ", strip=True) for x in soup.find_all("h1")]
        text = soup.get_text(" ", strip=True)
        rows.append({
            "path": path,
            "url": url,
            "status": response.status_code,
            "final_url": response.url,
            "title": title,
            "h1": h1,
            "canonical": canonical.get("href") if canonical else None,
            "robots": robots.get("content") if robots else None,
            "text_length": len(text),
            "contains_上製本箱": "上製本箱" in text,
            "contains_貼り箱": "貼り箱" in text,
        })
    except Exception as exc:
        rows.append({"path": path, "url": url, "error": str(exc)})
OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
for row in rows:
    print(row["path"], row.get("status", "ERROR"), "|", row.get("title", row.get("error", "")), "| H1:", row.get("h1"))
print("Wrote", OUT)
