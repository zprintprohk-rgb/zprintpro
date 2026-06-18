#!/usr/bin/env python3
"""
JA PDP SEO/GEO Audit Script for zprintpro.
- Audits sku-seo-data.ts for English residue / MT artifacts in ja fields.
- Audits products.ts for CN contamination / empty longDescriptionJa.
- Cross-checks SKU coverage between files.
- Outputs JSON to docs/audit-ja-pdp-seo-2026-06-18-data.json
"""

import json
import re
import sys
from pathlib import Path
from collections import defaultdict, Counter

PROJECT_ROOT = Path(r"F:\zprintpro-nextjs")
SKU_SEO_FILE = PROJECT_ROOT / "src/data/sku-seo-data.ts"
PRODUCTS_FILE = PROJECT_ROOT / "src/data/products.ts"
OUT_DIR = PROJECT_ROOT / "docs"


SKU_KEY_RE = re.compile(r'(?m)^  "(?P<sku>[a-z0-9][a-z0-9\-]*)"\s*:\s*\{')
JA_BLOCK_RE = re.compile(r'"ja"\s*:\s*\{(?P<inner>.*?)\}\s*[,}]', re.DOTALL)
FIELD_RE = re.compile(r'"(?P<key>title|description|h1|body|keywords|imageAlt)"\s*:\s*"(?P<val>.*?)"', re.DOTALL)
KEYWORDS_ARRAY_RE = re.compile(r'"keywords"\s*:\s*\[(?P<arr>[^\]]*)\]', re.DOTALL)
KEYWORD_ITEM_RE = re.compile(r'"([^"]+)"')
IMAGE_ALT_RE = re.compile(r'"imageAlt"\s*:\s*\{(?P<inner>.*?)\}\s*[,}]', re.DOTALL)
LOC_FIELD_RE = re.compile(r'"(?P<loc>zh-hk|en|ja)"\s*:\s*"(?P<val>.*?)"', re.DOTALL)
NAME_BLOCK_RE = re.compile(r'"name"\s*:\s*\{(?P<inner>.*?)\}\s*[,}]', re.DOTALL)


def find_sku_blocks(text: str):
    matches = []
    for m in SKU_KEY_RE.finditer(text):
        sku = m.group("sku")
        i = m.end() - 1
        if text[i] != '{':
            continue
        depth = 0
        j = i
        while j < len(text):
            c = text[j]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    break
            j += 1
        matches.append((sku, i, j + 1))
    return matches


def extract_ja_seo(block_text: str) -> dict:
    out = {}
    m = JA_BLOCK_RE.search(block_text)
    if not m:
        return out
    inner = m.group("inner")
    for fm in FIELD_RE.finditer(inner):
        out[fm.group("key")] = fm.group("val")
    for km in KEYWORDS_ARRAY_RE.finditer(inner):
        out["keywords"] = KEYWORD_ITEM_RE.findall(km.group("arr"))
    return out


def extract_image_alt(block_text: str) -> dict:
    out = {}
    m = IMAGE_ALT_RE.search(block_text)
    if not m:
        return out
    inner = m.group("inner")
    for fm in LOC_FIELD_RE.finditer(inner):
        out[fm.group("loc")] = fm.group("val")
    return out


def extract_name(block_text: str) -> dict:
    m = NAME_BLOCK_RE.search(block_text)
    if not m:
        return {}
    out = {}
    for fm in LOC_FIELD_RE.finditer(m.group("inner")):
        out[fm.group("loc")] = fm.group("val")
    return out


# ---------- English-residue detection ----------

EN_MARKETING_RE = re.compile(
    r"\b("
    r"premium|luxury|fast|delivery|custom|same|day|printing|free|shipping|"
    r"business\s*cards|bespoke|thick|g|gsm|matte|glossy|spot\s*UV|foil|"
    r"stamped|stamping|embossing|cotton|coated|finish|design|designer|"
    r"professional|online|express|US|UK|USD|wholesale|DHL|MOQ|FSC|ISO|"
    r"transparent\s*pricing|free\s*US\s*shipping|24\s*hours|72\s*hours|"
    r"waterproof|transparent|high\s*quality|refined\s*touch|"
    r"round\s*corner|rounded\s*corner|elegant|sturdy|durable"
    r")\b",
    re.IGNORECASE,
)
JP_HIRA_KATA_RE = re.compile(r"[\u3040-\u309f\u30a0-\u30ff]")
JP_KANJI_RE = re.compile(r"[\u4e00-\u9fff]")
SELF_REP_RE = re.compile(r"^([\u3040-\u30ff\u4e00-\u9fffA-Za-z0-9\s]+?)の\1")

