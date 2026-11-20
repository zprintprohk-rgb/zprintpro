"""
Update matrix.json: add 3 new queue entries + 3 covered entries for Q-NEW-01/02/03
(2026-07-20 daily cron - Tier C 行业首次覆盖: 宗教文化 / 工業機械 / 建築工程)
"""
import json
from pathlib import Path

p = Path(r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json")
data = json.loads(p.read_text(encoding="utf-8"))

# 1) Add 3 new queue entries
new_queue = [
    {
        "id": "Q-NEW-01",
        "category": "packaging",
        "sku": "rigid-boxes + gift-boxes + paper-bags",
        "industry": "宗教文化",
        "tier": "C",
        "priority": "P1",
        "slug": "religious-ceremony-printing-guide",
        "title_zh": "香港宗教禮儀印刷指南 · 教堂寺廟殯儀禮盒感謝袋定制 | 智印雲 ZprintPro",
        "title_en": "Religious Ceremony Printing Guide: Custom Church / Temple / Memorial Boxes & Gift Bags | ZprintPro",
        "title_ja": "宗教儀式印刷ガイド：教会・寺院・メモリアル ボックス＆ギフト バッグ カスタム | ZprintPro",
        "valid_internal_links": [
            "/category/packaging/",
            "/category/paper-bags/",
            "/product/gift-boxes/",
            "/product/rigid-boxes/",
            "/product/kraft-paper-bags/",
            "/quote/"
        ],
        "expected_words_zh": 900,
        "expected_faqs": 4,
        "queued_at": "2026-07-20",
        "priority_boost": 1,
        "status": "completed",
        "completed_at": "2026-07-20",
        "completed_slug": "religious-ceremony-printing-guide",
        "note": "2026-07-20 daily cron NEW Tier C 行业首次覆盖 (宗教文化 — 教堂 / 佛寺 / 道觀 / 殯儀館 3 大場景 × 5 種材質, 50-500 套精準下單)"
    },
    {
        "id": "Q-NEW-02",
        "category": "stickers",
        "sku": "waterproof-stickers + security-stickers + product-labels",
        "industry": "工業機械",
        "tier": "C",
        "priority": "P1",
        "slug": "industrial-nameplate-printing-guide",
        "title_zh": "工業設備銘牌 / GHS 危險標籤印刷指南 · UL 認證 + ANSI Z535 標準 | 智印雲 ZprintPro",
        "title_en": "Industrial Equipment Nameplate & GHS Hazard Label Printing Guide: UL Certified + ANSI Z535 Standard | ZprintPro",
        "title_ja": "工業設備銘板 / GHS 危険ラベル印刷ガイド：UL 認証 + ANSI Z535 規格 | ZprintPro",
        "valid_internal_links": [
            "/category/stickers/",
            "/product/waterproof-stickers/",
            "/product/security-stickers/",
            "/product/product-labels/",
            "/quote/"
        ],
        "expected_words_zh": 950,
        "expected_faqs": 4,
        "queued_at": "2026-07-20",
        "priority_boost": 2,
        "status": "completed",
        "completed_at": "2026-07-20",
        "completed_slug": "industrial-nameplate-printing-guide",
        "note": "2026-07-20 daily cron NEW Tier C 行业首次覆盖 (工業機械 — UL 969 認證 / GHS 危險化學品 / ANSI Z535 色彩 3 大合規驅動, 5 種材質 100-50,000 張小至大批量)"
    },
    {
        "id": "Q-NEW-03",
        "category": "books",
        "sku": "catalog-printing + saddle-stitch-booklets",
        "industry": "建築工程",
        "tier": "C",
        "priority": "P1",
        "slug": "construction-material-sample-book-printing-guide",
        "title_zh": "建築裝飾材料樣板手冊印刷指南 · 瓷磚石材窗簾色卡定制 | 智印雲 ZprintPro",
        "title_en": "Construction Material Sample Book Printing Guide: Tile, Stone, Curtain, Flooring Color Card Custom | ZprintPro",
        "title_ja": "建築装飾材料サンプルブック印刷ガイド：タイル・石材・カーテン・フローリング カラー カード カスタム | ZprintPro",
        "valid_internal_links": [
            "/category/books/",
            "/product/catalog-printing/",
            "/product/saddle-stitch-booklets/",
            "/quote/"
        ],
        "expected_words_zh": 900,
        "expected_faqs": 4,
        "queued_at": "2026-07-20",
        "priority_boost": 1,
        "status": "completed",
        "completed_at": "2026-07-20",
        "completed_slug": "construction-material-sample-book-printing-guide",
        "note": "2026-07-20 daily cron NEW Tier C 行业首次覆盖 (建築工程 — 瓷磚 / 石材 / 窗簾 / 地板 / 燈飾 5 大品類 + 5 種裝訂方式 + 真材實料樣辦夾層, 50-500 本小批量)"
    }
]
data["queue"].extend(new_queue)

# 2) Add 3 new covered entries
new_covered = [
    {
        "id": "Q-NEW-01",
        "slug": "religious-ceremony-printing-guide",
        "category": "packaging",
        "sku": "rigid-boxes + gift-boxes + paper-bags",
        "industry": "宗教文化",
        "tier": "C",
        "priority": "P1",
        "covered_at": "2026-07-20",
        "deployed_at": "2026-07-20T10:35:00+08:00",
        "deploy_method": "git push origin_ssh main → CF Pages auto-deploy (v4 daily 3-blog pack Q-NEW-01 NEW 宗教文化 Tier C 拓點)",
        "verify_status": "pending-7-step",
        "locale_chars": {
            "zh-hk": 2807,
            "en": 5778,
            "ja": 3327
        },
        "nap_decoupled": True,
        "internal_links_count": 5,
        "no_images": True,
        "verify_steps": "pending-7-step",
        "cf_build_run": "pending-2026-07-20",
        "deployed_commit": "pending-2026-07-20",
        "note": "2026-07-20 daily cron Tier C 宗教文化 行业首次覆盖 (教堂/佛寺/道觀/殯儀館 4 種場景, 5 種材質 50-500 套精準下單)"
    },
    {
        "id": "Q-NEW-02",
        "slug": "industrial-nameplate-printing-guide",
        "category": "stickers",
        "sku": "waterproof-stickers + security-stickers + product-labels",
        "industry": "工業機械",
        "tier": "C",
        "priority": "P1",
        "covered_at": "2026-07-20",
        "deployed_at": "2026-07-20T10:35:00+08:00",
        "deploy_method": "git push origin_ssh main → CF Pages auto-deploy (v4 daily 3-blog pack Q-NEW-02 NEW 工業機械 Tier C 拓點)",
        "verify_status": "pending-7-step",
        "locale_chars": {
            "zh-hk": 3413,
            "en": 6346,
            "ja": 3653
        },
        "nap_decoupled": True,
        "internal_links_count": 5,
        "no_images": True,
        "verify_steps": "pending-7-step",
        "cf_build_run": "pending-2026-07-20",
        "deployed_commit": "pending-2026-07-20",
        "note": "2026-07-20 daily cron Tier C 工業機械 行业首次覆盖 (UL 969 認證 / GHS 危險化學品 / ANSI Z535 色彩 3 大合規驅動, 5 種材質 100-50,000 張小至大批量)"
    },
    {
        "id": "Q-NEW-03",
        "slug": "construction-material-sample-book-printing-guide",
        "category": "books",
        "sku": "catalog-printing + saddle-stitch-booklets",
        "industry": "建築工程",
        "tier": "C",
        "priority": "P1",
        "covered_at": "2026-07-20",
        "deployed_at": "2026-07-20T10:35:00+08:00",
        "deploy_method": "git push origin_ssh main → CF Pages auto-deploy (v4 daily 3-blog pack Q-NEW-03 NEW 建築工程 Tier C 拓點)",
        "verify_status": "pending-7-step",
        "locale_chars": {
            "zh-hk": 3232,
            "en": 6607,
            "ja": 3985
        },
        "nap_decoupled": True,
        "internal_links_count": 5,
        "no_images": True,
        "verify_steps": "pending-7-step",
        "cf_build_run": "pending-2026-07-20",
        "deployed_commit": "pending-2026-07-20",
        "note": "2026-07-20 daily cron Tier C 建築工程 行业首次覆盖 (瓷磚/石材/窗簾/地板/燈飾 5 大品類 + 5 種裝訂方式 + 真材實料樣辦夾層, 50-500 本小批量)"
    }
]
data["covered"].extend(new_covered)

# 3) Update stats
p0_total = data["stats"].get("p0_total", 11)
p0_covered = data["stats"].get("p0_covered", 11)
p1_total = data["stats"].get("p1_total", 7)
p1_covered = data["stats"].get("p1_covered", 7)
data["stats"]["queue_size"] = len(data["queue"])
data["stats"]["covered_count"] = len(data["covered"])
data["stats"]["p0_total"] = p0_total
data["stats"]["p0_covered"] = p0_covered
data["stats"]["p1_total"] = p1_total
data["stats"]["p1_covered"] = p1_covered
data["stats"]["tier_c_count"] = data["stats"].get("tier_c_count", 1) + 3  # was 1, now 4
data["stats"]["last_updated"] = "2026-07-20"
data["stats"]["last_updated_event"] = (
    "cron zprintpro-daily-content-evolve 2026-07-20: 3 博客全 3 locale 上線 "
    "(Q-NEW-01 宗教文化 packaging / Q-NEW-02 工業機械 stickers / Q-NEW-03 建築工程 books — Tier C 行业首次覆盖). "
    "+3 SKU optimization (transparent-stickers / kraft-paper-bags / rigid-boxes). "
    "Tier C 1→4 (宗教文化+工業機械+建築工程). "
    "P0 7/25 → 10/25 (新增 3 個 SKU 優化). "
    "Next cron (2026-07-21 daily): Q-NEW-04/05/06 TBD."
)
data["lastUpdated"] = "2026-07-20"

# Write back
p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"DONE: matrix.json updated")
print(f"  queue: {len(data['queue'])} entries")
print(f"  covered: {len(data['covered'])} entries")
print(f"  tier_c_count: {data['stats']['tier_c_count']}")
print(f"  last_updated: {data['last_updated']}")
print(f"  file size: {p.stat().st_size} bytes")
