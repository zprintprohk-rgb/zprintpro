from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup
import requests, json, re, time

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / ".kimi-work" / "seven-clusters-20261026" / "page-probe.json"
BASE = "https://zprintpro.com"
PATHS = [
    "/robots.txt",
    "/en/product/small-batch-stickers/", "/zh-hk/category/stickers/", "/ja/product/waterproof-stickers/",
    "/en/product/doujinshi-printing/", "/ja/product/doujinshi-printing/", "/zh-hk/product/doujinshi-printing/", "/ja/comiket-c109/",
    "/en/product/saddle-stitch-booklets/", "/en/product/exercise-books/", "/ja/blog/textbook-printing-guide/", "/zh-hk/category/books/",
    "/en/product/catalog-printing/", "/en/blog/catalog-printing-china-supplier-guide/",
    "/en/product/a2-posters/", "/zh-hk/category/posters/", "/zh-hk/category/flyers/",
    "/ja/product/graduation-yearbook/", "/ja/nengajo-2027/",
    "/en/blog/eco-paper-bag-gsm/", "/zh-hk/category/paper-bags/", "/zh-hk/product/handle-bags/", "/ja/category/paper-bags/",
]
RISK = re.compile(r"¥7,500|24.hour|24時間|free sample|IPX[46]|500,000|50万|December 29|12月29|100×148|127×178", re.I)

def one(path):
    url = BASE + path
    started = time.time()
    try:
        r = requests.get(url, timeout=35, headers={"User-Agent": "Mozilla/5.0 (compatible; ZprintProAudit/1.0)"})
        ctype = r.headers.get("content-type", "")
        row = {"path": path, "url": url, "status": r.status_code, "elapsed_s": round(time.time()-started, 2), "content_type": ctype}
        if "html" not in ctype:
            row["text"] = r.text[:1000]
            return row
        soup = BeautifulSoup(r.text, "html.parser")
        title = soup.title.get_text(" ", strip=True) if soup.title else ""
        desc = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
        canonical = soup.find("link", rel=lambda x: x and "canonical" in x)
        robots = soup.find("meta", attrs={"name": re.compile("^robots$", re.I)})
        h1 = [x.get_text(" ", strip=True) for x in soup.find_all("h1")]
        text = soup.get_text(" ", strip=True)
        row.update({
            "title": title,
            "description": desc.get("content", "") if desc else "",
            "h1": h1,
            "canonical": canonical.get("href", "") if canonical else "",
            "robots": robots.get("content", "") if robots else "",
            "text_length": len(text),
            "risk_snippets": [text[max(0,m.start()-100):m.end()+160] for m in list(RISK.finditer(text))[:8]],
        })
        return row
    except Exception as e:
        return {"path": path, "url": url, "error": repr(e), "elapsed_s": round(time.time()-started, 2)}

rows = []
with ThreadPoolExecutor(max_workers=5) as ex:
    futures = {ex.submit(one, p): p for p in PATHS}
    for f in as_completed(futures):
        row = f.result(); rows.append(row)
        print(row["path"], row.get("status", "ERR"), row.get("title", "")[:80], "RISK" if row.get("risk_snippets") else "")
rows.sort(key=lambda x: PATHS.index(x["path"]))
payload = {"probed_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "method": "Live HTTP GET; HTML head/body parsed. HTTP 200 and self-canonical do not prove Google indexing.", "pages": rows}
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
print("WROTE", OUT)
