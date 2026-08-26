# 生图提示词 V20.1→V20.9.5 + 成品质量审计报告（2026-08-18）

> **范围**：提示词 SSoT（`SKILL_seedream_v20.md` + `v20_per_sku/*.txt` 87 文件 + `.cluster/m3-exec-20260811/enhance_rules.json`）+ 成品目录 `zprintpro-en-us-images/`（72 SKU 文件夹）抽样 11 张跨类目跨视图目检。
> **方法**：版本时间线全量复核 + 提示词原文 vs 成品图逐点对照。凡目检结论标注 SKU/视图，可复核。

---

## 一、版本演进图谱（V20.1 → V20.9.5，事实链）

| 版本 | 时间 | 解决什么 |
|---|---|---|
| V20 / V20.1 | 8/15 03:26-03:36 | 4 视图电商主图标准 → +SPREAD 展开视图（7 类目） |
| V20.2 | 8/15 03:38 | 开头工具声明固化；定为自进化 SSoT，旧版全作废 |
| V20.3-V20.4 | 8/15 04:11-04:13 | SPREAD 中缝连贯 + 真实可读英文 + 页码左偶右奇 |
| V20.5-V20.6 | 8/15 04:20-04:42 | books PHOTO/TEXT 智能 layout + 空白内页修复 |
| V20.7/20.7.1 | 8/15 04:50+ | 跨 category layout（ED-005 纪念册走 books[PHOTO]）+ 关键词扩展 |
| V20.8 | 8/15 04:34+ | cat-aware SPHEAD routing（贺卡不再误用书模板，22 SKU 修复） |
| V20.9 | 8/16 01:50 | anti-draft 前缀 + `_auto_select_best.py` 5 维评分保护模式 |
| V20.9.1 | 8/17 23:42 | WM-STRIP 底边精准裁切，输出 1200×1146 |
| V20.9.2/.9.3/.9.5 + D-7 系列 | 8/17 全天 | close-range/fan-fold 修复、COMMON-NOBOOK、CALENDAR-DATES、DETAIL-85-95%-macro、SKUS 嵌套结构修复（enhance_rules.json version 串完整记录） |

**结论**：30+ 小时高密度迭代把「水印 / 侵权 / 物理不合理 / 空白页 / 中缝断裂 / 类目串模板」六类硬伤全部修掉，方向正确。但迭代方式是**补丁叠补丁**，产生了三个结构性债（见 §三）。

## 二、成品目检结果（11 张抽样，跨 8 类目）

### 做得好的（已达标，不要再动）
- **场景-卖点对位**：ST-001 防水贴纸 = 雨天水珠水瓶，一眼懂卖点（P0-4 规则生效）。
- **物理约束**：PB-001 手提绳穿金属鸡眼 ✓（Negative 物理条款兑现）。
- **虚构公司矩阵**：PAGEBOUND / CARRYWELL / WOODFIRE BISTRO / MAPLEWOOD STUDIO / QUILLHOUSE PRESS / BRIGHTLEAF 全部正确上图，零真实品牌。
- **SPREAD 中缝**：BK-001 / ED-005 跨页照片连续、页码 42|43 左偶右奇 ✓。
- **日市场元素**：DJ-001 同人志 Comiket 摊位 = 全场最佳。Circle 名 romaji「SAKURA SHUPPAN」、摊位号「A-15b」、8/15-8/17 展期、亚克力立牌+钥匙扣——Comiket 文化细节全部精确，这是提示词场景库（动漫大会摊位+樱花瓣）的满分兑现。
- **明亮鲜艳约束**：全部抽样无暗沉图 ✓。

### P0 问题（必须修，上线即伤转化/信誉）

1. **次级小字错字残留**（3/11 张命中）：
   - MN-001 hero：「GRILLED CALAMDI」（应为 CALAMARI）、「SCNA FOR ONLINE ORDERING」（应为 SCAN）、底部小字全 gibberish。
   - FL-001 hero：「SGAA TO SIGN UP」（应为 SCAN）；手机屏幕内传单文字 mojibake。
   - **规律**：主标题大字全对，次级小字必错。Negative 里 "all English words spelled correctly" 对小字无效——这是扩散模型的固有边界，提示词修不掉，只能**从构图上消灭小字**。
2. **SKU-内容错配（串图）**：PKG-007 = magnetic-closure-gift-box（磁吸礼盒），成品却是「HARVEST LABELS」标签贴纸 + 插口盒 + 油罐——①产品形态错（非磁吸 rigid box）②品牌不在 14 虚构公司矩阵（HARVEST LABELS 来源不明）③该 SKU 文件夹只有 1 张 box-open，视图集不全。**疑似跨 SKU 提示词/素材串线，需全量排查同类产品。**
3. **BK-001 catalog-printing 内容错位**：SPREAD 是「CLASS OF 2026」毕业照——catalog（商品目录）应展示产品陈列，与 ED-005 yearbook 内容撞车。layout 路由把 BK-001 判成 PHOTO 没错，但 PHOTO 模板的内容场景是「纪念册」而非「产品目录」，**模板内容库粒度不够**。

