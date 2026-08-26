# F4 兜底代码生成 · README

> **签发**: Mavis · 2026-08-12 03:45 (K3 8/12 03:41 拍板 F1+F4 路线, F4 兜底)
> **目的**: 设计师 8/20 延迟时, F4 兜底保 8/20 上线
> **风格**: 极简 · 单色 · 工艺可见, 不追求艺术, 追求可印刷
> **关系**: F1 设计师交付后, 替换 F4 文件, F4 保留作未来快速迭代 fallback

---

## §1 文件清单 (3 个兜底骨架)

| 文件 | 用途 | 设计师替换 |
|---|---|---|
| `laisee_v1_skeleton.svg` | 红包 6 款共用骨架 (A6 105×148mm) | 6 个 AI 源文件 |
| `desk_calendar_v1_skeleton.svg` | 台历 12 月共用骨架 (216×146mm 三角台历) | 12 个 AI 源文件 |
| `wall_calendar_v1_skeleton.svg` | 挂历 24 节气共用骨架 (A3 297×420mm) | 12 个 AI 源文件 (24 中选 12) |

---

## §2 模板结构 (3 层)

### 2.1 内容层
- `{visual}` / `{light_scene}` / `{solar_term}` 等占位变量
- 3 locale 适配字段 (zh-hk 港式 / en 西方 / ja 日式)
- Logo 位 + 文字位 + 工艺位标准布局

### 2.2 工艺层 (单独图层)
- 烫金区 (Pantone 871C 金 / 877C 银)
- UV 区
- 模切线 (虚线)
- 压纹区
- 装订位 (台历/挂历)

### 2.3 印刷规范层 (设计师保留)
- 出血线 (3mm 粉色)
- 安全线 (5mm 青色)
- 300DPI 元数据
- CMYK FOGRA39 色空间 (设计师导出时设置)

---

## §3 变量展开规则

### 3.1 红包 6 款变量
```
{visual}    = white/silver foil/knit texture/ink wash/cartoon/姓氏
{craft}     = silver matte foil + blind emboss / brushed gold + frosted / etc
{paper}     = 200g pearl / 150g pearl / 200g specialty
{brand_color_primary}   = #FFFFFF / #8B0000 / #F5E6CC / #0A0A0A / #FFF8DC / #C8102E
{brand_color_secondary} = #C0C0C0 / #D4A574 / #A0937D / #D4380D / #FF8C69 / #D4AF37
{surname}   = 陳/李/張/黃/林/吳/蔡/王 (款 6 用)
```

### 3.2 台历 12 月变量
```
{month}            = 1-12
{light_scene}      = 冬晨窗光/灯笼暖光/惊蛰/清明/立夏/夏至/百叶/中秋/秋分/重阳/立冬/冬至
{brand_color}      = 12 月色板 (见 brief §4.2)
{locale_dim}       = zh-hk (農曆底部) / en (sans-serif) / ja (極小字位)
```

### 3.3 挂历 24 节气变量
```
{solar_term}       = 24 节气名 (立春/雨水/...)
{pinyin}           = lìchūn / yǔshuǐ / ...
{en_name}          = Start of Spring / Rain Water / ...
{culture_text}     = zh-hk (驚蟄打小人) / ja (七十二候) / en (北半球)
{style}            = S1 水墨线描 / S2 现代扁平
{brand_color}      = 24 节气色 (春绿/夏蓝/秋金/冬灰)
```

---

## §4 设计师交付替换流程

1. **设计师交付 75 个文件** (30 AI + 42 PDF/X-1a + 3 工艺标注)
2. **M3 接收 → 命名映射**:
   - `r1_chuxue_final.ai` → 替换 `laisee_v1_skeleton.svg` 款 1
   - `calendar_jan_final.ai` → 替换 `desk_calendar_v1_skeleton.svg` 月 1
   - `wallcal_lichun_s1_final.ai` → 替换 `wall_calendar_v1_skeleton.svg` 立春
3. **5 步真验证**:
   - 300DPI 元数据
   - CMYK FOGRA39
   - 3mm 出血
   - 5mm 安全区
   - 工艺图层完整
4. **替换后 F4 模板保留** 在 `code_templates/_archive/` 作未来 fallback

---

## §5 8/12 复盘日 0 push 严格 · F4 模板不部署

- F4 模板 = 兜底, 仅在 F1 失败时启用
- 8/20 前不上线 F4 (等 F1)
- F4 模板落 `code_templates/` (git tracked docs, 0 push)
- F4 模板不部署到 src/

---

EOF · .hermes/seasonal/2027/design/code_templates/README.md
F4 兜底 README · 3 骨架 + 变量 + 替换流程 · 8/20 启用判定
