#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Deterministic weekly/monthly strategy review and bounded task dispatch.

This program summarizes observed execution evidence. It does not call an LLM, change
prompts, approve business claims, touch src/, commit, or push. A learning candidate
requires baseline + change + online_verify + retest in the same task record.
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

REQUIRED_LEARNING_FIELDS = ("baseline", "change", "online_verify", "retest")
TERMINAL_TASK_STATUSES = {"DONE", "STOPPED", "CANCELLED"}


def read_json(path, fallback):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return fallback


def read_jsonl(path):
    rows = []
    try:
        with open(path, "r", encoding="utf-8") as fh:
            for line in fh:
                try:
                    if line.strip():
                        rows.append(json.loads(line))
                except ValueError:
                    continue
    except OSError:
        pass
    return rows


def write_text(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    os.replace(tmp, path)


def write_json(path, value):
    write_text(path, json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def parse_day(value):
    match = re.search(r"\d{4}-\d{2}-\d{2}", str(value or ""))
    if not match:
        return None
    try:
        return dt.date.fromisoformat(match.group(0))
    except ValueError:
        return None


def record_day(record):
    return parse_day(record.get("ended_at") or record.get("fired_at"))


def complete_learning_evidence(task):
    evidence = task.get("learning_evidence")
    if not isinstance(evidence, dict):
        return False
    if not all(field in evidence and evidence[field] not in (None, "", False, [], {}) for field in REQUIRED_LEARNING_FIELDS):
        return False
    online = evidence.get("online_verify")
    if isinstance(online, dict):
        if online.get("deployed") is False or online.get("production_deployed") is False:
            return False
        if str(online.get("status") or "").upper() in {"NOT_DEPLOYED", "PENDING", "MISSING", "FAILED"}:
            return False
    return True


def latest_dated_json(logs, prefix, review_day):
    """Return the newest usable dated JSON no later than the review date."""
    try:
        names = os.listdir(logs)
    except OSError:
        return None, {}
    candidates = []
    for name in names:
        match = re.fullmatch(re.escape(prefix) + r"(\d{4}-\d{2}-\d{2})\.json", name)
        if not match:
            continue
        day = parse_day(match.group(1))
        if day and day <= review_day:
            candidates.append((day, name))
    if not candidates:
        return None, {}
    _, name = max(candidates)
    path = os.path.join(logs, name)
    value = read_json(path, None)
    return (path, value) if isinstance(value, dict) else (None, {})


def latest_dated_document(repo, suffix, review_day):
    docs = os.path.join(repo, "docs")
    try:
        names = os.listdir(docs)
    except OSError:
        return None, ""
    candidates = []
    for name in names:
        match = re.fullmatch(r"(\d{4}-\d{2}-\d{2})-" + re.escape(suffix) + r"\.md", name)
        if not match:
            continue
        day = parse_day(match.group(1))
        if day and day <= review_day:
            candidates.append((day, name))
    if not candidates:
        return None, ""
    path = os.path.join(docs, max(candidates)[1])
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            return path, fh.read()
    except OSError:
        return None, ""


def _task_rows(anomaly):
    """tasks may be a list of dicts (legacy 11-04: id/next/status) OR a map
    key->status-string/dict (11-06+: O1..O12 + queue_write). Yields (key, value)
    for both shapes so downstream code never assumes a single shape."""
    tasks = anomaly.get("tasks") or []
    if isinstance(tasks, dict):
        for key, value in tasks.items():
            yield str(key), value
    elif isinstance(tasks, list):
        for row in tasks:
            if isinstance(row, dict):
                key = row.get("task_id") or row.get("id") or "?"
                yield str(key), row


def _task_date_map(anomaly):
    """Unified task_id -> next_check map across both tasks shapes."""
    out = {}
    for key, value in _task_rows(anomaly):
        if isinstance(value, dict):
            out[key] = value.get("next_check") or value.get("next")
        else:
            out[key] = None  # status string carries no concrete next_check
    return out


def money_query_handoffs(anomaly, source, review_day):
    money = anomaly.get("money_words_23_xlsx_28d") or {}
    rows = money.get("rows") or {}
    window = (anomaly.get("kpi_xlsx_4windows") or {}).get("28d", {}).get("window")
    task_dates = _task_date_map(anomaly)
    handoffs = []
    for query, metrics in rows.items():
        if not isinstance(metrics, dict):
            continue
        try:
            impressions = float(metrics.get("imp") or 0)
            clicks = float(metrics.get("clk") or 0)
            position = float(metrics.get("pos"))
        except (TypeError, ValueError):
            continue
        if position <= 10 and impressions > 0 and clicks == 0:
            route = "FIX"
            owner = "ZP-weekly-meta"
            gate = "Record SERP features and the real title/snippet first; change at most one snippet variable after approval"
            next_check = task_dates.get("O4") or task_dates.get("GSC-20261101-O4")
            action = "CTR diagnosis proposal; do not batch-rewrite titles/meta and do not infer conversion"
        elif position > 20:
            route = "MEASURE"
            owner = "ZP-monthly-matrix"
            gate = "Check index, intent, query-by-page attribution and commercial gates; no automatic article, canonical or redirect"
            next_check = None
            action = "Deep-position measurement only; establish a comparable baseline before any content work"
        else:
            continue
        handoffs.append({
            "handoff_id": f"GSC-{route}-{review_day}-{hashlib.sha256(query.encode('utf-8')).hexdigest()[:8]}",
            "route": route,
            "query": query,
            "owner_lane": owner,
            "status": "PROPOSE_ONLY",
            "baseline": {"window": window, "impressions": int(impressions), "clicks": int(clicks), "position": position,
                         "source": source},
            "required_action": action,
            "approval_gate": gate,
            "production_deploy": None,
            "online_verify": None,
            "retest": {"next_check": next_check, "required_windows": ["7d", "14d", "28d"]},
            "learning_evidence_complete": False,
            "scale_allowed": False,
        })
    route_order = {"FIX": 0, "MEASURE": 1}
    return sorted(handoffs, key=lambda row: (route_order[row["route"]], -row["baseline"]["impressions"], row["query"]))


def candidate_task_handoffs(anomaly, source):
    rows = []
    for task in anomaly.get("candidate_tasks", []):
        target = str(task.get("target") or "")
        route = "FIX" if ("zero click" in target.lower() or "api pull" in target.lower()) else "MEASURE"
        rows.append({
            "task_id": task.get("task_id"), "route": route, "target": target,
            "owner_lane": task.get("owner"), "why": task.get("why"),
            "approval_gate": task.get("gate"), "next_check": task.get("next_check"),
            "status": "PROPOSE_ONLY", "source": source, "scale_allowed": False,
        })
    return rows


def build_gsc_handoff(logs, review_day):
    path, anomaly = latest_dated_json(logs, "gsc-daily-anomaly-", review_day)
    if not path:
        return {"available": False, "source": None, "items": [], "candidate_tasks": [], "tasks": [],
                "reason": "No gsc-daily-anomaly-YYYY-MM-DD.json on or before the review date"}
    source = os.path.basename(path)
    data_availability = anomaly.get("data_availability") or {}
    return {
        "available": True,
        "source": source,
        "anomaly_date": anomaly.get("date"),
        "data_status": anomaly.get("data_status"),
        "xlsx_availability": data_availability.get("xlsx_batch", {}),
        "api_availability": data_availability.get("api_pull", {}),
        "kpi_28d": (anomaly.get("kpi_xlsx_4windows") or {}).get("28d"),
        "recovery": {
            "official_headline": (anomaly.get("recovery") or {}).get("headline"),
            "formula": (anomaly.get("recovery") or {}).get("formula"),
            "guard": "Impression-metric recovery only; not ranking, penalty, enquiry, order or revenue recovery",
        },
        "items": money_query_handoffs(anomaly, source, review_day),
        "candidate_tasks": candidate_task_handoffs(anomaly, source),
        "tasks": anomaly.get("tasks", []),
    }


def build_blog_handoff(repo, review_day):
    path = os.path.join(repo, ".hermes", "cron-prompts", "blog-money-keyword-queue.json")
    queue = read_json(path, None)
    if not isinstance(queue, dict):
        return {"available": False, "source": None, "items": [], "status_counts": {},
                "reason": "Optional blog-money-keyword-queue.json is missing or invalid"}
    items = []
    counts = {}
    for item in queue.get("items", []):
        status = str(item.get("status") or "UNKNOWN")
        counts[status] = counts.get(status, 0) + 1
        recheck = parse_day(item.get("recheck_after"))
        if status == "remeasure":
            decision = "REMEASURE_DUE" if recheck and recheck <= review_day else "REMEASURE_NOT_DUE"
            route = "MEASURE"
        elif status == "blocked_waiting_k3":
            decision = "HOLD_WAITING_K3"
            route = "HOLD"
        else:
            decision = "HOLD_UNVERIFIED"
            route = "HOLD"
        items.append({"cluster": item.get("cluster"), "locale": item.get("locale"), "status": status,
                      "route": route, "decision": decision, "recheck_after": str(recheck) if recheck else None,
                      "source_window": item.get("source_window"), "baseline": item.get("baseline"),
                      "delivered_url": item.get("delivered_url"), "scale_allowed": False})
    return {"available": True, "source": ".hermes/cron-prompts/blog-money-keyword-queue.json",
            "source_window": queue.get("source_window"), "status_counts": counts, "items": items,
            "guard": "A moving GSC window is an observation, not an experiment win/loss; no automatic article generation"}


def build_geo_handoff(repo, review_day, anomaly):
    path, text = latest_dated_document(repo, "geo-probe-s1-completion", review_day)
    if not path:
        return {"available": False, "source": None, "status": "UNKNOWN", "action": "Do not infer AI citations"}
    s2_next = None
    for key, value in _task_rows(anomaly):
        if key.endswith("-O12") or key == "O12":
            s2_next = value.get("next_check") if isinstance(value, dict) else None
            break
    return {"available": True, "source": os.path.relpath(path, repo), "status": "S1_COMPLETE_CITATION_URLS_PARTIAL",
            "s2_window": "2026-11-20..2026-11-24", "s2_next_check": s2_next,
            "action": "MEASURE at S2; capture complete citation URLs. Do not rerun S1 or create content solely from absence",
            "completion_evidence_found": bool(text)}


def task_decision(task, review_day):
    status = task.get("status", "UNKNOWN")
    due = parse_day(task.get("next_check"))
    if status in TERMINAL_TASK_STATUSES:
        return "STOP", "terminal task state", due
    if status == "BLOCKED_INFRA":
        return "FIX", "infrastructure blocker requires its designated owner", due
    if status == "WAITING_K3":
        return "HOLD", "approval gate is not satisfied; executor must not self-approve", due
    if due is None or due > review_day:
        return "HOLD", "retest is not due or lacks a concrete date", due
    if task.get("stop_evidence"):
        return "STOP", "explicit stop evidence; stop expansion, not an automatic delete/noindex", due
    if task.get("fix_required"):
        return "FIX", "explicit observed defect requires a bounded fix", due
    if complete_learning_evidence(task) and task.get("scale_evidence"):
        return "SCALE", "complete before/after evidence plus repeatable improvement", due
    return "HOLD", "insufficient comparable outcome evidence; no win/loss claim", due


def fix_task_for_lane(lane, period, review_day):
    name = lane.get("task", "UNKNOWN-LANE")
    recovery = lane.get("recovery_plan") or {}
    human = recovery.get("action") == "request_human" or lane.get("verdict") == "MISSING"
    digest = hashlib.sha256(f"{name}|{lane.get('verdict')}|{review_day}".encode("utf-8")).hexdigest()[:8]
    task_id = f"FIX-{period.upper()}-{review_day}-{name}-{digest}"
    return {
        "task_id": task_id,
        "source_strategy": f"periodic-review-{period}-{review_day}",
        "market": "operations",
        "lane_task": name,
        "target": f"Resolve {name} {lane.get('verdict')} with bounded recovery: {recovery.get('reason') or 'inspect evidence'}",
        "evidence": [".hermes/logs/lane-status.json", ".hermes/logs/lane-runs.jsonl", recovery.get("evidence") or "wrapper log"],
        "score": 100,
        "score_model": "execution-health-blocker",
        "write_scope": [".hermes/logs/", "scripts/"] if not human else ["K3-admin runtime/configuration only"],
        "approval_gate": "K3 administrator action; no automatic retry" if human else "Use recovery_plan; stop after repeated same-cause failure",
        "owner_lane": "K3-admin" if human else name,
        "status": "BLOCKED_INFRA" if human else "READY",
        "next_check": str(review_day + dt.timedelta(days=1)),
        "result": f"Dispatched by {period} review from observed {lane.get('verdict')}; not a completed fix",
    }


def fix_task_for_strategy(task, period, review_day):
    original = task["task_id"]
    task_id = f"FIX-{period.upper()}-{review_day}-{original}"
    waiting = task.get("status") == "WAITING_K3"
    return {
        "task_id": task_id,
        "source_strategy": f"periodic-review-{period}-{review_day}",
        "market": task.get("market", "all"),
        "target": task.get("target"),
        "evidence": task.get("evidence", []),
        "score": task.get("score", 50),
        "score_model": "observed-fix-required",
        "write_scope": task.get("write_scope", []),
        "approval_gate": task.get("approval_gate", "Preserve all existing gates"),
        "owner_lane": task.get("owner_lane", "ZP-daily-content"),
        "status": "WAITING_K3" if waiting else "READY",
        "next_check": str(review_day + dt.timedelta(days=7 if period == "weekly" else 30)),
        "result": "FIX proposal only; no production change has been made",
    }


def render_markdown(report):
    lines = [
        f"# {report['period'].title()} execution and strategy review — {report['review_date']}",
        "",
        "> Generated deterministically from observed bus/status/queue evidence. No SEO, conversion or AI-citation outcome is inferred from missing data.",
        "",
        "## Execution health",
        "",
        f"- Window: {report['window_start']} to {report['review_date']}",
        f"- Runs: {report['execution']['runs']}; verdicts: {json.dumps(report['execution']['verdicts'], ensure_ascii=False)}",
        f"- Current lanes requiring attention: {len(report['execution']['attention_lanes'])}",
        "",
        "| lane | verdict | recovery | evidence |",
        "|---|---|---|---|",
    ]
    for lane in report["execution"]["attention_lanes"]:
        evidence = str(lane["evidence"]).replace("|", "\\|")
        lines.append(f"| {lane['task']} | {lane['verdict']} | {lane['recovery_action']} | {evidence} |")
    if not report["execution"]["attention_lanes"]:
        lines.append("| NONE | — | — | — |")
    lines += ["", "## Task decisions", "", "| task | previous status | decision | reason |", "|---|---|---|---|"]
    for row in report["task_decisions"]:
        lines.append(f"| {row['task_id']} | {row['status']} | {row['decision']} | {row['reason']} |")

    gsc = report["evidence_handoffs"]["gsc"]
    lines += ["", "## GSC evidence handoffs", ""]
    if not gsc["available"]:
        lines.append(f"- UNAVAILABLE: {gsc['reason']}")
    else:
        kpi = gsc.get("kpi_28d") or {}
        lines += [
            f"- Source: {gsc['source']}; 28d window: {kpi.get('window')}",
            f"- Freshness: {gsc.get('data_status')}",
            f"- Recovery: {gsc['recovery'].get('official_headline')}; {gsc['recovery']['guard']}",
            "",
            "| route | query | baseline (imp/clk/pos) | owner | required gate |",
            "|---|---|---|---|---|",
        ]
        for row in gsc["items"]:
            base = row["baseline"]
            gate = row["approval_gate"].replace("|", "\\|")
            lines.append(f"| {row['route']} | {row['query']} | {base['impressions']}/{base['clicks']}/{base['position']} | "
                         f"{row['owner_lane']} | {gate} |")
        lines.append(f"- Upstream anomaly tasks retained: {len(gsc['tasks'])}; candidate handoffs: {len(gsc['candidate_tasks'])}.")

    blog = report["evidence_handoffs"]["blog"]
    lines += ["", "## Blog queue remeasurement", ""]
    if not blog["available"]:
        lines.append(f"- UNAVAILABLE: {blog['reason']}")
    else:
        lines += [f"- Source window: {blog.get('source_window')}; statuses: {json.dumps(blog['status_counts'], ensure_ascii=False)}",
                  "", "| cluster | status | decision | recheck |", "|---|---|---|---|"]
        for row in blog["items"]:
            lines.append(f"| {row['cluster']} | {row['status']} | {row['decision']} | {row['recheck_after'] or '—'} |")

    geo = report["evidence_handoffs"]["geo"]
    lines += ["", "## GEO measurement", ""]
    if geo["available"]:
        lines.append(f"- {geo['status']}; S2 {geo['s2_window']}: {geo['action']}")
    else:
        lines.append("- UNAVAILABLE: do not infer AI citations or manufacture a baseline.")

    lines += [
        "",
        "## Dispatch and learning",
        "",
        f"- New FIX task IDs: {', '.join(report['dispatched_task_ids']) if report['dispatched_task_ids'] else 'NONE (or already present)'}",
        f"- Recurred existing task IDs: {', '.join(report['recurred_task_ids']) if report['recurred_task_ids'] else 'NONE'}",
        f"- Suppressed duplicates: {len(report['suppressed_duplicates'])} (deduplication is recorded, not misreported as a write failure)",
        f"- Learning candidates: {len(report['learning_candidates'])}; SCALE-eligible: {len(report['learning']['scale_allowed_task_ids'])}",
        "- Learning gate: baseline + change + production online_verify + retest are all mandatory. GSC movement alone is not a win/loss.",
        "- FIX/MEASURE handoffs are proposals only. No automatic prompt, permission, canonical, redirect or production rewrites are permitted.",
        "",
        "## Measurement limits",
        "",
        "- GSC impressions are not market size; query/page/country aggregates are not interchangeable.",
        "- Fresh xlsx inventory does not prove that the API plane is fresh.",
        "- No conversion ROI claim without GA4/008/order landing-page coverage.",
        "- No AI citation claim without fixed-engine probe answers and citation URLs.",
        "",
        "Data sources: .hermes/logs/lane-runs.jsonl, .hermes/logs/lane-status.json, .hermes/logs/strategy-task-queue.json, latest eligible anomaly/blog/GEO evidence listed above.",
    ]
    return "\n".join(lines) + "\n"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--period", required=True, choices=("weekly", "monthly"))
    parser.add_argument("--date", required=True, help="review date YYYY-MM-DD")
    parser.add_argument("--repo", default=os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    parser.add_argument("--write-queue", action="store_true", help="idempotently append new FIX tasks")
    args = parser.parse_args()
    review_day = dt.date.fromisoformat(args.date)
    repo = os.path.abspath(args.repo)
    logs = os.path.join(repo, ".hermes", "logs")
    queue_path = os.path.join(logs, "strategy-task-queue.json")
    status_path = os.path.join(logs, "lane-status.json")
    runs_path = os.path.join(logs, "lane-runs.jsonl")
    queue = read_json(queue_path, {"schema_version": 1, "tasks": []})
    tasks = queue.setdefault("tasks", [])
    status = read_json(status_path, {})
    runs = read_jsonl(runs_path)
    days = 7 if args.period == "weekly" else 30
    window_start = review_day - dt.timedelta(days=days - 1)
    window_runs = [r for r in runs if record_day(r) and window_start <= record_day(r) <= review_day and not r.get("test_record")]
    # Reconciled day status is authoritative for historical rows too. Raw bus verdicts
    # may contain the 2026-10-27 AUTO-FILLED/OK incident and must not poison reviews.
    reconciled = {}
    for lane_row in status.get("lanes", []):
        for day_row in lane_row.get("days", []):
            reconciled[(lane_row.get("task"), day_row.get("day"))] = day_row.get("status")
    verdicts = {}
    per_lane = {}
    for row in window_runs:
        lane = row.get("lane", "UNKNOWN")
        day = str(record_day(row)) if record_day(row) else None
        verdict = reconciled.get((lane, day))
        if not verdict:
            verdict = row.get("verdict") or "UNKNOWN"
            if row.get("dsh_exit") not in (0, None):
                verdict = "FAILED"
            elif row.get("report_auto_generated") and verdict == "OK":
                verdict = "STALE"
        verdicts[verdict] = verdicts.get(verdict, 0) + 1
        per_lane.setdefault(lane, {})
        per_lane[lane][verdict] = per_lane[lane].get(verdict, 0) + 1
    attention = []
    for lane in status.get("lanes", []):
        scheduler_failed = bool(lane.get("scheduler") and int(lane["scheduler"].get("Result") or 0) != 0)
        lane_failed = lane.get("verdict") in ("FAILED", "BLOCKED", "STALE", "MISSING")
        if lane_failed or scheduler_failed:
            recovery = dict(lane.get("recovery_plan") or {})
            effective_verdict = lane.get("verdict")
            if scheduler_failed and not lane_failed:
                # A manual OK is delivery evidence, not proof that the natural Windows
                # trigger recovered. Keep both facts instead of hiding the scheduler fault.
                effective_verdict = "SCHEDULER_FAILED"
                recovery = {"action": "request_human",
                            "reason": f"Windows Task Scheduler LastTaskResult={lane['scheduler'].get('Result')}; manual/other-trigger OK does not prove natural schedule recovery",
                            "evidence": f"Get-ScheduledTaskInfo -TaskName {lane.get('task')}"}
                lane = dict(lane, verdict=effective_verdict, recovery_plan=recovery)
            attention.append({"task": lane.get("task"), "verdict": effective_verdict,
                              "recovery_action": recovery.get("action", "UNSPECIFIED"),
                              "evidence": recovery.get("evidence") or ".hermes/logs/lane-status.json",
                              "lane": lane})
    decisions = []
    candidates = []
    proposed = []
    existing_ids = {t.get("task_id") for t in tasks}
    for task in tasks:
        decision, reason, due = task_decision(task, review_day)
        decisions.append({"task_id": task.get("task_id"), "status": task.get("status"),
                          "decision": decision, "reason": reason, "next_check": str(due) if due else None})
        if complete_learning_evidence(task):
            candidates.append({"candidate_id": f"LEARN-{task['task_id']}-{review_day}",
                               "task_id": task["task_id"], "review_date": str(review_day),
                               "evidence": task["learning_evidence"], "decision": decision,
                               "promotion": "PROPOSE_ONLY; shared-rule promotion requires review"})
        if decision == "FIX" and task.get("status") != "BLOCKED_INFRA":
            proposed.append(fix_task_for_strategy(task, args.period, review_day))
    global_credential_fix = any("DSH-CREDENTIAL" in str(t.get("task_id")) and t.get("status") not in TERMINAL_TASK_STATUSES for t in tasks)
    for row in attention:
        recovery = row["lane"].get("recovery_plan") or {}
        reason = str(recovery.get("reason") or "")
        if global_credential_fix and re.search(r"credential|DEEPSEEK_API_KEY|凭据", reason, re.IGNORECASE):
            continue  # one shared credential blocker; do not spawn one duplicate per lane
        proposed.append(fix_task_for_lane(row["lane"], args.period, review_day))
    new_tasks = []
    recurred_task_ids = []
    suppressed_duplicates = []
    active_by_target = {t.get("target"): t for t in tasks if t.get("status") not in TERMINAL_TASK_STATUSES}
    def lane_identity(task):
        if task.get("lane_task"):
            return task["lane_task"]
        match = re.match(r"Resolve (ZP-[A-Za-z0-9-]+)\b", str(task.get("target") or ""))
        return match.group(1) if match else None
    active_by_lane = {lane_identity(t): t for t in tasks
                      if t.get("status") not in TERMINAL_TASK_STATUSES and lane_identity(t)}
    for task in proposed:
        if task["task_id"] in existing_ids:
            suppressed_duplicates.append({"proposed_task_id": task["task_id"],
                                          "existing_task_id": task["task_id"], "reason": "existing_task_id"})
            continue
        existing = active_by_target.get(task.get("target"))
        recurrence_reason = "active_target_recurred"
        if existing is None and task.get("lane_task"):
            existing = active_by_lane.get(task["lane_task"])
            recurrence_reason = "active_lane_recurred"
        if existing is None:
            new_tasks.append(task)
            existing_ids.add(task["task_id"])
            active_by_target[task.get("target")] = task
            if task.get("lane_task"):
                active_by_lane[task["lane_task"]] = task
            continue

        # Recurrence is evidence, not a dispatch failure and not a second ticket.
        # The review-date + proposed-ID observation key makes replaying one review idempotent.
        suppressed_duplicates.append({"proposed_task_id": task["task_id"],
                                      "existing_task_id": existing.get("task_id"), "reason": recurrence_reason})
        recurred_task_ids.append(existing.get("task_id"))
        if args.write_queue:
            observations = existing.setdefault("recurrence_observations", [])
            observation_key = f"{args.period}|{review_day}|{task['task_id']}"
            if not any(row.get("observation_key") == observation_key for row in observations):
                observations.append({"observation_key": observation_key, "observed_at": str(review_day),
                                     "period": args.period, "proposed_task_id": task["task_id"],
                                     "evidence": task.get("evidence", []), "result": task.get("result")})
            existing["recurrence_count"] = len(observations)
            existing["last_seen"] = str(review_day)
            existing["next_check"] = task.get("next_check")
            existing["evidence"] = list(dict.fromkeys((existing.get("evidence") or []) + (task.get("evidence") or [])))
            existing["result"] = (f"Recurred on {review_day}; existing task retained and updated. "
                                  "Recurrence is not resolution; no automatic close or permission expansion.")
    recurred_task_ids = list(dict.fromkeys(recurred_task_ids))
    if args.write_queue and (new_tasks or recurred_task_ids):
        tasks.extend(new_tasks)
        queue["last_review"] = {"period": args.period, "date": str(review_day),
                                "report": f".hermes/logs/periodic-review-{args.period}-{review_day}.json"}
        write_json(queue_path, queue)
    learning_path = os.path.join(logs, "learning-candidates.jsonl")
    old_candidates = read_jsonl(learning_path)
    merged = {c.get("candidate_id"): c for c in old_candidates + candidates if c.get("candidate_id")}
    write_text(learning_path, "".join(json.dumps(merged[k], ensure_ascii=False) + "\n" for k in sorted(merged)))

    gsc_handoff = build_gsc_handoff(logs, review_day)
    blog_handoff = build_blog_handoff(repo, review_day)
    anomaly_for_geo = read_json(os.path.join(logs, gsc_handoff["source"]), {}) if gsc_handoff["available"] else {}
    geo_handoff = build_geo_handoff(repo, review_day, anomaly_for_geo)
    decision_by_id = {row.get("task_id"): row.get("decision") for row in decisions}
    scale_allowed = [task.get("task_id") for task in tasks
                     if decision_by_id.get(task.get("task_id")) == "SCALE"
                     and complete_learning_evidence(task) and task.get("scale_evidence")]
    report = {
        "schema_version": 2,
        "period": args.period,
        "review_date": str(review_day),
        "window_start": str(window_start),
        "inputs": {"queue": os.path.relpath(queue_path, repo), "status": os.path.relpath(status_path, repo),
                   "runs": os.path.relpath(runs_path, repo), "status_available": bool(status),
                   "anomaly_available": gsc_handoff["available"], "blog_available": blog_handoff["available"],
                   "geo_available": geo_handoff["available"]},
        "execution": {"runs": len(window_runs), "verdicts": verdicts, "per_lane": per_lane,
                      "attention_lanes": [{k: v for k, v in row.items() if k != "lane"} for row in attention]},
        "task_decisions": decisions,
        "evidence_handoffs": {"gsc": gsc_handoff, "blog": blog_handoff, "geo": geo_handoff},
        "learning": {"required_fields": list(REQUIRED_LEARNING_FIELDS),
                     "production_deploy_required": True, "scale_allowed_task_ids": scale_allowed,
                     "proposal_only": True,
                     "rule": "FIX/MEASURE evidence cannot become SCALE without baseline + change + online_verify + retest + scale_evidence"},
        "dispatched_task_ids": [t["task_id"] for t in new_tasks] if args.write_queue else [],
        "proposed_task_ids": [t["task_id"] for t in proposed],
        "recurred_task_ids": recurred_task_ids,
        "suppressed_duplicates": suppressed_duplicates,
        "learning_candidates": candidates,
        "queue_write_enabled": bool(args.write_queue),
        "guardrails": ["no prompt self-rewrite", "no permission expansion", "no src writes", "no commit/push",
                       "SCALE requires complete comparable evidence", "WAITING_K3 cannot be self-approved",
                       "no automatic canonical/redirect/article from a moving GSC window"],
    }
    json_path = os.path.join(logs, f"periodic-review-{args.period}-{review_day}.json")
    md_path = os.path.join(logs, f"periodic-review-{args.period}-{review_day}.md")
    write_json(json_path, report)
    write_text(md_path, render_markdown(report))
    print(f"periodic-review: {args.period} {review_day} runs={len(window_runs)} attention={len(attention)} "
          f"new_tasks={len(new_tasks) if args.write_queue else 0} learning={len(candidates)}")
    print(os.path.relpath(json_path, repo))
    print(os.path.relpath(md_path, repo))
    return 0


if __name__ == "__main__":
    sys.exit(main())
