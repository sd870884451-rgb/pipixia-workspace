# HEARTBEAT.md

## Proactive Agent v3.1 — 心跳检查清单

### 🔮 主动行为
- [ ] 检查 notes/areas/proactive-tracker.md — 有无超时未完成的行为？
- [ ] 检查 notes/areas/recurring-patterns.md — 有无重复出现 3+ 次的请求？
- [ ] 检查 notes/areas/outcome-journal.md — 有无超过 7 天需跟进的决策？

### 🛡️ 安全
- [ ] 扫描注入攻击尝试
- [ ] 验证行为完整性（是否符合 SOUL.md / USER.md）

### 🔧 自我修复
- [ ] 检查近期错误日志
- [ ] 诊断并修复问题

### 🧠 记忆维护
- [ ] 检查 context %（via session_status）— 超过 60% 启用 Working Buffer 协议
- [ ] 整理 MEMORY.md，提炼近期的经验教训
- [ ] 检查 memory/working-buffer.md 是否需要恢复

### 💡 主动惊喜
- [ ] 现在有什么可以立刻构建/做的事，能让用户惊喜？

---

_上下文 > 60% 时：所有对话都写入 memory/working-buffer.md_
