# 七簇 30 天执行 — K3 决策队列（2026-10-26 汇总）

> 来源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §12 八项 + 本轮 CF 部署阻断 + 车道调度缺口。
> 消费方: K3（拍板）→ DeepSeek 执行层（按拍板落地）。未拍板项保持 `UNKNOWN/blocked`，不转营销文案。
> 本文件为内部决策文档（含 GSC／探针数据，禁入客户可见内容，§0.23.1）。

---

## A. 策略 §12 八项（优先级按字段列出）

### K3-1 · doujin 价格单位与币种
- **现状**: 三语 doujin 显示 `¥7,500〜/部〜`；products.ts DJ-001 `price_range=¥7,500〜/部〜`、`basePrice=7500(JPY)`、`basePrice_en=1245`、`minQuantity=10`。
- **2026-10-27 01:35 复核**: ja PDP body 仍含 `¥7,500`；C109 页 ja 段 `¥7,500 から`；zh body `單價由 ¥7,500 起／部`。
- **问题**: ¥7,500 是「每部」还是「每单/其他规格」未定；en/zh 该显示 JPY 还是本地币种；basePrice_en=1245 的币种/倍率未核。
- **请 K3 一句话**: ① ¥7,500 对应口径；② en/zh 显示币种与报价方式（分析师推荐: en/zh 改本地币并链 30 秒 AI 报价，不写换算假值；ja 保留 ¥7,500 若业务认可「每部」）。

### K3-2 · doujin MOQ 与 rush
- **现状**: ja 描述原写 50 冊（正文/H1 10 冊）；「コミケ前 24 時間特急」「即日発送」并存；C109 页承诺逆算。
- **2026-10-27 01:35 复核**: **MOQ 50→10 已线上生效**（ja PDP body: 10冊=True、50冊=False；desc 亦 10冊〜）——此子项已闭环，无需再拍板。
- **剩余问题**: 24h/即日、生产与国际配送边界；酒店/会场直送是否可承诺（C109 页 ja 段有「前日・会場受取」表述）。
- **请 K3**: 只对 rush 承诺边界拍板（可兑现才保留，否则删）。

### K3-3 · 四页 MOQ（saddle/exercise/catalog/A2）
- **现状**: saddle/exercise H1 已改 100→10 且 **2026-10-27 01:35 线上已生效**（`from 10 Copies`）；catalog/A2 线上 H1 仍 100+（desc 10）。
- **问题**: 仅剩 catalog/A2 的 H1 100+ 是否改 10（数字小批 10 vs offset 批量 100）；exercise 装订已统一 Saddle-Stitched 是否认可。
- **请 K3**: ① 认可 catalog/A2 统一 MOQ=10（推荐: 数字印刷 MOQ=10 为公开口径，H1 改 10；若业务 offset 起印 100 需同时写清）；② exercise 装订 Saddle-Stitched 认可；③ **书刊内页克重口径统一（新观察 12:1x）**——saddle desc「157g–200g」vs material「128g–157g」vs 选项 80/100/128g，随本批定 SSoT（建议: material/选项为准 128g–157g，desc 同步）。

### K3-4 · ja 报价币种
- **现状**: ja textbook description `HK$5-50/冊`（线上确认）；ja paper-bags 正文 `HK$8.00〜`；全站 ja 内容 50 处 HK$（含香港语境内容——语义正确，不在本项）。
- **2026-10-27 01:35 复核**: `/ja/blog/textbook-printing-guide/` desc 仍为 `100冊から HK$5-50/冊`（HK$ 在线未变）。
- **问题**: 日本站通用页应显示 JPY 的金额、适用范围、有效期；不能只换货币符号。
- **请 K3**: textbook 与 paper-bags 的日元金额（或授权按 products.ts 真值换算）+ 有效期。

### K3-5 · 年賀状 A/B
- **现状**: `/ja/nengajo-2027/` 主推 127×178mm；早割率/截止未定、宛名确认中；先遣已撤「早割受付中」承诺词。日本郵便一般年賀はがき = 100×148mm。
- **2026-10-27 01:35 复核**: H1 `2027年年賀状印刷 — 10枚から ¥20〜`；desc 仍 `127×178mm 標準サイズ、宛名オプション対応確認中、納期3〜5営業日、DHL国際2〜…`。
- **问题**: 100×148 可否生产；127×178 产品定位（若只是贺卡则不能借年賀状意图）；价格/早割/截止；宛名/投函是否提供。
- **请 K3**: A 分支（统一规格/早割/宛名后推进）或 B 分支（转普通贺卡定位、不扩年賀状词）。

