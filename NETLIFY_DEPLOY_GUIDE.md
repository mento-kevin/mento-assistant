# Netlify 部署指南

## ✅ 部署前检查清单

- [x] 项目已构建（`dist` 文件夹存在）
- [x] 包含 `_redirects` 配置文件
- [x] 所有静态资源已打包

---

## 📁 需要上传的文件

只需上传 **`dist` 文件夹** 中的所有内容，无需上传源代码！

```
dist/
├── assets/                  # JS/CSS 资源
├── _redirects               # Netlify 路由配置
└── index.html               # 入口文件
```

---

## 🚀 Netlify 部署步骤（拖拽方式，最简单）

### 方法一：拖拽部署（推荐，1分钟搞定）

1. **访问 Netlify**
   - 打开 https://app.netlify.com
   - 登录您的账号

2. **拖拽部署**
   - 在 Netlify 主页找到 "Add new site" → "Deploy manually"
   - 或在 "Sites" 页面点击 "Add new site" → "Deploy manually"
   - 打开文件夹 `c:\Users\79849\Desktop\opc\opc-assistant\dist`
   - 选中 `dist` 文件夹内的**所有内容**，拖拽到上传区域

3. **等待部署完成**
   - 上传成功后，Netlify 会自动构建并部署
   - 部署成功后会获得一个类似 `https://adjective-noun-12345.netlify.app` 的网址

### 方法二：使用 Netlify CLI（需要命令行）

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 进入 dist 目录并部署
cd dist
netlify deploy --prod
```

---

## ⚙️ 重要配置说明

### ✅ 已配置好的内容

1. **路由配置**：`_redirects` 文件已配置 SPA 路由（所有请求指向 index.html）
   ```
   /*    /index.html   200
   ```

2. **构建优化**：已启用代码压缩、Tree Shaking 等优化

---

## 🎯 部署后验证

部署成功后，请验证以下功能：

- [ ] 页面可以正常访问
- [ ] 路由切换正常（首页、财务、复盘、知识库等）
- [ ] 刷新页面不会出现 404 错误
- [ ] 所有图片、图标正常显示

---

## 📋 本次更新内容

- ✅ 删除了财务中心的公司资料模块
- ✅ 税务情况改为按钮切换方式（本月/季度/年度）
- ✅ 税务情况的所有时间范围都包含待收发票数据
- ✅ AI 分析可以从个人资料获取公司名称
