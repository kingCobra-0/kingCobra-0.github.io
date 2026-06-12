---
title: "Loop Engineering 深度解析：AI 编程的第三次革命"
category: "vibecoding"
chapter: ""
date: "2026-06-12"
---

# Loop Engineering 深度解析：AI 编程的第三次革命

作者: 徐小夕（整理自微信公众号「趣谈AI」）
发布时间: 2026年6月
来源: 微信公众号 @趣谈AI
原文链接: https://mp.weixin.qq.com/s/-BnxCLNngoFH4S5EAdaYxQ

---

## 核心背景

6月7日，谷歌工程师 **Addy Osmani** 发布了一篇题为《Loop Engineering》的文章，正式将这个正在 AI 编程圈悄然兴起的新范式推向了大众视野。短短三天，这篇文章就引发了全球开发者社区的热烈讨论，被称为 **"AI 编程的第三次革命"**。

> Loop Engineering 是一种全新的 AI 编程思想：**不用手动向 AI 编程工具一条条地输入提示词，而是通过设计一个能够自动发现需求、分发任务、检查成果、记录当前状态并决定下一步做什么的自循环系统。**

---

## 什么是 Loop Engineering？

**Loop Engineering** 用大白话来说，就是我们设计一个能够自动发现需求、分发任务、检查成果、记录当前状态并决定下一步做什么的**自循环系统**。这个系统会不断地调用 AI 模型/工具，直到我们指定的目标被达成为止。

这有点像工程学里面的 **PDCA 循环**（Plan → Do → Check → Act）。

### AI 编程的三次革命

| 阶段 | 范式 | 核心思想 |
|------|------|----------|
| 第一次 | Prompt Engineering | 写出完美的提示词来生成代码 |
| 第二次 | Context + Harness 工程 | 给 AI 提供充足的上下文和工程化约束 |
| 第三次 | **Loop Engineering** | 设计自运行的反馈系统，让 AI 自主循环直到目标达成 |

这是一个根本性的思维转变：**从"与 AI 对话"转向"编程式 AI"**。我们的工作不再是写出完美的提示词，而是设计出完美的反馈系统。

---

## Loop Engineering 的四层技术架构

Loop Engineering 建立在所有现有技术的基础之上，分为四层：

```
┌─────────────────────────────────────┐
│  Loop 层 — "AI 做完一步后怎么办"  │  ← Loop Engineering 所在层
├─────────────────────────────────────┤
│  Harness 层 — "AI 在什么环境里工作"│
├─────────────────────────────────────┤
│  Context 层 — "让 AI 看到什么"     │
├─────────────────────────────────────┤
│  Prompt 层 — "怎么问"             │
└─────────────────────────────────────┘
```

| 层级 | 解决什么问题 | 示例 |
|------|--------------|------|
| **Prompt 层** | "怎么问" | 角色设定、输出格式、示例 |
| **Context 层** | "让 AI 看到什么" | RAG、记忆管理、文件检索 |
| **Harness 层** | "AI 在什么环境里工作" | 工具调用、沙箱、权限控制、业务规则 |
| **Loop 层** | "AI 做完一步后怎么办" | 自动检查、修正、继续、停止条件 |

---

## 核心原理：通用五阶段循环模型

每一个编码循环，无论是单 Agent 还是多 Agent，都遵循完全相同的**五阶段循环**，直到满足可验证的停止条件：

```
Discover (发现)
    ↓
Plan (计划)
    ↓
Execute (执行)
    ↓
Verify (验证)
    ↓
Iterate (迭代) ──→ 回到 Discover
```

### 核心经验：状态存在于外部，而非上下文窗口

Loop Engineering 最核心的思想哲学是：

> **不要信任模型的上下文窗口作为持久化存储。模型会遗忘，会漂移，会压缩信息导致约束丢失。**

企业级 AI 开发的最佳实践是：**所有状态都存储在外部系统中**——git 仓库、markdown 文件、数据库、issue 跟踪系统等。每个循环迭代都从一个全新的上下文窗口开始，但在持久化的内容基础上进行工作。

这就是为什么最原始的 Ralph Loop 这么有影响力，只用了一行 bash 代码，就让 AI 永无止境地帮你干活：

```bash
while :; do cat PROMPT.md | claude-code; done
```

每次循环都会重新读取 `PROMPT.md` 和当前代码库状态，**完全忽略之前的对话历史**。

---

## Loop Engineering 的六大核心要素

所有现代 AI 编码工具（Claude Code、Codex 等）都已经内置了 Loop Engineering 所需的六大核心要素：

### 1. Automations（自动化）

**自动化是将一次性 AI 运行转变为真正循环的关键**。它允许我们指定任务何时运行、运行频率以及在什么环境下运行。

**典型应用场景：**
- 每日早上 7 点 30 分自动运行脚本，处理前一天的 bug
- 每当有新 PR 被打开时，自动运行代码审查
- 每 2 小时检查一次性能基准，并进行回归
- 每周五下午 5 点自动生成 `CHANGELOG.md`

### 2. Worktrees（工作树）：无冲突协作并行

当我们同时运行多个 AI 时，**Git 工作树**为每个 AI Agent 提供了一个独立的工作目录，共享相同的仓库历史但不共享文件，从根本上避免冲突。

```bash
# 在独立的工作树中打开一个会话
git worktree add ../fix-login fix/login
cd ../fix-login
claude-code "fix the login bug"
```

### 3. Skills（技能）

