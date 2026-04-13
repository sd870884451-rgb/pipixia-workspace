# MEMORY.md - 长期记忆

## 用户信息
- **Name:** Jason
- 微信: `o9cq804TiKn74bPUx2CAo65mv4LM@im.wechat`
- 时区: Asia/Shanghai (GMT+8)
- 偏好: 中文沟通

## 项目状态

### 赛博办公室 (Cyber Office v2.0)
- **GitHub Pages:** https://sd870884451-rgb.github.io/cyber-office/
- **Repo:** sd870884451-rgb/cyber-office
- **文件:** index.html (15KB, 内嵌JS) + three_bundled.js (1.2MB, 本地Three.js)
- **最新 commit:** 980b67db / ff56bbd2 (修复 PerspectiveCamera typo)
- **三个关键文件:** index.html, three_bundled.js, .github/workflows/deploy.yml

### GitHub + Maton Gateway
- Maton API Key: `VE-e5ocDR44nY-vADO_97UNNJ1AvSfXcZMTexyTGuuNppncU721N_s9Xh4Z9xv_LAEKKAggftubkwqXR3rij4kyZilMWAW2GsCc`
- GitHub User: sd870884451-rgb
- Maton Gateway URL: `https://gateway.maton.ai/github/`
- GitHub API via gateway: Bearer token 认证
- 推送文件用: `PUT /repos/{owner}/{repo}/contents/{path}` + 当前 SHA

## 技术教训

### 拼写检查的重要性
- `THREE.ProspectiveCamera` (18字) vs `THREE.PerspectiveCamera` (19字) — 差了 1 个字符!
- 浏览器 `document.querySelectorAll('script')` 只能查到 inline script，`src=` 的无法用 `.textContent` 读
- 验证正确方式: 直接从 GitHub API 获取 blob 内容(base64解码后检查)

### CDN vs 本地
- Jason 的网络 jsdelivr/unpkg 访问困难
- 最终方案: esbuild 打包 three.js + OrbitControls 成单文件 three_bundled.js
- bundle 大小 1.2MB，base64 后约 1.7MB，GitHub API 推送OK
- esbuild 命令: `node esbuild three_entry.js --bundle --format=iife --global-name=THREE --outfile=three_bundled.js`
- bundle 必须导出 `window.THREE` 和 `window.OrbitControls`

### HTML 脚本加载顺序
- `<script src="bundle.js" onload="init()">` 是正确的异步加载方式
- `window.THREE` 在 bundle 加载完前是 undefined
- 绝对不能用 `if (window.THREE)` 的同步检查来触发 init()（因为脚本是异步的）

### GitHub API
- `?ref=main` 返回 blob SHA，不是 commit SHA
- 获取正确 SHA: `GET /repos/.../contents/{path}` → `data.sha`
- 推送时必须传当前 SHA（否则 409 Conflict）
- GitHub raw URL 会被截断，只返回部分内容
- 实际完整内容只能从 GitHub API 的 base64 解码获取

### 本地文件 vs GitHub 文件
- GitHub Pages 上的是 Actions 构建后的版本（可能与 git HEAD 不同步）
- 获取文件内容必须用 GitHub API，raw.githubusercontent.com 会截断大文件

## 待完成
- 赛博办公室已通过 localtunnel 部署临时公网链接（临时，服务器关闭即失效）；永久部署方案待定（Vercel/Netlify）
- [ ] "蒸馏人"技能 - Jason 还没决定蒸馏谁
- [ ] GitHub 用户名修改 - Jason 已放弃

## 用户身份与偏好

- 技能安装规则：优先从 SkillHub 安装，找不到再从 GitHub 找；安装时直接执行，无需多问，完成后告知用户

## 当前项目与关注

- 已安装技能列表（截至 2026-04-12）：agent-browser, automation-workflows, browser-use, github, github-api, gog, proactive-agent, self-improving-agent, skill-vetter, summarize, tavily-search, Notion, zhihu-writer, zhihu-fetcher, 剪映, ai-writing-assistant-cn, video-frames, ontology, find-skills, weather
- 赛博办公室永久部署待定：建议用 Vercel/Netlify（需用户邮箱注册）
- 赛博办公室本地路径：C:\Users\Administrator\.qclaw\workspace\cyber-office\；技术栈：纯 Three.js（CDN），单 HTML 文件 ~33KB；包含：3D办公室场景、三联屏显示器、赛博机器人Avatar、6个RPG悬浮任务卡片、霓虹灯管边框、雨滴/浮尘粒子系统、随机通知弹窗、HUD叠加层、OrbitControls

## 经验与决策

- skillhub CLI：非ASCII输出（emoji描述）时 GBK codec 崩溃（UnicodeEncodeError）
- Windows PowerShell 后台运行 npx localtunnel 需用 cmd /c "start /b npx --yes localtunnel..." 重定向到 $env:TEMP\lt_out.txt；Start-Process npx 方式无效
- Windows PowerShell 管道默认 GBK 编码，导致 npm 输出中文乱码
- GitHub CLAUDE.md 教训：sozonkov/claude-code-templates 的 CLAUDE.md 被合并冲突损坏，不要盲目复制未检查的仓库文件
