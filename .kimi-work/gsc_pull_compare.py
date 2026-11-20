from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE_PATH = ROOT / "scripts" / "fetch_gsc_data.py"
spec = importlib.util.spec_from_file_location("zprintpro_gsc_fetch", MODULE_PATH)
gsc = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(gsc)

env = gsc.load_env()
ok, info, key_path, site_url = gsc.ensure_auth(env)
if not ok:
    raise SystemExit(info)
client = gsc.build_client(key_path, info)

jobs = [
    ("query,page,country", "2026-09-28", "2026-10-25", ".hermes/logs/gsc-query-page-country-2026-10-26.csv"),
    ("query,country", "2026-08-31", "2026-09-27", ".hermes/logs/gsc-query-country-previous-28d-2026-10-26.csv"),
    ("query,page,country", "2026-08-31", "2026-09-27", ".hermes/logs/gsc-query-page-country-previous-28d-2026-10-26.csv"),
    ("date,country", "2026-08-31", "2026-10-25", ".hermes/logs/gsc-date-country-56d-2026-10-26.csv"),
]
for dimensions, start, end, relative_out in jobs:
    dims = dimensions.split(",")
    rows = gsc.fetch_search_analytics(client, site_url, start, end, dimensions=dims)
    out = ROOT / relative_out
    stats = gsc.write_csv(rows, out, dimensions=dims)
    print(f"{dimensions} {start}..{end}: {stats} -> {out}")
