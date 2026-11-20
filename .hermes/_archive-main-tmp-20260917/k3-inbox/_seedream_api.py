# -*- coding: utf-8 -*-
"""_seedream_api.py - 火山引擎 Seedream 5.0 Lite API 集成 (K3 8/16 08:10 拍板 + 提供 API key)

K3 拍板: 直接调 火山引擎 Seedream 5.0 Lite API, 不用 AutoGLM/minimax image 中间层
API key: ark-eb4711b2-4507-4d71-8568-238de06bfee6-b5b73 (K3 8/16 08:10 提供)

Endpoint: https://ark.cn-beijing.volces.com/api/v3/images/generations
Model: doubao-seedream-5-0-lite (K3 8/16 08:06 明确)
价格: ¥0.20-0.30/张 (官方)
水印: watermark=false (企业版支持, 0 商用风险)

Phase 1 测试: ED-005 毕业纪念册 + BK-004 精装书 (M3 8/16 08:06 推荐 C 选项)
验证 K3 8/15 关键拍板"翻开纪念册看的是照片" + 修复 V20.8 跨 category 案例

用法:
  python _seedream_api.py --phase 1   # 跑 2 SKU 16 张 (¥4)
  python _seedream_api.py --phase 2   # 跑批次 1 10 SKU 90 张 (¥23)
  python _seedream_api.py --phase 3 --batch 1  # 跑批次 1 10 SKU (每 10 确认)
"""
import io
import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.error
import urllib.parse
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# === K3 8/16 08:10 提供 (直接嵌入, 后续 K3 可改 env ARK_API_KEY) ===
ARK_API_KEY = "ark-eb4711b2-4507-4d71-8568-238de06bfee6-b5b73"
# K3 8/16 08:15 拍板: 真正路径是 /api/v3/images/generations2 (带 2!), 不是 /api/v3/images/generations
ARK_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations2"
# K3 8/16 08:15 拍板: 真正模型 ID 是 doubao-seedream-5-0-lite-260128 (有 -lite-)
# 不是 doubao-seedream-5-0-260128 (没 -lite-, 我之前猜的)
ARK_MODEL = "doubao-seedream-5-0-lite-260128"

# 项目路径
WORKSPACE = Path(r"F:\zprintpro-nextjs")
IMAGES_DIR = WORKSPACE / "zprintpro-en-us-images"
V20_PROMPTS_DIR = WORKSPACE / ".hermes" / "k3-inbox" / "v20_per_sku"
CALIB_DIR_NAME = "calib_candidates"
SELECTED_DIR_NAME = "v20_9_selected"

# 视图定义 (4-5 视图)
DEFAULT_VIEWS = ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE', 'SPREAD']
SPREAD_CATEGORIES = {'books', 'packaging', 'calendars', 'greeting-cards', 'red-packets', 'educational', 'japan-doujin'}

# Phase 1 选哪 2 SKU (K3 8/16 拍板 — C 选项 ED-005 + BK-004)
PHASE_1_SKUS = ['ED-005', 'BK-004']  # 验证 K3 8/15 关键拍板"翻开纪念册看的是照片"

# Phase 2 批次 1 (10 SKU)
PHASE_2_BATCH_1 = ['BC-002', 'BC-003', 'BC-004', 'BC-005', 'BC-006', 'BK-001', 'BK-002', 'BK-003', 'BK-004', 'BK-005']


def get_views_for_sku(sku_code, category):
    """根据 category 返回该 SKU 的视图列表 (4-5 视图)"""
    if category in SPREAD_CATEGORIES:
        return DEFAULT_VIEWS  # 5 视图 (含 SPREAD)
    return ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']  # 4 视图 (无 SPREAD)


def call_seedream_api(prompt, n=2, image_size="1024x1024", seed=-1):
    """调火山引擎 Seedream 5.0 Lite API 出 2 候选 (K3 8/16 08:10 API key)"""
    payload = {
        "model": ARK_MODEL,
        "prompt": prompt,
        "image_size": image_size,
        "n": n,
        "response_format": "url",
        "watermark": False,  # 0 水印 (企业版支持)
        "seed": seed,
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        ARK_BASE_URL,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {ARK_API_KEY}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            return result
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='replace')
        raise Exception(f"HTTP {e.code} {e.reason}: {err_body[:500]}")
    except Exception as e:
        raise Exception(f"API call failed: {e}")


def extract_view_prompt(prompt_file, view):
    """从 v20_per_sku/{SKU}.txt 提取 {view} 段 prompt"""
    content = prompt_file.read_text(encoding='utf-8')
    # 找 ----- {view} ----- 段
    marker = f"[en] ----- {view} -----"
    idx = content.find(marker)
    if idx < 0:
        # SPREAD 类目可能用 VARIETY-A/C
        if view == 'VARIETY':
            for v in ['VARIETY-A', 'VARIETY-C']:
                marker_alt = f"[en] ----- {v} -----"
                idx_alt = content.find(marker_alt)
                if idx_alt >= 0:
                    idx = idx_alt
                    break
    if idx < 0:
        return None
    # 找下一个 ----- 段 (结束)
    end = content.find("[en] -----", idx + 30)
    if end < 0:
        end = len(content)
    return content[idx:end].strip()


