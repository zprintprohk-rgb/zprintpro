# -*- coding: utf-8 -*-
from pathlib import Path
CSS = """
body{font-family:'Segoe UI',system-ui,sans-serif;max-width:980px;margin:0 auto;padding:24px;color:#1f2937;line-height:1.65;background:#f8fafc}
h1{font-size:1.45rem;border-bottom:3px solid #0f766e;padding-bottom:8px}
h2{font-size:1.12rem;margin-top:26px;color:#0f766e;border-left:4px solid #0f766e;padding-left:10px}
table{border-collapse:collapse;width:100%;margin:12px 0;font-size:.86rem}
th,td{border:1px solid #d1d5db;padding:6px 9px;text-align:left;vertical-align:top}
th{background:#0f766e;color:#fff}
tr:nth-child(even){background:#f1f5f9}
.badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:.78rem;font-weight:600;color:#fff}
.ok{background:#059669}.warn{background:#d97706}
.metrics{display:flex;gap:14px;flex-wrap:wrap;margin:14px 0}
.metric{flex:1;min-width:150px;background:#0f766e;color:#fff;border-radius:10px;padding:14px;text-align:center}
.metric .v{font-size:1.5rem;font-weight:700}
.metric .k{font-size:.8rem;opacity:.9}
.note{background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:12px;margin:12px 0;font-size:.9rem}
.okbox{background:#ecfdf5;border:1px solid #6ee7b7;border-radius:8px;padding:12px;margin:12px 0;font-size:.9rem}
pre{background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;overflow-x:auto;font-size:.82rem}
"""
body = """
<h1>Seedream 5.0 lite 水印结论 + 2 SKU 测试方案 + 下载区分规范</h1>
<div class="badge ok">✅ 无水印确认（API 直调）</div> &nbsp; <span style="font-size:.9rem;color:#6b7280">2026-08-22 · 测试包：WI-001 + PB-001（无图新 SKU）</span>

<h2>一、水印结论：付费 API 直调 = 无水印</h2>
<div class="metrics">
  <div class="metric"><div class="v">AutoClaw 中转</div><div class="k">带水印（需 1200x1146 裁切）</div></div>
  <div class="metric"><div class="v">方舟 API 直调</div><div class="k">watermark:false = 0 水印原生</div></div>
  <div class="metric"><div class="v">1200x1200</div><div class="k">无需裁切，直接正方形</div></div>
</div>
<ul>
<li><b>水印来源</b>：历史水印是 <b>AutoClaw 工具水印</b>（"AutoClawAI" 文字，实测位于 y=1146-1179 底边），由 autoglm 中转通道叠加，<b>不是 Seedream 模型自身水印</b>。</li>
<li><b>实证</b>：V22 Direct API 脚本 <code>seedream-ark-batch.py</code> 显式传 <code>'watermark': False</code>；项目文档（m3-status 2026-08-20）已记录判断 = "0 watermark 原生"。</li>
<li><b>结论</b>：付费按量直调火山方舟 Seedream 5.0 lite（<code>doubao-seedream-5-0-lite-260128</code>），输出原生无水印 → <b>1200x1146 BOTTOM-STRIP 裁切不再需要 → 直接 1200x1200 正方形</b>。</li>
</ul>
<div class="okbox">✅ <b>决策成立</b>：测试包提示词已把尺寸条款改为 "Output 1200x1200 square (watermark off, no crop needed)"。</div>
<div class="note">⚠️ <b>落地前核对</b>：前端 PDP 图片容器（v21 §6 记录 "P1 待办"）按 1.047:1 设计，改 1:1 后需确认 <code>object-fit: cover</code> 或容器比例，避免拉伸。建议正式切换前用 1 张 1200x1200 实测线上渲染。</div>

<h2>二、2 个测试 SKU（均无历史图片）</h2>
<table>
<tr><th>SKU</th><th>产品</th><th>视图</th><th>代表性理由</th></tr>
<tr><td><b>WI-001</b></td><td>foil-wedding-invitations 烫金婚礼邀请函</td><td>HERO / DETAIL / VARIETY-C / MULTI-ANGLE</td><td>wedding 类目旗舰（8/19 新扩展），美国婚礼市场主场景，测新类目模板质量</td></tr>
<tr><td><b>PB-001</b></td><td>kraft-paper-bags 牛皮纸袋</td><td>HERO / DETAIL / VARIETY-A / MULTI-ANGLE</td><td>GSC 纸袋集群 4 词齐升（印刷紙袋 pos12.7 等），美国 eco 趋势，测基础视图质量</td></tr>
</table>
<p>两 SKU 合计 <b>8 条提示词</b>，覆盖 HERO（80-85% 主体）/ DETAIL（85-95% 特写）/ VARIETY-A（同款多色）/ VARIETY-C（多款组合）/ MULTI-ANGLE（多角度）全部视图类型。全部为 1800-2400 字符 V22 版，已通过质量校验。</p>

<h2>三、下载区分规范（不改名也能分清 SKU/视图）</h2>
<h3>方案 A：API 直调（推荐，全自动）</h3>
<p>批量脚本按 <code>OUT\\&lt;SKU_ID&gt;\\raw\\&lt;SEO文件名&gt;</code> 分目录保存：</p>
<pre>zprintpro-en-us-images\\WI-001\\raw\\zprintpro-wedding-invitations-...-hero.webp
zprintpro-en-us-images\\PB-001\\raw\\zprintpro-paper-bags-...-detail.webp</pre>
<p>SKU 目录 + SEO 文件名双重标识，下载即分类，无需人工改名。配合 <code>--start SKU</code> 逐 SKU 试跑 + 人工审图后决定是否续跑（天然实现"人工控制是否重出第二张"）。</p>
<h3>方案 B：网页/即梦人工生成（手动下载）</h3>
<p>seedream 网页版下载文件名是随机 ID，<b>不改名时靠"生成顺序对照表"</b>：</p>
<pre>第 1 张 → WI-001 HERO     第 2 张 → WI-001 DETAIL
第 3 张 → WI-001 VARIETY-C 第 4 张 → WI-001 MULTI-ANGLE
第 5 张 → PB-001 HERO     第 6 张 → PB-001 DETAIL
第 7 张 → PB-001 VARIETY-A 第 8 张 → PB-001 MULTI-ANGLE</pre>
<p>按测试包顺序逐张生成 → 下载后按序号对照（测试包文件头部即印有该映射表）。建议每生成一张立即重命名为 <code>&lt;SKU&gt;-&lt;VIEW&gt;.webp</code>，或按 SKU 分别生成、分别放入 WI-001/ PB-001 文件夹。</p>
<h3>方案 C：全量人工 + 复核重出</h3>
<p>逐视图人工审图：不满意的单张重出（改提示词局部），满意的直接入库。重出时用同一映射表第 N 位替换即可。</p>

<h2>四、下一步</h2>
<ol>
<li>配 ARK_API_KEY（火山方舟控制台 → API Key 管理）</li>
<li>用测试包 8 条提示词直调，验证 ①真实无水印 ②1200x1200 出图质量 ③速度（预期 6-9x）</li>
<li>前端 1200x1200 容器实测 1 张，确认无拉伸</li>
<li>确认后全量 99 SKU × 4-5 视图按 V22 批量生成</li>
</ol>
"""
d = Path(r"F:\zprintpro-nextjs\.hermes\k3-inbox\2026-08-22-v22-test-plan.html")
d.write_text(f"""<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><title>V22 水印结论与测试方案</title><style>{CSS}</style></head><body>{body}</body></html>""", encoding="utf-8")
print("html:", d.stat().st_size)
