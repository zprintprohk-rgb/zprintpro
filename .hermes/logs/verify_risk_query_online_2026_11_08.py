import datetime as dt
import html as html_lib
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")
OUT = ROOT / ".hermes" / "logs" / "risk-query-online-verify-2026-11-08.json"
COMMIT = "74ffa5a9668034e47a3e93b6d0c76dac902e4c91"
BASE = "https://zprintpro.com"

PAGES = [
    {
        "key": "flyers_zh_hk",
        "path": "/zh-hk/blog/flyer-printing-guide/",
        "required": {
            "a4_single_price": "HK$0.35 起",
            "a5_single_price": "HK$0.25 起",
            "quantity_tier_note": "單張成本隨數量階梯變動：以上『起』為 100 張檔牌價，5,000 張按 5 折計算。",
        },
        "forbidden": {},
    },
    {
        "key": "textbook_ja",
        "path": "/ja/blog/textbook-printing-guide/",
        "required": {
            "approved_price": "基本仕様 ¥1,288〜",
            "price_condition_header": "価格条件",
        },
        "forbidden": {"old_hkd_range": "HK$5-50/冊"},
    },
    {
        "key": "doujinshi_ja",
        "path": "/ja/product/doujinshi-printing/",
        "required": {
            "order_start_price": "¥7,500〜/注文〜",
            "not_per_copy_note": "1部あたりの単価ではありません",
        },
        "forbidden": {"old_per_copy_price": "¥7,500〜/部〜"},
    },
    {
        "key": "a2_en",
        "path": "/en/product/a2-posters/",
        "required": {
            "approved_h1": "A2 Posters 10+ | Retail & Events | ZprintPro",
            "moq_body": "10-poster MOQ",
            "minimum_body": "10-poster minimum",
            "faq_moq": "10 posters",
        },
        "forbidden": {"old_moq_hyphen": "100-poster", "old_moq_words": "100 posters"},
    },
]


def one(pattern, text, flags=re.I | re.S):
    match = re.search(pattern, text, flags)
    return html_lib.unescape(match.group(1).strip()) if match else None


def clean(fragment):
    if fragment is None:
        return None
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html_lib.unescape(fragment))).strip()


results = []
for page in PAGES:
    url = BASE + page["path"]
    record = {"key": page["key"], "requested_url": url, "commit": COMMIT}
    try:
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; ZprintProOnlineVerify/1.0)",
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "en,zh-HK,ja;q=0.8",
                "Cache-Control": "no-cache",
            },
        )
        with urllib.request.urlopen(request, timeout=45) as response:
            raw = response.read().decode("utf-8", errors="replace")
            record["http_status"] = response.status
            record["final_url"] = response.geturl()
            record["cf_cache_status"] = response.headers.get("cf-cache-status")
            record["age"] = response.headers.get("age")
        record["canonical"] = one(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', raw)
        if not record["canonical"]:
            record["canonical"] = one(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', raw)
        record["robots"] = one(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']*)', raw)
        record["meta_description"] = one(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)', raw)
        record["h1"] = [clean(x) for x in re.findall(r"<h1\b[^>]*>(.*?)</h1>", raw, re.I | re.S)]
        markers = {}
        for name, marker in page["required"].items():
            if name == "approved_h1":
                count = sum(marker in h1 for h1 in record["h1"])
            else:
                count = raw.count(marker)
            markers[name] = {"value": marker, "count": count, "pass": count > 0}
        for name, marker in page["forbidden"].items():
            markers[name] = {"value": marker, "count": raw.count(marker), "pass": raw.count(marker) == 0}
        record["markers"] = markers
        record["pass"] = (
            record["http_status"] == 200
            and record["final_url"] == url
            and bool(record["canonical"])
            and (record["robots"] is None or "noindex" not in record["robots"].lower())
            and all(item["pass"] for item in markers.values())
        )
    except Exception as exc:
        record["error"] = f"{type(exc).__name__}: {exc}"
        record["pass"] = False
    results.append(record)
    print(page["key"], "PASS" if record["pass"] else "FAIL", record.get("http_status"), record.get("error", ""))

payload = {
    "verified_at": dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat(timespec="seconds"),
    "commit": COMMIT,
    "method": "Production HTML text assertions; no ranking claim. Flyer assertions target the new single-sided prices and tier note, not the unchanged double-sided range.",
    "overall_pass": all(item["pass"] for item in results),
    "results": results,
}
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("evidence:", OUT)
print("overall_pass:", payload["overall_pass"])
raise SystemExit(0 if payload["overall_pass"] else 2)
