#!/usr/bin/env python3
"""
integrate-pillar-patches.py

M3 (Mavis) orchestrator 整合 sub-agent 产出的 12 鐵律 升级补丁 spec
到 src/data/blog-data/{locale}.json.

使用 Python json.dump + raw triple-quoted string 防止 Edit/Write 的
反斜杠 strip 问题 (per MEMORY cross-project "Edit/Write 大段 JSON").

用法:
  python integrate-pillar-patches.py --locale zh-hk --pillar 3 --patch .hermes/patches/pillar-3-zh-hk-12rules.md
  python integrate-pillar-patches.py --locale en --pillar 4 --patch .hermes/patches/pillar-4-en-12rules.md
  python integrate-pillar-patches.py --all  # 整合所有可用 patches
"""

import json
import re
import sys
import argparse
import os
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(r"F:\zprintpro-nextjs")
PATCHES_DIR = PROJECT_ROOT / ".hermes" / "patches"
JSON_DIR = PROJECT_ROOT / "src" / "data" / "blog-data"
DECISION_REGISTER = PROJECT_ROOT / ".hermes" / "decision-register.md"
AGENTS_MD = PROJECT_ROOT / "AGENTS.md"

# 12 鐵律 checklist (per AGENTS.md §0.34.1 + skill §0.34.1)
TWELVE_RULES = [
    ("RULE1_INVERTED_PYRAMID", "倒金字塔 - 首段 100 字直答核心"),
    ("RULE2_H2_QUESTION", "H2 必須是問題"),
    ("RULE3_QUICK_ANSWER", "快速答案塊 40-60 字 ≥ 3 個 div.alert"),
    ("RULE4_PARAGRAPH_3LINES", "段落 ≤ 3 行"),
    ("RULE5_EEAT", "E-E-A-T (Person + LinkedIn + FDA + EU REACH)"),
    ("RULE6_ORIGINAL_DATA", "原創數據 ≥ 10 個 2 位+ 數字"),
    ("RULE7_ENTITY_MAPPING", "實體映射 (1 主 + 3-6 子)"),
    ("RULE8_CTA_FATIGUE", "CTA ≤ 3 (頂 1 + 底 1 = 2)"),
    ("RULE9_SEMANTIC_ANCHOR", "內鏈 7+ 錨點 ≥ 5 字"),
    ("RULE10_SCHEMA", "Schema 5 全 (Article + FAQPage + BreadcrumbList + HowTo + Organization)"),
    ("RULE11_ANSWER_NUGGET", "答案金塊密度 ≥ 0.4/1000字 (💡 答案 nugget)"),
    ("RULE12_COMPARISON_TABLE", "比較表 ≥ 2 (材質表 + QUV 對比表)"),
]

# zh-hk 5 禁词 (per §0.32 K3 9/1 18:50 拍板, 9/1 18:58 补完)
ZH_HK_FORBIDDEN = [
    "深圳市彩龍印刷包裝有限公司",
    "深圳市彩龙印刷包装有限公司",
    "深圳市龍崗區平湖街道嘉城路 1 號",
    "Shenzhen Cai Long Printing Packaging",
    "1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen",
    "518111",  # 邮编单独使用也可能暴露
]

# 品牌宪法 §13.16
BRAND_ZH_HK = "智印港"  # zh-hk 单品牌
BRAND_EN_JA = "ZprintPro"  # en/ja 单品牌
JA_ALT = "ジープリント"  # ja alternate 单独埋点 (per §13.16.1)


