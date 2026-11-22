# 2026-11-22 cert 词组全域盘点（before 证据）+ Batch 1 执行记录

> 任务: FIX-20261030-BLOG-CERT-PHRASES（queue READY, prio 0.72）
> 拍板依据: K3 2026-11-13 CT-20261113-D1-D6 D6 —— A组删自有认证/测试声明并保留工艺知识；B组材料与订单合规确认；C组仅保留公共法规中性解释。**禁止无上下文全局替换**。
> 方法: 三文件全量 JSON 扫描（content 字段），regex 词组族计数 + A组高风险模式上下文抽取（`cert-inventory.py` / `cert-a-group.py`，脚本在 .hermes/tmp/）
> 数据来源: src/data/blog-data/{zh-hk,en,ja}.json @ 2026-11-22 17:0x

## §1 总量盘（token 级，非词组级 —— 口径比 10-30 盘点的 528 更宽）

| 词组族 | 次数 | D6 分类 | 处置口径 |
|---|---|---|---|
| FSC | 781 | B组（材质） | 条件化保留（「FSC 認證紙選項」），删「100% FSC」绝对化 |
| EU REACH | 274 | C组（法规） | 中性解释保留；「通過…認證」类改「按…要求」 |
| FDA 21 CFR | 232 | C组（法规） | 法规引用保留；「通過…測試」类改「符合…要求（以訂單確認）」 |
| FDA 食品级/认证 | 109 | A/B 混合 | A组（「我們持有 FDA 認證」）删/条件化 |
| ISO (14001/14298/22000/11607) | 35 | C组框架解释 | 保留中性框架（如 ISO 14298 介绍）；「我們通過」类条件化 |
| BPA-free | 32 | B组材质 | 保留（材质属性，非认证声明） |
| GB 4806 | 29 | C组（法规） | 保留中性引用 |
| GRS | 21 | B组 | 保留（再生材料标准引用） |
| LFGB | 15 | C组 | 保留/条件化 |
| ISO 9001 | 14 | A组 | 「生產行 ISO 9001 品質體系」→ 条件化 |
| SGS | 11 | A组 | 「通過 SGS 測試」→ 「測試報告以訂單確認」 |
| USP Class | 9 | C组 | 保留（标准引用） |
| 「通過…認證」句式 | 8 | A组 | 全部改写 |
| OEKO-TEX | 5 | B组 | 保留 |

按文件：zh-hk 596 / en 508 / ja 471 = 1575。

## §2 Batch 1（本日已执行）—— zh-hk A组 21 处

| # | 文件/条目 | 改前（A组高危） | 改后（D6 口径） |
|---|---|---|---|
| 1 | sticker-guide | 食品級貼紙通過 FDA 21 CFR 175.300 間接食品接觸測試，出口歐盟符合 EU REACH 法規 | 可選用符合 …175.300 要求的材料（合規文件以訂單確認）；EU REACH 要求核對 |
| 2 | sticker-guide | （4 大材質對比、QUV 測試數據、FDA 認證） | （…食品接觸合規） |
| 3 | flyer-printing-guide | 廠房通過FSC 認證，印刷品符合 FDA 21 CFR 與 EU REACH 標準 | 紙材可選 FSC 認證選項；按 FDA/EU REACH 要求核對（以訂單確認） |
| 4 | food-packaging-printing-guide | 全部採用通過 FDA／EU／GB 三地食品接觸檢測的材質生產，並可提供對應檢測報告 | 可選用符合 FDA／EU／GB 要求的材質（檢測報告以訂單／批次確認） |
| 5 | pet-food-sticker-printing-guide | 已通過 FDA、EU LFGB、瑞士 BfR 三重認證 | 按 FDA／EU LFGB／BfR 等標準選配材質（以訂單確認） |
| 6-7 | finance-summit-gift-bag-printing-guide ×2 | 所有紙材均通過香港環保署 SGS 重金屬測試 / 100% 再生牛皮紙 (FSC 認證，SGS 重金屬測試) 係香港業界標準 | 重金屬測試報告以訂單確認 / FSC 認證選項＋報告以訂單確認，業界常用材質 |
| 8 | school-exercise-book-printing-guide | 100% 通過 FDA 21 CFR 175.300 + EU REACH | 食品接觸線材質按 …要求選配（以訂單確認） |
| 9 | foil-stamping-3-applications-2026 ×2 | 全部通過四大認證,出口歐美海關 0 扣押 / 100% FSC 認證銅版紙 | 可選合規選項;海關合規以實際材質與目的地確認 / FSC 認證選項 |
| 10 | baby-product-label-sticker-printing-guide ×2 | FDA 認證齊全 / 可直接通過 FDA 進口檢查 | 合規文件以訂單確認 / 可按 FDA 進口要求準備文件 |
| 11 | campus-education-printing-pillar-guide ×2 | 100% FSC 認證紙 + 大豆油墨,學校招標合規 / 30 天品質保證 + 30 天內不滿意全額退款 | FSC 認證紙選項…合規文件以訂單確認 / 品質保證範圍以訂單確認 |
| 12 | kraft-paper-box-types-comparison-2026 | 均通過 3 項認證 (FDA+EU REACH+FSC), 客戶 0 海關扣押風險 | 可選合規選項,海關合規以實際材質與目的地要求確認 |
| 13 | pharmaceutical-label-printing-guide | 我們所有材質通過 USP Class VI、ISO 10993…符合 FDA/EMA 低遷移標準 | 材質可按 …要求選配（以訂單確認） |
| 14-15 | product-label-printing-guide ×2 | 所有跨境標籤均通過 GS1 認證,FDA 合規材質附測試報告 / 均通過 FDA/EU/日本 三地合規 | 條碼按 GS1 規範製作，合規材質與報告以訂單確認 / 按三市場合規要求選配 |
| 16 | medical-device-packaging-box-guide | ISO 13485，FDA 認證 | ISO 13485／FDA 合規文件以訂單確認 |
| 17 | packaging-box-pricing-2026 | 100% FSC 認證書紙/銅版紙/牛皮紙 | FSC 認證選項… |

验证：JSON OK(101 条目) / encoding PASS / gsc-leak 0；rescan 后 zh-hk 剩余 A组 = 仅 borderline 项（「必須使用…並通過 FDA 176.170」= 材质要求陈述，C组；「沒有 FDA 認證的包裝會被扣押」= 市场信息陈述，C组；FDA 認證表格列名 = 信息对比），按 D6-C 保留。

## §3 剩余批次计划（不盲替换）

- **Batch 2**: en.json A组镜像（预计 ~20 处：同 7-8 个条目）
- **Batch 3**: ja.json A组镜像（~20 处）
- **Batch 4**: zh/en/ja B/C 组边界复审（「100% FSC」残留、ISO 9001 句式、LFGB/GB 引用是否中性）
- 每批独立 commit + 线上断言（注意 blog meta 四层源教训：断言须拉全页）
- 禁止: 对 FSC/REACH/FDA-CFR 中性法规解释做全局删除（D6-C 明确保留）