# High-confidence CN→JP mismatches: only those that are obviously Traditional CN compounds
# not commonly used in modern JP. (印刷/包装/材質 are valid JP kanji compounds — skip.)
CN_JP_MISMATCH = {
    "白卡紙袋": "白いカード紙袋",
    "化妝品": "化粧品",
    "高級赤紙": "高級赤封筒",
    "白卡紙": "白カード紙",
    "郵遞": "郵送",
    "禮盒": "ギフトボックス",
    "禮品": "ギフト",
    "訂製": "オーダーメイド",
    "銅版": "コート",
    "燙金": "箔押し",
    "光油": "UV加工",
    "速遞": "速達",
    "工商": "ビジネス",
    "廣告": "広告",
    "海報": "ポスター",
    "價錢": "価格",
    "優惠": "割引",
    "支持": "対応",
    "樣式": "スタイル",
    "顏色": "色",
    "購物": "購入",
    "發貨": "発送",
    "貨運": "配送",
    "粘紙": "ステッカー",
    "不粘": "再剥離",
    "啞面": "マット",
    "亮面": "光沢",
    "圓角": "角丸",
    "卡片紙": "カード用紙",
    "鏢貼": "ステッカー",
    "客製": "カスタム",
    "贴纸": "ステッカー",
    "印刷公司": "印刷会社",
    "保質期": "賞味期限",
    "茶餐廳": "茶餐廳(香港)／食堂",
    "中醫": "東洋医学",
    "西醫": "西洋医学",
    "大堂": "ロビー",
    "樓層": "フロア",
    "創業": "創業",
    "直銷": "直销",
    "專櫃": "コーナー",
    "樓盤": "物件",
    "裝修": "内装",
    "樣板間": "モデルルーム",
}


def has_jp(text: str) -> bool:
    return bool(JP_HIRA_KATA_RE.search(text))


def detect_english_residue(text: str, *, threshold_words: int = 2) -> dict:
    if not text:
        return {"has_en": False, "severity": "ok"}
    en_words = EN_MARKETING_RE.findall(text)
    has_kana = has_jp(text)
    leading_en = re.match(r"^\s+[A-Za-z][A-Za-z\s\.\,]+$", text)
    if leading_en:
        return {"has_en": True, "severity": "P0", "reason": "leading English phrase (template placeholder)", "raw": text[:80], "en_words": en_words}
    if len(en_words) >= threshold_words and not has_kana:
        return {"has_en": True, "severity": "P0", "reason": f"{len(en_words)} EN marketing words, no JP kana", "raw": text[:80], "en_words": en_words}
    if en_words and not has_kana:
        return {"has_en": True, "severity": "P1", "reason": "some EN words, no JP kana", "raw": text[:80], "en_words": en_words}
    if en_words and has_kana:
        return {"has_en": True, "severity": "P2", "reason": "mixed JP+EN (loanword OK)", "raw": text[:80], "en_words": en_words}
    return {"has_en": False, "severity": "ok"}


def detect_self_repetition(text: str) -> bool:
    if not text:
        return False
    return bool(SELF_REP_RE.search(text[:50]))


def detect_cn_contamination(text: str) -> dict:
    if not text:
        return {"contaminated": False, "matches": []}
    matches = []
    for cn, jp in CN_JP_MISMATCH.items():
        if cn in text:
            matches.append({"cn": cn, "jp_suggestion": jp})
    return {"contaminated": bool(matches), "matches": matches}


# ---------- products.ts audit ----------

SLUG_RE = re.compile(r"^\s{4}slug:\s*['\"]([^'\"]+)['\"]", re.MULTILINE)
DESC_JA_RE = re.compile(r"descriptionJa:\s*(['\"`])((?:(?!\1).)*)\1", re.DOTALL)
LD_JA_RE = re.compile(r"longDescriptionJa:\s*(['\"`])((?:(?!\1).)*)\1", re.DOTALL)
NAME_JA_RE = re.compile(r"nameJa:\s*(['\"`])((?:(?!\1).)*)\1", re.DOTALL)


