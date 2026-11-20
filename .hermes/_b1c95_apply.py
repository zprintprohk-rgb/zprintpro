# -*- coding: utf-8 -*-
"""
.hermes/_b1c95_apply.py — 簇9.5 执行器 (9.5-A ISO + 9.5-D 15+年/15,000+ + 同句连坐 CRED 修复)
规则 = 语言区分短语 (字符串自带语言标记, 跨文件安全); 失败即打印残余上下文供收敛
§12 三件套: 逐文件计数断言 + 语言域断言 + 备份 (.hermes/_bak-b1c95-20261016/)
"""
import io, os, re, shutil, sys, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-b1c95-20261016")
os.makedirs(BAK, exist_ok=True)

FILES = [
    "src/data/products-content.ts",
    "src/data/blog-data/en.json",
    "src/data/blog-data/zh-hk.json",
    "src/data/blog-data/ja.json",
    "src/data/blog-posts.ts",
    "src/data/category-seo-content.ts",
    "src/data/category-conversion-blocks.ts",
    "src/data/buying-guides.ts",
    "src/data/pillar-content.ts",
    "src/data/sku-seo-data.ts",
    "src/lib/seo.ts",
    "src/lib/quote-engine/desk.ts",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/blog/[slug]/page.tsx",
    "src/app/[locale]/contact/page.tsx",
    "src/app/[locale]/services/business-cards-printing/page.tsx",
    "src/app/[locale]/services/catalog-printing-china/page.tsx",
    "src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx",
    "src/app/[locale]/category/[slug]/v9/TrustBadgeBlock.tsx",
    "src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx",
    "src/app/[locale]/service-areas/page.tsx",
    "src/components/TrustBadges.tsx",
    "src/components/CategoryPillarContent.tsx",
    "src/components/category/CategorySharpHooks.tsx",
    "src/components/layout/FloatingQuoteCTA.tsx",
    "src/components/home/FactoryTrust.tsx",
    "src/components/home/HeroBanner.tsx",
    "src/components/home/HowItWorks.tsx",
    "src/lib/seo/schema-extensions.ts",
]