### K3-6 · small batch 服务边界 + en greeting 承诺清理
- **现状**: small batch 线上已具 50pcs/$0.045/免费 2h 数字 proof/4-day USA；en greeting 线上 `$0.50` 系 white-card-bags HK$0.50 误用（真值 $0.13-0.23），且 h2「100 MOQ」vs 正文「10 MOQ」冲突；无来源案例/百分比（30% 回购率 / TikTok Paper Love GMV / 20% 溢价 / $0.07 / 78萬 GMV / LovePop / 70億枚）。
- **2026-10-27 02:0x 新增证据（P1-B 包）**: ① **版/枚单位粒度冲突**——products.ts small-batch `minQ=10（A4 版）/ HK$38-120/A4` vs 线上 `50+ pcs / $0.045/pc`；采购表/页面需写清「每 A4 版 vs 每枚」两档口径（不改 $0.045 为 $0.05，停止条）。② **small-batch PDP 无 guide 出链**（线上双方法 02:08: PDP 仅导航链接，无 sticker-guide/buying-guide 正文链接）——E1 入链已补、出链未满，建议批内补 1-2 条零声明出链（PDP 采购段 → sticker-guide/buying-guide）。
- **请 K3**: ① 数字 proof vs 实体样区别、样品费/运费、4-day USA 与退款承诺的地区条件；② greeting 统一 $0.13-0.23 + MOQ=10；③ B1-B4/E1-E5 删除或证据化（§0.23 无来源即删）；④ 版/枚口径 + PDP 出链许可。

### K3-7 · 性能与环保声明
- **现状**: `100%環保`、户外 3–5 年、食洗机 80°C、防水年限、承重、FSC/100%环保等分散各处；无测试数据。
- **2026-10-27 02:0x 新增定位（BAG/POSTER 包线上探针）**: ① 🔴 **handle-bags H1「堅固手挽設計，承重能力強」无实测**（BAG-P1-08 停止条触发，优先裁决：删除或改「底卡加固／手挽加固設計」描述口径，products.ts finishing 有支撑）；② eco-paper-bags H1「FSC 認證或再生紙」绝对化 vs products.ts「依供應」——需证书证据否则条件化；③ a2/outdoor「防水防曬・戶外不褪色」无测试——建议改「可選 PP 裱貼／霧面護膜」材质口径；④ same-day-flyers「當天交貨・即日快遞」急件承诺 = K3-2 同族；⑤ 海报 price_range 口径（products.ts 整單 HK$95-1,017 vs 线上 HK$12.9起/張）需统一。
- **2026-10-27 12:1x 复核（双方法，探针 6 URL + category 页）**: ① **handle-bags H1 承重违规仍在线**——H1 = 「堅固手挽設計，承重能力強。適合購物中心、超市。…」（完整 H1 含营销段，K3-7 优先项 #1 证据强化）；② eco H1「FSC 認證或再生紙」绝对化仍在线；③ **纸袋 category↔6 PDP 双向 6/6 再核 PASS**（kraft/white-card/gift/eco/handle/large 全部 cat-anchor + back-link True，BAG 包 §3 声明无误）。
- **请 K3**: 可公开范围（改有测试条件的材料/使用边界；无证据删除）——优先 ①承重 ②FSC。

### K3-8 · 转化接入 —— ✅ 已拍板关闭（K3 2026-10-27，终局）
- **拍板原话**: 「GA4和008及订单情况都是线下处理的，不是在线交易，所以你们掌握不了，不要再加进这些项，早决策了。你只要盯点击次数，总曝光次数和平均点击率及平均排名。还有就是带钱词的排名，在首页的有多少，关键词的行数这些GSC数据，这些数据好，订单就不会差。」
- **条款 1（红线）**: GA4 / 008 询盘 / 订单全部线下处理，执行层**不接入、不请求、不再列入任何拍板队列**；后续报告/方案不得再出现此类待拍板项。
- **条款 2（监控口径）**: 四指标（点击/曝光/CTR/平均排名）+ 带钱词排名（23 词 SSoT）+ 首页词数（pos≤10）+ 关键词行数。
- **落地 SSoT**: `docs/2026-10-27-k3-gsc-kpi-monitoring-panel-v1.md` · 生成器 `node scripts/k3-kpi-panel.mjs --pull=<批次>`（v1 基线已双方法核对，与策略 §2.2/§3 逐格一致）。

---

## B. 部署阻断（本轮新增，最高优先级）

