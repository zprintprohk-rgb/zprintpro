# -*- coding: utf-8 -*-
import json, io
p = r"F:\zprintpro-nextjs\.hermes\logs\b1c-queue-progress.json"
d = json.load(io.open(p, encoding="utf-8"))
d["clusters"].append({
    "order": 25,
    "cluster": "信封类目块自相矛盾修复 (同页 100 vs 500 起订) — 全域 MOQ 普查副产物",
    "slugs": ["category:envelopes"],
    "status": "DONE",
    "claimed_by": "autoclaw manual session (同批攒批)",
    "claimed_at": "2026-10-24T03:30:00+08:00",
    "completed_at": "2026-10-24T03:42:00+08:00",
    "verdict": {
        "finding": "信封块同页自相矛盾: featuredSnippet + h2 写「100 個起」(与 products.ts 一致), 而 coreAdvantages / techSpecs 起訂量 / FAQ 写「500 個起訂」; 交期带 500–2,000 個即日段",
        "truth": "products.ts 4 个 envelope SKU (business-envelopes / colored-envelopes / large-envelopes / pearl-envelopes) minQuantity 全 = 100",
        "fix": "5 条规则对齐 100 (含 100–2,000 個即日段); envelope zh 段 '500 個起訂' 断言 = 0",
        "invariants": "tsc 54=54",
        "push": "4d7650b7 与 f86668fd 同批 (03:46 窗口)"
    },
    "note": "同类缺陷 (同页多处 MOQ 不一致) 只靠人工普查发现; 建议做成常驻检查: 每类目块内 MOQ 数字集合 vs products.ts minQuantity"
})
d["updated_at"] = "2026-10-24T03:42:00+08:00"
io.open(p, "w", encoding="utf-8", newline="").write(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
print("entries:", len(d["clusters"]))