# 全局规则 (语言区分; 顺序 = 长串优先)
R = [
    # --- zh 事实卡/认证块 (整句) ---
    ("【ISO 9001 質量體系】廠房通過 ISO 9001 質量管理體系認證。", "【國際質量認證】廠房通過國際質量管理體系認證。"),
    ("15 年印刷經驗；累計 1,000+ 品牌客戶；海德堡印刷設備；24 小時客服 SLA；服務 12 大行業；FSC 認證紙＋ISO 9001 質量體系＋FDA 級食品接觸材質",
     "多年印刷經驗；累計全球品牌客戶；進口印刷設備；24 小時客服 SLA；服務多個行業；FSC 認證紙＋國際質量認證＋FDA 級食品接觸材質"),
    ("海德堡 Speedmaster 6+1 印刷機，服務 12 大行業、1,000+ 客戶；廠房通過 ISO 9001 與 FSC 認證",
     "進口六色膠印機，服務多個行業、全球客戶；廠房通過國際認證體系與 FSC 認證"),
    ("FSC C123456 (森林認證)", "FSC 森林認證"),
    ("ISO 9001 是品質管理體系認證(公司層面)", "國際品質認證屬品質管理體系認證(公司層面)"),
    ("ISO 9001 是加分項(不是必需)", "國際品質認證是加分項(不是必需)"),
    ("比 ISO 9001 重要?", "比國際品質認證重要?"),
    ("ISO 9001 (品質管理體系)", "國際品質認證（品質管理體系）"),
    # --- zh products-content 模板 (含海德堡连坐) ---
    ("FSC 認證紙材、ISO 12647 色彩管理、海德堡印刷機把關", "FSC 認證紙材、ISO 12647 色彩管理、進口印刷設備把關"),
    ("海德堡四色柯式印刷機，網點還原細膩", "進口四色柯式印刷機，網點還原細膩"),
    ("FSC 認證紙材、ISO 12647 色彩管理、ISO 9001 品質認證", "FSC 認證紙材、ISO 12647 色彩管理、國際品質認證"),
    ("相同 ISO 9001 品質", "相同國際認證品質"),
    ("同樣 ISO 9001 認證產線", "同樣國際認證體系產線"),
    ("ISO 9001 品質認證把關", "國際品質認證把關"),
    # --- zh 通用 ---
    ("ISO 9001 質量管理體系認證", "國際質量管理體系認證"),
    ("ISO 9001 質量管理體系", "國際質量管理體系"),
    ("ISO 9001 質量體系", "國際質量認證"),
    ("ISO 9001 認證工廠", "國際認證體系工廠"),
    ("ISO 9001 認證深圳工廠", "國際認證體系深圳工廠"),
    ("ISO 9001 認證", "國際認證體系"),
    ("ISO 9001 品質認證", "國際品質認證"),
    ("ISO 9001 認証", "國際認証"),
    # --- ja ---
    ("【ISO 9001品質体制】工場はISO 9001品質管理体制で認証済み。", "【国際品質認証】工場は国際品質管理体制で認証済み。"),
    ("ISO 9001 品質マネジメントシステム認証", "国際品質マネジメント認証"),
    ("<strong>ISO 9001 品質認証</strong>", "<strong>国際品質認証</strong>"),
    ("<strong>FSC 認証 + ISO 9001</strong>", "<strong>FSC 認証 + 国際品質認証</strong>"),
    ("<strong>ISO 9001 品質認証</strong>", "<strong>国際品質認証</strong>"),
    ("FSC 認証と ISO 9001 品質保証", "FSC 認証と国際品質保証"),
    ("ISO 12647 カラー管理、ISO 9001 品質保証付き", "ISO 12647 カラー管理、国際品質保証付き"),
    ("FSC 認証紙、ISO 12647 カラー管理、ISO 9001 品質認証", "FSC 認証紙、ISO 12647 カラー管理、国際品質認証"),
    ("ISO 9001品質管理体制", "国際品質管理体制"),
    ("ISO 9001品質体制", "国際品質認証"),
    ("ISO 9001 品質認証", "国際品質認証"),
    ("ISO 9001 品質保証", "国際品質保証"),
    ("Heidelberg 4 色オフセット", "輸入4色オフセット"),
    ("ISO9001認証、DHL国際配送", "国際認証、DHL国際配送"),
    ("順丰翌日配送、ISO9001認証", "順豐翌日配送、国際認証"),
    ("ISO 9001 認証品質", "国際認証品質"),
    ("15+ 年の", "長年の"),
    # --- en 认证块/FAQ ---
    ("【ISO 9001 Certified】Factory certified under the ISO 9001 quality system.", "【Quality Certified】Factory operates under an international quality management system."),
    ("【1,000+ Clients】", "【Global Clients】"),
    ("Production runs on <strong>ISO 9001:2015</strong> certified lines", "Production runs on <strong>internationally certified</strong> lines"),
    ("ISO 9001:2015 certified quality management system.", "internationally certified quality management system."),
    ("ISO 9001:2015 certified", "internationally certified"),
    ("ISO 9001 manufacturing standards", "internationally certified manufacturing standards"),
    ("ISO 9001 manufacturing,", "internationally certified manufacturing,"),
    ("manufactured under ISO 9001 quality standards", "manufactured under international quality standards"),
    ("Our ISO 9001 quality management system guarantees", "Our internationally certified quality management system guarantees"),
    ("ZprintPro is FSC-certified and ISO 9001 quality certified.", "ZprintPro is FSC-certified and internationally certified."),
    ("ISO 12647 color management, ISO 9001 quality certified.", "ISO 12647 color management, internationally certified."),
    ("adhering to ISO 9001 standards", "adhering to international quality standards"),
    ("holds ISO 9001 quality management certification", "holds internationally certified quality management certification"),
    ("ISO 9001 quality management certified", "internationally certified quality management"),
    ("ISO 9001 quality management, FDA", "International quality certification (quality management), FDA"),
    ("ISO 9001 quality system", "international quality system"),
    ("ISO 9001 quality certified", "internationally certified"),
    ("ISO 9001 certified factory-direct pricing", "internationally certified factory-direct pricing"),
    ("ISO 9001 certified, Shenzhen Cailong factory", "internationally certified, Shenzhen Cailong factory"),
    ("ISO 9001 and FSC-certified", "internationally certified and FSC-certified"),
    ("ISO 9001 + FSC-certified", "internationally certified + FSC-certified"),
    ("ISO 9001 + FSC certification", "internationally certified + FSC certification"),
    ("ISO 9001 + FSC certified", "internationally certified + FSC certified"),
    ("ISO9001 + FSC certified prints.", "internationally certified + FSC-certified prints."),
    ("FDA 21 CFR 175.300 + EU REACH + FSC + ISO 9001 4 certifications", "FDA 21 CFR 175.300 + EU REACH + FSC + quality certification (4 compliance standards)"),
    ("FDA + EU REACH + FSC + ISO 9001 4 Certifications?", "FDA + EU REACH + FSC + Quality Certification (4 Compliance Standards)?"),
    ("<strong>ISO 9001</strong> (quality management, company level)", "<strong>Quality certification</strong> (quality management, company level)"),
    ("More Important Than Single ISO 9001?", "More Important Than a Single Certification?"),
    ("FSC and ISO 9001, so customs seizure", "FSC and international quality standards, so customs seizure"),
    ("ISO 9001 is bonus (not required)", "quality certification is a bonus (not required)"),
    ("ISO 9001 is company qualification", "quality certification is a company-level qualification"),
    ("ISO 9001 is quality management system certification", "International quality certification is quality management system certification"),
    ("than ISO 9001?", "than quality certification?"),
    ("ISO 9001 / FDA / EU REACH system", "international quality / FDA / EU REACH system"),
    ("ISO 9001 Workshop", "Certified Printing Workshop"),
    ("trustBadge1: 'ISO 9001'", "trustBadge1: 'Certified Factory'"),
    ("ISO 9001 certified.", "internationally certified."),
    ("ISO 9001 certified,", "internationally certified,"),
    ("ISO 9001 is quality certified", "is internationally certified"),
    # --- round2: products-content / en.json 校购段 / ja ---
    ("ISO 12647 color management and ISO 9001 quality assurance", "ISO 12647 color management and international quality assurance"),
    ("同じ ISO 9001 品質で", "同じ国際認証品質で"),
    ("equivalent ISO 9001 quality and faster", "equivalent international quality and faster"),
    ("Our ISO 9001 certified Shenzhen factory", "Our internationally certified Shenzhen factory"),
    ("当サービスはISO 9001認証取得", "当サービスは国際認証取得"),
    ("ISO 9001認証取得済み。", "国際認証取得済み。"),
    ("Our ISO 9001 certification and ISO 12647", "Our international quality certification and ISO 12647"),
    ("FSC + ISO 9001 4 international certifications complete", "FSC + international quality certification (4 international compliance standards) complete"),
    ("FDA + EU REACH + FSC + ISO 9001:2015, ESG must-have", "FDA + EU REACH + FSC + quality certification, ESG must-have"),
    ("(FDA / EU REACH / FSC / ISO 9001) are must-have", "(FDA / EU REACH / FSC / quality certification) are must-have"),
    ("<strong>ISO 9001:2015 Quality Management</strong> - Cert No. ", "<strong>Quality certification</strong> - documents "),
    ("Cert No. = FSC C123456, ESG school bid must-have", "Certification documents available on request, ESG school bid must-have"),
    ("ISO 9001:2015 = Cert No. available on request", "quality certification documents available on request"),
    ("ISO 9001:2015 quality mgmt = Cert No. available on request", "quality certification documents available on request"),
    ("(4) ISO 9001:2015 quality mgmt cert", "(4) international quality certification"),
    ("= FSC + FDA + EU REACH + ISO 9001.", "= FSC + FDA + EU REACH + quality certification."),
    ("= FSC + FDA + EU REACH + ISO 9001, 4 markets", "= FSC + FDA + EU REACH + quality certification, 4 markets"),
    ("ISO 9001 + FSC + FDA + EU REACH, DHL", "international quality certification + FSC + FDA + EU REACH, DHL"),
    ("ISO 9001 + FSC.</p>", "International quality certification + FSC.</p>"),
    ("certifications per factory ISO 9001 + FSC system.", "certifications per factory international quality certification + FSC system."),
    # --- round3: zh/ja 15,000+ 客户族 + 教育内容块 + 校购块 + ja 事干卡 ---
    ("服務 15,000+ 客戶,產品銷往 100+ 國家", "服務全球客戶,產品銷往多個國家"),
    ("服務 <strong>15,000+ 跨境電商品牌</strong>", "服務 <strong>全球跨境電商品牌</strong>"),
    ("產品銷往 <strong>100+ 國家</strong>", "產品銷往 <strong>多個國家</strong>"),
    ("15,000+ customers served, products shipped to 100+ countries", "customers served globally across international markets"),
    ("長年の印刷実績、15,000+ 顧客、100+ か国出荷の信頼", "長年の印刷実績、世界中の顧客、グローバル出荷の信頼"),
    ("FSC + ISO 9001 4 大認證", "FSC + 國際品質體系 4 大認證"),
    ("<strong>ISO 9001</strong> (品質管理, 公司層面)", "<strong>國際品質認證</strong> (品質管理, 公司層面)"),
    ("4 大認證比單一 ISO 9001 重要?", "4 大認證比單一認證重要?"),
    ("ISO 9001 是品質管理體系認證 (公司層面)", "國際品質認證屬品質管理體系認證 (公司層面)"),
    ("ISO 9001 是公司資質", "國際品質認證是公司資質"),
    ("FDA、EU REACH、FSC、ISO 9001 四大認證", "FDA、EU REACH、FSC、國際品質體系四大認證"),
    ("FSC + ISO 9001 4 大國際認證齊全", "FSC + 國際品質體系 4 大國際認證齊全"),
    ("<strong>ISO 9001:2015 品質管理</strong> - 認證書編號 [證書編號備索]", "<strong>國際品質管理認證</strong> - 認證書編號 [證書編號備索]"),
    ("FSC 森林 = FSC C123456", "FSC 森林認證文件備索"),
    ("FSC 森林認證 = FSC C123456 (100% 永續林業紙漿)", "FSC 森林認證 (100% 永續林業紙漿, 文件備索)"),
    ("ISO 9001:2015 = [證書編號備索]", "國際品質管理認證 = [證書編號備索]"),
    ("ISO 9001:2015 品質管理 = [證書編號備索]", "國際品質管理認證 = [證書編號備索]"),
    ("(4) ISO 9001:2015 品質管理證書", "(4) 國際品質管理認證證書"),
    ("FDA + EU REACH + FSC + ISO 9001:2015, ESG 採購必備", "FDA + EU REACH + FSC + 國際品質認證, ESG 採購必備"),
    ("(FDA / EU REACH / FSC / ISO 9001) 為 9 月開學季", "(FDA / EU REACH / FSC / 國際品質認證) 為 9 月開學季"),
    ("= FSC + FDA + EU REACH + ISO 9001, 4 大市場", "= FSC + FDA + EU REACH + 國際品質認證, 4 大市場"),
    ("認證清單 per 廠房 ISO 9001 / FDA / EU REACH 體系", "認證清單 per 廠房國際認證體系 / FDA / EU REACH"),
    ("認證 per 廠房 ISO 9001 + FSC 體系", "認證 per 廠房國際認證體系 + FSC"),
    ("配備海德堡柯式印刷機組與 HP Indigo 15K B2 數碼產線，紙材走 FSC 認證、色彩管理依 ISO 12647、品質體系為 ISO 9001", "配備進口柯式印刷機組與數碼產線，紙材走 FSC 認證、色彩管理依 ISO 12647、品質體系為國際認證體系"),
    ("柯式用海德堡機、數碼用 HP Indigo 線，紙材 FSC 認證，色彩走 ISO 12647 管理，廠務 ISO 9001，15 年跨境印刷經驗", "柯式用進口膠印機、數碼用進口數碼印刷線，紙材 FSC 認證，色彩走 ISO 12647 管理，廠務國際認證體系，多年跨境印刷經驗"),
    ("A：ISO 9001 品質マネジメント、FDA", "A：国際品質マネジメント認証、FDA"),
    ("15 年のオフセット印刷エンジニアがハイデルベルグ Speedmaster 6+1 を運用し、12 業界・1,000+ 顧客に対応。工場は ISO 9001・FSC 認証を取得し", "長年のオフセット印刷実績を持つエンジニアが輸入六色オフセット機を運用し、複数業界・世界中の顧客に対応。工場は国際認証・FSC 認証を取得し"),
    ("印刷経験15年、累計1,000社以上のブランド顧客、ハイデルベルク印刷機、24時間カスタマーサービスSLA、対応12業種、FSC認証紙とISO 9001品質マネジメント", "長年の印刷実績、累計多数のブランド顧客、輸入印刷機、24時間カスタマーサービスSLA、複数業種対応、FSC認証紙と国際品質マネジメント"),
    ("ISO 9001 は品質マネジメントシステム認証(会社レベル)", "国際品質認証は品質マネジメントシステム認証(会社レベル)"),
    ("ISO 9001 は加点項目(必須ではない)", "国際品質認証は加点項目(必須ではない)"),
    ("ISO 9001 より重要?", "国際品質認証より重要?"),
    ("EU REACH + ISO 9001 + FSC 認証。", "EU REACH + 国際品質認証 + FSC 認証。"),
    # --- round4: zh-hk/ja 教育块 + category-seo/conversion/blog-posts ---
    ("EU REACH + ISO 9001 + FSC 認證齊全", "EU REACH + 國際品質認證 + FSC 認證齊全"),
    ("重要過 ISO 9001?", "重要過國際品質認證?"),
    ("廠房標示為 ISO 9001 同 FSC 認證", "廠房標示為國際認證體系同 FSC 認證"),
    ("label: '認證', value: 'ISO 9001；FSC 紙張可選'", "label: '認證', value: '國際認證體系；FSC 紙張可選'"),
    ("'ISO 9001 流程，出貨前抽檢色彩與裁切。'", "'國際認證體系流程，出貨前抽檢色彩與裁切。'"),
    ("'FSC 認證紙 + 大豆油墨 + ISO 9001 + 可回收'", "'FSC 認證紙 + 大豆油墨 + 國際認證體系 + 可回收'"),
    ("'ISO 9001 certified production; FSC paper and soy inks available'", "'internationally certified production; FSC paper and soy inks available'"),
    ("heading: 'ISO 9001 Certified Production'", "heading: 'Certified Production'"),
    ("'ISO 9001 process with color and trimming spot checks before dispatch.'", "'International quality process with color and trimming spot checks before dispatch.'"),
    ("'FSC-certified + soy ink + ISO 9001 + recyclable'", "'FSC-certified + soy ink + internationally certified + recyclable'"),
    ("FSC-certified + ISO 9001 quality.", "FSC-certified + international quality."),
    ("'ISO 9001認証工場の品質検査、FSC認証紙・大豆インク対応'", "'国際認証工場の品質検査、FSC認証紙・大豆インク対応'"),
    ("label: '認証', value: 'ISO 9001、FSC認証紙対応'", "label: '認証', value: '国際認証、FSC認証紙対応'"),
    ("heading: 'ISO 9001認証工場'", "heading: '国際認証工場'"),
    ("'ISO 9001プロセス。出荷前に色彩と断裁を抜き取り検査。'", "'国際認証プロセス。出荷前に色彩と断裁を抜き取り検査。'"),
    ("FSC 認証 + ISO 9001 品質。", "FSC 認証 + 国際品質。"),
    ("'FSC 認証 + 大豆インク + ISO 9001 + リサイクル可能'", "'FSC 認証 + 大豆インク + 国際認証 + リサイクル可能'"),
    ("\"stat\": \"ISO 9001\",\n      \"label\": \"認證印刷廠直出・免費設計排版有據可依\"", "\"stat\": \"國際認證\",\n      \"label\": \"認證印刷廠直出・免費設計排版有據可依\""),
    ("\"stat\": \"ISO 9001 + FSC\",\n      \"label\": \"認證印刷廠直出，品質同環保雙重認證\"", "\"stat\": \"國際認證 + FSC\",\n      \"label\": \"認證印刷廠直出，品質同環保雙重認證\""),
    ("\"stat\": \"ISO 9001 + FSC\",\n      \"label\": \"Certified printing quality & responsi", "\"stat\": \"Quality Certified + FSC\",\n      \"label\": \"Certified printing quality & responsi"),
    ("ISO 9001認証工場。", "国際認証工場。"),
    ("\"stat\": \"ISO 9001\",\n      \"label\": \"認証工場の品質管理のもと", "\"stat\": \"国際認証\",\n      \"label\": \"認証工場の品質管理のもと"),
    ("FSC認証紙とISO 9001品質管理のもとで四色印刷", "FSC認証紙と国際品質管理のもとで四色印刷"),
    ("The plant is ISO 9001 and FSC certified", "The plant is internationally certified and FSC certified"),
    ("ISO 9001 品質管理體系，FSC 認證紙張供應", "國際質量管理體系，FSC 認證紙張供應"),
    ("ISO 9001 quality management, FSC-certified paper supply", "International quality management, FSC-certified paper supply"),
    # --- blog-posts FAQ 摘要行 (连坐 99.2%/100+ 國家/15,000+) ---
    ("4,200 張急件實證 + 99.2% 達成率 + ISO 9001 + FSC 認證, 服務 100+ 國家 15,000+ 客戶, 30 秒 WhatsApp 即時報價", "急件交付實證 + 準時交付紀錄 + 國際認證體系 + FSC 認證, 服務全球多國客戶, 30 秒 WhatsApp 即時報價"),
    ("4,200件以上99.2%達成率、ISO 9001 + FSC認証、100ヶ国以上15,000社以上、30秒WhatsApp見積", "急件実績豊富、国際認証 + FSC認証、多国展開、30秒WhatsApp見積"),
    ("internationally certified + FSC-certified, 100+ countries 15,000+ clients, 30s WhatsApp quote.", "internationally certified + FSC-certified, global multi-country clients, 30s WhatsApp quote."),
    ("ISO 9001 + FSC + FDA + EU REACH certified", "International quality certification + FSC + FDA + EU REACH certified"),
    # --- round5: seo.ts metaDesc 家族 + category-seo/conversion 尾巴 + ja 教育块变体 ---
    ("ISO 9001 + FSC 認證。", "國際認證體系 + FSC 認證。"),
    ("ISO 9001。", "國際認證體系。"),
    ("FSC 認證紙材 + ISO 9001 品質", "FSC 認證紙材 + 國際品質認證"),
    ("FSC 認証 + ISO 9001 品質", "FSC 認証 + 国際品質"),
    ("ISO 12647 色彩管理、ISO 9001 取得。", "ISO 12647 色彩管理、国際認証取得。"),
    ("ISO 9001 certified + 30-second AI quote", "internationally certified + 30-second AI quote"),
    ("FSC-certified + ISO 9001 + 30-second", "FSC-certified + internationally certified + 30-second"),
    ("ISO9001品質認證，全球配送。", "國際品質認證，全球配送。"),
    ("ISO9001 certified", "internationally certified"),
    ("5-7 day DHL, ISO 9001 ", "5-7 day DHL, quality-certified "),
    ("value: 'ISO 9001; FSC paper options'", "value: 'International quality certification; FSC paper options'"),
    ("ISO 9001認証工場で製造し、DHL Expressで日本へ2-4営業日でお届けします。", "国際認証工場で製造し、DHL Expressで日本へ2-4営業日でお届けします。"),
    ("ISO 9001 品質マネジメント、FSC 認証用紙供給", "国際品質マネジメント、FSC 認証用紙供給"),
    # --- round6: about 资质块 + contact 15,000+ + catalog 16年连坐 + seo 尾巴 ---
    ("智印港 ZprintPro 扎根香港超過15年，專注為本地及全球企業提供高品質印刷服務。ISO 9001認證、FSC環保認證，累計服務1000+客戶。", "智印港 ZprintPro 扎根香港多年，專注為本地及全球企業提供高品質印刷服務。國際認證體系、FSC環保認證，累計服務全球客戶。"),
    ("智印港 ZprintProは香港で15年以上の歴史を持ち、高品質な印刷サービスを提供しています。ISO 9001認証、FSC認証、1000社以上のお客様にサービスを提供。", "智印港 ZprintProは香港で長年の実績を持ち、高品質な印刷サービスを提供しています。国際認証、FSC認証、幅広いお客様にサービスを提供。"),
    ("desc: 'ISO 9001 + FSC 認證 · 海德堡四色柯式 + HP Indigo 數碼 + 6 道工序實拍", "desc: '國際認證體系 + FSC 認證 · 進口四色柯式 + 數碼印刷 + 6 道工序實拍"),
    ("desc: 'ISO 9001 + FSC 認証 · ハイデルベルク 4 色オフセット + HP Indigo デジタル", "desc: '国際認証 + FSC 認証 · 輸入四色オフセット + デジタル印刷"),
    ("{ name: 'ISO 9001', desc: '質量管理體系認證，確保每個生產環節標準化' }", "{ name: '國際認證體系', desc: '質量管理體系認證，確保每個生產環節標準化' }"),
    ("{ name: 'ISO 9001', desc: 'Quality management system certification ensuring sta", "{ name: 'Quality Certification', desc: 'Quality management system certification ensuring sta"),
    ("{ name: 'ISO 9001', desc: '品質管理システム認証。各生産工程の標準化を保証。' }", "{ name: '国際認証', desc: '品質管理システム認証。各生産工程の標準化を保証。' }"),
    ("name: 'ISO 9001 品質管理體系'", "name: '國際品質管理認證'"),
    ("name: 'ISO 9001 Quality Management'", "name: 'Quality Certification'"),
    ("name: 'ISO 9001 品質マネジメント'", "name: '国際品質マネジメント認証'"),
    ("font-semibold\">ISO 9001</span>", "font-semibold\">Quality Certified</span>"),
    ("trustServed: \"已服務 15,000+ 客戶\"", "trustServed: \"已服務全球客戶\""),
    ("trustServed: \"15,000+ customers served\"", "trustServed: \"customers served worldwide\""),
    ("30秒AI無料見積もり。ISO 9001 + FSC認証。", "30秒AI無料見積もり。国際認証 + FSC認証。"),
    ("30 秒 AI 即時報價, ISO 9001 + FSC 認證. 對比歐美印刷廠慳 30-40%.", "30 秒 AI 即時報價, 國際認證體系 + FSC 認證. 對比歐美印刷廠慳 30-40%."),
    ("深圳工廠通過 ISO 9001:2015 質量管理體系認證, 16 年印刷經驗", "深圳工廠通過國際質量管理體系認證, 多年印刷經驗"),
    ("深圳工廠 16 年印刷經驗, ISO 9001:2015 認證, FSC 紙張認證, FDA 食品級油墨", "深圳工廠多年印刷經驗, 國際認證體系, FSC 紙張認證, FDA 食品級油墨"),
    ("Free Proof, 5-7 day DHL, ISO 9001", "Free Proof, 5-7 day DHL, quality-certified"),
    ("ISO9001認証取得。全国配送対応。", "国際認証取得。全国配送対応。"),
    ("EU REACH + FSC + ISO 9001 4 大国際認証完備", "EU REACH + FSC + 国際品質体系 4 大国際認証完備"),
    # --- round7: catalog trust/alt 三语 + about credSubtitle ---
    ("通過 ISO 9001 品質管理體系認證", "通過國際品質管理體系認證"),
    ("{ title: 'ISO 9001 Certified', desc: 'Shenzhen factory certified ISO 9001:2015, 16 years of printing experience, 100% QC sampling before shipment.' }", "{ title: 'Certified Factory', desc: 'Shenzhen factory internationally certified, over a decade of printing experience, 100% QC sampling before shipment.' }"),
    ("{ title: 'ISO 9001認証', desc: '深セン工場は ISO 9001:2015 認証, 16年の印刷経験, 出荷前 100% QC サンプリング.' }", "{ title: '国際認証', desc: '深セン工場は国際認証取得, 長年の印刷経験, 出荷前 100% QC サンプリング.' }"),
    ("30秒AI無料見積もり, ISO 9001 + FSC認証. 欧米印刷工場より30-40%安い.", "30秒AI無料見積もり, 国際認証 + FSC認証. 欧米印刷工場より30-40%安い."),
    ("深セン工場は16年の印刷経験, ISO 9001:2015認証, FSC紙認証, FDA食品グレードインク", "深セン工場は長年の印刷経験, 国際認証取得, FSC紙認証, FDA食品グレードインク"),
    ("深セン印刷工場16年ISO 9001ワークショップ", "深セン印刷工場認証ワークショップ"),
    ("Shenzhen Printing Factory 16 Year Certified Printing Workshop", "Shenzhen Certified Printing Factory Workshop"),
    ("Shenzhen factory has 16 years of printing experience, internationally certified", "Shenzhen factory has over a decade of printing experience, internationally certified"),
    # --- round8: 组件层 + schema-extensions (HowTo 线上探针源) ---
    ("title: 'ISO 9001:2015 Certified', subtitle: 'Global quality standard", "title: 'Quality Certified', subtitle: 'International quality standard"),
    ("title: 'ISO 9001:2015 認證', subtitle: '國際品質管理標準'", "title: '國際認證體系', subtitle: '國際品質管理標準'"),
    ("title: 'ISO 9001:2015 認証', subtitle: '国際品質マネジメント規格'", "title: '国際認証', subtitle: '国際品質マネジメント規格'"),
    ("'15+ years serving global SMBs. ISO 9001:2015 certified. Real-time tracking. 100% satisfaction.'", "'Over a decade serving global SMBs. Internationally certified. Real-time tracking. Satisfaction guarantee.'"),
    ("? 'ISO 9001 工廠・FSC 認證紙'", "? '國際認證工廠・FSC 認證紙'"),
    ("? 'ISO 9001 工廠・FSC 認證紙'", "? '國際認證工廠・FSC 認證紙'"),
    ("? 'ISO 9001 工場・FSC認証紙'", "? '国際認証工場・FSC認証紙'"),
    (": 'ISO 9001 factory · FSC-certified paper'", ": 'certified factory · FSC-certified paper'"),
    ("專業印刷服務, 100 個起印, ISO 9001 認證, 30 秒 AI 即時報價", "專業印刷服務, 100 個起印, 國際認證體系, 30 秒 AI 即時報價"),
    ("Professional printing service, 100 MOQ, ISO 9001 certified, 30-second AI instant quote", "Professional printing service, 100 MOQ, internationally certified, 30-second AI instant quote"),
    ("プロ印刷サービス、100個から対応、ISO 9001認証、30秒AI即時見積", "プロ印刷サービス、100個から対応、国際認証、30秒AI即時見積"),
    ("trustLine: 'ISO 9001 · FSC Certified · DHL 2-4 days to US/UK/AU'", "trustLine: 'Quality Certified · FSC Certified · DHL 2-4 days to US/UK/AU'"),
    ("trustLine: 'ISO 9001 · FSC認証 · DHL 2-4日で日本全国'", "trustLine: '国際認証 · FSC認証 · DHL 2-4日で日本全国'"),
    ("trustLine: 'ISO 9001 · FSC 認證 · 順豐本地倉 1 日到貨'", "trustLine: '國際認證體系 · FSC 認證 · 順豐本地倉 1 日到貨'"),
    ("subtitle: '柯式印刷機 × 商標輪轉機 · ISO 9001 品質管理 · 15+ 年印刷經驗'", "subtitle: '柯式印刷機 × 商標輪轉機 · 國際認證體系品質管理 · 多年印刷經驗'"),
    ("subtitle: 'Offset press line × Label rotary press · ISO 9001 quality management · 15+ years in printing'", "subtitle: 'Offset press line × Label rotary press · International quality management · Over a decade in printing'"),
    ("subtitle: 'オフセット印刷機 × ラベル輪転機 · ISO 9001 品質管理 · 15年以上の印刷実績'", "subtitle: 'オフセット印刷機 × ラベル輪転機 · 国際認証品質管理 · 長年にわたる印刷実績'"),
    ("{ title: 'ISO 9001 認證 · 專業牛皮紙袋'", "{ title: '國際認證體系 · 專業牛皮紙袋'"),
    ("'15+ 年印刷經驗 · ISO 9001 認證 · 15,000+ 全球客戶 · 100+ 國家發貨'", "'多年印刷經驗 · 國際認證體系 · 全球客戶 · 全球多國發貨'"),
    ("'15+ 年の印刷実績 · ISO 9001 認証 · 15,000+ グローバル顧客 · 100+ 国へ発送'", "'長年の印刷実績 · 国際認証 · グローバル顧客 · 多国へ発送'"),
    ("'15+ years in business · ISO 9001 certified · 15,000+ global customers · Ships to 100+ countries'", "'Over a decade in business · Internationally certified · Global customers · Ships worldwide'"),
    ("使用 Heidelberg 四色印刷機在 ISO 9001 認證的深圳工廠進行專業印刷。", "使用進口四色印刷機在國際認證體系的深圳工廠進行專業印刷。"),
    ("Heidelberg 4-color presses at our ISO 9001 certified Asia factory.", "4-color presses at our internationally certified Asia factory."),
    ("ISO 9001認証アジア自社工場でHeidelberg 4色印刷機によるプロ印刷。", "国際認証アジア自社工場で輸入4色印刷機によるプロ印刷。"),
    ("ISO 9001認証アジア自社工場", "国際認証アジア自社工場"),
    # --- round9: HowItWorks 当前态修复 (含 ja 國際認証 污染纠正) + TrustBadges zh/ja meta + schema en desc ---
    ("多年印刷經驗 · 國際認證體系 · 15,000+ 全球客戶 · 100+ 國家發貨", "多年印刷經驗 · 國際認證體系 · 全球客戶 · 全球多國發貨"),
    ("長年の印刷実績 · 國際認証 · 15,000+ グローバル顧客 · 100+ 国へ発送", "長年の印刷実績 · 国際認証 · グローバル顧客 · 多国へ発送"),
    ("多年服務全球中小企 · ISO 9001:2015 認證 · 即時物流追蹤 · 100% 滿意保證", "多年服務全球中小企 · 國際認證體系 · 即時物流追蹤 · 滿意保證"),
    ("多年グローバル SMB 支援 · ISO 9001:2015 認証 · リアルタイム追跡 · 100% 満足保証", "多年グローバル SMB 支援 · 国際認証 · リアルタイム追跡 · 満足保証"),
    ("ISO 9001 certified Asia factory, professional equipment", "internationally certified Asia factory, professional equipment"),
    # --- round11: CRED_SELF_FACTORY 既定修法 (自設廠房→平湖廠房, 被改文件内全部实例) ---
    ("深圳自設廠房", "深圳平湖廠房"),
    ("自設廠房", "平湖廠房"),
    # --- 15 年族 + 客户数 + 行业数 (连坐) ---
    ("serving 15,000+ customers across 100+ countries", "serving customers across global markets"),
    ("15,000+ clients across 100+ countries", "clients across global markets"),
    ("15,000+ customers across 100+ countries", "customers across global markets"),
    ("serving 1,000+ customers across 12 industries", "serving global customers across key industries"),
    ("customers across 12 industries. The plant is", "customers across key industries. The plant is"),
    ("active clients across 12 industries · Shenzhen Cailong Printing Packaging Co., Ltd.", "active clients across key industries · Cai Long Printing"),
    ("15 years offset expertise · active clients across 12 industries", "over a decade of offset expertise · active clients across key industries"),
    ("12 industries served; FSC-certified paper and ISO 9001", "key industries served; FSC-certified paper and ISO 9001"),
    ("15+ years", "over a decade"),
    ("15+ 年", "多年"),
    # --- Heidelberg 连坐 (en/ja/howto/trustbadge; 仅在被改句内生效) ---
    ("state-of-the-art Heidelberg 4-color offset printing", "state-of-the-art 4-color offset printing"),
    ("Delta E ≤2 color management on Heidelberg 4-color offset.", "Delta E ≤2 color management on 4-color offset presses."),
    ("and Heidelberg 4-color offset. Free", "and 4-color offset presses. Free"),
    ("5 大合規認證（ISO 14298:2021/FSC/G7/海德堡 6+1/ISO 9001）", "4 大合規認證（ISO 14298:2021/FSC/G7/國際認證體系）"),
    ("5 certifications (ISO 14298:2021/FSC/G7/Heidelberg 6+1/ISO 9001)", "4 certifications (ISO 14298:2021/FSC/G7/international quality certification)"),
    ("5 大コンプライアンス認証（ISO 14298:2021/FSC/G7/ハイデルベルク 6+1/ISO 9001）", "4 大コンプライアンス認証（ISO 14298:2021/FSC/G7/国際認証）"),
    ("具備海德堡柯式印刷機組與 HP Indigo 15K B2 數碼產線", "具備進口柯式印刷機組與數碼產線"),
]

