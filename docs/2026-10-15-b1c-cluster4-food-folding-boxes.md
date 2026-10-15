# B1c 簇 4：food ↔ folding boxes ×3 语差异化 + 包装族对齐 — 执行与验收报告 (2026-10-15)

> **战略出处**: `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md` §3 W2.1（B1c 簇 4 = food↔folding boxes 98% 实锤簇）+ `docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md` §五
> **执行**: AutoClaw 主会话 · 簇 2 收尾同款七条 SOP（锁 → 实锤 → 真值 → 门禁 → 相似度 → 重爬 → 进度登记）
> **数据来源**（§0.23 强制行）:
> - 真值锚点: `src/data/products.ts` food-boxes L3234-3330（minQ 100 / HK$2.5-18 / basePrice 2.5·0.74·101 / 350g 食品級白卡·400g 灰底白板 / PE·PLA 內層 / variables）；folding-boxes L3538-3646（HK$2.5-15 / 0.51·69 / 300-350g 白卡·E 坑 / 平板出貨省 70% / 自動鎖底 80cm 跌落 5kg / 燙金條碼）
> - 相似度: `.hermes/_b1c4_similarity.py` 双方法 tri-pair 实测（前/后两次全量打印）
> - 校准状态: 已校准（2026-10-15 13:5x，全部一手直读）

---

## 一、实锤（比 B1 审计的「98%」更宽——tri-pair 扫描的价值）

两簇扫描（food↔folding）只看到 en 0.98 / ja 0.94；**加入 mailer-boxes 做三角参照后**暴露第三处：folding zh body = mailer zh body 模板克隆（0.933，含「推廣單張/指示牌」传单场景错置文案与「10 張起印」假 MOQ）。**教训固化：簇扫描必须纳入全部同模板兄弟做 N-角扫描，两两扫描会漏第三个克隆体。**

| # | 病灶 | 处置 |
|---|---|---|
| 1 | en body 双页 = 包装通用模板（cosmetic/subscription 泛场景 + 同一份 FAQ） | ✅ 双页全重写（food=食品安全合规决策页 / folding=电商仓储结构决策页） |
| 2 | ja body 双页 = 通用 ja 模板（含繁体「包裝」泄漏 + 「同人・D2C」错置场景） | ✅ 双页全重写（修正 包装/内/置 等和文用字） |
| 3 | folding zh body = mailer 模板克隆 0.933 | ✅ 重写为折叠结构决策页（主刀脚本漏项，补刀脚本完成——verify→apply 链同样走了断言） |
| 4 | folding 三语 desc：X/X 双名 + 7-10 天交期与 FAQ 5-7 矛盾 + ja XのX 口吃；en desc 尾部「\| ZprintPro」品牌重复 | ✅ 三语 desc 重写（差异化锚 = 平板出貨省 70% / 自動鎖底 80cm 跌落 5kg，真值出 products.ts features） |
| 5 | folding 三语 H1 = 描述复制粘贴/弱点名；food ja H1 = 通用模板 | ✅ 4 槽重写 |
| 6 | 6 个 imageAlt 全坏：MOQ 备注句当 alt（「一般為100個起訂…」）/ pet food 污染 alt / ja「香港の」origin 泄漏 | ✅ GEO 公式重写 ×6（品牌分层：zh 智印港 / en·ja ZprintPro） |
| 7 | faqSchema = 包装族 12 SKU 共用模板（MOQ 500 vs minQ 100 矛盾 + 10-15 天交期冲突） | ✅ food/folding 两槽拆独立 4 问（其余 10 SKU → 簇 8 登记） |
| 8 | keywords 模板渣（化妝品盒/食品盒/快遞盒 乱入 folding；ja 槽含 en 词「food boxes」） | ✅ 5 组聚焦化（7 词/组，品类锚齐全） |
| 9 | 六个 title 全部在带且带钩 | ✅ **零改动**（churn 纪律） |

## 二、验收数据

| 门童/指标 | 结果 |
|---|---|
| 相似度（tri-pair：food/folding/mailer ×3 语 ×body/desc，双方法） | **WORST 8-gram = 0.134** ≤0.55（前：0.98/0.94/0.933 三处全拆）；词级同域全 ≤0.14 |
| tsc | 54 = 54（增量 0） |
| 门童 #27/#29/#16/#20/brand --strict | 全 exit 0；#27 本批零 HARD（6 title 未动 + 4 H1 无当量门禁但 ≤90 断言过） |
| regen | 断言 A-E PASS、title 0 漂移、字节级变化 = food/folding 恰 2 块 |
| 内链 | 新增 16 条全真实路由（packaging hub ×5 + food↔folding 互链 ×2 + mailer/rigid ×4 + waterproof-stickers ×2 + paper-bags ×1 + class 总览），locale 前缀断言过 |
| faqSchema | 2 槽 JSON 4 问/槽；MOQ 500 / 10-15 天矛盾清除 |
| BOM | 三文件无 BOM；备份 `.hermes/_bak-b1c4-20261015/`（含 supplement 前快照） |

## 三、差异化分工（簇内定位，防 cannibalize）

- **food-boxes = 食品安全合规决策页**：间接 vs 直接接触、PE vs PLA 内层、FDA/SGS、PET 窗、可变 QR 追溯、月餅/茶葉/烘焙/保健品/手搖场景。
- **folding-boxes = 电商仓储结构决策页**：平板出货 70% 仓储账、自动锁底 80cm/5kg、E 坑加固、烫金条码一版两用、折痕预压、精装盒/快递盒分流。
- 互链网：food↔folding 互指（按需求分流）+ 各自指向 mailer/rigid/hub——同簇互链按 §11.3 双向内链原则。

## 四、遗留登记（簇 8 队列输入）

1. **包装 faqSchema 模板余 10 SKU**（cosmetic/gift/rigid/mailer/kraft/eco 等）——同款 MOQ 500 矛盾。
2. **mailer-boxes zh/en body** 仍是通用模板（zh 与 folding 已拆，en 0.053 已远离 folding，但其自身仍是模板——簇 8 重写）。
3. **food-boxes 内部交期混用**：zh desc 3-5 vs en FAQ 旧版 5-7（en body 已重写统一 3-5，zh desc 3-5 未动 = 现在 zh/en/ja 三语统一 3-5 ✅ 仅 desc-en 旧句残留「5-7」字样？——本批已随 en body 重写清除，food zh desc（live 良好）3-5 与新 en/ja body 3-5 一致，**本簇内已自洽**）。
4. CSV「内部链接建议」列指向 gift-boxes（死链 SKU，7/22 已并入 rigid-boxes）——列不被 regen 消费，无线上风险，簇 8 顺带修。

## 五、SOP-10 5 问自检

1. **架构差异？** ✅ body=ts 权威直改；desc/h1/kw/alt=CSV 源头 + regen（断言 A-E）；faqSchema=products.ts 层。
2. **约束适用范围？** ✅ 恢复模式车道块生效中；title 零改动（无冻结冲突）；§0.0 名片面零触碰。
3. **原数据来源？** ✅ 全部数字（HK$2.5-15/18、0.51、69、80cm、5kg、70%、300-350g、E 坑、MOQ 100/500）= products.ts features/specs/price_range 一手；无编造。
4. **字段值策略？** ✅ 不涉 certNo/validUntil/issuer。
5. **Markdown 渲染？** ✅ 新增内链走 SkuSeoBody parseInlineLinks 链路（Rule 5 覆盖）；16 条链接前缀断言过。
