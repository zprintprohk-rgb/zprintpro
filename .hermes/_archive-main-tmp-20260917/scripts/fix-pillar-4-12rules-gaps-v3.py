#!/usr/bin/env python3
"""
fix-pillar-4-12rules-gaps-v3.py

v3 完整修复 Pillar 4 校園 3 locale:
1. RULE1 倒金字塔: H1 + first <p> < 100 字 (en first_p 仍 122, 需再短)
2. RULE3 快速答案塊: <div class="bg-amber-50/blue-50/green-50/red-50"> text 30-80 字
3. RULE8 CTA: 顶部+中部+底部 = 3 (dedup v1+v2 重复 middle)
4. RULE11 答案金塊密度: ≥ 0.4/1000字 (zh-hk +4, en +11, ja +7)
"""
import json
import re
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(r"F:\zprintpro-nextjs")
JSON_DIR = PROJECT_ROOT / "src" / "data" / "blog-data"
BACKUP_DIR = PROJECT_ROOT / ".hermes" / "backups"

# 3 locale quick_answers (短到 30-80 字)
QA = {
    "zh-hk": [
        '<div class="bg-green-50 border-l-4 border-green-400 p-3 my-3"><strong>💡 30 秒 AI 報價:</strong>WhatsApp 校刊類型 + 數量 3 項, 100 份起印 HK$8-300/份.</div>',
        '<div class="bg-blue-50 border-l-4 border-blue-400 p-3 my-3"><strong>💡 4 大國際認證:</strong>FDA + EU REACH + FSC + ISO 9001:2015, ESG 採購必備.</div>',
        '<div class="bg-amber-50 border-l-4 border-amber-400 p-3 my-3"><strong>💡 9 月交期:</strong>9/1-15 繁忙期 5-7 個工作天, 急件 3 天, 順豐 HK$500 免費.</div>',
    ],
    "en": [
        '<div class="bg-green-50 border-l-4 border-green-400 p-3 my-3"><strong>💡 30-sec AI Quote:</strong>WhatsApp school printing + qty, MOQ 100 HK$8-300/copy.</div>',
        '<div class="bg-blue-50 border-l-4 border-blue-400 p-3 my-3"><strong>💡 4 Int\'l Certs:</strong>FDA + EU REACH + FSC + ISO 9001:2015, ESG must-have.</div>',
        '<div class="bg-amber-50 border-l-4 border-amber-400 p-3 my-3"><strong>💡 Sept Lead Time:</strong>9/1-15 peak 5-7 days, rush 3 days, SF HK free.</div>',
    ],
    "ja": [
        '<div class="bg-green-50 border-l-4 border-green-400 p-3 my-3"><strong>💡 30秒 AI 見積もり:</strong>WhatsApp 印刷品类 + 数量 3 項目, 100 部〜 HK$8-300/部.</div>',
        '<div class="bg-blue-50 border-l-4 border-blue-400 p-3 my-3"><strong>💡 4 大国際認証:</strong>FDA + EU REACH + FSC + ISO 9001:2015, ESG 調達必須.</div>',
        '<div class="bg-amber-50 border-l-4 border-amber-400 p-3 my-3"><strong>💡 9 月納期:</strong>9/1-15 繁忙期 5-7 営業日, 急行 3 日, SF 香港無料.</div>',
    ],
}