def audit_products():
    text = PRODUCTS_FILE.read_text(encoding="utf-8")
    slugs_with_pos = [(m.group(1), m.start()) for m in SLUG_RE.finditer(text)]
    slugs_with_pos.append(("__END__", len(text)))

    AWKWARD_JP = [
        "ホリデーマーケティング様",
        "ホリデーマーケティング",
        "ホリデーマーケティング向け",
        "ノベルティ代わりに",
        "ホリデーマーケティング向け",
        "ファストファッション",
        "O2Oマーケティング",
    ]

    findings = []
    for i in range(len(slugs_with_pos) - 1):
        slug, start = slugs_with_pos[i]
        _, end = slugs_with_pos[i + 1]
        chunk = text[start:end]

        name_m = NAME_JA_RE.search(chunk)
        desc_m = DESC_JA_RE.search(chunk)
        ld_m = LD_JA_RE.search(chunk)

        name_ja = name_m.group(2) if name_m else ""
        desc_ja = desc_m.group(2) if desc_m else ""
        ld_ja = ld_m.group(2) if ld_m else ""

        cn_hits = []
        for cn, jp in CN_JP_MISMATCH.items():
            for field, val in [("nameJa", name_ja), ("descJa", desc_ja), ("longJa", ld_ja)]:
                if cn in val:
                    cn_hits.append({"field": field, "cn": cn, "jp_suggestion": jp})

        awkward_hits = []
        for a in AWKWARD_JP:
            for field, val in [("nameJa", name_ja), ("descJa", desc_ja), ("longJa", ld_ja)]:
                if a in val:
                    awkward_hits.append({"field": field, "phrase": a})

        # Score
        if not ld_ja.strip() and not desc_ja.strip():
            score = "D"
        elif ld_ja.strip() and len(cn_hits) >= 2:
            score = "C"
        elif ld_ja.strip() and cn_hits:
            score = "B"
        elif ld_ja.strip() and len(ld_ja) < 200:
            score = "B"
        elif ld_ja.strip():
            score = "A"
        else:
            score = "B"

        findings.append({
            "slug": slug,
            "nameJa": name_ja[:40],
            "descJa_len": len(desc_ja),
            "longJa_len": len(ld_ja),
            "longJa_filled": bool(ld_ja.strip()),
            "descJa_filled": bool(desc_ja.strip()),
            "cn_hits": cn_hits,
            "awkward_hits": awkward_hits,
            "score": score,
        })
    return findings


