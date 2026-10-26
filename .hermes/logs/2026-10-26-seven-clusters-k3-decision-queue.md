# 七簇 30 天执行 — K3 决策队列（2026-10-26 汇总）

> 来源: `docs/2026-10-26-seven-clusters-seo-aeo-geo-global-strategy.md` §12 八项 + 本轮 CF 部署阻断 + 车道调度缺口。
> 消费方: K3（拍板）→ DeepSeek 执行层（按拍板落地）。未拍板项保持 `UNKNOWN/blocked`，不转营销文案。
> 本文件为内部决策文档（含 GSC／探针数据，禁入客户可见内容，§0.23.1）。

---

## A. 策略 §12 八项（优先级按字段列出）

### K3-1 · doujin 价格单位与币种
- **现状**: 三语 doujin 显示 `¥7,500〜/部〜`；products.ts DJ-001 `price_range=¥7,500〜/部〜`、`basePrice=7500(JPY)`、`basePrice_en=1245`、`minQuantity=10`。
- **问题**: ¥7,500 是「每部」还是「每单/其他规格」未定；en/zh 该显示 JPY 还是本地币种；basePrice_en=1245 的币种/倍率未核。
- **请 K3 一句话**: ① ¥7,500 对应口径；② en/zh 显示币种与报价方式（推荐: en/zh 改为本地币并链 30 秒 AI 报价，不写换算假值）。

### K3-2 · doujin MOQ 与 rush
- **现状**: ja 描述写 50 冊（正文/H1 10 冊）——源已改 10（先遣 P0-3）；「コミケ前 24 時間特急」「即日発送」并存；C109 页承诺逆算。
- **问题**: 10 vs 50 终裁；24h/即日、生产与国际配送边界；酒店/会场直送是否可承诺。
- **请 K3**: 终裁 MOQ 数字与 rush 承诺边界（可兑现才保留，否则删）。

### K3-3 · 四页 MOQ（saddle/exercise/catalog/A2）
- **现状**: saddle/exercise 源已改 H1 100→10（products.ts minQ=10）；catalog/A2 线上 H1 仍 100+（desc 10）。
- **问题**: title 10 与 H1 100 哪一个是真（数字小批 10 vs offset 批量 100）；exercise 装订已统一 Saddle-Stitched 是否认可。
- **请 K3**: 四页统一口径（推荐: 数字印刷 MOQ=10 为公开口径，H1 改 10；若业务上 offset 起印 100 需同时写清）。

### K3-4 · ja 报价币种
- **现状**: ja textbook description `HK$5-50/冊`（线上确认）、ja paper-bags 正文 `HK$8.00〜`；全站 ja 内容 50 处 HK$（含香港语境内容——语义正确，不在本项）。
- **问题**: 日本站通用页应显示 JPY 的金额、适用范围、有效期；不能只换货币符号。
- **请 K3**: textbook 与 paper-bags 的日元金额（或授权按 products.ts 真值换算）+ 有效期。

### K3-5 · 年賀状 A/B
- **现状**: `/ja/nengajo-2027/` 主推 127×178mm；早割率/截止未定、宛名确认中；先遣已撤「早割受付中」承诺词。日本郵便一般年賀はがき = 100×148mm。
- **问题**: 100×148 可否生产；127×178 产品定位（若只是贺卡则不能借年賀状意图）；价格/早割/截止；宛名/投函是否提供。
- **请 K3**: A 分支（统一规格/早割/宛名后推进）或 B 分支（转普通贺卡定位、不扩年賀状词）。

### K3-6 · small batch 服务边界 + en greeting 承诺清理
- **现状**: small batch 线上已具 50pcs/$0.045/免费 2h 数字 proof/4-day USA；en greeting 线上 `$0.50` 系 white-card-bags HK$0.50 误用（真值 $0.13-0.23），且 h2「100 MOQ」vs 正文「10 MOQ」冲突；无来源案例/百分比（30% 回购率 / TikTok Paper Love GMV / 20% 溢价 / $0.07 / 78萬 GMV / LovePop / 70億枚）。
- **请 K3**: ① 数字 proof vs 实体样区别、样品费/运费、4-day USA 与退款承诺的地区条件；② greeting 统一 $0.13-0.23 + MOQ=10；③ B1-B4/E1-E5 删除或证据化（§0.23 无来源即删）。

