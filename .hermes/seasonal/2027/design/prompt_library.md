# 2027 丁未羊年季节性产品 · AI 出图 Prompt 库 (Qwen 3.8 战略交付)

> 签发: 2026-08-10 (提前于 8/11 12:00 承诺点)
> 消费方: M3 / AutoGLM · 8/13 00:00 启动批量出图
> 结构: 每款 = Base 模板 + 变量矩阵 → 展开即得 108 组具体 prompt (红包 48 + 台历 12 + 挂历 48)
> 依据: 2026-08-09 K3 全量确认的季节性战略规划书 §6 + 本文 §0 红线

---

## §0 全局红线 (所有 prompt 必带 negative + 硬约束)

**Negative prompt (每款必加)**:
`--no Dunhuang, Mogao Caves, feitian, nine-colored deer, Buddhist mural, glossy foil, shiny gold foil, thin paper texture, business card,名片, 咭片, business cards, watermark, text overlay, logo`

**硬约束**:
1. 工艺红线: 烫金只出哑光/磨砂 (`matte foil / brushed foil / debossed foil`), 禁亮光烫金 (`glossy foil` 进 negative)
2. 材质红线: 利是封视觉必须呈现 ≥150g 厚度感 (`thick pearlescent paper, substantial weight feel`), 禁薄纸感
3. IP 红线: 敦煌吉羊仅作方向灵感, 不出具体敦煌元素 (版权) — 见 negative
4. 品类红线: 不出名片/咭片画面 (§11 主营约束)
5. 每款必须含 ≥1 个 "AI 做不到" 的结构元素提示位 (镂空/线装/布纹压纹), 作为工艺标注层, 供打样文件使用

**三市场适配变量 (locale_dim)**:

| 变量 | zh-hk | en | ja |
|---|---|---|---|
| 构图 | 满版喜庆 + 繁体书法字位 | 全出血 + 留白少 + 大胆直接 | 大面积留白 + 侘寂 + 极小字位 |
| 色调 | 正红/暖金 | 高饱和或极简双色 | 低饱和 + 单点红 |
| 文字区 | 预留繁体竖排区 | 预留 sans-serif 横排区 | 预留竖排假名区 |

---

## §1 红包「丁未·暖羊」6 款 × 8 变体 = 48 组

**Base 模板** (Midjourney v6+, 参数尾缀统一 `--ar 9:17 --style raw --v 6.1`):

```
Product photography of a premium Chinese New Year red envelope (lai see),
{visual}, {craft}, thick {paper} with visible texture and substantial weight,
{locale_dim}, soft studio lighting, warm narrative mood (not festive-cliché),
matte foil only, no gloss, --ar 9:17 --style raw --v 6.1 --no {NEG}
```

**6 款 visual/craft/paper 参数**:

| 款 | visual | craft | paper |
|---|---|---|---|
| 1 初雪 | white ground, silver-foil sheep flock silhouette in falling snow, thin red ribbon accent | silver matte foil + blind emboss | 200g pearl paper |
| 2 篝火 | deep red ground, sheep gathered by a campfire in brushed gold | brushed gold matte foil + frosted touch | 150g pearl paper |
| 3 织梦 | woven knit texture ground, wool yarn sheep illustration | fabric-grain emboss + spot UV | 150g pearl paper |
| 4 墨韻 | black ground, ink-wash sheep, single vermilion seal stamp | monochrome + red matte foil seal | 200g specialty paper |
| 5 童趣 | cream ground, cartoon sheep family, rounded corners | 4-color + rounded die-cut | 150g pearl paper |
| 6 百家姓 | red ground, large single Chinese surname in calligraphy, gold | digital print + gold matte foil | 200g specialty paper |

**8 变体维度 (每款展开)**: V1 正面平铺 / V2 45° 立拍带阴影 / V3 三枚扇形叠放 / V4 手持场景 (不露脸) / V5 工艺微距 (烫金/压纹特写) / V6 系列全家福 / V7 三市场适配·ja 留白版 / V8 三市场适配·en 大胆版

展开规则: `{visual}` × `{craft}` × `{paper}` 代入 Base, 变体换构图指令, locale 变体 (V7/V8) 代入 locale_dim。

**款 6 百家姓特例**: 变量加 `{surname}` ∈ [陳/李/張/黃/林/吳/蔡/王] (港式大姓前 8), 48 组中占 8 组用姓氏轮换。

---

## §2 台历「光影四季」12 月 × 1 场景 = 12 组

**Base 模板**:

```
Desk calendar page for {month} 2027, one single light phenomenon as hero:
{light_scene}, light passing through die-cut silhouette casting pattern on base,
triangular desk calendar 216x146mm, 300g touch paper with spot UV,
date grid minimal in bottom fifth, {locale_dim},
photographic light quality, not illustration-cliché, --ar 3:2 --style raw --v 6.1 --no {NEG}
```

**12 月光影场景 (light_scene)**:

| 月 | 场景 |
|---|---|
| 1 | 冬晨窗光斜切雪面 |
| 2 | 灯笼暖光透纸 |
| 3 | 惊蛰·雨后地面积水反光 |
| 4 | 清明·薄雾散射光 |
| 5 | 立夏·树叶间隙光斑 |
| 6 | 夏至·水面粼光 |
| 7 | 盛夏·百叶窗条纹光 |
| 8 | 中秋·月光穿镂空云纹 |
| 9 | 秋分·麦浪逆光 |
| 10 | 重阳·暮色长影 |
| 11 | 立冬·炉火侧光 |
| 12 | 冬至·烛光穿镂空雪花 |

3 locale 适配走 locale_dim (ja = 一条光影渐变线 + 极小日期; en = 全出血摄影; zh-hk = 底部农历 + 港式节气注)。

---

## §3 挂历「二十四节气」24 节气 × 2 风格 = 48 组

**Base 模板**:

```
A3 wall calendar month plate for {solar_term} ({en_name}),
{illustration}, solar term name in {type_style} with foil accent,
200g coated paper, 297x420mm, {locale_dim},
cultural narrative style, not stock-illustration, --ar 3:4 --style raw --v 6.1 --no {NEG}
```

**2 风格**: S1 水墨线描 + 单点节气色 / S2 现代扁平 + 几何节气符号

**locale 内容差异**: zh-hk = 繁体节气习俗短句 (惊蛰打小人/冬至围炉); ja = 七十二候 micro-copy; en = 北半球季节描述 + solar term 音译注释。

24 节气名 (立春/雨水/惊蛰/春分/清明/谷雨/立夏/小满/芒种/夏至/小暑/大暑/立秋/处暑/白露/秋分/寒露/霜降/立冬/小雪/大雪/冬至/小寒/大寒) 逐一代入。

---

## §4 产出与筛选协议 (M3 执行)

1. 8/13-8/15: 按矩阵展开 108 组 → 每组出 4 张 = 432 候选
2. 落盘 `.hermes/seasonal/2027/design/raw/<款>-<变体>-<序号>.png` + prompt 原文存 `prompts_manifest.json` (可复现)
3. 8/16 K3 初筛前, M3 先机器预筛: 剔除含 negative 元素 (VL 自检) + 剔除构图重复 (pHash 去重) → 每款保留 8 张进人工初筛
4. 工艺标注层: 每款定稿后补 `craft_notes.md` (烫金区/UV 区/模切线坐标), 打样文件 8/23 用

EOF · .hermes/seasonal/2027/design/prompt_library.md
