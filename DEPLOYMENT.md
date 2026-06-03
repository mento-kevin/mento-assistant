# OPC Assistant 部署指南

## 快速开始

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 2. 生产环境构建

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建完成后，所有静态文件将生成在 `dist` 目录中。

## 部署方案

### 方案一：静态文件部署（推荐）

将 `dist` 目录部署到任意静态文件服务器

#### GitHub Pages

1. 在项目根目录创建 `deploy.sh`（Linux/Mac）:
```bash
#!/usr/bin/env bash

npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:your-username/your-repo.git master:gh-pages
cd -
```

2. 或者使用 `gh-pages` 包：
```bash
npm install -D gh-pages
```

在 `package.json` 添加脚本：
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

#### Vercel (推荐)

1. 连接 GitHub 仓库到 Vercel
2. Vercel 会自动检测 Vite 项目
3. 配置环境变量（如需要）
4. 部署！

#### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 部署！

### 方案二：Nginx 部署

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

### 方案三：Docker 部署

创建 `Dockerfile`：
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

## 环境变量配置

1. 复制 `.env.example` 为 `.env` 或 `.env.production`

```bash
cp .env.example .env.production
```

2. 根据需要修改配置

## 性能优化

当前构建已包含以下优化：
- 代码分割
- Tree Shaking
- 移除 console 和 debugger
- Gzip 压缩（需要服务器配置）
- 资源哈希文件名

## 安全建议

1. 使用 HTTPS
2. 设置正确的 CSP 头部
3. 配置安全头部
4. 定期更新依赖

## 监控和日志

建议配置前端错误监控：
- Sentry
- LogRocket
- 或其他错误追踪服务

## 回滚策略

保留前一版本的构建备份，快速回滚。
