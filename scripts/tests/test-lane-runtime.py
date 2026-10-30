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
        status = {"lanes": [{"task": LANE, "verdict": "BLOCKED",
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
        status = {"lanes": [{"task": LANE, "verdict": "OK",
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
        status = {"lanes": [{"task": LANE, "verdict": "BLOCKED",
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


if __name__ == "__main__":
    unittest.main(verbosity=2)