def parse_patch_spec(patch_path: Path) -> dict:
    """
    Parse 升级补丁 spec markdown 文件, 提取新 content 字段.
    Expected format per sub-agent prompts:
      # Pillar X [topic] [locale] 12 鐵律 [升級|全量寫作]補丁
      ## 3. 完整新 content 字段
      ```
      <12,000+ chars HTML/markdown>
      ```
    """
    if not patch_path.exists():
        return {"error": f"patch not found: {patch_path}"}
    text = patch_path.read_text(encoding="utf-8")
    result = {
        "patch_path": str(patch_path),
        "patch_size": len(text),
        "title": None,
        "slug": None,
        "content_new": None,
        "internal_links": [],
        "schema_5": [],
        "rules_check": {},
        "char_count": 0,
    }
    # 提取 title
    title_match = re.search(r"^# (.+)$", text, re.MULTILINE)
    if title_match:
        result["title"] = title_match.group(1).strip()
    # 提取 slug (从 patch 文件名 或 spec 内部)
    slug_match = re.search(r'slug["\s:]+["\']([\w-]+)["\']', text)
    if slug_match:
        result["slug"] = slug_match.group(1)
    else:
        # 从 filename 推断 (e.g. pillar-3-zh-hk-12rules.md)
        fname = patch_path.stem  # e.g. pillar-3-zh-hk-12rules
        m = re.match(r"pillar-(\d+)-([a-z-]+)-12rules", fname)
        if m:
            pillar_num, locale = m.group(1), m.group(2)
            # 不知道 slug, 需要从 spec 提取
            result["pillar_num"] = pillar_num
            result["locale_hint"] = locale
    # 提取 "## 3. 完整新 content 字段 / Complete New content Field / 完全新 content フィールド" 部分
    content_patterns = [
        r"## 3\..*?完整新 content 字段.*?```(?:\w+)?\n(.*?)```",
        r"## 3\..*?Complete New content Field.*?```(?:\w+)?\n(.*?)```",
        r"## 3\..*?完全新 content フィールド.*?```(?:\w+)?\n(.*?)```",
    ]
    content_section = None
    for cp in content_patterns:
        m = re.search(cp, text, re.DOTALL)
        if m:
            content_section = m
            break
    if content_section:
        result["content_new"] = content_section.group(1).strip()
        result["char_count"] = len(result["content_new"])
    # 提取 internal links
    link_section = re.search(
        r"## 4\..*?內部鏈接清單.*?(?=## \d|\Z)",
        text, re.DOTALL
    )
    if link_section:
        links = re.findall(
            r"[-*]\s*([^\s→\-]+)\s*[→\-]+\s*([\w\-/]+)",
            link_section.group(0)
        )
        result["internal_links"] = links
    # 提取 12 鐵律 check table
    check_section = re.search(
        r"## 2\..*?12 鐵律 check.*?(?=## \d|\Z)",
        text, re.DOTALL
    )
    if check_section:
        for rule_id, rule_name in TWELVE_RULES:
            # 检查 PASS/FAIL
            pattern = rf"\b{rule_id}\b.*?(PASS|FAIL|N/A)"
            m = re.search(pattern, check_section.group(0))
            if m:
                result["rules_check"][rule_id] = m.group(1)
    return result


def audit_zh_hk_forbidden(content: str) -> list:
    """校準 zh-hk 5 禁词 (per §0.32)"""
    hits = []
    for forbidden in ZH_HK_FORBIDDEN:
        if forbidden in content:
            hits.append(forbidden)
    return hits