def main():
    sku_text = SKU_SEO_FILE.read_text(encoding="utf-8")
    sku_blocks = find_sku_blocks(sku_text)
    slugs_in_sku_seo = {b[0] for b in sku_blocks}

    # Get product slug list
    prod_text = PRODUCTS_FILE.read_text(encoding="utf-8")
    prod_slugs = set(m.group(1) for m in SLUG_RE.finditer(prod_text))

    orphan_in_sku_seo = sorted(slugs_in_sku_seo - prod_slugs)
    missing_in_sku_seo = sorted(prod_slugs - slugs_in_sku_seo)

    per_sku_findings = []
    summary = Counter()
    summary_by_field = defaultdict(Counter)
    only_79 = sorted(slugs_in_sku_seo & prod_slugs)  # 79 actual products

    for sku in only_79:
        idx = next(i for i, b in enumerate(sku_blocks) if b[0] == sku)
        sku_, start, end = sku_blocks[idx]
        block = sku_text[start:end]
        line_no = sku_text[:start].count("\n") + 1
        ja_seo = extract_ja_seo(block)
        ja_alt = extract_image_alt(block).get("ja", "")
        name_ja = extract_name(block).get("ja", "")

        issues = []

        h1 = ja_seo.get("h1", "")
        if h1:
            res = detect_english_residue(h1, threshold_words=1)
            if res["severity"] != "ok":
                issues.append({"field": "h1", "severity": res["severity"], "reason": res["reason"], "value": h1, "line": line_no})
                summary_by_field["h1"][res["severity"]] += 1

        body = ja_seo.get("body", "")
        if body:
            res = detect_english_residue(body, threshold_words=1)
            if res["severity"] != "ok":
                issues.append({"field": "body", "severity": res["severity"], "reason": res["reason"], "value": body, "line": line_no})
                summary_by_field["body"][res["severity"]] += 1

        if ja_alt:
            res = detect_english_residue(ja_alt, threshold_words=1)
            if res["severity"] != "ok":
                issues.append({"field": "imageAlt", "severity": res["severity"], "reason": res["reason"], "value": ja_alt, "line": line_no})
                summary_by_field["imageAlt"][res["severity"]] += 1

        title = ja_seo.get("title", "")
        if title and detect_self_repetition(title):
            issues.append({"field": "title", "severity": "P1", "reason": "self-repetition MT artifact", "value": title[:80], "line": line_no})
            summary_by_field["title"]["P1"] += 1

        desc = ja_seo.get("description", "")
        if desc and detect_self_repetition(desc):
            issues.append({"field": "description", "severity": "P1", "reason": "self-repetition MT artifact", "value": desc[:80], "line": line_no})
            summary_by_field["description"]["P1"] += 1

        kws = ja_seo.get("keywords", [])
        if kws:
            jp_kws = [k for k in kws if has_jp(k)]
            en_kws = [k for k in kws if not has_jp(k) and re.search(r"[a-zA-Z]", k)]
            if en_kws:
                issues.append({
                    "field": "keywords",
                    "severity": "P1",
                    "reason": f"mixed JP+EN keywords ({len(jp_kws)} JP, {len(en_kws)} EN)",
                    "value": str(kws),
                    "en_only": en_kws,
                    "line": line_no,
                })
                summary_by_field["keywords"]["P1"] += 1

        for i in issues:
            summary[i["severity"]] += 1

        per_sku_findings.append({
            "sku": sku,
            "line": line_no,
            "name_ja": name_ja,
            "issues": issues,
        })

    prod_findings = audit_products()
    prod_scores = Counter(f["score"] for f in prod_findings)
    prod_with_cn = sum(1 for f in prod_findings if f["cn_hits"])
    prod_with_awkward = sum(1 for f in prod_findings if f["awkward_hits"])

    out = {
        "sku_count": {
            "in_sku_seo_data": len(sku_blocks),
            "in_products": len(prod_slugs),
            "intersection": len(slugs_in_sku_seo & prod_slugs),
            "orphans_in_sku_seo": orphan_in_sku_seo,
            "missing_in_sku_seo": missing_in_sku_seo,
        },
        "summary": dict(summary),
        "summary_by_field": {k: dict(v) for k, v in summary_by_field.items()},
        "per_sku_findings": per_sku_findings,
        "long_description_ja": {
            "summary": {
                "total_products": len(prod_findings),
                "filled_longDescJa": sum(1 for f in prod_findings if f["longJa_filled"]),
                "empty_longDescJa": sum(1 for f in prod_findings if not f["longJa_filled"]),
                "filled_descJa": sum(1 for f in prod_findings if f["descJa_filled"]),
                "scores": dict(prod_scores),
                "with_cn_contamination": prod_with_cn,
                "with_awkward_jp": prod_with_awkward,
            },
            "findings": prod_findings,
        },
    }

    OUT_DIR.mkdir(exist_ok=True)
    out_file = OUT_DIR / "audit-ja-pdp-seo-2026-06-18-data.json"
    out_file.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {out_file}")

    print(f"\n=== Task 1 (sku-seo-data.ts) ===")
    print(f"Total SKUs: {len(only_79)} (intersection of 79 products × {len(sku_blocks)} SEO entries)")
    print(f"Orphans in sku-seo-data.ts (no product): {orphan_in_sku_seo}")
    print(f"Total issues: {sum(summary.values())}")
    print(f"  P0: {summary['P0']}, P1: {summary['P1']}, P2: {summary['P2']}")
    print(f"By field: {dict(summary_by_field)}")

    print(f"\n=== Task 2 (products.ts longDescriptionJa) ===")
    print(f"Total products: {len(prod_findings)}")
    print(f"Filled longDescriptionJa: {sum(1 for f in prod_findings if f['longJa_filled'])} ({100*sum(1 for f in prod_findings if f['longJa_filled'])/len(prod_findings):.1f}%)")
    print(f"Empty/absent: {sum(1 for f in prod_findings if not f['longJa_filled'])}")
    print(f"With CN contamination: {prod_with_cn}")
    print(f"With awkward JP: {prod_with_awkward}")
    print(f"Score distribution: {dict(prod_scores)}")


if __name__ == "__main__":
    main()