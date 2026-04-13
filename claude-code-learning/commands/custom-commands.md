# 自定义斜杠命令设计指南

> 来源：CCPlugins + claude-code-templates + 实战经验

---

## 🎯 什么是斜杠命令

斜杠命令（Slash Commands）是 Claude Code 的扩展机制，在 `.claude/commands/` 目录下放置 `.md` 文件即可激活：

```bash
.claude/commands/
├── clean.md      → /clean
├── review.md     → /review
├── test.md       → /test
├── scaffold.md   → /scaffold
└── explain.md    → /explain
```

---

## 📝 命令设计模板

每个命令文件包含三个部分：

```markdown
# 命令名

<analysis>
[AI 分析时的思考过程指引]
</analysis>

## 执行步骤
1. ...
2. ...

## 注意事项
- ...
```

---

## 🔥 推荐命令（CCPlugins 风格）

### /clean — 清理项目

```markdown
# Clean Project

<analysis>
在清理前分析：
1. 哪些文件是调试产物（*.log, *.tmp, __pycache__）
2. 哪些文件看起来临时但实际重要（.env, .cache）
3. 哪些删除操作安全，哪些需要确认
</analysis>

我会：
1. 先 git checkpoint 保护工作
2. 识别清理目标
3. 展示清单，征求同意
4. 执行清理
5. 验证项目完整性

保护目录：.git, .claude, node_modules, vendor
```

### /review — 代码审查

```markdown
# Code Review

使用多子代理并行分析：
- 安全子代理：凭证暴露、输入校验、漏洞
- 性能子代理：瓶颈、内存问题
- 质量子代理：复杂度、可维护性
- 架构子代理：分层、依赖方向

输出格式：
🔴 严重 [文件:行] — 问题 → 修复方案
🟡 中等 [文件:行] — 问题 → 建议

审查后询问是否创建 GitHub Issues。
```

### /scaffold — 功能脚手架

```markdown
# Scaffold Feature

根据项目模式生成完整功能模块：
1. 读取项目现有模式（src/models, src/services 等）
2. 生成符合项目规范的新功能文件
3. 生成单元测试文件
4. 更新相关导入/路由
5. 展示文件清单，征求同意后创建
```

### /commit — 智能提交

```markdown
# Smart Commit

分析 git diff，生成 Conventional Commits 规范 message：
- feat: 新功能
- fix: 修复
- refactor: 重构
- docs: 文档
- test: 测试
- chore: 杂项

规则：
- 只描述"改变"，不描述"原因"
- 不使用 emoji
- 不添加 AI 签名
```

---

## 🏗️ 创建命令的最佳实践

1. **一个命令只做一件事** — 不要做"多功能命令"
2. **包含安全检查** — 危险操作前有 checkpoint 机制
3. **征求用户同意** — 破坏性操作列出清单再执行
4. **输出可操作结果** — 给出具体文件路径和问题位置
5. **可扩展** — 留有参数接口（如 `/scaffold feature-name`）

---

## ⚙️ 全局命令 vs 项目命令

| 类型 | 位置 | 作用域 |
|------|------|--------|
| **全局命令** | `~/.claude/commands/` | 所有项目 |
| **项目命令** | `[项目]/.claude/commands/` | 当前项目 |

全局命令放通用工具（review, explain, commit）
项目命令放特定框架的配置（scaffold, test-runner）

---

*来源：CCPlugins, claude-code-templates*
