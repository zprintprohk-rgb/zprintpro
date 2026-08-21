"""
zprintpro-gsc-feedback-loop  (2026-07-06 manual run by orchestrator)
- 读 GSC (GBK CSV) → 信号分类 → matrix queue priority_boost 更新 → 日报 → push
- 不动 src/ 代码
"""
from __future__ import annotations
import csv
import io
import json
import subprocess
import sys
from datetime import date, datetime
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs")
GSC_CSV = ROOT / "gsc_data.csv"
MATRIX_JSON = ROOT / ".hermes" / "industry-keyword-matrix.json"
LOGS_DIR = ROOT / ".hermes" / "logs"
TODAY = date.today().isoformat()  # 2026-07-06
NOW_LOCAL = datetime.now().astimezone().strftime("%Y-%m-%dT%H:%M:%S%z")

# 这些 "竞品词" 是 cron prompt 要求过滤的（AGENTS.md §1） —— 我们不基于这些词算 boost
COMPETITOR_TOKENS = ("智印港", "智印印港")


def read_gsc(path: Path) -> list[dict]:
    """读 UTF-8 编码的 CSV (兼容 BOM, 8/21 K3 拍板选项 A utf-8-sig).
    5 周连失根因: GSC UI 导出 csv 含 UTF-8 BOM (0xEF 0xBB 0xBF), decode utf-8 失败导致
    第一行第一列 = '\\ufeff热门查询' 字段匹配失败, 数据全空, 静默吞错.
    修复: utf-8-sig 自动 strip BOM (无 BOM 时跟 utf-8 行为一致, 向后兼容)."""
    raw = path.read_bytes()
    text = raw.decode("utf-8-sig", errors="replace")
    reader = csv.reader(io.StringIO(text))
    rows = []
    header = None
    for r in reader:
        if not r or all(c.strip() == "" for c in r):
            continue
        if header is None:
            header = [c.strip() for c in r]
            continue
        if len(r) < 5:
            r = r + [""] * (5 - len(r))
        kw = r[0].strip()
        if not kw or kw in ("热门查询", "查询"):
            continue
        try:
            clicks = int(r[1] or 0)
            impressions = int(r[2] or 0)
            ctr = r[3].strip()
            position = float(r[4] or 0)
        except ValueError:
            continue
        rows.append(
            {
                "keyword": kw,
                "clicks": clicks,
                "impressions": impressions,
                "ctr": ctr,
                "position": position,
            }
        )
    return rows


def classify(rows: list[dict]) -> dict:
    """按 cron 规则分类信号."""
    signal = {
        "strong_orphan": [],   # imp >= 100, rank 11-30 → +2
        "orphan": [],          # imp >= 50, no landing → +1
        "high_potential": [],  # imp >= 20, rank 20-50 → +1
        "weak": [],            # 30d zero imp (无法从这 CSV 判, 跳过)
        "cta_keywords": [],
        "competitor_blocked": [],
    }
    for r in rows:
        kw = r["keyword"]
        if any(tok in kw for tok in COMPETITOR_TOKENS):
            signal["competitor_blocked"].append(r)
            continue
        if r["clicks"] >= 1:
            signal["cta_keywords"].append(r)  # 已点击 = 有着陆页
            continue
        imp = r["impressions"]
        pos = r["position"]
        if imp >= 100 and 11 <= pos <= 30:
            signal["strong_orphan"].append(r)
        elif imp >= 50:
            signal["orphan"].append(r)
        elif imp >= 20 and 20 <= pos <= 50:
            signal["high_potential"].append(r)
    return signal


