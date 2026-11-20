from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")
ASSETS = ROOT / "docs" / "assets" / "2026-11-20"
REPORT = ROOT / "重要文件" / "2026-11-20-manual-scheduler-rebuild-and-two-week-flywheel.md"
PROMPTS = [
    ROOT / ".hermes" / "cron-prompts" / "harness-daily-growth-20261120.md",
    ROOT / ".hermes" / "cron-prompts" / "harness-independent-review-20261120.md",
    ROOT / ".hermes" / "cron-prompts" / "harness-weekly-monthly-review-20261120.md",
    ROOT / ".hermes" / "cron-prompts" / "harness-blog-single-fix-20261120.md",
]

report = REPORT.read_text(encoding="utf-8")
assert report.strip(), "主报告为空"
for required in [
    "0x800710E0",
    "00:10:00",
    "PT10M",
    "未修改 `src/`",
    "2026-11-20—12-03",
    "数据来源",
    "SOP-10 五问自检",
    "不承诺任何词必进首页",
    "ZP-gsc-feedback",
    "ZP-monthly-matrix",
    *[path.name for path in PROMPTS],
]:
    assert required in report, f"主报告缺少必要内容：{required}"

for prompt in PROMPTS:
    text = prompt.read_text(encoding="utf-8")
    assert text.strip(), f"prompt 为空：{prompt.name}"
    assert "数据来源" in text, f"prompt 缺数据来源字段：{prompt.name}"
    assert "VERDICT / CONSUMED / DELIVERED / NEXT" in text, f"prompt 缺统一报告字段：{prompt.name}"

for name in ["gsc-small-order-term-comparison.json", "gsc-money-queries-and-pages.json"]:
    with (ASSETS / name).open("r", encoding="utf-8") as handle:
        payload = json.load(handle)
    assert isinstance(payload, dict) and payload, f"JSON 无效或为空：{name}"

for relative in [
    "../docs/assets/2026-11-20/gsc-small-order-cluster-comparison.png",
    "../docs/assets/2026-11-20/two-week-coordinated-flywheel.png",
]:
    assert relative in report, f"报告未引用图片：{relative}"
    image = (REPORT.parent / relative).resolve()
    assert image.is_file() and image.stat().st_size > 0, f"图片缺失：{image}"
    assert image.read_bytes()[:8] == b"\x89PNG\r\n\x1a\n", f"不是有效 PNG 文件头：{image}"

for name in [
    "gsc-small-order-term-comparison.csv",
    "gsc-2026-11-19-zero-click-opportunities.csv",
    "gsc-2026-11-19-top-queries.csv",
]:
    path = ASSETS / name
    assert path.is_file() and path.stat().st_size > 0, f"CSV 缺失或为空：{name}"

print("PASS: 主报告、4 份 prompt、2 份 JSON、2 张 PNG 与 3 份 CSV 均通过交付校验。")
print(f"REPORT_BYTES={REPORT.stat().st_size}")
print(f"PROMPTS={len(PROMPTS)}")
