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
    return all(field in evidence and evidence[field] not in (None, "", False, [], {}) for field in REQUIRED_LEARNING_FIELDS)


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
    lines += [
        "",
        "## Dispatch and learning",
        "",
        f"- New FIX task IDs: {', '.join(report['dispatched_task_ids']) if report['dispatched_task_ids'] else 'NONE (or already present)'}",
        f"- Learning candidates: {len(report['learning_candidates'])}",
        "- Learning gate: baseline + change + online_verify + retest are all mandatory. No automatic prompt, permission or production rewrites are permitted.",
        "",
        "## Measurement limits",
        "",
        "- GSC impressions are not market size; query/page/country aggregates are not interchangeable.",
        "- No conversion ROI claim without GA4/008/order landing-page coverage.",
        "- No AI citation claim without fixed-engine probe answers and citation URLs.",
        "",
        "Data sources: .hermes/logs/lane-runs.jsonl, .hermes/logs/lane-status.json, .hermes/logs/strategy-task-queue.json.",
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
        if lane.get("verdict") in ("FAILED", "BLOCKED", "STALE", "MISSING") or (lane.get("verdict") == "UNKNOWN" and scheduler_failed):
            recovery = lane.get("recovery_plan") or {}
            attention.append({"task": lane.get("task"), "verdict": lane.get("verdict"),
                              "recovery_action": recovery.get("action", "UNSPECIFIED"),
                              "evidence": recovery.get("evidence") or ".hermes/logs/lane-status.json",
                              "lane": lane})
    decisions = []
    candidates = []
    proposed = []
    existing_ids = {t.get("task_id") for t in tasks}
    active_targets = {t.get("target") for t in tasks if t.get("status") not in TERMINAL_TASK_STATUSES}
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
    for task in proposed:
        if task["task_id"] not in existing_ids and task.get("target") not in active_targets:
            new_tasks.append(task)
            existing_ids.add(task["task_id"])
            active_targets.add(task.get("target"))
    if args.write_queue and new_tasks:
        tasks.extend(new_tasks)
        queue["last_review"] = {"period": args.period, "date": str(review_day),
                                "report": f".hermes/logs/periodic-review-{args.period}-{review_day}.json"}
        write_json(queue_path, queue)
    learning_path = os.path.join(logs, "learning-candidates.jsonl")
    old_candidates = read_jsonl(learning_path)
    merged = {c.get("candidate_id"): c for c in old_candidates + candidates if c.get("candidate_id")}
    write_text(learning_path, "".join(json.dumps(merged[k], ensure_ascii=False) + "\n" for k in sorted(merged)))
    report = {
        "schema_version": 1,
        "period": args.period,
        "review_date": str(review_day),
        "window_start": str(window_start),
        "inputs": {"queue": os.path.relpath(queue_path, repo), "status": os.path.relpath(status_path, repo),
                   "runs": os.path.relpath(runs_path, repo), "status_available": bool(status)},
        "execution": {"runs": len(window_runs), "verdicts": verdicts, "per_lane": per_lane,
                      "attention_lanes": [{k: v for k, v in row.items() if k != "lane"} for row in attention]},
        "task_decisions": decisions,
        "dispatched_task_ids": [t["task_id"] for t in new_tasks] if args.write_queue else [],
        "proposed_task_ids": [t["task_id"] for t in proposed],
        "learning_candidates": candidates,
        "queue_write_enabled": bool(args.write_queue),
        "guardrails": ["no prompt self-rewrite", "no permission expansion", "no src writes", "no commit/push",
                       "SCALE requires complete comparable evidence", "WAITING_K3 cannot be self-approved"],
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
