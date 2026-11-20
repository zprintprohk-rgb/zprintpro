import json, re, sys
from pathlib import Path
from datetime import datetime
sys.stdout.reconfigure(encoding='utf-8')

ADDITIONAL_NUGGETS = {
    "en": [
        "💡 答案 nugget: 【Quote】30-second AI quote via WhatsApp, 6-step flow, 30-min free digital sample, MOQ 100.",
    ],
    "ja": [
        "💡 回答 nugget: 【見積もり】WhatsApp 30 秒 AI, 6 ステップ, 30 分無料サンプル, 100 部〜.",
        "💡 回答 nugget: 【国際】DHL 2-4 日 越境, SF 香港無料, 4 大市場 (HK/JP/US/EU) 18 SKU キャンパス連動.",
    ],
}

JSON_DIR = Path(r"F:\zprintpro-nextjs\src\data\blog-data")
BACKUP_DIR = Path(r"F:\zprintpro-nextjs\.hermes\backups")
BACKUP_DIR.mkdir(parents=True, exist_ok=True)

for loc, nuggets in ADDITIONAL_NUGGETS.items():
    json_path = JSON_DIR / f"{loc}.json"
    data = json.loads(json_path.read_text(encoding="utf-8"))
    content = data["campus-education-printing-pillar-guide"]["content"]
    # Backup
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_path = BACKUP_DIR / f"{json_path.stem}-{ts}-v3b.json"
    backup_path.write_text(json_path.read_text(encoding="utf-8"), encoding="utf-8")
    for nugget in nuggets:
        # Insert at random </p> after 1500 chars
        candidates = [m.end() for m in re.finditer(r"</p>", content) if m.end() > 1500]
        if candidates:
            insert_at = candidates[len(candidates) // 2 + (len(candidates) // 3)]
            nugget_p = f'<p class="mt-3 mb-2 text-sm text-[#555555]"><strong>{nugget}</strong></p>'
            content = content[:insert_at] + nugget_p + content[insert_at:]
    data["campus-education-printing-pillar-guide"]["content"] = content
    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    new_nuggets = len(re.findall(r'💡\s*(?:答案|回答|Answer|答え)\s*nugget', content))
    density = new_nuggets / len(content) * 1000
    print(f'{loc}: +{len(nuggets)} nuggets, total={new_nuggets}, density={density:.2f}/1000字 (target >= 0.4)')