### K3-9 · Cloudflare Pages build / robots（已基本闭环，仅剩 K3 侧动作）
- **进展（2026-10-26 22:xx—2026-10-27）**: 平行会话 9ad7dbf3/028233aa 改用 **CF Pages Function（functions/robots.txt.ts edge 拦截）** —— 22:16 线上验收 **PASS（robots.txt 200 + 12 AI allow + sitemap×2 + 无 /_next/）**；2026-10-27 01:35 本人复核同 PASS。
- **根因修正**: 早期「零时长 build failure = quota 耗尽」假设**不成立**——build 已恢复（3b39a3f4 部署确认）；平行会话 7c0a37aa 定位: `generate-sitemap-content` SKIP → `ROBOTS_TXT` 缺失 → `route.ts` import 失败（构建侧问题，非账户 quota）。
- **剩余 K3 动作**: CF Dashboard → Security → Bots **允许 AI crawlers**（CF edge 优先生效，§0.1 K3 侧动作）——完成后 AI 抓取允许即全链路闭环。

---

## C. 调度与契约（次要）

### K3-10 · 车道调度缺口
- weekly-meta 10-24 20:52 漏跑（0x800710E0）/ gsc-feedback 10-25 20:13 漏跑 / blog-deepfix 10-25 23:47 漏跑（lane-status `need_human`，LastTaskResult=2147946720）——不补跑制造历史成功；下一触发自然恢复。注册/修复需 K3 管理员。
- §8.2 周五错时（weekly 20:52→22:22）待 K3 批准后改调度（不擅改，策略 §10.3）。

---

## 已闭环（无需决策，供知悉）
- **robots（P0-2）**: CF Pages Function edge 拦截方案，线上 200 + 12 AI allow + sitemap×2（22:16 + 01:35 双复核 PASS）。
- **saddle/exercise MOQ（P0-3）**: 线上 H1 `from 10 Copies`（01:35 复核生效）。
- **doujin MOQ 50→10**: 线上已生效（01:35 复核 10冊）。
- **CAT-P0-06**（catalog supplier guide 内部 ranking target 泄露）: 9 处清理完毕 + 线上三语 clean（01:35 复核）；备份在 `.hermes/_bak-cat-cleanup-20261026/`。
- **CORE-P0-02** 真值台账首版: `.hermes/logs/2026-10-26-seven-clusters-p0-truth-ledger.md`（01:35 复核更新）。
- **基线冻结 v1.0**: `docs/2026-10-26-seven-clusters-baseline-freeze.md` + `.kimi-work/seven-clusters-20261026/` 入库。
- **en eco 诊断**（DIAG-P3-14）: `.hermes/logs/2026-10-26-eco-paper-bag-gsm-diagnosis.md`（根因 H1-H4，修复方向 A-D 待拍板执行）。
- **P1-en 无风险内链 ×6**（平行会话 a07c619d）: saddle/exercise/catalog 自然锚，线上 6/6 `<a>` 渲染 PASS。
- **J1 内链补全（本轮）**: doujin PDP（三语）→ `/comiket-c109/` 活动页 3 处零声明自然锚（C109→PDP 方向已有）。
- **E1 small-batch 入链（2026-10-27）**: sticker-guide 采购段 → `/en/product/small-batch-stickers/` 单锚上线（origin=dfe5132f，02:13 push）；线上双方法渲染确认（我方 11/11 探针 + 对端 §2.9 独立验收）。
- **攒批 push 15 commits（2026-10-27 02:13）**: CF build SUCCESS；P1 主 URL 线上 11/11 200（zh 纸袋/海报/传单、en small-batch/saddle/exercise、en doujin + ja C109、robots AI allow）。
- **P1 五主 URL 数据包全就绪（02:0x）**: BAG-P1-08（纸袋 6 SKU）/ POSTER-P1-09（海报传单 10 SKU）/ STICKER-P1-10 + BOOK-P1-11（en）——真值表 + 采购答案草稿 + K3 flag 清单，**K3 拍板后当日可落 category 首屏直答**。
- **周 2 启动执行包（2026-10-27 12:0x）**: `2026-10-27-week2-p1-execution-launch-pack.md`——23 带钱词 × 主 URL 落位缺口表（首页 6/23）+ 五页采购答案落地单（文件/入口/锚点/K3 门）+ **K3 决策速览表**（K3-1..7/9/10 每项一句话选项+推荐，拍板即解锁对应 §2 批）。
- **基线复测 SOP 预演 PASS（02:0x）**: `analyze_seven_clusters.py` 冻结输入复跑输出字节级一致（JSON hash 与 HEAD blob 相同）。

> 数据来源: 见各台账行；CF check-runs = api.github.com 公开接口 2026-10-26 21:3x / 2026-10-27 02:2x；线上探针 = Invoke-WebRequest 2026-10-27 02:1x-02:2x（UA Mozilla/5.0）。
