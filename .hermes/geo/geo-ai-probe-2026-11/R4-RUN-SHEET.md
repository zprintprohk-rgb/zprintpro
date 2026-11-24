# GEO 第 4 轮执行单 v2（2026-11-24 窗口 11:00 起 · r2=11-21 11:14 同窗可比）

> 依据: kit `docs/2026-10-27-geo-ai-face-probe-kit-nov2026.md`（§三逐字已核对 ✓ / §四模板 / §五 SOP / §九状态行待更）
> + 11-19 指令 §7.3 四问 + 11-23 milestone「12 固定问题 + 三向边缘抽验」
> 红线: 只进 .hermes/geo/；不用 web_search 顶替；不因探针改 src；C7 只入台账

## 固定条件登记（每跑记录头部照抄）

| 字段 | 值 |
|---|---|
| AI 面 × 版本 | Google AI Overviews（桌面浏览器, 固定 profile） |
| 账号 | 未登录（首页「登录」链接在位） |
| 地区/语言 | URL 固定参数 `hl=zh-HK&gl=HK`（与 r2 同） |
| 网络出口 | 香港 IP / 本机 |
| 执行者 | 编排层会话 autoclaw（浏览器 instanceId zwork-browser-b5740116-0580-47ed-b2c0-8bf0cc88385a） |
| 界面语言偏差 | ⚠️ 本 profile UI=简体中文（r2=繁體）；结果由 hl/gl 控制，引用判定不受影响——登记不豁免 |
| Perplexity 面 | SKIPPED: 登录墙（同 r2 口径，不用 web_search 顶替） |

## 探针清单（19 跑 = kit 7 簇 × 2 跑 + §7.3 五问 × 1 跑）

**A 组 kit 7 簇（逐字，已对 kit §三核对一致；每簇 r3+r4 两跑，间隔 ≥2min）**
- C1 zh: 香港邊間印刷公司可以小批量訂製食品包裝盒？價錢同起訂量點計？
- C2 en: Which printing companies offer Comiket doujinshi printing with international shipping?
- C3 zh: 2027 月曆印刷 香港公司推薦 訂製 邊間好？
- C4 zh: 香港 紙袋印刷 少量 訂製 邊間好？
- C5 ja: 同人誌印刷 10部から 安い おすすめ 印刷会社
- C6 ja: 食品用パッケージを小ロットで印刷してくれる会社は？
- C7 ja: 年賀状印刷 10枚から 安い 外注（监控专用，结果只入台账）

**B 组 §7.3 五问（首次使用；verbatim 源=11-19 §7.3 原文含简体/混排，**逐字保留不规范化**，因其为策略定义题面且无前轮可比约束；r4 后冻结为固定 prompt）**
- Q08 海報 zh: 香港单张海报／即日海报如何选择数量、文件与交期？
- Q09 catalog en: China catalog printing supplier 需要哪些规格才能报价？
- Q10 smallbatch en: small batch sticker printing 的 MOQ、打样与运输如何确认？
- Q11 教材 zh: 教材 印刷製本 的装订／材质与报价条件是什么？
- Q12 ステッカー ja: ステッカー印刷 小ロット 的装订／材质与报价条件是什么？

## 三向边缘抽验（在 C1/C2/C3 各两跑内观察，不加跑）

- E1 = C1 品牌标签: zh 面自有品牌词标签是否干净（异常=旧名固化；词表与旧名清单见 kit §一 品牌词表，实体归一未完成前持续监控）
- E2 = C2 防守位: ZP 是否仍 AIO 列表第 1 + organic #1（comiket-c109 双高地资产）
- E3 = C3 chip 波动: zh 面自有品牌词 chip 是否再现 + URL 对应可否文本层确认（AMBIGUOUS 复核）

## 文件命名（每跑一文件，续 kit 命名法）

- kit 簇两跑: `s2-c<1..7>-aio-r3.md` + `s2-c<1..7>-aio-r4.md`（r3/r4 = S2 系列第 3/4 跑序）
- §7.3 五问: `s3-q08..q12-aio.md`（首轮单跑）
- 收尾: `summary-s3.md`（7 簇矩阵对照 r2 + 12 问全景 + 三边缘结论）+ kit §九 状态行更新

## 执行序与时间预算

顺序: C1r3→C2r3→C3r3→C4r3→C5r3→C6r3→C7r3→C1r4→C2r4→C3r4→C4r4→C5r4→C6r4→C7r4→Q08→Q09→Q10→Q11→Q12
（A 组先全 7 簇 r3 再全 r4：同簇两跑天然 >2min 间隔 ✓；每跑独立记时刻）
预算: 19 跑 × ~2min ≈ 40min（11:00-11:45；r2 同为上午窗，可比性按时间-of-day ±15min 记录）
截图: C1/C2/C3 全 6 跑留档（边缘证据）；其余 截图=无（原文全文已录）

## 与 r2 对照锚点（判读用，不预写结论）

r2: C1 稳定被引(2/2)+旧名 · C2 居首+organic#1(2/2) · C3 chip AMBIGUOUS · C4-C7 稳定零 · ja 全簇零
本轮变化面: doujin 宽表面条件化（bf9e35b5 02:45 上线）→ C2/C5 答案面；食品包裝 11-18 meta 修复 7d 窗未到（不判胜负）

## 附: 预编码 URL（q= 已 urlencode, hl/gl 固定）

见 `R4-URLS.txt`（生成于执行单定稿后）
