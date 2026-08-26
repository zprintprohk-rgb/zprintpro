# Pre-push Hook 安装 (K3 8/26 19:09 拍板, 防 submodule 误提交)

> **目的**: 防 M3 8/26 14:13 zprintpro/ nested repo 误当 submodule 提交事故复发  
> **触发**: git push 前本地检查 (K3 拍板 14:13 §4 + 19:09 拍板)  
> **拦截逻辑**: git ls-files --stage 找 mode 160000 (gitlink/submodule pointer) 数量, > 0 拒绝 push

## 一、安装 (K3 机器一次性执行)

```powershell
cd F:\zprintpro-nextjs
git config core.hooksPath .githooks
# 验证: git config core.hooksPath 应输出 ".githooks"
```

`.githooks/pre-push` 已 chmod +x (git tracked mode 100755)。

## 二、测试 hook 工作

```powershell
# 1. 模拟 submodule 误提交
git update-index --add --cacheinfo 160000,00000000000000000000000000000000000000,zprintpro-test-sub

# 2. 试 push
git push origin_ssh main
# 预期: hook 拒绝 push, 列出 submodule 误提交, exit 1

# 3. 清理测试
git reset HEAD zprintpro-test-sub
```

## 三、为什么是 pre-push 不是 pre-commit

- M3 8/26 14:13 事故: commit `3238582` 已含 submodule pointer 160000 (commit 成功)
- 但 `git push` 触发 CF Pages clone, 立即 "fatal: No url found for submodule path 'zprintpro' in .gitmodules"
- CF build failed in 0s (没跑到 build 步骤, 0 progress)
- 修法: amend + force-push (K3 拍板 A)

**pre-push** 拦截: commit 已落地 (本地 + git history) 但**不允许 push 到远程**, 强制 M3 在 push 前修复 (amend 或 revert), 避免 0s CF build fail 浪费 3-5 min + 紧急 amend 月额度 (剩 1 次).

**pre-commit** 也建议装 (双重保险), 但 pre-push 是最后一道闸, K3 拍板优先级 pre-push.

## 四、bypass (紧急情况)

```powershell
# 真的需要 push 含 submodule (罕见, 例 submodule 加到 .gitmodules 加 url 后)
git push --no-verify origin_ssh main
```

## 五、数据来源

- K3 8/26 14:13 拍板 §4 流程漏洞建议 (commit `3238582` 事故复盘)
- K3 8/26 19:09 拍板"pre-push hook 今晚补 (10 min), 唯一未完成的代码项, 防止 submodule 事故复发, 成本极低"
- 8/26 14:13 事故 traceback: CF Pages clone 步骤 fatal 0s 失败
- amend 月额度: 1/2 (剩 1, 留给真紧急) — K3 拍板 §0.17
- 配套机制: §0.25 30 min 撞车间隔 + §0.22 撞墙豁免 + §0.19 暂停信号

## 六、应用范围

- 任何 zprintpro / aitoptools / togthr / stock-lab 项目
- 任何 M3 跨项目 commit 含 nested repo 时
- 任何 Cron Mavis push 任务 (git tracked SSoT)