**Skills 是将项目知识编码到磁盘上的一种方式**。AI Agent 可以在需要的时候调用这些技能，而不是每次都重新学习项目的约定。

```
skills/
  database/
    SKILL.md      ← 数据库操作规范
    scripts/       ← 常用脚本
    references/    ← 参考资料
```

本质上就是**经验的复用包**。

### 4. Connectors（连接器）

连接器（基于 MCP 协议）主要作用是让循环能够与我们已在使用的工具进行交互。它是 **"AI 告诉你该做什么事情"和"AI 实际帮你完成了哪些事情"之间的关键区别**。

常见连接器类型：Issue 跟踪（GitHub Issues、Linear）、通讯（Slack、Discord）、数据库（PostgreSQL、MongoDB）、CI/CD（GitHub Actions）等。

### 5. Sub-agents（子代理）

最高效的循环设计原则是：**一个代理负责实现，另一个代理负责验证**。

让编写代码的模型来评判自己的代码，就像让学生给自己的考试打分一样不可靠。经典的三层代理协作架构：

```
实现 Agent → 编写代码
    ↓
验证 Agent → 检查代码
    ↓
审查 Agent → 最终把关
```

### 6. State（状态）

**模型会遗忘，但仓库不会**。所有复杂运行循环都依赖外部状态来记住自己的运行阶段。

常见状态存储方式：
- Markdown 文件：`STATE.md`、`AGENTS.md`、`PROGRESS.md`
- 任务队列：`tasks.json`
- Issue 跟踪系统：GitHub Issues、Linear
- 数据库：SQLite、PostgreSQL

```markdown
# Loop State
## 当前迭代次数
3/50
## 已完成任务
- [x] 修复登录接口500错误
- [x] 添加单元测试
## 待处理任务
- [ ] 验证修复后CI是否通过
- [ ] 提交PR
```

---

## 两大循环类型：闭环 vs 开环

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| **闭环** | 有明确的目标和停止条件，达到目标后自动停止 | Bug 修复、单元测试覆盖、CI 失败修复 |
| **开环** | 没有明确的停止条件，持续运行 | 探索性研究、创意生成 |

**建议：从闭环开始**。只有当我们完全掌握了闭环设计，并且有足够的预算和评估能力时，再尝试开环。

### 闭环的五个必要组成

1. **明确的目标（Goal）** — 精确地定义"完成"的样子
2. **充足的上下文（Context）** — 提供 `VISION.md`、`ARCHITECTURE.md`、`RULES.md` 等文件
3. **受限的动作（Action）** — 只允许使用必要的工具（约束行为）
4. **客观的反馈（Feedback）** — 包括测试、lint、类型检查等
5. **清晰的停止条件（Stop Condition）** — 可验证的成功标准/结束条件

---

## 实战案例：构建自动修复 CI 失败的循环

下面通过一个完整的实战案例来学习如何设计和实现一个 Loop Engineering 系统：**每天早上自动运行，修复前一天 CI 失败**。

### 项目结构

```
your-project/
  .claude/
    agents/
      ci-fixer.toml
      code-reviewer.toml
    workflows/
  skills/
    ci-triage/
      SKILL.md
    code-fixer/
      SKILL.md
  STATE.md
  PROMPT.md
```

### CI 分类技能（ci-triage）

```markdown
# CI Triage Skill
## 目标
自动分析CI失败日志，分类失败原因，生成修复建议
## 步骤
1. 拉取最新CI运行日志
2. 识别失败类型：测试失败/编译错误/依赖问题/环境错误
3. 生成优先级排序的修复任务列表
4. 更新STATE.md的待处理任务
```

### 代码修复技能（code-fixer）

```markdown
# Code Fixer Skill
## 目标
根据CI分类结果，自动修复对应代码问题
## 约束
- 每次只修改一个文件
- 修复后必须运行对应单元测试
- 禁止修改核心业务逻辑外的代码
```

### GitHub Actions 工作流

```yaml
name: CI Fix Loop
on:
  schedule:
    - cron: '0 6 * * *'   # 每天早上6点运行
  workflow_dispatch:        # 支持手动触发
jobs:
  ci-fix:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: 运行CI修复循环
        run: claude-code run --agent ci-fixer --state STATE.md
      - name: 提交修复结果
        if: success()
        uses: actions/commit@v3
        with:
          message: "chore: auto-fix CI failures"
```

---

## 成本与安全考量

Loop Engineering 虽然强大，但如果使用不当，可能会带来高昂的成本和安全风险。在中等规模代码库上运行 50-100 次迭代可能花费 ¥500-1000，甚至更高。

### 成本管控策略

1. **设置严格的迭代限制** — 永远不要省略 `max-iterations`
2. **从小规模开始** — 先在 10-20 次迭代上测试
3. **计算 ROI** — ¥500 的循环节省 20 小时工作？值得。完成 30 分钟能做的任务？不值得
4. **使用成本较低的模型** — 简单任务使用 Sonnet 而不是 Opus
5. **监控和警报** — 设置每日 API 使用警报

---

## 最后

Loop Engineering 目前还处于早期阶段，但它已经展示出了巨大的潜力。它把 AI 编程往前推了一大步：

> **从"只会写代码"进化到了"会按工程流程做事"。**

传统提示词解决的是"这一次该怎么回答"，而 Loop Engineering 解决的是"**以后遇到这类任务该怎么干**"。

---

**相关链接：**

- Addy Osmani 原文：搜索 "Loop Engineering Addy Osmani"
- agent-skills 项目：https://github.com/addyosmani/agent-skills
