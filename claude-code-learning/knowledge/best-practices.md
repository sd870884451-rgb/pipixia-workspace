# Claude Code 最佳实践与高级技巧

> 来源：GitHub CCPlugins、Superpowers、CSDN 实战指南、官方文档

---

## 🚀 一、效率提升核心技巧

### 1.1 Think 强度动态调用

遇到顽固 bug 不要重复提交相同问题：

```bash
# 在提示词前加 ultrathink，强制多步推理链
[ultrathink]
这个 bug 根因在哪里？我已经尝试了 A、B、C 方案都没用，请从不同角度分析。
```

**Think 强度决策树：**
```
代码补全 → think（默认）
函数重构 → think hard
架构设计 → ultrathink
Bug 根因 → ultrathink
简单 CRUD → 不用加
```

### 1.2 ! 命令妙用

在对话框输入 `!命令`，AI 会直接执行命令并把结果带入上下文：

```
# 直接执行并带入结果
!npm test

# 不带结果（只执行）
!npm test -- --silent
```

### 1.3 /clear 任务重置

切换完全不同的功能模块时，用 `/clear` 彻底清除历史，避免旧逻辑干扰新任务。

### 1.4 Token 空间管理

- 重要决策信息写入 `SESSION-STATE.md`，不靠上下文记忆
- 大项目用 `.claude/commands/` 存储项目特定知识
- 定期 `/clear` 清除过期上下文

---

## 🏗️ 二、工程化工作流（Superpowers 模式）

Superpowers 的核心价值：**更稳 > 更强**

### 2.1 稳定工作的三大原则

**1. 明确边界**
```
每次任务只做一件事，不要"顺手做 XX"
```

**2. 验证优先**
```
每次修改后立即运行测试，不要堆积问题
```

**3. 可回滚**
```
任何破坏性操作前 git checkpoint
```

### 2.2 多代理协调模式（Claude-Code-Multi-Agent）

```
主代理：
├── 任务分解（Plan）
├── 结果整合（Merge）
└── 质量审核（Review）

子代理（并行）：
├── 搜索/研究代理
├── 实现代理
└── 测试代理
```

---

## 🛡️ 三、安全与可靠性

### 3.1 安全扫描集成

```bash
# 集成安全扫描到工作流
claude mcp add --transport sse security-server https://vendor.com/mcp-endpoint
```

### 3.2 凭证安全

AI 编程中最高频的安全事故：API Key 硬编码。

**防护规则：**
- `.env` 文件永远不上传
- 检测到硬编码 Key → 立即提醒并拒绝 commit
- 使用环境变量注入，不在代码中写明文凭证

### 3.3 Git 安全红线

**绝不执行：**
- `git push --force`（除非明确要求）
- 删除未 commit 的工作区文件（用 `trash`）
- 修改 `.git/config` 或用户凭证

---

## 📦 四、MCP 服务器集成

### 4.1 常用 MCP 服务器

```bash
# 文件系统
claude mcp add filesystem -s user -- npx -y @modelcontextprotocol/server-filesystem ~/Projects

# Git
claude mcp add git -- npx -y @modelcontextprotocol/server-git

# 浏览器自动化
claude mcp add browser -- npx -y @modelcontextprotocol/server-browser
```

### 4.2 远程 MCP 服务器（2025年7月新特性）

```bash
# 添加远程服务器（无需本地安装维护）
claude mcp add --transport sse remote-server https://vendor.com/mcp-endpoint
```

优势：供应商负责更新、扩展和可用性。

### 4.3 OAuth 认证集成（2025年6月）

一次认证，自动处理后续连接，无需管理 API 密钥。

---

## 🔧 五、调试与错误处理

### 5.1 Bug 修复流程（CCPlugins 模式）

```
1. [ultrathink] 分析根因，先不给假设
2. 列出可能原因，按概率排序
3. 按顺序验证假设（从最高概率开始）
4. 找到根因后修复
5. 运行测试验证修复有效
6. 运行完整测试套件确保没有回归
```

### 5.2 错误日志分析

```
分析 [日志文件]，找：
- 错误模式（同类错误集中爆发？）
- 时间线（什么操作触发的？）
- 上下文（错误前后的请求是什么？）
```

### 5.3 测试失败分析

```
测试失败了，请：
1. 分析失败原因（不要只看错误信息）
2. 判断是测试写错了还是代码写错了
3. 修复最可能的问题
4. 再次运行测试
5. 如果还失败，给出诊断报告
```

---

## 📊 六、项目感知能力

### 6.1 让 AI 理解项目上下文

创建 `.claude/` 配置文件：

```
.claude/
├── commands/           # 自定义斜杠命令
├── settings.json      # 自动化钩子配置
└── knowledge/        # 项目特定知识（代码模式、规范）
```

### 6.2 框架特定配置

**JavaScript/TypeScript（claude-code-templates）：**
```json
{
  "testRunner": "vitest",
  "formatter": "prettier",
  "hooks": ["pre-commit: lint", "pre-push: test"]
}
```

**Python（claude-code-templates）：**
```json
{
  "testRunner": "pytest",
  "formatter": "black",
  "hooks": ["pre-commit: black, flake8", "pre-push: pytest"]
}
```

---

## 🧠 七、高级思维模式

### 7.1 从"问答式"到"程序式编排"

不要把 AI 当搜索引擎用。要把 AI 视为具备推理能力的**上下文处理器**。

```
❌ 错误用法：
"这个错误怎么解决？" → 复制答案 → 粘贴

✅ 正确用法：
"这个错误的根因是什么，我还有哪些地方可能也有这个问题？"
→ 分析全代码库 → 批量修复
```

### 7.2 不确定性管理

Agent 工程的第一公敌是不确定性。

**降低不确定性的方法：**
- 任务描述具体化（不要"优化这个"）
- 输出格式明确化（用 XML/JSON 包裹）
- 验证步骤前置（先问"我理解对了吗"）

### 7.3 Human-in-the-loop

复杂任务分阶段执行，每阶段征求用户批准：
```
Phase 1 完成 → 报告结果 → 等确认 → Phase 2
```

不要让 AI 自主执行长链条任务而不检查点。

---

*来源：Superpowers, CCPlugins, claude-code-templates, 官方文档*