### P1 问题（下一批前修）

4. **日历日期网格逻辑错误**：CL-002「JANUARY 2026」网格数字重复错位（1 标在 FRI——2026-01-01 实际是周四；下行 6/7/8/9 乱序、26 出现两次）。CALENDAR-DATES 规则 8/17 05:20 已加进 enhance_rules，但这张定稿仍是错的（规则未重跑或无效）。**日历是 Q4 主推 + 月曆印刷金矿词的对应品类，错日历上图 = 专业度自杀。**
5. **文件尺寸超标**：FL-001 multi-angle 175KB / variety 143KB，超 ≤120KB 门槛（其余抽样达标）。管线门禁有漏网。
6. **视图占比指令与出图脱节**：54 号诊断已确认（HERO 指令 80-85%，实测 40-60%）。占比数字写进 prompt 不生效，需构图指令 + 评分门禁兜底（54 号 P0-1/P1 已开方，确认是否已全量落地）。

### 结构性债（提示词工程层）

7. **双提示词系统漂移**：`v20_per_sku/*.txt` 停在 V20.6 口径（DETAIL 仍写「90% 满框 extreme close-up」），而 enhance_rules.json 已是 V20.9.5 + DETAIL-85-95%-macro，54 号 P0-1 又要求 60-70% 完整产品入镜——**三个来源三个口径**。手工豆包管线 vs AutoGLM 管线各看各的 SSoT，后续重跑必打架。
8. **版本命名混乱**：59 号任务里「新 V20.6」实际是 V20.9.6 的误写；D-7、P0-4、V20.9.x 混用。审计追溯成本在升高。
9. **K3 决策反复已固化进管线**：裁剪去水印（废弃）→ PS 去水印 → WM-STRIP 底边裁切（现行 1200×1146）。最终输出不是 1:1 而是 1.047:1——**前端 PDP 图片容器是否按 1:1 设计？若是，全站图会轻微拉伸/裁切**，需 Tech_Ops 核对一次。

## 三、目标市场贴合度评估

| 市场 | 现状 | 差距 |
|---|---|---|
| en（美国） | ✅ 强：DTC 美学、coastal grandma/暖大地色、Brooklyn 地址、$ 定价、Comiket 都知道用英文招牌 | 小字错字是唯一硬伤 |
| ja（日本） | ⚠️ 内容文化准（DJ 类目满分），但**全目录只有 en 文案图**——ja PDP 用英文包装图可接受度中等，同人志类目可直用 | ja 专属文案图未启动；「ジープリント」实体建设期 ja 图是信任资产 |
| zh-hk | ❌ 未覆盖 | AI 生中文字错字率极高，**不建议直生中文文案图**；走「少字设计图 + 代码后期合成繁中文字」路线 |

## 四、V21 优化建议（按 ROI 排序）

1. **小字灭绝策略（P0，提示词层）**：主标题白名单制——prompt 显式给出 ≤6 个词的确切字符串；次级文字一律禁止（加 "no fine print, no small paragraph text, no secondary captions, no price list text"）。MN/FL 类目（菜单价格表、传单细则）天然高危，优先适用。
2. **日历类特判（P0）**：放弃完整月网格，改 "partial week strip / stylized date blocks without specific numbers"；或 prompt 内嵌真实 2026 年 1 月网格模板字符串（cal 命令可生成）。重跑 CL 全类目 6 SKU。
3. **串图排查 + 品类-内容校验门禁（P0）**：vision 评分加「product-content match」硬门槛（54 号 P1 的 DNA 一致性扩展为：与 SKU 定义的产品形态匹配），PKG-007 类错配自动拦截重跑。全量扫一遍 72 个文件夹的视图集完整性（PKG-007 只有 1 张不是个例的可能性存在）。
4. **提示词 SSoT 合一（P1）**：废 v20_per_sku V20.6 静态文件或标注「冻结存档」，唯一来源 = enhance_rules.json + gen_all_batch_v2.py；版本号规范为 V21.0 重新基线化。
5. **Design DNA 锚点强制执行（P1）**：确认 54 号 P0-2（每 SKU 四元组 DNA 全视图引用）已落进 enhance_rules COMMON 段——目检 ST-001 定稿 HERO/DETAIL 已一致，说明部分生效，需全量验证 72 SKU。
6. **多 locale 路线（P2，战略联动）**：en 图全量完成后，ja 只重做 HERO+DETAIL 两视图（文案少、投入小）；zh-hk 走代码合成文字路线，不碰 AI 中文字。
7. **尺寸门禁补漏（P2）**：pipeline 末尾加自动 re-encode（>120KB 降 quality 重压），不再依赖人工抽检。

## 五、一句话结论

**提示词体系的方向和迭代速度是资产，成品的美学水准已超越多数竞品站（Print100/UPrinting 的产品图水准之下）；当前差距集中在三件事：小字错字（构图层消灭）、串图错配（门禁层拦截）、日历逻辑（特判修复）。修完这三件，68-E 批次即可放心全量跑。**

EOF · .hermes/reports/image-prompt-quality-audit-2026-08-18.md · 本地落盘未 push
