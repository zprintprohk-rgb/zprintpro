# -*- coding: utf-8 -*-
# 缝合 v7 设计稿: head(CSS) + 冻结页眉 + 正文 + 冻结页脚
import io, re

CSS = r"""
:root{
  --blue:#2873F5; --orange:#F87314; --orange-dark:#EA580C;
  --navy:linear-gradient(165deg,#244780 0%,#1B3163 52%,#152649 100%);
  --navy-flat:#1B3163;
  --ink:#1F2937; --gray:#6B7280; --line:#E5E7EB; --bg:#F7F8FA; --wa:#25D366;
  --radius-card:12px; --radius-btn:8px; --shadow:0 1px 3px rgba(0,0,0,.08);
  --mono:ui-monospace,"SF Mono",Consolas,"Courier New",monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:"Noto Sans HK","Noto Sans TC",-apple-system,"PingFang TC","PingFang SC","Microsoft JhengHei","Microsoft YaHei",sans-serif;line-height:1.7;font-size:15px;-webkit-font-smoothing:antialiased}
em{color:var(--orange);font-style:normal}
a{color:var(--blue);text-decoration:none;cursor:pointer}
.wrap{max-width:1320px;margin:0 auto;padding:0 24px}
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.04em;color:rgba(31,41,55,.7)}
.num{font-family:var(--mono);font-variant-numeric:tabular-nums;color:var(--orange-dark)}
/* 裁切标记（印刷标本母题, 仅产品图四角） */
.crop{position:relative}
.crop i{position:absolute;width:12px;height:12px;pointer-events:none;z-index:3}
.crop i::before,.crop i::after{content:"";position:absolute;background:var(--ink);opacity:.5}
.crop i::before{width:12px;height:1px}.crop i::after{width:1px;height:12px}
.crop .tl{top:-1px;left:-1px}.crop .tl::before{top:0;left:0}.crop .tl::after{top:0;left:0}
.crop .tr{top:-1px;right:-1px}.crop .tr::before{top:0;right:0}.crop .tr::after{top:0;right:0}
.crop .bl{bottom:-1px;left:-1px}.crop .bl::before{bottom:0;left:0}.crop .bl::after{bottom:0;left:0}
.crop .br{bottom:-1px;right:-1px}.crop .br::before{bottom:0;right:0}.crop .br::after{bottom:0;right:0}
/* 套准十字分隔 */
.reg{display:flex;align-items:center;gap:16px;margin:52px 0 8px}
.reg::before,.reg::after{content:"";flex:1;height:1px;background:var(--line)}
.reg span{width:18px;height:18px;position:relative;flex:none}
.reg span::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(31,41,55,.4);transform:translateX(-50%)}
.reg span::after{content:"";position:absolute;top:50%;left:0;right:0;height:1px;background:rgba(31,41,55,.4);transform:translateY(-50%)}
.reg b{position:absolute;inset:4px;border:1px solid rgba(31,41,55,.4);border-radius:50%}
/* 按钮 */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;font-weight:700;border-radius:var(--radius-btn);transition:filter .15s;font-family:inherit;text-decoration:none}
.btn:hover{filter:brightness(.94)}
.btn-orange{background:var(--orange);color:#fff;font-size:16px;padding:14px 28px}
.btn-wa{background:var(--wa);color:#fff;font-size:15px;padding:12px 22px}
.btn-blue{background:var(--blue);color:#fff;font-size:14px;padding:10px 18px}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-card);box-shadow:var(--shadow)}
/* 区头 */
.sec-head{margin:44px 0 20px}
.kicker{font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--blue);text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;margin-bottom:8px}
.kicker::before{content:"";width:22px;height:3px;background:var(--orange);display:inline-block}
.kicker.light{color:#9db8e8}
h2.sec-title{font-size:26px;font-weight:800;letter-spacing:-.02em;color:#111827;line-height:1.35}
/* ===== 冻结: banner (PLP) ===== */
.banner{background:var(--navy);color:#fff;padding:44px 0 40px}
.banner .crumbs{font-size:13px;color:rgba(255,255,255,.65);margin-bottom:14px}
.banner .crumbs a{color:rgba(255,255,255,.75)}
.banner .crumbs span{margin:0 6px;opacity:.5}
.banner h1{font-size:32px;font-weight:800;letter-spacing:-.02em;line-height:1.35;max-width:900px}
.banner-sub{color:rgba(255,255,255,.85);font-size:16px;margin-top:10px}
.capsules{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap}
.capsule{border:1px solid rgba(255,255,255,.35);color:#fff;font-size:13.5px;font-weight:600;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.08)}
/* ===== 布局 + 左侧栏 (冻结) ===== */
.layout{display:flex;gap:24px;padding:32px 0 8px}
.sidebar{width:224px;flex:none}
.sb-head{background:var(--blue);color:#fff;padding:12px 16px;border-radius:12px 12px 0 0;font-weight:700;display:flex;align-items:center;gap:8px;font-size:16px}
.sb-head::before{content:"";width:4px;height:20px;background:rgba(255,255,255,.6);border-radius:2px}
.sb-list{background:#fff;border:1px solid var(--line);border-top:none;border-radius:0 0 12px 12px;overflow:hidden}
.sb-list a{display:flex;justify-content:space-between;align-items:center;padding:15px 16px;border-bottom:1px solid #f3f4f6;color:#333;font-size:15px}
.sb-list a:last-child{border-bottom:none}
.sb-list a .n{color:#9ca3af;font-size:13px;font-variant-numeric:tabular-nums}
.sb-list a.on{background:var(--blue);color:#fff;font-weight:600}
.sb-list a.on .n{color:rgba(255,255,255,.85)}
.sb-list a:hover:not(.on){background:#f0f5ff}
.sb-quick{border:1px solid var(--line);background:#fff;padding:14px;margin-top:12px;display:flex;flex-direction:column;gap:6px;border-radius:12px}
.sb-quick b{font-size:13.5px}
.sb-quick span{font-size:12px;color:var(--gray)}
.sb-qbtn{display:block;text-align:center;background:var(--blue);color:#fff;font-size:13px;padding:9px;border-radius:8px;font-weight:600}
.sb-biz{margin-top:12px;background:var(--navy);color:#fff;padding:16px;border-radius:12px}
.sb-biz b{font-size:14.5px}
.sb-biz p{font-size:12px;color:rgba(255,255,255,.75);margin:6px 0 10px}
.sb-btn{display:block;text-align:center;background:var(--blue);color:#fff;font-size:13px;padding:9px;border-radius:8px;font-weight:600;margin-top:8px}
.sb-btn-wa{background:var(--wa)}
.sb-trust{font-size:11.5px;color:rgba(255,255,255,.7);margin:10px 0 0!important}
.content{flex:1;min-width:0}
/* ===== 1 · AEO 三答横条 ===== */
.aeo{display:grid;grid-template-columns:repeat(3,1fr);margin-top:4px}
.aeo-item{padding:20px 22px;border-left:1px solid var(--line)}
.aeo-item:first-child{border-left:none}
.aeo-q{font-size:14px;font-weight:700;color:var(--gray);margin-bottom:8px;display:flex;gap:8px;align-items:baseline}
.aeo-q::before{content:"Q";font-family:var(--mono);font-size:11px;color:#fff;background:var(--blue);border-radius:4px;padding:1px 6px;flex:none}
.aeo-a{font-size:14.5px;color:var(--ink);line-height:1.75;margin:0}
.aeo-a b{font-weight:800}
/* ===== 2 · 产品卡网格 (固行对齐 §5) ===== */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.spec-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius-card);box-shadow:var(--shadow);padding:14px;display:flex;flex-direction:column;position:relative;transition:box-shadow .15s}
.spec-card:hover{box-shadow:0 4px 14px rgba(0,0,0,.10)}
.spec-card .imgbox{position:relative;border-radius:8px;overflow:hidden;background:#f3f4f6}
.spec-card .imgbox img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
.hot{position:absolute;top:10px;left:10px;background:var(--orange);color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;z-index:2}
.new{position:absolute;top:10px;left:10px;background:var(--blue);color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;z-index:2}
.spec-card h3{font-size:15px;font-weight:700;line-height:1.5;margin:12px 0 6px;height:67px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;color:#111827}
.spec-card .meta{margin-bottom:8px;line-height:1.7;height:44px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.spec-card .pr{font-size:19px;font-weight:800;color:#111827;font-variant-numeric:tabular-nums;height:26px;line-height:26px;white-space:nowrap}
.spec-card .pr small{font-size:11px;color:#9ca3af;font-weight:400}
.spec-card .moq{font-size:12px;color:var(--gray);margin-top:2px;height:18px;line-height:18px;white-space:nowrap;margin-bottom:10px}
.spec-card .cta{margin-top:auto;background:var(--blue);color:#fff;text-align:center;font-weight:700;font-size:14px;padding:11px;border-radius:var(--radius-btn)}
.spec-card .cta:hover{filter:brightness(.94)}
/* ===== 3 · SpecFinder 紧凑 ===== */
.finder{margin-top:28px;background:#fff;border:1px solid var(--line);border-radius:var(--radius-card);box-shadow:var(--shadow);padding:14px 18px}
.finder-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.finder-label{font-weight:800;font-size:15px;color:#111827;white-space:nowrap;display:flex;align-items:center;gap:8px}
.finder-label::before{content:"";width:8px;height:8px;background:var(--orange);border-radius:2px}
.f-field{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray)}
.f-field select{font-family:inherit;font-size:14px;color:var(--ink);border:1px solid #d6e0f5;border-radius:8px;padding:8px 10px;background:#fff;min-width:150px}
.finder-go{margin-left:auto;background:var(--orange);color:#fff;border:none;font-family:inherit;font-weight:700;font-size:14px;padding:10px 18px;border-radius:var(--radius-btn);cursor:pointer;white-space:nowrap}
.finder-go:hover{filter:brightness(.94)}
/* ===== 4 · 核心競爭優勢 ===== */
.adv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.adv{padding:24px}
.adv-ico{width:46px;height:46px;border-radius:12px;background:var(--blue);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.adv-ico svg{width:23px;height:23px;stroke:#fff;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.adv h3{font-size:16.5px;font-weight:800;margin-bottom:8px;color:#111827}
.adv p{font-size:14px;color:#4b5563;line-height:1.8;margin:0}
/* ===== 5/7/13 · 表格 (斑马纹 + 藏青表头) ===== */
.table-card{padding:8px 8px 14px}
table.tbl{width:100%;border-collapse:collapse;font-size:13.5px;margin:8px 0 4px;background:#fff}
table.tbl th{background:var(--navy-flat);color:#fff;font-weight:600;text-align:left;padding:11px 14px;font-variant-numeric:tabular-nums}
table.tbl td{padding:10px 14px;border-bottom:1px solid var(--line);font-variant-numeric:tabular-nums;color:#374151}
table.tbl tbody tr:nth-child(even){background:#F7F8FA}
table.tbl td:first-child{font-weight:600;color:#111827}
table.tbl.compare td.us,table.tbl.compare th.us{background:#FFF3EA;color:#9A3412;font-weight:700}
table.tbl.compare th.us{background:var(--orange);color:#fff}
.tbl-note{font-size:12px;color:var(--gray);margin:8px 10px 0}
/* ===== 6 · 特殊加工 ===== */
.proc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.proc{padding:20px 22px}
.proc h3{font-size:16px;font-weight:800;color:#111827;margin-bottom:6px}
.proc p{font-size:13.5px;color:#4b5563;line-height:1.75;margin:0}
.proc.rec{border-color:var(--orange);border-width:1.5px}
.proc-tag{display:inline-block;font-size:11.5px;font-weight:700;color:var(--orange-dark);background:#FFF3EA;border-radius:6px;padding:3px 9px;margin-bottom:10px;font-variant-numeric:tabular-nums}
/* ===== 9 · 行业场景 ===== */
.ind-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.ind-card{padding:24px}
.ind-card .num{font-family:var(--mono);font-size:12px;color:var(--blue);letter-spacing:.1em;border:1px solid #d6e0f5;border-radius:8px;display:inline-block;padding:3px 9px;margin-bottom:12px}
.ind-card h3{font-size:17px;font-weight:800;margin-bottom:10px;color:#111827}
.ind-card ul{padding:0}
.ind-card li{list-style:none;display:flex;gap:10px;font-size:14px;color:#4b5563;padding:5px 0}
.ind-card li::before{content:"●";color:var(--orange);font-size:9px;margin-top:7px}
.d-p{font-size:14px;color:#4b5563;line-height:1.85;margin:16px 0 0}
/* ===== 10 · 數據徽章帶 ===== */
.band{margin-top:48px;background:var(--navy);border-radius:16px;color:#fff;overflow:hidden}
.band-in{padding:40px 36px}
.band-title{font-size:24px;font-weight:800;letter-spacing:-.02em;margin-bottom:22px}
.band-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.bst{border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:18px;text-align:center}
.bst b{display:block;font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.bst span{font-size:12.5px;color:rgba(255,255,255,.72)}
/* ===== 11 · 指南 + FAQ ===== */
.guide-card{padding:26px 28px}
.guide-card p{font-size:14.5px;color:#374151;line-height:1.9;margin:0 0 14px}
.guide-card p:last-child{margin-bottom:0}
.acc{overflow:hidden}
.acc details{border-bottom:1px solid var(--line)}
.acc details:last-child{border-bottom:none}
.acc summary{cursor:pointer;list-style:none;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.acc summary::-webkit-details-marker{display:none}
.acc summary h3{font-weight:700;font-size:15.5px;color:#111827;display:inline}
.acc summary::after{content:"+";font-size:22px;font-weight:400;color:var(--gray);flex:none}
.acc details[open] summary::after{content:"−"}
.acc details[open] summary h3{color:var(--blue)}
.acc .acc-body{padding:0 24px 20px;font-size:14.5px;color:#4b5563;line-height:1.85}
.acc .acc-body table{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:10px}
.acc .acc-body th{background:var(--navy-flat);color:#fff;font-weight:600;text-align:left;padding:9px 12px;font-variant-numeric:tabular-nums}
.acc .acc-body td{padding:9px 12px;border-bottom:1px solid var(--line)}
.acc .acc-body tbody tr:nth-child(even){background:#F7F8FA}
/* ===== 12 · 6 步流程 ===== */
.steps6{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;list-style:none}
.s6{background:#fff;border:1px solid var(--line);border-radius:var(--radius-card);box-shadow:var(--shadow);padding:16px 18px}
.s6 .s6n{display:inline-block;width:24px;height:24px;background:var(--blue);color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12.5px;font-family:var(--mono);margin-right:8px}
.s6 b{font-size:14px;color:#111827}
.s6 p{font-size:12.5px;color:var(--gray);margin:8px 0 0;line-height:1.65}
/* ===== 页底 CTA ===== */
.brandcta{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);text-align:center;padding:52px 24px;margin-top:52px}
.brandcta .st{font-size:22px;font-weight:800;letter-spacing:-.02em;max-width:820px;margin:0 auto 12px;color:#111827}
.brandcta .sub{color:var(--gray);font-size:14.5px;max-width:640px;margin:0 auto 26px}
.brandcta .fine{font-size:12px;color:#9ca3af;margin-top:14px}
.foot{background:#111827;color:#9ca3af;font-size:13px;padding:26px 0;text-align:center;margin-top:0}
/* ===== PDP 专有 ===== */
.crumb{background:#fff;border-bottom:1px solid var(--line);font-size:13.5px;color:#9ca3af;padding:14px 0;margin:0 -24px;padding-left:24px;padding-right:24px}
.crumb a{color:#6b7280}.crumb a:hover{color:var(--blue)}
.hero{background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);margin-top:20px;padding:28px}
.hero-grid{display:grid;grid-template-columns:58% 42%;gap:32px}
.hero-pics .main{aspect-ratio:1/1;background:#f3f4f6;border-radius:12px;overflow:hidden}
.hero-pics .main img{width:100%;height:100%;object-fit:cover;display:block}
.thumbs{display:flex;gap:8px;margin-top:12px;overflow-x:auto}
.thumbs img{width:88px;height:88px;object-fit:cover;border-radius:8px;border:2px solid var(--line);flex:none}
.thumbs img.on{border-color:var(--blue)}
h1.hero-title{font-size:27px;font-weight:800;letter-spacing:-.02em;line-height:1.4;margin-bottom:12px;color:#111827}
.hero-desc{color:#4b5563;margin:14px 0 18px;font-size:14.5px}
.badge-rush{display:inline-flex;align-items:center;gap:8px;background:var(--navy);color:#fff;font-weight:700;font-size:13.5px;padding:7px 13px;border-radius:8px;margin-bottom:4px}
.badge-rush small{font-weight:400;opacity:.8}
.badge-rush .ic{width:15px;height:15px;fill:var(--orange)}
.pricecard{border:1px solid var(--line);border-radius:12px;padding:20px;background:#fff}
.pricecard .p{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.pricecard .big{font-size:34px;font-weight:800;color:var(--orange);letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.pricecard .per{color:#9ca3af;font-size:14px}
.pricecard .batch{color:#9ca3af;font-size:12px;margin-left:4px}
.chk{display:flex;flex-wrap:wrap;gap:18px;margin-top:12px;font-size:14px;color:#4b5563}
.chk span{display:inline-flex;align-items:center;gap:6px}
.chk svg{width:17px;height:17px}
.meta-row{display:flex;justify-content:space-between;font-size:12px;color:#9ca3af;border-top:1px solid var(--line);margin-top:14px;padding-top:12px}
.cta-stack{display:flex;flex-direction:column;gap:10px;margin-top:14px}
.hero-badges{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;font-size:12.5px;color:#374151}
.hero-badges span{background:#fff;border:1px solid var(--line);border-radius:8px;padding:5px 10px}
.section{margin-top:8px}
.q-row{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start}
.ladder{padding:26px 28px}
.saving{display:flex;align-items:baseline;gap:10px;margin-bottom:6px}
.saving .n{font-size:46px;font-weight:800;color:var(--orange);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.saving .t{font-size:18px;font-weight:700;color:#111827}
.ladder-src{font-size:12px;color:#9ca3af;margin-bottom:20px}
.bar-row{display:grid;grid-template-columns:86px 1fr 210px;align-items:center;gap:14px;padding:9px 0}
.bar-row .q{font-family:var(--mono);font-size:13px;color:rgba(31,41,55,.7);text-align:right;font-variant-numeric:tabular-nums}
.bar-track{position:relative;height:22px;background:repeating-linear-gradient(to right,var(--line) 0 1px,transparent 1px 10%)}
.bar-fill{position:absolute;left:0;top:3px;bottom:3px;background:var(--blue);border-radius:2px}
.bar-row.low .bar-fill{background:var(--orange)}
.best{position:absolute;right:-4px;top:-9px;background:var(--orange);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;z-index:2}
.bar-row .u{font-family:var(--mono);font-size:15px;font-weight:700;color:#111827;font-variant-numeric:tabular-nums;white-space:nowrap}
.bar-row.low .u{color:var(--orange-dark)}
.bar-row .u small{font-weight:400;color:#9ca3af;font-size:11px;margin-left:6px}
.ruler{display:flex;justify-content:space-between;border-top:1px solid rgba(31,41,55,.3);margin-top:14px;padding-top:6px;font-family:var(--mono);font-size:10px;color:#9ca3af}
.ruler i{width:1px;height:6px;background:rgba(31,41,55,.3);position:relative;top:-7px}
.deadline{padding:22px}
.deadline h3{font-size:17px;font-weight:800;margin-bottom:10px;color:#111827}
.dl-row{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid var(--line);font-size:13.5px}
.dl-row:last-of-type{border-bottom:none}
.dl-row .k{color:var(--gray)}
.dl-row .v{font-weight:600;color:#111827;text-align:right}
.rail{position:sticky;top:84px;padding:22px}
.rail .rp{display:flex;align-items:baseline;gap:6px;margin-bottom:4px}
.rail .rp .n{font-size:30px;font-weight:800;color:var(--orange);font-variant-numeric:tabular-nums}
.rail .rp small{color:#9ca3af;font-size:12px}
.rail .src{font-size:12px;color:#9ca3af;margin-bottom:14px}
.rail .btn{width:100%}
.rail .fine{font-size:11px;color:#9ca3af;text-align:center;margin-top:10px}
.filmstrip{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:16px}
.filmstrip figure{position:relative;margin:0}
.filmstrip img{width:100%;height:230px;object-fit:cover;border-radius:var(--radius-card);display:block}
.filmstrip figcaption{font-family:var(--mono);font-size:11.5px;color:rgba(31,41,55,.7);margin-top:8px;letter-spacing:.04em}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pad{padding:22px 24px}
.h3{font-size:16.5px;font-weight:800;color:#111827;margin-bottom:10px}
.trust{background:var(--navy);color:#fff;border-radius:16px;padding:40px 36px;margin-top:44px}
.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:24px}
.t-item{display:flex;gap:14px;align-items:flex-start}
.t-ico{width:48px;height:48px;border-radius:12px;background:var(--blue);display:flex;align-items:center;justify-content:center;flex:none}
.t-ico svg{width:24px;height:24px;stroke:#fff;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.t-item b{display:block;font-size:15px}
.t-item small{color:#b6c5e2;font-size:12.5px;line-height:1.55;display:block;margin-top:3px}
.rel-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.rel-grid .spec-card h3{font-size:13.5px;height:60px}
.rel-grid .spec-card .pr{font-size:16px}
/* 移动吸底 */
.mob-rail{display:none}
/* ===== 冻结区工具类 (页眉页脚) ===== */
.sticky{position:sticky}.top-0{top:0}.z-50{z-index:50}.shadow-sm{box-shadow:0 1px 2px rgba(0,0,0,.05)}
.bg-white{background:#fff}.bg-gray-50{background:#f9fafb}
.max-w-\[1320px\]{max-width:1320px}.mx-auto{margin-left:auto;margin-right:auto}
.flex{display:flex}.grid{display:grid}.hidden{display:none}
.items-center{align-items:center}.justify-between{justify-content:space-between}
.gap-2{gap:8px}.gap-4{gap:16px}.gap-8{gap:32px}
.px-4{padding-left:16px;padding-right:16px}.sm\:px-6{padding-left:24px;padding-right:24px}.lg\:px-8{padding-left:32px;padding-right:32px}
.py-2{padding-top:8px;padding-bottom:8px}.py-2\.5{padding-top:10px;padding-bottom:10px}.py-3{padding-top:12px;padding-bottom:12px}.py-12{padding-top:48px;padding-bottom:48px}
.pt-4{padding-top:16px}.pb-6{padding-bottom:24px}.mb-4{margin-bottom:16px}.mt-4{margin-top:16px}
.text-xs{font-size:12px}.text-sm{font-size:14px}.text-base{font-size:16px}.text-lg{font-size:18px}
.font-medium{font-weight:500}.font-semibold{font-weight:600}
.text-gray-700{color:#374151}.text-gray-400{color:#9ca3af}.text-white{color:#fff}
.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-r{border-right-width:1px}.border{border-width:1px}
.border-gray-100{border-color:#f3f4f6}.border-gray-200{border-color:#e5e7eb}.border-gray-300{border-color:#d1d5db}
.rounded{border-radius:4px}.rounded-lg{border-radius:8px}.whitespace-nowrap{white-space:nowrap}
.text-center{text-align:center}
.bg-blue-50{background:#eff6ff}.bg-\[\#2873F5\]{background:#2873F5}.text-\[\#2873F5\]{color:#2873F5}
.h-11{height:44px}.w-auto{width:auto}.h-4{height:16px}.w-4{width:16px}.h-5{height:20px}.w-5{width:20px}.h-6{height:24px}.w-6{width:24px}
.text-white\/70{color:rgba(255,255,255,.7)}.text-white\/85{color:rgba(255,255,255,.85)}
.lg\:grid{display:grid}.lg\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.lg\:col-span-2{grid-column:span 2/span 2}
.lg\:hidden{display:none}.lg\:block{display:block}
.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
.space-y-2>*+*{margin-top:8px}.space-y-3>*+*{margin-top:12px}.space-y-6>*+*{margin-top:24px}
.leading-relaxed{line-height:1.625}
.topbar-ic{width:15px;height:15px;flex:none}
/* ===== 响应式 ===== */
@media (max-width:1023px){
  .layout{flex-direction:column}
  .sidebar{width:100%}
  .sb-list{display:none}
  .grid{grid-template-columns:repeat(2,1fr)}
  .adv-grid,.ind-grid,.proc-grid,.steps6,.aeo{grid-template-columns:1fr 1fr}
  .aeo-item{border-left:none;border-top:1px solid var(--line)}
  .band-grid{grid-template-columns:1fr 1fr}
  .hero-grid{grid-template-columns:1fr}
  .q-row{grid-template-columns:1fr}
  .rail{position:static}
  .rel-grid{grid-template-columns:repeat(2,1fr)}
  .trust-grid{grid-template-columns:1fr 1fr}
  .filmstrip{grid-template-columns:1fr}
  .two-col{grid-template-columns:1fr}
  .finder-go{margin-left:0;width:100%}
  .wrap{padding:0 16px}
  .banner h1{font-size:23px}
  /* 移动吸底报价轨 */
  .mob-rail{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:60;background:#fff;border-top:1px solid var(--line);box-shadow:0 -4px 16px rgba(0,0,0,.10);padding:10px 16px;gap:12px;align-items:center}
  .mob-rail .info{min-width:0;flex:1}
  .mob-rail .p{font-size:20px;font-weight:800;color:var(--orange);font-variant-numeric:tabular-nums}
  .mob-rail small{display:block;font-size:11px;color:#9ca3af}
  .mob-rail .btn{flex:none;padding:11px 16px;font-size:13.5px}
  body{padding-bottom:74px}
}
@media (max-width:640px){
  .grid,.rel-grid,.adv-grid,.ind-grid,.proc-grid,.steps6,.aeo{grid-template-columns:1fr}
  .trust-grid{grid-template-columns:1fr}
  .bar-row{grid-template-columns:64px 1fr 104px}
  .bar-row .u{font-size:12.5px}
  h2.sec-title{font-size:21px}
  .hero{padding:18px}
  h1.hero-title{font-size:20px}
  .band-in,.trust{padding:28px 20px}
}
"""