### K3-7 · 性能与环保声明
- **现状**: `100%環保`、户外 3–5 年、食洗机 80°C、防水年限、承重、FSC/100%环保等分散各处；无测试数据。
- **请 K3**: 可公开范围（改有测试条件的材料/使用边界；无证据删除）。

### K3-8 · 转化接入
- **现状**: GA4、008 有效询盘、订单未按 landing page 对齐；「带钱词」收入待校准。
- **请 K3**: 允许 GA4/008/订单按 landing page 对齐，建立带钱词收入视图。

---

## B. 部署阻断（本轮新增，最高优先级）

### K3-9 · Cloudflare Pages build 连续失败（P0-2/P0-3/年賀状/CAT-P0-06 全部未上线）
- **证据（GitHub check-runs 2026-10-26 21:3x）**:
  - `ef3140ac`（P0-2 robots + P0-3 MOQ，18:39 推）: CF Pages **conclusion=failure**，started/completed 同秒（10:42:32Z）→ **零时长失败 = 构建前拒绝（quota/账户/配置），非代码错误**。
  - `23f9c81c`（18:53 推）: 同秒 **failure**（10:56:55Z）。
  - 上次成功 build = `8c3dd996` @ 08:59（退场/进攻 title 批）。之后所有 src 修复（robots 单源化、MOQ 100→10、年賀状撤早割、本轮 catalog 清毒）**均未部署**。
- **本地侧**: 本地 build PASS（726 URLs，`.next/server/app/robots.txt` 已生成）；tsc 54=54；门禁全绿。
- **根因假设（高置信）**: 免费方案**月度 build quota 耗尽**（今天高频 push）；次因 CF 账户/构建配置变更。
- **K3 动作（需 CF Dashboard，私有访问）**: ① 查 `zprintprohk-rgb/zprintpro` 最近 build logs（ef3140ac / 23f9c81c）失败原因；② 若 quota → 等重置或升级；③ 修复后手动重跑 build 或重推；④ 部署后我方可立即线上探针验收（robots 200 + saddle/exercise H1 10 + catalog description 无内部标记）。

---

## C. 调度与契约（次要）

### K3-10 · 车道调度缺口
- weekly-meta 10-24 20:52 漏跑（0x800710E0）/ gsc-feedback 10-25 20:13 漏跑 / blog-deepfix 10-25 23:47 漏跑（lane-status `need_human`，LastTaskResult=2147946720）——不补跑制造历史成功；下一触发自然恢复。注册/修复需 K3 管理员。
- §8.2 周五错时（weekly 20:52→22:22）待 K3 批准后改调度（不擅改，策略 §10.3）。

---

## 已闭环（无需决策，供知悉）
- **CAT-P0-06**（catalog supplier guide 内部 ranking target 泄露）: 本轮 9 处清理完毕（blog-data ×3 + blog-posts ×3 + category-seo-content ×3），残留扫描 0，备份在 `.hermes/_bak-cat-cleanup-20261026/`。
- **CORE-P0-02** 真值台账首版: `.hermes/logs/2026-10-26-seven-clusters-p0-truth-ledger.md`。
- **基线冻结 v1.0**: `docs/2026-10-26-seven-clusters-baseline-freeze.md` + `.kimi-work/seven-clusters-20261026/` 入库。
- **en eco 诊断**（DIAG-P3-14）: `.hermes/logs/2026-10-26-eco-paper-bag-gsm-diagnosis.md`（根因 H1-H4，修复方向 A-D 待拍板执行）。

> 数据来源: 见各台账行；CF check-runs = api.github.com 公开接口 2026-10-26 21:3x；线上探针 = urllib.request 2026-10-26 21:3x（UA Mozilla/5.0）。
