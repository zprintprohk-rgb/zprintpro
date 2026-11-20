# K3 18:50 拍板落地报告 (zh-hk 硬规则 + §0.32)

**触发**: K3 18:50 拍板 "zh-hk 语言不要出现 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號. 这个具体的信息,写进规则里面,硬性规则"

**落地时间**: 2026-09-01 18:50
**作者**: Mavis (M3) 自动派发执行

---

## §1 修复 (zh-hk.json restaurant-menu-printing-guide 末尾追加 callout 段)

- **旧 content**: 10,124 chars
- **新 content**: 10,088 chars (-36 chars)
- **移除内容**: 1 处 " / 深圳市彩龍印刷包裝有限公司 / 深圳市龍崗區平湖街道嘉城路 1 號" (offset 8500)
- **保留**: "深圳" 城市名 (跨境配送 4 城市列表之一) + "平湖" 街道名 (单独) + 品牌名 智印港 + 联系人 +86 198 8085 1334 + wa.me/8619880851334 + 邮箱 zprintpro@outlook.com

**Python 验证**:
- "深圳市彩龍印刷包裝有限公司" 0 次 ✓
- "深圳市龍崗區平湖街道嘉城路 1 號" 0 次 ✓
- "平湖街道" 0 次 ✓
- "彩龍印刷" 0 次 ✓
- "深圳" 1 次 (跨境配送 4 城市之一, K3 拍板未涉及, 保留) ⚠️

---

## §2 跨项目 P0 永久规则 §0.32 (写进 MEMORY)

5 个禁词 (zh-hk 绝不出现):
1. `深圳市彩龍印刷包裝有限公司`
2. `深圳市龍崗區平湖街道嘉城路 1 號`
3. `Shenzhen Cai Long Printing Packaging Co., Ltd.` (en 翻译)
4. `1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen 518111` (en 翻译)
5. 邮编 518111 单独使用 (合并到地址, 5 中已含)

**保留** (K3 拍板未涉及):
- 品牌名 智印港 / ZprintPro
- 联系人 +86 198 8085 1334 / wa.me/8619880851334
- 邮箱 zprintpro@outlook.com
- "深圳" 城市名 (跨境配送 4 城市之一)
- "平湖" 街道名 (单独)

**en/ja 暂保留** (K3 拍板仅 zh-hk, 留 K3 后续拍板):
- en 末尾追加 1 处含 "Shenzhen Cai Long + Jiacheng Road + Pinghu"
- ja 末尾追加 1 处含 "深圳市彩龍 + 彩龍印刷 + 平湖街道"

**SOP**:
1. 写新 content 前 grep 5 个禁词, 0 出现才能 push
2. 现有 content 必跑 Python audit 脚本
3. 推后 5 URL verify 必含禁词 grep
4. en/ja 同步问题留 K3 拍板

---

## §3 数据来源

- K3 18:50 拍板原文
- MEMORY.md §0.32 (新写, 跨项目 P0 强制级)
- §0.22 SOP-10 5 问门禁 (3 locale 同步, en/ja 暂保留违反, 留 K3 拍板)
- §0.23 数据诚信红线 (不影响)
- §13.16 双品牌宪法 (智印港 / ZprintPro, 品牌 vs 实体分离)
- §0.25.1 第 2 款 (手动 push K3 必拍 1 次回复, K3 18:50 拍板 = 豁免 30 min 硬下限, 距上次 18:30 = 20 min)

---

## §4 §0.25 30 min 间隔硬规则 + K3 拍板豁免

| 字段 | 值 |
|------|-----|
| 上次 push 时间 | 2026-09-01 18:30 (commit 9726c185 docs 收尾) |
| 本次 push 时间 | 2026-09-01 18:50 (K3 拍板后) |
| 间隔 | 20 min 整 |
| 30 min 硬下限 | 17:18:05 + 30 min = 17:48:05 (上次推后立刻) - 但 K3 18:50 拍板豁免 |
| §0.25.1 第 2 款 | ✅ 手动 push, K3 18:50 拍板 = 1 次回复确认, 豁免 30 min 硬下限 |
| 推后 verify | 5 URL curl 200 + 4 marker 必含禁词 grep 0 命中 |

---

## §5 后续 (留 K3 拍板)

- en/ja 同步修复: 等 K3 拍板是否要 en/ja 也移除同实体信息 (现 en 含 Shenzhen Cai Long + Jiacheng Road + Pinghu, ja 含深圳市彩龍 + 平湖街道)
- §0.22 SOP-10 5 问门禁同步修复: 3 locale 应同步, K3 18:50 拍板只 zh-hk, 暂保留 en/ja 违反 §0.22 第 5 款
- 历史 commit (f2b325e2 / d25ae72f / 18a3e2c1 / 9726c185) 含 zh-hk 1 处 + en 1 处 + ja 1 处实体信息, 未来 K3 拍板 amend 修复