HEAD = """<!DOCTYPE html>
<html lang="zh-Hant-HK">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%s</title>
<meta name="description" content="%s">
<style>%s</style>
</head>
<body>
"""

def build(body_file, out_file, title, desc):
    head = HEAD % (title, desc, CSS)
    header = open('_frozen_header.html', encoding='utf-8').read()
    footer = open('_frozen_footer.html', encoding='utf-8').read()
    body = open(body_file, encoding='utf-8').read()
    body = body.replace('<!--@@HEADER@@-->', header).replace('<!--@@FOOTER@@-->', footer)
    open(out_file, 'w', encoding='utf-8').write(head + body + "\n</body>\n</html>\n")
    print(out_file, 'ok')

build('_plp-v7-body.html', 'plp-v7.html',
      '貼紙印刷 | 100張起 | 防水/透明/可移除 | 免費設計 | 即日取 | 智印港',
      '香港貼紙印刷 100 張起訂，防水 PVC、透明 PET、可移、燙金等 9 款材質任揀。平均 2.3 天出貨，免費打樣，全港順豐速遞，滿 HK$500 免運。WhatsApp 30 秒報價。')
build('_pdp-v7-body.html', 'pdp-v7.html',
      '防水貼紙 / 戶外貼紙 訂製 · 不干膠 · 100張起印 · 香港印刷專家 · 智印港',
      '防水貼紙訂製 HK$0.42/個起，PVC 防水防曬耐磨，戶外可用 3-5 年。100 張起印無開版費，免費打樣，即日 18:00 截單翌日 12:00 前送達，DHL 全球 2-4 天。')