def integrate_to_json(locale: str, slug: str, content_new: str, fields_extra: dict = None) -> dict:
    """
    把 content_new + fields_extra 安全整合到 src/data/blog-data/{locale}.json
    用 Python json.dump (per MEMORY cross-project "Edit/Write 大段 JSON").
    """
    json_path = JSON_DIR / f"{locale}.json"
    if not json_path.exists():
        return {"error": f"json not found: {json_path}"}
    data = json.loads(json_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        return {"error": f"unexpected json root type: {type(data)}"}
    # 找 entry
    target_idx = None
    for i, entry in enumerate(data):
        if isinstance(entry, dict) and entry.get("slug") == slug:
            target_idx = i
            break
    if target_idx is None:
        return {"error": f"slug not found in {json_path}: {slug}"}
    # 备份原 content
    original_content = data[target_idx].get("content", "")
    # 替换 content
    data[target_idx]["content"] = content_new
    # 应用 extra fields (e.g. internal links, schema)
    if fields_extra:
        for k, v in fields_extra.items():
            data[target_idx][k] = v
    # 写回 (用 json.dump indent=2 ensure_ascii=False)
    json_path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )
    return {
        "ok": True,
        "json_path": str(json_path),
        "slug": slug,
        "original_content_len": len(original_content),
        "new_content_len": len(content_new),
        "fields_updated": list(fields_extra.keys()) if fields_extra else []
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--locale", choices=["zh-hk", "en", "ja"])
    parser.add_argument("--pillar", type=int, help="1-5")
    parser.add_argument("--patch", help="path to patch spec markdown")
    parser.add_argument("--slug", help="target slug (auto-detect from patch if not given)")
    parser.add_argument("--all", action="store_true", help="整合所有 patches")
    parser.add_argument("--dry-run", action="store_true", help="只 audit, 不写")
    parser.add_argument("--audit-only", action="store_true", help="只 audit 禁词 + 12 鐵律 check, 不整合")
    args = parser.parse_args()

    if args.all:
        # 扫描 .hermes/patches/ 全部 spec
        if not PATCHES_DIR.exists():
            print(f"no patches dir: {PATCHES_DIR}")
            return 1
        patch_files = sorted(PATCHES_DIR.glob("pillar-*-12rules.md"))
        if not patch_files:
            print("no patches found")
            return 1
        results = []
        for pf in patch_files:
            print(f"\n=== {pf.name} ({pf.stat().st_size} bytes) ===")
            spec = parse_patch_spec(pf)
            print(f"  title: {spec['title']}")
            print(f"  slug: {spec.get('slug') or 'AUTO'}")
            print(f"  content_new: {spec['char_count']} chars")
            print(f"  12 鐵律 check: {sum(1 for v in spec['rules_check'].values() if v == 'PASS')}/12 PASS")
            # 校準 zh-hk 禁词
            if (spec.get('locale_hint') or '').startswith('zh-hk') or args.locale == 'zh-hk':
                if spec['content_new']:
                    hits = audit_zh_hk_forbidden(spec['content_new'])
                    if hits:
                        print(f"  ❌ zh-hk 禁词命中: {hits}")
                    else:
                        print(f"  ✅ zh-hk 禁词 0 命中")
            results.append(spec)
        return 0

    if not args.patch:
        parser.error("--patch required (or --all)")
    patch_path = Path(args.patch)
    spec = parse_patch_spec(patch_path)
    if "error" in spec:
        print(f"❌ {spec['error']}")
        return 1
    print(f"=== {patch_path.name} ===")
    print(f"  title: {spec['title']}")
    print(f"  slug: {spec.get('slug', 'AUTO')}")
    print(f"  content_new: {spec['char_count']} chars")
    print(f"  12 鐵律 check: {sum(1 for v in spec['rules_check'].values() if v == 'PASS')}/12 PASS")
    if args.audit_only:
        return 0
    if not spec['content_new']:
        print("❌ no content_new in patch (missing section 3?)")
        return 1
    # 校準禁词
    if args.locale == 'zh-hk':
        hits = audit_zh_hk_forbidden(spec['content_new'])
        if hits:
            print(f"❌ zh-hk 禁词命中: {hits} - 拒绝整合, 需修复")
            return 2
    # dry-run
    if args.dry_run:
        print("DRY-RUN: no JSON write")
        return 0
    # 整合
    slug = args.slug or spec.get('slug')
    if not slug:
        print("❌ no slug specified (--slug or extract from patch)")
        return 1
    result = integrate_to_json(args.locale, slug, spec['content_new'])
    print(f"\n整合结果: {json.dumps(result, ensure_ascii=False, indent=2)}")
    return 0 if result.get('ok') else 1


if __name__ == "__main__":
    sys.exit(main())