def download_image(url, out_path):
    """下载 webp 到 out_path"""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    out_path.write_bytes(data)
    return out_path


def get_sku_category(sku_code, products_path):
    """从 products.ts 读 SKU 的 category"""
    content = products_path.read_text(encoding='utf-8')
    # 找 {sku_code} 块
    pattern = rf"id:\s*'{sku_code}'"
    m = re.search(pattern, content)
    if not m:
        return None
    before = content[:m.start()]
    last_block = max(before.rfind('\n  {\n'), before.rfind('\n  },\n'))
    if last_block < 0:
        last_block = 0
    after = content[m.end():]
    next_block = -1
    for sep in ['\n  {\n', '\n  },\n', '\n];\n']:
        i = after.find(sep)
        if i >= 0 and (next_block < 0 or i < next_block):
            next_block = i
    if next_block < 0:
        next_block = len(after)
    block = content[last_block:m.end() + next_block]
    cat_m = re.search(r"category:\s*'([^']+)'", block)
    return cat_m.group(1) if cat_m else None


def run_sku_phase(sku_code, products_path, phase_label, n=2, image_size="1024x1024"):
    """跑一个 SKU 的所有视图, 出 2 候选 webp"""
    print(f"\n--- {phase_label} {sku_code} ---")

    # 1. 找 category
    category = get_sku_category(sku_code, products_path)
    if not category:
        print(f"  SKIP: SKU {sku_code} not found in products.ts")
        return 0, 0
    print(f"  category: {category}")

    # 2. 找 prompt file
    sku_dir = IMAGES_DIR / sku_code
    sku_dir.mkdir(exist_ok=True)
    calib_dir = sku_dir / CALIB_DIR_NAME
    calib_dir.mkdir(exist_ok=True)
    raw_dir = calib_dir / 'raw_full'
    raw_dir.mkdir(exist_ok=True)

    # 从 products.ts 找 slug
    content = products_path.read_text(encoding='utf-8')
    pattern = rf"id:\s*'{sku_code}'"
    m = re.search(pattern, content)
    if not m:
        print(f"  SKIP: SKU {sku_code} not found")
        return 0, 0
    before = content[:m.start()]
    last_block = max(before.rfind('\n  {\n'), before.rfind('\n  },\n'))
    if last_block < 0:
        last_block = 0
    after = content[m.end():]
    next_block = -1
    for sep in ['\n  {\n', '\n  },\n', '\n];\n']:
        i = after.find(sep)
        if i >= 0 and (next_block < 0 or i < next_block):
            next_block = i
    if next_block < 0:
        next_block = len(after)
    block = content[last_block:m.end() + next_block]
    slug_m = re.search(r"slug:\s*'([^']+)'", block)
    slug = slug_m.group(1) if slug_m else sku_code.lower()

    prompt_file = V20_PROMPTS_DIR / f"{sku_code}_{slug}.txt"
    if not prompt_file.exists():
        print(f"  SKIP: prompt file not found: {prompt_file}")
        return 0, 0
    print(f"  prompt file: {prompt_file.name}")

    # 3. 跑所有视图
    views = get_views_for_sku(sku_code, category)
    print(f"  views: {views} ({len(views)} views × {n} candidates = {len(views) * n} images)")

    success = 0
    fail = 0
    total_cost = 0.0  # 估算成本

    for view in views:
        prompt_text = extract_view_prompt(prompt_file, view)
        if not prompt_text:
            print(f"  WARN: {view} prompt not found, skip")
            fail += 1
            continue

        print(f"  [{view}] calling Seedream 5.0 Lite API ({n} candidates)...", end=' ', flush=True)
        try:
            result = call_seedream_api(prompt_text, n=n, image_size=image_size)
            urls = [item['url'] for item in result.get('data', [])]
            usage = result.get('usage', {})
            cost = usage.get('total_cost', 0)
            total_cost += cost
            if not urls:
                print("FAIL (no urls)")
                fail += 1
                continue
            for i, url in enumerate(urls, 1):
                out_path = calib_dir / f"{view}_cand{i}.jpg"
                download_image(url, out_path)
                # raw_full 存高清版
                raw_path = raw_dir / f"{view}_cand{i}_full.jpg"
                try:
                    download_image(url, raw_path)
                except Exception:
                    pass
            print(f"OK ({len(urls)} images, cost ¥{cost:.3f})")
            success += 1
        except Exception as e:
            print(f"FAIL: {e}")
            fail += 1
        # 限速: 每 2 秒 1 个, 避免触发火山引擎 rate limit
        time.sleep(2)

    print(f"  --- {sku_code} done: {success} OK / {fail} FAIL, 估算成本 ¥{total_cost:.2f} ---")
    return success, fail, total_cost


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--phase', type=int, default=1, help='1=2 SKU / 2=10 SKU / 3=70 SKU / 4=5 SKU')
    parser.add_argument('--batch', type=int, default=1, help='batch number for phase 3')
    parser.add_argument('--api-key', type=str, default=os.environ.get('ARK_API_KEY', 'ark-eb4711b2-4507-4d71-8568-238de06bfee6-b5b73'), help='ARK API key')
    parser.add_argument('--image-size', type=str, default='1024x1024', help='1024x1024 / 2048x2048')
    args = parser.parse_args()

    # 注入 API key 到全局 (K3 8/16 08:10 提供的)
    api_key = args.api_key
    call_seedream_api.__globals__['ARK_API_KEY'] = api_key
    run_sku_phase.__globals__['ARK_API_KEY'] = api_key

    products_path = WORKSPACE / 'src' / 'data' / 'products.ts'
    if not products_path.exists():
        print(f"ERROR: products.ts not found: {products_path}")
        sys.exit(1)

    # 选 SKU 列表
    if args.phase == 1:
        skus = PHASE_1_SKUS
        phase_label = f"[Phase 1: 2 SKU 测试 {skus[0]} + {skus[1]}, 16 张, ~¥4]"
    elif args.phase == 2:
        skus = PHASE_2_BATCH_1
        phase_label = f"[Phase 2: 10 SKU 批次 1, 90 张, ~¥23]"
    elif args.phase == 3:
        # Phase 3: 70 SKU, 每 10 确认, 7 批次
        all_phase_3 = ['FL-002', 'FL-003', 'FL-004', 'FL-005', 'FL-007', 'FL-008', 'MN-001', 'MN-002', 'MN-003', 'MN-004',
                       'MN-005', 'PB-001', 'PB-002', 'PB-003', 'PB-004', 'PB-005', 'PB-007', 'PK-002', 'PK-003', 'PK-004',
                       'PK-005', 'PK-006', 'PKG-007', 'PKG-008', 'PKG-009', 'PKG-013', 'PKG-014', 'PKG-015', 'PKG-016',
                       'PO-001', 'PO-002', 'PO-003', 'PO-004', 'PO-005', 'PO-006', 'RP-001', 'RP-002', 'RP-003', 'RP-004',
                       'RP-005', 'RP-006', 'ST-002', 'ST-003', 'ST-004', 'ST-005', 'ST-006', 'ST-007', 'ST-008', 'ST-009',
                       'BN-001', 'BN-002', 'BN-003', 'BN-004', 'BN-005', 'CL-001', 'CL-002', 'CL-003', 'CL-004', 'CL-005',
                       'CL-006', 'DJ-001', 'DJ-002', 'DJ-003', 'DJ-004', 'DJ-005', 'ED-001', 'ED-002', 'ED-003', 'ED-004',
                       'EV-001', 'EV-002', 'EV-003', 'EV-004']
        # 7 批次 × 10 SKU
        batch_size = 10
        start = (args.batch - 1) * batch_size
        end = min(start + batch_size, len(all_phase_3))
        skus = all_phase_3[start:end]
        phase_label = f"[Phase 3 batch {args.batch}: 10 SKU, 90 张, ~¥23]"
    elif args.phase == 4:
        skus = ['ST-006', 'ST-007', 'ST-008', 'ST-009']
        phase_label = f"[Phase 4: 4 SKU 收尾, 32 张, ~¥8]"
    else:
        print(f"ERROR: invalid phase {args.phase}")
        sys.exit(1)

    print("=" * 80)
    print(f"V20.9 火山引擎 Seedream 5.0 Lite API 批量生图 (K3 8/16 08:10 拍板)")
    print(f"API: {ARK_BASE_URL}")
    print(f"Model: {ARK_MODEL}")
    print(f"Image size: {args.image_size}")
    print(f"Phase: {phase_label}")
    print(f"SKUs: {skus}")
    print(f"Total images: {len(skus) * 5 * 2} (worst case, 4-5 views × 2 candidates)")
    print("=" * 80)

    total_success = 0
    total_fail = 0
    total_cost = 0.0

    for sku in skus:
        s, f, c = run_sku_phase(sku, products_path, phase_label, n=2, image_size=args.image_size)
        total_success += s
        total_fail += f
        total_cost += c

    print(f"\n=== {phase_label} 完成 ===")
    print(f"Total: {total_success} 视图 OK / {total_fail} 视图 FAIL")
    print(f"估算成本: ¥{total_cost:.2f} (火山引擎 Seedream 5.0 Lite 官方定价)")
    print(f"\n[查看路径]")
    print(f"  cand1/cand2: F:\\zprintpro-nextjs\\zprintpro-en-us-images\\{{SKU}}\\calib_candidates\\{{VIEW}}_cand{{1,2}}.jpg")
    print(f"  raw_full: F:\\zprintpro-nextjs\\zprintpro-en-us-images\\{{SKU}}\\calib_candidates\\raw_full\\{{VIEW}}_cand{{1,2}}_full.jpg")


if __name__ == '__main__':
    main()
