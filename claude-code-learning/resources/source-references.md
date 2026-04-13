# 学习来源与参考

本目录的学习材料来自以下 GitHub 仓库和资源：

## 🐙 GitHub 核心仓库

### 1. CCPlugins — 24个专业命令生态
**URL**: https://github.com/brennercruvinel/CCPlugins
**Star**: 活跃开发中
**亮点**: 
- `/clean`, `/commit`, `/review`, `/scaffold`, `/test` 等 24 个命令
- 多子代理并行审查架构
- Validation & Refinement 阶段设计
- git checkpoint 安全机制

### 2. claude-code-templates — 多语言配置模板
**URL**: https://github.com/MaoTouHU/claude-code-templates
**Star**: 46 Commits
**亮点**:
- JavaScript/TypeScript, Python 多框架模板
- `.claude/settings.json` 自动化钩子配置
- `.mcp.json` MCP 服务器集成
- 交互式安装 (`npx claude-code-templates@latest`)

### 3. Claude-Code-Multi-Agent — 多代理协调框架
**URL**: https://github.com/Prorise-cool/Claude-Code-Multi-Agent
**Star**: 14 Commits
**亮点**:
- 项目感知能力框架
- 多代理任务协调
- 分阶段执行模式
- `.env.example` 安全凭证管理

### 4. andybhall/CLAUDE_CODE_PROMPTS — 分阶段提示词
**URL**: https://github.com/andybhall/vbm-replication-extension
**文件**: `CLAUDE_CODE_PROMPTS.md`
**亮点**:
- Phase 0-7 分阶段执行模式
- 每个阶段的 Prompt 示例
- Bug 修复会话的 Prompt 策略

### 5. Claude-code-open-explain — 源码解读
**URL**: https://github.com/iZiTTMarvin/Claude-code-open-explain
**亮点**: Claude Code 架构设计、运行链路、工程取舍（面向新手）

## 📝 技术博客与指南

### Claude 官方
- **Prompt Engineering 指南**: https://docs.anthropic.com/en/docs/prompt-engineering
- **Claude Code 文档**: https://docs.anthropic.com/en/docs/claude-code

### 中文实战文章
- **CSDN: 用Claude Code重新定义编程效率**: https://blog.csdn.net/exception_class/article/details/157736837
- **CSDN: 40个高阶技巧与全自动AI编程工作流**: https://blog.csdn.net/A8ai1751295/article/details/159515287
- **CSDN: Prompt Engineering 2.0**: https://blog.csdn.net/wisdom_19860320/article/details/157475998
- **博客园: Claude Code MCP 快速高效使用指南**: https://www.cnblogs.com/lf109/p/18975750
- **CSDN: 从抓包 Claude Code 理解 Agent 工程**: https://blog.csdn.net/qq_46101869/article/details/158809973

## 🔑 核心学习要点

1. **提示词质量 > 命令数量** — 具体版本号、正向约束是关键
2. **Think 强度分级** — 简单任务不加 ultrathink，顽固 bug 才加
3. **安全红线** — 不加 AI 签名、不用 emoji commit、不硬编码凭证
4. **git checkpoint** — 破坏性操作前必做
5. **Validation 阶段** — 每次修改后验证，不堆积问题
6. **Human-in-the-loop** — 复杂任务分阶段，用户批准后再继续

---
*整理：皮皮虾 🦐 · 2026-04-12*
