# 🎯 OPC Assistant 部署指南（详细步骤）

## 方式一：GitHub + Vercel（推荐，免费且简单）

### 第一步：创建 GitHub 仓库

1. 打开 [github.com](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `opc-assistant`
   - Description: `创业助手 - 帮助创业者规划、管理和复盘`
   - 选择 Public（公开）或 Private（私有）
   - ✅ 不要勾选 "Add a README file"（因为我们已经有了）
4. 点击 "Create repository"

### 第二步：将本地代码推送到 GitHub

**如果你的电脑没有安装 Git：**

1. 下载并安装 Git for Windows：https://git-scm.com/download/win
2. 安装时一路点击 "Next" 即可
3. 安装完成后，打开 "Git Bash" 或 "Git CMD"

**在项目目录中执行：**

```bash
# 进入项目目录
cd opc-assistant

# 初始化 Git（如果还没初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 首次提交 - OPC Assistant v1.0.0"

# 添加远程仓库（把下面的 URL 换成你在第一步创建的仓库地址）
git remote add origin https://github.com/你的用户名/opc-assistant.git

# 推送代码
git branch -M main
git push -u origin main
```

### 第三步：使用 Vercel 部署

1. 打开 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 注册账号（可用 GitHub 账号登录）
3. 登录后点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 找到你刚创建的 `opc-assistant` 仓库
6. Vercel 会自动检测到是 Vite 项目，配置如下：
   - Framework Preset: **Vite**
   - Root Directory: `.`（保持默认）
   - Build Command: `npm run build`（应该已经自动填好）
   - Output Directory: `dist`（应该已经自动填好）
7. 点击 "Deploy"
8. 等待 1-2 分钟，部署完成！
9. 点击生成的 URL 查看你的网站，例如：`https://opc-assistant.vercel.app`

### 第四步：自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 输入你的域名（如 `app.yoursite.com`）
3. 按照提示添加 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

---

## 方式二：Netlify 部署（最简单）

### 第一步：构建项目

```bash
cd opc-assistant
npm run build
```

### 第二步：部署到 Netlify

1. 打开 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 点击 "Sites" → "Add new site" → "Deploy manually"
4. **拖拽** `dist` 文件夹到网页上
5. 等待部署完成，自动生成 URL！

### 第三步：绑定域名（可选）

1. 点击 "Site settings" → "Domain management"
2. 点击 "Add custom domain"
3. 按提示配置 DNS

---

## 方式三：本地服务器部署（Nginx）

### 第一步：构建项目

```bash
npm run build
```

### 第二步：上传文件

将 `dist` 文件夹内容上传到服务器的 `/var/www/opc-assistant` 目录。

### 第三步：配置 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 换成你的域名或 IP
    
    root /var/www/opc-assistant;
    index index.html;
    
    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 第四步：重启 Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔧 常见问题

### Q: 部署后页面空白？
**A:** 检查是否配置了 `vercel.json` 或 Nginx 的 `try_files` 规则，确保 SPA 路由正常工作。

### Q: 静态资源加载失败？
**A:** 检查 `vite.config.ts` 中的 `base` 配置，生产环境应为 `/` 或你的子路径。

### Q: 想更新网站内容？
**A:** 更新代码后重新构建部署即可：
```bash
git add .
git commit -m "Update: 你的更新内容"
git push
```
Vercel 会自动重新部署！

---

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 [部署文档](./DEPLOYMENT.md)
2. 查看 [发布检查清单](./RELEASE_CHECKLIST.md)
3. 查看 Vite 官方文档：https://vitejs.dev

祝部署顺利！🚀
