# 后端部署说明

## 功能概述

本项目现在支持真正的后端服务，使用 Netlify Functions 实现：

- 用户注册/登录（JWT 认证）
- 邀请码管理
- 用户数据同步（跨设备访问）
- SQLite 数据库存储

## 本地开发

### 1. 安装后端依赖

在 `netlify/functions` 目录下运行：

```bash
cd netlify/functions
npm install
```

### 2. 初始化数据库

```bash
cd netlify/functions
node -e "import('./lib/db.js').then(({ initDb }) => { initDb(); console.log('Database initialized'); });"
```

或者直接运行初始化脚本（需要配置）。

### 3. 安装 Netlify CLI

```bash
npm install -g netlify-cli
```

### 4. 本地运行

```bash
# 在项目根目录
netlify dev
```

这会同时启动前端和后端 Functions。

## 部署到 Netlify

### 1. 推送到 Git 仓库

确保代码已推送到 GitHub/GitLab 等仓库。

### 2. 在 Netlify 上创建站点

1. 访问 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 选择你的 Git 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. 配置环境变量（可选）

在 Netlify 站点设置 → Environment variables 中添加：

```
JWT_SECRET=your-secret-key-here
```

### 4. 部署

点击 "Deploy site" 开始部署。

## 数据库注意事项

⚠️ **重要提示**：

Netlify Functions 使用的 SQLite 数据库是**临时存储**，每次冷启动后数据会丢失！

### 生产环境建议

对于真实的生产环境，建议使用：

1. **PlanetScale** (MySQL)
2. **Supabase** (PostgreSQL) 
3. **Neon** (PostgreSQL)
4. **Turso** (SQLite 兼容)

### 修改数据库连接

编辑 `netlify/functions/lib/db.ts` 文件，替换数据库连接代码。

## API 端点

### 认证

- `POST /.netlify/functions/register` - 用户注册
- `POST /.netlify/functions/login` - 用户登录

### 数据

- `GET /.netlify/functions/data?keys=all` - 获取所有数据
- `POST /.netlify/functions/data` - 保存数据

### 请求示例

```javascript
// 注册
const response = await fetch('/.netlify/functions/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '13800138000',
    password: 'password123',
    inviteCode: 'ABC123'
  })
});

// 登录
const response = await fetch('/.netlify/functions/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '13800138000',
    password: 'password123'
  })
});

// 保存数据（需要认证）
const response = await fetch('/.netlify/functions/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    data: { user: {...} }
  })
});
```

## 初始化管理员账号

首次部署后，需要手动创建管理员账号。可以：

1. 使用数据库管理工具直接插入
2. 或者通过 API 注册后手动修改 `isAdmin` 字段

默认管理员账号：
- 手机号：17768014009
- 密码：hzltllove1314

## 故障排除

### Functions 无法访问

- 检查 `netlify.toml` 配置是否正确
- 确认 Functions 目录结构正确
- 查看 Netlify 部署日志

### 数据库错误

- 检查是否有写入权限
- 考虑使用外部数据库服务
- 查看 Function 日志

### CORS 问题

- Functions 已配置 CORS 头
- 确保 API 路径正确