# 文件专属规则
FILE_R = {
    "src/app/[locale]/contact/page.tsx": [
        ('{ title: "ISO 9001 認證", sub: "品質管理" }', '{ title: "國際認證體系", sub: "品質管理" }'),
        ('sub: "ISO 9001 Manufacturing"', 'sub: "International Manufacturing"'),
        ('sub: "ISO 9001"', 'sub: "国際認証"'),
    ],
    "src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx": [
        ("'ISO9001 認證'", "'國際認證體系'"),
        ("'ISO9001 Certified'", "'Certified Factory'"),
        ("'ISO9001認証'", "'国際認証'"),
    ],
    "src/app/[locale]/services/catalog-printing-china/page.tsx": [
        ("16 years of printing experience, ISO 9001:2015 certified, FSC paper certified, FDA food-grade",
         "over a decade of printing experience, internationally certified, FSC-certified paper, FDA food-grade"),
        ("16 Year ISO 9001 Workshop", "Certified Printing Workshop"),
    ],
    "src/app/[locale]/blog/[slug]/page.tsx": [
        ("ISO 9001 certified factory-direct pricing.", "internationally certified factory-direct pricing."),
    ],
    "src/lib/quote-engine/desk.ts": [
        ("✅ 免費設計稿 · 15+ 年印刷經驗", "✅ 免費設計稿 · 多年印刷經驗"),
        ("✅ 無料デザイン · 15+ 年の印刷実績", "✅ 無料デザイン · 長年の印刷実績"),
    ],
    "src/lib/seo.ts": [
        ("ISO 9001 //", "quality certification //"),
        # round10: ja metaDesc 泛型 zh 规则污染纠正 (同行无其它雷, ja 化即可)
        ("30 秒 AI 無料見積もり、國際認証品質。", "30 秒 AI 無料見積もり、国際認証品質。"),
        ("國際認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日", "国際認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日"),
    ],
    "src/data/products-content.ts": [
        ("同一 國際認証ライン・FSC 認証紙使用", "同一の国際認証ライン・FSC 認証紙使用"),
        ("深セン自社 國際認証工場", "深センの国際認証取得工場"),
    ],
    "src/app/[locale]/services/business-cards-printing/page.tsx": [
        ("、國際認証品質。", "、国際認証品質。"),
    ],
    "src/data/blog-data/ja.json": [
        # round10: 8種ボックス比較 mega-line 外科还原 (同行含 8,000+/5,500+/¥420,000/15 年/Heidelberg 多雷,
        # 本批不展开 — 还原至 HEAD 字节等同退出 diff, ISO 9001 此 1 处登记 9.5 残余)
        ("FDA 21 CFR 175.300 + EU REACH + FSC + 國際認証完備.", "FDA 21 CFR 175.300 + EU REACH + FSC + ISO 9001 認証完備."),
        # ja.json 内既有 zh 病灶句 (整句 zh 的校购/事实卡块) — ja 化显式规则
        ("FSC 森林 = FSC C123456", "FSC 森林認証は書類請求可能"),
        ("FSC 森林認証 = FSC C123456 (100% 永続林業紙漿)", "FSC 森林認証 (100% 永続林業紙漿, 書類請求可能)"),
        ("FSC 森林認證 = FSC C123456 (100% 永續林業紙漿)", "FSC 森林認証 (100% 永續林業紙漿, 書類請求可能)"),
        ("ISO 9001:2015 = [證書編號備索]", "国際品質マネジメント認証 = [證書編號備索]"),
        ("ISO 9001:2015 品質管理 = [證書編號備索]", "国際品質マネジメント認証 = [證書編號備索]"),
        ("<strong>ISO 9001:2015 品質管理</strong> - 認證書編號 [證書編號備索]", "<strong>国際品質マネジメント認証</strong> - 認證書編號 [證書編號備索]"),
        ("(4) ISO 9001:2015 品質管理證書", "(4) 国際品質マネジメント認証證書"),
        ("FDA + EU REACH + FSC + ISO 9001:2015, ESG 採購必備", "FDA + EU REACH + FSC + 国際品質認証, ESG 採購必備"),
        ("(FDA / EU REACH / FSC / ISO 9001) 為 9 月開學季", "(FDA / EU REACH / FSC / 国際品質認証) 為 9 月開學季"),
        ("= FSC + FDA + EU REACH + ISO 9001, 4 大市場", "= FSC + FDA + EU REACH + 国際品質認証, 4 大市場"),
        ("<strong>ISO 9001</strong> (品質管理, 公司層面)", "<strong>国際品質認証</strong> (品質管理, 公司層面)"),
        ("4 大認證比單一 ISO 9001 重要?", "4 大認証比單一認証重要?"),
        ("ISO 9001 是品質管理體系認證 (公司層面)", "国際品質認証屬品質管理體系認證 (公司層面)"),
        ("ISO 9001 是公司資質", "国際品質認証是公司資質"),
        ("FDA、EU REACH、FSC、ISO 9001 四大認證", "FDA、EU REACH、FSC、国際品質体系四大認証"),
        ("FSC + ISO 9001 4 大認證", "FSC + 国際品質体系 4 大認証"),
        ("FSC + ISO 9001 4 大國際認證齊全", "FSC + 国際品質体系 4 大国際認証齊全"),
        # round5 ja 教育块变体
        ("FSC + ISO 9001 4 大認証.", "FSC + 国際品質体系 4 大認証."),
        ("FDA + EU REACH + FSC + ISO 9001 4 大認証?", "FDA + EU REACH + FSC + 国際品質体系 4 大認証?"),
        ("<strong>ISO 9001</strong> (品質管理、会社レベル)", "<strong>国際品質認証</strong> (品質管理、会社レベル)"),
        ("ISO 9001 は品質マネジメントシステム認証 (会社レベル)、", "国際品質認証は品質マネジメントシステム認証 (会社レベル)、"),
        ("ISO 9001 は会社資格", "国際品質認証は会社資格"),
        ("FDA・EU REACH・FSC・ISO 9001 を取得", "FDA・EU REACH・FSC・国際品質認証 を取得"),
        ("FDA + EU REACH + FSC + ISO 9001 4 大国際認証完備", "FDA + EU REACH + FSC + 国際品質体系 4 大国際認証完備"),
        ("FDA + EU REACH + FSC + ISO 9001:2015, ESG 調達必須", "FDA + EU REACH + FSC + 国際品質認証, ESG 調達必須"),
        ("4 大国際認証 (FDA / EU REACH / FSC / ISO 9001)", "4 大国際認証 (FDA / EU REACH / FSC / 国際品質認証)"),
        ("<strong>ISO 9001:2015 品質管理</strong> - 認証番号 [證書編號備索]", "<strong>国際品質マネジメント認証</strong> - 認証番号 [證書編號備索]"),
        ("(4) ISO 9001:2015 品質管理認証書", "(4) 国際品質マネジメント認証書"),
        ("認証一覧は工場のISO 9001 / FDA / EU REACH体制", "認証一覧は工場の国際認証 / FDA / EU REACH体制"),
        ("認証は工場のISO 9001 + FSC体制", "認証は工場の国際認証 + FSC体制"),
        ("品質体制は ISO 9001。", "品質体制は国際認証。"),
        ("工場は ISO 9001 と FSC 認証と記載され", "工場は国際認証と FSC 認証と記載され"),
        ("12 業界完全カバー", "複数業界完全カバー"),
    ],
}

