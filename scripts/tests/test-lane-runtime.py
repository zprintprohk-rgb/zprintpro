#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Isolated regression tests; never executes a production wrapper or remote push."""
import datetime as dt
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import types
import unittest

ROOT = Path(__file__).resolve().parents[2]
LANE_GIT = ROOT / "scripts" / "lane-git-commit.py"
PREFLIGHT = ROOT / "scripts" / "lane-preflight.py"
BUILDER = ROOT / "scripts" / "build-coordination-board.py"
FEEDBACK = ROOT / "scripts" / "strategy-feedback.py"
LANE = "ZP-daily-content"
DAY = "2026-10-28"


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class RuntimeTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix="zp-lane-test-")
        self.repo = Path(self.tmp.name)
        subprocess.run(["git", "init", "-b", "main"], cwd=self.repo, check=True, capture_output=True)
        subprocess.run(["git", "config", "user.email", "test@example.invalid"], cwd=self.repo, check=True)
        subprocess.run(["git", "config", "user.name", "Isolated Test"], cwd=self.repo, check=True)
        self.write("src/data/products.ts", "export {};\n")
        self.write("src/data/blog-data/.keep", "")
        self.write("package.json", "{}\n")
        self.write("scripts/check-encoding.js", "process.exit(0);\n")
        self.write("scripts/build-coordination-board.py", BUILDER.read_text(encoding="utf-8"))
        self.write("node_modules/tsx/dist/cli.mjs", "")
        self.write("node_modules/typescript/bin/tsc", "")
        self.commit_all("fixture")

    def tearDown(self):
        self.tmp.cleanup()

    def write(self, rel, text):
        path = self.repo / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
        return path

    def commit_all(self, message):
        subprocess.run(["git", "add", "--all"], cwd=self.repo, check=True, capture_output=True)
        subprocess.run(["git", "commit", "-m", message], cwd=self.repo, check=True, capture_output=True)

    def commit_count(self):
        result = subprocess.run(["git", "rev-list", "--count", "HEAD"], cwd=self.repo,
                                check=True, capture_output=True, text=True)
        return int(result.stdout.strip())

    def run_finalize(self, dsh_exit):
        return subprocess.run([sys.executable, str(LANE_GIT), "--lane", LANE, "--repo", str(self.repo),
                               "--dsh-exit", str(dsh_exit), "--day", DAY],
                              cwd=self.repo, capture_output=True, text=True, encoding="utf-8", errors="replace")

    def bus(self):
        path = self.repo / ".hermes" / "logs" / "lane-runs.jsonl"
        return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]

    def valid_report(self, day=DAY, auto=False):
        verdict = "STALE" if auto else "OK"
        marker = " (AUTO-FILL)" if auto else ""
        self.write(f".hermes/logs/{day}-{LANE}.md",
                   f"# report{marker}\n\nVERDICT: {verdict}\nCONSUMED: fixture\nDELIVERED: NONE\nNEXT: NONE\n")

    def test_dsh_failure_has_zero_commit_and_failed_bus(self):
        before = self.commit_count()
        self.write("docs/must-not-commit.md", "failure output\n")
        result = self.run_finalize(1)
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(self.commit_count(), before)
        row = self.bus()[-1]
        self.assertEqual(row["verdict"], "FAILED")
        self.assertEqual(row["dsh_exit"], 1)
        self.assertFalse(row["pushed"])
        self.assertIn("must-not-commit", subprocess.run(["git", "status", "--short", "--untracked-files=all"], cwd=self.repo,
                                                        capture_output=True, text=True).stdout)

    def test_dsh_zero_without_report_is_stale_and_not_committed(self):
        before = self.commit_count()
        self.write("docs/must-not-commit.md", "no report\n")
        result = self.run_finalize(0)
        self.assertEqual(result.returncode, 6)
        self.assertEqual(self.commit_count(), before)
        row = self.bus()[-1]
        self.assertEqual(row["verdict"], "STALE")
        self.assertEqual(row["dsh_exit"], 0)
        self.assertTrue(row["report_auto_generated"])

    def test_old_report_cannot_impersonate_today(self):
        self.valid_report("2026-10-27")
        before = self.commit_count()
        result = self.run_finalize(0)
        self.assertEqual(result.returncode, 6)
        self.assertEqual(self.commit_count(), before)
        self.assertEqual(self.bus()[-1]["verdict"], "STALE")

    def test_auto_filled_today_is_not_ok(self):
        self.valid_report(auto=True)
        before = self.commit_count()
        result = self.run_finalize(0)
        self.assertEqual(result.returncode, 6)
        self.assertEqual(self.commit_count(), before)
        self.assertEqual(self.bus()[-1]["verdict"], "STALE")

    def test_valid_report_with_no_changes_records_ok_without_commit(self):
        self.valid_report()
        self.commit_all("valid report already committed")
        before = self.commit_count()
        result = self.run_finalize(0)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(self.commit_count(), before)
        self.assertEqual(self.bus()[-1]["verdict"], "OK")
        self.assertEqual(self.bus()[-1]["dsh_exit"], 0)

    def test_preflight_missing_credential_and_disallowed_model(self):
        module = load_module("zp_preflight_test", PREFLIGHT)
        fake_dsh = self.write("fake-dsh.cmd", "@echo off\n")
        checks, blocked = module.check_dsh_runtime(
            environ={"ZP_DSH_PATH": str(fake_dsh)},
            runner=lambda *a, **k: types.SimpleNamespace(returncode=1, stdout=""))
        self.assertIsNotNone(blocked)
        self.assertFalse(next(c for c in checks if c["name"] == "dsh_credential_environment")["ok"])

        def pro_runner(*args, **kwargs):
            return types.SimpleNamespace(returncode=0, stdout="provider: deepseek-official\nmodel: deepseek-v4-pro\n")

        checks, blocked = module.check_dsh_runtime(
            environ={"ZP_DSH_PATH": str(fake_dsh), "DEEPSEEK_API_KEY": "dummy-test-only"}, runner=pro_runner)
        self.assertIsNotNone(blocked)
        self.assertFalse(next(c for c in checks if c["name"] == "dsh_effective_provider_model")["ok"])

        def flash_runner(*args, **kwargs):
            return types.SimpleNamespace(returncode=0, stdout="provider: deepseek-official\nmodel: deepseek-flash\n")

        checks, blocked = module.check_dsh_runtime(
            environ={"ZP_DSH_PATH": str(fake_dsh), "DEEPSEEK_API_KEY": "dummy-test-only"}, runner=flash_runner)
        self.assertIsNone(blocked)
        self.assertTrue(all(c["ok"] for c in checks))

    def test_lane_status_latest_failure_overrides_earlier_ok(self):
        day = dt.date.today().isoformat()
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [{
            "task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00",
            "reportGlob": "*-daily-content.md"
        }], "watchdog": {}}))
        self.valid_report(day)
        rows = [
            {"lane": LANE, "fired_at": f"{day} 00:01:00", "ended_at": f"{day} 00:02:00",
             "verdict": "OK", "dsh_exit": 0, "report_auto_generated": False},
            {"lane": LANE, "fired_at": f"{day} 01:01:00", "ended_at": f"{day} 01:02:00",
             "verdict": "FAILED", "dsh_exit": 1, "blocked_reason": "MISSING_CREDENTIAL"},
        ]
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(r) + "\n" for r in rows))
        self.write(f".hermes/logs/cron-{LANE}.log",
                   f"===== run start {day.replace('-', '/')}  01:00:00 =====\n===== dsh exit=1\n")
        result = subprocess.run([shutil.which("node") or "node", "scripts/lane-status.mjs", "--days=1", "--quiet", "--no-sched"],
                                cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        output = json.loads((self.repo / ".hermes/logs/lane-status.json").read_text(encoding="utf-8"))
        self.assertEqual(output["lanes"][0]["days"][0]["status"], "FAILED")
        self.assertEqual(output["lanes"][0]["days"][0]["exit"], 1)
        self.assertEqual(output["lanes"][0]["recovery_plan"]["action"], "request_human")

    def test_newer_preflight_block_preserves_older_dsh_exit(self):
        today = dt.date.today()
        day = today.isoformat()
        yesterday = (today - dt.timedelta(days=1)).isoformat()
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [{
            "task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00",
            "reportGlob": "*-daily-content.md"
        }], "watchdog": {}}))
        self.valid_report(day)
        rows = [
            {"lane": LANE, "fired_at": f"{yesterday} 00:01:00", "ended_at": f"{yesterday} 00:02:00",
             "verdict": "OK", "dsh_exit": None},
            {"lane": LANE, "fired_at": f"{day} 00:01:00", "ended_at": f"{day} 00:02:00",
             "verdict": "BLOCKED", "dsh_exit": None, "blocked_reason": "DEEPSEEK_API_KEY absent"},
        ]
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(r) + "\n" for r in rows))
        self.write(f".hermes/logs/cron-{LANE}.log",
                   f"===== run start {yesterday.replace('-', '/')}  00:00:00 =====\n===== dsh exit=1\n"
                   f"===== run start {day.replace('-', '/')}  00:00:00 =====\n===== preflight blocked, dsh NOT called =====\n")
        result = subprocess.run([shutil.which("node") or "node", "scripts/lane-status.mjs", "--days=2", "--quiet", "--no-sched"],
                                cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        output = json.loads((self.repo / ".hermes/logs/lane-status.json").read_text(encoding="utf-8"))
        statuses = {row["day"]: row for row in output["lanes"][0]["days"]}
        self.assertEqual(statuses[yesterday]["status"], "FAILED")
        self.assertEqual(statuses[yesterday]["exit"], 1)
        self.assertEqual(statuses[day]["status"], "BLOCKED")

    def test_lane_git_accepts_cjk_ok_and_autofill_prose(self):
        self.write(f".hermes/logs/{DAY}-{LANE}.md",
                   "# Real report\n\n- **VERDICT: OK**（真实交付；AUTO-FILL 仅为历史事故复盘）\n"
                   "CONSUMED: fixture\nDELIVERED: verified fixture\nNEXT: NONE\n\n"
                   "正文提及 AUTO-FILLED 不得把真实报告误判为占位。\n")
        module = load_module("zp_lane_git_contract_test", LANE_GIT)
        report, error = module.validate_lane_report(str(self.repo), LANE, DAY)
        self.assertIsNone(error)
        self.assertEqual(report, f".hermes/logs/{DAY}-{LANE}.md")

    def test_lane_status_prefers_real_ok_over_newer_placeholder(self):
        day = dt.date.today().isoformat()
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [{
            "task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00",
            "reportGlob": "*-daily-content.md"
        }], "watchdog": {}}))
        self.write(f".hermes/logs/{day}-{LANE}.md",
                   "# placeholder\nVERDICT: STALE (AUTO-FILL)\nCONSUMED: none\nDELIVERED: NONE\nNEXT: fix\n")
        self.write(f".hermes/logs/{day}-daily-content.md",
                   "# Real OK after an AUTO-FILL incident\n- **VERDICT: OK**（已复核）\n"
                   "CONSUMED: fixture\nDELIVERED: real report\nNEXT: NONE\n")
        rows = [{"lane": LANE, "fired_at": f"{day} 00:01:00", "ended_at": f"{day} 00:02:00",
                 "verdict": "OK", "state": "completed", "dsh_exit": 0, "report_auto_generated": False}]
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(r) + "\n" for r in rows))
        result = subprocess.run([shutil.which("node") or "node", "scripts/lane-status.mjs", "--days=1", "--quiet", "--no-sched"],
                                cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        output = json.loads((self.repo / ".hermes/logs/lane-status.json").read_text(encoding="utf-8"))
        self.assertEqual(output["lanes"][0]["days"][0]["status"], "OK")
        self.assertEqual(output["lanes"][0]["days"][0]["report"], f"{day}-daily-content.md")

    def test_blocked_same_idempotency_key_is_not_duplicate_consumption(self):
        day = dt.date.today().isoformat()
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [{
            "task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00",
            "reportGlob": "*-daily-content.md"
        }], "watchdog": {}}))
        rows = [{"run_id": f"blocked-{n}", "lane": LANE, "fired_at": f"{day} 0{n}:01:00",
                 "ended_at": f"{day} 0{n}:02:00", "idempotency_key": "same-key",
                 "key_consumed": False, "verdict": "BLOCKED", "state": "blocked",
                 "dsh_exit": None, "blocked_reason": "lane lock"} for n in (1, 2)]
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(r) + "\n" for r in rows))
        result = subprocess.run([shutil.which("node") or "node", "scripts/lane-status.mjs", "--days=1", "--quiet", "--no-sched"],
                                cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        output = json.loads((self.repo / ".hermes/logs/lane-status.json").read_text(encoding="utf-8"))
        self.assertFalse(any("DUPLICATE_IDEMPOTENCY_KEY" in warning for warning in output["warnings"]))

    def test_periodic_recurrence_updates_existing_task_and_replay_is_idempotent(self):
        target = f"Resolve {LANE} BLOCKED with bounded recovery: credential"
        queue = {"schema_version": 1, "tasks": [{
            "task_id": "FIX-OLD", "status": "BLOCKED_INFRA", "target": target,
            "next_check": "2026-10-28", "evidence": ["old-evidence"], "result": "not fixed"
        }]}
        status = {"generated_local": DAY, "lanes": [{"task": LANE, "verdict": "BLOCKED",
                             "recovery_plan": {"action": "request_human", "reason": "credential", "evidence": "audit"}}]}
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps(queue))
        self.write(".hermes/logs/lane-status.json", json.dumps(status))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        command = [sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                   "--repo", str(self.repo), "--write-queue"]
        for _ in range(2):
            result = subprocess.run(command, cwd=self.repo, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        tasks = json.loads((self.repo / ".hermes/logs/strategy-task-queue.json").read_text(encoding="utf-8"))["tasks"]
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0]["recurrence_count"], 1)
        self.assertEqual(tasks[0]["last_seen"], DAY)
        self.assertIn("audit", tasks[0]["evidence"])
        self.assertEqual(tasks[0]["status"], "BLOCKED_INFRA")
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        self.assertEqual(report["recurred_task_ids"], ["FIX-OLD"])
        self.assertEqual(report["dispatched_task_ids"], [])
        self.assertEqual(report["suppressed_duplicates"][0]["reason"], "active_target_recurred")

    def test_scheduler_failure_survives_manual_ok_and_merges_by_lane(self):
        queue = {"schema_version": 1, "tasks": [{
            "task_id": "FIX-WEEKLY-OLD", "status": "BLOCKED_INFRA",
            "target": f"Resolve {LANE} MISSING with bounded recovery: old trigger gap",
            "next_check": "2026-10-28", "evidence": ["old-evidence"]
        }]}
        status = {"generated_local": DAY, "lanes": [{"task": LANE, "verdict": "OK",
                             "scheduler": {"Result": 2147946720}, "recovery_plan": {"action": "none"}}]}
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps(queue))
        self.write(".hermes/logs/lane-status.json", json.dumps(status))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                                 "--repo", str(self.repo), "--write-queue"],
                                cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        tasks = json.loads((self.repo / ".hermes/logs/strategy-task-queue.json").read_text(encoding="utf-8"))["tasks"]
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0]["status"], "BLOCKED_INFRA")
        self.assertEqual(tasks[0]["recurrence_count"], 1)
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        self.assertEqual(report["execution"]["attention_lanes"][0]["verdict"], "SCHEDULER_FAILED")
        self.assertEqual(report["recurred_task_ids"], ["FIX-WEEKLY-OLD"])
        self.assertEqual(report["suppressed_duplicates"][0]["reason"], "active_lane_recurred")

    def test_periodic_dispatch_is_idempotent_and_learning_is_zero(self):
        queue = {"schema_version": 1, "tasks": [{
            "task_id": "WAITING-1", "status": "WAITING_K3", "next_check": DAY,
            "approval_gate": "K3", "evidence": [], "learning_evidence": {"baseline": "only-one-field"}
        }]}
        status = {"generated_local": DAY, "lanes": [{"task": LANE, "verdict": "BLOCKED",
                             "recovery_plan": {"action": "request_human", "reason": "credential", "evidence": "audit"}}]}
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps(queue))
        self.write(".hermes/logs/lane-status.json", json.dumps(status))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        command = [sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                   "--repo", str(self.repo), "--write-queue"]
        first = subprocess.run(command, cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
        tasks_after_first = json.loads((self.repo / ".hermes/logs/strategy-task-queue.json").read_text(encoding="utf-8"))["tasks"]
        second = subprocess.run(command, cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(second.returncode, 0, second.stdout + second.stderr)
        tasks_after_second = json.loads((self.repo / ".hermes/logs/strategy-task-queue.json").read_text(encoding="utf-8"))["tasks"]
        self.assertEqual(len(tasks_after_first), len(tasks_after_second))
        self.assertEqual(len(tasks_after_second), 2)
        self.assertEqual(tasks_after_second[-1]["owner_lane"], "K3-admin")
        learning = (self.repo / ".hermes/logs/learning-candidates.jsonl").read_text(encoding="utf-8")
        self.assertEqual(learning, "")
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        self.assertEqual(report["dispatched_task_ids"], [])
        self.assertEqual(report["learning_candidates"], [])
        self.assertEqual(report["task_decisions"][0]["decision"], "HOLD")

    def test_periodic_missing_optional_evidence_is_explicit_and_nonfatal(self):
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": []}))
        self.write(".hermes/logs/lane-status.json", json.dumps({"lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                                 "--repo", str(self.repo)], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        for plane in ("gsc", "blog", "geo"):
            self.assertFalse(report["evidence_handoffs"][plane]["available"])

    def test_periodic_anomaly_routes_ctr_to_fix_and_deep_words_to_measure(self):
        anomaly = {
            "date": DAY,
            "data_status": "FRESH_XLSX / API_STALE",
            "data_availability": {"xlsx_batch": {"date": DAY}, "api_pull": {"present": False}},
            "kpi_xlsx_4windows": {"28d": {"window": "2026-10-04..2026-10-31"}},
            "recovery": {"headline": "RECOVERY: 123.7%", "formula": "977 / 789.8"},
            "money_words_23_xlsx_28d": {"rows": {
                "食品包裝印刷": {"imp": 118, "clk": 0, "pos": 8.42},
                "貼紙印刷": {"imp": 127, "clk": 0, "pos": 38.06}
            }},
            "tasks": [{"task_id": "GSC-20261101-O4", "next_check": "2026-11-06"},
                      {"task_id": "GSC-20261101-O12", "next_check": "2026-11-20"}],
            "candidate_tasks": [{"task_id": "C1", "target": "食品包裝印刷 page-1 zero click",
                                 "owner": "ZP-weekly-meta", "gate": "SERP feature check first"}]
        }
        self.write(f".hermes/logs/gsc-daily-anomaly-{DAY}.json", json.dumps(anomaly, ensure_ascii=False))
        self.write(".hermes/cron-prompts/blog-money-keyword-queue.json", json.dumps({
            "source_window": "2026-10-04..2026-10-31", "items": [
                {"cluster": "books-zh-hk", "status": "remeasure", "recheck_after": "2026-11-07"},
                {"cluster": "catalog-en", "status": "blocked_waiting_k3"}
            ]}, ensure_ascii=False))
        self.write(f"docs/{DAY}-geo-probe-s1-completion.md", "S1 complete; citation URLs partial; S2 2026-11-20..24\n")
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": []}))
        self.write(".hermes/logs/lane-status.json", json.dumps({"lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                                 "--repo", str(self.repo)], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        rows = {row["query"]: row for row in report["evidence_handoffs"]["gsc"]["items"]}
        self.assertEqual(rows["食品包裝印刷"]["route"], "FIX")
        self.assertIn("SERP", rows["食品包裝印刷"]["approval_gate"])
        self.assertFalse(rows["食品包裝印刷"]["scale_allowed"])
        self.assertEqual(rows["貼紙印刷"]["route"], "MEASURE")
        self.assertEqual(report["evidence_handoffs"]["blog"]["items"][0]["decision"], "REMEASURE_NOT_DUE")
        self.assertEqual(report["evidence_handoffs"]["geo"]["status"], "S1_COMPLETE_CITATION_URLS_PARTIAL")
        self.assertEqual(report["learning"]["scale_allowed_task_ids"], [])

    def test_periodic_focus_delta_routes_and_anomaly_task_map(self):
        anomaly = {
            "date": DAY,
            "tasks": {"O4": {"next_check": "2026-11-14"}, "O12": {"next_check": "2026-11-20"}},
            "money_words_23_xlsx_28d": {"rows": {}},
        }
        delta = {
            "analysis_date": DAY,
            "focus_query_deltas_28d": [
                {"query": "食品包裝印刷", "classification": "MONEY", "latest_page1": True,
                 "latest_zero_click": True, "page1_transition": "UNCHANGED", "two_window_direction": "NOT_CONSECUTIVE",
                 "observations_28d": [{"export_date": DAY, "impressions": 116, "clicks": 0, "position": 8.36}]},
                {"query": "宣傳單張", "classification": "MONEY", "latest_page1": False,
                 "latest_zero_click": True, "page1_transition": "UNCHANGED",
                 "two_window_direction": "CONFIRMED_TWO_WINDOW_WORSENING",
                 "observations_28d": [{"export_date": DAY, "impressions": 127, "clicks": 0, "position": 34.73}]},
                {"query": "small batch sticker printing", "classification": "MONEY", "latest_page1": True,
                 "latest_zero_click": False, "page1_transition": "ENTERED_PAGE_1",
                 "two_window_direction": "NOT_CONSECUTIVE",
                 "observations_28d": [{"export_date": DAY, "impressions": 8, "clicks": 1, "position": 6.0}]},
                {"query": "書刊印刷", "classification": "MONEY", "latest_page1": False,
                 "latest_zero_click": True, "page1_transition": "DROPPED_OUT_PAGE_1",
                 "two_window_direction": "NOT_CONSECUTIVE",
                 "observations_28d": [{"export_date": DAY, "impressions": 121, "clicks": 0, "position": 11.2}]},
                {"query": "教科書印刷", "classification": "MONEY", "latest_page1": False,
                 "latest_zero_click": False, "page1_transition": "NO_CURRENT_BASELINE",
                 "two_window_direction": None,
                 "observations_28d": [{"export_date": DAY, "impressions": None, "clicks": None, "position": None}]},
                {"query": "印刷", "classification": "INDUSTRY_HEAD", "latest_page1": False,
                 "latest_zero_click": False, "page1_transition": "UNCHANGED", "two_window_direction": "NOT_CONSECUTIVE",
                 "observations_28d": [{"export_date": DAY, "impressions": 78, "clicks": 1, "position": 20.19}]},
            ],
            "seven_day_focus_deltas": [{"query": "海報印刷", "previous_11_10": 15.92,
                                         "current_11_11": 21.29, "delta_position": 5.37, "direction": "WORSE"}],
        }
        self.write(f".hermes/logs/gsc-daily-anomaly-{DAY}.json", json.dumps(anomaly, ensure_ascii=False))
        self.write(f".hermes/logs/gsc-{DAY}-money-keyword-delta.json", json.dumps(delta, ensure_ascii=False))
        self.write(f"docs/{DAY}-geo-probe-s1-completion.md", "S1 complete\n")
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": []}))
        self.write(".hermes/logs/lane-status.json", json.dumps({"lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                                 "--repo", str(self.repo)], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        focus = report["evidence_handoffs"]["gsc"]["focus_delta"]
        rows = {row["query"]: row for row in focus["items"]}
        self.assertEqual(rows["食品包裝印刷"]["route"], "FIX")
        self.assertEqual(rows["宣傳單張"]["route"], "MEASURE")
        self.assertEqual(rows["書刊印刷"]["route"], "MEASURE")
        self.assertNotIn("small batch sticker printing", rows)
        self.assertNotIn("教科書印刷", rows)
        self.assertEqual(focus["entered_page1"], ["small batch sticker printing"])
        self.assertEqual(focus["dropped_out_page1"], ["書刊印刷"])
        self.assertEqual(focus["missing_current_baseline"], ["教科書印刷"])
        self.assertEqual(focus["industry_head_count"], 1)
        self.assertEqual(focus["page1_count"], 2)
        self.assertEqual(focus["page1_zero_click_count"], 1)
        self.assertEqual(rows["宣傳單張"]["retry_at"], "2026-11-04")
        self.assertIn("no automatic article", rows["宣傳單張"]["approval_gate"])
        self.assertEqual(report["evidence_handoffs"]["geo"]["s2_next_check"], "2026-11-20")
        self.assertEqual(focus["short_window_worsening_not_for_dispatch"], [{
            "query": "海報印刷", "previous": 15.92, "current": 21.29,
            "previous_field": "previous_11_10", "current_field": "current_11_11",
            "delta_position": 5.37,
        }])

    def test_periodic_stale_lane_status_cannot_dispatch_lane_repair(self):
        status = {"generated_local": "2026-11-04 06:43", "lanes": [{
            "task": LANE, "verdict": "FAILED", "recovery_plan": {"action": "request_human", "reason": "old failure"}
        }]}
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": []}))
        self.write(".hermes/logs/lane-status.json", json.dumps(status))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", "2026-11-07",
                                 "--repo", str(self.repo), "--write-queue"], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((self.repo / ".hermes/logs/periodic-review-weekly-2026-11-07.json").read_text(encoding="utf-8"))
        self.assertTrue(report["execution"]["status_freshness"]["stale"])
        self.assertEqual(report["execution"]["attention_lanes"], [])
        self.assertEqual(report["proposed_task_ids"], [])
        queue = json.loads((self.repo / ".hermes/logs/strategy-task-queue.json").read_text(encoding="utf-8"))
        self.assertEqual(queue["tasks"], [])

    def test_periodic_undeployed_change_cannot_enter_learning_or_scale(self):
        queue = {"tasks": [{
            "task_id": "NOT-DEPLOYED", "status": "READY", "next_check": DAY,
            "learning_evidence": {"baseline": "before", "change": "snippet",
                                  "production_deploy": {"deployed": False},
                                  "online_verify": {"deployed": True, "status": "OK"}, "retest": "after"},
            "scale_evidence": "unverified claim"
        }]}
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps(queue))
        self.write(".hermes/logs/lane-status.json", json.dumps({"lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        result = subprocess.run([sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                                 "--repo", str(self.repo)], cwd=self.repo, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        report = json.loads((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.json").read_text(encoding="utf-8"))
        self.assertEqual(report["learning_candidates"], [])
        self.assertEqual(report["learning"]["scale_allowed_task_ids"], [])
        self.assertEqual((self.repo / ".hermes/logs/learning-candidates.jsonl").read_text(encoding="utf-8"), "")

    def test_periodic_same_input_replay_is_byte_idempotent_without_queue_write(self):
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": []}))
        self.write(".hermes/logs/lane-status.json", json.dumps({"lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        command = [sys.executable, str(FEEDBACK), "--period", "weekly", "--date", DAY,
                   "--repo", str(self.repo)]
        outputs = []
        for _ in range(2):
            result = subprocess.run(command, cwd=self.repo, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            outputs.append(tuple((self.repo / f".hermes/logs/periodic-review-weekly-{DAY}.{ext}").read_bytes()
                                 for ext in ("json", "md")))
        self.assertEqual(outputs[0], outputs[1])

    def test_finalize_preserves_partial_and_no_op_verdicts(self):
        for verdict in ("PARTIAL", "NO_OP"):
            with self.subTest(verdict=verdict):
                self.write(f".hermes/logs/{DAY}-{LANE}.md",
                           f"VERDICT: {verdict}\nCONSUMED: fixture\n"
                           "DELIVERED: analysis only\nNEXT: external input required\n")
                self.commit_all(f"committed {verdict} report")
                before = self.commit_count()
                result = self.run_finalize(0)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertEqual(self.commit_count(), before)
                row = self.bus()[-1]
                self.assertEqual(row["verdict"], verdict)
                self.assertEqual(row["state"], "completed")
                self.assertTrue(row["key_consumed"])
                self.assertEqual(row["wrapper_exit"], 0)

    def test_lane_status_distinguishes_partial_attention_from_no_op(self):
        today = dt.date.today()
        days = [(today - dt.timedelta(days=1)).isoformat(), today.isoformat()]
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [{
            "task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00",
            "reportGlob": "*-daily-content.md",
        }]}))
        rows = []
        for day, verdict in zip(days, ("NO_OP", "PARTIAL")):
            report = f"{day}-daily-content.md"
            self.write(f".hermes/logs/{report}",
                       f"VERDICT: {verdict}\nCONSUMED: fixture\nDELIVERED: analysis\nNEXT: follow up only\n")
            rows.append({"run_id": f"run-{verdict}", "lane": LANE, "fired_at": f"{day} 00:00:00",
                         "idempotency_key": f"key-{verdict}", "key_consumed": True,
                         "verdict": verdict, "state": "completed", "dsh_exit": 0,
                         "report_auto_generated": False})
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(row) + "\n" for row in rows))
        result = subprocess.run([shutil.which("node") or "node", "scripts/lane-status.mjs",
                                 "--days=2", "--quiet", "--no-sched"], cwd=self.repo,
                                capture_output=True, text=True)
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        output = json.loads((self.repo / ".hermes/logs/lane-status.json").read_text(encoding="utf-8"))
        statuses = {row["day"]: row for row in output["lanes"][0]["days"]}
        self.assertEqual(statuses[days[1]]["status"], "PARTIAL")
        self.assertEqual(statuses[days[1]]["state"], "completed")
        self.assertEqual(statuses[days[1]]["recovery_plan"]["action"], "modify_payload")
        self.assertIn("NEXT", statuses[days[1]]["recovery_plan"]["reason"])
        self.assertEqual(statuses[days[0]]["status"], "NO_OP")
        self.assertEqual(statuses[days[0]]["state"], "completed")
        self.assertEqual(statuses[days[0]]["recovery_plan"]["action"], "none")

    def test_preflight_refreshes_stale_status_and_suppresses_resolved_retry(self):
        today = dt.date.today().isoformat()
        yesterday = (dt.date.today() - dt.timedelta(days=1)).isoformat()
        other = "ZP-gsc-feedback"
        self.write("scripts/lane-status.mjs", (ROOT / "scripts" / "lane-status.mjs").read_text(encoding="utf-8"))
        self.write(".hermes/cron-lanes.json", json.dumps({"lanes": [
            {"task": LANE, "schedule": {"kind": "DAILY"}, "start": "00:00", "reportGlob": "*-daily-content.md"},
            {"task": other, "schedule": {"kind": "DAILY"}, "start": "00:00", "reportGlob": "*-gsc-feedback.md"},
        ]}))
        self.write(".hermes/logs/lane-status.json", json.dumps({"generated_local": "2000-01-01 00:00", "lanes": []}))
        self.write(f".hermes/logs/{yesterday}-daily-content.md",
                   "VERDICT: STALE (AUTO-FILL)\nCONSUMED: host\nDELIVERED: NONE\nNEXT: old failure\n")
        for lane, suffix in ((LANE, "daily-content"), (other, "gsc-feedback")):
            self.write(f".hermes/logs/{today}-{suffix}.md",
                       "VERDICT: OK\nCONSUMED: fixture\nDELIVERED: current report\nNEXT: NONE\n")
        rows = [
            {"run_id": "old-stale", "lane": LANE, "fired_at": f"{yesterday} 00:00:00",
             "verdict": "STALE", "state": "quarantined", "dsh_exit": 0, "report_auto_generated": True},
            {"run_id": "new-ok", "lane": LANE, "fired_at": f"{today} 00:00:00",
             "verdict": "OK", "state": "completed", "dsh_exit": 0, "report_auto_generated": False},
            {"run_id": "sibling-ok", "lane": other, "fired_at": f"{today} 00:00:00",
             "verdict": "OK", "state": "completed", "dsh_exit": 0, "report_auto_generated": False},
        ]
        self.write(".hermes/logs/lane-runs.jsonl", "".join(json.dumps(row) + "\n" for row in rows))
        result = subprocess.run([sys.executable, str(PREFLIGHT), "--lane", LANE, "--repo", str(self.repo),
                                 "--acquire", "--skip-runtime-check"], cwd=self.repo,
                                capture_output=True, text=True, encoding="utf-8", errors="replace")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        context = json.loads((self.repo / f".hermes/logs/run-context-{LANE}.json").read_text(encoding="utf-8"))
        self.assertEqual(context["retry_queue"], [])
        self.assertEqual(context["suppressed_retry_queue"][0]["kind"], "SUPPRESSED_RESOLVED_DAY")
        self.assertEqual(context["suppressed_retry_queue"][0]["resolved_by_day"], today)
        self.assertEqual([row["lane"] for row in context["sibling_lanes"]], [other])
        status_check = next(row for row in context["preflight"]["checks"] if row["name"] == "lane_status_available")
        self.assertIn("refreshed_stale=True", status_check["detail"])

    def test_preflight_partial_follows_next_without_repeating_delivery(self):
        today = dt.date.today().isoformat()
        report = f".hermes/logs/{today}-daily-content.md"
        self.write(report, "VERDICT: PARTIAL\nCONSUMED: fixture\nDELIVERED: completed analysis\n"
                           "NEXT: wait for approved commercial truth; do not rewrite delivered analysis\n")
        previous = {"run_id": "partial-run", "lane": LANE, "fired_at": f"{today} 00:00:00",
                    "verdict": "PARTIAL", "state": "completed", "key_consumed": True}
        self.write(".hermes/logs/lane-runs.jsonl", json.dumps(previous) + "\n")
        self.write(".hermes/logs/lane-status.json", json.dumps({
            "generated_local": f"{today} 01:00", "lanes": [{"task": LANE, "days": [{
                "day": today, "status": "PARTIAL", "report": report,
            }]}],
        }))
        result = subprocess.run([sys.executable, str(PREFLIGHT), "--lane", LANE, "--repo", str(self.repo),
                                 "--acquire", "--skip-runtime-check"], cwd=self.repo,
                                capture_output=True, text=True, encoding="utf-8", errors="replace")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        context = json.loads((self.repo / f".hermes/logs/run-context-{LANE}.json").read_text(encoding="utf-8"))
        self.assertEqual(len(context["retry_queue"]), 1)
        follow_up = context["retry_queue"][0]
        self.assertEqual(follow_up["kind"], "FOLLOW_UP_PARTIAL")
        self.assertIn("approved commercial truth", follow_up["next"])
        self.assertEqual(follow_up["candidate_files"], [])

    def test_focus_delta_respects_queue_cooldown_and_low_sample_gate(self):
        module = load_module("zp_feedback_constraint_test", FEEDBACK)
        review_day = dt.date(2026, 11, 13)
        delta = {"focus_query_deltas_28d": [
            {"query": "small batch sticker printing", "classification": "MONEY", "latest_page1": True,
             "latest_zero_click": True, "observations_28d": [{
                 "export_date": "2026-11-12", "impressions": 21, "clicks": 0, "position": 7.29,
             }]},
            {"query": "saddle stitch booklet printing", "classification": "MONEY", "latest_page1": True,
             "latest_zero_click": True, "observations_28d": [{
                 "export_date": "2026-11-12", "impressions": 1, "clicks": 0, "position": 4.0,
             }]},
        ]}
        gsc = {"focus_delta": module.focus_delta_handoff(delta, "fixture.json", review_day)}
        blog = {"available": True, "items": [{
            "cluster": "stickers-en", "decision": "REMEASURE_NOT_DUE", "recheck_after": "2026-11-28",
            "money_queries": ["small batch sticker printing"],
        }]}
        module.apply_blog_queue_constraints(gsc, blog, review_day)
        rows = {row["query"]: row for row in gsc["focus_delta"]["items"]}
        small_batch = rows["small batch sticker printing"]
        self.assertEqual(small_batch["route"], "HOLD")
        self.assertEqual(small_batch["retry_at"], "2026-11-28")
        self.assertEqual(small_batch["queue_constraint"]["cluster"], "stickers-en")
        low_sample = rows["saddle stitch booklet printing"]
        self.assertEqual(low_sample["route"], "HOLD")
        self.assertIn("at least 20", low_sample["approval_gate"])

    def prepare_coordination_fixture(self, tasks):
        today = dt.date.today().isoformat()
        self.write(".hermes/logs/strategy-task-queue.json", json.dumps({"tasks": tasks}, ensure_ascii=False))
        self.write(".hermes/cron-prompts/blog-money-keyword-queue.json", json.dumps({
            "source_window": "2026-10-14..2026-11-10",
            "latest_evidence_handoff": {"serp_status": "SERP_UNAVAILABLE"},
            "items": [],
        }, ensure_ascii=False))
        self.write(".hermes/logs/lane-status.json", json.dumps({"generated_local": today, "lanes": []}))
        self.write(".hermes/logs/lane-runs.jsonl", "")
        return today

    def run_coordination_preflight(self):
        return subprocess.run([sys.executable, str(PREFLIGHT), "--lane", LANE, "--repo", str(self.repo),
                               "--acquire", "--skip-runtime-check"], cwd=self.repo,
                              capture_output=True, text=True, encoding="utf-8", errors="replace")

    def test_coordination_board_is_rebuilt_and_injected_into_run_context(self):
        today = self.prepare_coordination_fixture([{
            "task_id": "READY-COORDINATED", "status": "READY", "owner_lane": LANE,
            "target": "海報印刷 bounded truth fixture", "score": 88, "next_check": DAY,
            "approval_gate": "approved fixture", "write_scope": [".hermes/logs/"], "evidence": ["fixture"],
        }])
        result = self.run_coordination_preflight()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        context = json.loads((self.repo / f".hermes/logs/run-context-{LANE}.json").read_text(encoding="utf-8"))
        self.assertTrue(context["coordination"]["available"])
        self.assertEqual(context["coordination"]["ready_task_ids"], ["READY-COORDINATED"])
        self.assertEqual(context["coordination"]["ready_tasks"][0]["baseline"]["rows"]["海報印刷"],
                         "NO_CURRENT_BASELINE")
        self.assertTrue(any("coordination.ready_tasks" in row for row in context["instructions_to_lane"]))
        check = next(row for row in context["preflight"]["checks"] if row["name"] == "coordination_board")
        self.assertTrue(check["ok"])
        self.assertEqual(context["coordination"]["run_date"], today)

    def test_coordination_board_never_promotes_gated_task_states(self):
        self.prepare_coordination_fixture([
            {"task_id": "READY-ONE", "status": "READY", "owner_lane": LANE, "score": 10,
             "target": "approved fixture", "write_scope": [".hermes/logs/"]},
            {"task_id": "WAITING-ONE", "status": "WAITING_K3", "owner_lane": LANE, "score": 100,
             "target": "unapproved structural change", "approval_gate": "WAITING_K3"},
            {"task_id": "HOLD-ONE", "status": "MEASURE_HOLD", "owner_lane": LANE, "score": 99,
             "target": "future retest", "next_check": "2999-01-01"},
        ])
        result = self.run_coordination_preflight()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        board = json.loads((self.repo / ".hermes/logs/coordination-board.json").read_text(encoding="utf-8"))
        self.assertEqual(board["lane_assignments"][LANE], ["READY-ONE"])
        states = {row["task_id"]: row["status"] for row in board["tasks"]}
        self.assertEqual(states["WAITING-ONE"], "WAITING_K3")
        self.assertEqual(states["HOLD-ONE"], "MEASURE_HOLD")

    def test_coordination_missing_gsc_degrades_without_blocking_preflight(self):
        self.prepare_coordination_fixture([{
            "task_id": "READY-NO-GSC", "status": "READY", "owner_lane": LANE,
            "target": "教科書印刷 fixture", "write_scope": [".hermes/logs/"],
        }])
        result = self.run_coordination_preflight()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        board = json.loads((self.repo / ".hermes/logs/coordination-board.json").read_text(encoding="utf-8"))
        self.assertFalse(board["inputs"]["gsc_delta"]["available"])
        task = next(row for row in board["tasks"] if row["task_id"] == "READY-NO-GSC")
        self.assertEqual(task["baseline"]["status"], "NO_CURRENT_BASELINE")
        context = json.loads((self.repo / f".hermes/logs/run-context-{LANE}.json").read_text(encoding="utf-8"))
        self.assertEqual(context["coordination"]["ready_task_ids"], ["READY-NO-GSC"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