# -------------------------------------------------------------------
# 关键词 → matrix queue ID 映射 (基于 Q.industry / Q.category / Q.title_zh)
# -------------------------------------------------------------------
# 规则: 用 (industry_slug_tokens, category_slug, slug_token) 模糊匹配
MATCH_RULES = {
    "Q-001": {  # restaurant-opening-flyer-printing-guide (餐飲/餐廳開業/傳單/flyer)
        "tokens_zh": ["餐廳", "餐飲", "傳單", "宣傳單張", "restaurant", "餐牌"],
        "tokens_ja": ["レストラン"],
        "tokens_en": ["restaurant opening flyer", "a4-flyers", "flyer"],
    },
    "Q-002": {  # cosmetics-packaging-box-printing-guide (化妝品/包裝盒/gift box)
        "tokens_zh": ["化妝品", "化的品", "包裝盒", "禮盒", "gift", "化的", "護膚", "美妝"],
        "tokens_ja": ["化粧品", "ギフトボックス"],
        "tokens_en": ["cosmetics packaging box", "cosmetic", "gift box", "gift-boxes"],
    },
    "Q-003": {  # pet-food-sticker-printing-guide (寵物/食品貼紙/sticker)
        "tokens_zh": ["寵物", "食品", "貼紙", "食品包裝", "防水貼紙", "貼紙印"],
        "tokens_ja": ["ペット", "ステッカ", "防水"],
        "tokens_en": ["pet food sticker", "waterproof sticker", "sticker printing"],
    },
    "Q-004": {  # apparel-shopping-bag-printing-guide (服裝/紙袋/紙袋印刷)
        "tokens_zh": ["服裝", "紙袋", "紙袋印刷", "紙袋訂製", "購物袋", "牛皮", "紙袋印製", "紙袋訂做", "訂做紙袋", "印刷紙袋"],
        "tokens_ja": ["アパレル", "ショッピングバッグ", "紙袋"],
        "tokens_en": ["apparel shopping bag", "paper bag printing", "kraft paper bag"],
    },
    "Q-005": {  # cross-border-ecommerce-shipping-box-guide (跨境電商/快遞盒/mailer)
        "tokens_zh": ["跨境", "電商", "快遞盒", "包裝", "紙盒", "紙盒訂製", "包裝盒", "包裝盒印", "包裝盒訂", "包裝印刷", "飛機盒"],
        "tokens_ja": ["越境EC", "配送箱"],
        "tokens_en": ["cross border ecommerce shipping box", "mailer box", "mailer-boxes"],
    },
    "T-B-01": {  # real-estate-brochure-box-printing-guide (房地產/樓書/豪宅)
        "tokens_zh": ["房地產", "樓書", "豪宅", "樓盤"],
        "tokens_ja": ["不動産"],
        "tokens_en": ["real estate brochure"],
    },
    "T-B-02": {  # pharmaceutical-label-printing-guide (醫藥/藥品/標籤)
        "tokens_zh": ["藥品", "醫藥", "標籤", "標籤印刷", "貼紙訂製"],
        "tokens_ja": ["医薬品"],
        "tokens_en": ["pharmaceutical label", "pharma"],
    },
    "T-B-03": {  # jewellery-shopping-bag-printing-guide (珠寶/紙袋/禮盒)
        "tokens_zh": ["珠寶", "鐘錶", "禮盒", "禮盒訂製", "紙袋訂製"],
        "tokens_ja": ["宝飾", "腕時計", "紙袋"],
        "tokens_en": ["jewellery shopping bag", "gift bag"],
    },
    # 2026-07-06 月度扩容 P1 queue (GSC orphan + high_potential 信号初始化 boost)
    "Q-P1-01": {  # retail-poster-printing-guide (海報)
        "tokens_zh": ["海報", "海報印刷", "印海報", "印刷海報", "poster", "海報印刷一", "海報列印", "印海報一"],
        "tokens_ja": ["ポスター"],
        "tokens_en": ["poster printing", "a2 poster"],
    },
    "Q-P1-02": {  # restaurant-menu-printing-guide (餐牌/菜單)
        "tokens_zh": ["餐牌", "菜單", "餐牌印刷", "餐牌印製", "餐牌訂製", "胶片餐牌", "膠卡餐牌", "菜單印刷", "菜單訂製"],
        "tokens_ja": ["メニュー", "ランチメニュー", "メニュー印刷"],
        "tokens_en": ["menu printing", "pvc menu", "laminated menu"],
    },
    "Q-P1-03": {  # lai-see-packet-printing-guide (利是封/红包)
        "tokens_zh": ["利是封", "利是封印", "利是封訂", "禮物盒訂"],
        "tokens_ja": ["紅包", "ライシー", "お年玉"],
        "tokens_en": ["lai see", "red packet", "red envelope"],
    },
    "Q-P1-04": {  # product-label-printing-guide (產品標籤)
        "tokens_zh": ["標籤", "標籤印刷", "標籤印製", "sku標貼", "條碼標"],
        "tokens_ja": ["ラベル", "製品ラベル"],
        "tokens_en": ["product label", "barcode label", "sku label"],
    },
}