def lang_assert(fname, old, new):
    """替换文本语言域断言: en 文件禁新增 CJK; zh-hk 文件禁假名; ja 文件禁繁体专用字"""
    kana = re.compile(r'[\u3040-\u30ff]')
    trad = re.compile(r'[認證體系質廠聯網絡]|[實現來後]', )  # 常见繁体专用 (粗筛)
    if fname.endswith("en.json") and re.search(r'[\u4e00-\u9fff]', new):
        return f"en.json 新增 CJK: {new[:40]}"
    if fname.endswith("zh-hk.json") and kana.search(new):
        return f"zh-hk.json 新增假名: {new[:40]}"
    if fname.endswith("ja.json"):
        # ja 允许 kana + 日汉字; 禁 zh-hk 专属繁体 (認證/體系); 質两用放行
        for ch in ["認證", "體系", "網絡", "廠"]:
            if ch in new:
                return f"ja.json 疑似繁体专用字 {ch}: {new[:40]}"
    return None

def classify(new, old=""):
    if re.search(r'[\u3040-\u30ff]', new) or re.search(r'[\u3040-\u30ff]', old) or "証" in new or "証" in old:
        return "ja"
    if re.search(r'[\u4e00-\u9fff]', new):
        return "zh"
    return "en"

def main():
    grand = {}
    for rel in FILES:
        p = os.path.join(REPO, rel)
        if not os.path.exists(p):
            print(f"[skip] {rel} 不存在"); continue
        with io.open(p, "r", encoding="utf-8", newline="") as fh:
            t = fh.read()
        before = t
        n_applied = 0
        is_zh_file = rel.endswith("zh-hk.json")
        is_ja_file = rel.endswith("ja.json")
        is_en_file = rel.endswith("en.json")
        fr = FILE_R.get(rel, [])
        rules = R + fr
        for old, new in rules:
            lang = classify(new, old)
            # 语言域路由: 单语 JSON 只吃对应语言规则; 跨语病灶句由 FILE_R 显式规则接手
            if is_zh_file and lang != "zh":
                continue
            if is_en_file and lang != "en":
                continue
            if is_ja_file and lang != "ja" and (old, new) not in fr:
                continue
            c = t.count(old)
            if c:
                err = lang_assert(rel, old, new)
                if err:
                    print(f"[LANG-ASSERT] {rel}: {err}"); return 3
                t = t.replace(old, new)
                n_applied += c
        if t != before:
            shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
            with io.open(p, "w", encoding="utf-8", newline="") as fh:
                fh.write(t)
        grand[rel] = n_applied
    total = sum(grand.values())
    print(f"[apply] total replaced: {total}")
    for k, v in sorted(grand.items(), key=lambda x: -x[1]):
        if v: print(f"  {v:4d}  {k}")
    # 残余上下文输出 (收敛用)
    RES = ['ISO 9001', 'ISO9001', '15,000+', '16 years', '16 Year', '16 年']
    for rel in FILES:
        p = os.path.join(REPO, rel)
        if not os.path.exists(p): continue
        with io.open(p, "r", encoding="utf-8", newline="") as fh:
            t = fh.read()
        for pat in RES:
            i = 0
            while True:
                j = t.find(pat, i)
                if j < 0: break
                if pat.endswith(" 年") and j > 0 and t[j-1].isdigit():
                    i = j + 1; continue
                print(f"[RES]{rel} | {t[max(0, j-70):j+70]!r}".replace(chr(10), ' '))
                i = j + 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
