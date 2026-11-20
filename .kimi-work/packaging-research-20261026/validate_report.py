from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote
import re
import sys
from PIL import Image

ROOT = Path(r"F:\zprintpro-nextjs")
REPORT = ROOT / "docs" / "2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md"
text = REPORT.read_text(encoding="utf-8")
errors = []
notes = []

required_sections = [
    "执行摘要", "数据口径", "对两份千问方案的逐项裁决", "全球竞品",
    "三语主 URL", "SEO／AEO／GEO 三层打法", "30 天最优执行路线图",
    "DeepSeek 执行层原子任务包", "KPI、验证与停止规则", "K3 必须拍板",
]
for section in required_sections:
    if section not in text:
        errors.append(f"missing section: {section}")

required_evidence = [
    "43.53", "40.23", "27.86", "35.29", "30.31", "28.72",
    "34.09", "44.50", "26.05", "24.46", "94 展示", "18.44",
    "electronics packaging supplier", "food packaging supplier",
    "クラフト紙 パッケージ印刷", "食品包裝訂製", "貼り箱（リジッドボックス）",
]
for item in required_evidence:
    if item not in text:
        errors.append(f"missing evidence: {item}")

# Rejected recommendations must not survive as affirmative instructions.
for forbidden in ["30 天首页保证", "80% 资源转移", "保证首页", "承诺首页排名"]:
    if forbidden in text:
        errors.append(f"forbidden claim: {forbidden}")

# Local images must exist, be nontrivial and have the intended dimensions.
images = re.findall(r"!\[[^\]]*\]\(([^)]+)\)", text)
if len(images) != 2:
    errors.append(f"expected 2 local images, found {len(images)}")
for rel in images:
    if "://" in rel:
        continue
    p = (REPORT.parent / rel).resolve()
    if not p.exists() or p.stat().st_size < 10_000:
        errors.append(f"missing/small image: {p}")
        continue
    with Image.open(p) as im:
        if im.size != (1600, 900):
            errors.append(f"unexpected image dimensions: {p} {im.size}")
        notes.append(f"image OK: {p.name}, {p.stat().st_size} bytes, {im.size}")

# Validate local citation targets and, where supplied, exact text snippets.
links = re.findall(r"\[[^\]]+\]\((kimi-cite://.*?)(?:\s+\"citation\")?\)", text)
local_count = 0
web_count = 0
for link in links:
    parsed = urlparse(link)
    qs = parse_qs(parsed.query)
    if parsed.scheme != "kimi-cite":
        errors.append(f"bad citation scheme: {link}")
        continue
    if parsed.netloc == "web":
        web_count += 1
        if "url" not in qs:
            errors.append(f"web citation lacks URL: {link}")
        continue
    local_count += 1
    if "path" not in qs:
        errors.append(f"local citation lacks path: {link}")
        continue
    p = Path(qs["path"][0])
    if not p.exists():
        errors.append(f"citation path missing: {p}")
        continue
    if "text" in qs and p.suffix.lower() in {".md", ".txt", ".json", ".csv", ".ts", ".tsx"}:
        snippet = qs["text"][0]
        source = p.read_text(encoding="utf-8", errors="replace")
        if snippet not in source:
            errors.append(f"citation snippet not found in {p.name}: {snippet[:100]}")

# Raw web URLs should only appear URL-encoded inside web deep links.
without_cites = re.sub(r"\[[^\]]+\]\(kimi-cite://[^)]+\)", "", text)
raw_urls = re.findall(r"https?://", without_cites)
if raw_urls:
    errors.append(f"found {len(raw_urls)} bare web URLs outside citations")

if web_count < 10:
    errors.append(f"expected at least 10 web citations, found {web_count}")
if local_count < 10:
    errors.append(f"expected at least 10 local citations, found {local_count}")

notes.append(f"report: {REPORT.stat().st_size} bytes, {len(text.splitlines())} lines")
notes.append(f"citations: {local_count} local, {web_count} web")

for note in notes:
    print(note)
if errors:
    for error in errors:
        print(f"ERROR: {error}")
    sys.exit(1)
print("VALIDATION PASS")