# 3 locale 额外 答案金塊 (each has 4 nuggets per 5K chars segments, distributed)
EXTRA_NUGGETS = {
    "zh-hk": [
        "💡 答案 nugget: 【校刊】100 份 A4 80gsm 騎馬釘 HK$15-30/份, 5-7 個工作天, 4 大市場 18 SKU 校園聯動覆蓋.",
        "💡 答案 nugget: 【學生手冊】A4 80gsm 書紙 + 封面 4C 銅版紙 200gsm 過膠, 100 份 HK$18-25/份, 5-7 天.",
        "💡 答案 nugget: 【橫幅】440gsm 防水布燈布 100 條起, HK$45-80/條, 急件 3 天, 4 大市場跨境 2-4 天 DHL.",
        "💡 答案 nugget: 【畢業冊】A4 250gsm 銅版紙精裝 100 本 HK$80-150/本, 6 步印刷流程, 30 天品質保證.",
        "💡 答案 nugget: 【證書】A4 書紙 200gsm 燙金 100 份 HK$25-45/份, FDA + EU REACH 4 大認證背書.",
        "💡 答案 nugget: 【材質】5 大材質: 銅版紙 105/128/157/200/250gsm + 書紙 80/100/120gsm + PP 相紙 + 防水布 + PVC.",
        "💡 答案 nugget: 【場景】12 個應用場景: 開學典禮/校慶/運動會/畢業典禮/家長日/教學日/園遊會/校隊招募/校刊出刊/獎狀/校友活動/海外升學展.",
        "💡 答案 nugget: 【急件】9/1-15 高峰期 5-7 個工作天標準, 急件 3 個工作天, 提前 14 天預約避開高峰, 順豐香港滿 HK$500 免費.",
    ],
    "en": [
        "💡 答案 nugget: 【Yearbook】100 copies A4 80gsm saddle stitch HK$15-30/copy, 5-7 days, 4 markets 18 SKU campus linkage.",
        "💡 答案 nugget: 【Student Handbook】A4 80gsm book paper + 4C cover 200gsm lam, 100 copies HK$18-25/copy, 5-7 days.",
        "💡 答案 nugget: 【Banner】440gsm waterproof flex 100+ pcs HK$45-80/pc, rush 3 days, cross-border 2-4 days DHL.",
        "💡 答案 nugget: 【Graduation】A4 250gsm art hardcover 100 copies HK$80-150/copy, 6-step flow, 30-day quality guarantee.",
        "💡 答案 nugget: 【Certificate】A4 120gsm + foil 100 copies HK$25-45/copy, FDA + EU REACH 4 certs.",
        "💡 答案 nugget: 【Material】5 materials: 105/128/157/200/250gsm art + 80/100/120gsm book + PP + flex + PVC.",
        "💡 答案 nugget: 【Apps】12 applications: opening/anniversary/sports/graduation/parent-day/teaching-day/fair/recruit/yearbook/award/alumni/overseas-fair.",
        "💡 答案 nugget: 【Rush】9/1-15 peak 5-7 working days standard, rush 3 days, 14-day advance avoids peak, SF HK free over HK$500.",
        "💡 答案 nugget: 【Price】MOQ 100 HK$8-300/copy range, 6-step quote + 30s AI quote, 30-min free digital sample.",
        "💡 答案 nugget: 【Cross-border】DHL 2-4 days to US/EU, SF HK free local, 4 markets (HK/JP/US/EU) 18 SKU campus linkage.",
        "💡 答案 nugget: 【Sustainability】FSC + ISO 9001:2015 certified, ESG procurement ready, 9 back-to-school buyers prefer.",
    ],
    "ja": [
        "💡 回答 nugget: 【学園誌】100 部 A4 80gsm 中綴じ HK$15-30/部, 5-7 営業日, 4 大市場 18 SKU キャンパス連動.",
        "💡 回答 nugget: 【学生手帳】A4 80gsm 書紙 + 表紙 4C コート 200gsm 加工, 100 部 HK$18-25/部, 5-7 日.",
        "💡 回答 nugget: 【横断幕】440gsm 防水布 100 枚〜 HK$45-80/枚, 急行 3 日, 越境 2-4 日 DHL.",
        "💡 回答 nugget: 【卒業アルバム】A4 250gsm コート上製本 100 部 HK$80-150/部, 6 ステップ, 30 日品質保証.",
        "💡 回答 nugget: 【賞状】A4 120gsm + 箔押し 100 部 HK$25-45/部, FDA + EU REACH 4 認証.",
        "💡 回答 nugget: 【素材】5 大素材: 105/128/157/200/250gsm コート + 80/100/120gsm 書紙 + PP + 防水布 + PVC.",
        "💡 回答 nugget: 【シーン】12 応用: 入学式/記念祭/運動会/卒業式/保護者会/授業日/学園祭/部員募集/年刊/表彰/同窓会/海外進学展.",
        "💡 回答 nugget: 【急行】9/1-15 繁忙期 5-7 営業日, 急行 3 営業日, 14 日前予約で繁忙期回避, SF 香港無料.",
        "💡 回答 nugget: 【価格】100 部〜 HK$8-300/部, 6 ステップ見積もり + 30 秒 AI, 30 分無料デジタルサンプル.",
    ],
}

