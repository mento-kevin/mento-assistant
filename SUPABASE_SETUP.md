# Supabase 设置指南

## 概述

本项目现在支持两种存储模式：
1. **本地存储模式（默认）** - 使用 localStorage，数据只存在当前浏览器
2. **Supabase 云端模式（推荐）** - 使用 Supabase 数据库，支持跨设备同步

---

## 第一步：创建 Supabase 账号和项目

1. 访问 https://supabase.com/dashboard
2. 点击 **New Project**
3. 填写项目信息：
   - Name: `mento-assistant`
   - Database Password: 设置一个强密码（请保存好！）
   - Region: 选择离你最近的区域（推荐 `Singapore`）
4. 点击 **Create new project**（等待约 2 分钟）

---

## 第二步：获取 API Keys

项目创建成功后：

1. 在左侧菜单，找到 **Project Settings** → **API**
2. 复制以下值：
   - `Project URL`（例如：`https://xxxxx.supabase.co`）
   - `anon public` key（一长串字符）

---

## 第三步：配置本地环境

在项目根目录下编辑 `.env` 文件：

```env
# 从 Supabase Settings > API 复制以下值
VITE_SUPABASE_URL=https://你的项目id.supabase.co
VITE_SUPABASE_ANON_KEY=你的anon_public_key
```

⚠️ **重要提示：**
- `.env` 文件中包含敏感信息，**不要**提交到 Git！
- `.env.example` 是示例文件，应该被提交到 Git。

---

## 第四步：创建数据库表

1. 在 Supabase 面板左侧，点击 **SQL Editor**
2. 点击 **New Query**
3. 复制 `supabase/schema.sql` 文件中的所有内容
4. 粘贴到编辑器中
5. 点击 **Run**（右下角绿色按钮）

如果执行成功，你会看到：
- ✅ `profiles` 表已创建
- ✅ `user_data` 表已创建
- ✅ `invite_codes` 表已创建
- ✅ 各种策略已启用

---

## 第五步：创建邀请码（可选）

如果你想要通过邀请码限制注册：

在 SQL Editor 中运行以下命令（替换为你想要的邀请码）：

```sql
INSERT INTO invite_codes (code)
VALUES 
  ('ABCD1234'),
  ('EFGH5678'),
  ('IJKL9012');
```

---

## 第六步：配置认证设置（重要）

1. 在 Supabase 左侧菜单，点击 **Authentication** → **Providers**
2. 找到 **Email**，点击展开
3. **重要：** 关闭 **Confirm email**（因为我们使用手机号注册）
4. 保存设置

---

## 第七步：测试运行

### 本地开发

```bash
# 重启开发服务器
npm run dev
```

打开浏览器控制台（F12），你应该看到：
- 如果配置正确：不会有警告
- 如果未配置：会看到 `⚠️ Supabase 配置未完成` 警告

### 部署到 Netlify

1. 提交你的代码到 Git（**不要**提交 `.env` 文件！）
2. 在 Netlify 上：
   - 进入你项目的 **Site settings**
   - 点击 **Environment variables**
   - 添加两个变量：
     - `VITE_SUPABASE_URL`: 你的项目 URL
     - `VITE_SUPABASE_ANON_KEY`: 你的 anon key
3. 重新部署

---

## 数据迁移（从本地到云端）

如果你之前在本地模式下已经有数据：

1. 配置好 Supabase 并登录
2. 在浏览器控制台运行（需要先打开个人设置页面）：
   ```javascript
   // 这会自动将本地数据同步到云端
   ```

或者使用我们的「数据导入导出」功能：
1. 在旧设备：个人设置 → 系统 → 导出数据
2. 在新设备：个人设置 → 系统 → 导入数据

---

## 故障排除

### 问题1：注册时提示 "Email rate limit exceeded"

**原因：** Supabase 对注册频率有限制

**解决：** 稍等几分钟，或者在开发阶段使用相同密码测试

---

### 问题2：数据没有同步

**检查：**
1. 确认 `.env` 文件配置正确
2. 打开浏览器控制台查看错误
3. 在 Supabase 面板：Table Editor → user_data，确认表中有数据

---

### 问题3：本地模式和云端模式如何切换？

**说明：**
- 如果 `.env` 文件中有正确的配置 → 自动使用云端模式
- 如果没有配置 → 自动降级到本地模式

---

## 高级配置

### 开启实时数据同步

在 Supabase 面板：
1. Database → Replication
2. 启用对 `user_data` 和 `profiles` 表的实时订阅

### 设置行级安全策略

我们已经在 `schema.sql` 中设置了安全策略：
- 用户只能读取/修改自己的数据
- 管理员可以管理邀请码

---

## 下一步

配置完成后：
1. 注册一个新账号测试
2. 在另一个设备上用相同账号登录，确认数据同步正常
3. 享受跨设备无缝同步！

---

如有问题，请查看浏览器控制台的错误信息，或联系我们！