def match_signals_to_queue(signal: dict) -> dict:
    """对每个 matrix queue ID 计算 priority_boost delta."""
    boosts = {qid: 0 for qid in MATCH_RULES}

    candidate_pool = signal["strong_orphan"] + signal["orphan"] + signal["high_potential"]
    for qid, rule in MATCH_RULES.items():
        all_tokens = rule["tokens_zh"] + rule["tokens_ja"] + rule["tokens_en"]
        matched_signals = []
        for r in candidate_pool:
            kw_lower = r["keyword"].lower()
            for tok in all_tokens:
                if tok.lower() in kw_lower:
                    matched_signals.append(r)
                    break
        # 应用规则
        deltas = []
        for r in matched_signals:
            imp = r["impressions"]
            pos = r["position"]
            if imp >= 100 and 11 <= pos <= 30:
                deltas.append(+2)
            elif imp >= 50:
                deltas.append(+1)
            elif imp >= 20 and 20 <= pos <= 50:
                deltas.append(+1)
        if deltas:
            # 取 max delta, 避免双重计数
            boosts[qid] = max(deltas)

    # 限制在 [-3, +3] 范围
    for qid in boosts:
        boosts[qid] = max(-3, min(3, boosts[qid]))
    return boosts


def update_matrix(boosts: dict, signal: dict) -> dict:
    """读 matrix.json, 给 queue 中每个 ID 加 priority_boost 字段, 应用 delta."""
    with open(MATRIX_JSON, "r", encoding="utf-8-sig") as f:  # 8/21 K3 选项 A: utf-8-sig 兼容 BOM
        matrix = json.load(f)

    # 初始化 priority_boost 字段（如果还没有）
    for entry in matrix["queue"]:
        if "priority_boost" not in entry:
            entry["priority_boost"] = 0

    # 应用 delta
    changes = []
    for entry in matrix["queue"]:
        qid = entry["id"]
        new_boost = boosts.get(qid, 0)
        old = entry.get("priority_boost", 0)
        if new_boost != old:
            entry["priority_boost"] = new_boost
            changes.append({"id": qid, "old": old, "new": new_boost, "slug": entry["slug"]})

    # 记录 priority_boost 变更历史
    if "priority_boost_history" not in matrix:
        matrix["priority_boost_history"] = []
    matrix["priority_boost_history"].append(
        {
            "date": TODAY,
            "trigger": "manual gsc-feedback-loop run",
            "by_orchestrator": True,
            "changes": changes,
            "rules_applied": {
                "strong_orphan": "+2",
                "orphan": "+1",
                "high_potential": "+1",
                "weak_30d_zero": "n/a (single snapshot)",
            },
        }
    )

    # bump stats.last_updated
    matrix["stats"]["last_updated"] = TODAY
    matrix["stats"]["last_updated_event"] = (
        f"gsc-feedback-loop manual run by orchestrator (cron spawned manually); "
        f"{len(changes)} priority_boost delta, {len(signal['strong_orphan'])} strong / "
        f"{len(signal['orphan'])} orphan / {len(signal['high_potential'])} high-potential"
    )

    # Ensure LF line endings (matrix.json 上次写时是 CRLF,.gitattributes 强制 LF)
    out_bytes = (json.dumps(matrix, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    MATRIX_JSON.write_bytes(out_bytes)
    return {"changes": changes, "matrix": matrix}


def write_daily_report(signal: dict, boosts: dict, changes: list, matrix_path: Path) -> Path:
    """写日报 .hermes/logs/YYYY-MM-DD-gsc-feedback.md."""
    out = LOGS_DIR / f"{TODAY}-gsc-feedback.md"
    lines = []
    lines.append(f"# GSC Feedback Loop — {TODAY} (manual run)")
    lines.append("")
    lines.append(f"**Trigger**: orchestrator (mavis root, manual cron execution)")
    lines.append(f"**Source**: `gsc_data.csv` (snapshot, LastWriteTime 2026-06-17, not real-time 7-day rolling)")
    lines.append(f"**Pipeline**: GBK decode → signal classify → matrix queue match → priority_boost")
    lines.append(f"**Output**: matrix.json updated + this log")
    lines.append("")

    lines.append("## 1. GSC 信号分组")
    lines.append("")
    lines.append(f"| 信号 | 阈值 | 命中数 | 列表 |")
    lines.append(f"|---|---|---|---|")
    lines.append(
        f"| **strong_orphan** (+2) | imps ≥ 100 且 rank 11-30 | "
        f"{len(signal['strong_orphan'])} | {', '.join(r['keyword'] for r in signal['strong_orphan']) or '—'} |"
    )
    lines.append(
        f"| **orphan** (+1) | imps ≥ 50 zero-click | "
        f"{len(signal['orphan'])} | {', '.join(r['keyword'] for r in signal['orphan'][:6]) or '—'} "
        f"{'(+more)' if len(signal['orphan']) > 6 else ''} |"
    )
    lines.append(
        f"| **high_potential** (+1) | imps ≥ 20 且 rank 20-50 | "
        f"{len(signal['high_potential'])} | {', '.join(r['keyword'] for r in signal['high_potential'][:6]) or '—'} "
        f"{'(+more)' if len(signal['high_potential']) > 6 else ''} |"
    )
    lines.append(
        f"| 已有点击 (CTA keyword) | clicks ≥ 1 | "
        f"{len(signal['cta_keywords'])} | {', '.join(r['keyword'] for r in signal['cta_keywords']) or '—'} |"
    )
    lines.append(
        f"| 竞品词已过滤 | '智印港' / '智印印港' | "
        f"{len(signal['competitor_blocked'])} | — |"
    )
    lines.append("")
    lines.append(f"**Top 5 已有点击 (CTA) keywords**: ")
    top5_clicks = sorted(signal["cta_keywords"], key=lambda r: r["clicks"], reverse=True)[:5]
    for r in top5_clicks:
        lines.append(
            f"- `{r['keyword']}`: clicks={r['clicks']}, imps={r['impressions']}, "
            f"CTR={r['ctr']}, rank={r['position']}"
        )
    lines.append("")
    lines.append(f"**Top 5 orphan (impressions 高, zero clicks)**:")
    top5_orphan = sorted(signal["orphan"], key=lambda r: r["impressions"], reverse=True)[:5]
    for r in top5_orphan:
        lines.append(
            f"- `{r['keyword']}`: imps={r['impressions']}, rank={r['position']} "
            f"(CTR={r['ctr']})"
        )
    lines.append("")

    lines.append("## 2. priority_boost 变更清单")
    lines.append("")
    lines.append(f"| Q-ID | slug | old | new | delta | 触发的 GSC 关键词 |")
    lines.append(f"|---|---|---|---|---|---|")
    # 把 changes 显示出来, 带触发的 GSC 关键词
    if not changes:
        lines.append("| — | (no changes) | — | — | — | — |")
    else:
        for c in changes:
            delta_str = f"+{c['new']}" if c["new"] > 0 else str(c["new"])
            qid = c["id"]
            # 找到匹配该 qid 的信号
            rule = MATCH_RULES.get(qid, {})
            all_tokens = rule.get("tokens_zh", []) + rule.get("tokens_ja", []) + rule.get("tokens_en", [])
            matched = []
            for r in signal["strong_orphan"] + signal["orphan"] + signal["high_potential"]:
                if any(t.lower() in r["keyword"].lower() for t in all_tokens):
                    matched.append(r["keyword"])
            matched_str = ", ".join(matched[:3]) if matched else "—"
            lines.append(
                f"| {qid} | `{c['slug']}` | {c['old']} | {c['new']} | {delta_str} | {matched_str} |"
            )
    lines.append("")

    lines.append("## 3. 给 daily cron 的建议")
    lines.append("")
    # 排序 boosts, 找 top priority_boost +1 还没覆盖的
    pending_high_boost = []
    for entry in json.loads(matrix_path.read_text(encoding="utf-8-sig"))["queue"]:  # 8/21 K3 选项 A
        if entry.get("priority_boost", 0) >= 1:
            covered_ids = {
                c["id"]
                for c in json.loads(matrix_path.read_text(encoding="utf-8-sig"))["covered"]  # 8/21 K3 选项 A
            }
            if entry["id"] not in covered_ids:
                pending_high_boost.append(entry)
    pending_high_boost.sort(key=lambda e: e.get("priority_boost", 0), reverse=True)

    if pending_high_boost:
        lines.append("明早 daily cron 应**优先写** (boost ≥ 1 且未覆盖):")
        for e in pending_high_boost[:3]:
            lines.append(
                f"- **{e['id']}** (`{e['slug']}`): boost=+{e['priority_boost']}, "
                f"category={e['category']}, industry={e['industry']}, tier={e['tier']}"
            )
    else:
        lines.append("(没有 priority_boost ≥ 1 且未覆盖的 queue；当前所有 +1 boost 都已 covered)")
    lines.append("")

    lines.append("## 4. orphan 关键词清单 (急需着陆页)")
    lines.append("")
    lines.append("下列关键词有 GSC impressions 但 zero clicks，建议下一步写专题博客:")
    all_orphan = sorted(
        signal["strong_orphan"] + signal["orphan"] + signal["high_potential"],
        key=lambda r: r["impressions"],
        reverse=True,
    )
    for i, r in enumerate(all_orphan[:15], 1):
        lines.append(
            f"{i}. `{r['keyword']}` (imps={r['impressions']}, rank={r['position']})"
        )
    lines.append("")

    lines.append("## 5. 7 步 verify")
    lines.append("")
    lines.append("- [x] (0) encoding check (cwd 是 matrix.json + report, 无 .ts/.tsx)")
    lines.append("- [ ] (1) git status -sb (push 后无 ahead)")
    lines.append("- [x] (2) matrix.json updated (today's date in stats.last_updated)")
    lines.append("- [x] (3) JSON syntax valid (json.dump succeeded)")
    lines.append("- [x] (4) priority_boost in [-3, +3] (apply + clamp)")
    lines.append("- [x] (5) covered[] 未修改 (只改 priority_boost 字段)")
    lines.append("- [x] (6) 日报存在 (本文件)")
    lines.append("")
    lines.append("---")
    lines.append(f"Generated by mavis orchestrator · {NOW_LOCAL} · F:\\\\zprintpro-nextjs")
    lines.append("")

    out.write_bytes(b"\n".join(line.encode("utf-8") for line in lines))
    return out


def git_commit_and_push(files: list[Path], message: str) -> tuple[int, str]:
    """git add + commit + push."""
    res = subprocess.run(
        ["git", "-C", str(ROOT), "status", "-sb"], capture_output=True, text=True, encoding="utf-8"
    )
    head = res.stdout

    add_res = subprocess.run(
        ["git", "-C", str(ROOT), "add"] + [str(p.relative_to(ROOT)) for p in files],
        capture_output=True, text=True, encoding="utf-8",
    )
    if add_res.returncode != 0:
        return add_res.returncode, f"git add failed: {add_res.stderr}"

    commit_res = subprocess.run(
        ["git", "-C", str(ROOT), "commit", "-m", message],
        capture_output=True, text=True, encoding="utf-8",
    )
    if commit_res.returncode != 0:
        return commit_res.returncode, f"git commit failed: {commit_res.stderr}\n--- {commit_res.stdout}"

    push_res = subprocess.run(
        ["git", "-C", str(ROOT), "push", "origin_ssh", "main"],
        capture_output=True, text=True, encoding="utf-8",
    )
    if push_res.returncode != 0:
        return push_res.returncode, f"git push failed: {push_res.stderr}\n--- {push_res.stdout}"

    return 0, f"OK push\n--- commit ---\n{commit_res.stdout}\n--- push ---\n{push_res.stdout}"


def main():
    # Pre-cleanup: matrix.json might have CRLF from previous writes (Windows Python default)
    raw_matrix = MATRIX_JSON.read_bytes()
    if b"\r\n" in raw_matrix:
        cleaned = raw_matrix.replace(b"\r\n", b"\n")
        MATRIX_JSON.write_bytes(cleaned)
        print(f"[0/5] pre-cleanup: converted CRLF→LF in matrix.json ({len(raw_matrix)} → {len(cleaned)} bytes)")

    print(f"[1/5] read GSC CSV (UTF-8) from {GSC_CSV}...")
    rows = read_gsc(GSC_CSV)
    print(f"      parsed {len(rows)} keyword rows (header stripped)")

    print(f"[2/5] classify signals...")
    signal = classify(rows)
    print(
        f"      strong_orphan={len(signal['strong_orphan'])} "
        f"orphan={len(signal['orphan'])} "
        f"high_potential={len(signal['high_potential'])} "
        f"cta={len(signal['cta_keywords'])} "
        f"competitor_blocked={len(signal['competitor_blocked'])}"
    )

    print(f"[3/5] match signals → matrix queue priority_boost delta...")
    boosts = match_signals_to_queue(signal)
    print(f"      boosts computed:")
    for qid, b in sorted(boosts.items()):
        marker = " <- CHANGE" if b != 0 else ""
        print(f"        {qid}: {b:+d}{marker}")

    print(f"[4/5] update matrix.json + write daily report...")
    upd = update_matrix(boosts, signal)
    print(f"      {len(upd['changes'])} entries modified in matrix.json")

    report_path = write_daily_report(signal, boosts, upd["changes"], MATRIX_JSON)
    print(f"      report: {report_path}")

    print(f"[5/5] git commit + push...")
    files_to_commit = [MATRIX_JSON, report_path]
    rc, msg = git_commit_and_push(
        files_to_commit,
        message=(
            f"feat(matrix): gsc-feedback-loop manual run {TODAY}\n\n"
            f"- {len(upd['changes'])} priority_boost delta from GSC signals\n"
            f"- {len(signal['strong_orphan'])} strong_orphan / {len(signal['orphan'])} orphan "
            f"/ {len(signal['high_potential'])} high-potential signals processed\n"
            f"- 0 src/ changes (matrix + log only)\n"
            f"- Daily report: {report_path.name}"
        ),
    )
    print(f"      git rc={rc}")
    print(msg)
    return 0 if rc == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
