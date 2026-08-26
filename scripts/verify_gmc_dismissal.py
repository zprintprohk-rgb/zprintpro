"""
zprintpro GMC Dismissal Verifier (2026-08-20)
K3 GMC 拍板 A 路径: dismiss 199 aggregateRating/review 警告后, Mavis 跑此脚本 verify

功能:
1. 扫 PDP schema (Product JSON-LD) 确认 aggregateRating / review 字段状态
2. 跟 K3 拍板状态比对 (A 拍 = 字段缺失是 expected, 不报 bug)
3. 输出 GMC console 当前警告状态参考

Usage:
  python scripts/verify_gmc_dismissal.py
"""
from __future__ import annotations
import json
import sys
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent
PRODUCT_PATHS_FILE = ROOT / ".hermes" / "product-paths.txt"

# 8/20 K3 拍板状态 (K3 manual update)
K3_DECISION = {
    "path": "A",
    "rationale": "7/28 v2.1 §3.3 约束 4: 无真实评价数据, 禁止编造 aggregateRating/review",
    "dismiss_at": None,  # K3 填入 dismiss 完成时间, e.g. "2026-08-20 10:35"
    "dismiss_count": None,  # K3 填入 dismiss 数量
}

# 3-locale sample PDP (per K3 8/19 GSC 验证 base set)
SAMPLE_SLUGS = [
    "a1-posters",
    "a2-posters",
    "a4-flyers",
    "a5-flyers",
    "stickers",
    "pearl-envelopes",  # 截图 1 个 validFrom 缺的产品
]


def fetch_html(url: str, timeout: int = 30) -> str:
    """简单 GET 抓 HTML (无依赖)"""
    req = urllib.request.Request(url, headers={"User-Agent": "Mavis-Verify/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", errors="replace")


def extract_json_ld(html: str) -> list:
    """从 HTML 抓所有 application/ld+json 块"""
    import re
    blocks = re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.+?)</script>', html, re.DOTALL)
    parsed = []
    for b in blocks:
        try:
            data = json.loads(b)
            if isinstance(data, list):
                parsed.extend(data)
            else:
                parsed.append(data)
        except json.JSONDecodeError:
            continue
    return parsed


def check_product_schema(json_ld_list: list) -> dict:
    """检查 Product schema 字段状态"""
    result = {
        "has_product": False,
        "has_aggregateRating": False,
        "has_review": False,
        "has_validFrom": False,
        "product_name": None,
    }
    for schema in json_ld_list:
        if isinstance(schema, dict):
            # 兼容 @graph 嵌套
            if schema.get("@type") == "Product":
                _check_product_dict(schema, result)
            if "@graph" in schema:
                for item in schema["@graph"]:
                    if isinstance(item, dict) and item.get("@type") == "Product":
                        _check_product_dict(item, result)
    return result


def _check_product_dict(d: dict, result: dict) -> None:
    result["has_product"] = True
    result["product_name"] = d.get("name")
    result["has_aggregateRating"] = bool(d.get("aggregateRating"))
    result["has_review"] = bool(d.get("review"))
    offers = d.get("offers")
    if isinstance(offers, dict):
        result["has_validFrom"] = bool(offers.get("validFrom"))
    elif isinstance(offers, list) and offers:
        result["has_validFrom"] = bool(offers[0].get("validFrom"))


def main():
    print("=" * 70)
    print("zprintpro GMC Dismissal Verifier (2026-08-20)")
    print("=" * 70)
    print()
    print(f"K3 拍板路径: {K3_DECISION['path']}")
    print(f"  理由: {K3_DECISION['rationale']}")
    if K3_DECISION.get("dismiss_at"):
        print(f"  Dismiss 完成: {K3_DECISION['dismiss_at']} ({K3_DECISION.get('dismiss_count', '?')} 警告)")
    else:
        print(f"  Dismiss 完成: [K3 待填]")
    print()

    # 期望状态 (K3 拍板 A)
    expected_aggregateRating = False  # 拍 A = 字段缺失
    expected_review = False
    expected_validFrom = True  # 8/11 已加, 必须有

    print("=" * 70)
    print(f"PDP Schema 验证 ({len(SAMPLE_SLUGS)} sample × 3 locale = {len(SAMPLE_SLUGS)*3} URL)")
    print("=" * 70)
    print()

    locales = ["zh-hk", "en", "ja"]
    base_url = "https://zprintpro.com"
    total_checked = 0
    total_correct = 0
    fail_details = []

    for slug in SAMPLE_SLUGS:
        for locale in locales:
            url = f"{base_url}/{locale}/product/{slug}/"
            total_checked += 1
            try:
                html = fetch_html(url)
                schemas = extract_json_ld(html)
                check = check_product_schema(schemas)
                if not check["has_product"]:
                    fail_details.append(f"❌ {url}: 无 Product schema")
                    continue
                # 校验
                ok = True
                if check["has_aggregateRating"] != expected_aggregateRating:
                    fail_details.append(f"⚠ {url}: aggregateRating={check['has_aggregateRating']} expected={expected_aggregateRating}")
                    ok = False
                if check["has_review"] != expected_review:
                    fail_details.append(f"⚠ {url}: review={check['has_review']} expected={expected_review}")
                    ok = False
                if not check["has_validFrom"]:
                    fail_details.append(f"❌ {url}: validFrom 缺失 (8/11 应已加)")
                    ok = False
                if ok:
                    total_correct += 1
                    marker = "✅" if not expected_aggregateRating else "✅"
                    print(f"  {marker} {url}: {check['product_name'][:30] if check['product_name'] else '?'}...")
            except urllib.error.HTTPError as e:
                fail_details.append(f"❌ {url}: HTTP {e.code}")
            except Exception as e:
                fail_details.append(f"❌ {url}: {e}")

    print()
    print("=" * 70)
    print(f"汇总: {total_correct}/{total_checked} URL schema 跟 K3 拍板一致")
    print("=" * 70)
    if fail_details:
        print("\n失败详情:")
        for d in fail_details:
            print(f"  {d}")
    else:
        print("\n✅ 所有 sample URL schema 跟 K3 拍板 A 一致")
        print()
        print("=" * 70)
        print("K3 下一步")
        print("=" * 70)
        print("1. 打开 GMC Console (https://merchants.google.com/mc/products?hl=zh-CN)")
        print("2. 商品 → 需要注意 → 全选 → 批量忽略")
        print("3. 原因 '不适用' + 备注 'Per K3 7/28 v2.1 §3.3 约束 4'")
        print("4. Dismiss 后再跑此脚本 (K3_DECISION.dismiss_at 填时间) 验证")
        print()
        print("或者: 等 GMC 7 天抓取周期, validFrom 警告自动消失 (8/17 已抓, 8/24 报告反映)")

    return 0 if total_correct == total_checked else 1


if __name__ == "__main__":
    sys.exit(main())
