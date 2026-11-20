"""验证 lane-git-commit.py 幂等键修复（2026-10-10 §6-A）。

断言四件事：
1. 两侧 idempotency_key() 算法一致（同参同值）；
2. 修复后 resolve_idempotency_key() 直接采用 preflight 落盘的 this_run_key；
3. 缺 run-context 时回退值与 preflight 口径完全相同；
4. 复现真实分歧：旧调用口径能算出 lane-runs 里那个「另一个键」，证明诊断成立。
"""
import importlib.util
import json
import os
import tempfile


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


gc = load("scripts/lane-git-commit.py", "lane_git_commit")
pf = load("scripts/lane-preflight.py", "lane_preflight")

LANE = "ZP-blog-deepfix"
DAY = "2026-10-10"
REPORT = ".hermes/logs/2026-10-10-ZP-blog-deepfix.md"

pf_key = pf.idempotency_key(LANE, "run", "lane-default", DAY)
gc_same = gc.idempotency_key(LANE, "run", "lane-default", DAY)
old_key = gc.idempotency_key(LANE, "deliver", REPORT, DAY)

print("1) preflight key                 =", pf_key)
print("   git-commit key (same args)    =", gc_same)
print("   algorithms agree              =", pf_key == gc_same)
print("2) OLD git-commit call-site key  =", old_key)
print("   == real lane-runs.jsonl value =", old_key == "e5038594dc97fb9f")
print("   preflight == real run-context =", pf_key == "37eaab37ee14ebaf")
print("   -> diagnosis: two keys/day    =", old_key != pf_key)

with tempfile.TemporaryDirectory() as tmp:
    logs = os.path.join(tmp, ".hermes", "logs")
    os.makedirs(logs)
    with open(os.path.join(logs, f"run-context-{LANE}.json"), "w", encoding="utf-8") as fh:
        json.dump({"idempotency": {"this_run_key": "deadbeefdeadbeef"}}, fh)
    got = gc.resolve_idempotency_key(LANE, tmp)
    fallback = gc.resolve_idempotency_key(LANE, os.path.join(tmp, "missing"))
    print("3) resolver reads run-context   =", got, "OK" if got == "deadbeefdeadbeef" else "FAIL")
    print("   resolver fallback            =", fallback)
    print("   fallback == preflight        =", fallback == pf_key)
    print("   single-source equality       =", got == pf_key or "n/a (context key is synthetic)")
