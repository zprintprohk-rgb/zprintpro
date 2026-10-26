from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
import re
import csv
import json
from PIL import Image

ROOT = Path(r"F:\zprintpro-nextjs")
REPORT = ROOT / "docs" / "2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md"
text = REPORT.read_text(encoding="utf-8")
errors = []
checked = {"local_links": 0, "web_links": 0, "images": 0}

required_sections = [
    "## 数据来源", "## 一、执行摘要", "## 二、数据口径", "## 三、对千问附件",
    "## 四、线上 P0", "## 五、全球竞品", "## 六、三语主 URL", "## 七、统一资源排序",
    "## 八、SEO／AEO／GEO", "## 九、30 天最优路线图", "## 十、DeepSeek 4.1 Flash 原子执行包",
    "## 十一、KPI、停止规则与 Plan B", "## 十二、K3 待拍板清单"
]
for section in required_sections:
    if section not in text:
        errors.append(f"missing section: {section}")

required_values = [
    "1,997／1,855", "663／570", "49／**4.77**／0", "39／**10.21**／0",
    "15／**9.60**／0", "170／19.06／0", "16／**5.00**／0", "14／80.57／0",
    "2026-09-28—10-25", "2026-08-31—09-27", "2026-10-26—11-24",
    "zh 纸袋 20%", "en 同人 18%", "zh 海报／即日 16%"
]
for value in required_values:
    if value not in text:
        errors.append(f"missing key value: {value}")

# Local deep links: verify path, exact text, and md-line when supplied.
for match in re.finditer(r"\[[^\]]+\]\((kimi-cite://[^)]+)\)", text):
    uri = re.sub(r'\s+"citation"$', '', match.group(1))
    parsed = urlparse(uri)
    qs = parse_qs(parsed.query)
    if parsed.scheme != "kimi-cite":
        continue
    if parsed.netloc == "web":
        checked["web_links"] += 1
        if not qs.get("url", [""])[0].startswith("https://"):
            errors.append(f"bad web citation: {uri}")
        continue
    path = qs.get("path", [""])[0]
    if not path:
        errors.append(f"citation has no path: {uri}")
        continue
    p = Path(path)
    if not p.exists():
        errors.append(f"citation path missing: {path}")
        continue
    checked["local_links"] += 1
    snippet = qs.get("text", [""])[0]
    if snippet:
        try:
            content = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = p.read_text(encoding="utf-8-sig")
        if snippet not in content:
            errors.append(f"citation text not found: {path} :: {snippet[:100]}")
        if parsed.netloc == "md-line" and "line" in qs:
            line_no = int(qs["line"][0])
            lines = content.splitlines()
            if not (1 <= line_no <= len(lines)) or snippet not in lines[line_no-1]:
                errors.append(f"citation line mismatch: {path}:{line_no}")

# Reject accidental bare web URLs in prose (deep-link query values are excluded).
prose = re.sub(r"kimi-cite://[^\s)]+", "", text)
for url in re.findall(r"https?://[^\s)]+", prose):
    errors.append(f"bare URL: {url}")

# Images and dimensions.
for rel in re.findall(r"!\[[^\]]*\]\(([^)]+)\)", text):
    p = REPORT.parent / rel
    if not p.exists():
        errors.append(f"image missing: {rel}")
        continue
    checked["images"] += 1
    with Image.open(p) as im:
        if im.size != (1600, 900):
            errors.append(f"unexpected image dimensions: {rel} {im.size}")
        if p.stat().st_size > 3_000_000:
            errors.append(f"image too large: {rel}")

# Verify report values against the evidence JSON for the most consequential rows.
evidence = json.loads((ROOT / ".kimi-work/seven-clusters-20261026/seven-cluster-local-evidence.json").read_text(encoding="utf-8"))
queries = {(q["locale"], q["query"]): q for q in evidence["queries"]}
expected = {
    ("en", "doujinshi printing"): (39, 10.205128205128204, 0),
    ("en", "saddle stitch booklet printing"): (15, 9.6, 0),
    ("ja", "コミケ 印刷"): (170, 19.06129411764706, 0),
    ("ja", "卒アル販売"): (16, 5.0, 0),
    ("zh-hk", "邊度有紙袋買"): (34, 8.471764705882352, 0),
}
for key, (imps, pos, clicks) in expected.items():
    q = queries.get(key)
    if not q or q["impressions_cur"] != imps or abs(q["position_cur"] - pos) > 1e-9 or q["clicks_cur"] != clicks:
        errors.append(f"evidence mismatch: {key}")

# Guardrails against accidental guarantees or fabricated precision.
for forbidden in ["保证首页", "保证上首页", "AI 引用率 100%", "C109 50 万人", "预计超过 500,000"]:
    if forbidden in text:
        errors.append(f"forbidden claim: {forbidden}")

print(json.dumps({"report": str(REPORT), "bytes": REPORT.stat().st_size, **checked,
                  "errors": errors, "verdict": "PASS" if not errors else "FAIL"}, ensure_ascii=False, indent=2))
raise SystemExit(1 if errors else 0)
