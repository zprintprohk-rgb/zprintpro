# 技能：渲染/上线验证探针方法论

技术栈：Next.js 14 + Tailwind 3.4 + CF Pages。对视觉/文案改动做验证时按本套路，避开已踩过的坑。

## 1. SSR 内容断言
- 生产 URL：`https://zprintpro.com/{loc}/...`（zh-hk/en/ja）。
- **文案断言先剥离标签再匹配**：`re.sub(r"<[^>]+>", "", html)` 后 unescape——
  组件里数字常被 renderTitle() 拆进独立 span（"15+ 年印刷經驗" 会被切两段），纯文本子串匹配假阴性。
- 旧结构清除断言：旧 class 名 not in html。
- 埋点断言：data-event/data-source 计数恰好 1。
- 标签页/手风琴内容是客户端渲染：SSR HTML 里没有 specs/shipping 面板内容——
  断言这类内容改查源码文件或带状态探针，别拿 SSR HTML 硬测。

## 2. CSS 匹配口径（生产 minify）
- 匹配前 `flat = css.replace(" ", "").lower()`。
- **百分数尾缀必须带上**：`#244780 0%` flatten 后是 `#2447800%`——漏了就是假 FAIL。
- inline style 在 HTML 属性里原样带空格（React 序列化），HTML 与 CSS 两种口径都要测。

## 3. 像素取证（PIL，客观视觉证据）
- 截图工具：`C:\Users\Administrator\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe --window-size=1440,9000 --screenshot=out.png URL`。
- **纹理上限约 6090 设备px**：长页下半部截不到；0.5 缩放加倍有效高度但超长页仍截不全——
  下半部验证靠 DOM 断言 + 分窗口裁片。
- 渐变生效判定用像素：`is_navy(x,y) = b > r+18 and 40<b<160`（旧亮蓝 #2873F5 b=245 被自然排除）。
- 条带定位：full-bleed 带 = 左右边缘+中线同为藏青；容器内带 = 中线藏青+边缘白。
- 目标图与实现一致性：对用户拍板的截图做色值采样 + 视觉模型裁决，**不唯 CSS 源码注释**（设计稿 CSS 里可能有不启用的规则）。

## 4. dev server 陷阱
- 任何 locale 的类目/产品页 dev 首编可达 181-240s+（watcher 争用）——dev 断言超时别当代码问题；
  该 locale 交生产构建 + 线上探针。
- dev 长跑后 .next manifest 腐坏会 500——重启 dev 即恢复；删除 .next 会被安全守卫拦（需审批），能不删就不删。
- dev 与 `npm run build` 不能并行（.next 冲突），先停 dev。
- 多个 dev 实例占 3000/3001——探针前确认端口归属。
- python 脚本 print 经管道缓冲到进程结束才回传——长探针有耐心或分段。

## 5. 假 FAIL 定性（先怀疑探针再怀疑实现）
- copy 缺失 → 数字被 span 切分？剥标签重测。
- 类名不存在 → 页面其他组件合法存量？按 section 边界切片重测。
- 标记缺失 → 标记在客户端渲染层？查源码文件 + 换 SSR 可见标记。
- CSS 没匹配上 → flatten 漏了百分数尾缀？重构造匹配串。
