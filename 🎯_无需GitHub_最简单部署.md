# 🎯 无需 GitHub - 最简单部署方案！

不需要注册 GitHub，直接拖拽部署！

---

## 🚀 方案一：Netlify 部署（推荐，最简单！）

### 第1步：访问 Netlify

打开浏览器，访问：https://app.netlify.com

### 第2步：注册/登录 Netlify

1. 点击 "Sign up"（注册）
2. 可以用邮箱注册，或用 Google/Email 账号
3. 完成注册后登录

### 第3步：部署（拖拽！）

1. 登录后，会看到类似的界面
2. 点击 "Add new site" → "Deploy manually"
3. 打开文件夹：`c:\Users\79849\Desktop\opc\opc-assistant\dist`
4. **把 dist 文件夹里的所有文件**拖拽到网页上
5. 等待上传完成（1-2分钟）
6. ✅ 完成！获得免费网址，例如：`https://opc-assistant-xxxxxx.netlify.app`

---

## 🛠️ 方案二：Vercel 拖拽部署

### 第1步：访问 Vercel

打开浏览器，访问：https://vercel.com

### 第2步：注册/登录 Vercel

1. 点击 "Sign up"
2. 可以用邮箱注册
3. 登录后进入控制台

### 第3步：上传部署

1. 点击 "Add new..." → "Project"
2. 点击 "Other"（不是 GitHub/GitLab）
3. 选择 "Upload folder"
4. 选择文件夹：`c:\Users\79849\Desktop\opc\opc-assistant\dist`
5. 点击 "Deploy"
6. 等待部署完成
7. ✅ 完成！获得免费网址

---

## 📂 dist 文件夹在哪里？

dist 文件夹已经在：
```
c:\Users\79849\Desktop\opc\opc-assistant\dist
```

双击打开文件夹，里面应该有：
- index.html
- assets/ 文件夹

---

## ✅ 部署验证

部署后，访问你的新网址，检查：

- [ ] 页面正常显示
- [ ] 登录功能正常
- [ ] 各个页面可以跳转

---

## 🎉 完成！

现在你的网站已经上线了！可以分享给朋友使用了！

---

## 💡 提示

- Netlify 部署最快最简单
- 如果 dist 文件夹找不到，重新运行：`npm run build`