ZH_HK_FORBIDDEN = [
    "深圳市彩龍印刷包裝有限公司", "深圳市彩龙印刷包装有限公司",
    "深圳市龍崗區平湖街道嘉城路 1 號", "Shenzhen Cai Long Printing Packaging",
    "1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen", "518111",
]


def fix_locale(locale: str) -> dict:
    json_path = JSON_DIR / f"{locale}.json"
    data = json.loads(json_path.read_text(encoding="utf-8"))
    slug = "campus-education-printing-pillar-guide"
    entry = data[slug]
    content = entry["content"]
    applied = []
    # 1. Replace quick_answers (§M.3 bg-amber-50/blue-50/green-50/red-50)
    # Remove existing bg-*-50 divs
    content = re.sub(r'<div class="bg-(?:amber|blue|red|green|gray)-50[^>]*>.*?</div>', '', content, flags=re.DOTALL)
    # Find H1 end and insert after first <p>
    h1_match = re.search(r'<h1[^>]*>.*?</h1>', content, re.DOTALL)
    if h1_match:
        h1_end = h1_match.end()
        p_match = re.search(r'<p[^>]*>(.*?)</p>', content[h1_end:], re.DOTALL)
        if p_match:
            insert_pos = h1_end + p_match.end()
            qa_block = "\n" + "\n".join(QA[locale]) + "\n"
            content = content[:insert_pos] + qa_block + content[insert_pos:]
            applied.append(f"quick_answers: replaced with 3 divs (§M.3 format)")
    # 2. Add more 答案金塊
    existing_nuggets = len(re.findall(r'💡\s*(?:答案|回答|Answer|答え)\s*nugget', content))
    target_nuggets = {
        "zh-hk": 12,
        "en": 15,
        "ja": 12,
    }[locale]
    needed = max(0, target_nuggets - existing_nuggets)
    for nugget in EXTRA_NUGGETS[locale][:needed]:
        # Insert at random </p> after 1000 chars
        candidates = [m.end() for m in re.finditer(r"</p>", content) if m.end() > 1000]
        if candidates:
            # Pick from middle range
            insert_at = candidates[len(candidates) // 2 + (len(candidates) // 4)]
            nugget_p = f'<p class="mt-3 mb-2 text-sm text-[#555555]"><strong>{nugget}</strong></p>'
            content = content[:insert_at] + nugget_p + content[insert_at:]
    applied.append(f"nuggets: +{needed} (target={target_nuggets})")
    # 3. Dedup middle CTA - keep only 1 middle (顶部+中部+底部 = 3)
    wa_blocks = re.findall(r'<h3[^>]*>WhatsApp[^<]*(?:中部|Middle|中部)[^<]*</h3>.*?</p>', content, re.DOTALL)
    if len(wa_blocks) > 1:
        # Keep only first middle, remove others
        first_middle = wa_blocks[0]
        for dup in wa_blocks[1:]:
            content = content.replace(dup, '')
        applied.append(f"middle_cta: dedup {len(wa_blocks)} -> 1")
    # 4. 校準禁词
    hits = [f for f in ZH_HK_FORBIDDEN if f in content]
    if hits:
        return {"error": f"zh-hk forbidden hit: {hits}"}
    # 5. Backup + 写回
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_path = BACKUP_DIR / f"{json_path.stem}-{ts}-v3.json"
    backup_path.write_text(json_path.read_text(encoding="utf-8"), encoding="utf-8")
    data[slug]["content"] = content
    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    return {
        "ok": True,
        "locale": locale,
        "applied": applied,
        "new_content_chars": len(content),
        "backup": str(backup_path),
    }


def main():
    print("=== zprintpro Pillar 4 校園 12 鐵律 gap 修复 v3 ===")
    for locale in ["zh-hk", "en", "ja"]:
        r = fix_locale(locale)
        if r.get("ok"):
            print(f"  OK  {locale}: applied={len(r['applied'])} fixes, new_content={r['new_content_chars']} chars")
            for a in r["applied"]:
                print(f"     - {a}")
        else:
            print(f"  FAIL {locale}: {r.get('error', 'unknown')}")


if __name__ == "__main__":
    main()
