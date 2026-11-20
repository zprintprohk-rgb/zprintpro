#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K4 拍板 2: About 优化 C 路线 (改文案 + Production 5 步流程 + 客户证言 3 段 mock + <ImageSlot> 占位组件)
K3 7/30 10:00 拍板 + 14 min 时间紧
- 不动 src/app/[locale]/about/page.tsx (待 M3 写好后 10:15 cron 触发前 git add + 暂存)
- 0 push
- M3 10:15 cron trigger 前 commit (不 push) 让 cron 1 push 兜底
"""
import io
import os
import re
from datetime import datetime

ROOT = r"F:\zprintpro-nextjs"
PATH = os.path.join(ROOT, "src", "app", "[locale]", "about", "page.tsx")

# 新增 3 段:
# 1. <ImageSlot> 占位组件 (插入到 Team section 之前)
# 2. <ProductionProcess> 5 步流程 (插入到 Core Advantages 之后, Team 之前)
# 3. <Testimonials> 客户证言 3 段 (插入到 Team 之后, Certifications 之前)

# translations 新增 4 字段:
#   - processTitle, processSteps (5 步)
#   - testimonialTitle, testimonials (3 段)
#   - imageSlotTeam (1 个 <ImageSlot> 说明)

# 1. <ImageSlot> 占位组件 - 纯 SVG 框, K3 拍图后替换 src
# 2. ProductionProcess - 5 步 (Upload/Design/Proof/Print/Ship) - 用 CSS timeline, 无图
# 3. Testimonials - 3 段 mock (注明 "MOCK - replace with real client logo + quote after K3 拍图")

NEW_TRANSLATIONS = {
    "zh-hk": {
        "processTitle": "印刷流程",
        "processSubtitle": "5 步標準流程，從上傳檔案到全球送達",
        "processSteps": [
            { "step": "1", "title": "上傳檔案", "desc": "AI 自動檢查 PDF 解析度、出血區、色彩模式。30 秒內報價，無需註冊。" },
            { "step": "2", "title": "免費設計", "desc": "不擅長設計？我們提供免費刀模線製作、色彩校樣、版面微調。" },
            { "step": "3", "title": "打樣確認", "desc": "數碼打樣 24 小時內，柯式打樣 3-5 個工作日。確認後立即進入生產。" },
            { "step": "4", "title": "印刷生產", "desc": "海德堡 4 色柯式 + HP Indigo 數碼印刷，ISO 9001 認證，Delta E ≤3 色彩控制。" },
            { "step": "5", "title": "全球送達", "desc": "順豐速遞覆蓋香港全境，DHL/FedEx 全球 2-4 天直達。1000 本起享批量優惠價。" },
        ],
        "testimonialTitle": "客戶評價",
        "testimonialSubtitle": "真實客戶反饋 (MOCK 占位，K3 拍客戶 logo 後替換)",
        "testimonials": [
            { "company": "MOCK - 香港某連鎖餐廳", "industry": "餐飲", "quote": "宣傳單張質量超預期，3000 張只花了 HK\$ 1,200，紙質厚實色彩鮮明，顧客拍照打卡率提高 40%。" },
            { "company": "MOCK - 美國某 DTC 品牌", "industry": "電商美妝", "quote": "客製包裝盒從設計到送達只用了 12 天，FedEx 直送美國倉，5000 個 HK\$ 8/個，物流追蹤透明。" },
            { "company": "MOCK - 日本某活動策劃公司", "industry": "活動", "quote": "年曆印刷起訂 1000 本 HK\$ 4/本，比 e-print 便宜 30%，10 月旺季前準時到貨。" },
        ],
        "imageSlotFactory": "工廠車間 / 設備全景 (K3 拍圖後替換)",
        "imageSlotTeam": "團隊真人工作場景 (K3 拍圖後替換)",
    },
    "en": {
        "processTitle": "Our Production Process",
        "processSubtitle": "5-step standard workflow from upload to global delivery",
        "processSteps": [
            { "step": "1", "title": "Upload Artwork", "desc": "AI auto-checks PDF resolution, bleed zones, color mode. Quote in 30 seconds, no signup required." },
            { "step": "2", "title": "Free Design Support", "desc": "Not a designer? We provide free die-cut line creation, color proofing, and layout tweaks." },
            { "step": "3", "title": "Sample Approval", "desc": "Digital proofing in 24 hours, offset proofing in 3-5 business days. Production starts after your approval." },
            { "step": "4", "title": "Production", "desc": "Heidelberg 4-color offset + HP Indigo digital. ISO 9001 certified, Delta E ≤3 color control." },
            { "step": "5", "title": "Global Delivery", "desc": "SF Express covers all of Hong Kong, DHL/FedEx delivers worldwide in 2-4 days. Volume pricing on 1000+ units." },
        ],
        "testimonialTitle": "Client Testimonials",
        "testimonialSubtitle": "Real customer feedback (MOCK placeholder — replace with real client logos/quotes after K3 captures)",
        "testimonials": [
            { "company": "MOCK - HK Restaurant Chain", "industry": "F&B", "quote": "Flyer quality exceeded expectations. 3000 pieces for just HK\$ 1,200, thick paper, vivid colors, customer photo-tagging rate up 40%." },
            { "company": "MOCK - US DTC Beauty Brand", "industry": "DTC Beauty", "quote": "Custom packaging from design to delivery in 12 days, FedEx to US warehouse, 5000 units at HK\$ 8 each, transparent logistics tracking." },
            { "company": "MOCK - Japan Event Agency", "industry": "Events", "quote": "Calendar printing MOQ 1000 at HK\$ 4 each, 30% cheaper than e-print, delivered before October peak season." },
        ],
        "imageSlotFactory": "Factory floor / equipment panorama (K3 replace after photo capture)",
        "imageSlotTeam": "Team real work scenes (K3 replace after photo capture)",
    },
    "ja": {
        "processTitle": "印刷の流れ",
        "processSubtitle": "アップロードから世界配送まで 5 ステップ標準フロー",
        "processSteps": [
            { "step": "1", "title": "ファイルアップロード", "desc": "AI が PDF 解像度・塗り足し・カラーモードを自動チェック。30 秒で見積もり、登録不要。" },
            { "step": "2", "title": "無料デザインサポート", "desc": "デザインに自信がなくても安心。無料型抜きライン作成、色校正、レイアウト微調整を提供。" },
            { "step": "3", "title": "サンプル確認", "desc": "デジタル校正 24 時間、オフセット校正 3-5 営業日。確認後すぐ生産開始。" },
            { "step": "4", "title": "印刷生産", "desc": "ハイデルベルク 4 色オフセット + HP Indigo デジタル。ISO 9001 認証、Delta E ≤3 色彩管理。" },
            { "step": "5", "title": "世界配送", "desc": "顺丰速运は香港全域をカバー、DHL/FedEx は世界 2-4 日直送。1000 部以上で批量割引。" },
        ],
        "testimonialTitle": "お客様の声",
        "testimonialSubtitle": "実際のお客様のフィードバック (MOCK 占位、K3 撮影後に実際のロゴ・コメントと差し替え)",
        "testimonials": [
            { "company": "MOCK - 香港レストランチェーン", "industry": "飲食", "quote": "チラシの品質が予想以上。3000 枚で HK\$ 1,200、厚手の紙で色鮮明、お客様の写真投稿率が 40% アップ。" },
            { "company": "MOCK - 米国 DTC 美容ブランド", "industry": "DTC 美容", "quote": "カスタムパッケージがデザインから配送まで 12 日、FedEx で米国倉庫へ、5000 個で HK\$ 8/個、物流追跡も透明。" },
            { "company": "MOCK - 日本イベント企画会社", "industry": "イベント", "quote": "カレンダー印刷 1000 部起で HK\$ 4/部、e-print より 30% 安、10 月繁忙期前准时納品。" },
        ],
        "imageSlotFactory": "工場現場・設備全景 (K3 撮影後に差し替え)",
        "imageSlotTeam": "チームの実業務シーン (K3 撮影後に差し替え)",
    },
}


def main():
    with io.open(PATH, "r", encoding="utf-8") as f:
        text = f.read()

    original = text
    changes = []

    # 1. 在 translations 里加 3 段新字段
    for loc in ["zh-hk", "en", "ja"]:
        block_pattern = re.compile(
            r"  '" + loc + r"': \{" + r"[\s\S]+?" + r"    statsLabels: \{[^}]+\},?\s*\},\n",
            re.MULTILINE
        )
        m = block_pattern.search(text)
        if not m:
            raise RuntimeError(f"translation block for {loc} not found")

        new_block = m.group(0).rstrip().rstrip(',').rstrip()
        # 在 statsLabels 行后面加新字段
        for k in ["processTitle", "processSubtitle", "processSteps", "testimonialTitle", "testimonialSubtitle", "testimonials", "imageSlotFactory", "imageSlotTeam"]:
            v = NEW_TRANSLATIONS[loc][k]
            if isinstance(v, list):
                # 数组字面量
                items = []
                for item in v:
                    if isinstance(item, dict):
                        item_str = "{" + ", ".join([f"{ik}: {repr(iv)}" for ik, iv in item.items()]) + "}"
                        items.append("      " + item_str)
                    else:
                        items.append("      " + repr(item))
                v_str = "[\n" + ",\n".join(items) + "\n    ]"
                new_block += ",\n    " + k + ": " + v_str
            else:
                new_block += ",\n    " + k + ": " + repr(v)
        new_block += ",\n  },\n"

        text = text[:m.start()] + new_block + text[m.end():]
        changes.append(f"  + 3 locales translations: {loc} (+8 fields)")

    # 2. 在 <main> 块里、Core Advantages 之后, Team 之前, 插入 Production Process section + ImageSlot
    # 3. 在 Team 之后, Certifications 之前, 插入 Testimonials section
    # 4. 替换 Certifications section 之前插入 <ImageSlot> 占位组件

    # 找 Core Advantages </section> 位置
    core_end_pattern = re.compile(
        r"(        \{/\* Core Advantages \*/\}\s*<section[^>]+>\s*[\s\S]+?)\n        </section>\n",
        re.MULTILINE
    )

    # 找 Team section 开始位置 (用注释定位)
    team_start_pattern = re.compile(
        r"        \{/\* Team \*/\}",
        re.MULTILINE
    )

    # 找 Certifications section 开始位置
    cert_start_pattern = re.compile(
        r"        \{/\* Certifications \*/\}",
        re.MULTILINE
    )

    # 在 Team 前插入 Production Process + ImageSlot (factory)
    m = team_start_pattern.search(text)
    if not m:
        raise RuntimeError("Team section start not found")
    production_block = """
        {/* 2026-07-30 K4 拍板 2: Production Process 5 步流程 + ImageSlot 占位 (K3 拍图后替换) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:font-bold text-3xl font-bold text-[#333333] mb-3 text-center">{t.processTitle}</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">{t.processSubtitle}</p>
            <div className="grid md:grid-cols-5 gap-4">
              {t.processSteps.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-12 h-12 bg-[#2873F5] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {p.step}
                  </div>
                  <h3 className="text-base font-bold text-[#333333] mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ImageSlot type="factory" label={t.imageSlotFactory} />
            </div>
          </div>
        </section>

"""
    text = text[:m.start()] + production_block + text[m.start():]
    changes.append("  + Production Process section + ImageSlot(factory)")

    # 在 Certifications 之前插入 Testimonials + ImageSlot(team)
    m = cert_start_pattern.search(text)
    if not m:
        raise RuntimeError("Certifications section start not found")
    testimonials_block = """
        {/* 2026-07-30 K4 拍板 2: Testimonials 3 段 mock (K3 拍图后替换) + ImageSlot(team) */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.testimonialTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">{t.testimonialSubtitle}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {t.testimonials.map((tm, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-[#2873F5] text-3xl font-serif mb-2">&ldquo;</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{tm.quote}</p>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="font-bold text-[#333333] text-sm">{tm.company}</div>
                    <div className="text-gray-500 text-xs">{tm.industry}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ImageSlot type="team" label={t.imageSlotTeam} />
            </div>
          </div>
        </section>

"""
    text = text[:m.start()] + testimonials_block + text[m.start():]
    changes.append("  + Testimonials section + ImageSlot(team)")

    # 在 page 顶部 import 之后加 ImageSlot import
    import_pattern = re.compile(
        r"(import \{ JsonLd \} from '@/components/JsonLd';\n)",
        re.MULTILINE
    )
    m = import_pattern.search(text)
    if not m:
        raise RuntimeError("JsonLd import not found")
    image_slot_import = "import { ImageSlot } from '@/components/ImageSlot';\n"
    text = text[:m.end()] + image_slot_import + text[m.end():]
    changes.append("  + import ImageSlot from @/components/ImageSlot")

    # 写回
    with io.open(PATH, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)

    # 编码 spot check
    with open(PATH, "rb") as f:
        b = f.read()
    bom = b[:3] == b"\xef\xbb\xbf"
    print(f"size={len(b)} BOM={bom}")
    if bom:
        raise RuntimeError("BOM detected!")

    print(f"\n=== {len(changes)} changes ===")
    for c in changes:
        print(c)


if __name__ == "__main__":
    main()
